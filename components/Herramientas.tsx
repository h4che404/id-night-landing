"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const venueFeatures = [
  { icon: "📱", title: "App de puerta", desc: "El portero escanea credenciales desde cualquier celular. Sin hardware especial." },
  { icon: "🖥", title: "Panel de administración", desc: "Dashboard web para ver accesos, gestionar personal y revisar validaciones pendientes." },
  { icon: "👁", title: "Revisión manual integrada", desc: "Las validaciones dudosas llegan al panel para que un operador las apruebe o rechace." },
  { icon: "📋", title: "Historial de accesos", desc: "Registro completo de cada ingreso: quién entró, cuándo y quién lo validó." },
  { icon: "📊", title: "Reportes operativos", desc: "Resúmenes por noche, por evento o por período. Exportables para auditoría." },
  { icon: "👥", title: "Gestión de personal", desc: "Controlá qué operador tiene acceso a qué funciones dentro del panel." },
];

const userFeatures = [
  { icon: "🎫", title: "Credencial digital", desc: "Una sola credencial verificada para todos los boliches y eventos adheridos." },
  { icon: "⚡", title: "Validación previa al ingreso", desc: "Verificás tu identidad una vez. Después, cada ingreso es cuestión de segundos." },
  { icon: "🚪", title: "Menos fricción al entrar", desc: "Sin sacar el DNI, sin esperar al portero, sin fricciones innecesarias." },
  { icon: "🔒", title: "Control de tus datos", desc: "Podés ver qué información tiene ID-Night sobre vos y solicitar su eliminación." },
  { icon: "🔄", title: "Reutilizable", desc: "La misma credencial funciona en cualquier venue adherido, sin registrarte de nuevo." },
];

const tabs = [
  { id: "venue", label: "Para venues" },
  { id: "user", label: "Para usuarios" },
];

export default function Herramientas() {
  const [activeTab, setActiveTab] = useState<"venue" | "user">("venue");
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  const features = activeTab === "venue" ? venueFeatures : userFeatures;

  return (
    <section id="herramientas" className="py-28 px-6 bg-[#0A0A14]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Herramientas
          </span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4 tracking-tight">
            Todo lo que necesitás{" "}
            <span className="gradient-text">para operar</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Un ecosistema completo: app para el usuario, app de puerta para el portero
            y panel web para el dueño del venue.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="glass rounded-xl p-1 flex gap-1 border border-white/6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "venue" | "user")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="glass rounded-xl p-5 hover:bg-white/6 transition-colors border border-white/6 group"
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <p className="text-white text-sm font-semibold mb-1.5">{feature.title}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
