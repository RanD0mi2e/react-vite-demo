import { service } from "@/utils/customFetch";
import { postRequest } from "@/utils/http-file";


interface CheckFileIfExistData {
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
  return service.get<CheckFileIfExistData>("/minio/exist", {
    hash: fileHash,
    size: size + "",
  });
}


export function getExistChunks(fileHash: string, chunksHash: string[]) {
  return service.post<string[]>("/minio/chunks", {
    hash: fileHash,
    hashList: chunksHash,
  });
}
