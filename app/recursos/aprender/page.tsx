import type { Metadata } from "next";
import Link from "next/link";
import AnimatedPage from "@/components/AnimatedPage";
import AnimatedSection from "@/components/AnimatedSection";
import {
  buildFaqJsonLd,
  createPageMetadata,
  toJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Aprender — ID-Night",
  description: "Guía de inicio rápido y preguntas frecuentes para venues que empiezan a usar ID-Night.",
  path: "/recursos/aprender",
});

const VENUE_STEPS = [
  {
    step: "1",
    title: "Registrá tu venue",
    description:
      "Ingresá a admin.idnight.app y creá tu cuenta de venue. Completá los datos del local (nombre, dirección, tipo de establecimiento) y configurá los accesos. El proceso tarda menos de 10 minutos.",
  },
  {
    step: "2",
    title: "Configurá los puntos de acceso",
    description:
      "Desde el panel admin, definí cuántos puntos de entrada tiene tu venue y asigná las credenciales de acceso para el personal de puerta. Cada portero descarga la App de puerta y se loguea con su usuario.",
  },
  {
    step: "3",
    title: "Empezá a validar ingresos",
    description:
      "Los usuarios que ya tienen la credencial ID-Night simplemente muestran el QR al portero. Los que no, pueden registrarse en el momento desde su celular. El sistema valida en segundos y el registro queda en el panel.",
  },
];

const FAQS = [
  {
    q: "¿Necesito hardware especial para usar ID-Night?",
    a: "No. La App de puerta funciona en cualquier celular Android o iPhone con cámara. No necesitás lectores de código de barras, terminales ni ningún equipo adicional.",
  },
  {
    q: "¿Qué pasa si un usuario no tiene la credencial al llegar?",
    a: "El portero puede registrarlo en el momento desde la App de puerta. El proceso de verificación tarda menos de 3 minutos y la credencial queda disponible de inmediato.",
  },
  {
    q: "¿Cómo funciona la revisión manual?",
    a: "Cuando el motor biométrico detecta una baja coincidencia entre el DNI y la selfie, la validación se marca como 'En revisión'. El portero ve la alerta en la app y puede aprobar o rechazar manualmente con los documentos a la vista.",
  },
  {
    q: "¿Puedo configurar accesos diferenciados (VIP, staff, artistas)?",
    a: "Sí. Desde el panel admin podés crear categorías de acceso con distintos permisos. Cada categoría tiene su propia configuración de validación y aparece diferenciada en el registro del portero.",
  },
  {
    q: "¿Cómo exporto los datos de ingresos de una noche?",
    a: "Desde el panel admin, accedé a la sección de reportes, seleccioná el rango de fechas y exportá en formato CSV o PDF. El reporte incluye nombre, DNI (parcial por privacidad), hora de ingreso y estado.",
  },
];

const faqJsonLd = buildFaqJsonLd(FAQS);

export default function AprenderPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <AnimatedPage>
          {/* Header */}
          <AnimatedSection className="mb-14">
            <nav className="flex items-center gap-2 text-xs text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
              <span>›</span>
              <Link href="/recursos" className="hover:text-slate-400 transition-colors">Recursos</Link>
              <span>›</span>
              <span className="text-slate-400">Aprender</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Inicio rápido para <span className="gradient-text">venues</span>
            </h1>
            <p className="text-slate-400 leading-relaxed">
              En 3 pasos tu venue puede empezar a usar ID-Night. Sin hardware, sin capacitación larga, sin complicaciones.
            </p>
          </AnimatedSection>

          {/* Quick start steps */}
          <AnimatedSection className="mb-14">
            <h2 className="text-xl font-semibold text-white mb-6">Primeros pasos</h2>
            <div className="space-y-4">
              {VENUE_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-5 p-6 rounded-2xl border border-white/8 bg-[#0F0F1A]"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg shadow-violet-500/25">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1.5">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* FAQ */}
          <AnimatedSection className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="p-5 rounded-xl border border-white/8 bg-[#0F0F1A]"
                >
                  <p className="text-white font-medium text-sm mb-2">{faq.q}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Coming soon */}
          <AnimatedSection>
            <div className="p-6 rounded-2xl border border-white/5 bg-white/2 text-center">
              <p className="text-slate-500 text-sm">
                Videos tutoriales y documentación técnica completa próximamente.
              </p>
              <p className="text-slate-600 text-xs mt-1">
                ¿Necesitás ayuda ahora?{" "}
                <Link href="/recursos/contacto" className="text-violet-400 hover:text-violet-300 transition-colors">
                  Contactá al equipo
                </Link>
              </p>
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
