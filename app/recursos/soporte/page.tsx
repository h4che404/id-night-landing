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
  title: "Soporte — ID-Night",
  description: "Soporte técnico, preguntas frecuentes y opciones de contacto para usuarios de ID-Night.",
  path: "/recursos/soporte",
});

const FAQS = [
  {
    q: "La app de puerta no escanea el QR correctamente. ¿Qué hago?",
    a: "Verificá que el brillo de la pantalla del usuario esté al máximo. La cámara necesita buena iluminación. Si el problema persiste, probá cerrar y reabrir la app. Si sigue fallando, el usuario puede mostrar el código manual y el portero puede ingresarlo desde el panel.",
  },
  {
    q: "¿Cómo recupero el acceso al panel admin si olvidé la contraseña?",
    a: "Usá el botón 'Olvidé mi contraseña' en la pantalla de login de admin.idnight.app. Te llegará un correo con un link para resetearla. Si el correo no llega en 5 minutos, revisá la carpeta de spam.",
  },
  {
    q: "Un usuario dice que su credencial fue rechazada pero debería estar activa.",
    a: "Verificá el estado de la credencial desde el panel admin buscando por nombre o DNI. Los rechazos pueden deberse a credencial suspendida, vencida o a una validación biométrica pendiente. Si el estado es correcto y el rechazo no tiene sentido, contactá a soporte con el ID del acceso.",
  },
  {
    q: "¿Cómo agrego un nuevo portero al sistema?",
    a: "Desde el panel admin, ve a Configuración → Personal de acceso → Agregar portero. Ingresá su email y asignale los permisos correspondientes. El portero recibirá un email de invitación para crear su contraseña en la App de puerta.",
  },
  {
    q: "¿El sistema funciona sin conexión a internet?",
    a: "ID-Night requiere conexión a internet para validar credenciales en tiempo real. Sin conexión, no es posible verificar el estado actualizado de una credencial. Recomendamos tener una conexión de respaldo (datos móviles) en los puntos de acceso.",
  },
];

const CONTACT_OPTIONS = [
  {
    icon: "💬",
    channel: "WhatsApp",
    detail: "+54 9 11 0000-0000",
    response: "Respuesta en menos de 2 horas en horario hábil",
    href: "https://wa.me/5491100000000",
    external: true,
  },
  {
    icon: "📧",
    channel: "Email",
    detail: "soporte@idnight.app",
    response: "Respuesta en menos de 24 horas",
    href: "mailto:soporte@idnight.app",
    external: true,
  },
  {
    icon: "📍",
    channel: "Formulario de contacto",
    detail: "Completá el formulario y te contactamos",
    response: "Te respondemos según prioridad del caso",
    href: "/recursos/contacto",
    external: false,
  },
];

const faqJsonLd = buildFaqJsonLd(FAQS);

export default function SoportePage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <AnimatedPage>
          <AnimatedSection className="mb-14">
            <nav className="flex items-center gap-2 text-xs text-slate-600 mb-6">
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
              Encontrá respuestas a los problemas más comunes o contactá al equipo directamente.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mb-14">
            <h2 className="text-xl font-semibold text-white mb-6">Problemas frecuentes</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="p-5 rounded-xl border border-white/8 bg-[#0F0F1A]">
                  <p className="text-white font-medium text-sm mb-2">{faq.q}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-xl font-semibold text-white mb-6">Canales de contacto</h2>
            <div className="space-y-4">
              {CONTACT_OPTIONS.map((option) => {
                const content = (
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-white/8 bg-[#0F0F1A] hover:border-violet-500/30 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-violet-900/40 border border-violet-500/20 flex items-center justify-center text-xl flex-shrink-0">
                      {option.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm group-hover:text-violet-300 transition-colors">
                        {option.channel}
                      </p>
                      <p className="text-violet-400 text-sm mt-0.5">{option.detail}</p>
                      <p className="text-slate-500 text-xs mt-1">{option.response}</p>
                    </div>
                  </div>
                );

                return option.external ? (
                  <a key={option.channel} href={option.href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <Link key={option.channel} href={option.href}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
