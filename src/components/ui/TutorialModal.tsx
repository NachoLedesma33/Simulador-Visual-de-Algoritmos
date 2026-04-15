import { useState, useEffect, useCallback } from 'react';

interface TutorialStep {
  id: number;
  title: string;
  content: string;
  icon: string;
  highlight?: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    title: '¡Bienvenido!',
    content:
      'Aprende algoritmos visualmente. Observa cómo trabajan los algoritmos de ordenamiento y búsqueda de caminos en tiempo real.',
    icon: '✨',
  },
  {
    id: 2,
    title: 'Algoritmos de Ordenamiento',
    content:
      'Visualiza Bubble Sort, Quick Sort, Merge Sort y más. Cada barra representa un número. Mira cómo se comparan e intercambian posiciones.',
    icon: '📊',
    highlight: '.canvas-area',
  },
  {
    id: 3,
    title: 'Búsqueda de Caminos',
    content:
      'Explora BFS, DFS, Dijkstra y A*. El grid muestra obstáculos (paredes), el inicio (verde) y el objetivo (rojo).',
    icon: '🗺️',
    highlight: '.canvas-area',
  },
  {
    id: 4,
    title: 'Controles de Reproducción',
    content:
      'Usa los botones ▶⏸ para reproducir/pausar.调节 La barra de velocidad controla qué tan rápido avanza el algoritmo.',
    icon: '🎮',
    highlight: '.control-panel',
  },
  {
    id: 5,
    title: 'Editor de Datos',
    content:
      'Genera arrays aleatorios, casi ordenados o invertidos. Para pathfinding, dibuja paredes directamente en el grid o usa generadores.',
    icon: '🎲',
  },
  {
    id: 6,
    title: 'Atajos de Teclado',
    content:
      'Espacio = Play/Pause, Flechas = navegar pasos, R = reiniciar, D = tema oscuro. ¡Todo sin despegar la vista del canvas!',
    icon: '⌨️',
  },
  {
    id: 7,
    title: '¡Listo para Comenzar!',
    content:
      'Ahora tienes todo lo necesario. Selecciona un algoritmo y observa cómo funciona. ¡Diviértete aprendiendo!',
    icon: '🚀',
  },
];

interface TutorialModalProps {
  onComplete?: () => void;
}

export function TutorialModal({ onComplete }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const STORAGE_KEY = 'algovis-tutorial-seen';

  useEffect(() => {
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, 'true');
    onComplete?.();
  }, [onComplete]);

  const handleNext = useCallback(() => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  }, [currentStep, handleClose]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.code) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
      }
    },
    [isOpen, handleClose, handleNext, handlePrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

  return (
    <div className="tutorial-overlay" onClick={handleSkip}>
      <div
        className="tutorial-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-title"
      >
        <button className="close-btn" onClick={handleClose} aria-label="Cerrar">
          ✕
        </button>

        <div className="tutorial-icon">{step.icon}</div>

        <h2 id="tutorial-title" className="tutorial-title">
          {step.title}
        </h2>

        <p className="tutorial-content">{step.content}</p>

        <div className="progress-dots">
          {TUTORIAL_STEPS.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentStep ? 'active' : ''} ${
                idx < currentStep ? 'completed' : ''
              }`}
            />
          ))}
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="tutorial-actions">
          {currentStep > 0 && (
            <button className="btn btn-secondary" onClick={handlePrev}>
              ← Atrás
            </button>
          )}

          <button className="btn btn-text" onClick={handleSkip}>
            Saltar
          </button>

          <button className="btn btn-primary" onClick={handleNext}>
            {isLastStep ? '¡Comenzar!' : 'Siguiente →'}
          </button>
        </div>
      </div>

      <style>{`
        .tutorial-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .tutorial-modal {
          background: var(--bg);
          border-radius: 16px;
          padding: 32px;
          max-width: 400px;
          width: 90%;
          position: relative;
          animation: slideUp 0.4s ease;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          font-size: 18px;
          cursor: pointer;
          opacity: 0.6;
          color: var(--text);
        }

        .close-btn:hover {
          opacity: 1;
        }

        .tutorial-icon {
          font-size: 48px;
          text-align: center;
          margin-bottom: 16px;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .tutorial-title {
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          margin: 0 0 12px;
          color: var(--text-h);
        }

        .tutorial-content {
          font-size: 15px;
          text-align: center;
          line-height: 1.6;
          color: var(--text);
          margin: 0 0 24px;
          min-height: 80px;
        }

        .progress-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border);
          transition: all 0.3s;
        }

        .dot.active {
          background: var(--primary);
          transform: scale(1.3);
        }

        .dot.completed {
          background: var(--primary);
          opacity: 0.4;
        }

        .progress-bar {
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--primary);
          transition: width 0.3s ease;
        }

        .tutorial-actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }

        .btn {
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          flex: 1;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }

        .btn-secondary {
          background: var(--code-bg);
          color: var(--text);
        }

        .btn-secondary:hover {
          background: var(--border);
        }

        .btn-text {
          background: transparent;
          color: var(--text);
        }

        .btn-text:hover {
          color: var(--text-h);
        }

        @media (max-width: 480px) {
          .tutorial-modal {
            padding: 24px 20px;
          }

          .tutorial-icon {
            font-size: 40px;
          }

          .tutorial-title {
            font-size: 20px;
          }

          .tutorial-content {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}