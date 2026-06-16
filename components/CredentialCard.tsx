"use client";

import { motion } from "framer-motion";

export default function CredentialCard() {
  return (
    <div className="relative w-full max-w-sm">
      {/* Glow behind card */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-cyan-500/20 rounded-3xl blur-2xl scale-110" />

      {/* Main credential card */}
      <div className="card-float relative glass rounded-2xl p-6 border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">ID</span>
            </div>
            <span className="text-white text-sm font-semibold">ID-Night</span>
          </div>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium">
            ✓ Verificado
          </span>
        </div>

        {/* User info */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-800/60 to-violet-600/40 flex items-center justify-center text-2xl border border-violet-500/20">
            👤
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Martín González</p>
            <p className="text-slate-400 text-xs">+18 · DNI verificado</p>
            <p className="text-slate-500 text-xs mt-0.5">Buenos Aires, AR</p>
          </div>
        </div>

        {/* QR area */}
        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4 mb-4 border border-white/5">
          {/* Fake QR */}
          <div className="w-14 h-14 grid grid-cols-4 gap-0.5 flex-shrink-0">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`w-full aspect-square rounded-[1px] ${
                  [0,1,4,5,2,7,8,10,11,13,14,15].includes(i)
                    ? "bg-white"
                    : "bg-transparent"
                }`}
              />
            ))}
          </div>
          <div>
            <p className="text-white text-xs font-medium">Credencial activa</p>
            <p className="text-slate-500 text-xs mt-1">Válida para todos los venues adheridos</p>
            <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Emitida: 15/06/2026</span>
          <span className="text-violet-400">ID: #MGZ-4821</span>
        </div>
      </div>

      {/* Secondary floating card — portero app */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute -bottom-8 -right-6 glass rounded-xl p-3 border border-white/10 w-44"
        style={{ animationDelay: "2.5s" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 text-xs">✓</span>
          </div>
          <span className="text-white text-xs font-medium">Acceso permitido</span>
        </div>
        <p className="text-slate-500 text-xs">Identidad y edad confirmadas</p>
        <div className="mt-2 text-xs text-slate-600 flex items-center gap-1">
          <span>📱</span>
          <span>App de puerta</span>
        </div>
      </motion.div>
    </div>
  );
}
