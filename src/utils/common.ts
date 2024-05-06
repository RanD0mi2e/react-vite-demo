/**
 * 生成不带'-'的UUID
 * @returns {string} UUID串
 */
export function generateUUID(): string {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 数组根据大小分组（一维数组二维化）
 * @param originArr 原始数组
 * @param groupSize 分组大小
 * @returns {T[][]} 分组后的数组
 */
export function getArrayToGroups<T>(originArr: T[], groupSize: number) {
  const result: T[][] = []
  let tempArr: T[] = []
  originArr.forEach(item => {
    tempArr.push(item)
    if (tempArr.length === groupSize) {
      result.push(tempArr)
      tempArr = []
    }
  })
  if (tempArr.length !== 0) {
    result.push(tempArr)
  }

  return result
}