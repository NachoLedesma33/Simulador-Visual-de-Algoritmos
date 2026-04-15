import { describe, it, expect } from 'vitest';
import {
  bubbleSortGenerator,
  quickSortGenerator,
  mergeSortGenerator,
  insertionSortGenerator,
  selectionSortGenerator,
  heapSortGenerator,
} from './generators';
import type { SortingStep } from '@/types';

function isSorted(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

function runGenerator(gen: Generator<SortingStep>): SortingStep[] {
  const steps: SortingStep[] = [];
  for (const step of gen) {
    steps.push(step);
  }
  return steps;
}

describe('bubbleSortGenerator', () => {
  it('produces sorted array in final step', () => {
    const arr = [5, 3, 8, 1, 2];
    const steps = runGenerator(bubbleSortGenerator(arr));
    const lastStep = steps[steps.length - 1];
    expect(isSorted([...lastStep.array])).toBe(true);
  });

  it('initial step has null comparing and swapping', () => {
    const arr = [3, 1, 2];
    const steps = runGenerator(bubbleSortGenerator(arr));
    const firstStep = steps[0];
    expect(firstStep.comparing).toBeNull();
    expect(firstStep.swapping).toBeNull();
  });

  it('sorted grows incrementally', () => {
    const arr = [3, 1, 2];
    const steps = runGenerator(bubbleSortGenerator(arr));
    let prevLen = 0;
    for (const step of steps) {
      expect(step.sorted.length).toBeGreaterThanOrEqual(prevLen);
      prevLen = step.sorted.length;
    }
  });

  it('handles empty array', () => {
    const steps = runGenerator(bubbleSortGenerator([]));
    expect(steps.length).toBeGreaterThan(0);
    expect(isSorted([...steps[steps.length - 1].array])).toBe(true);
  });

  it('handles single element', () => {
    const steps = runGenerator(bubbleSortGenerator([1]));
    expect(isSorted([...steps[steps.length - 1].array])).toBe(true);
  });

  it('handles already sorted', () => {
    const arr = [1, 2, 3, 4, 5];
    const steps = runGenerator(bubbleSortGenerator(arr));
    expect(isSorted([...steps[steps.length - 1].array])).toBe(true);
  });

  it('handles reversed array', () => {
    const arr = [5, 4, 3, 2, 1];
    const steps = runGenerator(bubbleSortGenerator(arr));
    expect(isSorted([...steps[steps.length - 1].array])).toBe(true);
  });

  it('handles duplicates', () => {
    const arr = [3, 1, 3, 1];
    const steps = runGenerator(bubbleSortGenerator(arr));
    expect(isSorted([...steps[steps.length - 1].array])).toBe(true);
  });
});

describe('quickSortGenerator', () => {
  it('produces sorted array in final step', () => {
    const arr = [5, 3, 8, 1, 2];
    const steps = runGenerator(quickSortGenerator(arr));
    const lastStep = steps[steps.length - 1];
    expect(isSorted([...lastStep.array])).toBe(true);
  });

  it('initial step has null comparing and swapping', () => {
    const arr = [3, 1, 2];
    const steps = runGenerator(quickSortGenerator(arr));
    const firstStep = steps[0];
    expect(firstStep.comparing).toBeNull();
    expect(firstStep.swapping).toBeNull();
  });

  it('handles empty array', () => {
    const steps = runGenerator(quickSortGenerator([]));
    expect(steps.length).toBeGreaterThan(0);
  });

  it('handles single element', () => {
    const steps = runGenerator(quickSortGenerator([1]));
    expect(isSorted([...steps[steps.length - 1].array])).toBe(true);
  });
});

describe('mergeSortGenerator', () => {
  it('produces sorted array in final step', () => {
    const arr = [5, 3, 8, 1, 2];
    const steps = runGenerator(mergeSortGenerator(arr));
    const lastStep = steps[steps.length - 1];
    expect(isSorted([...lastStep.array])).toBe(true);
  });

  it('handles empty array', () => {
    const steps = runGenerator(mergeSortGenerator([]));
    expect(steps.length).toBeGreaterThan(0);
  });

  it('handles single element', () => {
    const steps = runGenerator(mergeSortGenerator([1]));
    expect(isSorted([...steps[steps.length - 1].array])).toBe(true);
  });
});

describe('insertionSortGenerator', () => {
  it('produces sorted array in final step', () => {
    const arr = [5, 3, 8, 1, 2];
    const steps = runGenerator(insertionSortGenerator(arr));
    const lastStep = steps[steps.length - 1];
    expect(isSorted([...lastStep.array])).toBe(true);
  });

  it('handles empty array', () => {
    const steps = runGenerator(insertionSortGenerator([]));
    expect(steps.length).toBeGreaterThan(0);
  });

  it('handles already sorted', () => {
    const arr = [1, 2, 3, 4, 5];
    const steps = runGenerator(insertionSortGenerator(arr));
    expect(isSorted([...steps[steps.length - 1].array])).toBe(true);
  });
});

describe('selectionSortGenerator', () => {
  it('produces sorted array in final step', () => {
    const arr = [5, 3, 8, 1, 2];
    const steps = runGenerator(selectionSortGenerator(arr));
    const lastStep = steps[steps.length - 1];
    expect(isSorted([...lastStep.array])).toBe(true);
  });

  it('initial step has null comparing and swapping', () => {
    const arr = [3, 1, 2];
    const steps = runGenerator(selectionSortGenerator(arr));
    const firstStep = steps[0];
    expect(firstStep.comparing).toBeNull();
    expect(firstStep.swapping).toBeNull();
  });

  it('handles empty array', () => {
    const steps = runGenerator(selectionSortGenerator([]));
    expect(steps.length).toBeGreaterThan(0);
  });
});

describe('heapSortGenerator', () => {
  it('produces sorted array in final step', () => {
    const arr = [5, 3, 8, 1, 2];
    const steps = runGenerator(heapSortGenerator(arr));
    const lastStep = steps[steps.length - 1];
    expect(isSorted([...lastStep.array])).toBe(true);
  });

  it('handles empty array', () => {
    const steps = runGenerator(heapSortGenerator([]));
    expect(steps.length).toBeGreaterThan(0);
  });

  it('handles single element', () => {
    const steps = runGenerator(heapSortGenerator([1]));
    expect(isSorted([...steps[steps.length - 1].array])).toBe(true);
  });
});