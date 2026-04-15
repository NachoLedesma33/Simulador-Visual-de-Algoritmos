import { create } from 'zustand';
import { produce, enablePatches } from 'immer';
import {
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';
import { getAlgorithmGenerator, generateEmptyGrid } from '@/algorithms';
import type {
  AlgorithmType,
  AlgorithmStep,
  VisualizationState,
  AlgorithmCategory,
} from '@/types';

enablePatches();

const ALGORITHM_CATEGORIES: Record<AlgorithmType, AlgorithmCategory> = {
  bubble: 'sorting',
  quick: 'sorting',
  merge: 'sorting',
  insertion: 'sorting',
  selection: 'sorting',
  heap: 'sorting',
  shell: 'sorting',
  radix: 'sorting',
  counting: 'sorting',
  tim: 'sorting',
  dijkstra: 'pathfinding',
  astar: 'pathfinding',
  bfs: 'pathfinding',
  dfs: 'pathfinding',
  bidirectional_bfs: 'pathfinding',
  greedy_best_first: 'pathfinding',
  bellman_ford: 'pathfinding',
  floyd_warshall: 'pathfinding',
  inorder: 'tree',
  preorder: 'tree',
  postorder: 'tree',
  level_order: 'tree',
  bst_insert: 'tree',
  bst_delete: 'tree',
  avl_rotate: 'tree',
  red_black_insert: 'tree',
  kruskal: 'graph',
  prim: 'graph',
  topological_sort: 'graph',
  tarjan_scc: 'graph',
  kosaraju: 'graph',
  articulation_points: 'graph',
};

function speedToDelay(speed: number): number {
  return Math.max(10, 1000 - (speed - 1) * 10);
}

function getAlgorithmCategory(type: AlgorithmType): AlgorithmCategory {
  return ALGORITHM_CATEGORIES[type];
}

function createEmptyComparisonSteps(): Record<AlgorithmType, AlgorithmStep[]> {
  return {} as Record<AlgorithmType, AlgorithmStep[]>;
}

interface AlgorithmState {
  state: VisualizationState;
  currentStep: number;
  totalSteps: number;
  speed: number;
  delay: number;
  currentAlgorithm: AlgorithmType | null;
  steps: AlgorithmStep[];
  inputData: number[] | null;
  gridData: import('@/types').Cell[][] | null;
  gridSize: { rows: number; cols: number };
  comparisonMode: boolean;
  algorithmsToCompare: AlgorithmType[];
  comparisonSteps: Record<AlgorithmType, AlgorithmStep[]>;
  syncedPlayback: boolean;
  theme: 'light' | 'dark';
  showCode: boolean;
  showComplexity: boolean;
  soundEnabled: boolean;
}

interface AlgorithmActions {
  play: () => void;
  pause: () => void;
  reset: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (index: number) => void;
  setSpeed: (value: number) => void;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  setInputData: (data: number[]) => void;
  setGridData: (grid: import('@/types').Cell[][]) => void;
  setGridSize: (rows: number, cols: number) => void;
  generateSteps: () => void;
  toggleComparisonMode: () => void;
  addToComparison: (algorithm: AlgorithmType) => boolean;
  removeFromComparison: (algorithm: AlgorithmType) => void;
  generateComparisonSteps: () => void;
  toggleSyncedPlayback: () => void;
  toggleTheme: () => void;
  toggleCode: () => void;
  toggleComplexity: () => void;
  toggleSound: () => void;
}

type AlgorithmStore = AlgorithmState & AlgorithmActions;

const initialState: AlgorithmState = {
  state: 'idle',
  currentStep: 0,
  totalSteps: 0,
  speed: 50,
  delay: 500,
  currentAlgorithm: null,
  steps: [],
  inputData: null,
  gridData: null,
  gridSize: { rows: 20, cols: 20 },
  comparisonMode: false,
  algorithmsToCompare: [],
  comparisonSteps: createEmptyComparisonSteps(),
  syncedPlayback: true,
  theme: 'light',
  showCode: true,
  showComplexity: true,
  soundEnabled: false,
};

export const useAlgorithmStore = create<AlgorithmStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        play: () => {
          const { steps } = get();
          if (steps.length === 0) {
            console.warn('[AlgorithmStore] Cannot play: no steps generated');
            return;
          }
          set(
            produce((draft: AlgorithmState) => {
              if (draft.state === 'completed') {
                draft.state = 'running';
                draft.currentStep = 0;
              } else {
                draft.state = 'running';
              }
            })
          );
        },

        pause: () => {
          set(
            produce((draft: AlgorithmState) => {
              draft.state = 'paused';
            })
          );
        },

        reset: () => {
          set(
            produce((draft: AlgorithmState) => {
              draft.state = 'idle';
              draft.currentStep = 0;
            })
          );
        },

        nextStep: () => {
          set(
            produce((draft: AlgorithmState) => {
              if (draft.currentStep < draft.totalSteps - 1) {
                draft.currentStep += 1;
                if (draft.currentStep >= draft.totalSteps - 1) {
                  draft.state = 'completed';
                }
              }
            })
          );
        },

        previousStep: () => {
          set(
            produce((draft: AlgorithmState) => {
              if (draft.currentStep > 0) {
                draft.currentStep -= 1;
                if (draft.state === 'completed') {
                  draft.state = 'paused';
                }
              }
            })
          );
        },

        goToStep: (index: number) => {
          set(
            produce((draft: AlgorithmState) => {
              const boundedIndex = Math.max(0, Math.min(index, draft.totalSteps - 1));
              draft.currentStep = boundedIndex;
              draft.state =
                boundedIndex === draft.totalSteps - 1
                  ? 'completed'
                  : draft.state === 'running'
                  ? 'running'
                  : 'paused';
            })
          );
        },

        setSpeed: (value: number) => {
          const clampedSpeed = Math.max(1, Math.min(100, value));
          const delay = speedToDelay(clampedSpeed);
          set(
            produce((draft: AlgorithmState) => {
              draft.speed = clampedSpeed;
              draft.delay = delay;
            })
          );
        },

        setAlgorithm: (algorithm: AlgorithmType) => {
          set(
            produce((draft: AlgorithmState) => {
              draft.currentAlgorithm = algorithm;
              draft.steps = [];
              draft.currentStep = 0;
              draft.totalSteps = 0;
              draft.state = 'idle';
            })
          );
        },

        setInputData: (data: number[]) => {
          set(
            produce((draft: AlgorithmState) => {
              draft.inputData = data;
            })
          );
        },

        setGridData: (grid: import('@/types').Cell[][]) => {
          set(
            produce((draft: AlgorithmState) => {
              // It gets deeply drafted by immer, so we can just assign
              draft.gridData = grid as any;
            })
          );
        },

        setGridSize: (rows: number, cols: number) => {
          set(
            produce((draft: AlgorithmState) => {
              draft.gridSize = { rows, cols };
            })
          );
        },

        generateSteps: () => {
          const { currentAlgorithm, inputData, gridSize } = get();
          if (!currentAlgorithm) {
            console.warn('[AlgorithmStore] Cannot generate steps: no algorithm selected');
            return;
          }
          const category = getAlgorithmCategory(currentAlgorithm);
          console.log(`[AlgorithmStore] Generating steps for ${currentAlgorithm} (${category})`);

          try {
            let generatorInput: Parameters<typeof getAlgorithmGenerator>[1];

            if (category === 'sorting') {
              const arr = inputData && inputData.length > 0
                ? inputData
                : Array.from({ length: 20 }, () => Math.floor(Math.random() * 95) + 5);
              generatorInput = { array: arr };
            } else if (category === 'pathfinding') {
              const grid = get().gridData || generateEmptyGrid(gridSize.rows, gridSize.cols);
              const start = { row: 0, col: 0 };
              const end = { row: gridSize.rows - 1, col: gridSize.cols - 1 };
              generatorInput = { grid, start, end };
            } else {
              console.warn(`[AlgorithmStore] Category '${category}' not yet supported`);
              return;
            }

            const generator = getAlgorithmGenerator(currentAlgorithm, generatorInput);
            const steps: import('@/types').AlgorithmStep[] = [];
            for (const step of generator) {
              steps.push(step);
            }

            set(
              produce((draft: AlgorithmState) => {
                draft.steps = steps;
                draft.totalSteps = steps.length;
                draft.currentStep = 0;
                draft.state = 'idle';
              })
            );
            console.log(`[AlgorithmStore] Generated ${steps.length} steps`);
          } catch (err) {
            console.error('[AlgorithmStore] Error generating steps:', err);
          }
        },

        toggleComparisonMode: () => {
          set(
            produce((draft: AlgorithmState) => {
              draft.comparisonMode = !draft.comparisonMode;
              if (!draft.comparisonMode) {
                draft.algorithmsToCompare = [];
                draft.comparisonSteps = createEmptyComparisonSteps();
              }
            })
          );
        },

        addToComparison: (algorithm: AlgorithmType): boolean => {
          const { algorithmsToCompare } = get();
          if (algorithmsToCompare.length >= 2) {
            console.warn('[AlgorithmStore] Cannot add: maximum 2 algorithms in comparison');
            return false;
          }
          if (algorithmsToCompare.includes(algorithm)) {
            console.warn('[AlgorithmStore] Cannot add: algorithm already in comparison');
            return false;
          }
          set(
            produce((draft: AlgorithmState) => {
              draft.algorithmsToCompare = [...draft.algorithmsToCompare, algorithm];
            })
          );
          return true;
        },

        removeFromComparison: (algorithm: AlgorithmType) => {
          set(
            produce((draft: AlgorithmState) => {
              draft.algorithmsToCompare = draft.algorithmsToCompare.filter(
                (a) => a !== algorithm
              );
              const newSteps = { ...draft.comparisonSteps };
              delete newSteps[algorithm];
              draft.comparisonSteps = newSteps as Record<AlgorithmType, AlgorithmStep[]>;
            })
          );
        },

        generateComparisonSteps: () => {
          const { algorithmsToCompare } = get();
          console.log(
            `[AlgorithmStore] Generating comparison steps for: ${algorithmsToCompare.join(', ')}`
          );
          set(
            produce((draft: AlgorithmState) => {
              draft.comparisonSteps = createEmptyComparisonSteps();
            })
          );
        },

        toggleSyncedPlayback: () => {
          set(
            produce((draft: AlgorithmState) => {
              draft.syncedPlayback = !draft.syncedPlayback;
            })
          );
        },

        toggleTheme: () => {
          set(
            produce((draft: AlgorithmState) => {
              draft.theme = draft.theme === 'light' ? 'dark' : 'light';
            })
          );
        },

        toggleCode: () => {
          set(
            produce((draft: AlgorithmState) => {
              draft.showCode = !draft.showCode;
            })
          );
        },

        toggleComplexity: () => {
          set(
            produce((draft: AlgorithmState) => {
              draft.showComplexity = !draft.showComplexity;
            })
          );
        },

        toggleSound: () => {
          set(
            produce((draft: AlgorithmState) => {
              draft.soundEnabled = !draft.soundEnabled;
            })
          );
        },
      }),
      {
        name: 'algorithm-config',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          theme: state.theme,
          showCode: state.showCode,
          showComplexity: state.showComplexity,
          soundEnabled: state.soundEnabled,
        }),
      }
    ),
    { name: 'AlgorithmStore' }
  )
);

function selectCurrentStep(state: AlgorithmStore): AlgorithmStep | null {
  return state.steps[state.currentStep] ?? null;
}

function selectIsPlaying(state: AlgorithmStore): boolean {
  return state.state === 'running';
}

function selectComparisonMode(state: AlgorithmStore): boolean {
  return state.comparisonMode;
}

export { selectCurrentStep, selectIsPlaying, selectComparisonMode };
export type { AlgorithmStore };