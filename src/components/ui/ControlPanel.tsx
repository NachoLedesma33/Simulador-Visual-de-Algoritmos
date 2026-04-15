import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAlgorithmStore, selectIsPlaying } from '@/store';
import { getAlgorithmInfo, getAlgorithmsByCategory, ALGORITHM_CATEGORIES } from '@/algorithms';
import type { AlgorithmType, AlgorithmCategory } from '@/types';

const CATEGORIES: AlgorithmCategory[] = ['sorting', 'pathfinding'];

interface ControlPanelProps {
  onDataGenerate?: (type: 'random' | 'nearly' | 'reversed') => void;
  onGridGenerate?: (type: 'clear' | 'random') => void;
}

export function ControlPanel({
  onDataGenerate,
  onGridGenerate,
}: ControlPanelProps) {
  const state = useAlgorithmStore();
  const isPlaying = selectIsPlaying(state);

  const algorithmOptions = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      category: cat,
      label: cat === 'sorting' ? 'Ordenamiento' : 'Búsqueda de Caminos',
      algorithms: getAlgorithmsByCategory(cat),
    }));
  }, []);

  const selectedAlgorithm = state.currentAlgorithm;
  const algorithmInfo = selectedAlgorithm ? getAlgorithmInfo(selectedAlgorithm) : null;

  const [showStats, setShowStats] = useState(true);

  const handleAlgorithmChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const type = e.target.value as AlgorithmType;
      if (type) {
        state.setAlgorithm(type);
      }
    },
    []
  );

  const handleSpeedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      state.setSpeed(value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) {
          state.pause();
        } else {
          state.play();
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        state.nextStep();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        state.previousStep();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        state.reset();
      }
    },
    [isPlaying]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isPlaying && state.delay > 0) {
      interval = setInterval(() => {
        if (state.currentStep < state.totalSteps - 1) {
          state.nextStep();
        } else {
          state.pause();
        }
      }, state.delay);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, state.delay, state.currentStep, state.totalSteps]);

  const statusBadge = useMemo(() => {
    switch (state.state) {
      case 'running':
        return { color: '#3b82f6', label: 'Ejecutando' };
      case 'paused':
        return { color: '#f59e0b', label: 'Pausado' };
      case 'completed':
        return { color: '#22c55e', label: 'Completado' };
      default:
        return { color: '#94a3b8', label: 'Inactivo' };
    }
  }, [state.state]);

  return (
    <div className="control-panel">
      <div className="panel-section">
        <h3 className="section-title">Algoritmo</h3>
        <select
          className="algorithm-select"
          value={selectedAlgorithm || ''}
          onChange={handleAlgorithmChange}
        >
          {algorithmOptions.map(({ category, label, algorithms }) => (
            <optgroup key={category} label={label}>
              {algorithms.map((algo) => {
                const info = getAlgorithmInfo(algo);
                return (
                  <option key={algo} value={algo}>
                    {info.name}
                  </option>
                );
              })}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="panel-section playback-controls">
        <button
          className={`btn btn-icon ${isPlaying ? 'btn-danger' : 'btn-primary'}`}
          onClick={isPlaying ? state.pause : state.play}
          disabled={!selectedAlgorithm}
          title={isPlaying ? 'Pausar (Espacio)' : 'Iniciar (Espacio)'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button
          className="btn btn-icon"
          onClick={state.reset}
          disabled={!selectedAlgorithm}
          title="Reiniciar (R)"
        >
          ↺
        </button>

        <button
          className="btn btn-icon"
          onClick={state.previousStep}
          disabled={!selectedAlgorithm || state.currentStep === 0}
          title="Anterior (←)"
        >
          ◀
        </button>

        <button
          className="btn btn-icon"
          onClick={state.nextStep}
          disabled={!selectedAlgorithm || state.currentStep >= state.totalSteps - 1}
          title="Siguiente (→)"
        >
          ▶
        </button>
      </div>

      <div className="panel-section speed-control">
        <label className="speed-label">
          Velocidad: {state.speed}%
        </label>
        <input
          type="range"
          className="speed-slider"
          min="1"
          max="100"
          value={state.speed}
          onChange={handleSpeedChange}
        />
      </div>

      <div className="panel-section status-badge">
        <span
          className="status-indicator"
          style={{ backgroundColor: statusBadge.color }}
        />
        <span className="status-text">{statusBadge.label}</span>
      </div>

      <div className="panel-section step-info">
        <span className="step-counter">
          Paso: {state.currentStep + 1} / {state.totalSteps || 1}
        </span>
      </div>

      {selectedAlgorithm && algorithmInfo && (
        <button
          className="btn btn-text"
          onClick={() => setShowStats(!showStats)}
        >
          {showStats ? '▼' : '▲'} Info
        </button>
      )}

      {showStats && algorithmInfo && (
        <div className="panel-section stats-panel">
          <div className="stat-row">
            <span className="stat-label">Tiempo:</span>
            <span className="stat-value">{algorithmInfo.complexity.time}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Espacio:</span>
            <span className="stat-value">{algorithmInfo.complexity.space}</span>
          </div>
          <p className="stat-description">{algorithmInfo.description}</p>
        </div>
      )}

      <div className="panel-section data-generators">
        <h3 className="section-title">Datos</h3>
        <div className="generator-buttons">
          {selectedAlgorithm &&
            ALGORITHM_CATEGORIES[selectedAlgorithm] === 'sorting' && (
              <div className="button-group">
                <button
                  className="btn btn-sm"
                  onClick={() => onDataGenerate?.('random')}
                >
                  Aleatorio
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => onDataGenerate?.('nearly')}
                >
                  Casi Ord.
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => onDataGenerate?.('reversed')}
                >
                  Inverso
                </button>
              </div>
            )}

          {selectedAlgorithm &&
            ALGORITHM_CATEGORIES[selectedAlgorithm] === 'pathfinding' && (
              <div className="button-group">
                <button
                  className="btn btn-sm"
                  onClick={() => onGridGenerate?.('clear')}
                >
                  Limpiar
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => onGridGenerate?.('random')}
                >
                  Muros
                </button>
              </div>
            )}
        </div>
      </div>

      <style>{`
        .control-panel {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 16px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          max-width: 300px;
          font-family: var(--sans);
        }

        .panel-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .section-title {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-h);
          margin: 0;
        }

        .algorithm-select {
          padding: 8px 12px;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--bg-panel);
          color: var(--text-h);
          font-size: 14px;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        
        .algorithm-select:hover {
          border-color: var(--primary);
        }

        .playback-controls {
          display: flex;
          flex-direction: row;
          gap: 8px;
          justify-content: center;
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-icon {
          width: 36px;
          height: 36px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }
        .btn-primary:hover:not(:disabled) {
          background: var(--primary-hover);
        }

        .btn-danger {
          background: var(--danger);
          color: white;
        }
        .btn-danger:hover:not(:disabled) {
          background: var(--danger-hover);
        }

        .btn-text {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 12px;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          color: var(--text-h);
        }
        
        .btn-sm:hover {
          background: var(--code-bg);
          color: var(--text-h);
        }

        .speed-control {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .speed-label {
          font-size: 12px;
          color: var(--text);
        }

        .speed-slider {
          width: 100%;
          cursor: pointer;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: var(--code-bg);
          border-radius: 6px;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-text {
          font-size: 14px;
          color: var(--text-h);
        }

        .step-info {
          text-align: center;
        }

        .step-counter {
          font-size: 14px;
          color: var(--text);
          font-family: var(--mono);
        }

        .stats-panel {
          padding: 12px;
          background: var(--code-bg);
          border-radius: 6px;
          font-size: 13px;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .stat-label {
          color: var(--text);
        }

        .stat-value {
          color: var(--text-h);
          font-family: var(--mono);
        }

        .stat-description {
          margin-top: 8px;
          font-size: 12px;
          color: var(--text);
          line-height: 1.4;
        }

        .generator-buttons {
          display: flex;
          gap: 8px;
        }

        .button-group {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}