export const MAX_DPR = 1.5;
export const FRAME_INTERVAL = 1000 / 30;
export const POINTER_RADIUS = 260;
export const POINTER_MAX_OFFSET = 9;
export const MAX_CURSOR_LINKS = 6;
export const CURSOR_LINK_COLOR = "rgba(103, 232, 249, 0.72)";
export const PARTICLE_LINK_COLORS = ["rgba(56, 189, 248, 0.24)", "rgba(124, 58, 237, 0.22)"] as const;

export type Point = {
  x: number;
  y: number;
  phase: number;
  speed: number;
};

type FrameLoopOptions = {
  request: (callback: FrameRequestCallback) => number;
  cancel: (id: number) => void;
  onFrame: (time: number) => void;
  onSchedule?: () => void;
};

export function getPointCount(width: number, height: number) {
  const area = Math.max(0, width) * Math.max(0, height);
  return width < 640
    ? Math.max(18, Math.min(22, Math.round(area / 16_000)))
    : Math.max(32, Math.min(42, Math.round(area / 32_000)));
}

export function createPoints(count: number, seed = 0x1d91a7): Point[] {
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0;
    return state / 4_294_967_296;
  };

  return Array.from({ length: count }, (_, index) => ({
    x: (index * 0.61803398875 + random() * 0.18) % 1,
    y: (index * 0.38196601125 + random() * 0.22) % 1,
    phase: random() * Math.PI * 2,
    speed: 0.72 + random() * 0.32,
  }));
}

export function getPointerOffset(
  pointX: number,
  pointY: number,
  pointerX: number,
  pointerY: number,
  strength: number,
) {
  const dx = pointerX - pointX;
  const dy = pointerY - pointY;
  const distance = Math.hypot(dx, dy);
  if (!distance || distance >= POINTER_RADIUS || strength <= 0) return { x: 0, y: 0 };

  const weight = 1 - distance / POINTER_RADIUS;
  const offset = Math.min(POINTER_MAX_OFFSET, weight * weight * POINTER_MAX_OFFSET * strength);
  return { x: (dx / distance) * offset, y: (dy / distance) * offset };
}

export function getCappedDpr(devicePixelRatio: number) {
  return Math.min(Math.max(devicePixelRatio || 1, 1), MAX_DPR);
}

export function shouldAnimate(visible: boolean, documentHidden: boolean, reducedMotion: boolean) {
  return visible && !documentHidden && !reducedMotion;
}

export function createFrameLoop({ request, cancel, onFrame, onSchedule }: FrameLoopOptions) {
  let active = false;
  let frameId: number | null = null;
  let lastFrame = -Infinity;

  const schedule = () => {
    if (!active || frameId !== null) return;
    onSchedule?.();
    frameId = request(tick);
  };

  const tick = (time: number) => {
    frameId = null;
    if (!active) return;
    if (time - lastFrame >= FRAME_INTERVAL) {
      onFrame(time);
      lastFrame = time;
    }
    schedule();
  };

  return {
    setActive(nextActive: boolean) {
      active = nextActive;
      if (active) schedule();
      else if (frameId !== null) {
        cancel(frameId);
        frameId = null;
      }
    },
    isScheduled() {
      return frameId !== null;
    },
    dispose() {
      active = false;
      if (frameId !== null) cancel(frameId);
      frameId = null;
    },
  };
}
