"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import AnimatedSection from "@/components/AnimatedSection";

type FormState = {
  nombre: string;
  venue: string;
  email: string;
  mensaje: string;
};

const INITIAL_STATE: FormState = { nombre: "", venue: "", email: "", mensaje: "" };

export default function ContactoPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <AnimatedPage>
          {/* Header */}
          <AnimatedSection className="mb-12">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
              <span>›</span>
              <Link href="/recursos" className="hover:text-slate-400 transition-colors">Recursos</Link>
              <span>›</span>
              <span className="text-slate-400">Contacto</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Hablá con <span className="gradient-text">el equipo</span>
            </h1>
            <p className="text-slate-400 leading-relaxed">
              ¿Tenés dudas sobre precios, implementación o querés coordinar una demo? Completá el formulario y te contactamos.
            </p>
          </AnimatedSection>

          {/* Form or success */}
          <AnimatedSection>
            {submitted ? (
              <div className="p-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-8 h-8 text-emerald-400" aria-hidden="true" />
                </div>
                <h2 className="text-white text-xl font-semibold mb-2">¡Mensaje enviado!</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Gracias por escribirnos. Te vamos a responder en las próximas 24 horas hábiles.
                </p>
                <button
                  onClick={() => { setForm(INITIAL_STATE); setSubmitted(false); }}
                  className="text-violet-400 text-sm hover:text-violet-300 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1.5" htmlFor="nombre">
                      Nombre *
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl border border-white/8 bg-white/4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1.5" htmlFor="venue">
                      Venue / Empresa *
                    </label>
                    <input
                      id="venue"
                      name="venue"
                      type="text"
                      required
                      value={form.venue}
                      onChange={handleChange}
                      placeholder="Nombre de tu local o empresa"
                      className="w-full px-4 py-3 rounded-xl border border-white/8 bg-white/4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-1.5" htmlFor="email">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-white/4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-1.5" htmlFor="mensaje">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={5}
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Contanos en qué podemos ayudarte..."
                    className="w-full px-4 py-3 rounded-xl border border-white/8 bg-white/4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-xl shadow-violet-500/20"
                >
                  Enviar mensaje
                </button>

                <p className="text-slate-600 text-xs text-center">
                  También podés escribirnos directo a{" "}
                  <a href="mailto:hola@idnight.app" className="text-violet-400 hover:text-violet-300 transition-colors">
                    hola@idnight.app
                  </a>
                </p>
              </form>
            )}
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
