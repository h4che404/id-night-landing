"use client";

import { motion } from "framer-motion";
import { ClipboardList, ScanFace, Smartphone, Ticket } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { stagger, fadeUp, slideRight } from "./motion";

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "El usuario crea su credencial",
    desc: "Se registra en la app de ID-Night, sube foto de su DNI y una selfie. Menos de 2 minutos.",
    tag: "App del usuario",
    color: "from-violet-600/15 to-violet-600/5",
    border: "border-violet-500/25",
  },
  {
    number: "02",
    icon: ScanFace,
    title: "ID-Night valida identidad y edad",
    desc: "El sistema compara el DNI con la selfie. Si hay dudas, pasa a revisión manual antes de emitir la credencial.",
    tag: "Motor de validación",
    color: "from-indigo-600/15 to-indigo-600/5",
    border: "border-indigo-500/25",
  },
  {
    number: "03",
    icon: Ticket,
    title: "El usuario obtiene su credencial digital",
    desc: "Una credencial reutilizable en todos los boliches y eventos adheridos a ID-Night.",
    tag: "Credencial digital",
    color: "from-cyan-600/15 to-cyan-600/5",
    border: "border-cyan-500/25",
  },
  {
    number: "04",
    icon: ClipboardList,
    title: "El venue controla y registra todo",
    desc: "El portero escanea desde cualquier celular. El panel web registra accesos, revisiones e incidentes en tiempo real.",
    tag: "Panel del venue",
    color: "from-emerald-600/15 to-emerald-600/5",
    border: "border-emerald-500/25",
  },
];

export default function ComoFunciona() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-6 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={stagger(0.08)} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-14">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Cómo funciona</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-3 mb-5 tracking-tight leading-tight">
              Una credencial.{" "}
              <span className="gradient-text">Todos los ingresos.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl">
              El usuario valida su identidad una vez. Después ingresa a cualquier venue
              adherido sin volver a hacer fila de verificación.
            </p>
          </motion.div>

          <motion.div variants={stagger(0.1)} className="grid md:grid-cols-2 gap-4">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={slideRight}
                whileHover={{ y: -3 }}
                className={`rounded-2xl p-6 bg-gradient-to-br ${step.color} border ${step.border} transition-colors group`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <BrandIcon icon={step.icon} className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-slate-500">{step.number}</span>
                      <span className="text-xs text-slate-500 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">
                        {step.tag}
                      </span>
                    </div>
                    <h2 className="text-white font-semibold text-base mb-2 leading-snug">{step.title}</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 glass rounded-2xl p-6 border border-violet-500/12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-sm mb-1">Para el venue</p>
                <p className="text-slate-400 text-sm">Sin hardware. Sin capacitación larga. El portero usa su celular, el dueño ve todo desde el panel web.</p>
              </div>
              <a
                href="https://admin.idnight.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20 text-center"
              >
                Empezar ahora
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
