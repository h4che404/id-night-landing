"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  CURSOR_LINK_COLOR,
  CURSOR_LINK_WIDTH,
  MAX_CURSOR_LINKS,
  PARTICLE_LINK_WIDTH,
  PARTICLE_NODE_HIGHLIGHT_RADIUS,
  PARTICLE_NODE_RADIUS,
  PARTICLE_NODE_COLORS,
  PARTICLE_LINK_COLORS,
  POINTER_RADIUS,
  SCROLL_IDLE_MS,
  createFrameLoop,
  createPoints,
  getCappedDpr,
  getPointCount,
  getPointerOffsetScale,
  getSquaredDistance,
  shouldAnimate,
} from "@/components/home/neural-background";

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let points = createPoints(0);
    let positions = new Float32Array(0);
    const nearestIndexes = new Int16Array(MAX_CURSOR_LINKS);
    const nearestDistances = new Float32Array(MAX_CURSOR_LINKS);
    const linkOpacitySteps = 8;
    const linkSegments = Array.from(
      { length: PARTICLE_LINK_COLORS.length * linkOpacitySteps },
      () => [] as number[],
    );
    const pointer = { x: 0, y: 0, active: false, strength: 0 };
    let visible = false;
    let activeTouches = 0;
    let scrollPaused = false;
    let scrollActivityId = 0;
    let scrollResumeTimer: number | null = null;
    let drawCount = 0;
    let requestCount = 0;

    const updateDiagnostics = (scheduled: boolean) => {
      canvas.dataset.rafActive = String(scheduled);
      canvas.dataset.rafRequests = String(requestCount);
      canvas.dataset.drawCount = String(drawCount);
      canvas.dataset.pointerActive = String(pointer.active);
      canvas.dataset.scrollPaused = String(scrollPaused);
      canvas.dataset.scrollOptimized = "true";
    };

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const elapsed = reduceMotion ? 0 : time * 0.00008;
      const pointerX = pointer.x * width;
      const pointerY = pointer.y * height;
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.08;

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        const driftX = Math.sin(elapsed * point.speed + point.phase) * 0.025;
        const driftY = Math.cos(elapsed * 0.8 * point.speed + point.phase) * 0.03;
        const baseX = (point.x + driftX) * width;
        const baseY = (point.y + driftY) * height;
        const dx = pointerX - baseX;
        const dy = pointerY - baseY;
        const offsetScale = getPointerOffsetScale(dx, dy, pointer.strength);
        positions[index * 2] = baseX + dx * offsetScale;
        positions[index * 2 + 1] = baseY + dy * offsetScale;
      }

      context.clearRect(0, 0, width, height);
      context.lineWidth = PARTICLE_LINK_WIDTH;
      const threshold = Math.min(190, width * 0.22);
      const thresholdSquared = threshold * threshold;
      for (const segments of linkSegments) segments.length = 0;

      for (let index = 0; index < points.length; index += 1) {
        const fromX = positions[index * 2];
        const fromY = positions[index * 2 + 1];
        for (let otherIndex = index + 1; otherIndex < points.length; otherIndex += 1) {
          const toX = positions[otherIndex * 2];
          const toY = positions[otherIndex * 2 + 1];
          const distanceSquared = getSquaredDistance(fromX, fromY, toX, toY);

          if (distanceSquared > thresholdSquared) continue;
          const distance = Math.sqrt(distanceSquared);
          const opacityIndex = Math.round((1 - distance / threshold) * (linkOpacitySteps - 1));
          if (opacityIndex === 0) continue;
          const colorIndex = (index + otherIndex) % PARTICLE_LINK_COLORS.length;
          linkSegments[colorIndex * linkOpacitySteps + opacityIndex].push(fromX, fromY, toX, toY);
        }
      }

      for (let colorIndex = 0; colorIndex < PARTICLE_LINK_COLORS.length; colorIndex += 1) {
        const linkColor = PARTICLE_LINK_COLORS[colorIndex];
        context.strokeStyle = linkColor;
        for (let opacityIndex = 1; opacityIndex < linkOpacitySteps; opacityIndex += 1) {
          const segments = linkSegments[colorIndex * linkOpacitySteps + opacityIndex];
          if (!segments.length) continue;
          context.globalAlpha = opacityIndex / (linkOpacitySteps - 1);
          context.beginPath();
          for (let offset = 0; offset < segments.length; offset += 4) {
            context.moveTo(segments[offset], segments[offset + 1]);
            context.lineTo(segments[offset + 2], segments[offset + 3]);
          }
          context.stroke();
          if (opacityIndex >= 2) {
            // Keep the closest connections crisp and dimensional without per-frame blur.
            context.lineWidth = PARTICLE_LINK_WIDTH + 1.2;
            context.globalAlpha = 0.24;
            context.stroke();
            context.lineWidth = PARTICLE_LINK_WIDTH;
          }
        }
      }

      if (pointer.strength > 0.01) {
        nearestIndexes.fill(-1);
        nearestDistances.fill(Infinity);
        for (let index = 0; index < points.length; index += 1) {
          const distanceSquared = getSquaredDistance(positions[index * 2], positions[index * 2 + 1], pointerX, pointerY);
          if (distanceSquared >= POINTER_RADIUS * POINTER_RADIUS || distanceSquared >= nearestDistances[MAX_CURSOR_LINKS - 1]) continue;
          let slot = MAX_CURSOR_LINKS - 1;
          while (slot > 0 && distanceSquared < nearestDistances[slot - 1]) {
            nearestDistances[slot] = nearestDistances[slot - 1];
            nearestIndexes[slot] = nearestIndexes[slot - 1];
            slot -= 1;
          }
          nearestDistances[slot] = distanceSquared;
          nearestIndexes[slot] = index;
        }
        context.lineWidth = CURSOR_LINK_WIDTH;
        context.strokeStyle = CURSOR_LINK_COLOR;
        for (let slot = 0; slot < MAX_CURSOR_LINKS && nearestIndexes[slot] >= 0; slot += 1) {
          const index = nearestIndexes[slot];
          context.globalAlpha = (1 - Math.sqrt(nearestDistances[slot]) / POINTER_RADIUS) * pointer.strength;
          context.beginPath();
          context.moveTo(positions[index * 2], positions[index * 2 + 1]);
          context.lineTo(pointerX, pointerY);
          context.stroke();
        }
      }

      context.globalAlpha = 1;
      for (let colorIndex = 0; colorIndex < PARTICLE_NODE_COLORS.length; colorIndex += 1) {
        const nodeColor = PARTICLE_NODE_COLORS[colorIndex];
        context.fillStyle = nodeColor;
        context.beginPath();
        for (let index = colorIndex; index < points.length; index += PARTICLE_NODE_COLORS.length) {
          if (index % 6 === 0) continue;
          context.moveTo(positions[index * 2] + PARTICLE_NODE_RADIUS, positions[index * 2 + 1]);
          context.arc(positions[index * 2], positions[index * 2 + 1], PARTICLE_NODE_RADIUS, 0, Math.PI * 2);
        }
        context.fill();
      }
      context.fillStyle = PARTICLE_NODE_COLORS[0];
      context.beginPath();
      for (let index = 0; index < points.length; index += 6) {
        context.moveTo(positions[index * 2] + PARTICLE_NODE_HIGHLIGHT_RADIUS, positions[index * 2 + 1]);
        context.arc(positions[index * 2], positions[index * 2 + 1], PARTICLE_NODE_HIGHLIGHT_RADIUS, 0, Math.PI * 2);
      }
      context.fill();

      drawCount += 1;
      updateDiagnostics(loop.isScheduled());
    };

    const loop = createFrameLoop({
      request: (callback) => window.requestAnimationFrame(callback),
      cancel: (frameId) => window.cancelAnimationFrame(frameId),
      onFrame: draw,
      onSchedule: () => {
        requestCount += 1;
        updateDiagnostics(true);
      },
    });

    const syncAnimation = () => {
      loop.setActive(shouldAnimate(visible, document.hidden, Boolean(reduceMotion), scrollPaused));
      updateDiagnostics(loop.isScheduled());
    };

    const clearScrollResume = () => {
      if (scrollResumeTimer !== null) window.clearTimeout(scrollResumeTimer);
      scrollResumeTimer = null;
    };

    const resumeAfterScroll = () => {
      if (!scrollPaused || activeTouches > 0) return;
      clearScrollResume();
      const activityId = scrollActivityId;
      scrollResumeTimer = window.setTimeout(() => {
        scrollResumeTimer = null;
        if (activityId !== scrollActivityId || activeTouches > 0) return;
        scrollPaused = false;
        syncAnimation();
      }, SCROLL_IDLE_MS);
    };

    const pauseForScroll = (resumeWhenIdle: boolean) => {
      scrollActivityId += 1;
      clearScrollResume();
      if (!scrollPaused) {
        scrollPaused = true;
        syncAnimation();
      }
      if (resumeWhenIdle && activeTouches === 0) resumeAfterScroll();
    };

    const onTouchStartOrMove = (event: TouchEvent) => {
      activeTouches = event.touches.length;
      pauseForScroll(false);
    };

    const onTouchEndOrCancel = (event: TouchEvent) => {
      activeTouches = event.touches.length;
      scrollActivityId += 1;
      clearScrollResume();
      if (activeTouches === 0) resumeAfterScroll();
    };

    const onWheel = () => pauseForScroll(true);
    const onScroll = () => pauseForScroll(true);

    const resize = () => {
      const dpr = getCappedDpr(window.devicePixelRatio);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      points = createPoints(getPointCount(width, height));
      positions = new Float32Array(points.length * 2);
      canvas.dataset.pointCount = String(points.length);
      canvas.dataset.dpr = String(dpr);
      draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.active = true;
      pointer.x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      pointer.y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      updateDiagnostics(loop.isScheduled());
    };

    const onPointerLeave = () => {
      pointer.active = false;
      updateDiagnostics(loop.isScheduled());
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    });
    const pointerTarget = canvas.parentElement ?? canvas;

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", syncAnimation);
    window.addEventListener("touchstart", onTouchStartOrMove, { passive: true });
    window.addEventListener("touchmove", onTouchStartOrMove, { passive: true });
    window.addEventListener("touchend", onTouchEndOrCancel, { passive: true });
    window.addEventListener("touchcancel", onTouchEndOrCancel, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();

    if (!reduceMotion) {
      pointerTarget.addEventListener("pointerenter", onPointerMove, { passive: true });
      pointerTarget.addEventListener("pointermove", onPointerMove, { passive: true });
      pointerTarget.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }

    return () => {
      loop.dispose();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", syncAnimation);
      clearScrollResume();
      window.removeEventListener("touchstart", onTouchStartOrMove);
      window.removeEventListener("touchmove", onTouchStartOrMove);
      window.removeEventListener("touchend", onTouchEndOrCancel);
      window.removeEventListener("touchcancel", onTouchEndOrCancel);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      pointerTarget.removeEventListener("pointerenter", onPointerMove);
      pointerTarget.removeEventListener("pointermove", onPointerMove);
      pointerTarget.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
