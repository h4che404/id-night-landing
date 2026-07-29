import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  Braces,
  CalendarDays,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Search,
  Sparkles,
  Wind,
  Zap,
} from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import AnimatedSection from "@/components/AnimatedSection";
import {
  SITE_URL,
  buildBreadcrumbJsonLd,
  createPageMetadata,
  toJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Fundador — ID-Night",
  description:
    "Juan Cruz Elías Martín, fundador y desarrollador único de ID-Night. Estudiante de la Tecnicatura Universitaria en Programación (UTN), builder full-stack detrás del producto.",
  path: "/recursos/fundador",
});

const FOUNDER = {
  name: "Juan Cruz Elías Martín",
  role: "Fundador · CEO · Desarrollador",
  location: "San Martín, Mendoza — Argentina",
  bornYear: 2003,
  email: "eliasjuancruz54@gmail.com",
  // Reemplazá el avatar de iniciales dejando una foto en /public/fundador.jpg
  photo: "/fundador.jpg",
  initials: "JC",
};

const currentYear = new Date().getFullYear();

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Inicio", url: "/" },
  { name: "Recursos", url: "/recursos" },
  { name: "Fundador", url: "/recursos/fundador" },
]);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FOUNDER.name,
  jobTitle: "Fundador y desarrollador de ID-Night",
  email: `mailto:${FOUNDER.email}`,
  nationality: "Argentina",
  homeLocation: {
    "@type": "Place",
    name: FOUNDER.location,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Tecnológica Nacional (UTN) — Tecnicatura Universitaria en Programación",
  },
  worksFor: {
    "@type": "Organization",
    name: "ID-Night",
    url: SITE_URL,
  },
  url: `${SITE_URL}/recursos/fundador`,
};

const QUICK_FACTS = [
  {
    icon: GraduationCap,
    label: "Formación",
    value: "Tecnicatura Universitaria en Programación — UTN",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "San Martín, Mendoza — Argentina",
  },
  {
    icon: CalendarDays,
    label: "Edad",
    value: `${currentYear - FOUNDER.bornYear} años (nacido en ${FOUNDER.bornYear})`,
  },
  {
    icon: Zap,
    label: "Rol",
    value: "Diseño, desarrollo y producto — de punta a punta",
  },
];

const STACK = [
  { name: "Next.js 16", note: "App Router y renderizado server-first", icon: Layers },
  { name: "React 19", note: "Componentes y UI reactiva", icon: Atom },
  { name: "TypeScript", note: "Tipado estricto en todo el código", icon: Braces },
  { name: "Tailwind CSS", note: "Sistema de diseño y estilos", icon: Wind },
  { name: "Framer Motion", note: "Animaciones y transiciones", icon: Sparkles },
  { name: "SEO técnico", note: "Metadata, JSON-LD y performance", icon: Search },
];

const PRINCIPLES = [
  {
    title: "De la idea al deploy, solo",
    description:
      "Diseño, desarrollo, infraestructura y producto. No delego lo que puedo entender y construir yo mismo, y eso me da control total sobre cada decisión de ID-Night.",
  },
  {
    title: "El concepto antes que el código",
    description:
      "No escribo una línea hasta entender el problema real. En control de acceso nocturno eso significa pensar en el portero, no solo en la arquitectura.",
  },
  {
    title: "Construir para el mundo real",
    description:
      "ID-Night tiene que funcionar en un boliche de barrio, con un celular de gama media, a las 2 de la mañana. Simplicidad y robustez antes que features vistosas.",
  },
];

export default function FundadorPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(personJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <AnimatedPage>
          <AnimatedSection className="mb-12">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
              <span>›</span>
              <Link href="/recursos" className="hover:text-slate-400 transition-colors">Recursos</Link>
              <span>›</span>
              <span className="text-slate-400">Fundador</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              El <span className="gradient-text">fundador</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Detrás de ID-Night hay una sola persona: diseño, código y producto, de punta a punta.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mb-14">
            <div className="p-8 rounded-2xl border border-white/8 bg-[#0F0F1A] flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="flex-shrink-0">
                {/* Avatar de iniciales: dejá una foto en /public/fundador.jpg para reemplazarlo */}
                <div
                  aria-hidden="true"
                  className="w-32 h-32 rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-600/30 to-violet-900/10 flex items-center justify-center"
                >
                  <span className="text-4xl font-bold gradient-text">{FOUNDER.initials}</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white mb-1">{FOUNDER.name}</h2>
                <p className="text-violet-400 font-medium mb-4">{FOUNDER.role}</p>
                <div className="space-y-2 text-slate-400 text-sm">
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-violet-500">›</span>
                    Estudiante de la Tecnicatura Universitaria en Programación (UTN)
                  </p>
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-violet-500">›</span>
                    {FOUNDER.location}
                  </p>
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-violet-500">›</span>
                    <a
                      href={`mailto:${FOUNDER.email}`}
                      className="hover:text-violet-400 transition-colors"
                    >
                      {FOUNDER.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-14">
            <div className="p-8 rounded-2xl border border-white/8 bg-[#0F0F1A]">
              <h2 className="text-2xl font-bold text-white mb-4">Mi historia</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Soy Juan Cruz, nacido en {FOUNDER.bornYear} en San Martín, Mendoza. Estudio la Tecnicatura Universitaria en Programación en la UTN y desde ahí construyo software con una idea fija: la tecnología tiene que resolver problemas reales, no impresionar en una demo.
                </p>
                <p>
                  ID-Night es la prueba de eso. Es un producto que diseñé, programé y llevé a producción yo mismo, de la primera línea de código al deploy. No hay un equipo grande detrás: hay una persona que entiende cada parte del sistema porque la construyó.
                </p>
                <p>
                  Trabajar solo no es una limitación, es una ventaja para vos como cliente: hablás directo con quien toma las decisiones, entiende el código y responde por el producto. Sin capas intermedias, sin “lo tengo que consultar con el equipo”.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-8">En breve</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {QUICK_FACTS.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="p-6 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                    <div className="w-11 h-11 rounded-xl border border-violet-500/20 bg-violet-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-violet-400" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h3 className="text-slate-500 text-xs uppercase tracking-wider mb-1.5">{fact.label}</h3>
                    <p className="text-white font-medium leading-relaxed">{fact.value}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-8">Stack técnico</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STACK.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div key={tech.name} className="p-5 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                    <Icon className="w-6 h-6 text-violet-400 mb-3" strokeWidth={1.75} aria-hidden="true" />
                    <h3 className="text-white font-semibold mb-1">{tech.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{tech.note}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-8">Cómo trabajo</h2>
            <div className="space-y-5">
              {PRINCIPLES.map((principle) => (
                <div
                  key={principle.title}
                  className="p-6 rounded-2xl border border-white/8 bg-[#0F0F1A]"
                >
                  <h3 className="text-white font-semibold text-lg mb-2">{principle.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="p-8 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/10 to-transparent text-center">
              <h2 className="text-2xl font-bold text-white mb-3">¿Trabajamos juntos?</h2>
              <p className="text-slate-300 leading-relaxed mb-6 max-w-xl mx-auto">
                Si querés conocer ID-Night o hablar de un proyecto, escribime directo. Respondo yo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`mailto:${FOUNDER.email}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                  Escribirme
                </a>
                <Link
                  href="/recursos/contacto"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-slate-300 font-medium transition-colors"
                >
                  Ir a contacto
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
