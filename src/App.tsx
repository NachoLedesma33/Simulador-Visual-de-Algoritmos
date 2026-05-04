import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAlgorithmStore } from '@/store';
import { getAlgorithmInfo, generateRandomArray, generateNearlySortedArray, generateReversedArray, generateEmptyGrid, generateMaze } from '@/algorithms';
import { SortingCanvas, PathfindingCanvas } from '@/components/visualizers';
import { ControlPanel, TheoryModal } from '@/components/ui';
import type { SortingStep, PathfindingStep, AlgorithmCategory } from '@/types';
import './App.css';

function App() {
  const state = useAlgorithmStore();

  const category = useMemo((): AlgorithmCategory | null => {
    if (!state.currentAlgorithm) return null;
    const sortingAlgos = ['bubble', 'quick', 'merge', 'insertion', 'selection', 'heap', 'shell', 'radix', 'counting', 'tim'];
    if (sortingAlgos.includes(state.currentAlgorithm as string)) return 'sorting';
    return 'pathfinding';
  }, [state.currentAlgorithm]);

  const algorithmInfo = state.currentAlgorithm ? getAlgorithmInfo(state.currentAlgorithm) : null;

  const [showSidebar] = useState(true);
  const [showTheory, setShowTheory] = useState(false);

  const selectedAlgorithm = state.currentAlgorithm;

  const handleDataGenerate = useCallback((type: 'random' | 'nearly' | 'reversed') => {
    const size = 20;
    let data: number[];
    switch (type) {
      case 'random':
        data = generateRandomArray(size);
        break;
      case 'nearly':
        data = generateNearlySortedArray(size);
        break;
      case 'reversed':
        data = generateReversedArray(size);
        break;
      default:
        data = generateRandomArray(size);
    }
    state.setInputData(data);
  }, []);

  const handleGridGenerate = useCallback((type: 'clear' | 'random') => {
    const rows = 20;
    const cols = 20;
    let grid = generateEmptyGrid(rows, cols);
    if (type === 'random') {
      grid = generateMaze(grid, 'random') as any;
    }
    state.setGridData(grid);
  }, [state]);

  useEffect(() => {
    if (category === 'sorting' && (!state.inputData || state.inputData.length === 0)) {
      const data = generateRandomArray(20);
      state.setInputData(data);
    } else if (category === 'pathfinding' && !state.gridData) {
      state.setGridData(generateEmptyGrid(20, 20));
    }
  }, [category, state.inputData, state.gridData]);

  // Re-generate steps whenever the algorithm, input data, or grid data changes
  useEffect(() => {
    if (state.currentAlgorithm) {
      state.generateSteps();
    }
  }, [state.currentAlgorithm, state.inputData, state.gridData]);

  // Synchronize CSS theme with Zustand store state
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);


  const canvasWidth = 1000;
  const canvasHeight = 600;
  const cellSize = 35;

  const currentStep = useMemo(() => {
    if (category === 'sorting' && state.steps.length > 0 && state.currentStep < state.steps.length) {
      return state.steps[state.currentStep] as SortingStep | undefined;
    }
    if (category === 'pathfinding' && state.steps.length > 0 && state.currentStep < state.steps.length) {
      return state.steps[state.currentStep] as PathfindingStep | undefined;
    }
    return null;
  }, [state.steps, state.currentStep, category]);

  const inputArray = state.inputData || [];
  const emptyGrid = useMemo(() => state.gridData || generateEmptyGrid(state.gridSize.rows, state.gridSize.cols), [state.gridData, state.gridSize]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-title">Visualizador de Algoritmos</h1>
        </div>
        <div className="header-right">
          {selectedAlgorithm && (
            <button
              className="info-toggle"
              onClick={() => setShowTheory(true)}
              title="Información teórica"
            >
              ℹ️
            </button>
          )}
          <button
            className="theme-toggle"
            onClick={() => state.toggleTheme?.()}
            title="Cambiar tema"
          >
            {state.theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <aside className={`app-sidebar ${showSidebar ? 'open' : 'closed'}`}>
          <ControlPanel
            onDataGenerate={handleDataGenerate}
            onGridGenerate={handleGridGenerate}
          />

          {category === 'sorting' && (
            <div className="sidebar-panel">
              <h3 className="panel-title">Estadísticas</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Comparaciones</span>
                  <span className="stat-value">{state.currentStep}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Pasos Totales</span>
                  <span className="stat-value">{state.totalSteps}</span>
                </div>
              </div>
            </div>
          )}

          {category === 'pathfinding' && (
            <div className="sidebar-panel">
              <h3 className="panel-title">Grid</h3>
              <div className="grid-controls">
                <button
                  className="btn btn-sm"
                  onClick={() => handleGridGenerate('clear')}
                >
                  Limpiar
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => handleGridGenerate('random')}
                >
                  Muros Aleatorios
                </button>
              </div>
            </div>
          )}
        </aside>

        <section className="canvas-area">
          <div className="canvas-container">
            {category === 'sorting' && inputArray.length > 0 && (
              <SortingCanvas
                data={inputArray}
                step={currentStep as SortingStep || { array: [], comparing: null, swapping: null, sorted: [] }}
                width={canvasWidth}
                height={canvasHeight}
              />
            )}

            {category === 'pathfinding' && (
              <PathfindingCanvas
                grid={emptyGrid}
                step={
                  currentStep as PathfindingStep || {
                    grid: emptyGrid,
                    current: null,
                    frontier: [],
                    path: [],
                    visitedCount: 0,
                  }
                }
                cellSize={cellSize}
              />
            )}

            {!category && (
              <div className="empty-state">
                <p>Selecciona un algoritmo para comenzar</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-breadcrumb">
          {category ? (
            <>
              <span className="category-label">{category}</span>
              <span className="separator">/</span>
            </>
          ) : null}
          <span className="algorithm-name">
            {algorithmInfo?.name || 'Selecciona un algoritmo'}
          </span>
          {algorithmInfo && (
            <span className="complexity-badge">
              {algorithmInfo.complexity.time}
            </span>
          )}
        </div>
        <div className="footer-copyright">
          <span>&copy; {new Date().getFullYear()} Nacho Ledesma | App de Simulador de Algoritmos. Todos los derechos reservados.</span>
        </div>
      </footer>

      {showTheory && (
        <TheoryModal
          algorithmType={state.currentAlgorithm}
          onClose={() => setShowTheory(false)}
        />
      )}

      <style>{`
        .app-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: var(--bg);
          color: var(--text);
        }

        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 24px;
          border-bottom: 1px solid var(--border);
          background: var(--bg-panel);
          z-index: 10;
        }

        .app-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: var(--text-h);
          font-family: var(--heading);
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .app-title::before {
          content: '';
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-right {
          display: flex;
          gap: 10px;
        }

        .theme-toggle,
        .info-toggle {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-panel);
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .theme-toggle:hover {
          background: var(--code-bg);
        }

        .info-toggle:hover {
          background: var(--primary-surface);
          border-color: var(--primary);
        }

        .app-main {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .app-sidebar {
          width: 340px;
          min-width: 340px;
          border-right: 1px solid var(--border);
          padding: 20px;
          overflow-y: auto;
          background: var(--bg);
          z-index: 5;
        }

        .app-sidebar.closed {
          width: 0;
          min-width: 0;
          padding: 0;
          overflow: hidden;
        }

        .sidebar-panel {
          margin-top: 20px;
          padding: 14px;
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 10px;
        }

        .panel-title {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 12px;
          color: var(--text);
        }

        .stats-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .stat-label {
          color: var(--text);
        }

        .stat-value {
          font-family: var(--mono);
          color: var(--text-h);
        }

        .grid-controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .canvas-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(135deg, var(--bg) 0%, var(--code-bg) 100%);
          overflow: hidden;
          position: relative;
        }

        .canvas-area::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 30%, var(--primary-surface) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, var(--accent-surface) 0%, transparent 50%);
          opacity: 0.5;
          pointer-events: none;
        }

        .canvas-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          max-width: 1600px;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          box-sizing: border-box;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          position: relative;
          z-index: 1;
        }
        
        .canvas-container canvas {
          max-width: 100% !important;
          max-height: 100% !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain;
          margin: auto;
          display: block;
          border-radius: 12px;
        }

        .empty-state {
          text-align: center;
          color: var(--text);
          font-size: 14px;
          padding: 40px;
          background: var(--bg-panel);
          border: 2px dashed var(--border);
          border-radius: 16px;
        }

        .app-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 28px;
          border-top: 1px solid var(--border);
          background: var(--bg-panel);
          font-size: 12px;
        }

        .footer-breadcrumb {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .category-label {
          color: var(--text);
          text-transform: uppercase;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          background: var(--code-bg);
          padding: 4px 8px;
          border-radius: 4px;
        }

        .separator {
          color: var(--border);
        }

        .algorithm-name {
          color: var(--text-h);
          font-weight: 600;
        }

        .footer-copyright {
          font-size: 11px;
          color: var(--text);
          letter-spacing: 0.3px;
          opacity: 0.7;
        }

        .complexity-badge {
          margin-left: 12px;
          padding: 4px 10px;
          background: var(--primary-surface);
          border: 1px solid var(--primary);
          border-radius: 6px;
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 600;
          color: var(--primary);
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 13px;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          color: var(--text);
        }

        .btn-sm:hover {
          background: var(--code-bg);
        }
      `}</style>
    </div>
  );
}

export default App;