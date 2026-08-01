"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NAVBAR_HEIGHT = 64;
const DESKTOP_SCROLL_DISTANCE = () => Math.round(gsap.utils.clamp(1200, 2000, window.innerHeight * 1.75));

export default function VerificationNarrative() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      const createNarrative = (compact: boolean) => {
        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: container.current,
            start: compact ? "top 88%" : `top ${NAVBAR_HEIGHT}px`,
            end: compact ? "bottom 18%" : () => `+=${DESKTOP_SCROLL_DISTANCE()}`,
            scrub: compact ? 0.35 : 0.65,
            pin: !compact,
            pinSpacing: !compact,
            anticipatePin: compact ? 0 : 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            "[data-device]",
            { autoAlpha: 0, xPercent: compact ? 0 : 18, y: compact ? 34 : 52, rotate: compact ? 0 : 3 },
            { autoAlpha: 1, xPercent: 0, y: 0, rotate: 0, duration: 0.9 },
          )
          .fromTo("[data-eye]", { autoAlpha: 0, scale: 0.86 }, { autoAlpha: 1, scale: 1, duration: 0.55 }, 0.45)
          .fromTo("[data-focus]", { autoAlpha: 0, scale: 0.72 }, { autoAlpha: 1, scale: 1, duration: 0.65 }, 0.72)
          .fromTo("[data-scan]", { autoAlpha: 0, yPercent: -190 }, { autoAlpha: 1, yPercent: -130, duration: 0.2 }, 1.12)
          .fromTo("[data-pending]", { autoAlpha: 0, y: 0 }, { autoAlpha: 1, duration: 0.25 }, 1.02)
          .fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, duration: 1.15, ease: "none" }, 1.18)
          .to("[data-scan]", { yPercent: 190, duration: 1.15, ease: "none" }, 1.18)
          .to("[data-scan]", { autoAlpha: 0, duration: 0.18 }, 2.28)
          .to("[data-pending]", { autoAlpha: 0, y: -8, duration: 0.3 }, 2.22)
          .fromTo("[data-approved]", { autoAlpha: 0, scale: 0.72, y: 10 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.5)" }, 2.38);

        return timeline;
      };

      media.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => createNarrative(false));
      // Small viewports reveal the same story without pinning so tall content never traps the scroll.
      media.add("(prefers-reduced-motion: no-preference) and (max-width: 1023px)", () => createNarrative(true));

      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <article
      ref={container}
      data-verification-narrative
      aria-labelledby="verification-narrative-title"
      className="relative overflow-hidden border-y border-white/8 bg-[#090b16]"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(56,189,248,0.12),transparent_34%),radial-gradient(circle_at_25%_28%,rgba(124,58,237,0.12),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-6 md:py-20 lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">Demostración conceptual</p>
          <h2 id="verification-narrative-title" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Verificar con consentimiento, decidir con contexto.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            Este recorrido imagina un flujo posible: la persona inicia la verificación, el sistema procesa sólo la señal necesaria y una persona autorizada conserva el criterio final.
          </p>
          <p className="mt-5 border-l border-violet-400/50 pl-4 text-sm leading-7 text-slate-400">
            No representa reconocimiento autónomo ni garantiza identidad o seguridad. Es una visualización de una tecnología en desarrollo, no una interfaz de producto disponible.
          </p>
        </div>

        <div aria-hidden="true" className="relative mx-auto flex min-h-[440px] w-full max-w-[520px] items-center justify-center sm:min-h-[500px]">
          <div aria-hidden="true" className="absolute h-72 w-72 rounded-full border border-cyan-300/10 bg-cyan-300/[0.025] sm:h-96 sm:w-96" />
          <div aria-hidden="true" className="absolute h-56 w-56 rotate-45 rounded-[38%] border border-violet-400/10 sm:h-72 sm:w-72" />

          <div data-device className="relative w-[238px] opacity-0 motion-reduce:opacity-100 rounded-[42px] border border-white/20 bg-[#080a12] p-2 shadow-[0_34px_90px_rgba(2,8,23,0.7),0_0_60px_rgba(56,189,248,0.12)] sm:w-[270px]">
            <div className="relative aspect-[9/18] overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(160deg,#11172a_0%,#090b14_58%,#11102a_100%)]">
              <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black/80" />
              <div className="absolute inset-x-5 top-12 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-500">
                <span>Flujo consentido</span>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
              </div>

              <div className="absolute inset-x-5 top-[29%] aspect-square">
                <div data-focus className="absolute inset-0 opacity-0 motion-reduce:opacity-100">
                  <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-cyan-300/80" />
                  <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-cyan-300/80" />
                  <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-violet-400/80" />
                  <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-violet-400/80" />
                </div>

                <div data-eye className="absolute inset-7 flex items-center justify-center rounded-full border border-white/8 bg-white/[0.025] opacity-0 motion-reduce:opacity-100">
                  <svg aria-hidden="true" viewBox="0 0 180 110" className="w-[82%] overflow-visible">
                    <defs>
                      <linearGradient id="verification-eye-gradient" x1="0" x2="1">
                        <stop stopColor="#38bdf8" />
                        <stop offset="1" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <path d="M12 55C34 20 64 10 90 10s56 10 78 45c-22 35-52 45-78 45S34 90 12 55Z" fill="none" stroke="url(#verification-eye-gradient)" strokeWidth="3" />
                    <circle cx="90" cy="55" r="27" fill="#11172a" stroke="#67e8f9" strokeWidth="2" />
                    <circle cx="90" cy="55" r="12" fill="#7c3aed" />
                    <circle cx="96" cy="48" r="4" fill="#e0f2fe" />
                  </svg>
                </div>

                <div data-scan className="absolute inset-x-3 top-1/2 h-px bg-cyan-200 opacity-0 shadow-[0_0_8px_2px_rgba(103,232,249,0.7),0_0_24px_8px_rgba(56,189,248,0.22)]" />
              </div>

              <div className="absolute inset-x-6 bottom-20">
                <div className="h-1 overflow-hidden rounded-full bg-white/8">
                  <div data-progress className="h-full origin-left scale-x-0 motion-reduce:scale-x-100 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500" />
                </div>
                <p data-pending aria-hidden="true" className="absolute inset-x-0 mt-4 text-center text-xs font-medium tracking-wide text-slate-400 opacity-0">Procesando señal autorizada</p>
              </div>

              <div data-approved className="absolute inset-x-5 bottom-7 flex items-center justify-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 opacity-0 motion-reduce:opacity-100">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#22d3ee" fillOpacity="0.16" stroke="#67e8f9" />
                  <path d="m7.5 12 3 3 6-7" stroke="#cffafe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verificación aprobada
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
