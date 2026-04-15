import React, { useCallback, useMemo } from 'react';
import { getPseudocode, type PseudocodeBlock } from '@/constants/pseudocode';

interface CodePanelProps {
  algorithmId: string | null;
  currentLine?: number;
  explanation?: string;
}

const KEYWORDS = ['procedure', 'for', 'while', 'if', 'else', 'return', 'function', 'def', 'not', 'and', 'or', 'in', 'True', 'False', 'null', 'None'];

function highlightSyntax(code: string) {
  const words = code.split(/(\s+|[(),:\[\]])/g);
  const elements: React.ReactNode[] = [];

  words.forEach((word, idx) => {
    if (KEYWORDS.includes(word)) {
      elements.push(<span key={idx} className="keyword">{word}</span>);
    } else if (!isNaN(Number(word))) {
      elements.push(<span key={idx} className="number">{word}</span>);
    } else {
      elements.push(<span key={idx}>{word}</span>);
    }
  });

  return elements;
}

export function CodePanel({
  algorithmId,
  currentLine,
  explanation,
}: CodePanelProps) {
  const pseudocode = useMemo((): PseudocodeBlock | null => {
    if (!algorithmId) return null;
    return getPseudocode(algorithmId);
  }, [algorithmId]);

  const handleCopy = useCallback(() => {
    if (!pseudocode) return;

    const text = pseudocode.lines
      .map((line) => line.code)
      .filter((code) => code.trim())
      .join('\n');

    navigator.clipboard.writeText(text);
  }, [pseudocode]);

  if (!pseudocode) {
    return (
      <div className="code-panel empty">
        <p className="empty-text">Selecciona un algoritmo para ver el pseudocódigo</p>
        <style>{`
          .code-panel {
            padding: 16px;
            background: var(--code-bg);
            border-radius: 8px;
            font-family: var(--mono);
            font-size: 13px;
          }
          .code-panel.empty {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .empty-text {
            color: var(--text);
            font-size: 13px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="code-panel">
      <div className="panel-header">
        <h3 className="panel-title">{pseudocode.name}</h3>
        <button className="copy-btn" onClick={handleCopy} title="Copiar">
          📋
        </button>
      </div>

      <div className="code-lines">
        {pseudocode.lines.map((line) => (
          <div
            key={line.id}
            className={`code-line ${currentLine === line.id ? 'highlighted' : ''}`}
          >
            <span className="line-number">{line.id}</span>
            <span className="line-code">{highlightSyntax(line.code)}</span>
            {line.comment && (
              <span className="line-comment">// {line.comment}</span>
            )}
          </div>
        ))}
      </div>

      {explanation && (
        <div className="explanation-box">
          <span className="explanation-label">Paso actual:</span>
          <span className="explanation-text">{explanation}</span>
        </div>
      )}

      <style>{`
        .code-panel {
          display: flex;
          flex-direction: column;
          padding: 12px;
          background: var(--code-bg);
          border-radius: 8px;
          font-family: var(--mono);
          font-size: 13px;
          max-height: 400px;
          overflow: hidden;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }

        .panel-title {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
          color: var(--text-h);
        }

        .copy-btn {
          padding: 4px 8px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }

        .copy-btn:hover {
          background: var(--border);
        }

        .code-lines {
          flex: 1;
          overflow-y: auto;
        }

        .code-line {
          display: flex;
          gap: 8px;
          padding: 4px 8px;
          border-radius: 4px;
          line-height: 1.4;
        }

        .code-line.highlighted {
          background: rgba(251, 191, 36, 0.3);
          border-left: 3px solid #fbbf24;
        }

        .line-number {
          min-width: 20px;
          color: var(--text);
          opacity: 0.6;
          user-select: none;
        }

        .line-code {
          flex: 1;
          color: var(--text-h);
          white-space: pre;
        }

        .line-code .keyword {
          color: #c084fc;
          font-weight: 500;
        }

        .line-code .number {
          color: #f97316;
        }

        .line-comment {
          display: none;
          font-size: 11px;
          color: var(--text);
          opacity: 0.7;
        }

        .code-line.highlighted .line-comment {
          display: block;
        }

        .explanation-box {
          margin-top: 12px;
          padding: 8px 12px;
          background: rgba(251, 191, 36, 0.15);
          border-radius: 6px;
          border-left: 3px solid #fbbf24;
        }

        .explanation-label {
          display: block;
          font-size: 11px;
          color: var(--text);
          margin-bottom: 4px;
        }

        .explanation-text {
          font-size: 13px;
          color: var(--text-h);
        }
      `}</style>
    </div>
  );
}