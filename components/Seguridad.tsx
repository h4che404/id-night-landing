"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    icon: "👁",
    title: "Revisión humana cuando hay dudas",
    desc: "Ninguna decisión crítica es 100% automática. Cuando el sistema detecta incertidumbre, la validación pasa a revisión manual antes de emitir la credencial.",
  },
  {
    icon: "🔐",
    title: "Datos visibles solo para personal autorizado",
    desc: "El venue accede únicamente a la información necesaria para operar el ingreso. No ve datos sensibles adicionales del usuario.",
  },
  {
    icon: "📜",
    title: "Trazabilidad de acciones del personal",
    desc: "Cada acción dentro del panel queda registrada. Sabés quién validó qué ingreso, cuándo y con qué resultado.",
  },
  {
    icon: "🎯",
    title: "Información mínima necesaria",
    desc: "Solo pedimos lo indispensable para validar identidad y edad. No acumulamos datos que no necesitamos para operar.",
  },
  {
    icon: "🚫",
    title: "Sin decisiones automáticas irreversibles",
    desc: "Una credencial rechazada puede ser revisada. No hay bloqueos permanentes automáticos sin intervención humana.",
  },
  {
    icon: "🛡",
    title: "Sin listas negras permanentes",
    desc: "El sistema no genera listas negras de usuarios de forma automática. Las restricciones las define el venue, con criterios explícitos.",
  },
];

export default function Seguridad() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="seguridad" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Seguridad y privacidad
          </span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4 tracking-tight">
            La confianza es{" "}
            <span className="gradient-text">parte del producto</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Trabajamos con datos de identidad. Eso nos obliga a ser claros sobre
            cómo los usamos, quién los ve y qué no hacemos con ellos.
          </p>
        </motion.div>

        {/* Shield visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <div className="glass rounded-2xl p-8 border border-cyan-500/10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-violet-600/20 border border-cyan-500/20 flex items-center justify-center text-3xl mx-auto mb-4">
              🛡
            </div>
            <p className="text-white font-semibold text-xl mb-2">
              No tomamos decisiones críticas sin revisión humana cuando hay dudas.
            </p>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Este principio no es un feature. Es la base de cómo diseñamos el sistema.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true, margin: "-60px" }}
              className="glass rounded-xl p-5 hover:border-cyan-500/20 transition-colors border border-white/6"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <p className="text-white text-sm font-semibold mb-2">{item.title}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
