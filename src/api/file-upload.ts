import { service } from "@/utils/customFetch";
import { postRequest } from "@/utils/http-file";

interface CheckFileIfExistRespData {
  isExist: boolean;
  existUrl?: string;
}

/**
 * 检查文件是否存在
 * @param fileHash 文件md5值
 * @param size 文件大小
 * @returns {Promise<void>}
 */
export function checkFileIfExist(fileHash: string, size: number) {
  return service.get<CheckFileIfExistRespData>("/minio/exist", {
    hash: fileHash,
    size: size + "",
  });
}

interface GetExistChunksRespData {
  needUploadChunks: string[];
}

/**
 * 获取需要上传的分片
 * @param fileHash  文件md5值
 * @param chunksHash  分片md5值数组
 * @returns {Promise<GetExistChunksRespData>} 需要上传的文件分片md5数组
 */
export function getExistChunks(fileHash: string, chunksHash: string[]) {
  return service.post<GetExistChunksRespData>("/minio/chunks", {
    hash: fileHash,
    hashList: chunksHash,
  });
}

/**
 * 上传文件
 * @param param FormData数据
 * @param callbackOption 回调函数
 * @returns {Promise<void>}
 */
export function uploadChunks(
  param: FormData,
  callback: (progress: number | string) => void
) {
  return postRequest("/minio/upload", param, {
    onProgress: callback,
  });
}

interface VerifyNeedReuploadChunksRespData {
  needReuploadChunks: string[];
}

/**
 * 校验分片完整性以及需要重新上传的分片
 * @param fileHash 文件md5值
 * @param chunksHash 分片md5值数组
 * @returns {Promise<VerifyNeedReuploadChunksRespData>}
 */
export function verifyNeedReuploadChunks(
  fileHash: string,
  chunksHash: string[]
) {
  // TODO: Implement chunk verification logic
  return service.post<VerifyNeedReuploadChunksRespData>("/minio/verify", {
    hash: fileHash,
    hashList: chunksHash,
  });
}

// 文件元数据
export interface FileMetadata {
  size: number;
  type: string;
  lastModified: number;
}

interface mergeChunksRespData {
  url: string;
}

/**
 * 合并分片
 * @param fileHash 文件md5值
 * @param fileName 文件名
 * @param size 文件大小
 * @param meta 文件元数据
 * @returns {Promise<void>}
 */
export function mergeChunks(
  fileHash: string,
  fileName: string,
  size: number,
  meta: FileMetadata
) {
  return service.post<mergeChunksRespData>("/minio/merge", {
    hash: fileHash,
    name: fileName,
    size: size + "",
    meta: JSON.stringify(meta),
  });
}
