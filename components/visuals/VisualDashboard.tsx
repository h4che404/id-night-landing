"use client";

import { motion } from "framer-motion";

const TABLE_DATA = [
  { name: "Sofía Ramírez", time: "23:41", status: "permitido" },
  { name: "Lucas Herrera", time: "23:40", status: "revision" },
  { name: "Camila Torres", time: "23:39", status: "permitido" },
  { name: "Matías Díaz", time: "23:38", status: "permitido" },
  { name: "Romina Acosta", time: "23:36", status: "rechazado" },
];

const STATUS_STYLES: Record<string, { label: string; color: string; icon: string }> = {
  permitido: { label: "Permitido", color: "text-emerald-400", icon: "✓" },
  revision: { label: "En revisión", color: "text-yellow-400", icon: "⏳" },
  rechazado: { label: "Rechazado", color: "text-red-400", icon: "✗" },
};

export default function VisualDashboard() {
  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/15 to-cyan-500/10 rounded-3xl blur-3xl" />

      <div
        className="relative rounded-2xl border border-white/10 overflow-hidden"
        style={{ background: "rgba(15,15,26,0.97)" }}
      >
        {/* Top strip */}
        <div className="h-0.5 w-full bg-gradient-to-r from-violet-600 to-cyan-500" />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-[9px]">ID</span>
              </div>
              <span className="text-white text-sm font-semibold">Panel ID-Night</span>
            </div>
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              En vivo
            </motion.span>
          </div>

          {/* Stat pills */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 px-2.5 py-2 rounded-lg bg-white/4 border border-white/6 text-center">
              <p className="text-white text-sm font-bold">127</p>
              <p className="text-slate-500 text-[10px]">ingresos</p>
            </div>
            <div className="flex-1 px-2.5 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-center">
              <p className="text-yellow-400 text-sm font-bold">3</p>
              <p className="text-slate-500 text-[10px]">en revisión</p>
            </div>
            <div className="flex-1 px-2.5 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-red-400 text-sm font-bold">2</p>
              <p className="text-slate-500 text-[10px]">rechazados</p>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-3 px-2 mb-2">
            <span className="text-slate-600 text-[10px] uppercase tracking-wider">Nombre</span>
            <span className="text-slate-600 text-[10px] uppercase tracking-wider text-center">Hora</span>
            <span className="text-slate-600 text-[10px] uppercase tracking-wider text-right">Estado</span>
          </div>

          {/* Table rows */}
          <div className="space-y-1">
            {TABLE_DATA.map((row, i) => {
              const s = STATUS_STYLES[row.status];
              const isRevision = row.status === "revision";
              return (
                <motion.div
                  key={row.name}
                  animate={isRevision ? { opacity: [0.5, 1, 0.5] } : undefined}
                  transition={isRevision ? { duration: 1.8, repeat: Infinity } : undefined}
                  className={`grid grid-cols-3 items-center px-2 py-2 rounded-lg ${
                    isRevision ? "bg-yellow-500/8 border border-yellow-500/15" : "hover:bg-white/3"
                  }`}
                >
                  <span className="text-white text-xs truncate pr-2">{row.name}</span>
                  <span className="text-slate-500 text-xs text-center">{row.time}</span>
                  <span className={`${s.color} text-xs text-right flex items-center justify-end gap-1`}>
                    <span>{s.icon}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0"
            />
            <span className="text-slate-600 text-[10px]">Última actualización: hace 12s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
