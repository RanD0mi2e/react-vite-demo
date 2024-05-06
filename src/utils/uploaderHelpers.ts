import SparkMD5 from "spark-md5";

/**
 * 文件分片
 * @param file 选中的文件
 * @param baseChunkUnit 分片单位(MB)
 * @returns {Blob[]} 文件分片后的分片数组
 */
export function sliceFiles(file: File, baseChunkUnit: number): Blob[] {
  const chunkSize = baseChunkUnit * 1024 * 1024; // 分片单位/mb
  const chunks: Blob[] = [];
  let startPos = 0;
  while (startPos < file.size) {
    chunks.push(file.slice(startPos, startPos + chunkSize)); // slice方法在分最后一片会智能判断文件blob结束范围，以结束范围作为分割
    startPos += chunkSize;
  }
  return chunks;
}

/**
 * 文件blob流转arrayBuffer流
 * @param chunks 选中文件的分片数组
 * @returns {ArrayBuffer[]} 选中文件的ArrayBuffer类型的分片数组
 */
export async function getArrayBufferFromBlob(
  chunks: Blob[]
): Promise<ArrayBuffer[]> {
  return Promise.all(chunks.map((chunk) => chunk.arrayBuffer()));
}

/**
 * 文件转换成arrayBuffer流
 * @param file 选中文件
 * @returns {Promise<ArrayBuffer[]>}
 */
export async function getArrayBufFromFile(file: File): Promise<ArrayBuffer[]> {
  // 分片大小为1mb，不允许擅自修改分片大小，因为文件的md5不是通过校验整个文件得出，而是根据校验全部分片得出。改变分片大小，分片数量会发生变化导致分片后二次hash发生变化
  const blobs = sliceFiles(file, 5);
  const arraybufs = await getArrayBufferFromBlob(blobs);
  return arraybufs;
}

/**
 * 获取ArrayBuffer块对应的md5
 * @param buffer ArrayBuffer块
 * @returns {string} md5值
 */
export function getMd5FromArrayBuffer(buffer: ArrayBuffer) {
  return SparkMD5.ArrayBuffer.hash(buffer)
}
