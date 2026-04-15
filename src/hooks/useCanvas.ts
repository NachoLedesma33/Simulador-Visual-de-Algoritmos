import { useEffect, useRef, useCallback } from 'react';

export interface UseCanvasOptions {
  fps?: number;
  isPaused?: boolean;
}

export interface UseCanvasReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  contextRef: React.RefObject<CanvasRenderingContext2D | null>;
  frameCount: React.MutableRefObject<number>;
  start: () => void;
  pause: () => void;
  reset: () => void;
  redraw: () => void;
}

export function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, frame: number) => void,
  options: UseCanvasOptions = {}
): UseCanvasReturn {
  const { fps = 60, isPaused = false } = options;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameCount = useRef(0);
  const animationId = useRef<number | null>(null);
  const lastFrameTime = useRef(0);
  const isRunning = useRef(false);
  const observerRef = useRef<ResizeObserver | null>(null);
  const dpr = useRef(1);

  const frameInterval = 1000 / fps;

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dprValue = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    dpr.current = dprValue;

    const rect = parent.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * dprValue;
    canvas.height = height * dprValue;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dprValue, 0, 0, dprValue, 0, 0);
      contextRef.current = ctx;
    }
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (!isRunning.current) return;

      const canvas = canvasRef.current;
      const ctx = contextRef.current;

      if (!canvas || !ctx) {
        animationId.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - lastFrameTime.current;

      if (elapsed > frameInterval) {
        lastFrameTime.current = timestamp - (elapsed % frameInterval);

        draw(ctx, frameCount.current);
        frameCount.current++;
      }

      animationId.current = requestAnimationFrame(animate);
    },
    [draw, frameInterval]
  );

  const start = useCallback(() => {
    if (isRunning.current) return;
    isRunning.current = true;
    lastFrameTime.current = performance.now();
    animationId.current = requestAnimationFrame(animate);
  }, [animate]);

  const pause = useCallback(() => {
    isRunning.current = false;
    if (animationId.current !== null) {
      cancelAnimationFrame(animationId.current);
      animationId.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    frameCount.current = 0;
    const ctx = contextRef.current;
    if (ctx) {
      const canvas = canvasRef.current;
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const redraw = useCallback(() => {
    const ctx = contextRef.current;
    if (ctx && frameCount.current > 0) {
      const saved = frameCount.current;
      draw(ctx, saved - 1);
      frameCount.current = saved;
    } else if (ctx) {
      draw(ctx, 0);
      frameCount.current = 1;
    }
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    observerRef.current = new ResizeObserver(() => {
      resizeCanvas();
      if (!isPaused) {
        redraw();
      }
    });

    observerRef.current.observe(canvas.parentElement || document.body);

    if (!isPaused) {
      start();
    }

    return () => {
      pause();
      observerRef.current?.disconnect();
    };
  }, [start, pause, resizeCanvas, isPaused, redraw]);

  useEffect(() => {
    if (isPaused) {
      pause();
    } else {
      start();
    }
  }, [isPaused, start, pause]);

  return {
    canvasRef,
    contextRef,
    frameCount,
    start,
    pause,
    reset,
    redraw,
  };
}