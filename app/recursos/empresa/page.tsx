import type { Metadata } from "next";
import Link from "next/link";
import AnimatedPage from "@/components/AnimatedPage";
import AnimatedSection from "@/components/AnimatedSection";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  toJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Empresa — ID-Night",
  description:
    "Conocé el equipo detrás de ID-Night, nuestra visión, los valores que nos guían y la hoja de ruta del producto.",
  path: "/recursos/empresa",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Inicio", url: "/" },
  { name: "Recursos", url: "/recursos" },
  { name: "Empresa", url: "/recursos/empresa" },
]);

const VALUES = [
  {
    icon: "🔐",
    title: "Seguridad",
    description:
      "Cada decisión de diseño del sistema está orientada a proteger tanto al venue como al usuario final. La seguridad no es una característica: es la razón de existir de ID-Night.",
  },
  {
    icon: "🛡",
    title: "Privacidad",
    description:
      "Los datos biométricos nunca se comparten entre venues sin consentimiento explícito. La credencial expone solo la información necesaria para el acceso, nunca más.",
  },
  {
    icon: "♿",
    title: "Accesibilidad",
    description:
      "El sistema tiene que funcionar para el portero de un boliche de barrio con un celular de gama media en medio de la noche. Simplicidad y robustez van de la mano.",
  },
  {
    icon: "🤝",
    title: "Confianza",
    description:
      "Entre el venue y el usuario, entre el usuario y el sistema, entre ID-Night y sus clientes. Construimos confianza siendo transparentes sobre qué datos usamos y por qué.",
  },
];

const ROADMAP = [
  {
    period: "Q3 2026",
    status: "current",
    title: "Lanzamiento en Buenos Aires",
    items: [
      "App del usuario para iOS y Android",
      "App de puerta disponible en Argentina",
      "Panel admin web para venues",
      "Onboarding de primeros 50 venues",
    ],
  },
  {
    period: "Q4 2026",
    status: "upcoming",
    title: "Expansión y funcionalidades",
    items: [
      "API pública para integraciones",
      "Credencial multi-venue con vista unificada",
      "Módulo de eventos y acreditaciones",
      "Expansión a Córdoba, Rosario y Mendoza",
    ],
  },
  {
    period: "2027",
    status: "future",
    title: "Expansión LATAM",
    items: [
      "Adaptación a DNI y documentación de Chile, Uruguay y Colombia",
      "Integración con sistemas de ticketing regionales",
      "Motor biométrico de segunda generación",
      "Primeros venues fuera de Argentina",
    ],
  },
];

const STATUS_STYLES: Record<string, string> = {
  current: "border-violet-500/40 bg-violet-500/5",
  upcoming: "border-white/8 bg-[#0F0F1A]",
  future: "border-white/5 bg-white/2",
};

const PERIOD_STYLES: Record<string, string> = {
  current: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  upcoming: "text-slate-400 bg-white/5 border-white/8",
  future: "text-slate-600 bg-white/3 border-white/5",
};

export default function EmpresaPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <AnimatedPage>
          <AnimatedSection className="mb-16">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
              <span>›</span>
              <Link href="/recursos" className="hover:text-slate-400 transition-colors">Recursos</Link>
              <span>›</span>
              <span className="text-slate-400">Empresa</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Quiénes <span className="gradient-text">somos</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection className="mb-14">
            <div className="p-8 rounded-2xl border border-white/8 bg-[#0F0F1A]">
              <h2 className="text-2xl font-bold text-white mb-4">El origen</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  ID-Night nació en Buenos Aires con un problema concreto: el control de acceso nocturno en Argentina es manual, lento y sin trazabilidad. Los porteros trabajan con listas en papel o en el celular, sin forma de verificar identidad en tiempo real, y los venues no tienen registro claro de quién entró ni cuándo.
                </p>
                <p>
                  La solución evidente era una plataforma de identidad verificada diseñada específicamente para el contexto nocturno argentino: sin hardware especial, que funcione con un celular básico, y que sea tan simple que un portero pueda usarla sin capacitación.
                </p>
                <p>
                  Creemos que la tecnología de verificación de identidad no tiene que ser cara, compleja ni exclusiva de grandes corporaciones. Tiene que funcionar en un boliche de barrio en Villa Urquiza a las 2 de la mañana.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-14">
            <div className="p-8 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/10 to-transparent">
              <h2 className="text-2xl font-bold text-white mb-4">Nuestra visión</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Ser el estándar de identidad verificada para la noche argentina y latinoamericana. Que en 2028, entrar a un boliche con ID-Night sea tan normal como pagar con tarjeta de crédito.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-8">Nuestros valores</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {VALUES.map((value) => (
                <div key={value.title} className="p-6 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                  <div className="text-3xl mb-4">{value.icon}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-bold text-white mb-8">Hoja de ruta</h2>
            <div className="space-y-5">
              {ROADMAP.map((item) => (
                <div
                  key={item.period}
                  className={`p-6 rounded-2xl border ${STATUS_STYLES[item.status]}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${PERIOD_STYLES[item.status]}`}
                    >
                      {item.period}
                    </span>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    {item.status === "current" && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        En curso
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {item.items.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-violet-500 mt-0.5 flex-shrink-0">·</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
