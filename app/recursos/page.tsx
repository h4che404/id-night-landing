import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Building2, MapPin, Wrench } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import AnimatedSection from "@/components/AnimatedSection";
import BrandIcon from "@/components/BrandIcon";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  toJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Recursos — ID-Night",
  description: "Aprendé a usar ID-Night, conocé la empresa, accedé al soporte técnico o contactá al equipo.",
  path: "/recursos",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Inicio", url: "/" },
  { name: "Recursos", url: "/recursos" },
]);

const RESOURCE_CARDS = [
  {
    icon: BookOpen,
    title: "Aprender",
    description:
      "Guías de inicio rápido, tutoriales paso a paso y preguntas frecuentes para empezar a usar ID-Night en tu venue en minutos.",
    href: "/recursos/aprender",
    cta: "Ver guías →",
  },
  {
    icon: Building2,
    title: "Empresa",
    description:
      "Conocé el equipo detrás de ID-Night, nuestra misión, los valores que nos guían y la hoja de ruta del producto.",
    href: "/recursos/empresa",
    cta: "Conocernos →",
  },
  {
    icon: Wrench,
    title: "Soporte",
    description:
      "Preguntas frecuentes técnicas, información de contacto y opciones de asistencia para resolver cualquier problema rápidamente.",
    href: "/recursos/soporte",
    cta: "Ir al soporte →",
  },
  {
    icon: MapPin,
    title: "Contacto",
    description:
      "Hablá directamente con el equipo de ID-Night para consultas comerciales, técnicas o cualquier otra pregunta que tengas.",
    href: "/recursos/contacto",
    cta: "Contactar →",
  },
];

export default function RecursosPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <div className="max-w-5xl mx-auto">
        <AnimatedPage>
          <AnimatedSection className="mb-14 text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
              <span>›</span>
              <span className="text-slate-400">Recursos</span>
            </nav>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
              Todo lo que <span className="gradient-text">necesitás saber</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Documentación, soporte, información sobre la empresa y formas de contactarnos.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-6">
              {RESOURCE_CARDS.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group p-7 rounded-2xl border border-white/8 bg-[#0F0F1A] hover:border-violet-500/30 hover:bg-[#0F0F1A]/80 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-900/60 to-violet-700/30 border border-violet-500/20 flex items-center justify-center mb-5">
                    <BrandIcon icon={card.icon} className="w-6 h-6" />
                  </div>
                  <h2 className="text-white font-semibold text-xl mb-2 group-hover:text-violet-300 transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{card.description}</p>
                  <span className="text-violet-400 text-sm font-medium">{card.cta}</span>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
