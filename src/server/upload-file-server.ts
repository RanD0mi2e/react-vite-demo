import { getArrayToGroups } from "@/utils/common";
import {
  DEFAULT_UPLOADER_CONFIG,
  getArrayBufferFromBlob,
  getMd5FromArrayBuffer,
  sliceFiles,
} from "@/utils/uploaderHelpers";
import { WorkerService } from "./worker-service";
import SparkMD5 from "spark-md5";
import {
  FileMetadata,
  checkFileIfExist,
  getExistChunks,
  mergeChunks,
  uploadChunks,
  verifyNeedReuploadChunks,
} from "@/api/file-upload";
import { PromisePool } from "@/utils/promise-pool/promisePool";

export class MinioUploaderService {
  // 线程池服务
  private workerSvc: WorkerService;

  constructor(WorkerService: WorkerService) {
    this.workerSvc = WorkerService;
  }

  async doUpload(file: File, uploadlCallback: (progress: number) => void) {
    const chunkSize = DEFAULT_UPLOADER_CONFIG.chunkSize;
    // 文件大小/kb
    const fileSize = file.size / 1000;
    // 文件分片
    const chunksBlob = sliceFiles(file, chunkSize);
    // 文件元数据
    const metadata: FileMetadata = {
      size: file.size,
      lastModified: file.lastModified,
      type: file.type,
    }
    // 文件哈希串数组
    let chunksHash: string[] = [];
    // 如果文件只有一片
    if (chunksBlob.length === 1) {
      chunksHash = [getMd5FromArrayBuffer(await chunksBlob[0].arrayBuffer())];
    } else {
      let chunkGroupsArrBuf: ArrayBuffer[] = [];
      // 把文件分片根据线程数分组
      const chunkGroups = getArrayToGroups(
        chunksBlob,
        DEFAULT_UPLOADER_CONFIG.maxThread
      );
      // 任务队列
      const tasks = chunkGroups.map((group) => async () => {
        // 释放上一次的分组流内存
        chunkGroupsArrBuf.length = 0;
        // 获取分组的ArrayBuffer
        chunkGroupsArrBuf = await getArrayBufferFromBlob(group);
        // 获取分组的md5数组（多worker线程）
        return await this.workerSvc.getMD5ForFiles(chunkGroupsArrBuf);
      });

      for (const task of tasks) {
        const result = await task();
        chunksHash.push(...result);
      }

      // 根据分片的md5值二次哈希生成文件的md5值
      const fileHash = SparkMD5.hash(chunksHash.join(""));

      // 检查文件是否上传过
      const { data } = await checkFileIfExist(fileHash, fileSize);
      if (data.isExist) {
        return data.existUrl;
      }

      // 检查需要上传的分片
      const {
        data: { needUploadChunks },
      } = await getExistChunks(fileHash, chunksHash);

      // 构建每块分片的formData
      const fileParamsMap = new Map<string, FormData>();
      chunksBlob.forEach((chunk, index) => {
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("name", file.name);
        formData.append("filehash", fileHash);
        formData.append("chunkhash", chunksHash[index]);
        formData.append("index", index + "");
        fileParamsMap.set(chunksHash[index], formData);
      });

      // 实际需要上传的blob
      const needUploadFormDatas = needUploadChunks.map(
        (chunkHash) => fileParamsMap.get(chunkHash)!
      );

      // 文件总大小
      const total = file.size;
      // 上传进度
      const currentProgressList: number[] = [];
      // 上传进度监听定时器
      const timeIntervalId = setInterval(() => {
        const loaded = currentProgressList.reduce((prev, cur) => prev + cur, 0);
        uploadlCallback((loaded / total) * 100);
      }, 150)

      // 上传文件
      await new PromisePool(
        needUploadFormDatas.map(
          (formdata, index) => () => uploadChunks(formdata, (progress) => {
            if (typeof progress === "number") {
              currentProgressList[index] = progress;
            } else {
              console.log('上传出现异常:', progress)
            }
          })
        )
      ).exec();
      // 清除定时器
      clearInterval(timeIntervalId)
      uploadlCallback(100);

      // TODO: 上传失败处理
      // 检查上传失败的分片
      const {
        data: { needReuploadChunks },
      } = await verifyNeedReuploadChunks(fileHash, chunksHash);
      if (needReuploadChunks.length) {
        console.log("需要重新上传分片", needReuploadChunks);
        return ''
      }

      // 合并分片
      const { data: { url } } = await mergeChunks(fileHash, file.name, file.size, metadata);
      return url;
    }
  }
}
