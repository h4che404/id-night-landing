import Image from "next/image";
import Link from "next/link";
import NeuralBackground from "@/components/home/NeuralBackground";
import Reveal from "@/components/home/Reveal";
import { buildHomepageContact } from "@/components/home/contact";
import { homepageContent } from "@/components/home/homepage-content";

const shell = "mx-auto max-w-6xl px-5 py-20 sm:px-6 md:py-28";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80";
const card = "rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.76),rgba(8,12,24,0.94))] shadow-[0_24px_80px_rgba(6,12,28,0.28)]";
const problemSituations = [{ title: "Decisiones en segundos", description: "En puerta hay situaciones que exigen criterio inmediato y mejor contexto compartido." }, { title: "Accesos", description: "El ingreso suele depender de información que no siempre llega clara ni a tiempo." }, { title: "Listas", description: "Los cambios de último momento circulan por canales distintos y generan fricción." }, { title: "Excepciones", description: "Los casos especiales necesitan criterios visibles y trazabilidad para todo el equipo." }, { title: "Incidentes", description: "Lo que ocurre durante la noche no siempre queda registrado de una forma útil para aprender." }, { title: "Información distribuida", description: "Papeles, mensajes y distintas personas concentran datos que deberían poder leerse con más claridad." }];
const beliefs = [{ title: "Prevenir antes que reaccionar", description: "Queremos ayudar a anticipar decisiones difíciles, no llegar siempre después del problema." }, { title: "Privacidad desde el diseño", description: "La información tiene que ser limitada, pertinente y protegida en cada momento del proceso." }, { title: "Acompañar sin vigilar", description: "La tecnología debe asistir a quienes cuidan y organizan, sin convertir la noche en un espacio de vigilancia permanente." }, { title: "La decisión sigue siendo humana", description: "Buscamos fortalecer criterios, procesos y registro para que las personas decidan con más claridad." }];
const actorGroups = [{ title: "Quienes salen", description: "Viven la experiencia completa y necesitan accesos más claros, ágiles y respetuosos." }, { title: "Productores y organizadores", description: "Coordinan ingresos, excepciones y equipos bajo mucha presión operativa." }, { title: "Espacios y venues", description: "Necesitan ordenar su operación sin perder cercanía ni criterio propio." }, { title: "Equipos de acceso", description: "Toman decisiones en segundos y necesitan contexto útil para actuar mejor." }, { title: "Equipos de cuidado", description: "Intervienen cuando hay incidentes y requieren procesos más claros para registrar y aprender." }, { title: "Instituciones y referentes", description: "Pueden ayudar a construir estándares, colaboración y mejores prácticas para la nocturnidad." }];
const stageBlocks = [{ title: "Escuchamos", description: "Estamos conversando con quienes salen, organizan, trabajan y cuidan para entender mejor la noche desde adentro." }, { title: "Investigamos", description: "Buscamos identificar qué información hace falta, cuándo hace falta y cómo debería circular sin invadir más de lo necesario." }, { title: "Construimos", description: "Diseñamos herramientas para identidad, accesos, decisiones e incidentes con intervención humana y privacidad como base." }, { title: "Probamos", description: "Queremos validar aprendizajes en contextos reales, con prudencia, escucha y mejora continua antes de prometer certezas." }];
const technologyCapabilities = ["Verificación de identidad y mayoría de edad con criterios de privacidad y revisión humana.", "Gestión de accesos y listas con mejor contexto para cada decisión.", "Herramientas para personal de acceso y operación en momentos de alta demanda.", "Registro claro de decisiones, excepciones y motivos de intervención.", "Documentación de incidentes para aprender, ordenar y mejorar procesos.", "Trazabilidad y reportes para comprender mejor lo que pasó durante cada noche.", "Protección de datos y uso acotado de biometría solo como apoyo de verificación con salvaguardas."];
const founderBody = ["Soy Juan Cruz, nacido en 2003 en San Martín, Mendoza. Estudio la Tecnicatura Universitaria en Programación en la UTN y desde ahí construyo software con una idea fija: la tecnología tiene que resolver problemas reales, no impresionar en una demo.", "ID-NIGHT nace desde esa convicción. Hoy lo desarrollo de manera individual, escuchando a quienes viven, organizan, trabajan y cuidan la noche para entender qué herramientas pueden ayudar de verdad sin invadir más de lo necesario.", "Estoy en etapa de conversación, diseño y construcción. Por eso esta iniciativa busca sumar experiencias, preguntas y aprendizajes antes de prometer certezas."];

function Title({ id, label, title }: { id: string; label: string; title: string }) {
  return <><p className={eyebrow}>{label}</p><h2 id={id} className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">{title}</h2></>;
}

function CopyCard({ title, description }: { title: string; description: string }) {
  return <article className={`${card} h-full p-5 sm:p-6`}><h3 className="text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-300">{description}</p></article>;
}

function CardGrid({ items, columns = "md:grid-cols-2 xl:grid-cols-3" }: { items: readonly { title: string; description: string }[]; columns?: string }) {
  return <div className={`mt-10 grid gap-4 ${columns}`}>{items.map((item, index) => <Reveal key={item.title} delay={Math.min(index * 0.05, 0.2)}><CopyCard title={item.title} description={item.description} /></Reveal>)}</div>;
}

export function HeroSection() {
  const contact = buildHomepageContact(homepageContent.hero.secondaryCta.profile);

  return (
    <section id={homepageContent.hero.id} aria-labelledby="home-vision-title" className="relative isolate flex min-h-[min(860px,100svh)] items-center overflow-hidden border-b border-white/8 pt-16">
      <NeuralBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,8,15,0.2)_0%,rgba(8,8,15,0.62)_58%,#08080f_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,15,0.2),rgba(8,8,15,0.05)_48%,#08080f_100%)]" />
      <div className="relative mx-auto w-full max-w-5xl px-5 py-20 text-center sm:px-6 md:py-28">
        <p className={eyebrow}>{homepageContent.hero.eyebrow}</p>
        <h1 id="home-vision-title" className="mx-auto mt-6 max-w-4xl text-[clamp(2.55rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">{homepageContent.hero.title}</h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg md:text-xl">{homepageContent.hero.description}</p>
        <div className="mx-auto mt-9 flex max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
          <Link href={homepageContent.hero.primaryCta.href} className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">{homepageContent.hero.primaryCta.label}</Link>
          <a href={contact.href} className="rounded-full border border-white/18 bg-[#08080f]/55 px-6 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">{homepageContent.hero.secondaryCta.label}</a>
        </div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  return <section id={homepageContent.problem.id} aria-labelledby="home-problem-title" className={shell}><Reveal><Title id="home-problem-title" label={homepageContent.problem.label} title={homepageContent.problem.title} /><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{homepageContent.problem.description}</p></Reveal><CardGrid items={problemSituations} /><Reveal className="mt-10 max-w-3xl border-l-2 border-cyan-300/60 pl-5" delay={0.1}><p className="text-lg leading-8 text-slate-100">{homepageContent.problem.closing}</p></Reveal></section>;
}

export function BeliefsSection() {
  return <section id={homepageContent.beliefs.id} aria-labelledby="home-beliefs-title" className="border-y border-white/8 bg-white/[0.015]"><div className={shell}><Reveal><Title id="home-beliefs-title" label={homepageContent.beliefs.label} title={homepageContent.beliefs.title} /></Reveal><CardGrid items={beliefs} columns="md:grid-cols-2" /></div></section>;
}

export function ActorsSection() {
  return <section id={homepageContent.actors.id} aria-labelledby="home-actors-title" className={shell}><Reveal><Title id="home-actors-title" label={homepageContent.actors.label} title={homepageContent.actors.title} /><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{homepageContent.actors.description}</p></Reveal><CardGrid items={actorGroups} /></section>;
}

export function CurrentStageSection() {
  return <section id={homepageContent.currentStage.id} aria-labelledby="home-stage-title" className="border-y border-white/8 bg-white/[0.015]"><div className={shell}><Reveal><Title id="home-stage-title" label={homepageContent.currentStage.label} title={homepageContent.currentStage.title} /><p className="mt-6 max-w-3xl text-base leading-8 text-slate-400">{homepageContent.hero.status}</p></Reveal><CardGrid items={stageBlocks} columns="md:grid-cols-2 xl:grid-cols-4" /></div></section>;
}

export function TechnologySection() {
  return <section id={homepageContent.technology.id} aria-labelledby="home-technology-title" className={shell}><Reveal><Title id="home-technology-title" label={homepageContent.technology.label} title={homepageContent.technology.title} /><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{homepageContent.technology.description}</p></Reveal><div className="mt-10 grid gap-x-10 gap-y-4 lg:grid-cols-2">{technologyCapabilities.map((item, index) => <Reveal key={item} delay={Math.min(index * 0.04, 0.2)}><div className="flex gap-4 border-b border-white/8 py-4"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" /><p className="text-sm leading-7 text-slate-200">{item}</p></div></Reveal>)}</div><Reveal className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href={homepageContent.technology.cta.href} className="rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">{homepageContent.technology.cta.label}</Link><Link href={homepageContent.routes.privacy} className="rounded-full border border-white/14 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">Política de privacidad</Link></Reveal></section>;
}

export function ParticipationSection() {
  return <section id={homepageContent.participation.id} aria-labelledby="home-participation-title" className="border-y border-white/8 bg-white/[0.015]"><div className={shell}><Reveal><Title id="home-participation-title" label={homepageContent.participation.label} title={homepageContent.participation.title} /></Reveal><div className="mt-10 grid gap-4 lg:grid-cols-3">{homepageContent.participation.cards.map((item, index) => { const contact = buildHomepageContact(item.profile); return <Reveal key={item.profile} delay={index * 0.07}><article className={`${card} flex h-full flex-col p-6`}><h3 className="text-xl font-semibold text-white">{item.title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{item.description}</p><a href={contact.href} className="mt-6 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">{item.ctaLabel}</a></article></Reveal>; })}</div></div></section>;
}

export function FounderSection() {
  return <section id={homepageContent.founder.id} aria-labelledby="home-founder-title" className={shell}><div className="grid gap-10 lg:grid-cols-[minmax(260px,340px)_minmax(0,1fr)] lg:items-center"><Reveal><div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-[0_30px_100px_rgba(6,12,28,0.45)]"><Image src="/founder.jpeg" alt="Juan Cruz, fundador de ID-NIGHT, en Mendoza" fill sizes="(max-width: 1023px) calc(100vw - 40px), 340px" className="object-cover object-[50%_32%]" /></div></Reveal><Reveal delay={0.08}><Title id="home-founder-title" label={homepageContent.founder.label} title={homepageContent.founder.title} /><div className="mt-7 space-y-4 text-base leading-8 text-slate-300">{founderBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></Reveal></div></section>;
}

export function FinalCtaSection() {
  const contact = buildHomepageContact(homepageContent.finalCta.primaryCta.profile);
  return <section id={homepageContent.finalCta.id} aria-labelledby="home-final-cta-title" className={`${shell} pt-0 md:pt-0`}><Reveal><div className={`${card} relative overflow-hidden p-7 sm:p-9 md:p-12`}><div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl" /><h2 id="home-final-cta-title" className="relative max-w-4xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">{homepageContent.finalCta.title}</h2><p className="relative mt-5 max-w-3xl text-lg leading-8 text-slate-300">{homepageContent.finalCta.description}</p><div className="relative mt-8 flex flex-col gap-3 sm:flex-row"><a href={contact.href} className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">{homepageContent.finalCta.primaryCta.label}</a><Link href={homepageContent.finalCta.secondaryCta.href} className="rounded-full border border-white/14 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 motion-reduce:transition-none">{homepageContent.finalCta.secondaryCta.label}</Link></div><p className="relative mt-6 text-xs uppercase tracking-[0.2em] text-slate-400 sm:text-sm sm:tracking-[0.24em]">{homepageContent.finalCta.closing}</p></div></Reveal></section>;
}
