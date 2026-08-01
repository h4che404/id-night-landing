"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

const MOBILE_MENU_ID = "site-mobile-menu";
const DESKTOP_MENU_ID = "site-explore-menu";
const DESKTOP_NAV_ITEMS = [
  { label: "Por qué", href: "/#problema" },
  { label: "Cómo", href: "/#tecnologia" },
] as const;
const EXPLORE_GROUPS = [
  {
    id: "initiative",
    label: "La iniciativa",
    description: "Por qué existe, qué creemos y quién la impulsa.",
    links: [
      { label: "Visión", href: "/#vision" },
      { label: "El problema", href: "/#problema" },
      { label: "Qué creemos", href: "/#principios" },
      { label: "A quiénes escuchamos", href: "/#actores" },
      { label: "Etapa actual", href: "/#etapa" },
      { label: "Fundador", href: "/#fundador" },
    ],
  },
  {
    id: "technology",
    label: "Tecnología",
    description: "La plataforma, sus productos y herramientas.",
    links: [
      { label: "Cómo funciona", href: "/#tecnologia" },
      { label: "Todos los productos", href: "/productos" },
      { label: "App del usuario", href: "/productos#app-usuario" },
      { label: "App de puerta", href: "/productos#app-puerta" },
      { label: "Panel admin", href: "/productos#panel-admin" },
      { label: "Motor biométrico", href: "/productos#biometrico" },
      { label: "Credencial digital", href: "/productos#credencial" },
      { label: "API e integraciones", href: "/productos#api" },
    ],
  },
  {
    id: "solutions",
    label: "Soluciones",
    description: "Propuestas para cada operación y tipo de espacio.",
    links: [
      { label: "Todas las soluciones", href: "/soluciones" },
      { label: "Boliches y bares", href: "/soluciones#boliches" },
      { label: "Eventos masivos", href: "/soluciones#eventos" },
      { label: "Cadenas de venues", href: "/soluciones#cadenas" },
      { label: "Usuarios finales", href: "/soluciones#usuarios" },
      { label: "Organizadores", href: "/soluciones#organizadores" },
      { label: "Precios", href: "/precios" },
    ],
  },
  {
    id: "resources",
    label: "Recursos",
    description: "Información, aprendizaje y canales de contacto.",
    links: [
      { label: "Todos los recursos", href: "/recursos" },
      { label: "Aprender", href: "/recursos/aprender" },
      { label: "Empresa", href: "/recursos/empresa" },
      { label: "Fundador", href: "/recursos/fundador" },
      { label: "Soporte", href: "/recursos/soporte" },
      { label: "Contacto", href: "/recursos/contacto" },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    description: "Privacidad y condiciones de uso.",
    links: [
      { label: "Política de privacidad", href: "/legal/privacidad" },
      { label: "Términos y condiciones", href: "/legal/terminos" },
    ],
  },
] as const;

function isCurrentRoute(pathname: string, href: string) {
  return !href.includes("#") && pathname === href;
}

export default function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const desktopNavRef = useRef<HTMLElement>(null);
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    startTransition(() => {
      setDesktopOpen(false);
      setMobileOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    if (!desktopOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) setDesktopOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setDesktopOpen(false);
      desktopTriggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [desktopOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarCompensation = window.innerWidth - document.documentElement.clientWidth;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    if (scrollbarCompensation > 0) document.body.style.paddingRight = `${scrollbarCompensation}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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

  const closeMobileMenu = () => setMobileOpen(false);
  const closeDesktopMenu = () => setDesktopOpen(false);
  const exploreActive = EXPLORE_GROUPS.some((group) => group.links.some((link) => isCurrentRoute(pathname, link.href)));

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 motion-reduce:transition-none ${scrolled ? "border-white/8 bg-[#08080F]/88 shadow-lg shadow-black/20 backdrop-blur-xl" : "border-transparent bg-gradient-to-b from-[#08080F]/70 to-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
          <Image src="/logo.png" alt="ID-Night" width={32} height={32} className="h-8 w-8 rounded-lg" />
          <span className="text-base font-semibold tracking-tight text-white">ID-Night</span>
        </Link>

        <nav
          ref={desktopNavRef}
          aria-label="Navegación principal"
          className="hidden items-center gap-1 lg:flex"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) closeDesktopMenu();
          }}
        >
          {DESKTOP_NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeDesktopMenu} className="rounded-full px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">
              {item.label}
            </Link>
          ))}
          <button
            ref={desktopTriggerRef}
            type="button"
            aria-expanded={desktopOpen}
            aria-controls={DESKTOP_MENU_ID}
            onClick={() => setDesktopOpen((open) => !open)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowDown") return;
              event.preventDefault();
              setDesktopOpen(true);
              window.requestAnimationFrame(() => desktopMenuRef.current?.querySelector<HTMLElement>("a[href]")?.focus());
            }}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none ${desktopOpen || exploreActive ? "bg-white/8 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
          >
            Explorar
            <span aria-hidden="true" className={`text-xs transition-transform duration-200 motion-reduce:transition-none ${desktopOpen ? "rotate-180" : ""}`}>▾</span>
          </button>
          <AnimatePresence>
            {desktopOpen && (
              <motion.div
                ref={desktopMenuRef}
                id={DESKTOP_MENU_ID}
                aria-label="Explorar ID-Night"
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.18 }}
                className="absolute inset-x-4 top-[calc(100%+0.5rem)] max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-[28px] border border-white/10 bg-[#0F0F1A]/98 p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:inset-x-6 xl:left-1/2 xl:right-auto xl:w-[min(1180px,calc(100vw-3rem))] xl:-translate-x-1/2"
              >
                <div className="mb-4 border-b border-white/8 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Explorar ID-Night</p>
                    <p className="mt-1 text-xs text-slate-400">Propósito, tecnología, soluciones y recursos en un solo lugar.</p>
                  </div>
                </div>
                <div className="grid gap-3 lg:grid-cols-3" data-explore-groups="desktop">
                  {EXPLORE_GROUPS.map((group) => (
                    <section key={group.id} aria-labelledby={`${DESKTOP_MENU_ID}-${group.id}`} aria-describedby={`${DESKTOP_MENU_ID}-${group.id}-description`} className="rounded-2xl border border-white/8 bg-white/[0.025] p-3">
                      <div className="mb-2 border-b border-white/8 px-2 pb-3">
                        <h2 id={`${DESKTOP_MENU_ID}-${group.id}`} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300/80">{group.label}</h2>
                        <p id={`${DESKTOP_MENU_ID}-${group.id}-description`} className="mt-1 text-xs leading-5 text-slate-400">{group.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-0.5">
                        {group.links.map((link) => {
                          const active = isCurrentRoute(pathname, link.href);
                          return <Link key={link.href} href={link.href} onClick={closeDesktopMenu} aria-current={active ? "page" : undefined} className={`rounded-xl px-3 py-2 text-sm leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none ${active ? "bg-white/8 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>{link.label}</Link>;
                        })}
                      </div>
                    </section>
                  ))}
                </div>
                <div className="mt-3 flex justify-end border-t border-white/8 pt-3">
                  <Link href="/#participar" onClick={closeDesktopMenu} className="rounded-full border border-cyan-300/25 bg-cyan-300/8 px-4 py-2 text-xs font-semibold text-cyan-100 transition-colors hover:bg-cyan-300/14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">
                    Sumate a la conversación
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Link href="/#participar" onClick={closeDesktopMenu} className="ml-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">
            Participar
          </Link>
        </nav>

        <button type="button" className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menú" aria-expanded={mobileOpen} aria-controls={MOBILE_MENU_ID}>
          Menú
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.16 }} className="fixed inset-0 z-50 bg-[#04070f]/75 backdrop-blur-sm lg:hidden" onMouseDown={closeMobileMenu}>
            <motion.div
              ref={menuRef}
              id={MOBILE_MENU_ID}
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              initial={reduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="absolute inset-x-3 top-3 max-h-[calc(100dvh-24px)] overflow-y-auto rounded-[28px] border border-white/10 bg-[#0F0F1A] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] shadow-2xl shadow-black/40"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">Explorar ID-Night</p>
                <button ref={closeButtonRef} type="button" onClick={closeMobileMenu} className="rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                  Cerrar
                </button>
              </div>

              <div className="grid gap-2" data-explore-groups="mobile">
                {EXPLORE_GROUPS.map((group) => (
                  <section key={group.id} aria-labelledby={`${MOBILE_MENU_ID}-${group.id}`} className="rounded-2xl border border-white/8 bg-white/[0.025] p-2.5">
                    <h2 id={`${MOBILE_MENU_ID}-${group.id}`} className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{group.label}</h2>
                    <div className="grid grid-cols-2 gap-1">
                    {group.links.map((link) => {
                      const active = isCurrentRoute(pathname, link.href);
                      return <Link key={link.href} href={link.href} onClick={closeMobileMenu} aria-current={active ? "page" : undefined} className={`rounded-lg px-2 py-2 text-sm leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none ${active ? "bg-white/8 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>{link.label}</Link>;
                    })}
                    </div>
                  </section>
                ))}
              </div>

              <Link href="/#participar" onClick={closeMobileMenu} className="mt-1 block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                Participar
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
