"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { stagger, fadeUp } from "@/components/motion";
import VisualCredencial from "@/components/visuals/VisualCredencial";
import VisualAcceso from "@/components/visuals/VisualAcceso";
import VisualDashboard from "@/components/visuals/VisualDashboard";
import VisualBiometrico from "@/components/visuals/VisualBiometrico";

const TABS = [
  {
    id: "credencial",
    label: "Credencial digital",
    subtitle:
      "El usuario valida su DNI y selfie una sola vez y obtiene una credencial digital reutilizable en todos los venues adheridos a ID-Night.",
  },
  {
    id: "acceso",
    label: "Control de acceso",
    subtitle:
      "El portero escanea la credencial desde cualquier celular. En 2 segundos sabe si el ingreso es válido, sin llamadas, sin papel, sin fricción.",
  },
  {
    id: "dashboard",
    label: "Panel del venue",
    subtitle:
      "El dueño del venue ve en tiempo real quién entró, qué validaciones están pendientes y qué incidentes hubo, todo desde el panel web.",
  },
  {
    id: "biometrico",
    label: "Validación biométrica",
    subtitle:
      "El motor biométrico compara el DNI con la selfie. Cuando hay dudas, la validación pasa automáticamente a revisión manual antes de emitir la credencial.",
  },
];

const VISUAL_MAP: Record<string, React.ComponentType> = {
  credencial: VisualCredencial,
  acceso: VisualAcceso,
  dashboard: VisualDashboard,
  biometrico: VisualBiometrico,
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState("credencial");
  const [progressKey, setProgressKey] = useState(0);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 3D tilt
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { stiffness: 150, damping: 20, restDelta: 0.001 });
  const smoothY = useSpring(rawY, { stiffness: 150, damping: 20, restDelta: 0.001 });
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6]);
  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
  };

  const startCycle = useCallback(() => {
    if (cycleRef.current) clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => {
      setActiveTab((current) => {
        const idx = TABS.findIndex((t) => t.id === current);
        return TABS[(idx + 1) % TABS.length].id;
      });
      setProgressKey((k) => k + 1);
    }, 4000);
  }, []);

  useEffect(() => {
    startCycle();
    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [startCycle]);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setProgressKey((k) => k + 1);
    startCycle();
  };

  const ActiveVisual = VISUAL_MAP[activeTab];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob-1 absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-violet-700/25 blur-[130px]" />
        <div className="aurora-blob-2 absolute bottom-0 -right-32 w-[600px] h-[600px] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-900/15 blur-[90px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left — copy */}
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3.5 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Control de acceso · Buenos Aires, Argentina
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight text-white mb-7"
          >
            La plataforma que controla{" "}
            <span className="gradient-text">quién entra.</span>
          </motion.h1>

          {/* Feature tabs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <div key={tab.id} className="relative flex flex-col">
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                      active
                        ? "text-white border-transparent gradient-border"
                        : "glass text-slate-400 border-white/8 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                  {active && (
                    <motion.div
                      key={`progress-${tab.id}-${progressKey}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="h-0.5 mt-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
                    />
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Animated subtitle */}
          <motion.div variants={fadeUp} className="mb-10 min-h-[4rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-lg text-slate-400 leading-relaxed max-w-lg"
              >
                {TABS.find((t) => t.id === activeTab)?.subtitle}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://admin.idnight.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-xl shadow-violet-500/25 text-center"
            >
              Solicitar demo
            </a>
            <Link
              href="/productos"
              className="px-7 py-3.5 rounded-xl glass text-white font-medium text-sm hover:bg-white/8 transition-all text-center border border-white/8"
            >
              Ver productos →
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — 3D visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center lg:justify-end"
        >
          <div
            style={{ perspective: "1200px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-md"
          >
            <motion.div style={{ rotateX, rotateY }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActiveVisual />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08080F] to-transparent pointer-events-none" />
    </section>
  );
}
