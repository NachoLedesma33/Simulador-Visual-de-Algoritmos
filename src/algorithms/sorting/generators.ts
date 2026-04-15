import type { SortingStep, SortingAlgorithmType } from '@/types';

function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function createStep(
  arr: readonly number[],
  comparing: readonly [number, number] | null = null,
  swapping: readonly [number, number] | null = null,
  sorted: readonly number[] = [],
  options?: Partial<SortingStep>
): SortingStep {
  return {
    array: [...arr],
    comparing,
    swapping,
    sorted: [...sorted],
    ...options,
  };
}

export function* bubbleSortGenerator(
  arr: readonly number[]
): Generator<SortingStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  yield createStep(array, null, null, sorted);

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {
      yield createStep(array, [j, j + 1], null, sorted);

      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        yield createStep(array, null, [j, j + 1], sorted);
        swapped = true;
      }
    }

    sorted.unshift(n - 1 - i);

    if (!swapped) {
      for (let k = 0; k < n - 1 - i; k++) {
        if (!sorted.includes(k)) sorted.unshift(k);
      }
      break;
    }
  }

  sorted.unshift(0);
  yield createStep(array, null, null, sorted);
}

export function* quickSortGenerator(
  arr: readonly number[]
): Generator<SortingStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  yield createStep(array, null, null, sorted);

  type StackItem = [number, number];
  const stack: StackItem[] = [[0, n - 1]];

  while (stack.length > 0) {
    const [low, high] = stack.pop()!;

    if (low >= high) {
      if (low === high && !sorted.includes(low)) sorted.push(low);
      continue;
    }

    yield createStep(array, null, null, sorted, { pivot: high });

    let pivotIndex = low - 1;
    const pivotValue = array[high];

    for (let i = low; i < high; i++) {
      yield createStep(array, [i, high], null, sorted, { pivot: high });

      if (array[i] <= pivotValue) {
        pivotIndex++;
        if (pivotIndex !== i) {
          swap(array, pivotIndex, i);
          yield createStep(array, null, [pivotIndex, i], sorted, { pivot: high });
        }
      }
    }

    pivotIndex++;
    if (pivotIndex !== high) {
      swap(array, pivotIndex, high);
      yield createStep(array, null, [pivotIndex, high], sorted, { pivot: pivotIndex });
    }

    sorted.push(pivotIndex);

    if (pivotIndex + 1 < high) stack.push([pivotIndex + 1, high]);
    if (low < pivotIndex - 1) stack.push([low, pivotIndex - 1]);
  }

  yield createStep(array, null, null, sorted);
}

export function* mergeSortGenerator(
  arr: readonly number[]
): Generator<SortingStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  yield createStep(array, null, null, sorted);

  for (let size = 1; size < n; size *= 2) {
    for (let left = 0; left < n; left += size * 2) {
      const mid = Math.min(left + size, n);
      const right = Math.min(left + size * 2, n);

      yield createStep(array, null, null, sorted, {
        merging: [left, right - 1],
      });

      const leftArr = array.slice(left, mid);
      const rightArr = array.slice(mid, right);

      let i = 0;
      let j = 0;
      let k = left;

      while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
          array[k] = leftArr[i];
          i++;
        } else {
          array[k] = rightArr[j];
          j++;
        }
        k++;
        yield createStep(array, null, null, sorted, {
          merging: [left, right - 1],
        });
      }

      while (i < leftArr.length) {
        array[k] = leftArr[i];
        i++;
        k++;
        yield createStep(array, null, null, sorted, {
          merging: [left, right - 1],
        });
      }

      while (j < rightArr.length) {
        array[k] = rightArr[j];
        j++;
        k++;
        yield createStep(array, null, null, sorted, {
          merging: [left, right - 1],
        });
      }

      for (let idx = left; idx < right; idx++) {
        if (!sorted.includes(idx)) sorted.push(idx);
      }
    }
  }

  yield createStep(array, null, null, sorted);
}

export function* insertionSortGenerator(
  arr: readonly number[]
): Generator<SortingStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  yield createStep(array, null, null, sorted);

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    yield createStep(array, [i, j], null, sorted);

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      yield createStep(array, null, [j, j + 1], sorted);
      j--;
      if (j >= 0) {
        yield createStep(array, [i, j], null, sorted);
      }
    }

    array[j + 1] = key;
    if (j + 1 !== i) {
      yield createStep(array, null, [j + 1, i], sorted);
    }

    for (let k = 0; k <= i; k++) {
      if (!sorted.includes(k)) sorted.push(k);
    }

    yield createStep(array, null, null, sorted);
  }

  yield createStep(array, null, null, sorted);
}

export function* selectionSortGenerator(
  arr: readonly number[]
): Generator<SortingStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  yield createStep(array, null, null, sorted);

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      yield createStep(array, [minIdx, j], null, sorted);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      swap(array, i, minIdx);
      yield createStep(array, null, [i, minIdx], sorted);
    }

    sorted.push(i);
    yield createStep(array, null, null, sorted);
  }

  sorted.push(n - 1);
  yield createStep(array, null, null, sorted);
}

function* heapify(
  arr: number[],
  n: number,
  i: number,
  sorted: number[]
): Generator<SortingStep> {
  let root = i;
  while (true) {
    const left = 2 * root + 1;
    const right = 2 * root + 2;
    let largest = root;

    if (left < n) {
      yield createStep(arr, [largest, left], null, sorted);
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      yield createStep(arr, [largest, right], null, sorted);
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest === root) break;

    swap(arr, root, largest);
    yield createStep(arr, null, [root, largest], sorted);
    root = largest;
  }
}

export function* heapSortGenerator(
  arr: readonly number[]
): Generator<SortingStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  yield createStep(array, null, null, sorted);

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(array, n, i, sorted);
  }

  for (let i = n - 1; i > 0; i--) {
    swap(array, 0, i);
    yield createStep(array, null, [0, i], sorted);

    sorted.unshift(i);

    yield* heapify(array, i, 0, sorted);
  }

  sorted.unshift(0);
  yield createStep(array, null, null, sorted);
}

export const SORTING_GENERATORS: Record<
  Exclude<SortingAlgorithmType, 'shell' | 'radix' | 'counting' | 'tim'>,
  (arr: readonly number[]) => Generator<SortingStep>
> = {
  bubble: bubbleSortGenerator,
  quick: quickSortGenerator,
  merge: mergeSortGenerator,
  insertion: insertionSortGenerator,
  selection: selectionSortGenerator,
  heap: heapSortGenerator,
} as const;

export type SortingGenerator = (arr: readonly number[]) => Generator<SortingStep>;