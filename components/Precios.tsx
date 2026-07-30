"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { stagger, fadeUp, scaleIn } from "./motion";

const plans = [
  {
    name: "Piloto",
    tag: "Para empezar",
    desc: "Para boliches, bares y eventos que quieren probar ID-Night antes de escalar.",
    features: ["App de puerta", "Panel básico de accesos", "Revisión manual incluida", "Acompañamiento inicial"],
    highlight: false,
  },
  {
    name: "Pro",
    tag: "Plan previsto",
    desc: "Para venues con operación frecuente que necesitan control real cada noche.",
    features: ["App de puerta multi-operador", "Panel completo + reportes", "Historial de accesos", "Gestión de personal", "Soporte prioritario"],
    highlight: true,
  },
  {
    name: "Enterprise",
    tag: "Para escala",
    desc: "Para productoras, cadenas de venues o festivales con necesidades custom.",
    features: ["Todo lo de Pro", "Integración por API", "Multi-venue centralizado", "Acuerdos de servicio", "Implementación dedicada", "Facturación corporativa"],
    highlight: false,
  },
];

export default function Precios() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-6 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={stagger(0.08)} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-14">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Precios</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-3 mb-5 tracking-tight leading-tight">
              Planes pensados para cada operación.{" "}
              <span className="gradient-text">Detalles en el lanzamiento.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl">
              Estamos definiendo la propuesta comercial. Por ahora podés conocer
              qué incluirá cada nivel, sin precios ni contrataciones activas.
            </p>
          </motion.div>

          <motion.div variants={stagger(0.1)} className="grid md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl p-6 flex flex-col transition-all ${
                  plan.highlight
                    ? "gradient-border shadow-2xl shadow-violet-500/10"
                    : "glass border border-white/6 hover:border-white/12"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/30">
                      {plan.tag}
                    </span>
                  </div>
                )}

                <div className={plan.highlight ? "mt-3" : ""}>
                  {!plan.highlight && (
                    <span className="text-xs text-slate-500 block mb-3">{plan.tag}</span>
                  )}
                  <h2 className="text-white font-bold text-2xl mb-2">{plan.name}</h2>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">{plan.desc}</p>

                  <p className="text-sm font-semibold tracking-wide text-violet-300 mb-6">
                    PRÓXIMAMENTE
                  </p>

                  <ul className="space-y-2.5 flex-1 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <span
                    aria-disabled="true"
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                      plan.highlight
                        ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                        : "glass border border-white/10 text-white"
                    }`}
                  >
                    PRÓXIMAMENTE
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="text-center text-slate-600 text-xs mt-8">
            Los precios y las condiciones comerciales se publicarán cuando se habilite el servicio.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
