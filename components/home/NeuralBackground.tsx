"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Point = {
  x: number;
  y: number;
  phase: number;
  speed: number;
};

function createPoints(count: number): Point[] {
  return Array.from({ length: count }, (_, index) => ({
    x: ((index * 47) % 101) / 100,
    y: ((index * 71 + 19) % 97) / 96,
    phase: index * 0.83,
    speed: 0.7 + (index % 5) * 0.08,
  }));
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const points = createPoints(window.innerWidth < 640 ? 15 : 24);
    const pointer = { x: 0.5, y: 0.5, active: false };
    let frameId = 0;
    let visible = true;
    let lastFrame = 0;

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const elapsed = reduceMotion ? 0 : time * 0.00008;
      const positions = points.map((point) => {
        const driftX = Math.sin(elapsed * point.speed + point.phase) * 0.025;
        const driftY = Math.cos(elapsed * 0.8 * point.speed + point.phase) * 0.03;
        const baseX = (point.x + driftX) * width;
        const baseY = (point.y + driftY) * height;
        const pointerX = pointer.x * width;
        const pointerY = pointer.y * height;
        const distance = Math.hypot(baseX - pointerX, baseY - pointerY);
        const influence = pointer.active ? Math.max(0, 1 - distance / 300) * 10 : 0;

        return {
          x: baseX + (pointerX - baseX) * influence * 0.012,
          y: baseY + (pointerY - baseY) * influence * 0.012,
        };
      });

      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;

      for (let index = 0; index < positions.length; index += 1) {
        for (let otherIndex = index + 1; otherIndex < positions.length; otherIndex += 1) {
          const from = positions[index];
          const to = positions[otherIndex];
          const distance = Math.hypot(from.x - to.x, from.y - to.y);
          const threshold = Math.min(210, width * 0.24);

          if (distance > threshold) continue;
          const gradient = context.createLinearGradient(from.x, from.y, to.x, to.y);
          const alpha = (1 - distance / threshold) * 0.22;
          gradient.addColorStop(0, `rgba(56, 189, 248, ${alpha})`);
          gradient.addColorStop(1, `rgba(124, 58, 237, ${alpha})`);
          context.strokeStyle = gradient;
          context.beginPath();
          context.moveTo(from.x, from.y);
          context.lineTo(to.x, to.y);
          context.stroke();
        }
      }

      positions.forEach((point, index) => {
        const radius = index % 6 === 0 ? 2.8 : 1.8;
        context.fillStyle = index % 3 === 0 ? "rgba(167, 139, 250, 0.72)" : "rgba(103, 232, 249, 0.7)";
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fill();
      });
    };

    const animate = (time: number) => {
      if (visible && !document.hidden && time - lastFrame >= 33) {
        draw(time);
        lastFrame = time;
      }
      frameId = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.active = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      if (pointer.active) {
        pointer.x = (event.clientX - bounds.left) / bounds.width;
        pointer.y = (event.clientY - bounds.top) / bounds.height;
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    resize();

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      frameId = window.requestAnimationFrame(animate);
    }

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frameId);
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
