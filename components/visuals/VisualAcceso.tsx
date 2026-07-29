"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BatteryFull, Check } from "lucide-react";

const RECENT_ENTRIES = [
  { name: "Laura Martínez", time: "23:41" },
  { name: "Federico Ruiz", time: "23:40" },
  { name: "Valentina López", time: "23:38" },
];

export default function VisualAcceso() {
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    const cycle = () => {
      setAccessGranted(true);
      setTimeout(() => setAccessGranted(false), 1500);
    };
    // First trigger at 2.5s, then every 4.5s
    const initial = setTimeout(cycle, 2500);
    const interval = setInterval(cycle, 4500);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/15 to-cyan-500/10 rounded-3xl blur-3xl" />

      {/* Phone frame */}
      <div
        className="relative rounded-3xl border-2 border-white/15 overflow-hidden shadow-2xl"
        style={{ background: "rgba(10,10,18,0.98)" }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="text-white text-xs font-semibold">23:42</span>
          <BatteryFull className="w-3.5 h-3.5 text-white" aria-hidden="true" />
        </div>

        <div className="px-4 pb-6">
          {/* App header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-[9px]">ID</span>
              </div>
              <p className="text-white text-sm font-semibold">App de puerta</p>
            </div>
            <p className="text-slate-500 text-[11px]">Venue La Noche</p>
          </div>

          {/* QR scan area */}
          <div className="relative rounded-2xl border-2 border-dashed border-violet-500/40 h-36 flex items-center justify-center mb-4 overflow-hidden">
            <div className="absolute inset-0 bg-violet-500/5" />
            {/* Corner markers */}
            {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-4 h-4 border-violet-500`} style={{
                borderTopWidth: i < 2 ? 2 : 0,
                borderBottomWidth: i >= 2 ? 2 : 0,
                borderLeftWidth: i % 2 === 0 ? 2 : 0,
                borderRightWidth: i % 2 === 1 ? 2 : 0,
                borderStyle: "solid",
                borderColor: "rgb(139,92,246)",
              }} />
            ))}
            {/* Scanning line */}
            <motion.div
              animate={{ y: [-56, 56] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
              className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent"
            />
            <div className="relative text-center">
              <p className="text-slate-400 text-xs">Escaneando...</p>
              <p className="text-slate-600 text-[10px] mt-1">Apuntá la cámara al QR</p>
            </div>
          </div>

          {/* Recent entries */}
          <div className="space-y-1.5 mb-4">
            <p className="text-slate-600 text-[10px] uppercase tracking-wider mb-2">Últimos ingresos</p>
            {RECENT_ENTRIES.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span className="text-white text-xs">{entry.name}</span>
                </div>
                <span className="text-slate-600 text-[10px]">{entry.time}</span>
              </div>
            ))}
          </div>

          {/* Access state */}
          <AnimatePresence mode="wait">
            {accessGranted ? (
              <motion.div
                key="granted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span className="text-emerald-400 text-sm font-semibold">Acceso confirmado</span>
              </motion.div>
            ) : (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="py-2.5 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center gap-2"
              >
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="text-violet-400 text-xs"
                >
                  ●
                </motion.span>
                <span className="text-slate-400 text-sm">Esperando escaneo</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
