import type { Metadata } from "next";
import Link from "next/link";
import AnimatedPage from "@/components/AnimatedPage";
import AnimatedSection from "@/components/AnimatedSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Legal — ID-Night",
  description: "Documentación legal de ID-Night: términos y condiciones y política de privacidad.",
  path: "/legal",
});

export default function LegalPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedPage>
          <AnimatedSection className="mb-12 text-center">
            <nav className="flex items-center justify-center gap-2 text-xs text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
              <span>›</span>
              <span className="text-slate-400">Legal</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Documentación <span className="gradient-text">legal</span>
            </h1>
            <p className="text-slate-400 leading-relaxed max-w-lg mx-auto">
              Información legal sobre el uso del servicio ID-Night y el tratamiento de tus datos personales.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-6">
              <Link
                href="/legal/terminos"
                className="group p-7 rounded-2xl border border-white/8 bg-[#0F0F1A] hover:border-violet-500/30 transition-all"
              >
                <div className="text-3xl mb-4">📜</div>
                <h2 className="text-white font-semibold text-xl mb-2 group-hover:text-violet-300 transition-colors">
                  Términos y condiciones
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Condiciones de uso del servicio ID-Night para usuarios finales y operadores de venues. Actualizado en junio 2026.
                </p>
                <span className="text-violet-400 text-sm">Leer términos →</span>
              </Link>

              <Link
                href="/legal/privacidad"
                className="group p-7 rounded-2xl border border-white/8 bg-[#0F0F1A] hover:border-violet-500/30 transition-all"
              >
                <div className="text-3xl mb-4">🔒</div>
                <h2 className="text-white font-semibold text-xl mb-2 group-hover:text-violet-300 transition-colors">
                  Política de privacidad
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Cómo recopilamos, usamos y protegemos tus datos personales y biométricos. Actualizada en junio 2026.
                </p>
                <span className="text-violet-400 text-sm">Leer política →</span>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-10">
            <div className="p-5 rounded-xl border border-white/5 bg-white/2 text-center">
              <p className="text-slate-500 text-sm">
                Consultas legales:{" "}
                <a href="mailto:legal@idnight.app" className="text-violet-400 hover:text-violet-300 transition-colors">
                  legal@idnight.app
                </a>
              </p>
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
