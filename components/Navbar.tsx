"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, startTransition } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  Drama,
  DoorOpen,
  Lock,
  MapPin,
  Martini,
  Monitor,
  ScanFace,
  ScrollText,
  Settings2,
  Smartphone,
  Ticket,
  Tent,
  UserRound,
  Wrench,
} from "lucide-react";
import BrandIcon from "@/components/BrandIcon";

type DropdownItem = {
  icon: LucideIcon;
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

const MOBILE_MENU_ID = "site-mobile-menu";

const PRIMARY_NAV_ITEMS = [
  { id: "vision", label: "Visión", href: "/#vision" },
  { id: "principios", label: "Qué creemos", href: "/#principios" },
  { id: "tecnologia", label: "Tecnología", href: "/#tecnologia" },
  { id: "participar", label: "Participar", href: "/#participar" },
  { id: "privacidad", label: "Privacidad", href: "/legal/privacidad" },
] as const;

const NAV_ITEMS: NavItem[] = [
  {
    id: "productos",
    label: "Productos",
    columns: [
      [
        { icon: Smartphone, label: "App del usuario", description: "Registrá tu identidad una sola vez", href: "/productos#app-usuario" },
        { icon: DoorOpen, label: "App de puerta", description: "Control de acceso en 2 segundos", href: "/productos#app-puerta" },
        { icon: Monitor, label: "Panel admin", description: "Gestión completa del venue", href: "/productos#panel-admin" },
      ],
      [
        { icon: ScanFace, label: "Motor biométrico", description: "Verificación facial automática", href: "/productos#biometrico" },
        { icon: Ticket, label: "Credencial digital", description: "Identidad portable y reutilizable", href: "/productos#credencial" },
        { icon: Settings2, label: "API e integraciones", description: "Conectá con tu sistema actual", href: "/productos#api" },
      ],
    ],
  },
  {
    id: "soluciones",
    label: "Soluciones",
    columns: [
      [
        { icon: Martini, label: "Para boliches y bares", description: "Control de acceso nocturno simplificado", href: "/soluciones#boliches" },
        { icon: Tent, label: "Para eventos masivos", description: "Gestioná miles de ingresos sin caos", href: "/soluciones#eventos" },
        { icon: Building2, label: "Para cadenas de venues", description: "Una plataforma para múltiples locales", href: "/soluciones#cadenas" },
        { icon: UserRound, label: "Para usuarios finales", description: "Registrate una vez, entrá en todos lados", href: "/soluciones#usuarios" },
        { icon: Drama, label: "Para organizadores", description: "Coordiná artistas, riders y staff", href: "/soluciones#organizadores" },
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
        { icon: BookOpen, label: "Aprender", description: "Guías y tutoriales de inicio rápido", href: "/recursos/aprender" },
        { icon: Building2, label: "Empresa", description: "Quiénes somos y nuestra visión", href: "/recursos/empresa" },
        { icon: UserRound, label: "Fundador", description: "Quién construye ID-Night", href: "/recursos/fundador" },
      ],
      [
        { icon: Wrench, label: "Soporte", description: "Ayuda técnica y preguntas frecuentes", href: "/recursos/soporte" },
        { icon: MapPin, label: "Contacto", description: "Hablá con el equipo de ID-Night", href: "/recursos/contacto" },
      ],
    ],
  },
  {
    id: "legal",
    label: "Legal",
    columns: [
      [
        { icon: ScrollText, label: "Términos y condiciones", description: "Condiciones de uso del servicio", href: "/legal/terminos" },
        { icon: Lock, label: "Política de privacidad", description: "Cómo protegemos tus datos", href: "/legal/privacidad" },
      ],
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarCompensation = window.innerWidth - document.documentElement.clientWidth;

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    if (scrollbarCompensation > 0) document.body.style.paddingRight = `${scrollbarCompensation}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      returnFocusRef.current?.focus();
    };
  }, [mobileOpen]);

  const openMenu = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(id);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const isActive = (item: NavItem) => {
    if (item.href) return pathname === item.href.split("#")[0];
    if (item.columns) {
      return item.columns.some((col) => col.some((link) => pathname.startsWith(link.href.split("#")[0])));
    }
    return false;
  };

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 motion-reduce:transition-none motion-reduce:duration-0 ${
        scrolled
          ? "bg-[#08080F]/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Image src="/logo.png" alt="ID-Night" width={32} height={32} className="w-8 h-8 rounded-lg" priority />
          <span className="text-white font-semibold text-base tracking-tight">ID-Night</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1" onMouseLeave={scheduleClose}>
          {PRIMARY_NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors motion-reduce:transition-none motion-reduce:duration-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
                pathname === item.href.split("#")[0]
                  ? "text-white bg-white/8"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            if (item.href && !item.columns) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors motion-reduce:transition-none motion-reduce:duration-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
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
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm transition-colors motion-reduce:transition-none motion-reduce:duration-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
                    active || activeMenu === item.id
                      ? "text-white bg-white/8"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  <span
                    className={`text-xs transition-transform duration-200 motion-reduce:transition-none motion-reduce:duration-0 ${
                      activeMenu === item.id ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence>
                  {activeMenu === item.id && item.columns && (
                    <motion.div
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.2 }}
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
                                className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5 motion-reduce:transition-none motion-reduce:duration-0"
                              >
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:bg-white/8 motion-reduce:transition-none motion-reduce:duration-0">
                                  <BrandIcon icon={link.icon} className="w-4 h-4" />
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
        {/* Mobile hamburger */}
        <button
          ref={toggleButtonRef}
          className="xl:hidden text-slate-400 hover:text-white p-1"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Menú"
          aria-expanded={mobileOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          <div className="w-5 space-y-1.5">
            <span
              className={`block h-0.5 bg-current transition-all duration-300 motion-reduce:transition-none motion-reduce:duration-0 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 motion-reduce:transition-none motion-reduce:duration-0 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 motion-reduce:transition-none motion-reduce:duration-0 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.16 }} className="xl:hidden fixed inset-0 z-50 bg-[#04070f]/70 backdrop-blur-sm" onClick={closeMobileMenu}>
            <motion.div
              id={MOBILE_MENU_ID}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="absolute inset-x-3 top-3 max-h-[calc(100dvh-24px)] overflow-y-auto rounded-[28px] border border-white/10 bg-[#0F0F1A] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] shadow-2xl shadow-black/40"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">Explorar ID-Night</p>
                <button ref={closeButtonRef} type="button" onClick={closeMobileMenu} className="rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                  Cerrar menú
                </button>
              </div>

              <div className="space-y-1 border-b border-white/8 pb-4">
                {PRIMARY_NAV_ITEMS.map((item) => (
                  <Link key={item.id} href={item.href} onClick={closeMobileMenu} className="block rounded-lg px-3 py-2.5 text-sm text-slate-200 transition-colors hover:bg-white/5 hover:text-white motion-reduce:transition-none motion-reduce:duration-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="space-y-1 pt-4">
                {NAV_ITEMS.map((item) => {
              if (item.href && !item.columns) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition-colors motion-reduce:transition-none motion-reduce:duration-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
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
                    aria-expanded={expanded}
                    aria-controls={`${MOBILE_MENU_ID}-${item.id}`}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white motion-reduce:transition-none motion-reduce:duration-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    <span>{item.label}</span>
                    <span
                      className={`text-xs transition-transform duration-200 motion-reduce:transition-none motion-reduce:duration-0 ${
                        expanded ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {expanded && item.columns && (
                      <motion.div
                        id={`${MOBILE_MENU_ID}-${item.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 py-1 space-y-0.5">
                          {item.columns.flat().map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={closeMobileMenu}
                                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white motion-reduce:transition-none motion-reduce:duration-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                            >
                              <BrandIcon icon={link.icon} className="w-4 h-4" />
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
