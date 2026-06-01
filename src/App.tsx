import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAlgorithmStore, useUIStore } from '@/store';
import { getAlgorithmInfo, generateRandomArray, generateNearlySortedArray, generateReversedArray, generateEmptyGrid, generateMaze } from '@/algorithms';
import { SortingCanvas, PathfindingCanvas } from '@/components/visualizers';
import { ControlPanel, CodePanel, StatsPanel, TutorialModal, TheoryModal } from '@/components/ui';
import { useKeyboardShortcuts } from '@/hooks';
import type { SortingStep, PathfindingStep, AlgorithmCategory } from '@/types';
import './App.css';

function App() {
  const state = useAlgorithmStore();
  const ui = useUIStore();
  const toasts = useUIStore((state) => state.toasts);

  const category = useMemo((): AlgorithmCategory | null => {
    if (!state.currentAlgorithm) return null;
    const sortingAlgos = ['bubble', 'quick', 'merge', 'insertion', 'selection', 'heap', 'shell', 'radix', 'counting', 'tim'];
    if (sortingAlgos.includes(state.currentAlgorithm as string)) return 'sorting';
    return 'pathfinding';
  }, [state.currentAlgorithm]);

  const algorithmInfo = state.currentAlgorithm ? getAlgorithmInfo(state.currentAlgorithm) : null;

  const [showTheory, setShowTheory] = useState(false);
  const [showCode, setShowCode] = useState(true);
  const [showStatsPanel, setShowStatsPanel] = useState(true);

  const selectedAlgorithm = state.currentAlgorithm;

  const keyboardActions = useMemo(() => ({
    onPlay: () => state.play(),
    onPause: () => state.pause(),
    onNextStep: () => state.nextStep(),
    onPreviousStep: () => state.previousStep(),
    onReset: () => state.reset(),
    onSetSpeed: (speed: number) => state.setSpeed(speed),
    onToggleComparison: () => state.toggleComparisonMode?.(),
    onToggleTheme: () => state.toggleTheme?.(),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  const { showHelp, setShowHelp, lastAction, shortcutsList } = useKeyboardShortcuts(keyboardActions);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGridGenerate = useCallback((type: 'clear' | 'random') => {
    const rows = 20;
    const cols = 20;
    let grid = generateEmptyGrid(rows, cols);
    if (type === 'random') {
      grid = generateMaze(grid, 'random') as any;
    }
    state.setGridData(grid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (category === 'sorting' && (!state.inputData || state.inputData.length === 0)) {
      const data = generateRandomArray(20);
      state.setInputData(data);
    } else if (category === 'pathfinding' && !state.gridData) {
      state.setGridData(generateEmptyGrid(20, 20));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, state.inputData, state.gridData]);

  useEffect(() => {
    if (state.currentAlgorithm) {
      state.generateSteps();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentAlgorithm, state.inputData, state.gridData]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    if (ui.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [ui.darkMode]);

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
          <button
            className="icon-btn"
            onClick={() => setShowHelp(!showHelp)}
            title="Atajos (H)"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 7c0-1 1-2 2-2s2 1 2 2c0 1.5-2 2-2 3.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="14" r="0.5" fill="currentColor"/>
            </svg>
          </button>
          {selectedAlgorithm && (
            <button
              className="icon-btn"
              onClick={() => setShowTheory(true)}
              title="Información teórica"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 12V8M9 6h0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
          <button
            className="icon-btn"
            onClick={() => state.toggleTheme?.()}
            title="Cambiar tema"
          >
            {state.theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.3 3.3l1.4 1.4M13.3 13.3l1.4 1.4M3.3 14.7l1.4-1.4M13.3 4.7l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M14.5 11.5A8 8 0 016.5 3.5a7 7 0 108 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="app-main">
        <aside className={`app-sidebar ${ui.showSidebar ? 'open' : 'closed'}`}>
          <ControlPanel
            onDataGenerate={handleDataGenerate}
            onGridGenerate={handleGridGenerate}
          />

          {selectedAlgorithm && (
            <div className="sidebar-section">
              <button
                className="section-toggle"
                onClick={() => setShowCode(!showCode)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 4L1 7L4 10M10 4L13 7L10 10M9 2L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Pseudocódigo</span>
                <svg className={`toggle-chevron ${showCode ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {showCode && (
                <CodePanel
                  algorithmId={selectedAlgorithm}
                />
              )}
            </div>
          )}

          {selectedAlgorithm && (
            <div className="sidebar-section">
              <button
                className="section-toggle"
                onClick={() => setShowStatsPanel(!showStatsPanel)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12V6h3v6M6 12V3h3v9M10 12V8h3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Rendimiento</span>
                <svg className={`toggle-chevron ${showStatsPanel ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {showStatsPanel && (
                <StatsPanel
                  algorithmId={selectedAlgorithm}
                  currentStep={state.currentStep}
                  totalSteps={state.totalSteps}
                />
              )}
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

      <TutorialModal />

      {showTheory && (
        <TheoryModal
          algorithmType={state.currentAlgorithm}
          onClose={() => setShowTheory(false)}
        />
      )}

      {showHelp && (
        <div className="help-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="help-title">Atajos de Teclado</h2>
            <div className="help-list">
              {shortcutsList.map((s) => (
                <div key={s.key} className="help-row">
                  <kbd className="help-key">{s.key}</kbd>
                  <span className="help-action">{s.action}</span>
                </div>
              ))}
            </div>
            <button className="help-close" onClick={() => setShowHelp(false)}>Cerrar</button>
          </div>
        </div>
      )}

      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span className="toast-msg">{toast.message}</span>
            <button className="toast-close" onClick={() => ui.removeToast(toast.id)}>✕</button>
          </div>
        ))}
      </div>

      {lastAction && (
        <div className="action-feedback">{lastAction}</div>
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

        .sidebar-section {
          margin-top: 20px;
        }

        .section-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-h);
          transition: all 0.2s;
        }

        .section-toggle:hover {
          background: var(--code-bg);
        }

        .toggle-chevron {
          margin-left: auto;
          transition: transform 0.2s;
          color: var(--text);
        }

        .toggle-chevron.open {
          transform: rotate(180deg);
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

        .icon-btn {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-panel);
          cursor: pointer;
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .icon-btn:hover {
          background: var(--code-bg);
          color: var(--text-h);
        }

        .help-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .help-modal {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 32px;
          max-width: 420px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
        }
        .help-title {
          font-family: var(--heading);
          font-size: 18px;
          margin: 0 0 20px;
          color: var(--text-h);
        }
        .help-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }
        .help-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 6px 0;
        }
        .help-key {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          height: 28px;
          padding: 0 8px;
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-family: var(--mono);
          font-size: 12px;
          color: var(--text-h);
        }
        .help-action {
          font-size: 13px;
          color: var(--text);
        }
        .help-close {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg);
          color: var(--text);
          font-family: inherit;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .help-close:hover {
          background: var(--code-bg);
        }

        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 340px;
        }
        .toast {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          font-size: 13px;
          animation: toast-in 0.3s ease-out;
        }
        .toast-info { border-left: 3px solid #3b82f6; }
        .toast-success { border-left: 3px solid #22c55e; }
        .toast-warning { border-left: 3px solid #eab308; }
        .toast-error { border-left: 3px solid #ef4444; }
        .toast-msg { flex: 1; color: var(--text); }
        .toast-close {
          border: none;
          background: none;
          cursor: pointer;
          color: var(--text);
          opacity: 0.5;
          font-size: 14px;
          padding: 2px 4px;
          transition: opacity 0.2s;
        }
        .toast-close:hover { opacity: 1; }

        @keyframes toast-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .action-feedback {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 20px;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 13px;
          color: var(--text-h);
          z-index: 500;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: feedback-in 0.2s ease-out;
          pointer-events: none;
        }

        @keyframes feedback-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;