import { useCallback, useEffect, useRef } from 'react';

import { useCanvas } from '@/hooks';
import type { SortingStep } from '@/types';

interface SortingCanvasProps {
  data: number[];
  step: SortingStep;
  width: number;
  height: number;
  options?: {
    showValues?: boolean;
    primaryColor?: string;
  };
}

const COLORS = {
  comparing: '#ef4444',
  swapping: '#3b82f6',
  sorted: '#22c55e',
  default: '#94a3b8',
};

const MAX_BAR_HEIGHT_RATIO = 0.9;
const VALUE_THRESHOLD = 30;
const PADDING = 2;

export function SortingCanvas({
  data,
  step,
  width,
  height,
  options = {},
}: SortingCanvasProps) {
  const { showValues = true, primaryColor } = options;
  const stepRef = useRef(step);
  const dataRef = useRef(data);

  useEffect(() => {
    stepRef.current = step;
    dataRef.current = data;
  }, [step, data]);

  const draw = useCallback(
    (_ctx: CanvasRenderingContext2D, _frame: number) => {
      const canvasWidth = _ctx.canvas.width;
      const canvasHeight = _ctx.canvas.height;
      const currentData = dataRef.current;
      const currentStep = stepRef.current;

      _ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (currentData.length === 0) return;

      const maxValue = Math.max(...currentData, 1);
      const barCount = currentData.length;
      const availableWidth = canvasWidth - PADDING * (barCount + 1);
      let barWidth = availableWidth / barCount;
      if (barWidth < 2) barWidth = 2;
      const totalBarsWidth = barWidth * barCount;
      const startX = (canvasWidth - totalBarsWidth) / 2;
      const maxBarHeight = canvasHeight * MAX_BAR_HEIGHT_RATIO;

      for (let i = 0; i < barCount; i++) {
        const value = currentData[i];
        const barHeight = (value / maxValue) * maxBarHeight;
        const x = startX + PADDING + i * (barWidth + PADDING);
        const y = canvasHeight - barHeight;

        let color = primaryColor || COLORS.default;

        if (currentStep.sorted.includes(i)) {
          color = COLORS.sorted;
        }

        if (currentStep.swapping) {
          const [swA, swB] = currentStep.swapping;
          if (i === swA || i === swB) {
            color = COLORS.swapping;
          }
        }

        if (currentStep.comparing) {
          const [compA, compB] = currentStep.comparing;
          if (i === compA || i === compB) {
            if (!currentStep.swapping || (i !== currentStep.swapping[0] && i !== currentStep.swapping[1])) {
              color = COLORS.comparing;
            }
          }
        }

        if (currentStep.pivot !== undefined && i === currentStep.pivot) {
          color = COLORS.swapping;
        }

        _ctx.fillStyle = color;
        _ctx.fillRect(x, y, barWidth - PADDING, barHeight);

        if (barWidth >= 20 && showValues && barCount <= VALUE_THRESHOLD) {
          _ctx.fillStyle = '#ffffff';
          _ctx.font = `${Math.min(12, barWidth / 2)}px sans-serif`;
          _ctx.textAlign = 'center';
          _ctx.textBaseline = 'middle';
          _ctx.fillText(
            String(value),
            x + (barWidth - PADDING) / 2,
            y - 8
          );
        }
      }
    },
    [showValues, primaryColor]
  );

  const { canvasRef, redraw } = useCanvas(draw, { fps: 60 });

  useEffect(() => {
    redraw();
  }, [step, redraw]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'block',
      }}
    />
  );
}