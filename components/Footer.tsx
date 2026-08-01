import Image from "next/image";
import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Homepage",
    links: [
      { label: "Visión", href: "/#vision" },
      { label: "Qué creemos", href: "/#principios" },
      { label: "Tecnología", href: "/productos" },
      { label: "Participar", href: "/#participar" },
    ],
  },
  {
    title: "Productos",
    links: [
      { label: "Visión general", href: "/productos" },
      { label: "App del usuario", href: "/productos#app-usuario" },
      { label: "Panel admin", href: "/productos#panel-admin" },
      { label: "Motor biométrico", href: "/productos#biometrico" },
    ],
  },
  {
    title: "Soluciones",
    links: [
      { label: "Para boliches y bares", href: "/soluciones#boliches" },
      { label: "Para eventos masivos", href: "/soluciones#eventos" },
      { label: "Para cadenas de venues", href: "/soluciones#cadenas" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Aprender", href: "/recursos/aprender" },
      { label: "Empresa", href: "/recursos/empresa" },
      { label: "Fundador", href: "/recursos/fundador" },
      { label: "Soporte", href: "/recursos/soporte" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de privacidad", href: "/legal/privacidad" },
      { label: "Términos y condiciones", href: "/legal/terminos" },
      { label: "Contacto", href: "/recursos/contacto" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(9,13,24,0.96),rgba(4,8,18,1))] px-6 pb-8 pt-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-7">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="ID-Night" width={32} height={32} className="w-8 h-8 rounded-lg" />
              <span className="text-white font-semibold text-base tracking-tight">ID-Night</span>
            </Link>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-slate-300">
              Desde Mendoza, construyendo una nocturnidad más segura, humana y respetuosa de la privacidad.
            </p>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              ID-NIGHT está en etapa de conversación y construcción junto con quienes salen, organizan, trabajan y cuidan la noche.
            </p>
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
                      className="text-sm text-slate-400 transition-colors hover:text-slate-200"
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
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 ID-Night. Construido en Argentina con foco en claridad operativa, criterio humano y privacidad.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/legal/privacidad" className="transition-colors hover:text-slate-300">
              Privacidad
            </Link>
            <Link href="/legal/terminos" className="transition-colors hover:text-slate-300">
              Términos
            </Link>
            <Link href="/#participar" className="transition-colors hover:text-slate-300">
              Participar
            </Link>
            <Link href="/recursos/contacto" className="transition-colors hover:text-slate-300">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
