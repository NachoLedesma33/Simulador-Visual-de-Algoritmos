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

export function* shellSortGenerator(arr: readonly number[]): Generator<SortingStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];
  yield createStep(array, null, null, sorted);

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;
      
      yield createStep(array, [j - gap, i], null, sorted);

      while (j >= gap && array[j - gap] > temp) {
        array[j] = array[j - gap];
        yield createStep(array, null, [j, j - gap], sorted);
        j -= gap;
        if (j >= gap) {
           yield createStep(array, [j - gap, i], null, sorted);
        }
      }
      array[j] = temp;
      yield createStep(array, null, null, sorted);
    }
  }
  for(let i=0; i<n; i++) sorted.push(i);
  yield createStep(array, null, null, sorted);
}

export function* countingSortGenerator(arr: readonly number[]): Generator<SortingStep> {
  const array = [...arr];
  const n = array.length;
  if(n === 0) return;
  const sorted: number[] = [];
  yield createStep(array, null, null, sorted);

  const max = Math.max(...array, 0);
  const min = Math.min(...array, 0);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    yield createStep(array, [i, i], null, sorted);
    count[array[i] - min]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    yield createStep(array, [i, i], null, sorted);
    output[count[array[i] - min] - 1] = array[i];
    count[array[i] - min]--;
  }

  for (let i = 0; i < n; i++) {
    array[i] = output[i];
    sorted.push(i);
    yield createStep(array, null, [i, i], sorted);
  }
}

export function* radixSortGenerator(arr: readonly number[]): Generator<SortingStep> {
  const array = [...arr];
  const n = array.length;
  if (n === 0) return;
  const sorted: number[] = [];
  yield createStep(array, null, null, sorted);

  const max = Math.max(...array);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      yield createStep(array, [i, i], null, sorted);
      const digit = Math.floor(array[i] / exp) % 10;
      count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
       yield createStep(array, [i, i], null, sorted);
      const digit = Math.floor(array[i] / exp) % 10;
      output[count[digit] - 1] = array[i];
      count[digit]--;
    }

    for (let i = 0; i < n; i++) {
      array[i] = output[i];
      yield createStep(array, null, [i, i], sorted);
    }
  }

  for(let i=0; i<n; i++) sorted.push(i);
  yield createStep(array, null, null, sorted);
}

export function* timSortGenerator(arr: readonly number[]): Generator<SortingStep> {
  const array = [...arr];
  const n = array.length;
  const RUN = 4;
  const sorted: number[] = [];
  yield createStep(array, null, null, sorted);

  for (let i = 0; i < n; i += RUN) {
    const end = Math.min(i + RUN - 1, n - 1);
    for (let j = i + 1; j <= end; j++) {
      const temp = array[j];
      let k = j - 1;
      yield createStep(array, [j, k], null, sorted);
      while (k >= i && array[k] > temp) {
        array[k + 1] = array[k];
        yield createStep(array, null, [k, k + 1], sorted);
        k--;
        if (k >= i) yield createStep(array, [j, k], null, sorted);
      }
      array[k + 1] = temp;
      yield createStep(array, null, null, sorted);
    }
  }

  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) {
        yield createStep(array, null, null, sorted, { merging: [left, right] } as any);
        const leftArr = array.slice(left, mid + 1);
        const rightArr = array.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
           yield createStep(array, null, null, sorted, { merging: [left, right] } as any);
          if (leftArr[i] <= rightArr[j]) {
            array[k] = leftArr[i];
            i++;
          } else {
            array[k] = rightArr[j];
            j++;
          }
          k++;
        }
        while (i < leftArr.length) {
          array[k] = leftArr[i];
          k++; i++;
          yield createStep(array, null, null, sorted, { merging: [left, right] } as any);
        }
        while (j < rightArr.length) {
          array[k] = rightArr[j];
          k++; j++;
          yield createStep(array, null, null, sorted, { merging: [left, right] } as any);
        }
      }
    }
  }

  for(let i=0; i<n; i++) sorted.push(i);
  yield createStep(array, null, null, sorted);
}

export const SORTING_GENERATORS: Record<
  SortingAlgorithmType,
  (arr: readonly number[]) => Generator<SortingStep>
> = {
  bubble: bubbleSortGenerator,
  quick: quickSortGenerator,
  merge: mergeSortGenerator,
  insertion: insertionSortGenerator,
  selection: selectionSortGenerator,
  heap: heapSortGenerator,
  shell: shellSortGenerator,
  radix: radixSortGenerator,
  counting: countingSortGenerator,
  tim: timSortGenerator,
} as any;

export type SortingGenerator = (arr: readonly number[]) => Generator<SortingStep>;