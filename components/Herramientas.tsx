"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  ClipboardList,
  DoorOpen,
  Eye,
  Lock,
  Monitor,
  RefreshCw,
  Smartphone,
  Ticket,
  Users,
  Zap,
} from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { stagger, fadeUp } from "./motion";

const venueFeatures = [
  { icon: Smartphone, title: "App de puerta", desc: "El portero escanea credenciales desde cualquier celular. Sin hardware especial." },
  { icon: Monitor, title: "Panel de administración", desc: "Dashboard web para ver accesos, gestionar personal y revisar validaciones pendientes." },
  { icon: Eye, title: "Revisión manual integrada", desc: "Las validaciones dudosas llegan al panel para que un operador las apruebe o rechace." },
  { icon: ClipboardList, title: "Historial de accesos", desc: "Registro completo: quién entró, cuándo y quién lo validó." },
  { icon: BarChart3, title: "Reportes operativos", desc: "Resúmenes por noche, por evento o por período. Exportables para auditoría." },
  { icon: Users, title: "Gestión de personal", desc: "Controlá qué operador accede a qué función dentro del panel." },
];

const userFeatures = [
  { icon: Ticket, title: "Credencial digital", desc: "Una sola credencial verificada para todos los boliches y eventos adheridos." },
  { icon: Zap, title: "Validación previa al ingreso", desc: "Verificás tu identidad una vez. Cada ingreso siguiente tarda segundos." },
  { icon: DoorOpen, title: "Menos fricción al entrar", desc: "Sin sacar el DNI, sin esperar al portero, sin fricciones innecesarias." },
  { icon: Lock, title: "Control de tus datos", desc: "Podés ver qué información tiene ID-Night sobre vos y solicitar su eliminación." },
  { icon: RefreshCw, title: "Reutilizable", desc: "La misma credencial funciona en cualquier venue adherido, sin registrarte de nuevo." },
];

const TABS = [
  { id: "venue", label: "Para venues", features: venueFeatures },
  { id: "user", label: "Para usuarios", features: userFeatures },
] as const;

export default function Herramientas() {
  const [active, setActive] = useState<"venue" | "user">("venue");
  const features = active === "venue" ? venueFeatures : userFeatures;

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={stagger(0.08)} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-10">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Herramientas</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-3 mb-5 tracking-tight leading-tight">
              Todo lo que necesitás{" "}
              <span className="gradient-text">para operar</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl">
              Un ecosistema completo: app para el usuario, app de puerta para el portero
              y panel web para el dueño del venue.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeUp} className="flex mb-8">
            <div className="glass rounded-xl p-1 flex gap-1 border border-white/6">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active === tab.id ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {active === tab.id && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28 }}
            >
              <motion.div
                variants={stagger(0.06)}
                initial="hidden"
                animate="show"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={fadeUp}
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="glass rounded-xl p-5 border border-white/6 hover:border-white/12 transition-colors cursor-default"
                  >
                    <div className="mb-3.5">
                      <BrandIcon icon={feature.icon} className="w-6 h-6" />
                    </div>
                    <p className="text-white text-sm font-semibold mb-2">{feature.title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div variants={fadeUp} className="mt-10">
            <a
              href="https://admin.idnight.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
            >
              Solicitar acceso al panel
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
