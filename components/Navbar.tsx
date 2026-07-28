"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DropdownItem = {
  icon: string;
  label: string;
  description: string;
  href: string;
};

type NavItem = {
  id: string;
  label: string;
  href?: string;
  columns?: DropdownItem[][];
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "productos",
    label: "Productos",
    columns: [
      [
        { icon: "📱", label: "App del usuario", description: "Registrá tu identidad una sola vez", href: "/productos#app-usuario" },
        { icon: "🚪", label: "App de puerta", description: "Control de acceso en 2 segundos", href: "/productos#app-puerta" },
        { icon: "🖥", label: "Panel admin", description: "Gestión completa del venue", href: "/productos#panel-admin" },
      ],
      [
        { icon: "🔍", label: "Motor biométrico", description: "Verificación facial automática", href: "/productos#biometrico" },
        { icon: "🎫", label: "Credencial digital", description: "Identidad portable y reutilizable", href: "/productos#credencial" },
        { icon: "⚙️", label: "API e integraciones", description: "Conectá con tu sistema actual", href: "/productos#api" },
      ],
    ],
  },
  {
    id: "soluciones",
    label: "Soluciones",
    columns: [
      [
        { icon: "🍸", label: "Para boliches y bares", description: "Control de acceso nocturno simplificado", href: "/soluciones#boliches" },
        { icon: "🎪", label: "Para eventos masivos", description: "Gestioná miles de ingresos sin caos", href: "/soluciones#eventos" },
        { icon: "🏢", label: "Para cadenas de venues", description: "Una plataforma para múltiples locales", href: "/soluciones#cadenas" },
        { icon: "👤", label: "Para usuarios finales", description: "Registrate una vez, entrá en todos lados", href: "/soluciones#usuarios" },
        { icon: "🎭", label: "Para organizadores", description: "Coordiná artistas, riders y staff", href: "/soluciones#organizadores" },
      ],
    ],
  },
  {
    id: "precios",
    label: "Precios",
    href: "/precios",
  },
  {
    id: "recursos",
    label: "Recursos",
    columns: [
      [
        { icon: "📚", label: "Aprender", description: "Guías y tutoriales de inicio rápido", href: "/recursos/aprender" },
        { icon: "🏢", label: "Empresa", description: "Quiénes somos y nuestra visión", href: "/recursos/empresa" },
        { icon: "👤", label: "Fundador", description: "Quién construye ID-Night", href: "/recursos/fundador" },
      ],
      [
        { icon: "🛠", label: "Soporte", description: "Ayuda técnica y preguntas frecuentes", href: "/recursos/soporte" },
        { icon: "📍", label: "Contacto", description: "Hablá con el equipo de ID-Night", href: "/recursos/contacto" },
      ],
    ],
  },
  {
    id: "legal",
    label: "Legal",
    columns: [
      [
        { icon: "📜", label: "Términos y condiciones", description: "Condiciones de uso del servicio", href: "/legal/terminos" },
        { icon: "🔒", label: "Política de privacidad", description: "Cómo protegemos tus datos", href: "/legal/privacidad" },
      ],
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setActiveMenu(null);
    });
  }, [pathname]);

  const openMenu = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(id);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const isActive = (item: NavItem) => {
    if (item.href) return pathname === item.href;
    if (item.columns) {
      return item.columns.some((col) => col.some((link) => pathname.startsWith(link.href.split("#")[0])));
    }
    return false;
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080F]/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <span className="text-white font-bold text-sm">ID</span>
          </div>
          <span className="text-white font-semibold text-base tracking-tight">ID-Night</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          onMouseLeave={scheduleClose}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            if (item.href && !item.columns) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors ${
                    active ? "text-white bg-white/8" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div key={item.id} className="relative">
                <button
                  onMouseEnter={() => openMenu(item.id)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm transition-colors ${
                    active || activeMenu === item.id
                      ? "text-white bg-white/8"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  <span
                    className={`text-xs transition-transform duration-200 ${
                      activeMenu === item.id ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence>
                  {activeMenu === item.id && item.columns && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => {
                        if (closeTimer.current) clearTimeout(closeTimer.current);
                      }}
                      onMouseLeave={scheduleClose}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 rounded-2xl border border-white/8 shadow-2xl shadow-black/40 min-w-max"
                      style={{ background: "rgba(15,15,26,0.97)", backdropFilter: "blur(20px)" }}
                    >
                      <div
                        className={`flex gap-2 ${
                          item.columns.length === 1 ? "flex-col" : "flex-row"
                        }`}
                      >
                        {item.columns.map((col, colIdx) => (
                          <div key={colIdx} className="flex flex-col gap-0.5 min-w-[200px]">
                            {col.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-base group-hover:bg-white/8 transition-colors">
                                  {link.icon}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-white text-sm font-medium leading-none mb-1">
                                    {link.label}
                                  </p>
                                  <p className="text-slate-500 text-xs leading-relaxed">
                                    {link.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href="https://admin.idnight.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20 flex-shrink-0"
        >
          Solicitar demo
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-slate-400 hover:text-white p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menú"
        >
          <div className="w-5 space-y-1.5">
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0F0F1A] border-t border-white/6 px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto"
          >
            {NAV_ITEMS.map((item) => {
              if (item.href && !item.columns) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      pathname === item.href
                        ? "text-white bg-white/8"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              const expanded = mobileExpanded === item.id;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => setMobileExpanded(expanded ? null : item.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <span>{item.label}</span>
                    <span
                      className={`text-xs transition-transform duration-200 ${
                        expanded ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {expanded && item.columns && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 py-1 space-y-0.5">
                          {item.columns.flat().map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <span className="text-base">{link.icon}</span>
                              <span>{link.label}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <div className="pt-2">
              <a
                href="https://admin.idnight.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold"
              >
                Solicitar demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
