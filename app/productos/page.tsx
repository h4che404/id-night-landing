import type { Metadata } from "next";
import Link from "next/link";
import {
  DoorOpen,
  Monitor,
  ScanFace,
  Settings2,
  Smartphone,
  Ticket,
  UserRound,
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
  title: "Productos de ID-Night | Acceso, identidad y trazabilidad",
  description:
    "App de puerta, panel del establecimiento, credencial de identidad validada y registro de incidentes. El ecosistema de control de acceso de ID-Night.",
  path: "/productos",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Inicio", url: "/" },
  { name: "Productos", url: "/productos" },
]);

const PRODUCTS = [
  {
    id: "app-usuario",
    icon: Smartphone,
    name: "App del usuario",
    description:
      "El usuario registra su DNI y selfie una sola vez desde su celular. El proceso demora menos de 3 minutos y la credencial queda disponible de inmediato en todos los venues adheridos.",
    audience: "Usuarios finales",
    badge: "Aplicaciones",
  },
  {
    id: "app-puerta",
    icon: DoorOpen,
    name: "App de puerta",
    description:
      "El portero escanea la credencial del usuario desde cualquier celular. En menos de 2 segundos accede al estado del ingreso: permitido, en revisión o rechazado.",
    audience: "Personal de seguridad",
    badge: "Aplicaciones",
  },
  {
    id: "panel-admin",
    icon: Monitor,
    name: "Panel admin",
    description:
      "El dueño o manager del venue gestiona su local desde un panel web: configuración de accesos, reportes en tiempo real, gestión de incidentes y exportación de datos.",
    audience: "Dueños y managers",
    badge: "Aplicaciones",
  },
  {
    id: "biometrico",
    icon: ScanFace,
    name: "Motor biométrico",
    description:
      "El núcleo de ID-Night. Compara la imagen del DNI con la selfie del usuario usando tecnología de reconocimiento facial. Las validaciones dudosas pasan a revisión manual automáticamente.",
    audience: "Infraestructura",
    badge: "Plataforma",
  },
  {
    id: "credencial",
    icon: Ticket,
    name: "Credencial digital",
    description:
      "Una vez verificada la identidad, el sistema emite una credencial digital con código QR. Es reutilizable, transferible entre venues y revocable en cualquier momento por el operador.",
    audience: "Usuarios finales",
    badge: "Plataforma",
  },
  {
    id: "api",
    icon: Settings2,
    name: "API e integraciones",
    description:
      "Conectá ID-Night con tu sistema de reservas, lista de invitados o software de gestión de eventos. La API REST permite automatizar validaciones y consultar el estado de accesos en tiempo real.",
    audience: "Desarrolladores",
    badge: "Plataforma",
  },
];

const ECOSYSTEM = [
  { icon: UserRound, label: "Usuario" },
  { icon: Smartphone, label: "App usuario" },
  { icon: ScanFace, label: "Motor biométrico" },
  { icon: Ticket, label: "Credencial digital" },
  { icon: DoorOpen, label: "App de puerta" },
];

export default function ProductosPage() {
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
              <span className="text-slate-400">Productos</span>
            </nav>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
              Nuestros <span className="gradient-text">productos</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              ID-Night es un ecosistema de 6 componentes que trabajan en conjunto para hacer del control de acceso nocturno algo simple, seguro y trazable.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  id={product.id}
                  className="group p-6 rounded-2xl border border-white/8 bg-[#0F0F1A] hover:border-violet-500/30 hover:bg-[#0F0F1A]/80 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-900/60 to-violet-700/30 border border-violet-500/20 flex items-center justify-center">
                      <BrandIcon icon={product.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  <h2 className="text-white font-semibold text-lg mb-2">{product.name}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{product.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 text-xs">Para:</span>
                    <span className="text-slate-400 text-xs bg-white/4 border border-white/6 px-2 py-0.5 rounded-full">
                      {product.audience}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-20">
            <div className="p-8 rounded-2xl border border-white/8 bg-[#0F0F1A]">
              <h2 className="text-2xl font-bold text-white mb-2 text-center">El ecosistema ID-Night</h2>
              <p className="text-slate-400 text-sm text-center mb-8">
                Cinco componentes conectados que forman una cadena de confianza de extremo a extremo.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {ECOSYSTEM.map((node, i) => (
                  <div key={node.label} className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-900/50 to-violet-700/20 border border-violet-500/20 flex items-center justify-center">
                        <BrandIcon icon={node.icon} className="w-7 h-7" />
                      </div>
                      <span className="text-slate-400 text-xs text-center max-w-[80px]">{node.label}</span>
                    </div>
                    {i < ECOSYSTEM.length - 1 && (
                      <span className="text-violet-500/50 text-lg font-light hidden sm:block">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center">
            <div className="p-10 rounded-2xl border border-white/8 bg-gradient-to-br from-violet-900/20 to-cyan-900/10">
              <h2 className="text-3xl font-bold text-white mb-3">Conocé lo que estamos construyendo</h2>
              <p className="text-slate-400 mb-7 max-w-md mx-auto">
                El acceso al producto y las demos se habilitarán cuando ID-Night esté listo para su lanzamiento.
              </p>
              <span
                aria-disabled="true"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-xl shadow-violet-500/25 cursor-not-allowed opacity-80"
              >
                PRÓXIMAMENTE
              </span>
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
