import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import AnimatedSection from "@/components/AnimatedSection";
import BrandIcon from "@/components/BrandIcon";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  toJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Soporte — ID-Night",
  description: "El soporte técnico de ID-Night estará disponible cuando se habilite el servicio. Consultá mientras tanto la información pública del producto.",
  path: "/recursos/soporte",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Inicio", url: "/" },
  { name: "Recursos", url: "/recursos" },
  { name: "Soporte", url: "/recursos/soporte" },
]);

export default function SoportePage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <AnimatedPage>
          <AnimatedSection className="mb-14">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
              <span>›</span>
              <Link href="/recursos" className="hover:text-slate-400 transition-colors">Recursos</Link>
              <span>›</span>
              <span className="text-slate-400">Soporte</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              <span className="gradient-text">Soporte</span> técnico
            </h1>
            <p className="text-slate-400 leading-relaxed">
              El canal de asistencia se habilitará junto con el acceso al producto.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="p-8 sm:p-10 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-cyan-900/10 text-center">
              <span className="inline-flex px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-xs font-semibold mb-5">
                PRÓXIMAMENTE
              </span>
              <h2 className="text-xl font-semibold text-white mb-3">Asistencia en preparación</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-7">
                Todavía no hay cuentas operativas que requieran soporte. Cuando lancemos el servicio, este espacio concentrará la documentación y los canales de asistencia.
              </p>
              <a
                href="mailto:hola@idnight.app"
                className="inline-flex items-center gap-2 text-violet-300 text-sm hover:text-violet-200 transition-colors"
              >
                <BrandIcon icon={Mail} className="w-4 h-4" />
                Consulta general
              </a>
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
