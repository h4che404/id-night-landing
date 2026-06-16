"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "Piloto",
    tag: "Para empezar",
    desc: "Para boliches, bares y eventos que quieren probar ID-Night antes de escalar.",
    price: "Consultar",
    cta: "Solicitar piloto",
    features: [
      "Hasta 200 validaciones/mes",
      "App de puerta",
      "Panel básico de accesos",
      "Revisión manual incluida",
      "Soporte por WhatsApp",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    tag: "Más popular",
    desc: "Para venues con operación frecuente que necesitan control real cada noche.",
    price: "Desde $XX/mes",
    cta: "Solicitar demo",
    features: [
      "Validaciones ilimitadas",
      "App de puerta multi-operador",
      "Panel completo + reportes",
      "Historial de accesos",
      "Gestión de personal",
      "Soporte prioritario",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    tag: "Para escala",
    desc: "Para productoras, cadenas de venues o festivales masivos con necesidades custom.",
    price: "A medida",
    cta: "Hablar con ventas",
    features: [
      "Todo lo de Pro",
      "Integración por API",
      "Multi-venue centralizado",
      "SLA garantizado",
      "Implementación dedicada",
      "Facturación corporativa",
    ],
    highlight: false,
  },
];

export default function Precios() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="precios" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Precios
          </span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4 tracking-tight">
            Empezá con un piloto.{" "}
            <span className="gradient-text">Escalá cuando estés listo.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Sin compromisos largos para empezar. Validamos el sistema con vos antes
            de definir el plan definitivo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? "gradient-border"
                  : "glass border border-white/6"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white">
                    {plan.tag}
                  </span>
                </div>
              )}

              {!plan.highlight && (
                <span className="text-xs text-slate-500 mb-4">{plan.tag}</span>
              )}
              {plan.highlight && <div className="mt-3" />}

              <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">{plan.desc}</p>

              <div className="mb-6">
                <span className="text-2xl font-bold text-white">{plan.price}</span>
                {plan.price.startsWith("Desde") && (
                  <span className="text-slate-500 text-sm ml-1">+ validaciones</span>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-violet-400 mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`text-center py-2.5 rounded-xl text-sm font-medium transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90"
                    : "glass border border-white/10 text-white hover:bg-white/8"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
