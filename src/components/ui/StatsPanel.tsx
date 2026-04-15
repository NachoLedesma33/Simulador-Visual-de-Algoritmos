import { useCallback, useEffect, useState, useMemo } from 'react';
import { getAlgorithmInfo } from '@/algorithms';
import type { AlgorithmType } from '@/types';

interface RunRecord {
  name: string;
  algorithmId: string;
  steps: number;
  time: number;
  size: number;
}

interface StatsPanelProps {
  algorithmId: AlgorithmType | null;
  currentStep: number;
  totalSteps: number;
  history?: RunRecord[];
}

const COMPLEXITY_LEGENDS: Record<string, string> = {
  'O(1)': 'Constante - tiempo no depende del tamaño',
  'O(log n)': 'Logarítmico - muy eficiente',
  'O(n)': 'Lineal - tiempo proporcional',
  'O(n log n)': 'Linealítico - eficiente para grandes datos',
  'O(n²)': 'Cuadrático - lento para grandes datos',
  'O(n³)': 'Cúbico - muy lento',
  'O(2^n)': 'Exponencial - impráctico',
};

export function StatsPanel({
  algorithmId,
  currentStep,
  totalSteps,
  history = [],
}: StatsPanelProps) {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const algorithmInfo = algorithmId ? getAlgorithmInfo(algorithmId) : null;

  useEffect(() => {
    if (currentStep > 0 && !startTime) {
      setStartTime(Date.now());
    }
    if (currentStep === 0) {
      setStartTime(null);
      setElapsedTime(0);
    }
  }, [currentStep, startTime]);

  useEffect(() => {
    if (startTime && currentStep > 0 && currentStep < totalSteps - 1) {
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime, currentStep, totalSteps]);

  const progressPercent = totalSteps > 0 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  const stepsRemaining = totalSteps - currentStep - 1;
  const msPerStep = currentStep > 0 && elapsedTime > 0 ? elapsedTime / currentStep : 0;
  const estimatedRemaining = msPerStep * stepsRemaining;

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const copyToClipboard = useCallback(() => {
    const data = JSON.stringify(history, null, 2);
    navigator.clipboard.writeText(data);
  }, [history]);

  const topEfficiency = useMemo(() => {
    if (history.length === 0) return null;
    return history.reduce((best, current) => {
      const bestEff = best.steps / best.size;
      const currentEff = current.steps / current.size;
      return currentEff < bestEff ? current : best;
    }, history[0]);
  }, [history]);

  if (!algorithmId) {
    return null;
  }

  return (
    <div className="stats-panel">
      <div className="panel-header">
        <h3 className="panel-title">Análisis de Rendimiento</h3>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Progreso</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="metric-value">
            {currentStep} / {totalSteps - 1}
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-label">Tiempo</span>
          <span className="metric-value mono">{formatTime(elapsedTime)}</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">Fin estimado</span>
          <span className="metric-value mono">
            {estimatedRemaining > 0 ? formatTime(estimatedRemaining) : '--'}
          </span>
        </div>
      </div>

      {algorithmInfo && (
        <div className="complexity-section">
          <h4 className="section-title">Complejidad</h4>
          <div className="complexity-grid">
            <div className="complexity-item">
              <span className="complexity-label">Tiempo (teórico)</span>
              <span className="complexity-value">
                {algorithmInfo.complexity.time}
              </span>
              <span className="complexity-note">
                {COMPLEXITY_LEGENDS[algorithmInfo.complexity.time] || ''}
              </span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Espacio</span>
              <span className="complexity-value">
                {algorithmInfo.complexity.space}
              </span>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h4 className="section-title">Historial</h4>
          <div className="history-table">
            <div className="history-header">
              <span>Algoritmo</span>
              <span>Pasos</span>
              <span>Tiempo</span>
            </div>
            {history.slice(-3).map((record, idx) => (
              <div key={idx} className="history-row">
                <span className="history-name">{record.name}</span>
                <span className="history-steps">{record.steps}</span>
                <span className="history-time">{formatTime(record.time)}</span>
              </div>
            ))}
          </div>
          <button className="export-btn" onClick={copyToClipboard}>
            📋 Copiar JSON
          </button>
        </div>
      )}

      {topEfficiency && (
        <div className="top-efficiency">
          <span className="top-label">Mejor eficiencia:</span>
          <span className="top-name">{topEfficiency.name}</span>
        </div>
      )}

      <style>{`
        .stats-panel {
          padding: 16px;
          background: var(--bg);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .panel-header {
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
        }

        .panel-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          color: var(--text-h);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .metric-card {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: var(--code-bg);
          border-radius: 8px;
        }

        .metric-label {
          font-size: 11px;
          color: var(--text);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .metric-value {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-h);
        }

        .metric-value.mono {
          font-family: var(--mono);
        }

        .progress-bar {
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--primary);
          transition: width 0.1s;
        }

        .complexity-section {
          padding: 12px;
          background: var(--code-bg);
          border-radius: 8px;
        }

        .section-title {
          font-size: 12px;
          font-weight: 500;
          margin: 0 0 8px;
          color: var(--text-h);
        }

        .complexity-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .complexity-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .complexity-label {
          font-size: 11px;
          color: var(--text);
        }

        .complexity-value {
          font-family: var(--mono);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-h);
        }

        .complexity-note {
          font-size: 10px;
          color: var(--text);
          font-style: italic;
        }

        .history-section {
          padding: 12px;
          background: var(--code-bg);
          border-radius: 8px;
        }

        .history-table {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 8px;
        }

        .history-header,
        .history-row {
          display: grid;
          grid-template-columns: 1fr 50px 50px;
          gap: 8px;
          font-size: 12px;
        }

        .history-header {
          font-weight: 500;
          color: var(--text);
          border-bottom: 1px solid var(--border);
          padding-bottom: 4px;
        }

        .history-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .history-steps,
        .history-time {
          font-family: var(--mono);
          text-align: right;
        }

        .export-btn {
          width: 100%;
          padding: 8px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          color: var(--text);
        }

        .export-btn:hover {
          background: var(--border);
        }

        .top-efficiency {
          padding: 8px 12px;
          background: linear-gradient(135deg, #22c55e20, #16a34e10);
          border: 1px solid #22c55e40;
          border-radius: 6px;
          font-size: 12px;
          display: flex;
          justify-content: space-between;
        }

        .top-label {
          color: var(--text);
        }

        .top-name {
          font-weight: 600;
          color: #22c55e;
        }
      `}</style>
    </div>
  );
}