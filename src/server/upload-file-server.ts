import { getArrayToGroups } from "@/utils/common";
import {
  DEFAULT_UPLOADER_CONFIG,
  getArrayBufferFromBlob,
  getMd5FromArrayBuffer,
  sliceFiles,
} from "@/utils/uploaderHelpers";
import { WorkerService } from "./worker-service";
import SparkMD5 from "spark-md5";
import { checkFileIfExist } from "@/api/file-upload";

interface UploaderCallbackOption {
  onProgress: (progress: number) => void;
}

// 文件元数据
interface FileMetadata {
  size: number;
  type: string;
  lastModified: number;
}

export class MinioUploaderService {
  // 线程池服务
  private workerSvc: WorkerService;

  constructor(WorkerService: WorkerService) {
    this.workerSvc = WorkerService
  }

  async doUpload(
    file: File,
    callbackOption: UploaderCallbackOption
  ) {
    const chunkSize = DEFAULT_UPLOADER_CONFIG.chunkSize;
    // 文件大小/kb
    const fileSize = file.size / 1000;
    // 文件分片
    const chunksBlob = sliceFiles(file, chunkSize);
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
        return await this.workerSvc.getMD5ForFiles(chunkGroupsArrBuf)
      });

      for (const task of tasks) {
        const result = await task();
        chunksHash.push(...result)
      }

      // 根据分片的md5值二次哈希生成文件的md5值
      const fileHash = SparkMD5.hash(chunksHash.join(''));

      // 检查文件是否上传过
      const { data } = await checkFileIfExist(fileHash, fileSize);
      if (data.isExist) {
        return data.existUrl;
      }
    }
  }
}

