import { useCallback, useState, useEffect } from 'react';
import { getAlgorithmTheory } from '@/constants/theory';
import type { AlgorithmTheory, SupportedAlgorithmType } from '@/constants/theory';
import type { AlgorithmType } from '@/types';
import { ALGORITHM_SNIPPETS, LANGUAGES, LANGUAGE_LABELS } from '@/constants/codeSnippets';
import type { SupportedLanguage } from '@/constants/codeSnippets';

interface TheoryModalProps {
  algorithmType: AlgorithmType | null;
  onClose: () => void;
}

export function TheoryModal({ algorithmType, onClose }: TheoryModalProps) {
  const [theory, setTheory] = useState<AlgorithmTheory | null>(null);
  const [activeTab, setActiveTab] = useState<'concept' | 'code' | 'usage'>('concept');
  const [codeLang, setCodeLang] = useState<SupportedLanguage>('python');

  useEffect(() => {
    if (algorithmType) {
      const theoryData = getAlgorithmTheory(algorithmType as SupportedAlgorithmType);
      setTheory(theoryData);
    }
    setCodeLang('python');
  }, [algorithmType]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!theory) return null;

  return (
    <div className="theory-overlay" onClick={onClose}>
      <div className="theory-modal" onClick={(e) => e.stopPropagation()}>
        <button className="theory-close-btn" onClick={onClose} aria-label="Cerrar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="theory-header">
          <span className="theory-category">
            {theory.id === 'bubble' && 'Ordenamiento'}
            {theory.id === 'quick' && 'Ordenamiento'}
            {theory.id === 'merge' && 'Ordenamiento'}
            {theory.id === 'insertion' && 'Ordenamiento'}
            {theory.id === 'selection' && 'Ordenamiento'}
            {theory.id === 'heap' && 'Ordenamiento'}
            {theory.id === 'shell' && 'Ordenamiento'}
            {theory.id === 'radix' && 'Ordenamiento'}
            {theory.id === 'counting' && 'Ordenamiento'}
            {theory.id === 'tim' && 'Ordenamiento'}
            {theory.id === 'bfs' && 'Búsqueda'}
            {theory.id === 'dfs' && 'Búsqueda'}
            {theory.id === 'dijkstra' && 'Búsqueda'}
            {theory.id === 'astar' && 'Búsqueda'}
            {theory.id === 'bidirectional_bfs' && 'Búsqueda'}
            {theory.id === 'greedy_best_first' && 'Búsqueda'}
            {theory.id === 'bellman_ford' && 'Búsqueda'}
            {theory.id === 'floyd_warshall' && 'Búsqueda'}
          </span>
          <h2 className="theory-title">{theory.id}</h2>
        </div>

        <div className="theory-tabs">
          <button
            className={`theory-tab ${activeTab === 'concept' ? 'active' : ''}`}
            onClick={() => setActiveTab('concept')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="theory-tab-icon">
              <circle cx="7" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 12.5C3 10.5 5 9 7 9C9 9 11 10.5 11 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Concepto
          </button>
          <button
            className={`theory-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="theory-tab-icon">
              <path d="M4 4L1 7L4 10M10 4L13 7L10 10M9 2L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Pseudocódigo
          </button>
          <button
            className={`theory-tab ${activeTab === 'usage' ? 'active' : ''}`}
            onClick={() => setActiveTab('usage')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="theory-tab-icon">
              <path d="M2 7H12M2 3H12V11H2V3ZM5 2V5M9 2V5M5 9V12M9 9V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Uso
          </button>
        </div>

        <div className="theory-content">
          {activeTab === 'concept' && (
            <div className="theory-tab-content">
              <section className="theory-section">
                <div className="theory-section-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="theory-section-icon">
                    <circle cx="12" cy="12" r="10" stroke="#22d3ee" strokeWidth="1.5"/>
                    <path d="M12 8v4M12 16h0" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3>¿Qué es?</h3>
                </div>
                <p className="theory-section-text">{theory.concept}</p>
              </section>

              <section className="theory-section">
                <div className="theory-section-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="theory-section-icon">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3>Cómo Funciona</h3>
                </div>
                <p className="theory-section-text">{theory.howItWorks}</p>
              </section>

              <section className="theory-section">
                <div className="theory-section-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="theory-section-icon">
                    <circle cx="12" cy="12" r="3" stroke="#22d3ee" strokeWidth="1.5"/>
                    <path d="M12 1v2M12 21v2M1 12h2M21 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <h3>Ejemplo del Mundo Real</h3>
                </div>
                <p className="theory-section-text">{theory.realWorldExample}</p>
              </section>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="theory-tab-content">
              <div className="theory-code-header">
                <div className="theory-code-lang-pills">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      className={`theory-lang-pill ${codeLang === lang ? 'active' : ''}`}
                      onClick={() => setCodeLang(lang)}
                    >
                      {LANGUAGE_LABELS[lang]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="theory-pseudocode-wrapper">
                <pre className="theory-pseudocode"><code>{ALGORITHM_SNIPPETS[theory.id]?.[codeLang] ?? theory.pseudocode}</code></pre>
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="theory-tab-content">
              <section className="theory-section">
                <div className="theory-section-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="theory-section-icon">
                    <path d="M20 6L9 17l-5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3>Ventajas</h3>
                </div>
                <ul className="theory-list">
                  {theory.advantages.map((adv, idx) => (
                    <li key={idx} className="theory-list-item pros">
                      <span className="theory-list-marker pros"/>
                      {adv}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="theory-section">
                <div className="theory-section-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="theory-section-icon">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3>Desventajas</h3>
                </div>
                <ul className="theory-list">
                  {theory.disadvantages.map((disadv, idx) => (
                    <li key={idx} className="theory-list-item cons">
                      <span className="theory-list-marker cons"/>
                      {disadv}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="theory-section">
                <div className="theory-section-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="theory-section-icon">
                    <path d="M12 2v20M2 12h20" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <h3>Cuándo Usar Este Algoritmo</h3>
                </div>
                <p className="theory-section-text">{theory.whenToUse}</p>
              </section>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .theory-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 900;
          animation: theoryFadeIn 0.2s ease;
          padding: 20px;
        }

        @keyframes theoryFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .theory-modal {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          width: 100%;
          max-width: 680px;
          max-height: 85vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: theorySlideUp 0.3s ease;
          box-shadow: var(--shadow-lg), 0 0 60px rgba(34, 211, 238, 0.05);
          position: relative;
        }

        @keyframes theorySlideUp {
          from { transform: translateY(20px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .theory-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          cursor: pointer;
          color: var(--text);
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }

        .theory-close-btn:hover {
          background: var(--danger-dim);
          border-color: var(--danger);
          color: var(--danger);
        }

        .theory-header {
          text-align: left;
          margin-bottom: 20px;
          padding-right: 40px;
        }

        .theory-category {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--primary);
          font-weight: 600;
          display: inline-block;
          background: var(--primary-dim);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .theory-title {
          font-size: 26px;
          font-weight: 700;
          margin: 12px 0 0;
          color: var(--text-h);
          font-family: var(--heading);
          letter-spacing: -0.02em;
          text-transform: capitalize;
        }

        .theory-tabs {
          display: flex;
          gap: 4px;
          padding: 3px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .theory-tab {
          flex: 1;
          padding: 9px 12px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 500;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .theory-tab-icon {
          display: none;
        }

        .theory-tab:hover {
          color: var(--text);
          background: var(--bg-panel);
        }

        .theory-tab.active {
          background: var(--code-bg);
          color: var(--primary);
          border: 1px solid var(--border-hover);
        }

        .theory-content {
          flex: 1;
          overflow-y: auto;
          padding-right: 4px;
        }

        .theory-tab-content {
          animation: theoryFadeIn 0.15s ease;
        }

        .theory-section {
          margin-bottom: 20px;
        }

        .theory-section:last-child {
          margin-bottom: 0;
        }

        .theory-section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .theory-section-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 4px;
        }

        .theory-section h3 {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-h);
          margin: 0;
        }

        .theory-section-text {
          font-size: 13px;
          line-height: 1.7;
          color: var(--text);
          margin: 0;
          text-align: left;
        }

        .theory-list {
          margin: 0;
          padding-left: 0;
          list-style: none;
        }

        .theory-list-item {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text);
          margin-bottom: 8px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          text-align: left;
        }

        .theory-list-marker {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 7px;
          flex-shrink: 0;
        }

        .theory-list-marker.pros {
          background: var(--success);
        }

        .theory-list-marker.cons {
          background: var(--danger);
        }

        .theory-code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .theory-code-lang-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .theory-lang-pill {
          font-size: 10px;
          font-weight: 500;
          padding: 3px 8px;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--bg-card);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s;
        }

        .theory-lang-pill:hover {
          border-color: var(--primary);
          color: var(--text);
        }

        .theory-lang-pill.active {
          background: var(--primary-dim);
          border-color: var(--primary);
          color: var(--primary);
          font-weight: 600;
        }

        .theory-pseudocode-wrapper {
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }

        .theory-pseudocode {
          background: transparent;
          padding: 16px;
          font-family: var(--mono);
          font-size: 12px;
          line-height: 1.7;
          color: var(--text);
          overflow-x: auto;
          overflow-y: auto;
          margin: 0;
          max-height: 420px;
          white-space: pre;
        }

        @media (max-width: 520px) {
          .theory-modal {
            padding: 20px 16px;
            border-radius: 16px;
          }

          .theory-tabs {
            flex-wrap: wrap;
          }

          .theory-tab {
            min-width: calc(50% - 4px);
          }
        }
      `}</style>
    </div>
  );
}
