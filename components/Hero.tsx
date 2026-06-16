"use client";

import { motion } from "framer-motion";
import CredentialCard from "./CredentialCard";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob-1 absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="aurora-blob-2 absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-violet-900/10 blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left — Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Control de acceso para la noche
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-white mb-6"
          >
            Menos fricción{" "}
            <span className="gradient-text">en la puerta.</span>{" "}
            Más control sobre cada ingreso.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg"
          >
            ID-Night permite validar identidad, edad y credenciales digitales en segundos,
            con revisión manual y trazabilidad completa desde cualquier celular.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#contacto"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity text-center"
            >
              Solicitar demo
            </a>
            <a
              href="#como-funciona"
              className="px-6 py-3 rounded-xl glass text-white font-medium text-sm hover:bg-white/8 transition-all text-center"
            >
              Ver cómo funciona →
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-white/6 grid grid-cols-2 gap-6"
          >
            {[
              { label: "Verificación en segundos", icon: "⚡" },
              { label: "Sin hardware dedicado", icon: "📱" },
              { label: "Revisión manual incluida", icon: "👁" },
              { label: "Trazabilidad de accesos", icon: "📋" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="text-base">{stat.icon}</span>
                <span className="text-xs text-slate-400">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Credential card mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <CredentialCard />
        </motion.div>
      </div>
    </section>
  );
}
