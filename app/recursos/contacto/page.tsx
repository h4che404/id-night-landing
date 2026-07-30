import Link from "next/link";
import { Mail } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactoPage() {
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
              Estamos presentando la idea y la marca. Las demos, consultas comerciales y solicitudes de implementación estarán disponibles más adelante.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="p-8 sm:p-10 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-cyan-900/10 text-center">
              <span className="inline-flex px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-xs font-semibold mb-5">
                PRÓXIMAMENTE
              </span>
              <h2 className="text-white text-xl font-semibold mb-3">Canal comercial en preparación</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-7">
                Publicaremos acá las opciones para solicitar demos, conocer precios y conversar sobre implementaciones cuando el servicio esté disponible.
              </p>
              <a
                href="mailto:hola@idnight.app"
                className="inline-flex items-center gap-2 text-violet-300 text-sm hover:text-violet-200 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                hola@idnight.app
              </a>
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
