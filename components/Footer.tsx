import Image from "next/image";
import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Productos",
    links: [
      { label: "App del usuario", href: "/productos#app-usuario" },
      { label: "App de puerta", href: "/productos#app-puerta" },
      { label: "Panel admin", href: "/productos#panel-admin" },
      { label: "Motor biométrico", href: "/productos#biometrico" },
      { label: "Credencial digital", href: "/productos#credencial" },
      { label: "API e integraciones", href: "/productos#api" },
    ],
  },
  {
    title: "Soluciones",
    links: [
      { label: "Para boliches y bares", href: "/soluciones#boliches" },
      { label: "Para eventos masivos", href: "/soluciones#eventos" },
      { label: "Para cadenas de venues", href: "/soluciones#cadenas" },
      { label: "Para usuarios finales", href: "/soluciones#usuarios" },
      { label: "Para organizadores", href: "/soluciones#organizadores" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Aprender", href: "/recursos/aprender" },
      { label: "Empresa", href: "/recursos/empresa" },
      { label: "Soporte", href: "/recursos/soporte" },
      { label: "Contacto", href: "/recursos/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y condiciones", href: "/legal/terminos" },
      { label: "Política de privacidad", href: "/legal/privacidad" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-14 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="ID-Night" width={32} height={32} className="w-8 h-8 rounded-lg" />
              <span className="text-white font-semibold text-base tracking-tight">ID-Night</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-4">
              La plataforma de identidad verificada para el control de acceso nocturno en Argentina.
            </p>
            <p className="text-slate-700 text-xs">© 2026 ID-Night. Todos los derechos reservados.</p>
          </div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className="text-white text-sm font-semibold mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            Desarrollado en Buenos Aires, Argentina 🇦🇷
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <Link href="/legal/privacidad" className="hover:text-slate-400 transition-colors">
              Privacidad
            </Link>
            <Link href="/legal/terminos" className="hover:text-slate-400 transition-colors">
              Términos
            </Link>
            <Link href="/recursos/contacto" className="hover:text-slate-400 transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
