"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUSES = [
  { text: "Analizando DNI...", done: false },
  { text: "Comparando con selfie...", done: false },
  { text: "Identidad confirmada ✓", done: true },
];

const RING_DELAYS = [0, 0.4, 0.8];

export default function VisualBiometrico() {
  const [statusIdx, setStatusIdx] = useState(0);
  const isConfirmed = statusIdx === 2;

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUSES.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const ringColor = isConfirmed
    ? "border-emerald-500/50"
    : "border-violet-500/40";

  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      {/* Glow */}
      <div
        className={`absolute -inset-4 rounded-3xl blur-3xl transition-all duration-700 ${
          isConfirmed
            ? "bg-emerald-500/15"
            : "bg-gradient-to-br from-violet-600/20 to-cyan-500/10"
        }`}
      />

      <div
        className="relative rounded-2xl border border-white/10 overflow-hidden p-8"
        style={{ background: "rgba(15,15,26,0.97)" }}
      >
        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-white text-sm font-semibold">Motor Biométrico</p>
          <p className="text-slate-500 text-xs mt-1">ID-Night · Verificación automática</p>
        </div>

        {/* Concentric rings + face */}
        <div className="relative flex items-center justify-center mb-8" style={{ height: 180 }}>
          {/* Rings */}
          {RING_DELAYS.map((delay, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.08 + i * 0.06, 1],
                opacity: [0.3, 0.7 - i * 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute rounded-full border-2 ${ringColor} transition-colors duration-700`}
              style={{
                width: 80 + i * 48,
                height: 80 + i * 48,
              }}
            />
          ))}

          {/* Face center */}
          <motion.div
            animate={{ scale: isConfirmed ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.4 }}
            className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-2 text-3xl transition-all duration-500 ${
              isConfirmed
                ? "bg-emerald-500/15 border-emerald-500/40"
                : "bg-violet-500/10 border-violet-500/30"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isConfirmed ? "happy" : "neutral"}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                {isConfirmed ? "😊" : "😐"}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-1.5 w-full bg-white/8 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              className={`h-full rounded-full transition-all duration-500 ${
                isConfirmed
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                  : "bg-gradient-to-r from-violet-600 to-cyan-500"
              }`}
            />
          </div>
        </div>

        {/* Status text */}
        <div className="text-center min-h-[2rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className={`text-sm font-medium transition-colors duration-300 ${
                isConfirmed ? "text-emerald-400" : "text-slate-400"
              }`}
            >
              {STATUSES[statusIdx].text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
