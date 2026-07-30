"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTAFinal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section id="contacto" className="py-28 px-6 bg-[#0A0A14] relative overflow-hidden">
      {/* Aurora */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-700/15 blur-[100px]" />
        <div className="absolute -top-20 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-600/10 blur-[80px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Tu puerta más inteligente{" "}
            <span className="gradient-text">está en camino.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Las demos y las consultas comerciales se habilitarán cuando el servicio esté listo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="glass rounded-2xl p-8 border border-violet-500/20 text-center">
            <span
              aria-disabled="true"
              className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm cursor-not-allowed opacity-80"
            >
              PRÓXIMAMENTE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
