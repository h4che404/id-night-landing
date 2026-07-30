import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Bell,
  Building2,
  ClipboardList,
  Coins,
  Drama,
  FolderOpen,
  Guitar,
  HardHat,
  IdCard,
  Martini,
  PhoneOff,
  RefreshCw,
  Repeat,
  Smartphone,
  Tent,
  Ticket,
  Timer,
  TrendingUp,
  UserRound,
  Users,
  BarChart3,
  Plug,
} from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import AnimatedSection from "@/components/AnimatedSection";
import BrandIcon from "@/components/BrandIcon";
import {
  buildBreadcrumbJsonLd,
  createPageMetadata,
  toJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Soluciones de ID-Night para boliches, eventos y cadenas",
  description:
    "Control de acceso, validación de identidad y trazabilidad de incidentes para boliches, eventos masivos y cadenas de establecimientos nocturnos.",
  path: "/soluciones",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Inicio", url: "/" },
  { name: "Soluciones", url: "/soluciones" },
]);

type PainPoint = { icon: LucideIcon; label: string; solution: string };
type Solution = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  painPoints: PainPoint[];
};

const SOLUTIONS: Solution[] = [
  {
    id: "boliches",
    icon: Martini,
    title: "Para boliches y bares",
    description:
      "El control de acceso nocturno tiene un problema estructural: largas filas, porteros desbordados y sin trazabilidad de quién entró y cuándo. ID-Night lo resuelve sin hardware especial ni capacitación compleja.",
    painPoints: [
      { icon: Timer, label: "Colas largas en la entrada", solution: "Escaneo en 2 segundos desde cualquier celular" },
      { icon: ClipboardList, label: "Sin registro de ingresos", solution: "Trazabilidad completa con timestamp de cada acceso" },
      { icon: IdCard, label: "Validación de edad manual y lenta", solution: "La credencial ya tiene la categoría de edad verificada" },
      { icon: PhoneOff, label: "Dependencia de listas en papel", solution: "Todo digital, consultable desde el panel admin en tiempo real" },
    ],
  },
  {
    id: "eventos",
    icon: Tent,
    title: "Para eventos masivos",
    description:
      "Un festival o evento grande con miles de asistentes necesita control de flujo, prevención de ingresos duplicados y reportes instantáneos. ID-Night escala sin fricción.",
    painPoints: [
      { icon: Users, label: "Cuellos de botella en accesos", solution: "Múltiples puntos de control en paralelo con la misma plataforma" },
      { icon: RefreshCw, label: "Ingresos duplicados o fraudulentos", solution: "La credencial es de uso único por acceso, validada en tiempo real" },
      { icon: BarChart3, label: "Sin visibilidad del aforo en tiempo real", solution: "El panel muestra el contador de ingresos actualizado al instante" },
      { icon: AlertTriangle, label: "Gestión de incidentes sin registro", solution: "Cada rechazo queda documentado con motivo y timestamp" },
    ],
  },
  {
    id: "cadenas",
    icon: Building2,
    title: "Para cadenas de venues",
    description:
      "Gestionar múltiples locales con sistemas distintos genera inconsistencias, costos de capacitación y datos fragmentados. ID-Night centraliza todo en una sola plataforma.",
    painPoints: [
      { icon: FolderOpen, label: "Datos de acceso dispersos por local", solution: "Panel unificado con vista por venue o consolidada" },
      { icon: Coins, label: "Alto costo de capacitación por local", solution: "Onboarding de portero en menos de 5 minutos" },
      { icon: Plug, label: "Sistemas incompatibles entre locales", solution: "Una sola API, misma credencial válida en toda la cadena" },
      { icon: TrendingUp, label: "Sin métricas cross-venue", solution: "Comparativas de aforo, incidentes y validaciones entre locales" },
    ],
  },
  {
    id: "usuarios",
    icon: UserRound,
    title: "Para usuarios finales",
    description:
      "Mostrar el DNI en cada puerta es lento, incómodo y potencialmente inseguro. Con ID-Night, el usuario se registra una sola vez y entra con su QR en cualquier venue adherido.",
    painPoints: [
      { icon: IdCard, label: "Exponer el DNI físico en cada ingreso", solution: "La credencial muestra solo los datos necesarios para el acceso" },
      { icon: Repeat, label: "Repetir el proceso en cada venue", solution: "Registro único, válido en todos los locales adheridos" },
      { icon: Smartphone, label: "Aplicaciones distintas por venue", solution: "Una sola app del usuario, válida en toda la red ID-Night" },
      { icon: Bell, label: "Sin confirmación de ingreso registrado", solution: "El usuario recibe confirmación en tiempo real cuando ingresa" },
    ],
  },
  {
    id: "organizadores",
    icon: Drama,
    title: "Para organizadores",
    description:
      "Coordinar artistas, riders y staff en un evento grande implica múltiples listas de acceso diferenciado. ID-Night permite configurar roles y permisos de acceso por tipo de credencial.",
    painPoints: [
      { icon: Guitar, label: "Listas de artistas y riders separadas", solution: "Cada tipo de acceso se configura como categoría en el panel" },
      { icon: HardHat, label: "Control de staff sin trazabilidad", solution: "El staff también usa credencial digital, con registro de entradas y salidas" },
      { icon: Ticket, label: "Gestión de acreditaciones en papel", solution: "Acreditaciones digitales verificables en segundos por el portero" },
      { icon: ClipboardList, label: "Sin reporte post-evento del equipo", solution: "El panel genera el informe de accesos por categoría al cierre del evento" },
    ],
  },
];

export default function SolucionesPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <div className="max-w-7xl mx-auto">
        <AnimatedPage>
          <AnimatedSection className="mb-16 text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
              <span>›</span>
              <span className="text-slate-400">Soluciones</span>
            </nav>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
              Soluciones para <span className="gradient-text">cada contexto</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              El control de acceso nocturno tiene problemas distintos según quién lo enfrenta. ID-Night resuelve cada uno con el mismo núcleo tecnológico adaptado a tu caso.
            </p>
          </AnimatedSection>

          {SOLUTIONS.map((solution, i) => (
            <AnimatedSection key={solution.id}>
              <section
                id={solution.id}
                className={`mb-16 p-8 rounded-2xl border border-white/8 bg-[#0F0F1A] ${
                  i % 2 === 1 ? "bg-gradient-to-br from-violet-900/10 to-transparent" : ""
                }`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-900/60 to-violet-700/30 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <BrandIcon icon={solution.icon} className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{solution.title}</h2>
                    <p className="text-slate-400 leading-relaxed max-w-2xl">{solution.description}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {solution.painPoints.map((point) => (
                    <div
                      key={point.label}
                      className="p-4 rounded-xl bg-white/3 border border-white/6 hover:border-violet-500/20 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <BrandIcon icon={point.icon} className="w-4 h-4" />
                        <p className="text-slate-400 text-sm line-through opacity-60">{point.label}</p>
                      </div>
                      <p className="text-slate-300 text-sm pl-7">→ {point.solution}</p>
                    </div>
                  ))}
                </div>

                <span
                  aria-disabled="true"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold cursor-not-allowed opacity-80"
                >
                  PRÓXIMAMENTE
                </span>
              </section>
            </AnimatedSection>
          ))}
        </AnimatedPage>
      </div>
    </main>
  );
}
