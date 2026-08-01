"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  CURSOR_LINK_COLOR,
  MAX_CURSOR_LINKS,
  PARTICLE_NODE_COLORS,
  PARTICLE_LINK_COLORS,
  POINTER_RADIUS,
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
    const pointer = { x: 0, y: 0, active: false, strength: 0 };
    let visible = false;
    let drawCount = 0;
    let requestCount = 0;

    const updateDiagnostics = (scheduled: boolean) => {
      canvas.dataset.rafActive = String(scheduled);
      canvas.dataset.rafRequests = String(requestCount);
      canvas.dataset.drawCount = String(drawCount);
      canvas.dataset.pointerActive = String(pointer.active);
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
      context.lineWidth = 1;
      const threshold = Math.min(190, width * 0.22);
      const thresholdSquared = threshold * threshold;

      for (let index = 0; index < points.length; index += 1) {
        const fromX = positions[index * 2];
        const fromY = positions[index * 2 + 1];
        for (let otherIndex = index + 1; otherIndex < points.length; otherIndex += 1) {
          const toX = positions[otherIndex * 2];
          const toY = positions[otherIndex * 2 + 1];
          const distanceSquared = getSquaredDistance(fromX, fromY, toX, toY);

          if (distanceSquared > thresholdSquared) continue;
          const distance = Math.sqrt(distanceSquared);
          context.globalAlpha = 1 - distance / threshold;
          context.strokeStyle = PARTICLE_LINK_COLORS[(index + otherIndex) % PARTICLE_LINK_COLORS.length];
          context.beginPath();
          context.moveTo(fromX, fromY);
          context.lineTo(toX, toY);
          context.stroke();
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
        context.lineWidth = 1.25;
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
      for (let index = 0; index < points.length; index += 1) {
        const radius = index % 6 === 0 ? 2.8 : 1.8;
        context.fillStyle = PARTICLE_NODE_COLORS[index % PARTICLE_NODE_COLORS.length];
        context.beginPath();
        context.arc(positions[index * 2], positions[index * 2 + 1], radius, 0, Math.PI * 2);
        context.fill();
      }

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
      loop.setActive(shouldAnimate(visible, document.hidden, Boolean(reduceMotion)));
      updateDiagnostics(loop.isScheduled());
    };

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
      pointerTarget.removeEventListener("pointerenter", onPointerMove);
      pointerTarget.removeEventListener("pointermove", onPointerMove);
      pointerTarget.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
    />
  );
}
