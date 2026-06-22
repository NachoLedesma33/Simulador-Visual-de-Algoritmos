import type { SupportedAlgorithmType } from './theory';

export type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'java' | 'cpp' | 'csharp' | 'go' | 'rust' | 'kotlin' | 'swift';

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  java: 'Java',
  cpp: 'C++',
  csharp: 'C#',
  go: 'Go',
  rust: 'Rust',
  kotlin: 'Kotlin',
  swift: 'Swift',
};

export const LANGUAGES: SupportedLanguage[] = ['python', 'javascript', 'typescript', 'java', 'cpp', 'csharp', 'go', 'rust', 'kotlin', 'swift'];

export const ALGORITHM_SNIPPETS: Record<SupportedAlgorithmType, Record<SupportedLanguage, string>> = {
  bubble: {
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    typescript: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    csharp: `public static void BubbleSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    go: `func bubbleSort(arr []int) {
    n := len(arr)
    for i := 0; i < n; i++ {
        swapped := false
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = true
            }
        }
        if !swapped {
            break
        }
    }
}`,
    rust: `fn bubble_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in 0..n {
        let mut swapped = false;
        for j in 0..n - i - 1 {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
                swapped = true;
            }
        }
        if !swapped {
            break;
        }
    }
}`,
    kotlin: `fun bubbleSort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n) {
        var swapped = false
        for (j in 0 until n - i - 1) {
            if (arr[j] > arr[j + 1]) {
                val temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                swapped = true
            }
        }
        if (!swapped) break
    }
}`,
    swift: `func bubbleSort(_ arr: inout [Int]) {
    let n = arr.count
    for i in 0..<n {
        var swapped = false
        for j in 0..<n-i-1 {
            if arr[j] > arr[j+1] {
                arr.swapAt(j, j+1)
                swapped = true
            }
        }
        if !swapped { break }
    }
}`,
  },
  quick: {
    python: `def quick_sort(arr, low, high):
    if low < high:
        p = partition(arr, low, high)
        quick_sort(arr, low, p - 1)
        quick_sort(arr, p + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    javascript: `function quickSort(arr, low, high) {
  if (low < high) {
    const p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    typescript: `function quickSort(arr: number[], low: number, high: number): number[] {
  if (low < high) {
    const p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}

public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
    cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}`,
    csharp: `public static int Partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            (arr[i], arr[j]) = (arr[j], arr[i]);
        }
    }
    (arr[i + 1], arr[high]) = (arr[high], arr[i + 1]);
    return i + 1;
}

public static void QuickSort(int[] arr, int low, int high) {
    if (low < high) {
        int p = Partition(arr, low, high);
        QuickSort(arr, low, p - 1);
        QuickSort(arr, p + 1, high);
    }
}`,
    go: `func partition(arr []int, low, high int) int {
    pivot := arr[high]
    i := low - 1
    for j := low; j < high; j++ {
        if arr[j] <= pivot {
            i++
            arr[i], arr[j] = arr[j], arr[i]
        }
    }
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1
}

func quickSort(arr []int, low, high int) {
    if low < high {
        p := partition(arr, low, high)
        quickSort(arr, low, p-1)
        quickSort(arr, p+1, high)
    }
}`,
    rust: `fn partition(arr: &mut [i32], low: usize, high: usize) -> usize {
    let pivot = arr[high];
    let mut i = low as isize - 1;
    for j in low..high {
        if arr[j] <= pivot {
            i += 1;
            arr.swap(i as usize, j);
        }
    }
    arr.swap((i + 1) as usize, high);
    (i + 1) as usize
}

fn quick_sort(arr: &mut [i32], low: usize, high: usize) {
    if low < high {
        let p = partition(arr, low, high);
        if p > 0 { quick_sort(arr, low, p - 1); }
        quick_sort(arr, p + 1, high);
    }
}`,
    kotlin: `fun quickSort(arr: IntArray, low: Int, high: Int) {
    if (low < high) {
        val p = partition(arr, low, high)
        quickSort(arr, low, p - 1)
        quickSort(arr, p + 1, high)
    }
}

fun partition(arr: IntArray, low: Int, high: Int): Int {
    val pivot = arr[high]
    var i = low - 1
    for (j in low until high) {
        if (arr[j] <= pivot) {
            i++
            val temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    val temp = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = temp
    return i + 1
}`,
    swift: `func partition(_ arr: inout [Int], _ low: Int, _ high: Int) -> Int {
    let pivot = arr[high]
    var i = low - 1
    for j in low..<high {
        if arr[j] <= pivot {
            i += 1
            arr.swapAt(i, j)
        }
    }
    arr.swapAt(i + 1, high)
    return i + 1
}

func quickSort(_ arr: inout [Int], _ low: Int, _ high: Int) {
    if low < high {
        let p = partition(&arr, low, high)
        quickSort(&arr, low, p - 1)
        quickSort(&arr, p + 1, high)
    }
}`,
  },
  insertion: {
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    typescript: `function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    cpp: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    csharp: `public static void InsertionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    go: `func insertionSort(arr []int) {
    n := len(arr)
    for i := 1; i < n; i++ {
        key := arr[i]
        j := i - 1
        for j >= 0 && arr[j] > key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}`,
    rust: `fn insertion_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in 1..n {
        let key = arr[i];
        let mut j = i as isize - 1;
        while j >= 0 && arr[j as usize] > key {
            arr[(j + 1) as usize] = arr[j as usize];
            j -= 1;
        }
        arr[(j + 1) as usize] = key;
    }
}`,
    kotlin: `fun insertionSort(arr: IntArray) {
    val n = arr.size
    for (i in 1 until n) {
        val key = arr[i]
        var j = i - 1
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = key
    }
}`,
    swift: `func insertionSort(_ arr: inout [Int]) {
    let n = arr.count
    for i in 1..<n {
        let key = arr[i]
        var j = i - 1
        while j >= 0 && arr[j] > key {
            arr[j + 1] = arr[j]
            j -= 1
        }
        arr[j + 1] = key
    }
}`,
  },
  selection: {
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
    typescript: `function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
    java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
    cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
    csharp: `public static void SelectionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        (arr[i], arr[minIdx]) = (arr[minIdx], arr[i]);
    }
}`,
    go: `func selectionSort(arr []int) {
    n := len(arr)
    for i := 0; i < n; i++ {
        minIdx := i
        for j := i + 1; j < n; j++ {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        arr[i], arr[minIdx] = arr[minIdx], arr[i]
    }
}`,
    rust: `fn selection_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in 0..n {
        let mut min_idx = i;
        for j in i + 1..n {
            if arr[j] < arr[min_idx] {
                min_idx = j;
            }
        }
        arr.swap(i, min_idx);
    }
}`,
    kotlin: `fun selectionSort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n) {
        var minIdx = i
        for (j in i + 1 until n) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j
            }
        }
        val temp = arr[i]
        arr[i] = arr[minIdx]
        arr[minIdx] = temp
    }
}`,
    swift: `func selectionSort(_ arr: inout [Int]) {
    let n = arr.count
    for i in 0..<n {
        var minIdx = i
        for j in i + 1..<n {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        arr.swapAt(i, minIdx)
    }
}`,
  },
  merge: {
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    typescript: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    java: `public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
    return merge(left, right);
}

public static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result[k++] = left[i++];
        } else {
            result[k++] = right[j++];
        }
    }
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    return result;
}`,
    cpp: `vector<int> merge(vector<int>& left, vector<int>& right) {
    vector<int> result;
    int i = 0, j = 0;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) {
            result.push_back(left[i++]);
        } else {
            result.push_back(right[j++]);
        }
    }
    while (i < left.size()) result.push_back(left[i++]);
    while (j < right.size()) result.push_back(right[j++]);
    return result;
}

vector<int> mergeSort(vector<int>& arr) {
    if (arr.size() <= 1) return arr;
    int mid = arr.size() / 2;
    vector<int> left(arr.begin(), arr.begin() + mid);
    vector<int> right(arr.begin() + mid, arr.end());
    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right);
}`,
    csharp: `public static int[] MergeSort(int[] arr) {
    if (arr.Length <= 1) return arr;
    int mid = arr.Length / 2;
    int[] left = MergeSort(arr[..mid]);
    int[] right = MergeSort(arr[mid..]);
    return Merge(left, right);
}

public static int[] Merge(int[] left, int[] right) {
    int[] result = new int[left.Length + right.Length];
    int i = 0, j = 0, k = 0;
    while (i < left.Length && j < right.Length) {
        result[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    }
    while (i < left.Length) result[k++] = left[i++];
    while (j < right.Length) result[k++] = right[j++];
    return result;
}`,
    go: `func mergeSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    mid := len(arr) / 2
    left := mergeSort(append([]int{}, arr[:mid]...))
    right := mergeSort(append([]int{}, arr[mid:]...))
    return merge(left, right)
}

func merge(left, right []int) []int {
    result := make([]int, 0, len(left)+len(right))
    i, j := 0, 0
    for i < len(left) && j < len(right) {
        if left[i] <= right[j] {
            result = append(result, left[i])
            i++
        } else {
            result = append(result, right[j])
            j++
        }
    }
    result = append(result, left[i:]...)
    result = append(result, right[j:]...)
    return result
}`,
    rust: `fn merge_sort(arr: &[i32]) -> Vec<i32> {
    if arr.len() <= 1 {
        return arr.to_vec();
    }
    let mid = arr.len() / 2;
    let left = merge_sort(&arr[..mid]);
    let right = merge_sort(&arr[mid..]);
    merge(&left, &right)
}

fn merge(left: &[i32], right: &[i32]) -> Vec<i32> {
    let mut result = Vec::with_capacity(left.len() + right.len());
    let (mut i, mut j) = (0, 0);
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] {
            result.push(left[i]);
            i += 1;
        } else {
            result.push(right[j]);
            j += 1;
        }
    }
    result.extend_from_slice(&left[i..]);
    result.extend_from_slice(&right[j..]);
    result
}`,
    kotlin: `fun mergeSort(arr: List<Int>): List<Int> {
    if (arr.size <= 1) return arr
    val mid = arr.size / 2
    val left = mergeSort(arr.subList(0, mid))
    val right = mergeSort(arr.subList(mid, arr.size))
    return merge(left, right)
}

fun merge(left: List<Int>, right: List<Int>): List<Int> {
    val result = mutableListOf<Int>()
    var i = 0; var j = 0
    while (i < left.size && j < right.size) {
        if (left[i] <= right[j]) result.add(left[i++])
        else result.add(right[j++])
    }
    result.addAll(left.subList(i, left.size))
    result.addAll(right.subList(j, right.size))
    return result
}`,
    swift: `func mergeSort(_ arr: [Int]) -> [Int] {
    guard arr.count > 1 else { return arr }
    let mid = arr.count / 2
    let left = mergeSort(Array(arr[..<mid]))
    let right = mergeSort(Array(arr[mid...]))
    return merge(left, right)
}

func merge(_ left: [Int], _ right: [Int]) -> [Int] {
    var result: [Int] = []
    var i = 0, j = 0
    while i < left.count && j < right.count {
        if left[i] <= right[j] {
            result.append(left[i])
            i += 1
        } else {
            result.append(right[j])
            j += 1
        }
    }
    result.append(contentsOf: left[i...])
    result.append(contentsOf: right[j...])
    return result
}`,
  },
  heap: {
    python: `def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr`,
    javascript: `function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
    typescript: `function heapify(arr: number[], n: number, i: number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function heapSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
    java: `public static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
    cpp: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
    csharp: `public static void Heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        (arr[i], arr[largest]) = (arr[largest], arr[i]);
        Heapify(arr, n, largest);
    }
}

public static void HeapSort(int[] arr) {
    int n = arr.Length;
    for (int i = n / 2 - 1; i >= 0; i--) Heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        (arr[0], arr[i]) = (arr[i], arr[0]);
        Heapify(arr, i, 0);
    }
}`,
    go: `func heapify(arr []int, n, i int) {
    largest := i
    left := 2*i + 1
    right := 2*i + 2
    if left < n && arr[left] > arr[largest] {
        largest = left
    }
    if right < n && arr[right] > arr[largest] {
        largest = right
    }
    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}

func heapSort(arr []int) {
    n := len(arr)
    for i := n/2 - 1; i >= 0; i-- {
        heapify(arr, n, i)
    }
    for i := n - 1; i > 0; i-- {
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    }
}`,
    rust: `fn heapify(arr: &mut [i32], n: usize, i: usize) {
    let mut largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if left < n && arr[left] > arr[largest] { largest = left; }
    if right < n && arr[right] > arr[largest] { largest = right; }
    if largest != i {
        arr.swap(i, largest);
        heapify(arr, n, largest);
    }
}

fn heap_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in (0..n / 2).rev() { heapify(arr, n, i); }
    for i in (1..n).rev() {
        arr.swap(0, i);
        heapify(arr, i, 0);
    }
}`,
    kotlin: `fun heapify(arr: IntArray, n: Int, i: Int) {
    var largest = i
    val left = 2 * i + 1
    val right = 2 * i + 2
    if (left < n && arr[left] > arr[largest]) largest = left
    if (right < n && arr[right] > arr[largest]) largest = right
    if (largest != i) {
        val temp = arr[i]
        arr[i] = arr[largest]
        arr[largest] = temp
        heapify(arr, n, largest)
    }
}

fun heapSort(arr: IntArray) {
    val n = arr.size
    for (i in n / 2 - 1 downTo 0) heapify(arr, n, i)
    for (i in n - 1 downTo 1) {
        val temp = arr[0]
        arr[0] = arr[i]
        arr[i] = temp
        heapify(arr, i, 0)
    }
}`,
    swift: `func heapify(_ arr: inout [Int], _ n: Int, _ i: Int) {
    var largest = i
    let left = 2 * i + 1
    let right = 2 * i + 2
    if left < n && arr[left] > arr[largest] { largest = left }
    if right < n && arr[right] > arr[largest] { largest = right }
    if largest != i {
        arr.swapAt(i, largest)
        heapify(&arr, n, largest)
    }
}

func heapSort(_ arr: inout [Int]) {
    let n = arr.count
    for i in stride(from: n / 2 - 1, through: 0, by: -1) { heapify(&arr, n, i) }
    for i in stride(from: n - 1, through: 1, by: -1) {
        arr.swapAt(0, i)
        heapify(&arr, i, 0)
    }
}`,
  },
  shell: {
    python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,
    javascript: `function shellSort(arr) {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,
    typescript: `function shellSort(arr: number[]): number[] {
  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,
    java: `public static void shellSort(int[] arr) {
    int n = arr.length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
    cpp: `void shellSort(vector<int>& arr) {
    int n = arr.size();
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
    csharp: `public static void ShellSort(int[] arr) {
    int n = arr.Length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
    go: `func shellSort(arr []int) {
    n := len(arr)
    for gap := n / 2; gap > 0; gap /= 2 {
        for i := gap; i < n; i++ {
            temp := arr[i]
            j := i
            for j >= gap && arr[j-gap] > temp {
                arr[j] = arr[j-gap]
                j -= gap
            }
            arr[j] = temp
        }
    }
}`,
    rust: `fn shell_sort(arr: &mut [i32]) {
    let n = arr.len();
    let mut gap = n / 2;
    while gap > 0 {
        for i in gap..n {
            let temp = arr[i];
            let mut j = i;
            while j >= gap && arr[j - gap] > temp {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap /= 2;
    }
}`,
    kotlin: `fun shellSort(arr: IntArray) {
    val n = arr.size
    var gap = n / 2
    while (gap > 0) {
        for (i in gap until n) {
            val temp = arr[i]
            var j = i
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap]
                j -= gap
            }
            arr[j] = temp
        }
        gap /= 2
    }
}`,
    swift: `func shellSort(_ arr: inout [Int]) {
    let n = arr.count
    var gap = n / 2
    while gap > 0 {
        for i in gap..<n {
            let temp = arr[i]
            var j = i
            while j >= gap && arr[j - gap] > temp {
                arr[j] = arr[j - gap]
                j -= gap
            }
            arr[j] = temp
        }
        gap /= 2
    }
}`,
  },
  radix: {
    python: `def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in range(n):
        index = arr[i] // exp % 10
        count[index] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        index = arr[i] // exp % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
    for i in range(n):
        arr[i] = output[i]

def radix_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    return arr`,
    javascript: `function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  for (let i = n - 1; i >= 0; i--) {
    const idx = Math.floor(arr[i] / exp) % 10;
    output[count[idx] - 1] = arr[i];
    count[idx]--;
  }
  for (let i = 0; i < n; i++) arr[i] = output[i];
}

function radixSort(arr) {
  if (arr.length === 0) return arr;
  const maxVal = Math.max(...arr);
  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  return arr;
}`,
    typescript: `function countingSortByDigit(arr: number[], exp: number): void {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  for (let i = n - 1; i >= 0; i--) {
    const idx = Math.floor(arr[i] / exp) % 10;
    output[count[idx] - 1] = arr[i];
    count[idx]--;
  }
  for (let i = 0; i < n; i++) arr[i] = output[i];
}

function radixSort(arr: number[]): number[] {
  if (arr.length === 0) return arr;
  const maxVal = Math.max(...arr);
  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  return arr;
}`,
    java: `public static void countingSortByDigit(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int idx = (arr[i] / exp) % 10;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
    }
    System.arraycopy(output, 0, arr, 0, n);
}

public static void radixSort(int[] arr) {
    if (arr.length == 0) return;
    int maxVal = Arrays.stream(arr).max().getAsInt();
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}`,
    cpp: `void countingSortByDigit(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n);
    vector<int> count(10, 0);
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int idx = (arr[i] / exp) % 10;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radixSort(vector<int>& arr) {
    if (arr.empty()) return;
    int maxVal = *max_element(arr.begin(), arr.end());
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}`,
    csharp: `public static void CountingSortByDigit(int[] arr, int exp) {
    int n = arr.Length;
    int[] output = new int[n];
    int[] count = new int[10];
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int idx = (arr[i] / exp) % 10;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
    }
    Array.Copy(output, arr, n);
}

public static void RadixSort(int[] arr) {
    if (arr.Length == 0) return;
    int maxVal = arr.Max();
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        CountingSortByDigit(arr, exp);
    }
}`,
    go: `func countingSortByDigit(arr []int, exp int) {
    n := len(arr)
    output := make([]int, n)
    count := make([]int, 10)
    for i := 0; i < n; i++ {
        count[(arr[i]/exp)%10]++
    }
    for i := 1; i < 10; i++ {
        count[i] += count[i-1]
    }
    for i := n - 1; i >= 0; i-- {
        idx := (arr[i] / exp) % 10
        output[count[idx]-1] = arr[i]
        count[idx]--
    }
    copy(arr, output)
}

func radixSort(arr []int) {
    if len(arr) == 0 {
        return
    }
    maxVal := arr[0]
    for _, v := range arr {
        if v > maxVal {
            maxVal = v
        }
    }
    for exp := 1; maxVal/exp > 0; exp *= 10 {
        countingSortByDigit(arr, exp)
    }
}`,
    rust: `fn counting_sort_by_digit(arr: &mut [i32], exp: i32) {
    let n = arr.len();
    let mut output = vec![0; n];
    let mut count = vec![0; 10];
    for i in 0..n {
        count[((arr[i] / exp) % 10) as usize] += 1;
    }
    for i in 1..10 {
        count[i] += count[i - 1];
    }
    for i in (0..n).rev() {
        let idx = ((arr[i] / exp) % 10) as usize;
        output[count[idx] - 1] = arr[i];
        count[idx] -= 1;
    }
    arr.copy_from_slice(&output);
}

fn radix_sort(arr: &mut [i32]) {
    if arr.is_empty() { return; }
    let max_val = *arr.iter().max().unwrap();
    let mut exp = 1;
    while max_val / exp > 0 {
        counting_sort_by_digit(arr, exp);
        exp *= 10;
    }
}`,
    kotlin: `fun countingSortByDigit(arr: IntArray, exp: Int) {
    val n = arr.size
    val output = IntArray(n)
    val count = IntArray(10)
    for (i in 0 until n) count[(arr[i] / exp) % 10]++
    for (i in 1 until 10) count[i] += count[i - 1]
    for (i in n - 1 downTo 0) {
        val idx = (arr[i] / exp) % 10
        output[count[idx] - 1] = arr[i]
        count[idx]--
    }
    for (i in 0 until n) arr[i] = output[i]
}

fun radixSort(arr: IntArray) {
    if (arr.isEmpty()) return
    val maxVal = arr.max()!!
    var exp = 1
    while (maxVal / exp > 0) {
        countingSortByDigit(arr, exp)
        exp *= 10
    }
}`,
    swift: `func countingSortByDigit(_ arr: inout [Int], _ exp: Int) {
    let n = arr.count
    var output = [Int](repeating: 0, count: n)
    var count = [Int](repeating: 0, count: 10)
    for i in 0..<n { count[(arr[i] / exp) % 10] += 1 }
    for i in 1..<10 { count[i] += count[i - 1] }
    for i in stride(from: n - 1, through: 0, by: -1) {
        let idx = (arr[i] / exp) % 10
        output[count[idx] - 1] = arr[i]
        count[idx] -= 1
    }
    arr = output
}

func radixSort(_ arr: inout [Int]) {
    guard let maxVal = arr.max() else { return }
    var exp = 1
    while maxVal / exp > 0 {
        countingSortByDigit(&arr, exp)
        exp *= 10
    }
}`,
  },
  counting: {
    python: `def counting_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for x in arr:
        count[x] += 1
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for x in reversed(arr):
        output[count[x] - 1] = x
        count[x] -= 1
    return output`,
    javascript: `function countingSort(arr) {
  if (arr.length === 0) return arr;
  const maxVal = Math.max(...arr);
  const count = new Array(maxVal + 1).fill(0);
  for (const x of arr) count[x]++;
  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];
  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  return output;
}`,
    typescript: `function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return arr;
  const maxVal = Math.max(...arr);
  const count = new Array(maxVal + 1).fill(0);
  for (const x of arr) count[x]++;
  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];
  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  return output;
}`,
    java: `public static int[] countingSort(int[] arr) {
    if (arr.length == 0) return arr;
    int maxVal = Arrays.stream(arr).max().getAsInt();
    int[] count = new int[maxVal + 1];
    for (int x : arr) count[x]++;
    for (int i = 1; i < count.length; i++) count[i] += count[i - 1];
    int[] output = new int[arr.length];
    for (int i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}`,
    cpp: `vector<int> countingSort(vector<int>& arr) {
    if (arr.empty()) return arr;
    int maxVal = *max_element(arr.begin(), arr.end());
    vector<int> count(maxVal + 1, 0);
    for (int x : arr) count[x]++;
    for (int i = 1; i < count.size(); i++) count[i] += count[i - 1];
    vector<int> output(arr.size());
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}`,
    csharp: `public static int[] CountingSort(int[] arr) {
    if (arr.Length == 0) return arr;
    int maxVal = arr.Max();
    int[] count = new int[maxVal + 1];
    foreach (int x in arr) count[x]++;
    for (int i = 1; i < count.Length; i++) count[i] += count[i - 1];
    int[] output = new int[arr.Length];
    for (int i = arr.Length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}`,
    go: `func countingSort(arr []int) []int {
    if len(arr) == 0 {
        return arr
    }
    maxVal := arr[0]
    for _, v := range arr {
        if v > maxVal { maxVal = v }
    }
    count := make([]int, maxVal+1)
    for _, x := range arr { count[x]++ }
    for i := 1; i < len(count); i++ { count[i] += count[i-1] }
    output := make([]int, len(arr))
    for i := len(arr) - 1; i >= 0; i-- {
        output[count[arr[i]]-1] = arr[i]
        count[arr[i]]--
    }
    return output
}`,
    rust: `fn counting_sort(arr: &[i32]) -> Vec<i32> {
    if arr.is_empty() { return arr.to_vec(); }
    let max_val = *arr.iter().max().unwrap();
    let mut count = vec![0; (max_val + 1) as usize];
    for &x in arr { count[x as usize] += 1; }
    for i in 1..count.len() { count[i] += count[i - 1]; }
    let mut output = vec![0; arr.len()];
    for &x in arr.iter().rev() {
        output[count[x as usize] - 1] = x;
        count[x as usize] -= 1;
    }
    output
}`,
    kotlin: `fun countingSort(arr: IntArray): IntArray {
    if (arr.isEmpty()) return arr
    val maxVal = arr.max()!!
    val count = IntArray(maxVal + 1)
    for (x in arr) count[x]++
    for (i in 1 until count.size) count[i] += count[i - 1]
    val output = IntArray(arr.size)
    for (i in arr.size - 1 downTo 0) {
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]]--
    }
    return output
}`,
    swift: `func countingSort(_ arr: [Int]) -> [Int] {
    guard let maxVal = arr.max() else { return arr }
    var count = [Int](repeating: 0, count: maxVal + 1)
    for x in arr { count[x] += 1 }
    for i in 1..<count.count { count[i] += count[i - 1] }
    var output = [Int](repeating: 0, count: arr.count)
    for x in arr.reversed() {
        output[count[x] - 1] = x
        count[x] -= 1
    }
    return output
}`,
  },
  tim: {
    python: `def insertion_sort_run(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge_runs(arr, left, mid, right):
    len1, len2 = mid - left + 1, right - mid
    left_arr = arr[left:left + len1]
    right_arr = arr[mid + 1:mid + 1 + len2]
    i = j = 0
    k = left
    while i < len1 and j < len2:
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    while i < len1:
        arr[k] = left_arr[i]; i += 1; k += 1
    while j < len2:
        arr[k] = right_arr[j]; j += 1; k += 1

def tim_sort(arr):
    n = len(arr)
    RUN = 32
    for i in range(0, n, RUN):
        insertion_sort_run(arr, i, min(i + RUN - 1, n - 1))
    size = RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = left + size - 1
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge_runs(arr, left, mid, right)
        size *= 2
    return arr`,
    javascript: `function insertionSortRun(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

function mergeRuns(arr, left, mid, right) {
  const len1 = mid - left + 1, len2 = right - mid;
  const leftArr = arr.slice(left, left + len1);
  const rightArr = arr.slice(mid + 1, mid + 1 + len2);
  let i = 0, j = 0, k = left;
  while (i < len1 && j < len2) {
    arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
  }
  while (i < len1) arr[k++] = leftArr[i++];
  while (j < len2) arr[k++] = rightArr[j++];
}

function timSort(arr) {
  const n = arr.length;
  const RUN = 32;
  for (let i = 0; i < n; i += RUN) {
    insertionSortRun(arr, i, Math.min(i + RUN - 1, n - 1));
  }
  for (let size = RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) mergeRuns(arr, left, mid, right);
    }
  }
  return arr;
}`,
    typescript: `function insertionSortRun(arr: number[], left: number, right: number): void {
  for (let i = left + 1; i <= right; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

function mergeRuns(arr: number[], left: number, mid: number, right: number): void {
  const len1 = mid - left + 1, len2 = right - mid;
  const leftArr = arr.slice(left, left + len1);
  const rightArr = arr.slice(mid + 1, mid + 1 + len2);
  let i = 0, j = 0, k = left;
  while (i < len1 && j < len2) {
    arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
  }
  while (i < len1) arr[k++] = leftArr[i++];
  while (j < len2) arr[k++] = rightArr[j++];
}

function timSort(arr: number[]): number[] {
  const n = arr.length;
  const RUN = 32;
  for (let i = 0; i < n; i += RUN) {
    insertionSortRun(arr, i, Math.min(i + RUN - 1, n - 1));
  }
  for (let size = RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) mergeRuns(arr, left, mid, right);
    }
  }
  return arr;
}`,
    java: `public static void insertionSortRun(int[] arr, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

public static void mergeRuns(int[] arr, int left, int mid, int right) {
    int len1 = mid - left + 1, len2 = right - mid;
    int[] leftArr = Arrays.copyOfRange(arr, left, left + len1);
    int[] rightArr = Arrays.copyOfRange(arr, mid + 1, mid + 1 + len2);
    int i = 0, j = 0, k = left;
    while (i < len1 && j < len2) {
        arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
    }
    while (i < len1) arr[k++] = leftArr[i++];
    while (j < len2) arr[k++] = rightArr[j++];
}

public static void timSort(int[] arr) {
    int n = arr.length;
    int RUN = 32;
    for (int i = 0; i < n; i += RUN) {
        insertionSortRun(arr, i, Math.min(i + RUN - 1, n - 1));
    }
    for (int size = RUN; size < n; size *= 2) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = left + size - 1;
            int right = Math.min(left + 2 * size - 1, n - 1);
            if (mid < right) mergeRuns(arr, left, mid, right);
        }
    }
}`,
    cpp: `void insertionSortRun(vector<int>& arr, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void mergeRuns(vector<int>& arr, int left, int mid, int right) {
    int len1 = mid - left + 1, len2 = right - mid;
    vector<int> leftArr(arr.begin() + left, arr.begin() + left + len1);
    vector<int> rightArr(arr.begin() + mid + 1, arr.begin() + mid + 1 + len2);
    int i = 0, j = 0, k = left;
    while (i < len1 && j < len2) {
        arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
    }
    while (i < len1) arr[k++] = leftArr[i++];
    while (j < len2) arr[k++] = rightArr[j++];
}

void timSort(vector<int>& arr) {
    int n = arr.size();
    const int RUN = 32;
    for (int i = 0; i < n; i += RUN) {
        insertionSortRun(arr, i, min(i + RUN - 1, n - 1));
    }
    for (int size = RUN; size < n; size *= 2) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = left + size - 1;
            int right = min(left + 2 * size - 1, n - 1);
            if (mid < right) mergeRuns(arr, left, mid, right);
        }
    }
}`,
    csharp: `public static void InsertionSortRun(int[] arr, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

public static void MergeRuns(int[] arr, int left, int mid, int right) {
    int len1 = mid - left + 1, len2 = right - mid;
    int[] leftArr = arr[left..(left + len1)];
    int[] rightArr = arr[(mid + 1)..(mid + 1 + len2)];
    int i = 0, j = 0, k = left;
    while (i < len1 && j < len2) {
        arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
    }
    while (i < len1) arr[k++] = leftArr[i++];
    while (j < len2) arr[k++] = rightArr[j++];
}

public static void TimSort(int[] arr) {
    int n = arr.Length;
    const int RUN = 32;
    for (int i = 0; i < n; i += RUN) {
        InsertionSortRun(arr, i, Math.Min(i + RUN - 1, n - 1));
    }
    for (int size = RUN; size < n; size *= 2) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = left + size - 1;
            int right = Math.Min(left + 2 * size - 1, n - 1);
            if (mid < right) MergeRuns(arr, left, mid, right);
        }
    }
}`,
    go: `func insertionSortRun(arr []int, left, right int) {
    for i := left + 1; i <= right; i++ {
        key := arr[i]
        j := i - 1
        for j >= left && arr[j] > key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

func mergeRuns(arr []int, left, mid, right int) {
    len1, len2 := mid-left+1, right-mid
    leftArr := make([]int, len1)
    rightArr := make([]int, len2)
    copy(leftArr, arr[left:left+len1])
    copy(rightArr, arr[mid+1:mid+1+len2])
    i, j, k := 0, 0, left
    for i < len1 && j < len2 {
        if leftArr[i] <= rightArr[j] {
            arr[k] = leftArr[i]
            i++
        } else {
            arr[k] = rightArr[j]
            j++
        }
        k++
    }
    for i < len1 { arr[k] = leftArr[i]; i++; k++ }
    for j < len2 { arr[k] = rightArr[j]; j++; k++ }
}

func timSort(arr []int) {
    n := len(arr)
    const RUN = 32
    for i := 0; i < n; i += RUN {
        end := i + RUN - 1
        if end > n-1 { end = n - 1 }
        insertionSortRun(arr, i, end)
    }
    for size := RUN; size < n; size *= 2 {
        for left := 0; left < n; left += 2 * size {
            mid := left + size - 1
            right := left + 2*size - 1
            if right > n-1 { right = n - 1 }
            if mid < right { mergeRuns(arr, left, mid, right) }
        }
    }
}`,
    rust: `fn insertion_sort_run(arr: &mut [i32], left: usize, right: usize) {
    for i in left + 1..=right {
        let key = arr[i];
        let mut j = i;
        while j > left && arr[j - 1] > key {
            arr[j] = arr[j - 1];
            j -= 1;
        }
        arr[j] = key;
    }
}

fn merge_runs(arr: &mut [i32], left: usize, mid: usize, right: usize) {
    let len1 = mid - left + 1;
    let len2 = right - mid;
    let left_arr = arr[left..left + len1].to_vec();
    let right_arr = arr[mid + 1..mid + 1 + len2].to_vec();
    let mut i = 0; let mut j = 0; let mut k = left;
    while i < len1 && j < len2 {
        if left_arr[i] <= right_arr[j] {
            arr[k] = left_arr[i]; i += 1;
        } else {
            arr[k] = right_arr[j]; j += 1;
        }
        k += 1;
    }
    while i < len1 { arr[k] = left_arr[i]; i += 1; k += 1; }
    while j < len2 { arr[k] = right_arr[j]; j += 1; k += 1; }
}

fn tim_sort(arr: &mut [i32]) {
    let n = arr.len();
    const RUN: usize = 32;
    let mut i = 0;
    while i < n {
        let end = (i + RUN - 1).min(n - 1);
        insertion_sort_run(arr, i, end);
        i += RUN;
    }
    let mut size = RUN;
    while size < n {
        let mut left = 0;
        while left < n {
            let mid = left + size - 1;
            let right = (left + 2 * size - 1).min(n - 1);
            if mid < right { merge_runs(arr, left, mid, right); }
            left += 2 * size;
        }
        size *= 2;
    }
}`,
    kotlin: `fun insertionSortRun(arr: IntArray, left: Int, right: Int) {
    for (i in left + 1..right) {
        val key = arr[i]
        var j = i - 1
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = key
    }
}

fun mergeRuns(arr: IntArray, left: Int, mid: Int, right: Int) {
    val len1 = mid - left + 1
    val len2 = right - mid
    val leftArr = arr.sliceArray(left until left + len1)
    val rightArr = arr.sliceArray(mid + 1 until mid + 1 + len2)
    var i = 0; var j = 0; var k = left
    while (i < len1 && j < len2) {
        arr[k++] = if (leftArr[i] <= rightArr[j]) leftArr[i++] else rightArr[j++]
    }
    while (i < len1) arr[k++] = leftArr[i++]
    while (j < len2) arr[k++] = rightArr[j++]
}

fun timSort(arr: IntArray) {
    val n = arr.size
    val RUN = 32
    var i = 0
    while (i < n) {
        insertionSortRun(arr, i, minOf(i + RUN - 1, n - 1))
        i += RUN
    }
    var size = RUN
    while (size < n) {
        var left = 0
        while (left < n) {
            val mid = left + size - 1
            val right = minOf(left + 2 * size - 1, n - 1)
            if (mid < right) mergeRuns(arr, left, mid, right)
            left += 2 * size
        }
        size *= 2
    }
}`,
    swift: `func insertionSortRun(_ arr: inout [Int], _ left: Int, _ right: Int) {
    for i in left + 1...right {
        let key = arr[i]
        var j = i - 1
        while j >= left && arr[j] > key {
            arr[j + 1] = arr[j]
            j -= 1
        }
        arr[j + 1] = key
    }
}

func mergeRuns(_ arr: inout [Int], _ left: Int, _ mid: Int, _ right: Int) {
    let len1 = mid - left + 1
    let len2 = right - mid
    let leftArr = Array(arr[left..<left + len1])
    let rightArr = Array(arr[mid + 1..<mid + 1 + len2])
    var i = 0, j = 0, k = left
    while i < len1 && j < len2 {
        arr[k] = leftArr[i] <= rightArr[j] ? leftArr[i] : rightArr[j]
        if leftArr[i] <= rightArr[j] { i += 1 } else { j += 1 }
        k += 1
    }
    while i < len1 { arr[k] = leftArr[i]; i += 1; k += 1 }
    while j < len2 { arr[k] = rightArr[j]; j += 1; k += 1 }
}

func timSort(_ arr: inout [Int]) {
    let n = arr.count
    let RUN = 32
    var i = 0
    while i < n {
        insertionSortRun(&arr, i, min(i + RUN - 1, n - 1))
        i += RUN
    }
    var size = RUN
    while size < n {
        var left = 0
        while left < n {
            let mid = left + size - 1
            let right = min(left + 2 * size - 1, n - 1)
            if mid < right { mergeRuns(&arr, left, mid, right) }
            left += 2 * size
        }
        size *= 2
    }
}`,
  },
  bfs: {
    python: `from collections import deque

def bfs(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    visited = [[False] * cols for _ in range(rows)]
    parent = {}
    q = deque()
    q.append(start)
    visited[start[0]][start[1]] = True
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    while q:
        r, c = q.popleft()
        if (r, c) == end:
            return reconstruct_path(parent, end)
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc] and grid[nr][nc] == 1:
                visited[nr][nc] = True
                parent[(nr, nc)] = (r, c)
                q.append((nr, nc))
    return []

def reconstruct_path(parent, end):
    path = []
    cur = end
    while cur in parent:
        path.append(cur)
        cur = parent[cur]
    path.reverse()
    return path`,
    javascript: `function bfs(grid, start, end) {
  const rows = grid.length, cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = {};
  const queue = [start];
  visited[start[0]][start[1]] = true;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  while (queue.length > 0) {
    const [r, c] = queue.shift();
    if (r === end[0] && c === end[1]) return reconstructPath(parent, end);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] === 1) {
        visited[nr][nc] = true;
        parent[nr + ',' + nc] = [r, c];
        queue.push([nr, nc]);
      }
    }
  }
  return [];
}

function reconstructPath(parent, end) {
  const path = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) {
    path.push(parent[key]);
    key = parent[key][0] + ',' + parent[key][1];
  }
  return path.reverse();
}`,
    typescript: `function bfs(grid: number[][], start: number[], end: number[]): number[][] {
  const rows = grid.length, cols = grid[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent: Record<string, number[]> = {};
  const queue: number[][] = [start];
  visited[start[0]][start[1]] = true;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    if (r === end[0] && c === end[1]) return reconstructPath(parent, end);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] === 1) {
        visited[nr][nc] = true;
        parent[nr + ',' + nc] = [r, c];
        queue.push([nr, nc]);
      }
    }
  }
  return [];
}

function reconstructPath(parent: Record<string, number[]>, end: number[]): number[][] {
  const path: number[][] = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) {
    path.push(parent[key]);
    key = parent[key][0] + ',' + parent[key][1];
  }
  return path.reverse();
}`,
    java: `import java.util.*;

public static List<int[]> bfs(int[][] grid, int[] start, int[] end) {
    int rows = grid.length, cols = grid[0].length;
    boolean[][] visited = new boolean[rows][cols];
    Map<String, int[]> parent = new HashMap<>();
    Queue<int[]> q = new LinkedList<>();
    q.add(start);
    visited[start[0]][start[1]] = true;
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    while (!q.isEmpty()) {
        int[] cur = q.poll();
        int r = cur[0], c = cur[1];
        if (r == end[0] && c == end[1]) return reconstructPath(parent, end);
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true;
                parent.put(nr + "," + nc, new int[]{r, c});
                q.add(new int[]{nr, nc});
            }
        }
    }
    return new ArrayList<>();
}

public static List<int[]> reconstructPath(Map<String, int[]> parent, int[] end) {
    List<int[]> path = new ArrayList<>();
    String key = end[0] + "," + end[1];
    while (parent.containsKey(key)) {
        path.add(parent.get(key));
        key = parent.get(key)[0] + "," + parent.get(key)[1];
    }
    Collections.reverse(path);
    return path;
}`,
    cpp: `using Grid = vector<vector<int>>;
using Point = pair<int, int>;

vector<Point> bfs(const Grid& grid, Point start, Point end) {
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    map<Point, Point> parent;
    queue<Point> q;
    q.push(start);
    visited[start.first][start.second] = true;
    vector<Point> dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        if (r == end.first && c == end.second) {
            vector<Point> path;
            for (Point p = end; parent.count(p); p = parent[p])
                path.push_back(p);
            reverse(path.begin(), path.end());
            return path;
        }
        for (auto [dr, dc] : dirs) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true;
                parent[{nr, nc}] = {r, c};
                q.push({nr, nc});
            }
        }
    }
    return {};
}`,
    csharp: `public static List<(int, int)> Bfs(int[][] grid, (int, int) start, (int, int) end) {
    int rows = grid.Length, cols = grid[0].Length;
    bool[,] visited = new bool[rows, cols];
    Dictionary<(int, int), (int, int)> parent = new();
    Queue<(int, int)> q = new();
    q.Enqueue(start);
    visited.Item1 = visited.Item2 = true;
    int[][] dirs = [new[]{0,1}, new[]{1,0}, new[]{0,-1}, new[]{-1,0}];
    while (q.Count > 0) {
        var (r, c) = q.Dequeue();
        if (r == end.Item1 && c == end.Item2) return ReconstructPath(parent, end);
        foreach (var d in dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr, nc] && grid[nr][nc] == 1) {
                visited[nr, nc] = true;
                parent[(nr, nc)] = (r, c);
                q.Enqueue((nr, nc));
            }
        }
    }
    return new();
}

public static List<(int, int)> ReconstructPath(Dictionary<(int, int), (int, int)> parent, (int, int) end) {
    var path = new List<(int, int)>();
    var cur = end;
    while (parent.ContainsKey(cur)) {
        path.Add(parent[cur]);
        cur = parent[cur];
    }
    path.Reverse();
    return path;
}`,
    go: `type point struct{ r, c int }

func bfs(grid [][]int, start, end point) []point {
    rows, cols := len(grid), len(grid[0])
    visited := make([][]bool, rows)
    for i := range visited { visited[i] = make([]bool, cols) }
    parent := make(map[point]point)
    q := []point{start}
    visited[start.r][start.c] = true
    dirs := []point{{0,1}, {1,0}, {0,-1}, {-1,0}}
    for len(q) > 0 {
        cur := q[0]; q = q[1:]
        if cur == end {
            var path []point
            for p := end; ; {
                pp, ok := parent[p]; if !ok { break }
                path = append(path, p); p = pp
            }
            for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 { path[i], path[j] = path[j], path[i] }
            return path
        }
        for _, d := range dirs {
            nr, nc := cur.r+d.r, cur.c+d.c
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1 {
                visited[nr][nc] = true
                parent[point{nr, nc}] = cur
                q = append(q, point{nr, nc})
            }
        }
    }
    return nil
}`,
    rust: `use std::collections::{HashMap, VecDeque};

fn bfs(grid: &[Vec<i32>], start: (usize, usize), end: (usize, usize)) -> Vec<(usize, usize)> {
    let rows = grid.len();
    let cols = grid[0].len();
    let mut visited = vec![vec![false; cols]; rows];
    let mut parent: HashMap<(usize, usize), (usize, usize)> = HashMap::new();
    let mut q = VecDeque::new();
    q.push_back(start);
    visited[start.0][start.1] = true;
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)];
    while let Some((r, c)) = q.pop_front() {
        if (r, c) == end {
            let mut path = Vec::new();
            let mut cur = end;
            while let Some(&p) = parent.get(&cur) { path.push(cur); cur = p; }
            path.reverse(); return path;
        }
        for (dr, dc) in dirs {
            let nr = r.wrapping_add(dr);
            let nc = c.wrapping_add(dc);
            if nr < rows && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1 {
                visited[nr][nc] = true;
                parent.insert((nr, nc), (r, c));
                q.push_back((nr, nc));
            }
        }
    }
    vec![]
}`,
    kotlin: `fun bfs(grid: Array<IntArray>, start: Pair<Int,Int>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val rows = grid.size; val cols = grid[0].size
    val visited = Array(rows) { BooleanArray(cols) }
    val parent = mutableMapOf<Pair<Int,Int>, Pair<Int,Int>>()
    val q = ArrayDeque<Pair<Int,Int>>()
    q.add(start); visited[start.first][start.second] = true
    val dirs = listOf(0 to 1, 1 to 0, 0 to -1, -1 to 0)
    while (q.isNotEmpty()) {
        val (r, c) = q.removeFirst()
        if ((r to c) == end) return reconstructPath(parent, end)
        for ((dr, dc) in dirs) {
            val nr = r + dr; val nc = c + dc
            if (nr in 0 until rows && nc in 0 until cols && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true
                parent[nr to nc] = r to c
                q.add(nr to nc)
            }
        }
    }
    return emptyList()
}

fun reconstructPath(parent: Map<Pair<Int,Int>, Pair<Int,Int>>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val path = mutableListOf<Pair<Int,Int>>()
    var cur = end
    while (parent.containsKey(cur)) { path.add(parent[cur]!!); cur = parent[cur]!! }
    return path.reversed()
}`,
    swift: `func bfs(grid: [[Int]], start: (Int, Int), end: (Int, Int)) -> [(Int, Int)] {
    let rows = grid.count, cols = grid[0].count
    var visited = [[Bool]](repeating: [Bool](repeating: false, count: cols), count: rows)
    var parent = [(Int, Int): (Int, Int)]()
    var q = [(Int, Int)]()
    q.append(start)
    visited[start.0][start.1] = true
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    while !q.isEmpty {
        let (r, c) = q.removeFirst()
        if (r, c) == end { return reconstructPath(&parent, end) }
        for (dr, dc) in dirs {
            let nr = r + dr, nc = c + dc
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1 {
                visited[nr][nc] = true
                parent[(nr, nc)] = (r, c)
                q.append((nr, nc))
            }
        }
    }
    return []
}

func reconstructPath(_ parent: inout [(Int, Int): (Int, Int)], _ end: (Int, Int)) -> [(Int, Int)] {
    var path = [(Int, Int)]()
    var cur = end
    while let p = parent[cur] { path.append(cur); cur = p }
    return path.reversed()
}`,
  },
  dfs: {
    python: `def dfs(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    visited = [[False] * cols for _ in range(rows)]
    parent = {}
    stack = [start]
    visited[start[0]][start[1]] = True
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    while stack:
        r, c = stack.pop()
        if (r, c) == end:
            return reconstruct_path(parent, end)
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc] and grid[nr][nc] == 1:
                visited[nr][nc] = True
                parent[(nr, nc)] = (r, c)
                stack.append((nr, nc))
    return []

def reconstruct_path(parent, end):
    path = []
    cur = end
    while cur in parent:
        path.append(cur)
        cur = parent[cur]
    path.reverse()
    return path`,
    javascript: `function dfs(grid, start, end) {
  const rows = grid.length, cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = {};
  const stack = [start];
  visited[start[0]][start[1]] = true;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  while (stack.length > 0) {
    const [r, c] = stack.pop();
    if (r === end[0] && c === end[1]) return reconstructPath(parent, end);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] === 1) {
        visited[nr][nc] = true;
        parent[nr + ',' + nc] = [r, c];
        stack.push([nr, nc]);
      }
    }
  }
  return [];
}

function reconstructPath(parent, end) {
  const path = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) { path.push(parent[key]); key = parent[key][0] + ',' + parent[key][1]; }
  return path.reverse();
}`,
    typescript: `function dfs(grid: number[][], start: number[], end: number[]): number[][] {
  const rows = grid.length, cols = grid[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent: Record<string, number[]> = {};
  const stack: number[][] = [start];
  visited[start[0]][start[1]] = true;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  while (stack.length > 0) {
    const [r, c] = stack.pop()!;
    if (r === end[0] && c === end[1]) return reconstructPath(parent, end);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] === 1) {
        visited[nr][nc] = true;
        parent[nr + ',' + nc] = [r, c];
        stack.push([nr, nc]);
      }
    }
  }
  return [];
}

function reconstructPath(parent: Record<string, number[]>, end: number[]): number[][] {
  const path: number[][] = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) { path.push(parent[key]); key = parent[key][0] + ',' + parent[key][1]; }
  return path.reverse();
}`,
    java: `public static List<int[]> dfs(int[][] grid, int[] start, int[] end) {
    int rows = grid.length, cols = grid[0].length;
    boolean[][] visited = new boolean[rows][cols];
    Map<String, int[]> parent = new HashMap<>();
    Stack<int[]> stack = new Stack<>();
    stack.push(start);
    visited[start[0]][start[1]] = true;
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    while (!stack.isEmpty()) {
        int[] cur = stack.pop();
        int r = cur[0], c = cur[1];
        if (r == end[0] && c == end[1]) return reconstructPath(parent, end);
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true;
                parent.put(nr + "," + nc, new int[]{r, c});
                stack.push(new int[]{nr, nc});
            }
        }
    }
    return new ArrayList<>();
}

public static List<int[]> reconstructPath(Map<String, int[]> parent, int[] end) {
    List<int[]> path = new ArrayList<>();
    String key = end[0] + "," + end[1];
    while (parent.containsKey(key)) { path.add(parent.get(key)); key = parent.get(key)[0] + "," + parent.get(key)[1]; }
    Collections.reverse(path);
    return path;
}`,
    cpp: `vector<Point> dfs(const Grid& grid, Point start, Point end) {
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    map<Point, Point> parent;
    stack<Point> st;
    st.push(start);
    visited[start.first][start.second] = true;
    vector<Point> dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    while (!st.empty()) {
        auto [r, c] = st.top(); st.pop();
        if (r == end.first && c == end.second) {
            vector<Point> path;
            for (Point p = end; parent.count(p); p = parent[p]) path.push_back(p);
            reverse(path.begin(), path.end());
            return path;
        }
        for (auto [dr, dc] : dirs) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true;
                parent[{nr, nc}] = {r, c};
                st.push({nr, nc});
            }
        }
    }
    return {};
}`,
    csharp: `public static List<(int, int)> Dfs(int[][] grid, (int, int) start, (int, int) end) {
    int rows = grid.Length, cols = grid[0].Length;
    bool[,] visited = new bool[rows, cols];
    Dictionary<(int, int), (int, int)> parent = new();
    Stack<(int, int)> stack = new();
    stack.Push(start);
    visited.Item1 = visited.Item2 = true;
    int[][] dirs = [new[]{0,1}, new[]{1,0}, new[]{0,-1}, new[]{-1,0}];
    while (stack.Count > 0) {
        var (r, c) = stack.Pop();
        if (r == end.Item1 && c == end.Item2) return ReconstructPath(parent, end);
        foreach (var d in dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr, nc] && grid[nr][nc] == 1) {
                visited[nr, nc] = true;
                parent[(nr, nc)] = (r, c);
                stack.Push((nr, nc));
            }
        }
    }
    return new();
}

public static List<(int, int)> ReconstructPath(Dictionary<(int, int), (int, int)> parent, (int, int) end) {
    var path = new List<(int, int)>();
    var cur = end;
    while (parent.ContainsKey(cur)) { path.Add(parent[cur]); cur = parent[cur]; }
    path.Reverse();
    return path;
}`,
    go: `func dfs(grid [][]int, start, end point) []point {
    rows, cols := len(grid), len(grid[0])
    visited := make([][]bool, rows)
    for i := range visited { visited[i] = make([]bool, cols) }
    parent := make(map[point]point)
    stack := []point{start}
    visited[start.r][start.c] = true
    dirs := []point{{0,1}, {1,0}, {0,-1}, {-1,0}}
    for len(stack) > 0 {
        cur := stack[len(stack)-1]; stack = stack[:len(stack)-1]
        if cur == end {
            var path []point
            for p := end; ; { pp, ok := parent[p]; if !ok { break }; path = append(path, p); p = pp }
            for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 { path[i], path[j] = path[j], path[i] }
            return path
        }
        for _, d := range dirs {
            nr, nc := cur.r+d.r, cur.c+d.c
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1 {
                visited[nr][nc] = true
                parent[point{nr, nc}] = cur
                stack = append(stack, point{nr, nc})
            }
        }
    }
    return nil
}`,
    rust: `use std::collections::HashMap;

fn dfs(grid: &[Vec<i32>], start: (usize, usize), end: (usize, usize)) -> Vec<(usize, usize)> {
    let rows = grid.len();
    let cols = grid[0].len();
    let mut visited = vec![vec![false; cols]; rows];
    let mut parent: HashMap<(usize, usize), (usize, usize)> = HashMap::new();
    let mut stack = vec![start];
    visited[start.0][start.1] = true;
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)];
    while let Some((r, c)) = stack.pop() {
        if (r, c) == end {
            let mut path = Vec::new();
            let mut cur = end;
            while let Some(&p) = parent.get(&cur) { path.push(cur); cur = p; }
            path.reverse(); return path;
        }
        for (dr, dc) in dirs {
            let nr = r.wrapping_add(dr);
            let nc = c.wrapping_add(dc);
            if nr < rows && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1 {
                visited[nr][nc] = true;
                parent.insert((nr, nc), (r, c));
                stack.push((nr, nc));
            }
        }
    }
    vec![]
}`,
    kotlin: `fun dfs(grid: Array<IntArray>, start: Pair<Int,Int>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val rows = grid.size; val cols = grid[0].size
    val visited = Array(rows) { BooleanArray(cols) }
    val parent = mutableMapOf<Pair<Int,Int>, Pair<Int,Int>>()
    val stack = ArrayDeque<Pair<Int,Int>>()
    stack.add(start); visited[start.first][start.second] = true
    val dirs = listOf(0 to 1, 1 to 0, 0 to -1, -1 to 0)
    while (stack.isNotEmpty()) {
        val (r, c) = stack.removeLast()
        if ((r to c) == end) return reconstructPath(parent, end)
        for ((dr, dc) in dirs) {
            val nr = r + dr; val nc = c + dc
            if (nr in 0 until rows && nc in 0 until cols && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true
                parent[nr to nc] = r to c
                stack.add(nr to nc)
            }
        }
    }
    return emptyList()
}

fun reconstructPath(parent: Map<Pair<Int,Int>, Pair<Int,Int>>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val path = mutableListOf<Pair<Int,Int>>()
    var cur = end
    while (parent.containsKey(cur)) { path.add(parent[cur]!!); cur = parent[cur]!! }
    return path.reversed()
}`,
    swift: `func dfs(grid: [[Int]], start: (Int, Int), end: (Int, Int)) -> [(Int, Int)] {
    let rows = grid.count, cols = grid[0].count
    var visited = [[Bool]](repeating: [Bool](repeating: false, count: cols), count: rows)
    var parent = [(Int, Int): (Int, Int)]()
    var stack = [(Int, Int)]()
    stack.append(start)
    visited[start.0][start.1] = true
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    while !stack.isEmpty {
        let (r, c) = stack.removeLast()
        if (r, c) == end { return reconstructPath(&parent, end) }
        for (dr, dc) in dirs {
            let nr = r + dr, nc = c + dc
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1 {
                visited[nr][nc] = true
                parent[(nr, nc)] = (r, c)
                stack.append((nr, nc))
            }
        }
    }
    return []
}

func reconstructPath(_ parent: inout [(Int, Int): (Int, Int)], _ end: (Int, Int)) -> [(Int, Int)] {
    var path = [(Int, Int)]()
    var cur = end
    while let p = parent[cur] { path.append(cur); cur = p }
    return path.reversed()
}`,
  },
  dijkstra: {
    python: `import heapq

def dijkstra(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    dist = [[float('inf')] * cols for _ in range(rows)]
    parent = {}
    pq = [(0, start[0], start[1])]
    dist[start[0]][start[1]] = 0
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    while pq:
        d, r, c = heapq.heappop(pq)
        if (r, c) == end:
            return reconstruct_path(parent, end)
        if d > dist[r][c]: continue
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                nd = d + 1
                if nd < dist[nr][nc]:
                    dist[nr][nc] = nd
                    parent[(nr, nc)] = (r, c)
                    heapq.heappush(pq, (nd, nr, nc))
    return []

def reconstruct_path(parent, end):
    path = []
    cur = end
    while cur in parent: path.append(cur); cur = parent[cur]
    path.reverse()
    return path`,
    javascript: `function dijkstra(grid, start, end) {
  const rows = grid.length, cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent = {};
  const pq = [[0, start[0], start[1]]];
  dist[start[0]][start[1]] = 0;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, r, c] = pq.shift();
    if (r === end[0] && c === end[1]) return reconstructPath(parent, end);
    if (d > dist[r][c]) continue;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
        const nd = d + 1;
        if (nd < dist[nr][nc]) {
          dist[nr][nc] = nd;
          parent[nr + ',' + nc] = [r, c];
          pq.push([nd, nr, nc]);
        }
      }
    }
  }
  return [];
}

function reconstructPath(parent, end) {
  const path = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) { path.push(parent[key]); key = parent[key][0] + ',' + parent[key][1]; }
  return path.reverse();
}`,
    typescript: `function dijkstra(grid: number[][], start: number[], end: number[]): number[][] {
  const rows = grid.length, cols = grid[0].length;
  const dist: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent: Record<string, number[]> = {};
  const pq: number[][] = [[0, start[0], start[1]]];
  dist[start[0]][start[1]] = 0;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, r, c] = pq.shift()!;
    if (r === end[0] && c === end[1]) return reconstructPath(parent, end);
    if (d > dist[r][c]) continue;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
        const nd = d + 1;
        if (nd < dist[nr][nc]) {
          dist[nr][nc] = nd;
          parent[nr + ',' + nc] = [r, c];
          pq.push([nd, nr, nc]);
        }
      }
    }
  }
  return [];
}

function reconstructPath(parent: Record<string, number[]>, end: number[]): number[][] {
  const path: number[][] = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) { path.push(parent[key]); key = parent[key][0] + ',' + parent[key][1]; }
  return path.reverse();
}`,
    java: `public static List<int[]> dijkstra(int[][] grid, int[] start, int[] end) {
    int rows = grid.length, cols = grid[0].length;
    double[][] dist = new double[rows][cols];
    for (double[] row : dist) Arrays.fill(row, Double.MAX_VALUE);
    Map<String, int[]> parent = new HashMap<>();
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Double.compare(a[0], b[0]));
    pq.add(new int[]{0, start[0], start[1]});
    dist[start[0]][start[1]] = 0;
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int d = cur[0], r = cur[1], c = cur[2];
        if (r == end[0] && c == end[1]) return reconstructPath(parent, end);
        if (d > dist[r][c]) continue;
        for (int[] dir : dirs) {
            int nr = r + dir[0], nc = c + dir[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                int nd = d + 1;
                if (nd < dist[nr][nc]) { dist[nr][nc] = nd; parent.put(nr + "," + nc, new int[]{r, c}); pq.add(new int[]{nd, nr, nc}); }
            }
        }
    }
    return new ArrayList<>();
}

public static List<int[]> reconstructPath(Map<String, int[]> parent, int[] end) {
    List<int[]> path = new ArrayList<>();
    String key = end[0] + "," + end[1];
    while (parent.containsKey(key)) { path.add(parent.get(key)); key = parent.get(key)[0] + "," + parent.get(key)[1]; }
    Collections.reverse(path);
    return path;
}`,
    cpp: `vector<Point> dijkstra(const Grid& grid, Point start, Point end) {
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<int>> dist(rows, vector<int>(cols, INT_MAX));
    map<Point, Point> parent;
    priority_queue<pair<int, Point>, vector<pair<int, Point>>, greater<>> pq;
    pq.push({0, start});
    dist[start.first][start.second] = 0;
    vector<Point> dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    while (!pq.empty()) {
        auto [d, p] = pq.top(); pq.pop();
        auto [r, c] = p;
        if (p == end) {
            vector<Point> path;
            for (Point cur = end; parent.count(cur); cur = parent[cur]) path.push_back(cur);
            reverse(path.begin(), path.end()); return path;
        }
        if (d > dist[r][c]) continue;
        for (auto [dr, dc] : dirs) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                int nd = d + 1;
                if (nd < dist[nr][nc]) { dist[nr][nc] = nd; parent[{nr, nc}] = {r, c}; pq.push({nd, {nr, nc}}); }
            }
        }
    }
    return {};
}`,
    csharp: `public static List<(int, int)> Dijkstra(int[][] grid, (int, int) start, (int, int) end) {
    int rows = grid.Length, cols = grid[0].Length;
    double[,] dist = new double[rows, cols];
    for (int i = 0; i < rows; i++) for (int j = 0; j < cols; j++) dist[i, j] = double.MaxValue;
    Dictionary<(int, int), (int, int)> parent = new();
    var pq = new SortedSet<(double, int, int)>();
    pq.Add((0, start.Item1, start.Item2));
    dist[start.Item1, start.Item2] = 0;
    int[][] dirs = [new[]{0,1}, new[]{1,0}, new[]{0,-1}, new[]{-1,0}];
    while (pq.Count > 0) {
        var (d, r, c) = pq.Min; pq.Remove(pq.Min);
        if (r == end.Item1 && c == end.Item2) return ReconstructPath(parent, end);
        if (d > dist[r, c]) continue;
        foreach (var dir in dirs) {
            int nr = r + dir[0], nc = c + dir[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                double nd = d + 1;
                if (nd < dist[nr, nc]) { dist[nr, nc] = nd; parent[(nr, nc)] = (r, c); pq.Add((nd, nr, nc)); }
            }
        }
    }
    return new();
}

public static List<(int, int)> ReconstructPath(Dictionary<(int, int), (int, int)> parent, (int, int) end) {
    var path = new List<(int, int)>();
    var cur = end;
    while (parent.ContainsKey(cur)) { path.Add(parent[cur]); cur = parent[cur]; }
    path.Reverse();
    return path;
}`,
    go: `func dijkstra(grid [][]int, start, end point) []point {
    rows, cols := len(grid), len(grid[0])
    dist := make([][]int, rows)
    for i := range dist { dist[i] = make([]int, cols); for j := range dist[i] { dist[i][j] = 1<<30 } }
    parent := make(map[point]point)
    pq := &pqItem{{0, start.r, start.c}}
    heap.Init(pq)
    dist[start.r][start.c] = 0
    dirs := []point{{0,1}, {1,0}, {0,-1}, {-1,0}}
    for pq.Len() > 0 {
        item := heap.Pop(pq).(pqItem)
        d, r, c := item.dist, item.r, item.c
        if r == end.r && c == end.c {
            var path []point
            for p := end; ; { pp, ok := parent[p]; if !ok { break }; path = append(path, p); p = pp }
            for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 { path[i], path[j] = path[j], path[i] }
            return path
        }
        if d > dist[r][c] { continue }
        for _, dir := range dirs {
            nr, nc := r+dir.r, c+dir.c
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
                nd := d + 1
                if nd < dist[nr][nc] { dist[nr][nc] = nd; parent[point{nr, nc}] = point{r, c}; heap.Push(pq, pqItem{nd, nr, nc}) }
            }
        }
    }
    return nil
}

type pqItem struct { dist, r, c int }
type PQ []pqItem
func (pq PQ) Len() int { return len(pq) }
func (pq PQ) Less(i, j int) bool { return pq[i].dist < pq[j].dist }
func (pq PQ) Swap(i, j int) { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PQ) Push(x interface{}) { *pq = append(*pq, x.(pqItem)) }
func (pq *PQ) Pop() interface{} { old := *pq; n := len(old); x := old[n-1]; *pq = old[:n-1]; return x }`,
    rust: `use std::collections::{HashMap, BinaryHeap};
use std::cmp::Reverse;

fn dijkstra(grid: &[Vec<i32>], start: (usize, usize), end: (usize, usize)) -> Vec<(usize, usize)> {
    let rows = grid.len(); let cols = grid[0].len();
    let mut dist = vec![vec![i32::MAX; cols]; rows];
    let mut parent: HashMap<(usize, usize), (usize, usize)> = HashMap::new();
    let mut pq = BinaryHeap::new();
    pq.push(Reverse((0, start.0, start.1)));
    dist[start.0][start.1] = 0;
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)];
    while let Some(Reverse((d, r, c))) = pq.pop() {
        if (r, c) == end {
            let mut path = Vec::new(); let mut cur = end;
            while let Some(&p) = parent.get(&cur) { path.push(cur); cur = p; }
            path.reverse(); return path;
        }
        if d > dist[r][c] { continue; }
        for (dr, dc) in dirs {
            let nr = r.wrapping_add(dr); let nc = c.wrapping_add(dc);
            if nr < rows && nc < cols && grid[nr][nc] == 1 {
                let nd = d + 1;
                if nd < dist[nr][nc] { dist[nr][nc] = nd; parent.insert((nr, nc), (r, c)); pq.push(Reverse((nd, nr, nc))); }
            }
        }
    }
    vec![]
}`,
    kotlin: `fun dijkstra(grid: Array<IntArray>, start: Pair<Int,Int>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val rows = grid.size; val cols = grid[0].size
    val dist = Array(rows) { DoubleArray(cols) { Double.MAX_VALUE } }
    val parent = mutableMapOf<Pair<Int,Int>, Pair<Int,Int>>()
    val pq = PriorityQueue<Triple<Double,Int,Int>>(compareBy { it.first })
    pq.add(Triple(0.0, start.first, start.second))
    dist[start.first][start.second] = 0.0
    val dirs = listOf(0 to 1, 1 to 0, 0 to -1, -1 to 0)
    while (pq.isNotEmpty()) {
        val (d, r, c) = pq.poll()
        if ((r to c) == end) return reconstructPath(parent, end)
        if (d > dist[r][c]) continue
        for ((dr, dc) in dirs) {
            val nr = r + dr; val nc = c + dc
            if (nr in 0 until rows && nc in 0 until cols && grid[nr][nc] == 1) {
                val nd = d + 1
                if (nd < dist[nr][nc]) { dist[nr][nc] = nd; parent[nr to nc] = r to c; pq.add(Triple(nd, nr, nc)) }
            }
        }
    }
    return emptyList()
}

fun reconstructPath(parent: Map<Pair<Int,Int>, Pair<Int,Int>>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val path = mutableListOf<Pair<Int,Int>>()
    var cur = end
    while (parent.containsKey(cur)) { path.add(parent[cur]!!); cur = parent[cur]!! }
    return path.reversed()
}`,
    swift: `func dijkstra(grid: [[Int]], start: (Int, Int), end: (Int, Int)) -> [(Int, Int)] {
    let rows = grid.count, cols = grid[0].count
    var dist = [[Double]](repeating: [Double](repeating: .infinity, count: cols), count: rows)
    var parent = [(Int, Int): (Int, Int)]()
    var pq = [(Double, Int, Int)]()
    pq.append((0, start.0, start.1))
    dist[start.0][start.1] = 0
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    while !pq.isEmpty {
        pq.sort { $0.0 < $1.0 }
        let (d, r, c) = pq.removeFirst()
        if (r, c) == end { return reconstructPath(&parent, end) }
        if d > dist[r][c] { continue }
        for (dr, dc) in dirs {
            let nr = r + dr, nc = c + dc
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
                let nd = d + 1
                if nd < dist[nr][nc] { dist[nr][nc] = nd; parent[(nr, nc)] = (r, c); pq.append((nd, nr, nc)) }
            }
        }
    }
    return []
}

func reconstructPath(_ parent: inout [(Int, Int): (Int, Int)], _ end: (Int, Int)) -> [(Int, Int)] {
    var path = [(Int, Int)]()
    var cur = end
    while let p = parent[cur] { path.append(cur); cur = p }
    return path.reversed()
}`,
  },
  astar: {
    python: `import heapq

def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def astar(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    g_score = [[float('inf')] * cols for _ in range(rows)]
    f_score = [[float('inf')] * cols for _ in range(rows)]
    parent = {}
    g_score[start[0]][start[1]] = 0
    f_score[start[0]][start[1]] = heuristic(start, end)
    pq = [(f_score[start[0]][start[1]], start[0], start[1])]
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    while pq:
        _, r, c = heapq.heappop(pq)
        if (r, c) == end:
            return reconstruct_path(parent, end)
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                tentative = g_score[r][c] + 1
                if tentative < g_score[nr][nc]:
                    parent[(nr, nc)] = (r, c)
                    g_score[nr][nc] = tentative
                    f_score[nr][nc] = tentative + heuristic((nr, nc), end)
                    heapq.heappush(pq, (f_score[nr][nc], nr, nc))
    return []

def reconstruct_path(parent, end):
    path = []
    cur = end
    while cur in parent: path.append(cur); cur = parent[cur]
    path.reverse()
    return path`,
    javascript: `function heuristic(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function astar(grid, start, end) {
  const rows = grid.length, cols = grid[0].length;
  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent = {};
  gScore[start[0]][start[1]] = 0;
  fScore[start[0]][start[1]] = heuristic(start, end);
  const pq = [[fScore[start[0]][start[1]], start[0], start[1]]];
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [_, r, c] = pq.shift();
    if (r === end[0] && c === end[1]) return reconstructPath(parent, end);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
        const tentative = gScore[r][c] + 1;
        if (tentative < gScore[nr][nc]) {
          parent[nr + ',' + nc] = [r, c];
          gScore[nr][nc] = tentative;
          fScore[nr][nc] = tentative + heuristic([nr, nc], end);
          pq.push([fScore[nr][nc], nr, nc]);
        }
      }
    }
  }
  return [];
}

function reconstructPath(parent, end) {
  const path = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) { path.push(parent[key]); key = parent[key][0] + ',' + parent[key][1]; }
  return path.reverse();
}`,
    typescript: `function heuristic(a: number[], b: number[]): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function astar(grid: number[][], start: number[], end: number[]): number[][] {
  const rows = grid.length, cols = grid[0].length;
  const gScore: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const fScore: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent: Record<string, number[]> = {};
  gScore[start[0]][start[1]] = 0;
  fScore[start[0]][start[1]] = heuristic(start, end);
  const pq: number[][] = [[fScore[start[0]][start[1]], start[0], start[1]]];
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [_, r, c] = pq.shift()!;
    if (r === end[0] && c === end[1]) return reconstructPath(parent, end);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
        const tentative = gScore[r][c] + 1;
        if (tentative < gScore[nr][nc]) {
          parent[nr + ',' + nc] = [r, c];
          gScore[nr][nc] = tentative;
          fScore[nr][nc] = tentative + heuristic([nr, nc], end);
          pq.push([fScore[nr][nc], nr, nc]);
        }
      }
    }
  }
  return [];
}

function reconstructPath(parent: Record<string, number[]>, end: number[]): number[][] {
  const path: number[][] = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) { path.push(parent[key]); key = parent[key][0] + ',' + parent[key][1]; }
  return path.reverse();
}`,
    java: `public static int heuristic(int[] a, int[] b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

public static List<int[]> astar(int[][] grid, int[] start, int[] end) {
    int rows = grid.length, cols = grid[0].length;
    double[][] gScore = new double[rows][cols];
    double[][] fScore = new double[rows][cols];
    for (double[] row : gScore) Arrays.fill(row, Double.MAX_VALUE);
    for (double[] row : fScore) Arrays.fill(row, Double.MAX_VALUE);
    Map<String, int[]> parent = new HashMap<>();
    gScore[start[0]][start[1]] = 0;
    fScore[start[0]][start[1]] = heuristic(start, end);
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Double.compare(a[0], b[0]));
    pq.add(new int[]{(int)fScore[start[0]][start[1]], start[0], start[1]});
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int r = cur[1], c = cur[2];
        if (r == end[0] && c == end[1]) return reconstructPath(parent, end);
        for (int[] dir : dirs) {
            int nr = r + dir[0], nc = c + dir[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                double tentative = gScore[r][c] + 1;
                if (tentative < gScore[nr][nc]) {
                    parent.put(nr + "," + nc, new int[]{r, c});
                    gScore[nr][nc] = tentative;
                    fScore[nr][nc] = tentative + heuristic(new int[]{nr, nc}, end);
                    pq.add(new int[]{(int)fScore[nr][nc], nr, nc});
                }
            }
        }
    }
    return new ArrayList<>();
}

public static List<int[]> reconstructPath(Map<String, int[]> parent, int[] end) {
    List<int[]> path = new ArrayList<>();
    String key = end[0] + "," + end[1];
    while (parent.containsKey(key)) { path.add(parent.get(key)); key = parent.get(key)[0] + "," + parent.get(key)[1]; }
    Collections.reverse(path);
    return path;
}`,
    cpp: `int heuristic(Point a, Point b) {
    return abs(a.first - b.first) + abs(a.second - b.second);
}

vector<Point> astar(const Grid& grid, Point start, Point end) {
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<int>> gScore(rows, vector<int>(cols, INT_MAX));
    vector<vector<int>> fScore(rows, vector<int>(cols, INT_MAX));
    map<Point, Point> parent;
    gScore[start.first][start.second] = 0;
    fScore[start.first][start.second] = heuristic(start, end);
    priority_queue<pair<int, Point>, vector<pair<int, Point>>, greater<>> pq;
    pq.push({fScore[start.first][start.second], start});
    vector<Point> dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    while (!pq.empty()) {
        auto [f, p] = pq.top(); pq.pop();
        auto [r, c] = p;
        if (p == end) {
            vector<Point> path;
            for (Point cur = end; parent.count(cur); cur = parent[cur]) path.push_back(cur);
            reverse(path.begin(), path.end()); return path;
        }
        for (auto [dr, dc] : dirs) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                int tentative = gScore[r][c] + 1;
                if (tentative < gScore[nr][nc]) {
                    gScore[nr][nc] = tentative;
                    fScore[nr][nc] = tentative + heuristic({nr, nc}, end);
                    parent[{nr, nc}] = {r, c};
                    pq.push({fScore[nr][nc], {nr, nc}});
                }
            }
        }
    }
    return {};
}`,
    csharp: `public static int Heuristic((int, int) a, (int, int) b) {
    return Math.Abs(a.Item1 - b.Item1) + Math.Abs(a.Item2 - b.Item2);
}

public static List<(int, int)> AStar(int[][] grid, (int, int) start, (int, int) end) {
    int rows = grid.Length, cols = grid[0].Length;
    double[,] gScore = new double[rows, cols];
    double[,] fScore = new double[rows, cols];
    for (int i = 0; i < rows; i++) for (int j = 0; j < cols; j++) gScore[i, j] = fScore[i, j] = double.MaxValue;
    Dictionary<(int, int), (int, int)> parent = new();
    gScore.Item1 = gScore.Item2 = 0;
    fScore.Item1 = fScore.Item2 = Heuristic(start, end);
    var pq = new SortedSet<(double, int, int)>();
    pq.Add((fScore.Item1, start.Item1, start.Item2));
    int[][] dirs = [new[]{0,1}, new[]{1,0}, new[]{0,-1}, new[]{-1,0}];
    while (pq.Count > 0) {
        var (_, r, c) = pq.Min; pq.Remove(pq.Min);
        if (r == end.Item1 && c == end.Item2) return ReconstructPath(parent, end);
        foreach (var dir in dirs) {
            int nr = r + dir[0], nc = c + dir[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                double tentative = gScore[r, c] + 1;
                if (tentative < gScore[nr, nc]) {
                    parent[(nr, nc)] = (r, c);
                    gScore[nr, nc] = tentative;
                    fScore[nr, nc] = tentative + Heuristic((nr, nc), end);
                    pq.Add((fScore[nr, nc], nr, nc));
                }
            }
        }
    }
    return new();
}

public static List<(int, int)> ReconstructPath(Dictionary<(int, int), (int, int)> parent, (int, int) end) {
    var path = new List<(int, int)>();
    var cur = end;
    while (parent.ContainsKey(cur)) { path.Add(parent[cur]); cur = parent[cur]; }
    path.Reverse();
    return path;
}`,
    go: `func heuristic(a, b point) int {
    return abs(a.r-b.r) + abs(a.c-b.c)
}
func abs(x int) int { if x < 0 { return -x }; return x }

func astar(grid [][]int, start, end point) []point {
    rows, cols := len(grid), len(grid[0])
    gScore := make([][]int, rows)
    fScore := make([][]int, rows)
    for i := range gScore {
        gScore[i] = make([]int, cols); fScore[i] = make([]int, cols)
        for j := range gScore[i] { gScore[i][j] = 1<<30; fScore[i][j] = 1<<30 }
    }
    parent := make(map[point]point)
    gScore[start.r][start.c] = 0
    fScore[start.r][start.c] = heuristic(start, end)
    pq := &PQ{{fScore[start.r][start.c], start.r, start.c}}
    heap.Init(pq)
    dirs := []point{{0,1}, {1,0}, {0,-1}, {-1,0}}
    for pq.Len() > 0 {
        item := heap.Pop(pq).(pqItem)
        r, c := item.r, item.c
        if r == end.r && c == end.c {
            var path []point
            for p := end; ; { pp, ok := parent[p]; if !ok { break }; path = append(path, p); p = pp }
            for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 { path[i], path[j] = path[j], path[i] }
            return path
        }
        for _, dir := range dirs {
            nr, nc := r+dir.r, c+dir.c
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
                tentative := gScore[r][c] + 1
                if tentative < gScore[nr][nc] {
                    gScore[nr][nc] = tentative
                    fScore[nr][nc] = tentative + heuristic(point{nr, nc}, end)
                    parent[point{nr, nc}] = point{r, c}
                    heap.Push(pq, pqItem{fScore[nr][nc], nr, nc})
                }
            }
        }
    }
    return nil
}`,
    rust: `fn heuristic(a: (usize, usize), b: (usize, usize)) -> usize {
    ((a.0 as isize - b.0 as isize).abs() + (a.1 as isize - b.1 as isize).abs()) as usize
}

fn astar(grid: &[Vec<i32>], start: (usize, usize), end: (usize, usize)) -> Vec<(usize, usize)> {
    let rows = grid.len(); let cols = grid[0].len();
    let mut g_score = vec![vec![usize::MAX; cols]; rows];
    let mut f_score = vec![vec![usize::MAX; cols]; rows];
    let mut parent: HashMap<(usize, usize), (usize, usize)> = HashMap::new();
    g_score[start.0][start.1] = 0;
    f_score[start.0][start.1] = heuristic(start, end);
    let mut pq = BinaryHeap::new();
    pq.push(Reverse((f_score[start.0][start.1], start.0, start.1)));
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)];
    while let Some(Reverse((_, r, c))) = pq.pop() {
        if (r, c) == end {
            let mut path = Vec::new(); let mut cur = end;
            while let Some(&p) = parent.get(&cur) { path.push(cur); cur = p; }
            path.reverse(); return path;
        }
        for (dr, dc) in dirs {
            let nr = r.wrapping_add(dr); let nc = c.wrapping_add(dc);
            if nr < rows && nc < cols && grid[nr][nc] == 1 {
                let tentative = g_score[r][c] + 1;
                if tentative < g_score[nr][nc] {
                    g_score[nr][nc] = tentative;
                    f_score[nr][nc] = tentative + heuristic((nr, nc), end);
                    parent.insert((nr, nc), (r, c));
                    pq.push(Reverse((f_score[nr][nc], nr, nc)));
                }
            }
        }
    }
    vec![]
}`,
    kotlin: `fun heuristic(a: Pair<Int,Int>, b: Pair<Int,Int>): Int =
    kotlin.math.abs(a.first - b.first) + kotlin.math.abs(a.second - b.second)

fun astar(grid: Array<IntArray>, start: Pair<Int,Int>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val rows = grid.size; val cols = grid[0].size
    val gScore = Array(rows) { DoubleArray(cols) { Double.MAX_VALUE } }
    val fScore = Array(rows) { DoubleArray(cols) { Double.MAX_VALUE } }
    val parent = mutableMapOf<Pair<Int,Int>, Pair<Int,Int>>()
    gScore[start.first][start.second] = 0.0
    fScore[start.first][start.second] = heuristic(start, end).toDouble()
    val pq = PriorityQueue<Triple<Double,Int,Int>>(compareBy { it.first })
    pq.add(Triple(fScore[start.first][start.second], start.first, start.second))
    val dirs = listOf(0 to 1, 1 to 0, 0 to -1, -1 to 0)
    while (pq.isNotEmpty()) {
        val (_, r, c) = pq.poll()
        if ((r to c) == end) return reconstructPath(parent, end)
        for ((dr, dc) in dirs) {
            val nr = r + dr; val nc = c + dc
            if (nr in 0 until rows && nc in 0 until cols && grid[nr][nc] == 1) {
                val tentative = gScore[r][c] + 1
                if (tentative < gScore[nr][nc]) {
                    gScore[nr][nc] = tentative
                    fScore[nr][nc] = tentative + heuristic(nr to nc, end)
                    parent[nr to nc] = r to c
                    pq.add(Triple(fScore[nr][nc], nr, nc))
                }
            }
        }
    }
    return emptyList()
}

fun reconstructPath(parent: Map<Pair<Int,Int>, Pair<Int,Int>>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val path = mutableListOf<Pair<Int,Int>>()
    var cur = end
    while (parent.containsKey(cur)) { path.add(parent[cur]!!); cur = parent[cur]!! }
    return path.reversed()
}`,
    swift: `func heuristic(_ a: (Int, Int), _ b: (Int, Int)) -> Int {
    abs(a.0 - b.0) + abs(a.1 - b.1)
}

func astar(grid: [[Int]], start: (Int, Int), end: (Int, Int)) -> [(Int, Int)] {
    let rows = grid.count, cols = grid[0].count
    var gScore = [[Double]](repeating: [Double](repeating: .infinity, count: cols), count: rows)
    var fScore = [[Double]](repeating: [Double](repeating: .infinity, count: cols), count: rows)
    var parent = [(Int, Int): (Int, Int)]()
    gScore[start.0][start.1] = 0
    fScore[start.0][start.1] = Double(heuristic(start, end))
    var pq = [(Double, Int, Int)]()
    pq.append((fScore[start.0][start.1], start.0, start.1))
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    while !pq.isEmpty {
        pq.sort { $0.0 < $1.0 }
        let (_, r, c) = pq.removeFirst()
        if (r, c) == end { return reconstructPath(&parent, end) }
        for (dr, dc) in dirs {
            let nr = r + dr, nc = c + dc
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
                let tentative = gScore[r][c] + 1
                if tentative < gScore[nr][nc] {
                    gScore[nr][nc] = tentative
                    fScore[nr][nc] = tentative + Double(heuristic((nr, nc), end))
                    parent[(nr, nc)] = (r, c)
                    pq.append((fScore[nr][nc], nr, nc))
                }
            }
        }
    }
    return []
}

func reconstructPath(_ parent: inout [(Int, Int): (Int, Int)], _ end: (Int, Int)) -> [(Int, Int)] {
    var path = [(Int, Int)]()
    var cur = end
    while let p = parent[cur] { path.append(cur); cur = p }
    return path.reversed()
}`,
  },
  bidirectional_bfs: {
    python: `from collections import deque

def bidirectional_bfs(grid, start, end):
    if start == end: return [start]
    rows, cols = len(grid), len(grid[0])
    f_visited = [[False] * cols for _ in range(rows)]
    b_visited = [[False] * cols for _ in range(rows)]
    f_parent = {}; b_parent = {}
    f_q = deque([start]); b_q = deque([end])
    f_visited[start[0]][start[1]] = True
    b_visited[end[0]][end[1]] = True
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    meeting = None
    while f_q and b_q and not meeting:
        for _ in range(len(f_q)):
            r, c = f_q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1 and not f_visited[nr][nc]:
                    f_visited[nr][nc] = True
                    f_parent[(nr, nc)] = (r, c)
                    f_q.append((nr, nc))
                    if b_visited[nr][nc]: meeting = (nr, nc); break
            if meeting: break
        if meeting: break
        for _ in range(len(b_q)):
            r, c = b_q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1 and not b_visited[nr][nc]:
                    b_visited[nr][nc] = True
                    b_parent[(nr, nc)] = (r, c)
                    b_q.append((nr, nc))
                    if f_visited[nr][nc]: meeting = (nr, nc); break
            if meeting: break
    if not meeting: return []
    path = []
    cur = meeting
    while cur in f_parent: path.append(cur); cur = f_parent[cur]
    path.append(meeting)
    cur = meeting
    while cur in b_parent: cur = b_parent[cur]; path.append(cur)
    return path`,
    javascript: `function bidirectionalBfs(grid, start, end) {
  if (start[0] === end[0] && start[1] === end[1]) return [start];
  const rows = grid.length, cols = grid[0].length;
  const fVisited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const bVisited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const fParent = {}, bParent = {};
  let fQ = [start], bQ = [end];
  fVisited[start[0]][start[1]] = true;
  bVisited[end[0]][end[1]] = true;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  let meeting = null;
  while (fQ.length > 0 && bQ.length > 0 && !meeting) {
    let nextF = [];
    for (const [r, c] of fQ) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1 && !fVisited[nr][nc]) {
          fVisited[nr][nc] = true;
          fParent[nr + ',' + nc] = [r, c];
          nextF.push([nr, nc]);
          if (bVisited[nr][nc]) { meeting = [nr, nc]; break; }
        }
      }
      if (meeting) break;
    }
    fQ = nextF;
    if (meeting) break;
    let nextB = [];
    for (const [r, c] of bQ) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1 && !bVisited[nr][nc]) {
          bVisited[nr][nc] = true;
          bParent[nr + ',' + nc] = [r, c];
          nextB.push([nr, nc]);
          if (fVisited[nr][nc]) { meeting = [nr, nc]; break; }
        }
      }
      if (meeting) break;
    }
    bQ = nextB;
  }
  if (!meeting) return [];
  const path = [];
  let key = meeting[0] + ',' + meeting[1];
  let cur = meeting;
  while (fParent[key]) { path.push(cur); cur = fParent[key]; key = cur[0] + ',' + cur[1]; }
  path.reverse(); path.push(meeting);
  key = meeting[0] + ',' + meeting[1]; cur = meeting;
  while (bParent[key]) { cur = bParent[key]; path.push(cur); key = cur[0] + ',' + cur[1]; }
  return path;
}`,
    typescript: `function bidirectionalBfs(grid: number[][], start: number[], end: number[]): number[][] {
  if (start[0] === end[0] && start[1] === end[1]) return [start];
  const rows = grid.length, cols = grid[0].length;
  const fVisited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const bVisited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const fParent: Record<string, number[]> = {}, bParent: Record<string, number[]> = {};
  let fQ: number[][] = [start], bQ: number[][] = [end];
  fVisited[start[0]][start[1]] = true;
  bVisited[end[0]][end[1]] = true;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  let meeting: number[] | null = null;
  while (fQ.length > 0 && bQ.length > 0 && !meeting) {
    let nextF: number[][] = [];
    for (const [r, c] of fQ) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1 && !fVisited[nr][nc]) {
          fVisited[nr][nc] = true; fParent[nr + ',' + nc] = [r, c]; nextF.push([nr, nc]);
          if (bVisited[nr][nc]) { meeting = [nr, nc]; break; }
        }
      }
      if (meeting) break;
    }
    fQ = nextF;
    if (meeting) break;
    let nextB: number[][] = [];
    for (const [r, c] of bQ) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1 && !bVisited[nr][nc]) {
          bVisited[nr][nc] = true; bParent[nr + ',' + nc] = [r, c]; nextB.push([nr, nc]);
          if (fVisited[nr][nc]) { meeting = [nr, nc]; break; }
        }
      }
      if (meeting) break;
    }
    bQ = nextB;
  }
  if (!meeting) return [];
  const path: number[][] = [];
  let key = meeting[0] + ',' + meeting[1];
  let cur = meeting;
  while (fParent[key]) { path.push(cur); cur = fParent[key]; key = cur[0] + ',' + cur[1]; }
  path.reverse(); path.push(meeting);
  key = meeting[0] + ',' + meeting[1]; cur = meeting;
  while (bParent[key]) { cur = bParent[key]; path.push(cur); key = cur[0] + ',' + cur[1]; }
  return path;
}`,
    java: `public static List<int[]> bidirectionalBfs(int[][] grid, int[] start, int[] end) {
    if (start[0] == end[0] && start[1] == end[1]) return List.of(start);
    int rows = grid.length, cols = grid[0].length;
    boolean[][] fVisited = new boolean[rows][cols], bVisited = new boolean[rows][cols];
    Map<String, int[]> fParent = new HashMap<>(), bParent = new HashMap<>();
    Queue<int[]> fQ = new LinkedList<>(), bQ = new LinkedList<>();
    fQ.add(start); bQ.add(end);
    fVisited[start[0]][start[1]] = true; bVisited[end[0]][end[1]] = true;
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    int[] meeting = null;
    while (!fQ.isEmpty() && !bQ.isEmpty() && meeting == null) {
        int fSize = fQ.size();
        for (int i = 0; i < fSize && meeting == null; i++) {
            int[] cur = fQ.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !fVisited[nr][nc]) {
                    fVisited[nr][nc] = true; fParent.put(nr + "," + nc, cur); fQ.add(new int[]{nr, nc});
                    if (bVisited[nr][nc]) { meeting = new int[]{nr, nc}; break; }
                }
            }
        }
        if (meeting != null) break;
        int bSize = bQ.size();
        for (int i = 0; i < bSize && meeting == null; i++) {
            int[] cur = bQ.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !bVisited[nr][nc]) {
                    bVisited[nr][nc] = true; bParent.put(nr + "," + nc, cur); bQ.add(new int[]{nr, nc});
                    if (fVisited[nr][nc]) { meeting = new int[]{nr, nc}; break; }
                }
            }
        }
    }
    if (meeting == null) return new ArrayList<>();
    List<int[]> path = new ArrayList<>();
    String key = meeting[0] + "," + meeting[1];
    int[] cur = meeting;
    while (fParent.containsKey(key)) { path.add(cur); cur = fParent.get(key); key = cur[0] + "," + cur[1]; }
    Collections.reverse(path); path.add(meeting);
    key = meeting[0] + "," + meeting[1]; cur = meeting;
    while (bParent.containsKey(key)) { cur = bParent.get(key); path.add(cur); key = cur[0] + "," + cur[1]; }
    return path;
}`,
    cpp: `vector<Point> bidirectionalBfs(const Grid& grid, Point start, Point end) {
    if (start == end) return {start};
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<bool>> fVis(rows, vector<bool>(cols, false)), bVis(rows, vector<bool>(cols, false));
    map<Point, Point> fPar, bPar;
    queue<Point> fQ, bQ;
    fQ.push(start); bQ.push(end);
    fVis[start.first][start.second] = true; bVis[end.first][end.second] = true;
    vector<Point> dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    Point meeting = {-1, -1};
    while (!fQ.empty() && !bQ.empty() && meeting.first == -1) {
        int fs = fQ.size();
        while (fs-- && meeting.first == -1) {
            auto [r, c] = fQ.front(); fQ.pop();
            for (auto [dr, dc] : dirs) {
                int nr = r+dr, nc = c+dc;
                if (nr>=0 && nr<rows && nc>=0 && nc<cols && grid[nr][nc]==1 && !fVis[nr][nc]) {
                    fVis[nr][nc]=true; fPar[{nr,nc}]={r,c}; fQ.push({nr,nc});
                    if (bVis[nr][nc]) { meeting={nr,nc}; break; }
                }
            }
        }
        if (meeting.first != -1) break;
        int bs = bQ.size();
        while (bs-- && meeting.first == -1) {
            auto [r, c] = bQ.front(); bQ.pop();
            for (auto [dr, dc] : dirs) {
                int nr = r+dr, nc = c+dc;
                if (nr>=0 && nr<rows && nc>=0 && nc<cols && grid[nr][nc]==1 && !bVis[nr][nc]) {
                    bVis[nr][nc]=true; bPar[{nr,nc}]={r,c}; bQ.push({nr,nc});
                    if (fVis[nr][nc]) { meeting={nr,nc}; break; }
                }
            }
        }
    }
    if (meeting.first == -1) return {};
    vector<Point> path;
    for (Point p = meeting; fPar.count(p); p = fPar[p]) path.push_back(p);
    reverse(path.begin(), path.end());
    path.push_back(meeting);
    for (Point p = meeting; bPar.count(p); p = bPar[p]) { p = bPar[p]; path.push_back(p); }
    return path;
}`,
    csharp: `public static List<(int, int)> BidirectionalBfs(int[][] grid, (int, int) start, (int, int) end) {
    if (start == end) return new() { start };
    int rows = grid.Length, cols = grid[0].Length;
    bool[,] fVis = new bool[rows, cols], bVis = new bool[rows, cols];
    Dictionary<(int, int), (int, int)> fPar = new(), bPar = new();
    Queue<(int, int)> fQ = new(), bQ = new();
    fQ.Enqueue(start); bQ.Enqueue(end);
    fVis.Item1 = fVis.Item2 = true; bVis.Item1 = bVis.Item2 = true;
    int[][] dirs = [new[]{0,1}, new[]{1,0}, new[]{0,-1}, new[]{-1,0}];
    (int, int)? meeting = null;
    while (fQ.Count > 0 && bQ.Count > 0 && meeting == null) {
        int fs = fQ.Count;
        while (fs-- > 0 && meeting == null) {
            var (r, c) = fQ.Dequeue();
            foreach (var d in dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !fVis[nr, nc]) {
                    fVis[nr, nc] = true; fPar[(nr, nc)] = (r, c); fQ.Enqueue((nr, nc));
                    if (bVis[nr, nc]) { meeting = (nr, nc); break; }
                }
            }
        }
        if (meeting != null) break;
        int bs = bQ.Count;
        while (bs-- > 0 && meeting == null) {
            var (r, c) = bQ.Dequeue();
            foreach (var d in dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !bVis[nr, nc]) {
                    bVis[nr, nc] = true; bPar[(nr, nc)] = (r, c); bQ.Enqueue((nr, nc));
                    if (fVis[nr, nc]) { meeting = (nr, nc); break; }
                }
            }
        }
    }
    if (meeting == null) return new();
    var path = new List<(int, int)>();
    var cur = meeting.Value;
    while (fPar.ContainsKey(cur)) { path.Add(cur); cur = fPar[cur]; }
    path.Reverse(); path.Add(meeting.Value);
    cur = meeting.Value;
    while (bPar.ContainsKey(cur)) { cur = bPar[cur]; path.Add(cur); }
    return path;
}`,
    go: `func bidirectionalBfs(grid [][]int, start, end point) []point {
    if start == end { return []point{start} }
    rows, cols := len(grid), len(grid[0])
    fVis := make([][]bool, rows); bVis := make([][]bool, rows)
    for i := range fVis { fVis[i] = make([]bool, cols); bVis[i] = make([]bool, cols) }
    fPar := make(map[point]point); bPar := make(map[point]point)
    fQ := []point{start}; bQ := []point{end}
    fVis[start.r][start.c] = true; bVis[end.r][end.c] = true
    dirs := []point{{0,1}, {1,0}, {0,-1}, {-1,0}}
    var meeting *point
    for len(fQ) > 0 && len(bQ) > 0 && meeting == nil {
        var nextF []point
        for _, cur := range fQ {
            for _, d := range dirs {
                nr, nc := cur.r+d.r, cur.c+d.c
                if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !fVis[nr][nc] {
                    fVis[nr][nc] = true; fPar[point{nr, nc}] = cur; nextF = append(nextF, point{nr, nc})
                    if bVis[nr][nc] { meeting = &point{nr, nc}; break }
                }
            }
            if meeting != nil { break }
        }
        fQ = nextF
        if meeting != nil { break }
        var nextB []point
        for _, cur := range bQ {
            for _, d := range dirs {
                nr, nc := cur.r+d.r, cur.c+d.c
                if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !bVis[nr][nc] {
                    bVis[nr][nc] = true; bPar[point{nr, nc}] = cur; nextB = append(nextB, point{nr, nc})
                    if fVis[nr][nc] { meeting = &point{nr, nc}; break }
                }
            }
            if meeting != nil { break }
        }
        bQ = nextB
    }
    if meeting == nil { return nil }
    var path []point
    for p := *meeting; ; { pp, ok := fPar[p]; if !ok { break }; path = append(path, p); p = pp }
    for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 { path[i], path[j] = path[j], path[i] }
    path = append(path, *meeting)
    for p := *meeting; ; { pp, ok := bPar[p]; if !ok { break }; p = pp; path = append(path, p) }
    return path
}`,
    rust: `use std::collections::{HashMap, VecDeque};

fn bidirectional_bfs(grid: &[Vec<i32>], start: (usize, usize), end: (usize, usize)) -> Vec<(usize, usize)> {
    if start == end { return vec![start] }
    let rows = grid.len(); let cols = grid[0].len();
    let mut f_vis = vec![vec![false; cols]; rows];
    let mut b_vis = vec![vec![false; cols]; rows];
    let mut f_par: HashMap<(usize, usize), (usize, usize)> = HashMap::new();
    let mut b_par: HashMap<(usize, usize), (usize, usize)> = HashMap::new();
    let mut f_q = VecDeque::new(); let mut b_q = VecDeque::new();
    f_q.push_back(start); b_q.push_back(end);
    f_vis[start.0][start.1] = true; b_vis[end.0][end.1] = true;
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)];
    let mut meeting: Option<(usize, usize)> = None;
    while !f_q.is_empty() && !b_q.is_empty() && meeting.is_none() {
        let fs = f_q.len();
        for _ in 0..fs {
            let (r, c) = f_q.pop_front().unwrap();
            for (dr, dc) in dirs {
                let nr = r.wrapping_add(dr); let nc = c.wrapping_add(dc);
                if nr < rows && nc < cols && grid[nr][nc] == 1 && !f_vis[nr][nc] {
                    f_vis[nr][nc] = true; f_par.insert((nr, nc), (r, c)); f_q.push_back((nr, nc));
                    if b_vis[nr][nc] { meeting = Some((nr, nc)); break; }
                }
            }
            if meeting.is_some() { break; }
        }
        if meeting.is_some() { break; }
        let bs = b_q.len();
        for _ in 0..bs {
            let (r, c) = b_q.pop_front().unwrap();
            for (dr, dc) in dirs {
                let nr = r.wrapping_add(dr); let nc = c.wrapping_add(dc);
                if nr < rows && nc < cols && grid[nr][nc] == 1 && !b_vis[nr][nc] {
                    b_vis[nr][nc] = true; b_par.insert((nr, nc), (r, c)); b_q.push_back((nr, nc));
                    if f_vis[nr][nc] { meeting = Some((nr, nc)); break; }
                }
            }
            if meeting.is_some() { break; }
        }
    }
    if meeting.is_none() { return vec![]; }
    let m = meeting.unwrap();
    let mut path = Vec::new();
    let mut cur = m;
    while let Some(&p) = f_par.get(&cur) { path.push(cur); cur = p; }
    path.reverse(); path.push(m);
    cur = m;
    while let Some(&p) = b_par.get(&cur) { cur = p; path.push(cur); }
    path
}`,
    kotlin: `fun bidirectionalBfs(grid: Array<IntArray>, start: Pair<Int,Int>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    if (start == end) return listOf(start)
    val rows = grid.size; val cols = grid[0].size
    val fVis = Array(rows) { BooleanArray(cols) }; val bVis = Array(rows) { BooleanArray(cols) }
    val fPar = mutableMapOf<Pair<Int,Int>, Pair<Int,Int>>()
    val bPar = mutableMapOf<Pair<Int,Int>, Pair<Int,Int>>()
    val fQ = ArrayDeque<Pair<Int,Int>>(); val bQ = ArrayDeque<Pair<Int,Int>>()
    fQ.add(start); bQ.add(end)
    fVis[start.first][start.second] = true; bVis[end.first][end.second] = true
    val dirs = listOf(0 to 1, 1 to 0, 0 to -1, -1 to 0)
    var meeting: Pair<Int,Int>? = null
    while (fQ.isNotEmpty() && bQ.isNotEmpty() && meeting == null) {
        repeat(fQ.size) {
            val (r, c) = fQ.removeFirst()
            for ((dr, dc) in dirs) {
                val nr = r + dr; val nc = c + dc
                if (nr in 0 until rows && nc in 0 until cols && grid[nr][nc] == 1 && !fVis[nr][nc]) {
                    fVis[nr][nc] = true; fPar[nr to nc] = r to c; fQ.add(nr to nc)
                    if (bVis[nr][nc]) { meeting = nr to nc; return@repeat }
                }
            }
        }
        if (meeting != null) break
        repeat(bQ.size) {
            val (r, c) = bQ.removeFirst()
            for ((dr, dc) in dirs) {
                val nr = r + dr; val nc = c + dc
                if (nr in 0 until rows && nc in 0 until cols && grid[nr][nc] == 1 && !bVis[nr][nc]) {
                    bVis[nr][nc] = true; bPar[nr to nc] = r to c; bQ.add(nr to nc)
                    if (fVis[nr][nc]) { meeting = nr to nc; return@repeat }
                }
            }
        }
    }
    if (meeting == null) return emptyList()
    val path = mutableListOf<Pair<Int,Int>>()
    var cur = meeting!!
    while (fPar.containsKey(cur)) { path.add(cur); cur = fPar[cur]!! }
    path.reverse(); path.add(meeting!!)
    cur = meeting!!
    while (bPar.containsKey(cur)) { cur = bPar[cur]!!; path.add(cur) }
    return path
}`,
    swift: `func bidirectionalBfs(grid: [[Int]], start: (Int, Int), end: (Int, Int)) -> [(Int, Int)] {
    if start == end { return [start] }
    let rows = grid.count, cols = grid[0].count
    var fVis = [[Bool]](repeating: [Bool](repeating: false, count: cols), count: rows)
    var bVis = [[Bool]](repeating: [Bool](repeating: false, count: cols), count: rows)
    var fPar = [(Int, Int): (Int, Int)](), bPar = [(Int, Int): (Int, Int)]()
    var fQ = [(Int, Int)](), bQ = [(Int, Int)]()
    fQ.append(start); bQ.append(end)
    fVis[start.0][start.1] = true; bVis[end.0][end.1] = true
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    var meeting: (Int, Int)? = nil
    while !fQ.isEmpty && !bQ.isEmpty && meeting == nil {
        var nextF = [(Int, Int)]()
        for (r, c) in fQ {
            for (dr, dc) in dirs {
                let nr = r + dr, nc = c + dc
                if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !fVis[nr][nc] {
                    fVis[nr][nc] = true; fPar[(nr, nc)] = (r, c); nextF.append((nr, nc))
                    if bVis[nr][nc] { meeting = (nr, nc); break }
                }
            }
            if meeting != nil { break }
        }
        fQ = nextF
        if meeting != nil { break }
        var nextB = [(Int, Int)]()
        for (r, c) in bQ {
            for (dr, dc) in dirs {
                let nr = r + dr, nc = c + dc
                if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !bVis[nr][nc] {
                    bVis[nr][nc] = true; bPar[(nr, nc)] = (r, c); nextB.append((nr, nc))
                    if fVis[nr][nc] { meeting = (nr, nc); break }
                }
            }
            if meeting != nil { break }
        }
        bQ = nextB
    }
    guard let m = meeting else { return [] }
    var path = [(Int, Int)]()
    var cur = m
    while let p = fPar[cur] { path.append(cur); cur = p }
    path.reverse(); path.append(m)
    cur = m
    while let p = bPar[cur] { cur = p; path.append(cur) }
    return path
}`,
  },
  greedy_best_first: {
    python: `import heapq

def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def greedy_best_first(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    visited = [[False] * cols for _ in range(rows)]
    parent = {}
    pq = [(heuristic(start, end), start[0], start[1])]
    visited[start[0]][start[1]] = True
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    while pq:
        _, r, c = heapq.heappop(pq)
        if (r, c) == end:
            return reconstruct_path(parent, end)
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc] and grid[nr][nc] == 1:
                visited[nr][nc] = True
                parent[(nr, nc)] = (r, c)
                heapq.heappush(pq, (heuristic((nr, nc), end), nr, nc))
    return []

def reconstruct_path(parent, end):
    path = []
    cur = end
    while cur in parent: path.append(cur); cur = parent[cur]
    path.reverse()
    return path`,
    javascript: `function heuristic(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function greedyBestFirst(grid, start, end) {
  const rows = grid.length, cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = {};
  const pq = [[heuristic(start, end), start[0], start[1]]];
  visited[start[0]][start[1]] = true;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [_, r, c] = pq.shift();
    if (r === end[0] && c === end[1]) return reconstructPath(parent, end);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] === 1) {
        visited[nr][nc] = true;
        parent[nr + ',' + nc] = [r, c];
        pq.push([heuristic([nr, nc], end), nr, nc]);
      }
    }
  }
  return [];
}

function reconstructPath(parent, end) {
  const path = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) { path.push(parent[key]); key = parent[key][0] + ',' + parent[key][1]; }
  return path.reverse();
}`,
    typescript: `function heuristic(a: number[], b: number[]): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function greedyBestFirst(grid: number[][], start: number[], end: number[]): number[][] {
  const rows = grid.length, cols = grid[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent: Record<string, number[]> = {};
  const pq: number[][] = [[heuristic(start, end), start[0], start[1]]];
  visited[start[0]][start[1]] = true;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [_, r, c] = pq.shift()!;
    if (r === end[0] && c === end[1]) return reconstructPath(parent, end);
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] === 1) {
        visited[nr][nc] = true;
        parent[nr + ',' + nc] = [r, c];
        pq.push([heuristic([nr, nc], end), nr, nc]);
      }
    }
  }
  return [];
}

function reconstructPath(parent: Record<string, number[]>, end: number[]): number[][] {
  const path: number[][] = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) { path.push(parent[key]); key = parent[key][0] + ',' + parent[key][1]; }
  return path.reverse();
}`,
    java: `public static int heuristic(int[] a, int[] b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

public static List<int[]> greedyBestFirst(int[][] grid, int[] start, int[] end) {
    int rows = grid.length, cols = grid[0].length;
    boolean[][] visited = new boolean[rows][cols];
    Map<String, int[]> parent = new HashMap<>();
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
    pq.add(new int[]{heuristic(start, end), start[0], start[1]});
    visited[start[0]][start[1]] = true;
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int r = cur[1], c = cur[2];
        if (r == end[0] && c == end[1]) return reconstructPath(parent, end);
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true;
                parent.put(nr + "," + nc, new int[]{r, c});
                pq.add(new int[]{heuristic(new int[]{nr, nc}, end), nr, nc});
            }
        }
    }
    return new ArrayList<>();
}

public static List<int[]> reconstructPath(Map<String, int[]> parent, int[] end) {
    List<int[]> path = new ArrayList<>();
    String key = end[0] + "," + end[1];
    while (parent.containsKey(key)) { path.add(parent.get(key)); key = parent.get(key)[0] + "," + parent.get(key)[1]; }
    Collections.reverse(path);
    return path;
}`,
    cpp: `int heuristic(Point a, Point b) {
    return abs(a.first - b.first) + abs(a.second - b.second);
}

vector<Point> greedyBestFirst(const Grid& grid, Point start, Point end) {
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    map<Point, Point> parent;
    priority_queue<pair<int, Point>, vector<pair<int, Point>>, greater<>> pq;
    pq.push({heuristic(start, end), start});
    visited[start.first][start.second] = true;
    vector<Point> dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    while (!pq.empty()) {
        auto [h, p] = pq.top(); pq.pop();
        auto [r, c] = p;
        if (p == end) {
            vector<Point> path;
            for (Point cur = end; parent.count(cur); cur = parent[cur]) path.push_back(cur);
            reverse(path.begin(), path.end()); return path;
        }
        for (auto [dr, dc] : dirs) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true;
                parent[{nr, nc}] = {r, c};
                pq.push({heuristic({nr, nc}, end), {nr, nc}});
            }
        }
    }
    return {};
}`,
    csharp: `public static int Heuristic((int, int) a, (int, int) b) {
    return Math.Abs(a.Item1 - b.Item1) + Math.Abs(a.Item2 - b.Item2);
}

public static List<(int, int)> GreedyBestFirst(int[][] grid, (int, int) start, (int, int) end) {
    int rows = grid.Length, cols = grid[0].Length;
    bool[,] visited = new bool[rows, cols];
    Dictionary<(int, int), (int, int)> parent = new();
    var pq = new SortedSet<(int, int, int)>();
    pq.Add((Heuristic(start, end), start.Item1, start.Item2));
    visited.Item1 = visited.Item2 = true;
    int[][] dirs = [new[]{0,1}, new[]{1,0}, new[]{0,-1}, new[]{-1,0}];
    while (pq.Count > 0) {
        var (_, r, c) = pq.Min; pq.Remove(pq.Min);
        if (r == end.Item1 && c == end.Item2) return ReconstructPath(parent, end);
        foreach (var d in dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr, nc] && grid[nr][nc] == 1) {
                visited[nr, nc] = true;
                parent[(nr, nc)] = (r, c);
                pq.Add((Heuristic((nr, nc), end), nr, nc));
            }
        }
    }
    return new();
}

public static List<(int, int)> ReconstructPath(Dictionary<(int, int), (int, int)> parent, (int, int) end) {
    var path = new List<(int, int)>();
    var cur = end;
    while (parent.ContainsKey(cur)) { path.Add(parent[cur]); cur = parent[cur]; }
    path.Reverse();
    return path;
}`,
    go: `func heuristic(a, b point) int {
    return abs(a.r-b.r) + abs(a.c-b.c)
}

func greedyBestFirst(grid [][]int, start, end point) []point {
    rows, cols := len(grid), len(grid[0])
    visited := make([][]bool, rows)
    for i := range visited { visited[i] = make([]bool, cols) }
    parent := make(map[point]point)
    pq := &PQ{{heuristic(start, end), start.r, start.c}}
    heap.Init(pq)
    visited[start.r][start.c] = true
    dirs := []point{{0,1}, {1,0}, {0,-1}, {-1,0}}
    for pq.Len() > 0 {
        item := heap.Pop(pq).(pqItem)
        r, c := item.r, item.c
        if r == end.r && c == end.c {
            var path []point
            for p := end; ; { pp, ok := parent[p]; if !ok { break }; path = append(path, p); p = pp }
            for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 { path[i], path[j] = path[j], path[i] }
            return path
        }
        for _, d := range dirs {
            nr, nc := r+d.r, c+d.c
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1 {
                visited[nr][nc] = true
                parent[point{nr, nc}] = point{r, c}
                heap.Push(pq, pqItem{heuristic(point{nr, nc}, end), nr, nc})
            }
        }
    }
    return nil
}`,
    rust: `fn heuristic(a: (usize, usize), b: (usize, usize)) -> usize {
    ((a.0 as isize - b.0 as isize).abs() + (a.1 as isize - b.1 as isize).abs()) as usize
}

fn greedy_best_first(grid: &[Vec<i32>], start: (usize, usize), end: (usize, usize)) -> Vec<(usize, usize)> {
    let rows = grid.len(); let cols = grid[0].len();
    let mut visited = vec![vec![false; cols]; rows];
    let mut parent: HashMap<(usize, usize), (usize, usize)> = HashMap::new();
    let mut pq = BinaryHeap::new();
    pq.push(Reverse((heuristic(start, end), start.0, start.1)));
    visited[start.0][start.1] = true;
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)];
    while let Some(Reverse((_, r, c))) = pq.pop() {
        if (r, c) == end {
            let mut path = Vec::new(); let mut cur = end;
            while let Some(&p) = parent.get(&cur) { path.push(cur); cur = p; }
            path.reverse(); return path;
        }
        for (dr, dc) in dirs {
            let nr = r.wrapping_add(dr); let nc = c.wrapping_add(dc);
            if nr < rows && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1 {
                visited[nr][nc] = true;
                parent.insert((nr, nc), (r, c));
                pq.push(Reverse((heuristic((nr, nc), end), nr, nc)));
            }
        }
    }
    vec![]
}`,
    kotlin: `fun heuristic(a: Pair<Int,Int>, b: Pair<Int,Int>): Int =
    kotlin.math.abs(a.first - b.first) + kotlin.math.abs(a.second - b.second)

fun greedyBestFirst(grid: Array<IntArray>, start: Pair<Int,Int>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val rows = grid.size; val cols = grid[0].size
    val visited = Array(rows) { BooleanArray(cols) }
    val parent = mutableMapOf<Pair<Int,Int>, Pair<Int,Int>>()
    val pq = PriorityQueue<Triple<Int,Int,Int>>(compareBy { it.first })
    pq.add(Triple(heuristic(start, end), start.first, start.second))
    visited[start.first][start.second] = true
    val dirs = listOf(0 to 1, 1 to 0, 0 to -1, -1 to 0)
    while (pq.isNotEmpty()) {
        val (_, r, c) = pq.poll()
        if ((r to c) == end) return reconstructPath(parent, end)
        for ((dr, dc) in dirs) {
            val nr = r + dr; val nc = c + dc
            if (nr in 0 until rows && nc in 0 until cols && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true
                parent[nr to nc] = r to c
                pq.add(Triple(heuristic(nr to nc, end), nr, nc))
            }
        }
    }
    return emptyList()
}

fun reconstructPath(parent: Map<Pair<Int,Int>, Pair<Int,Int>>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val path = mutableListOf<Pair<Int,Int>>()
    var cur = end
    while (parent.containsKey(cur)) { path.add(parent[cur]!!); cur = parent[cur]!! }
    return path.reversed()
}`,
    swift: `func heuristic(_ a: (Int, Int), _ b: (Int, Int)) -> Int {
    abs(a.0 - b.0) + abs(a.1 - b.1)
}

func greedyBestFirst(grid: [[Int]], start: (Int, Int), end: (Int, Int)) -> [(Int, Int)] {
    let rows = grid.count, cols = grid[0].count
    var visited = [[Bool]](repeating: [Bool](repeating: false, count: cols), count: rows)
    var parent = [(Int, Int): (Int, Int)]()
    var pq = [(Int, Int, Int)]()
    pq.append((heuristic(start, end), start.0, start.1))
    visited[start.0][start.1] = true
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    while !pq.isEmpty {
        pq.sort { $0.0 < $1.0 }
        let (_, r, c) = pq.removeFirst()
        if (r, c) == end { return reconstructPath(&parent, end) }
        for (dr, dc) in dirs {
            let nr = r + dr, nc = c + dc
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 1 {
                visited[nr][nc] = true
                parent[(nr, nc)] = (r, c)
                pq.append((heuristic((nr, nc), end), nr, nc))
            }
        }
    }
    return []
}

func reconstructPath(_ parent: inout [(Int, Int): (Int, Int)], _ end: (Int, Int)) -> [(Int, Int)] {
    var path = [(Int, Int)]()
    var cur = end
    while let p = parent[cur] { path.append(cur); cur = p }
    return path.reversed()
}`,
  },
  bellman_ford: {
    python: `def bellman_ford(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    dist = [[float('inf')] * cols for _ in range(rows)]
    parent = {}
    dist[start[0]][start[1]] = 0
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    edges = []
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                        edges.append(((r, c), (nr, nc)))
    for _ in range(rows * cols - 1):
        for (u, v) in edges:
            if dist[u[0]][u[1]] + 1 < dist[v[0]][v[1]]:
                dist[v[0]][v[1]] = dist[u[0]][u[1]] + 1
                parent[(v[0], v[1])] = u
    for (u, v) in edges:
        if dist[u[0]][u[1]] + 1 < dist[v[0]][v[1]]:
            return []
    if dist[end[0]][end[1]] == float('inf'):
        return []
    return reconstruct_path(parent, end)

def reconstruct_path(parent, end):
    path = []
    cur = end
    while cur in parent: path.append(cur); cur = parent[cur]
    path.reverse()
    return path`,
    javascript: `function bellmanFord(grid, start, end) {
  const rows = grid.length, cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent = {};
  dist[start[0]][start[1]] = 0;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  const edges = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        for (const [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
            edges.push([[r, c], [nr, nc]]);
          }
        }
      }
    }
  }
  for (let i = 0; i < rows * cols - 1; i++) {
    for (const [u, v] of edges) {
      if (dist[u[0]][u[1]] + 1 < dist[v[0]][v[1]]) {
        dist[v[0]][v[1]] = dist[u[0]][u[1]] + 1;
        parent[v[0] + ',' + v[1]] = u;
      }
    }
  }
  for (const [u, v] of edges) {
    if (dist[u[0]][u[1]] + 1 < dist[v[0]][v[1]]) return [];
  }
  if (dist[end[0]][end[1]] === Infinity) return [];
  return reconstructPath(parent, end);
}

function reconstructPath(parent, end) {
  const path = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) { path.push(parent[key]); key = parent[key][0] + ',' + parent[key][1]; }
  return path.reverse();
}`,
    typescript: `function bellmanFord(grid: number[][], start: number[], end: number[]): number[][] {
  const rows = grid.length, cols = grid[0].length;
  const dist: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent: Record<string, number[]> = {};
  dist[start[0]][start[1]] = 0;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  const edges: [number[], number[]][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        for (const [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
            edges.push([[r, c], [nr, nc]]);
          }
        }
      }
    }
  }
  for (let i = 0; i < rows * cols - 1; i++) {
    for (const [u, v] of edges) {
      if (dist[u[0]][u[1]] + 1 < dist[v[0]][v[1]]) {
        dist[v[0]][v[1]] = dist[u[0]][u[1]] + 1;
        parent[v[0] + ',' + v[1]] = u;
      }
    }
  }
  for (const [u, v] of edges) {
    if (dist[u[0]][u[1]] + 1 < dist[v[0]][v[1]]) return [];
  }
  if (dist[end[0]][end[1]] === Infinity) return [];
  return reconstructPath(parent, end);
}

function reconstructPath(parent: Record<string, number[]>, end: number[]): number[][] {
  const path: number[][] = [];
  let key = end[0] + ',' + end[1];
  while (parent[key]) { path.push(parent[key]); key = parent[key][0] + ',' + parent[key][1]; }
  return path.reverse();
}`,
    java: `public static List<int[]> bellmanFord(int[][] grid, int[] start, int[] end) {
    int rows = grid.length, cols = grid[0].length;
    double[][] dist = new double[rows][cols];
    for (double[] row : dist) Arrays.fill(row, Double.MAX_VALUE);
    Map<String, int[]> parent = new HashMap<>();
    dist[start[0]][start[1]] = 0;
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    List<int[][]> edges = new ArrayList<>();
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) {
                for (int[] d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1)
                        edges.add(new int[][]{{r, c}, {nr, nc}});
                }
            }
        }
    }
    for (int i = 0; i < rows * cols - 1; i++) {
        for (int[][] e : edges) {
            int[] u = e[0], v = e[1];
            if (dist[u[0]][u[1]] + 1 < dist[v[0]][v[1]]) {
                dist[v[0]][v[1]] = dist[u[0]][u[1]] + 1;
                parent.put(v[0] + "," + v[1], u);
            }
        }
    }
    for (int[][] e : edges) {
        int[] u = e[0], v = e[1];
        if (dist[u[0]][u[1]] + 1 < dist[v[0]][v[1]]) return new ArrayList<>();
    }
    if (dist[end[0]][end[1]] == Double.MAX_VALUE) return new ArrayList<>();
    return reconstructPath(parent, end);
}

public static List<int[]> reconstructPath(Map<String, int[]> parent, int[] end) {
    List<int[]> path = new ArrayList<>();
    String key = end[0] + "," + end[1];
    while (parent.containsKey(key)) { path.add(parent.get(key)); key = parent.get(key)[0] + "," + parent.get(key)[1]; }
    Collections.reverse(path);
    return path;
}`,
    cpp: `vector<Point> bellmanFord(const Grid& grid, Point start, Point end) {
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<int>> dist(rows, vector<int>(cols, INT_MAX));
    map<Point, Point> parent;
    dist[start.first][start.second] = 0;
    vector<Point> dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    vector<pair<Point, Point>> edges;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) {
                for (auto [dr, dc] : dirs) {
                    int nr = r+dr, nc = c+dc;
                    if (nr>=0 && nr<rows && nc>=0 && nc<cols && grid[nr][nc]==1)
                        edges.push_back({{r,c}, {nr,nc}});
                }
            }
        }
    }
    for (int i = 0; i < rows*cols-1; i++)
        for (auto [u, v] : edges)
            if (dist[u.first][u.second] + 1 < dist[v.first][v.second]) {
                dist[v.first][v.second] = dist[u.first][u.second] + 1;
                parent[v] = u;
            }
    for (auto [u, v] : edges)
        if (dist[u.first][u.second] + 1 < dist[v.first][v.second]) return {};
    if (dist[end.first][end.second] == INT_MAX) return {};
    vector<Point> path;
    for (Point p = end; parent.count(p); p = parent[p]) path.push_back(p);
    reverse(path.begin(), path.end());
    return path;
}`,
    csharp: `public static List<(int, int)> BellmanFord(int[][] grid, (int, int) start, (int, int) end) {
    int rows = grid.Length, cols = grid[0].Length;
    double[,] dist = new double[rows, cols];
    for (int i = 0; i < rows; i++) for (int j = 0; j < cols; j++) dist[i, j] = double.MaxValue;
    Dictionary<(int, int), (int, int)> parent = new();
    dist.Item1 = dist.Item2 = 0;
    int[][] dirs = [new[]{0,1}, new[]{1,0}, new[]{0,-1}, new[]{-1,0}];
    var edges = new List<((int, int), (int, int))>();
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            if (grid[r][c] == 1)
                foreach (var d in dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1)
                        edges.Add(((r, c), (nr, nc)));
                }
    for (int i = 0; i < rows * cols - 1; i++)
        foreach (var (u, v) in edges)
            if (dist.Item1 + 1 < dist.Item1) {
                dist.Item1 = dist.Item1 + 1;
                parent[v] = u;
            }
    foreach (var (u, v) in edges)
        if (dist.Item1 + 1 < dist.Item1) return new();
    if (dist.Item1 == double.MaxValue) return new();
    return ReconstructPath(parent, end);
}

public static List<(int, int)> ReconstructPath(Dictionary<(int, int), (int, int)> parent, (int, int) end) {
    var path = new List<(int, int)>();
    var cur = end;
    while (parent.ContainsKey(cur)) { path.Add(parent[cur]); cur = parent[cur]; }
    path.Reverse();
    return path;
}`,
    go: `func bellmanFord(grid [][]int, start, end point) []point {
    rows, cols := len(grid), len(grid[0])
    dist := make([][]int, rows)
    for i := range dist { dist[i] = make([]int, cols); for j := range dist[i] { dist[i][j] = 1<<30 } }
    parent := make(map[point]point)
    dist[start.r][start.c] = 0
    dirs := []point{{0,1}, {1,0}, {0,-1}, {-1,0}}
    type edge struct{ u, v point }
    var edges []edge
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 1 {
                for _, d := range dirs {
                    nr, nc := r+d.r, c+d.c
                    if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
                        edges = append(edges, edge{point{r, c}, point{nr, nc}})
                    }
                }
            }
        }
    }
    for i := 0; i < rows*cols-1; i++ {
        for _, e := range edges {
            if dist[e.u.r][e.u.c]+1 < dist[e.v.r][e.v.c] {
                dist[e.v.r][e.v.c] = dist[e.u.r][e.u.c] + 1
                parent[e.v] = e.u
            }
        }
    }
    for _, e := range edges {
        if dist[e.u.r][e.u.c]+1 < dist[e.v.r][e.v.c] { return nil }
    }
    if dist[end.r][end.c] == 1<<30 { return nil }
    var path []point
    for p := end; ; { pp, ok := parent[p]; if !ok { break }; path = append(path, p); p = pp }
    for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 { path[i], path[j] = path[j], path[i] }
    return path
}`,
    rust: `fn bellman_ford(grid: &[Vec<i32>], start: (usize, usize), end: (usize, usize)) -> Vec<(usize, usize)> {
    let rows = grid.len(); let cols = grid[0].len();
    let mut dist = vec![vec![i32::MAX; cols]; rows];
    let mut parent: HashMap<(usize, usize), (usize, usize)> = HashMap::new();
    dist[start.0][start.1] = 0;
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)];
    let mut edges = Vec::new();
    for r in 0..rows {
        for c in 0..cols {
            if grid[r][c] == 1 {
                for (dr, dc) in dirs {
                    let nr = r.wrapping_add(dr); let nc = c.wrapping_add(dc);
                    if nr < rows && nc < cols && grid[nr][nc] == 1 {
                        edges.push(((r, c), (nr, nc)));
                    }
                }
            }
        }
    }
    for _ in 0..rows * cols - 1 {
        for &(u, v) in &edges {
            if dist[u.0][u.1] + 1 < dist[v.0][v.1] {
                dist[v.0][v.1] = dist[u.0][u.1] + 1;
                parent.insert(v, u);
            }
        }
    }
    for &(u, v) in &edges {
        if dist[u.0][u.1] + 1 < dist[v.0][v.1] { return vec![]; }
    }
    if dist[end.0][end.1] == i32::MAX { return vec![]; }
    let mut path = Vec::new();
    let mut cur = end;
    while let Some(&p) = parent.get(&cur) { path.push(cur); cur = p; }
    path.reverse(); path
}`,
    kotlin: `fun bellmanFord(grid: Array<IntArray>, start: Pair<Int,Int>, end: Pair<Int,Int>): List<Pair<Int,Int>> {
    val rows = grid.size; val cols = grid[0].size
    val dist = Array(rows) { DoubleArray(cols) { Double.MAX_VALUE } }
    val parent = mutableMapOf<Pair<Int,Int>, Pair<Int,Int>>()
    dist[start.first][start.second] = 0.0
    val dirs = listOf(0 to 1, 1 to 0, 0 to -1, -1 to 0)
    val edges = mutableListOf<Pair<Pair<Int,Int>, Pair<Int,Int>>>()
    for (r in 0 until rows) for (c in 0 until cols) if (grid[r][c] == 1)
        for ((dr, dc) in dirs) { val nr = r+dr; val nc = c+dc
            if (nr in 0 until rows && nc in 0 until cols && grid[nr][nc] == 1) edges.add((r to c) to (nr to nc)) }
    for (i in 0 until rows * cols - 1) for ((u, v) in edges)
        if (dist[u.first][u.second] + 1 < dist[v.first][v.second]) { dist[v.first][v.second] = dist[u.first][u.second] + 1; parent[v] = u }
    for ((u, v) in edges) if (dist[u.first][u.second] + 1 < dist[v.first][v.second]) return emptyList()
    if (dist[end.first][end.second] == Double.MAX_VALUE) return emptyList()
    val path = mutableListOf<Pair<Int,Int>>()
    var cur = end
    while (parent.containsKey(cur)) { path.add(cur); cur = parent[cur]!! }
    return path.reversed()
}`,
    swift: `func bellmanFord(grid: [[Int]], start: (Int, Int), end: (Int, Int)) -> [(Int, Int)] {
    let rows = grid.count, cols = grid[0].count
    var dist = [[Double]](repeating: [Double](repeating: .infinity, count: cols), count: rows)
    var parent = [(Int, Int): (Int, Int)]()
    dist[start.0][start.1] = 0
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    var edges = [((Int, Int), (Int, Int))]()
    for r in 0..<rows { for c in 0..<cols { if grid[r][c] == 1 {
        for (dr, dc) in dirs { let nr = r+dr, nc = c+dc
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 { edges.append(((r,c), (nr,nc))) }
        }
    }}}
    for _ in 0..<rows*cols-1 { for (u, v) in edges {
        if dist.u.0 + 1 < dist.v.0 { dist.v.0 = dist.u.0 + 1; parent[v] = u }
    }}
    for (u, v) in edges { if dist.u.0 + 1 < dist.v.0 { return [] } }
    if dist[end.0][end.1] == .infinity { return [] }
    var path = [(Int, Int)]()
    var cur = end
    while let p = parent[cur] { path.append(cur); cur = p }
    return path.reversed()
}`,
  },
  floyd_warshall: {
    python: `def floyd_warshall(grid):
    rows, cols = len(grid), len(grid[0])
    INF = float('inf')
    dist = [[INF] * (rows * cols) for _ in range(rows * cols)]
    for i in range(rows * cols):
        dist[i][i] = 0
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                idx = r * cols + c
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                        nidx = nr * cols + nc
                        dist[idx][nidx] = 1
    n = rows * cols
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`,
    javascript: `function floydWarshall(grid) {
  const rows = grid.length, cols = grid[0].length;
  const n = rows * cols;
  const INF = Infinity;
  const dist = Array.from({ length: n }, () => Array(n).fill(INF));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        const idx = r * cols + c;
        for (const [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
            dist[idx][nr * cols + nc] = 1;
          }
        }
      }
    }
  }
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j])
          dist[i][j] = dist[i][k] + dist[k][j];
  return dist;
}`,
    typescript: `function floydWarshall(grid: number[][]): number[][] {
  const rows = grid.length, cols = grid[0].length;
  const n = rows * cols;
  const INF = Infinity;
  const dist: number[][] = Array.from({ length: n }, () => Array(n).fill(INF));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        const idx = r * cols + c;
        for (const [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
            dist[idx][nr * cols + nc] = 1;
          }
        }
      }
    }
  }
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j])
          dist[i][j] = dist[i][k] + dist[k][j];
  return dist;
}`,
    java: `public static double[][] floydWarshall(int[][] grid) {
    int rows = grid.length, cols = grid[0].length;
    int n = rows * cols;
    double INF = Double.MAX_VALUE;
    double[][] dist = new double[n][n];
    for (int i = 0; i < n; i++) { Arrays.fill(dist[i], INF); dist[i][i] = 0; }
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) {
                int idx = r * cols + c;
                for (int[] d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1)
                        dist[idx][nr * cols + nc] = 1;
                }
            }
        }
    }
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
    return dist;
}`,
    cpp: `vector<vector<int>> floydWarshall(const Grid& grid) {
    int rows = grid.size(), cols = grid[0].size();
    int n = rows * cols;
    vector<vector<int>> dist(n, vector<int>(n, INT_MAX / 2));
    for (int i = 0; i < n; i++) dist[i][i] = 0;
    vector<Point> dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) {
                int idx = r * cols + c;
                for (auto [dr, dc] : dirs) {
                    int nr = r+dr, nc = c+dc;
                    if (nr>=0 && nr<rows && nc>=0 && nc<cols && grid[nr][nc]==1)
                        dist[idx][nr*cols+nc] = 1;
                }
            }
        }
    }
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
    return dist;
}`,
    csharp: `public static double[,] FloydWarshall(int[][] grid) {
    int rows = grid.Length, cols = grid[0].Length;
    int n = rows * cols;
    double INF = double.MaxValue;
    double[,] dist = new double[n, n];
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) dist[i, j] = i == j ? 0 : INF;
    int[][] dirs = [new[]{0,1}, new[]{1,0}, new[]{0,-1}, new[]{-1,0}];
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) {
                int idx = r * cols + c;
                foreach (var d in dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1)
                        dist[idx, nr * cols + nc] = 1;
                }
            }
        }
    }
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i, k] + dist[k, j] < dist[i, j])
                    dist[i, j] = dist[i, k] + dist[k, j];
    return dist;
}`,
    go: `func floydWarshall(grid [][]int) [][]int {
    rows, cols := len(grid), len(grid[0])
    n := rows * cols
    INF := 1 << 30
    dist := make([][]int, n)
    for i := range dist { dist[i] = make([]int, n); for j := range dist[i] { dist[i][j] = INF }; dist[i][i] = 0 }
    dirs := []point{{0,1}, {1,0}, {0,-1}, {-1,0}}
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 1 {
                idx := r*cols + c
                for _, d := range dirs {
                    nr, nc := r+d.r, c+d.c
                    if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
                        dist[idx][nr*cols+nc] = 1
                    }
                }
            }
        }
    }
    for k := 0; k < n; k++ {
        for i := 0; i < n; i++ {
            for j := 0; j < n; j++ {
                if dist[i][k]+dist[k][j] < dist[i][j] {
                    dist[i][j] = dist[i][k] + dist[k][j]
                }
            }
        }
    }
    return dist
}`,
    rust: `fn floyd_warshall(grid: &[Vec<i32>]) -> Vec<Vec<i32>> {
    let rows = grid.len(); let cols = grid[0].len();
    let n = rows * cols;
    let inf = i32::MAX / 2;
    let mut dist = vec![vec![inf; n]; n];
    for i in 0..n { dist[i][i] = 0; }
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)];
    for r in 0..rows {
        for c in 0..cols {
            if grid[r][c] == 1 {
                let idx = r * cols + c;
                for (dr, dc) in dirs {
                    let nr = r.wrapping_add(dr); let nc = c.wrapping_add(dc);
                    if nr < rows && nc < cols && grid[nr][nc] == 1 {
                        dist[idx][nr * cols + nc] = 1;
                    }
                }
            }
        }
    }
    for k in 0..n { for i in 0..n { for j in 0..n {
        if dist[i][k] + dist[k][j] < dist[i][j] { dist[i][j] = dist[i][k] + dist[k][j]; }
    }}}
    dist
}`,
    kotlin: `fun floydWarshall(grid: Array<IntArray>): Array<DoubleArray> {
    val rows = grid.size; val cols = grid[0].size
    val n = rows * cols
    val INF = Double.MAX_VALUE
    val dist = Array(n) { i -> DoubleArray(n) { j -> if (i == j) 0.0 else INF } }
    val dirs = listOf(0 to 1, 1 to 0, 0 to -1, -1 to 0)
    for (r in 0 until rows) for (c in 0 until cols) if (grid[r][c] == 1) {
        val idx = r * cols + c
        for ((dr, dc) in dirs) { val nr = r+dr; val nc = c+dc
            if (nr in 0 until rows && nc in 0 until cols && grid[nr][nc] == 1) dist[idx][nr*cols+nc] = 1.0 }
    }
    for (k in 0 until n) for (i in 0 until n) for (j in 0 until n)
        if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j]
    return dist
}`,
    swift: `func floydWarshall(grid: [[Int]]) -> [[Double]] {
    let rows = grid.count, cols = grid[0].count
    let n = rows * cols
    let INF = Double.infinity
    var dist = [[Double]](repeating: [Double](repeating: INF, count: n), count: n)
    for i in 0..<n { dist[i][i] = 0 }
    let dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    for r in 0..<rows { for c in 0..<cols { if grid[r][c] == 1 {
        let idx = r * cols + c
        for (dr, dc) in dirs { let nr = r+dr, nc = c+dc
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 { dist[idx][nr*cols+nc] = 1 }
        }
    }}}
    for k in 0..<n { for i in 0..<n { for j in 0..<n {
        if dist[i][k] + dist[k][j] < dist[i][j] { dist[i][j] = dist[i][k] + dist[k][j] }
    }}}
    return dist
}`,
  },
};
