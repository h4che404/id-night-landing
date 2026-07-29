"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function CTAFinal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nombre: "", venue: "", email: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: connect to backend or form service
    setSubmitted(true);
  }

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
            <span className="gradient-text">empieza hoy.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Contanos sobre tu venue y agendamos una demo. Sin compromisos, sin costo inicial.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {submitted ? (
            <div className="glass rounded-2xl p-10 text-center border border-violet-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-white font-semibold text-xl mb-2">¡Listo!</h3>
              <p className="text-slate-400 text-sm">
                Recibimos tu solicitud. Te contactamos dentro de las próximas 24 horas.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 border border-white/8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Tu nombre</label>
                  <input
                    required
                    type="text"
                    placeholder="Juan García"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Nombre del venue</label>
                  <input
                    required
                    type="text"
                    placeholder="Club Nocturno / Bar XYZ"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Email de contacto</label>
                <input
                  required
                  type="email"
                  placeholder="hola@tuvenue.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Solicitar demo gratuita
              </button>
              <p className="text-xs text-slate-600 text-center">
                Sin spam. Te contactamos por email o WhatsApp según prefieras.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
