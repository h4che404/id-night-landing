"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp, scaleIn } from "./motion";

const pillars = [
  { icon: "👁", title: "Revisión humana cuando hay dudas", desc: "Ninguna decisión crítica es 100% automática. La incertidumbre pasa a revisión manual antes de emitir la credencial." },
  { icon: "🔐", title: "Datos visibles solo para personal autorizado", desc: "El venue accede únicamente a la información necesaria para operar el ingreso." },
  { icon: "📜", title: "Trazabilidad de acciones del personal", desc: "Cada acción dentro del panel queda registrada: quién validó qué ingreso, cuándo y con qué resultado." },
  { icon: "🎯", title: "Información mínima necesaria", desc: "Solo pedimos lo indispensable para validar identidad y edad. No acumulamos datos que no necesitamos." },
  { icon: "🚫", title: "Sin decisiones automáticas irreversibles", desc: "Una credencial rechazada puede ser revisada. No hay bloqueos permanentes sin intervención humana." },
  { icon: "🛡", title: "Restricciones definidas por el venue", desc: "Las restricciones las define el venue con criterios explícitos y revisables." },
];

export default function Seguridad() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-6 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={stagger(0.08)} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-10">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Seguridad y privacidad</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-3 mb-5 tracking-tight leading-tight">
              La confianza es{" "}
              <span className="gradient-text">parte del producto</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl">
              Trabajamos con datos de identidad. Eso nos obliga a ser claros
              sobre cómo los usamos, quién los ve y qué no hacemos con ellos.
            </p>
          </motion.div>

          {/* Main principle */}
          <motion.div
            variants={scaleIn}
            className="mb-8 rounded-2xl p-7 border border-cyan-500/15"
            style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.06), rgba(124,58,237,0.06))" }}
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-violet-600/20 border border-cyan-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                🛡
              </div>
              <div>
                <p className="text-white font-bold text-xl mb-2 leading-snug">
                  No tomamos decisiones críticas sin revisión humana cuando hay dudas.
                </p>
                <p className="text-slate-400 text-sm">
                  Este principio no es un feature. Es la base de cómo diseñamos el sistema.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={stagger(0.07)} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -3, borderColor: "rgba(6,182,212,0.2)" }}
                className="glass rounded-xl p-5 border border-white/6 transition-colors cursor-default"
              >
                <div className="text-2xl mb-3.5">{item.icon}</div>
                <p className="text-white text-sm font-semibold mb-2 leading-snug">{item.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
