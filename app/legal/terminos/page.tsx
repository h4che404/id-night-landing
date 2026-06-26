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
  title: "Términos y condiciones — ID-Night",
  description: "Términos y condiciones de uso del servicio ID-Night. Aplicable a usuarios finales y operadores de venues.",
  path: "/legal/terminos",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Inicio", url: "/" },
  { name: "Legal", url: "/legal" },
  { name: "Términos y condiciones", url: "/legal/terminos" },
]);

export default function TerminosPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <AnimatedPage>
          {/* Header */}
          <AnimatedSection className="mb-12">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
              <span>›</span>
              <Link href="/legal" className="hover:text-slate-400 transition-colors">Legal</Link>
              <span>›</span>
              <span className="text-slate-400">Términos y condiciones</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Términos y <span className="gradient-text">condiciones</span>
            </h1>
            <p className="text-slate-500 text-sm">
              Última actualización: Junio de 2026. Aplicable a usuarios de la República Argentina.
            </p>
          </AnimatedSection>

          {/* Sections */}
          <div className="space-y-10 text-slate-400 text-sm leading-relaxed">
            {/* 1 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">1. Descripción del servicio</h2>
                <p className="mb-3">
                  ID-Night es una plataforma de control de acceso basada en identidad verificada, operada por ID-Night S.A.S. (en adelante, &ldquo;la Empresa&rdquo;), con domicilio en la Ciudad Autónoma de Buenos Aires, República Argentina.
                </p>
                <p className="mb-3">
                  El servicio consiste en la emisión de credenciales digitales verificadas a usuarios finales, y en proveer a los operadores de venues (en adelante, &ldquo;Operadores&rdquo;) las herramientas necesarias para validar dichas credenciales en sus puntos de acceso.
                </p>
                <p>
                  El proceso de verificación involucra la captura y análisis biométrico del documento nacional de identidad (DNI) y una selfie del usuario, los cuales son procesados por el motor biométrico de la Empresa. Una vez verificada la identidad, se emite una credencial digital con código QR.
                </p>
              </div>
            </AnimatedSection>

            {/* 2 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">2. Aceptación de los términos</h2>
                <p className="mb-3">
                  El acceso y uso del servicio ID-Night implica la aceptación expresa e incondicional de los presentes Términos y Condiciones. Si el usuario o el Operador no está de acuerdo con alguno de los términos aquí establecidos, deberá abstenerse de utilizar la plataforma.
                </p>
                <p className="mb-3">
                  La Empresa se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones serán notificadas mediante el correo electrónico registrado al momento de la creación de la cuenta, con una anticipación mínima de 15 días corridos.
                </p>
                <p>
                  El uso continuado del servicio luego de la notificación de cambios implica la aceptación de los términos modificados.
                </p>
              </div>
            </AnimatedSection>

            {/* 3 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">3. Datos biométricos y datos sensibles</h2>
                <p className="mb-3">
                  De conformidad con la Ley N° 25.326 de Protección de Datos Personales de la República Argentina, los datos biométricos (imagen del rostro obtenida de la selfie y del DNI) son considerados datos sensibles y reciben un nivel de protección especial.
                </p>
                <p className="mb-3">
                  El usuario presta consentimiento expreso, informado y libre para el tratamiento de sus datos biométricos con el único fin de verificar su identidad y emitir la credencial digital. Dicho consentimiento puede ser revocado en cualquier momento mediante solicitud a <a href="mailto:privacidad@idnight.app" className="text-violet-400 hover:text-violet-300 transition-colors">privacidad@idnight.app</a>.
                </p>
                <p>
                  Los datos biométricos se procesan en Argentina y no son transferidos a terceros fuera del país sin consentimiento adicional del titular. Una vez procesada la verificación, las imágenes originales son eliminadas y solo se conserva el vector biométrico (embedding), que no permite reconstruir la imagen original.
                </p>
              </div>
            </AnimatedSection>

            {/* 4 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">4. Derechos del titular de los datos</h2>
                <p className="mb-3">
                  En virtud de la Ley N° 25.326, el titular de los datos personales tiene los siguientes derechos que podrá ejercer de manera gratuita:
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span><strong className="text-white">Acceso:</strong> solicitar información sobre los datos personales que la Empresa conserva.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span><strong className="text-white">Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span><strong className="text-white">Supresión:</strong> solicitar la eliminación de los datos cuando el tratamiento no sea necesario o cuando se revoque el consentimiento.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span><strong className="text-white">Portabilidad:</strong> recibir los datos en un formato estructurado y legible por máquina.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span><strong className="text-white">Oposición:</strong> oponerse al tratamiento de datos en los casos permitidos por la ley.</span></li>
                </ul>
                <p>
                  Las solicitudes deben enviarse a <a href="mailto:legal@idnight.app" className="text-violet-400 hover:text-violet-300 transition-colors">legal@idnight.app</a> con el asunto &ldquo;Ejercicio de derechos ARSO&rdquo; e identificación del titular. La Empresa responderá en un plazo máximo de 15 días hábiles.
                </p>
              </div>
            </AnimatedSection>

            {/* 5 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">5. Obligaciones de los operadores de venues</h2>
                <p className="mb-3">
                  Los Operadores que accedan al servicio ID-Night asumen las siguientes obligaciones frente a la Empresa y frente a los usuarios finales:
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Utilizar el servicio exclusivamente para el control de acceso a sus establecimientos, no para otros fines de perfilado o comercialización.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Informar a los usuarios en el punto de acceso que el venue utiliza un sistema de verificación de identidad digital.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>No almacenar localmente los datos de los usuarios más allá del registro de acceso mínimo requerido por la regulación vigente.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Cumplir con las disposiciones de la Ley N° 25.326 en su carácter de responsables del tratamiento de datos en su establecimiento.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>No ceder credenciales de acceso a la plataforma a terceros no autorizados.</span></li>
                </ul>
                <p>
                  El incumplimiento de estas obligaciones puede resultar en la suspensión inmediata del acceso al servicio y, en casos de gravedad, en acciones legales correspondientes.
                </p>
              </div>
            </AnimatedSection>

            {/* 6 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">6. Obligaciones de los usuarios finales</h2>
                <p className="mb-3">
                  Los usuarios finales que utilicen la aplicación ID-Night se comprometen a:
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Proveer información veraz y actualizada al momento de la verificación de identidad.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>No intentar eludir los mecanismos de verificación biométrica ni utilizar documentación falsa.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>No transferir ni compartir su credencial digital con terceros.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Notificar de inmediato a la Empresa en caso de pérdida, robo o uso no autorizado de su credencial.</span></li>
                </ul>
                <p>
                  El uso fraudulento del sistema puede resultar en la suspensión permanente de la cuenta y en la denuncia ante las autoridades competentes.
                </p>
              </div>
            </AnimatedSection>

            {/* 7 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">7. Limitación de responsabilidad</h2>
                <p className="mb-3">
                  La Empresa no garantiza que el servicio estará disponible de manera ininterrumpida. Se realizarán esfuerzos razonables para mantener una disponibilidad del 99% mensual, con excepción de mantenimientos programados notificados con anticipación.
                </p>
                <p className="mb-3">
                  La Empresa no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso del servicio, incluyendo pero no limitándose a: pérdida de ingresos del venue por fallas del sistema, decisiones de acceso tomadas por el personal del Operador, o errores en el proceso de verificación biométrica.
                </p>
                <p>
                  El motor biométrico tiene una tasa de acierto sobre el 99% en condiciones normales. Las validaciones con resultado incierto son derivadas a revisión manual, siendo el Operador responsable de la decisión final de acceso.
                </p>
              </div>
            </AnimatedSection>

            {/* 8 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">8. Ley aplicable y jurisdicción</h2>
                <p className="mb-3">
                  Los presentes Términos y Condiciones se rigen por las leyes de la República Argentina, en particular por la Ley N° 25.326 de Protección de Datos Personales, la Ley N° 24.240 de Defensa del Consumidor y el Código Civil y Comercial de la Nación.
                </p>
                <p className="mb-3">
                  Para la resolución de cualquier controversia derivada de la interpretación o ejecución de los presentes términos, las partes se someten a la jurisdicción de los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires, con renuncia expresa a cualquier otro fuero que pudiere corresponder.
                </p>
                <p>
                  Para consultas legales: <a href="mailto:legal@idnight.app" className="text-violet-400 hover:text-violet-300 transition-colors">legal@idnight.app</a>
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Footer note */}
          <AnimatedSection className="mt-10">
            <div className="p-5 rounded-xl border border-white/5 bg-white/2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-slate-600 text-xs">
                ¿Tenés dudas sobre estos términos? Escribinos a{" "}
                <a href="mailto:legal@idnight.app" className="text-violet-400 hover:text-violet-300 transition-colors">
                  legal@idnight.app
                </a>
              </p>
              <Link href="/legal/privacidad" className="text-violet-400 text-xs hover:text-violet-300 transition-colors whitespace-nowrap">
                Ver política de privacidad →
              </Link>
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
