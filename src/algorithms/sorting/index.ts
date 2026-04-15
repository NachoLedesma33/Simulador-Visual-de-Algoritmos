import type { SortingStep } from '@/types';
import {
  bubbleSortGenerator,
  quickSortGenerator,
  mergeSortGenerator,
  insertionSortGenerator,
  selectionSortGenerator,
  heapSortGenerator,
  SORTING_GENERATORS,
  type SortingGenerator,
} from './generators';

export {
  bubbleSortGenerator,
  quickSortGenerator,
  mergeSortGenerator,
  insertionSortGenerator,
  selectionSortGenerator,
  heapSortGenerator,
  SORTING_GENERATORS,
  type SortingGenerator,
};

export function generateRandomArray(
  size: number,
  min = 1,
  max = 100
): number[] {
  const result: number[] = [];
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return result;
}

export function generateNearlySortedArray(
  size: number,
  swaps = Math.floor(size / 10)
): number[] {
  const array: number[] = [];
  for (let i = 0; i < size; i++) {
    array.push(i + 1);
  }

  for (let i = 0; i < swaps; i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = (idx1 + 1) % size;
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
  }

  return array;
}

export function generateReversedArray(size: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < size; i++) {
    result.push(size - i);
  }
  return result;
}

export function runGenerator<T extends SortingGenerator>(gen: T): SortingStep[] {
  return [...gen([])];
}

export type { SortingStep };