"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

const MOBILE_MENU_ID = "site-mobile-menu";
const DESKTOP_NAV_ITEMS = [
  { label: "Por qué", href: "/#problema" },
  { label: "Cómo", href: "/#tecnologia" },
] as const;
const MOBILE_GROUPS = [
  {
    label: "La iniciativa",
    links: [
      { label: "Visión", href: "/#vision" },
      { label: "El problema", href: "/#problema" },
      { label: "Qué creemos", href: "/#principios" },
      { label: "Tecnología", href: "/#tecnologia" },
      { label: "Fundador", href: "/#fundador" },
    ],
  },
  {
    label: "Explorar",
    links: [
      { label: "Productos", href: "/productos" },
      { label: "Soluciones", href: "/soluciones" },
      { label: "Precios", href: "/precios" },
      { label: "Aprender", href: "/recursos/aprender" },
      { label: "Contacto", href: "/recursos/contacto" },
    ],
  },
  {
    label: "Legal",
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
  const [mobileOpen, setMobileOpen] = useState(false);
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
    startTransition(() => setMobileOpen(false));
  }, [pathname]);

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

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
          {DESKTOP_NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">
              {item.label}
            </Link>
          ))}
          <Link href="/#participar" className="ml-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">
            Participar
          </Link>
        </nav>

        <button type="button" className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 md:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menú" aria-expanded={mobileOpen} aria-controls={MOBILE_MENU_ID}>
          Menú
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.16 }} className="fixed inset-0 z-50 bg-[#04070f]/75 backdrop-blur-sm md:hidden" onMouseDown={closeMobileMenu}>
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

              {MOBILE_GROUPS.map((group) => (
                <div key={group.label} className="border-t border-white/8 py-4 first:border-t-0 first:pt-0">
                  <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{group.label}</p>
                  <div className="grid gap-1 sm:grid-cols-2">
                    {group.links.map((link) => {
                      const active = isCurrentRoute(pathname, link.href);
                      return <Link key={link.href} href={link.href} onClick={closeMobileMenu} aria-current={active ? "page" : undefined} className={`rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none ${active ? "bg-white/8 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>{link.label}</Link>;
                    })}
                  </div>
                </div>
              ))}

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
