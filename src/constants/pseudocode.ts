export interface PseudocodeLine {
  id: number;
  code: string;
  comment?: string;
}

export interface PseudocodeBlock {
  name: string;
  lines: PseudocodeLine[];
}

const BUBBLE_SORT: PseudocodeBlock = {
  name: 'Bubble Sort',
  lines: [
    { id: 1, code: 'procedure bubbleSort(array):', comment: 'Inicializar algoritmo' },
    { id: 2, code: '  n = length(array)', comment: 'Obtener tamaño del array' },
    { id: 3, code: '  for i from 0 to n-1:', comment: 'Iterar sobre cada elemento' },
    { id: 4, code: '    swapped = false', comment: 'Reiniciar flag de intercambio' },
    { id: 5, code: '    for j from 0 to n-i-1:', comment: 'Comparar elementos no ordenados' },
    { id: 6, code: '      if array[j] > array[j+1]:', comment: 'Comparar elementos adyacentes' },
    { id: 7, code: '        swap(array[j], array[j+1])', comment: 'Intercambiar si están desordenados' },
    { id: 8, code: '        swapped = true', comment: 'Marcar que hubo intercambio' },
    { id: 9, code: '    if not swapped: break', comment: 'Terminar si ya está ordenado' },
  ],
};

const INSERTION_SORT: PseudocodeBlock = {
  name: 'Insertion Sort',
  lines: [
    { id: 1, code: 'procedure insertionSort(array):', comment: 'Inicializar algoritmo' },
    { id: 2, code: '  for i from 1 to length(array)-1:', comment: 'Desde segundo elemento' },
    { id: 3, code: '    key = array[i]', comment: 'Guardar elemento actual' },
    { id: 4, code: '    j = i - 1', comment: 'Posición izquierda' },
    { id: 5, code: '    while j >= 0 and array[j] > key:', comment: 'Buscar posición correcta' },
    { id: 6, code: '      array[j+1] = array[j]', comment: 'Desplazar a la derecha' },
    { id: 7, code: '      j = j - 1', comment: 'Continuar búsqueda' },
    { id: 8, code: '    array[j+1] = key', comment: 'Insertar en posición' },
  ],
};

const SELECTION_SORT: PseudocodeBlock = {
  name: 'Selection Sort',
  lines: [
    { id: 1, code: 'procedure selectionSort(array):', comment: 'Inicializar algoritmo' },
    { id: 2, code: '  for i from 0 to length(array)-1:', comment: 'Por cada posición' },
    { id: 3, code: '    minIdx = i', comment: 'Asumir mínimo' },
    { id: 4, code: '    for j from i+1 to length(array):', comment: 'Buscar mínimo' },
    { id: 5, code: '      if array[j] < array[minIdx]:', comment: 'Nuevo mínimo encontrado' },
    { id: 6, code: '        minIdx = j', comment: 'Actualizar índice' },
    { id: 7, code: '    swap(array[i], array[minIdx])', comment: 'Intercambiar con posición actual' },
  ],
};

const QUICK_SORT: PseudocodeBlock = {
  name: 'Quick Sort',
  lines: [
    { id: 1, code: 'procedure quickSort(array, low, high):', comment: 'Inicializar' },
    { id: 2, code: '  if low < high:', comment: 'Condición de parada' },
    { id: 3, code: '    pivot = partition(array, low, high)', comment: 'Particionar array' },
    { id: 4, code: '    quickSort(array, low, pivot-1)', comment: 'Ordenar izquierda' },
    { id: 5, code: '    quickSort(array, pivot+1, high)', comment: 'Ordenar derecha' },
    { id: 6, code: '', comment: '' },
    { id: 7, code: 'procedure partition(array, low, high):', comment: 'Partición' },
    { id: 8, code: '  pivot = array[high]', comment: 'Elegir pivote' },
    { id: 9, code: '  i = low - 1', comment: 'Índice menor' },
    { id: 10, code: '  for j from low to high-1:', comment: 'Por cada elemento' },
    { id: 11, code: '    if array[j] <= pivot:', comment: 'Menor o igual a pivote' },
    { id: 12, code: '      i = i + 1', comment: 'Mover índice' },
    { id: 13, code: '      swap(array[i], array[j])', comment: 'Intercambiar' },
    { id: 14, code: '  swap(array[i+1], array[high])', comment: 'Colocar pivote' },
    { id: 15, code: '  return i + 1', comment: 'Retornar posición' },
  ],
};

const MERGE_SORT: PseudocodeBlock = {
  name: 'Merge Sort',
  lines: [
    { id: 1, code: 'procedure mergeSort(array, left, right):', comment: 'Inicializar' },
    { id: 2, code: '  if left < right:', comment: 'Condición de parada' },
    { id: 3, code: '    mid = (left + right) / 2', comment: 'Calcular punto medio' },
    { id: 4, code: '    mergeSort(array, left, mid)', comment: 'Ordenar primera mitad' },
    { id: 5, code: '    mergeSort(array, mid+1, right)', comment: 'Ordenar segunda mitad' },
    { id: 6, code: '    merge(array, left, mid, right)', comment: 'Mezclar halves' },
    { id: 7, code: '', comment: '' },
    { id: 8, code: 'procedure merge(array, left, mid, right):', comment: 'Mezclar' },
    { id: 9, code: '  create temp arrays', comment: 'Crear auxiliares' },
    { id: 10, code: '  copy data to temp', comment: 'Copiar elementos' },
    { id: 11, code: '  i = j = k = left', comment: 'Inicializar índices' },
    { id: 12, code: '  while left <= mid and mid <= right:', comment: 'Mezclar elementos' },
    { id: 13, code: '    if left[mid] <= right[mid]:', comment: 'Comparar elementos' },
    { id: 14, code: '      array[k] = left[i++]: ', comment: 'Tomar de izquierda' },
    { id: 15, code: '    else: array[k] = right[j++]', comment: 'Tomar de derecha' },
    { id: 16, code: '  copy remaining elements', comment: 'Copiar resto' },
  ],
};

const HEAP_SORT: PseudocodeBlock = {
  name: 'Heap Sort',
  lines: [
    { id: 1, code: 'procedure heapSort(array):', comment: 'Inicializar' },
    { id: 2, code: '  n = length(array)', comment: 'Tamaño del heap' },
    { id: 3, code: '  for i from n/2-1 downto 0:', comment: 'Construir heap' },
    { id: 4, code: '    heapify(array, n, i)', comment: 'Organizar heap' },
    { id: 5, code: '  for i from n-1 downto 0:', comment: 'Extraer elementos' },
    { id: 6, code: '    swap(array[0], array[i])', comment: 'Mover raíz al final' },
    { id: 7, code: '    heapify(array, i, 0)', comment: 'Reorganizar heap' },
    { id: 8, code: '', comment: '' },
    { id: 9, code: 'procedure heapify(array, n, i):', comment: 'Heapify' },
    { id: 10, code: '  largest = i', comment: 'Asumir raíz maxima' },
    { id: 11, code: '  left = 2*i + 1', comment: 'Hijo izquierdo' },
    { id: 12, code: '  right = 2*i + 2', comment: 'Hijo derecho' },
    { id: 13, code: '  if left < n and array[left] > array[largest]:', comment: 'Izquierdo mayor' },
    { id: 14, code: '    largest = left', comment: 'Actualizar mayor' },
    { id: 15, code: '  if right < n and array[right] > array[largest]:', comment: 'Derecho mayor' },
    { id: 16, code: '    largest = right', comment: 'Actualizar mayor' },
    { id: 17, code: '  if largest != i:', comment: 'Necesita intercambio' },
    { id: 18, code: '    swap(array[i], array[largest])', comment: 'Intercambiar' },
    { id: 19, code: '    heapify(array, n, largest)', comment: 'Continuar heapify' },
  ],
};

const BFS: PseudocodeBlock = {
  name: 'Breadth-First Search',
  lines: [
    { id: 1, code: 'procedure bfs(grid, start, end):', comment: 'Inicializar BFS' },
    { id: 2, code: '  queue = [start]', comment: 'Cola con inicio' },
    { id: 3, code: '  visited = {start}', comment: 'Marcar visitados' },
    { id: 4, code: '  parent = {}', comment: 'Trackear camino' },
    { id: 5, code: '  while queue:', comment: 'Mientras hay nodos' },
    { id: 6, code: '    current = queue.pop(0)', comment: 'Sacar de cola' },
    { id: 7, code: '    if current == end:', comment: 'Encontramos objetivo' },
    { id: 8, code: '      return reconstructPath(parent, end)', comment: 'Reconstruir camino' },
    { id: 9, code: '    for neighbor in getNeighbors(current):', comment: 'Explorar vecinos' },
    { id: 10, code: '      if neighbor not in visited:', comment: 'Novisitado' },
    { id: 11, code: '        visited.add(neighbor)', comment: 'Marcar visitados' },
    { id: 12, code: '        parent[neighbor] = current', comment: 'Guardar padre' },
    { id: 13, code: '        queue.append(neighbor)', comment: 'Encolar vecino' },
    { id: 14, code: '  return []', comment: 'Sin camino' },
  ],
};

const DFS: PseudocodeBlock = {
  name: 'Depth-First Search',
  lines: [
    { id: 1, code: 'procedure dfs(grid, start, end):', comment: 'Inicializar DFS' },
    { id: 2, code: '  stack = [start]', comment: 'Pila con inicio' },
    { id: 3, code: '  visited = {start}', comment: 'Marcar visitados' },
    { id: 4, code: '  parent = {}', comment: 'Trackear camino' },
    { id: 5, code: '  while stack:', comment: 'Mientras hay nodos' },
    { id: 6, code: '    current = stack.pop()', comment: 'Sacar de pila' },
    { id: 7, code: '    if current == end:', comment: 'Encontramos objetivo' },
    { id: 8, code: '      return reconstructPath(parent, end)', comment: 'Reconstruir camino' },
    { id: 9, code: '    for neighbor in getNeighbors(current):', comment: 'Explorar vecinos' },
    { id: 10, code: '      if neighbor not in visited:', comment: 'No visitados' },
    { id: 11, code: '        visited.add(neighbor)', comment: 'Marcar visitados' },
    { id: 12, code: '        parent[neighbor] = current', comment: 'Guardar padre' },
    { id: 13, code: '        stack.append(neighbor)', comment: 'Apilar vecinos' },
    { id: 14, code: '  return []', comment: 'Sin camino' },
  ],
};

const DIJKSTRA: PseudocodeBlock = {
  name: "Dijkstra's Algorithm",
  lines: [
    { id: 1, code: 'procedure dijkstra(grid, start, end):', comment: 'Inicializar' },
    { id: 2, code: '  distances = {start: 0}', comment: 'Distancia inicio = 0' },
    { id: 3, code: '  pq = PriorityQueue()', comment: 'Cola de prioridad' },
    { id: 4, code: '  pq.insert(start, 0)', comment: 'Insertar inicio' },
    { id: 5, code: '  parent = {}', comment: 'Trackear camino' },
    { id: 6, code: '  while pq:', comment: 'Procesar nodos' },
    { id: 7, code: '    (dist, current) = pq.pop()', comment: 'Sacar menor distancia' },
    { id: 8, code: '    if current == end:', comment: 'Encontramos objetivo' },
    { id: 9, code: '      return reconstructPath(parent, end)', comment: 'Reconstruir camino' },
    { id: 10, code: '    for neighbor in getNeighbors(current):', comment: 'Explorar vecinos' },
    { id: 11, code: '      newDist = dist + weight(neighbor)', comment: 'Calcular distancia' },
    { id: 12, code: '      if newDist < distances[neighbor]:', comment: 'Nueva ruta mejor' },
    { id: 13, code: '        distances[neighbor] = newDist', comment: 'Actualizar distancia' },
    { id: 14, code: '        parent[neighbor] = current', comment: 'Guardar padre' },
    { id: 15, code: '        pq.insert(neighbor, newDist)', comment: 'Encolar con distancia' },
  ],
};

const ASTAR: PseudocodeBlock = {
  name: 'A* Search',
  lines: [
    { id: 1, code: 'procedure astar(grid, start, end):', comment: 'Inicializar A*' },
    { id: 2, code: '  gScore = {start: 0}', comment: 'Coste desde inicio' },
    { id: 3, code: '  fScore = {start: h(start, end)}', comment: 'g + heurística' },
    { id: 4, code: '  openSet = PriorityQueue()', comment: 'Frontera' },
    { id: 5, code: '  openSet.insert(start, fScore[start])', comment: 'Insertar inicio' },
    { id: 6, code: '  parent = {}', comment: 'Trackear camino' },
    { id: 7, code: '  while openSet:', comment: 'Procesar nodos' },
    { id: 8, code: '  current = openSet.pop()', comment: 'Sacar menor f' },
    { id: 9, code: '  if current == end:', comment: 'Objetivo encontrado' },
    { id: 10, code: '    return reconstructPath(parent, end)', comment: 'Reconstruir camino' },
    { id: 11, code: '  for neighbor in getNeighbors(current):', comment: 'Explorar vecinos' },
    { id: 12, code: '    tentative = gScore[current] + weight(current, neighbor)', comment: 'Nuevo coste' },
    { id: 13, code: '    if tentative < gScore.get(neighbor, ∞):', comment: 'Mejor ruta' },
    { id: 14, code: '      parent[neighbor] = current', comment: 'Guardar padre' },
    { id: 15, code: '      gScore[neighbor] = tentative', comment: 'Actualizar g' },
    { id: 16, code: '      fScore[neighbor] = tentative + h(neighbor, end)', comment: 'Actualizar f' },
    { id: 17, code: '      openSet.insert(neighbor, fScore[neighbor])', comment: 'Encolar' },
    { id: 18, code: '  return []', comment: 'Sin camino' },
    { id: 19, code: '', comment: '' },
    { id: 20, code: 'function h(a, b):', comment: 'Heurística Manhattan' },
    { id: 21, code: '  return |a.row - b.row| + |a.col - b.col|', comment: 'Distancia Manhattan' },
  ],
};

export const PSEUDOCODE_MAP: Record<string, PseudocodeBlock> = {
  bubble: BUBBLE_SORT,
  insertion: INSERTION_SORT,
  selection: SELECTION_SORT,
  quick: QUICK_SORT,
  merge: MERGE_SORT,
  heap: HEAP_SORT,
  bfs: BFS,
  dfs: DFS,
  dijkstra: DIJKSTRA,
  astar: ASTAR,
};

export function getPseudocode(algorithmId: string): PseudocodeBlock | null {
  return PSEUDOCODE_MAP[algorithmId] || null;
}