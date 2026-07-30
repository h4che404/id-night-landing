"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, FolderOpen, IdCard, RefreshCw, UserRound } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { stagger, fadeUp } from "./motion";

const problems = [
  { icon: Clock, label: "Filas lentas en horario pico", desc: "El cuello de botella siempre es la puerta. Sin sistema, el control se vuelve caos." },
  { icon: IdCard, label: "DNIs falsos o prestados", desc: "El ojo humano no puede verificar la autenticidad de un documento en segundos." },
  { icon: UserRound, label: "Personal tomando decisiones sin info", desc: "El portero decide solo con lo que ve. Sin contexto, sin respaldo, sin trazabilidad." },
  { icon: FolderOpen, label: "Sin registro de quién entró", desc: "¿Cuántas personas ingresaron anoche? ¿A qué hora? Sin sistema, no hay respuesta." },
  { icon: AlertTriangle, label: "Incidentes difíciles de documentar", desc: "Cuando algo sale mal, no hay registro claro de cómo ingresó esa persona." },
  { icon: RefreshCw, label: "Validaciones inconsistentes", desc: "Cada portero tiene su propio criterio. El resultado varía cada noche." },
];

export default function Problema() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-6 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="mb-14">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">El problema</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-3 mb-5 tracking-tight leading-tight">
              Lo que pasa en la puerta{" "}
              <span className="gradient-text">cada noche</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl">
              Para boliches, bares y eventos, el ingreso es el momento más crítico
              y el menos controlado.
            </p>
          </motion.div>

          <motion.div
            variants={stagger(0.07)}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {problems.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                whileHover={{ y: -3, scale: 1.01 }}
                className="glass rounded-xl p-5 border border-white/6 hover:border-white/12 transition-colors group cursor-default"
              >
                <div className="mb-3.5">
                  <BrandIcon icon={item.icon} className="w-6 h-6" />
                </div>
                <p className="text-white text-sm font-semibold mb-2 leading-snug">{item.label}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA inline */}
          <motion.div variants={fadeUp} className="mt-12 flex items-center gap-4">
            <span
              aria-disabled="true"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/20 cursor-not-allowed opacity-80"
            >
              PRÓXIMAMENTE
            </span>
            <span className="text-slate-500 text-sm">La demo estará disponible en el lanzamiento.</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
