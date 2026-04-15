export interface PerformanceMetrics {
  fps: number;
  averageFrameTime: number;
  scriptTime: number;
  renderTime: number;
  isThrottled: boolean;
}

type MeasureCallback = () => void;

class PerformanceMonitor {
  private fpsBuffer: number[] = [];
  private lastFrameTime: number = 0;
  private scriptTimeBuffer: number[] = [];
  private renderTimeBuffer: number[] = [];
  private throttleStartTime: number | null = null;
  private isThrottled: boolean = false;
  private onDropCallbacks: Set<MeasureCallback> = new Set();
  private droppedFrames: number = 0;
  private totalFrames: number = 0;

  private measures: Map<string, number> = new Map();

  start(tag: string): void {
    this.measures.set(tag, performance.now());
  }

  end(tag: string): number | null {
    const start = this.measures.get(tag);
    if (start === undefined) return null;

    this.measures.delete(tag);
    return performance.now() - start;
  }

  beginFrame(): void {
    this.lastFrameTime = performance.now();
  }

  endFrame(scriptTime: number, renderTime: number): void {
    const now = performance.now();
    const frameTime = now - this.lastFrameTime;
    this.lastFrameTime = now;

    if (frameTime > 0) {
      const fps = 1000 / frameTime;
      this.fpsBuffer.push(fps);

      if (this.fpsBuffer.length > 60) {
        this.fpsBuffer.shift();
      }
    }

    this.scriptTimeBuffer.push(scriptTime);
    this.renderTimeBuffer.push(renderTime);

    if (this.scriptTimeBuffer.length > 60) {
      this.scriptTimeBuffer.shift();
    }
    if (this.renderTimeBuffer.length > 60) {
      this.renderTimeBuffer.shift();
    }

    this.totalFrames++;

    this.checkThrottle();
  }

  private checkThrottle(): void {
    const avgFps = this.getAverageFPS();
    const FPS_THRESHOLD = 30;
    const THROTTLE_DELAY = 2000;

    if (avgFps < FPS_THRESHOLD) {
      if (!this.throttleStartTime) {
        this.throttleStartTime = performance.now();
      } else if (performance.now() - this.throttleStartTime > THROTTLE_DELAY && !this.isThrottled) {
        this.isThrottled = true;
        this.onDropCallbacks.forEach((cb) => cb());
      }
    } else {
      this.throttleStartTime = null;
    }

    this.droppedFrames++;
  }

  getAverageFPS(): number {
    if (this.fpsBuffer.length === 0) return 60;
    const sum = this.fpsBuffer.reduce((a, b) => a + b, 0);
    return sum / this.fpsBuffer.length;
  }

  getMetrics(): PerformanceMetrics {
    const avgFps = this.getAverageFPS();

    const avgScript = this.scriptTimeBuffer.length > 0
      ? this.scriptTimeBuffer.reduce((a, b) => a + b, 0) / this.scriptTimeBuffer.length
      : 0;

    const avgRender = this.renderTimeBuffer.length > 0
      ? this.renderTimeBuffer.reduce((a, b) => a + b, 0) / this.renderTimeBuffer.length
      : 0;

    return {
      fps: Math.round(avgFps),
      averageFrameTime: avgFps > 0 ? 1000 / avgFps : 16.67,
      scriptTime: avgScript,
      renderTime: avgRender,
      isThrottled: this.isThrottled,
    };
  }

  onPerformanceDrop(callback: MeasureCallback): () => void {
    this.onDropCallbacks.add(callback);
    return () => this.onDropCallbacks.delete(callback);
  }

  getScriptLoadPercentage(): number {
    const avgScript = this.scriptTimeBuffer.length > 0
      ? this.scriptTimeBuffer.reduce((a, b) => a + b, 0) / this.scriptTimeBuffer.length
      : 0;
    return Math.min(100, (avgScript / 16.67) * 100);
  }

  reset(): void {
    this.measures.clear();
    this.fpsBuffer = [];
    this.scriptTimeBuffer = [];
    this.renderTimeBuffer = [];
    this.throttleStartTime = null;
    this.isThrottled = false;
    this.droppedFrames = 0;
    this.totalFrames = 0;
    this.lastFrameTime = 0;
  }
}

export const performanceMonitor = new PerformanceMonitor();

export function createThrottleController() {
  let targetFps = 60;
  let isEnabled = false;

  return {
    setTargetFPS(fps: number) {
      targetFps = Math.max(10, Math.min(120, fps));
    },
    setEnabled(enabled: boolean) {
      isEnabled = enabled;
    },
    getInterval() {
      if (!isEnabled) return 0;
      return 1000 / targetFps;
    },
    get isEnabled() {
      return isEnabled;
    },
    get targetFps() {
      return targetFps;
    },
  };
}