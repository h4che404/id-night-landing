"use client";

import { motion } from "framer-motion";

const QR_PATTERN = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

export default function VisualCredencial() {
  return (
    <div className="relative w-full max-w-[360px] mx-auto">
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 to-cyan-500/15 rounded-3xl blur-3xl" />

      {/* Floating card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl overflow-hidden border border-white/10"
        style={{ background: "linear-gradient(145deg, rgba(15,15,26,0.97), rgba(10,10,18,0.99))" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-cyan-900/10 pointer-events-none" />

        {/* Gradient strip */}
        <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-violet-400 to-cyan-500" />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <span className="text-white font-bold text-sm">ID</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">ID-Night</p>
                <p className="text-slate-500 text-xs mt-0.5">Credencial Digital</p>
              </div>
            </div>
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Activa
            </motion.span>
          </div>

          {/* User row */}
          <div className="flex items-center gap-4 mb-5 p-3 rounded-xl bg-white/4 border border-white/6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-800/80 to-violet-600/50 flex items-center justify-center text-xl border border-violet-500/20 flex-shrink-0">
              👤
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm">Martín González</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded text-[10px]">
                  +18
                </span>
                <span className="text-xs text-slate-400">DNI verificado</span>
              </div>
            </div>
          </div>

          {/* QR section */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/6 mb-4">
            {/* QR grid */}
            <div className="w-16 h-16 p-1.5 bg-white rounded-lg flex-shrink-0">
              <div
                className="w-full h-full grid"
                style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: "1px" }}
              >
                {QR_PATTERN.flat().map((cell, i) => (
                  <div
                    key={i}
                    className="rounded-[1px]"
                    style={{ background: cell ? "#08080F" : "transparent" }}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold mb-1">Credencial activa</p>
              <p className="text-slate-500 text-xs leading-relaxed mb-2">
                Válida en todos los venues adheridos
              </p>
              <div className="h-1 w-full bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
                />
              </div>
              <p className="text-slate-600 text-[10px] mt-1">78% venues adheridos</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Emitida: 15/06/2026</span>
            <span className="text-violet-400 font-mono">#MGZ-4821</span>
          </div>
        </div>
      </motion.div>

      {/* Floating chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute -bottom-10 -right-4 rounded-xl p-3 border border-white/10 shadow-2xl"
        style={{ background: "rgba(15,15,26,0.97)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-md bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-400 text-[10px]">✓</span>
          </div>
          <span className="text-white text-xs font-semibold whitespace-nowrap">Acceso permitido</span>
        </div>
        <p className="text-slate-500 text-[10px]">App de puerta · hace 2s</p>
      </motion.div>
    </div>
  );
}
