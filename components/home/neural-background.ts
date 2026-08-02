export const MAX_DPR = 1.5;
export const FRAME_INTERVAL = 1000 / 60;
export const SCROLL_IDLE_MS = 140;
export const POINTER_RADIUS = 260;
export const POINTER_MAX_OFFSET = 9;
export const MAX_CURSOR_LINKS = 6;
export const MOBILE_POINT_MIN = 28;
export const MOBILE_POINT_MAX = 34;
export const DESKTOP_POINT_MIN = 52;
export const DESKTOP_POINT_MAX = 72;
export const CONSTELLATION_CYAN = "#30d0f0";
export const CONSTELLATION_BLUE = "#508ff0";
export const CONSTELLATION_VIOLET = "#a050f0";
export const CURSOR_LINK_COLOR = "rgba(48, 208, 240, 0.86)";
export const PARTICLE_LINK_WIDTH = 1.2;
export const CURSOR_LINK_WIDTH = 1.5;
export const PARTICLE_NODE_RADIUS = 2.3;
export const PARTICLE_NODE_HIGHLIGHT_RADIUS = 3.5;
export const PARTICLE_LINK_COLORS = [
  "rgba(48, 208, 240, 0.66)",
  "rgba(80, 143, 240, 0.62)",
  "rgba(160, 80, 240, 0.6)",
] as const;
export const PARTICLE_NODE_COLORS = [
  "rgba(48, 208, 240, 1)",
  "rgba(80, 143, 240, 0.98)",
  "rgba(160, 80, 240, 0.98)",
] as const;

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
    ? Math.max(MOBILE_POINT_MIN, Math.min(MOBILE_POINT_MAX, Math.round(area / 9_000)))
    : Math.max(DESKTOP_POINT_MIN, Math.min(DESKTOP_POINT_MAX, Math.round(area / 19_000)));
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

export function getSquaredDistance(fromX: number, fromY: number, toX: number, toY: number) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  return dx * dx + dy * dy;
}

export function getPointerOffsetScale(dx: number, dy: number, strength: number) {
  const distanceSquared = dx * dx + dy * dy;
  if (!distanceSquared || distanceSquared >= POINTER_RADIUS * POINTER_RADIUS || strength <= 0) return 0;

  const distance = Math.sqrt(distanceSquared);
  const weight = 1 - distance / POINTER_RADIUS;
  const offset = Math.min(POINTER_MAX_OFFSET, weight * weight * POINTER_MAX_OFFSET * strength);
  return offset / distance;
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
  const scale = getPointerOffsetScale(dx, dy, strength);
  return { x: dx * scale, y: dy * scale };
}

export function getCappedDpr(devicePixelRatio: number) {
  return Math.min(Math.max(devicePixelRatio || 1, 1), MAX_DPR);
}

export function shouldAnimate(visible: boolean, documentHidden: boolean, reducedMotion: boolean, scrollPaused = false) {
  return visible && !documentHidden && !reducedMotion && !scrollPaused;
}

export function createFrameLoop({ request, cancel, onFrame, onSchedule }: FrameLoopOptions) {
  let active = false;
  let frameId: number | null = null;
  let nextFrame = -Infinity;

  const schedule = () => {
    if (!active || frameId !== null) return;
    onSchedule?.();
    frameId = request(tick);
  };

  const tick = (time: number) => {
    frameId = null;
    if (!active) return;
    if (!Number.isFinite(nextFrame) || time + 0.5 >= nextFrame) {
      onFrame(time);
      nextFrame = Number.isFinite(nextFrame) ? nextFrame + FRAME_INTERVAL : time + FRAME_INTERVAL;
      if (nextFrame <= time) nextFrame = time + FRAME_INTERVAL;
    }
    schedule();
  };

  return {
    setActive(nextActive: boolean) {
      active = nextActive;
      if (active) schedule();
      else {
        if (frameId !== null) cancel(frameId);
        frameId = null;
        nextFrame = -Infinity;
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
