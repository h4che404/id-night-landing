"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  {
    icon: "🕐",
    label: "Filas lentas en horario pico",
    desc: "El cuello de botella siempre es la puerta. Sin un sistema, el control se vuelve caos.",
  },
  {
    icon: "🪪",
    label: "DNIs falsos o prestados",
    desc: "El ojo humano no puede verificar la autenticidad de un documento en segundos.",
  },
  {
    icon: "👤",
    label: "Personal tomando decisiones sin info",
    desc: "El portero decide solo con lo que ve. Sin contexto, sin respaldo, sin trazabilidad.",
  },
  {
    icon: "📂",
    label: "Sin registro de quién entró",
    desc: "¿Cuántas personas ingresaron anoche? ¿A qué hora? ¿Quién los validó? Sin sistema, no hay respuesta.",
  },
  {
    icon: "⚠️",
    label: "Incidentes difíciles de documentar",
    desc: "Cuando algo sale mal, no hay registro claro de qué pasó ni cómo ingresó esa persona.",
  },
  {
    icon: "🔄",
    label: "Validaciones inconsistentes",
    desc: "Cada portero tiene su propio criterio. El resultado varía cada noche.",
  },
];

function ProblemCard({
  item,
  index,
}: {
  item: (typeof problems)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass rounded-xl p-5 hover:bg-white/6 transition-colors group"
    >
      <div className="text-2xl mb-3">{item.icon}</div>
      <p className="text-white text-sm font-semibold mb-1.5">{item.label}</p>
      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

export default function Problema() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="problema" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            El problema
          </span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4 tracking-tight">
            Lo que pasa en la puerta{" "}
            <span className="gradient-text">cada noche</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Para boliches, bares y eventos, el ingreso es el momento más crítico
            y el menos controlado.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((item, i) => (
            <ProblemCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
