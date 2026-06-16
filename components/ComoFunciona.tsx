"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: "📲",
    title: "El usuario crea su credencial",
    desc: "Se registra en la app de ID-Night, sube una foto de su DNI y una selfie. El proceso tarda menos de 2 minutos.",
    tag: "App del usuario",
  },
  {
    number: "02",
    icon: "🔍",
    title: "ID-Night valida identidad y edad",
    desc: "El sistema compara el DNI con la selfie. Si hay dudas, la validación pasa a revisión manual antes de emitir la credencial.",
    tag: "Motor de validación",
  },
  {
    number: "03",
    icon: "🎫",
    title: "El usuario obtiene una credencial digital",
    desc: "Una vez validado, el usuario tiene una credencial reutilizable en todos los boliches y eventos adheridos a ID-Night.",
    tag: "Credencial digital",
  },
  {
    number: "04",
    icon: "📋",
    title: "El venue controla el ingreso y registra todo",
    desc: "El portero escanea la credencial desde cualquier celular. El panel web registra accesos, revisiones e incidentes en tiempo real.",
    tag: "Panel del venue",
  },
];

function Step({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative flex gap-6"
    >
      {/* Left — number + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center text-lg">
          {step.icon}
        </div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
            className="w-px flex-1 mt-3 origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(124,58,237,0.4), rgba(6,182,212,0.1))",
            }}
          />
        )}
      </div>

      {/* Right — content */}
      <div className="pb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-violet-400">{step.number}</span>
          <span className="text-xs text-slate-500 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">
            {step.tag}
          </span>
        </div>
        <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function ComoFunciona() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="como-funciona" className="py-28 px-6 bg-[#0A0A14]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left — title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="sticky top-32"
        >
          <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Cómo funciona
          </span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-5 tracking-tight leading-tight">
            Una credencial. <br />
            <span className="gradient-text">Todos los ingresos.</span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            El usuario valida su identidad una vez. Después, puede ingresar a cualquier
            boliche o evento adherido a ID-Night sin volver a hacer fila de verificación.
          </p>
          <div className="glass rounded-xl p-4 border border-violet-500/15">
            <p className="text-xs text-violet-400 font-medium mb-1">Para el venue</p>
            <p className="text-sm text-slate-400">
              Sin hardware. Sin capacitación larga. El portero usa la app de puerta
              desde su celular y el dueño ve todo desde el panel web.
            </p>
          </div>
        </motion.div>

        {/* Right — steps */}
        <div className="pt-2">
          {steps.map((step, i) => (
            <Step key={step.number} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
