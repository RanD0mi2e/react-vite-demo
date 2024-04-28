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
