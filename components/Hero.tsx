"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CredentialCard from "./CredentialCard";
import { stagger, fadeUp, fadeIn } from "./motion";

const stats = [
  { icon: "⚡", label: "Verificación en segundos" },
  { icon: "📱", label: "Sin hardware dedicado" },
  { icon: "👁", label: "Revisión manual incluida" },
  { icon: "📋", label: "Trazabilidad de accesos" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Aurora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob-1 absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-violet-700/25 blur-[130px]" />
        <div className="aurora-blob-2 absolute bottom-0 -right-32 w-[600px] h-[600px] rounded-full bg-cyan-600/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-900/15 blur-[90px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center w-full">
        {/* Copy */}
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3.5 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Control de acceso para la noche
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight text-white mb-7"
          >
            Menos fricción{" "}
            <span className="gradient-text">en la puerta.</span>
            <br />
            Más control sobre{" "}
            <span className="gradient-text">cada ingreso.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
            ID-Night permite validar identidad, edad y credenciales digitales en segundos,
            con revisión manual y trazabilidad completa desde cualquier celular.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-14">
            <a
              href="https://admin.idnight.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-xl shadow-violet-500/25 text-center"
            >
              Solicitar demo gratuita
            </a>
            <Link
              href="/como-funciona"
              className="px-7 py-3.5 rounded-xl glass text-white font-medium text-sm hover:bg-white/8 transition-all text-center border border-white/8"
            >
              Ver cómo funciona →
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger(0.08)}
            className="grid grid-cols-2 gap-3 pt-8 border-t border-white/6"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="flex items-center gap-2.5">
                <span className="text-lg">{s.icon}</span>
                <span className="text-xs text-slate-400">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center lg:justify-end"
        >
          <CredentialCard />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08080F] to-transparent pointer-events-none" />
    </section>
  );
}
