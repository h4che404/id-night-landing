import type { Metadata } from "next";
import Link from "next/link";
import AnimatedPage from "@/components/AnimatedPage";
import AnimatedSection from "@/components/AnimatedSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Política de privacidad — ID-Night",
  description:
    "Política de privacidad de ID-Night. Cómo recopilamos, usamos y protegemos tus datos personales y biométricos.",
  path: "/legal/privacidad",
});

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedPage>
          {/* Header */}
          <AnimatedSection className="mb-12">
            <nav className="flex items-center gap-2 text-xs text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
              <span>›</span>
              <Link href="/legal" className="hover:text-slate-400 transition-colors">Legal</Link>
              <span>›</span>
              <span className="text-slate-400">Política de privacidad</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Política de <span className="gradient-text">privacidad</span>
            </h1>
            <p className="text-slate-500 text-sm">
              Última actualización: Junio de 2026. Conforme a la Ley N° 25.326 de la República Argentina.
            </p>
          </AnimatedSection>

          {/* Sections */}
          <div className="space-y-10 text-slate-400 text-sm leading-relaxed">
            {/* 1 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">1. Responsable del tratamiento</h2>
                <p className="mb-3">
                  ID-Night S.A.S. (en adelante, "la Empresa") es la responsable del tratamiento de los datos personales recopilados a través de la plataforma ID-Night, en los términos de la Ley N° 25.326 de Protección de Datos Personales de la República Argentina.
                </p>
                <p>
                  La Empresa se encuentra domiciliada en la Ciudad Autónoma de Buenos Aires y puede ser contactada mediante el correo electrónico <a href="mailto:privacidad@idnight.app" className="text-violet-400 hover:text-violet-300 transition-colors">privacidad@idnight.app</a> para cualquier consulta relacionada con el tratamiento de datos.
                </p>
              </div>
            </AnimatedSection>

            {/* 2 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">2. Datos que recopilamos</h2>
                <p className="mb-3">
                  Para proveer el servicio de verificación de identidad y emisión de credenciales digitales, la Empresa recopila los siguientes datos:
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/3 border border-white/5">
                    <p className="text-white font-medium text-sm mb-1">Datos de identidad</p>
                    <p>Imagen del frente y dorso del DNI (documento nacional de identidad), nombre completo, número de DNI, fecha de nacimiento y CUIL/CUIT cuando esté disponible en el documento.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/3 border border-white/5">
                    <p className="text-white font-medium text-sm mb-1">Datos biométricos</p>
                    <p>Selfie del usuario capturada al momento del registro. Esta imagen es procesada por el motor biométrico para generar un vector de características faciales (embedding). Las imágenes originales son eliminadas una vez completado el procesamiento.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/3 border border-white/5">
                    <p className="text-white font-medium text-sm mb-1">Datos de contacto</p>
                    <p>Dirección de correo electrónico y número de teléfono celular, utilizados para la creación y gestión de la cuenta del usuario.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/3 border border-white/5">
                    <p className="text-white font-medium text-sm mb-1">Datos de uso</p>
                    <p>Historial de accesos (venue, fecha, hora, resultado de la validación), versión de la aplicación y datos técnicos del dispositivo necesarios para el funcionamiento del servicio.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* 3 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">3. Finalidad del tratamiento</h2>
                <p className="mb-3">
                  Los datos recopilados se utilizan exclusivamente para las siguientes finalidades:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Verificar la identidad del usuario mediante la comparación biométrica entre el DNI y la selfie.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Emitir la credencial digital de identidad verificada.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Validar el acceso del usuario a los venues que operan con ID-Night.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Mantener el historial de accesos para cumplir con las obligaciones legales aplicables.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Comunicarse con el usuario respecto al estado de su cuenta o credencial.</span></li>
                </ul>
                <p className="mt-3">
                  Los datos NO son utilizados para publicidad, perfilado comercial, venta a terceros ni ningún otro fin no declarado en esta política.
                </p>
              </div>
            </AnimatedSection>

            {/* 4 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">4. Tratamiento de datos biométricos</h2>
                <p className="mb-3">
                  Los datos biométricos constituyen datos sensibles en los términos del artículo 2 de la Ley N° 25.326. Su tratamiento requiere consentimiento expreso, informado e inequívoco del titular, el cual es solicitado en el momento del registro.
                </p>
                <p className="mb-3">
                  El proceso de verificación funciona de la siguiente manera: la imagen del DNI y la selfie son procesadas por el motor biométrico para extraer un vector de características faciales (embedding). Una vez completado este proceso, las imágenes originales son eliminadas de forma permanente. Solo se conserva el embedding, que es un representación matemática que no permite reconstruir la imagen original.
                </p>
                <p>
                  El embedding biométrico se almacena de forma cifrada y se utiliza exclusivamente para comparaciones futuras en el proceso de acceso a venues. No es transferido a terceros bajo ninguna circunstancia.
                </p>
              </div>
            </AnimatedSection>

            {/* 5 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">5. Acceso a los datos por parte de los operadores</h2>
                <p className="mb-3">
                  Los Operadores de venues adheridos a ID-Night tienen acceso a los siguientes datos en el contexto del control de acceso:
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Nombre completo del usuario.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Categoría de edad (mayor/menor de 18 años).</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Estado de la credencial (activa, suspendida, en revisión).</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Resultado de la validación de acceso (permitido, rechazado, en revisión manual).</span></li>
                </ul>
                <p className="mb-3">
                  Los Operadores NO tienen acceso a los datos biométricos, al número completo de DNI, ni al historial de accesos del usuario en otros venues.
                </p>
                <p>
                  El acceso de los Operadores está restringido por roles y permisos configurados desde la plataforma. Solo el personal de puerta y los administradores del venue tienen acceso a la información necesaria para su función.
                </p>
              </div>
            </AnimatedSection>

            {/* 6 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">6. Retención de datos</h2>
                <p className="mb-3">
                  Los datos personales se conservan mientras la cuenta del usuario esté activa o mientras sea necesario para cumplir con obligaciones legales aplicables.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span><strong className="text-white">Datos biométricos (embedding):</strong> conservados hasta que el usuario solicite la eliminación de su cuenta.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span><strong className="text-white">Imágenes originales (DNI y selfie):</strong> eliminadas de forma permanente tras la verificación exitosa.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span><strong className="text-white">Historial de accesos:</strong> conservado por un período mínimo de 12 meses para cumplir con requisitos de auditoría y seguridad.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span><strong className="text-white">Datos de contacto:</strong> conservados mientras la cuenta esté activa.</span></li>
                </ul>
                <p>
                  Tras la solicitud de eliminación de cuenta, todos los datos personales son eliminados en un plazo máximo de 30 días, excepto aquellos que la Empresa esté legalmente obligada a conservar.
                </p>
              </div>
            </AnimatedSection>

            {/* 7 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">7. Derechos del titular de los datos</h2>
                <p className="mb-3">
                  En virtud de la Ley N° 25.326, el titular tiene derecho a acceder, rectificar, suprimir, oponerse al tratamiento y solicitar la portabilidad de sus datos personales. Estos derechos son gratuitos y pueden ejercerse en cualquier momento.
                </p>
                <p className="mb-3">
                  Para ejercer cualquiera de estos derechos, el titular debe enviar una solicitud a <a href="mailto:privacidad@idnight.app" className="text-violet-400 hover:text-violet-300 transition-colors">privacidad@idnight.app</a> con el asunto "Ejercicio de derechos ARSO" y con la identificación del titular.
                </p>
                <p>
                  La Empresa responderá la solicitud en un plazo máximo de 15 días hábiles. En casos complejos, este plazo podrá extenderse hasta 30 días hábiles, lo cual será notificado al titular.
                </p>
              </div>
            </AnimatedSection>

            {/* 8 */}
            <AnimatedSection>
              <div className="p-7 rounded-2xl border border-white/8 bg-[#0F0F1A]">
                <h2 className="text-white text-lg font-semibold mb-4">8. Seguridad de los datos</h2>
                <p className="mb-3">
                  La Empresa implementa medidas técnicas y organizativas apropiadas para proteger los datos personales contra el acceso no autorizado, la pérdida, la destrucción o la alteración accidental. Entre las medidas implementadas se incluyen:
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Cifrado en tránsito (TLS 1.3) y en reposo (AES-256) de todos los datos almacenados.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Acceso a datos restringido por roles y con autenticación multifactor para el equipo interno.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Auditorías de seguridad periódicas y tests de penetración.</span></li>
                  <li className="flex items-start gap-2"><span className="text-violet-400 flex-shrink-0">·</span><span>Procedimientos de respuesta ante incidentes con notificación a los usuarios afectados dentro de las 72 horas de conocido el incidente.</span></li>
                </ul>
                <p>
                  En caso de detectar una brecha de seguridad que afecte datos personales, la Empresa notificará a los titulares afectados y a la Agencia de Acceso a la Información Pública (AAIP) dentro de los plazos establecidos por la normativa vigente. Consultas de privacidad: <a href="mailto:privacidad@idnight.app" className="text-violet-400 hover:text-violet-300 transition-colors">privacidad@idnight.app</a>.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Footer */}
          <AnimatedSection className="mt-10">
            <div className="p-5 rounded-xl border border-white/5 bg-white/2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-slate-600 text-xs">
                Consultas de privacidad:{" "}
                <a href="mailto:privacidad@idnight.app" className="text-violet-400 hover:text-violet-300 transition-colors">
                  privacidad@idnight.app
                </a>
              </p>
              <Link href="/legal/terminos" className="text-violet-400 text-xs hover:text-violet-300 transition-colors whitespace-nowrap">
                Ver términos y condiciones →
              </Link>
            </div>
          </AnimatedSection>
        </AnimatedPage>
      </div>
    </main>
  );
}
