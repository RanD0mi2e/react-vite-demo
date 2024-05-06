import { getArrayToGroups } from "@/utils/common";
import { expect, test } from "vitest";

// 刚好被分组长度完全等分
test("split array into groups exactly", () => {
  const arr = [1, 2, 3, 4, 5, 6];
  const size = 2;
  const result = getArrayToGroups(arr, size);
  expect(result).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
});

// 最后一组小于分组长度
test("split array into groups with non-evenly divisible length", () => {
  const arr = [1, 2, 3, 4, 5];
  const size = 2;
  const result = getArrayToGroups(arr, size);
  expect(result).toEqual([[1, 2], [3, 4], [5]]);
});

// 空数组的分组
test("split an empty array into groups", () => {
  const arr: number[] = [];
  const size = 2;
  const result = getArrayToGroups(arr, size);
  expect(result).toEqual([]);
});
