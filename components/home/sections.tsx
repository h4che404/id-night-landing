import Link from "next/link";
import { buildHomepageContact } from "@/components/home/contact";
import { homepageContent } from "@/components/home/homepage-content";

const shell = "mx-auto max-w-6xl px-6 py-16 md:py-24";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300/80";
const card = "rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.82),rgba(8,12,24,0.95))] shadow-[0_24px_80px_rgba(6,12,28,0.34)]";
const problemSituations = [{ title: "Decisiones en segundos", description: "En puerta hay situaciones que exigen criterio inmediato y mejor contexto compartido." }, { title: "Accesos", description: "El ingreso suele depender de información que no siempre llega clara ni a tiempo." }, { title: "Listas", description: "Los cambios de último momento circulan por canales distintos y generan fricción." }, { title: "Excepciones", description: "Los casos especiales necesitan criterios visibles y trazabilidad para todo el equipo." }, { title: "Incidentes", description: "Lo que ocurre durante la noche no siempre queda registrado de una forma útil para aprender." }, { title: "Información distribuida", description: "Papeles, mensajes y distintas personas concentran datos que deberían poder leerse con más claridad." }];
const beliefs = [{ title: "Prevenir antes que reaccionar", description: "Queremos ayudar a anticipar decisiones difíciles, no llegar siempre después del problema." }, { title: "Privacidad desde el diseño", description: "La información tiene que ser limitada, pertinente y protegida en cada momento del proceso." }, { title: "Acompañar sin vigilar", description: "La tecnología debe asistir a quienes cuidan y organizan, sin convertir la noche en un espacio de vigilancia permanente." }, { title: "La decisión sigue siendo humana", description: "Buscamos fortalecer criterios, procesos y registro para que las personas decidan con más claridad." }];
const actorGroups = [{ title: "Quienes salen", description: "Viven la experiencia completa y necesitan accesos más claros, ágiles y respetuosos." }, { title: "Productores y organizadores", description: "Coordinan ingresos, excepciones y equipos bajo mucha presión operativa." }, { title: "Espacios y venues", description: "Necesitan ordenar su operación sin perder cercanía ni criterio propio." }, { title: "Equipos de acceso", description: "Toman decisiones en segundos y necesitan contexto útil para actuar mejor." }, { title: "Equipos de cuidado", description: "Intervienen cuando hay incidentes y requieren procesos más claros para registrar y aprender." }, { title: "Instituciones y referentes", description: "Pueden ayudar a construir estándares, colaboración y mejores prácticas para la nocturnidad." }];
const stageBlocks = [{ title: "Escuchamos", description: "Estamos conversando con quienes salen, organizan, trabajan y cuidan para entender mejor la noche desde adentro." }, { title: "Investigamos", description: "Buscamos identificar qué información hace falta, cuándo hace falta y cómo debería circular sin invadir más de lo necesario." }, { title: "Construimos", description: "Diseñamos herramientas para identidad, accesos, decisiones e incidentes con intervención humana y privacidad como base." }, { title: "Probamos", description: "Queremos validar aprendizajes en contextos reales, con prudencia, escucha y mejora continua antes de prometer certezas." }];
const technologyCapabilities = ["Verificación de identidad y mayoría de edad con criterios de privacidad y revisión humana.", "Gestión de accesos y listas con mejor contexto para cada decisión.", "Herramientas para personal de acceso y operación en momentos de alta demanda.", "Registro claro de decisiones, excepciones y motivos de intervención.", "Documentación de incidentes para aprender, ordenar y mejorar procesos.", "Trazabilidad y reportes para comprender mejor lo que pasó durante cada noche.", "Protección de datos y uso acotado de biometría solo como apoyo de verificación con salvaguardas."];
const founderBody = ["Soy Juan Cruz, nacido en 2003 en San Martín, Mendoza. Estudio la Tecnicatura Universitaria en Programación en la UTN y desde ahí construyo software con una idea fija: la tecnología tiene que resolver problemas reales, no impresionar en una demo.", "ID-NIGHT nace desde esa convicción. Hoy lo desarrollo de manera individual, escuchando a quienes viven, organizan, trabajan y cuidan la noche para entender qué herramientas pueden ayudar de verdad sin invadir más de lo necesario.", "Estoy en etapa de conversación, diseño y construcción. Por eso esta iniciativa busca sumar experiencias, preguntas y aprendizajes antes de prometer certezas."];

function Title({ id, label, title }: { id: string; label: string; title: string }) {
  return <><p className={eyebrow}>{label}</p><h2 id={id} className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">{title}</h2></>;
}

function CopyCard({ title, description }: { title: string; description: string }) {
  return <article className={`${card} p-5`}><h3 className="text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-300">{description}</p></article>;
}

export function HeroSection() {
  const contact = buildHomepageContact(homepageContent.hero.primaryCta.profile);

  return (
    <section id={homepageContent.hero.id} aria-labelledby="home-vision-title" className="relative overflow-hidden border-b border-white/8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.18),transparent_32%)]" />
      <div className={`${shell} relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center`}>
        <div className="space-y-6">
          <p className={eyebrow}>{homepageContent.hero.eyebrow}</p>
          <h1 id="home-vision-title" className="max-w-3xl text-[clamp(2.7rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">{homepageContent.hero.title}</h1>
          <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-xl">{homepageContent.hero.description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={contact.href} className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">{homepageContent.hero.primaryCta.label}</a>
            <Link href={homepageContent.hero.secondaryCta.href} className="rounded-full border border-white/14 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">{homepageContent.hero.secondaryCta.label}</Link>
          </div>
          <div className="space-y-3 text-sm text-slate-400"><p>{homepageContent.hero.status}</p><div className="flex flex-wrap gap-4"><Link href={homepageContent.routes.participation} className="inline-flex text-sm font-medium text-cyan-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Sumate a la conversación</Link><Link href={homepageContent.routes.privacy} className="inline-flex text-sm font-medium text-cyan-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Política de privacidad</Link></div></div>
        </div>
        <div className={`${card} relative overflow-hidden p-6 md:p-8`}>
          <div role="img" aria-label="Ilustración editorial abstracta de una noche mendocina. Placeholder no fotográfico hasta contar con una imagen real." className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,#08101d_0%,#10203d_54%,#07111f_100%)]">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.35),transparent_42%),linear-gradient(180deg,rgba(16,24,40,0),rgba(5,10,20,0.92))]" />
            <div className="absolute inset-x-[12%] top-[18%] h-px bg-white/25" /><div className="absolute inset-x-[18%] top-[26%] h-px bg-cyan-300/35" /><div className="absolute inset-x-[8%] top-[56%] h-px bg-violet-300/20" />
            <div className="absolute left-[20%] top-[33%] h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(56,189,248,0.8)]" /><div className="absolute left-[46%] top-[49%] h-3 w-3 rounded-full bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.65)]" /><div className="absolute right-[22%] top-[38%] h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_18px_rgba(167,139,250,0.8)]" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-sm leading-6 text-slate-200"><p className="font-medium text-white">Mendoza, de noche, como idea editorial.</p><p className="text-slate-300">No es una foto real: es un placeholder abstracto y honesto hasta contar con una imagen definitiva.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  return <section id={homepageContent.problem.id} aria-labelledby="home-problem-title" className={shell}><div className="space-y-6"><Title id="home-problem-title" label={homepageContent.problem.label} title={homepageContent.problem.title} /><p className="max-w-3xl text-lg leading-8 text-slate-300">{homepageContent.problem.description}</p></div><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{problemSituations.map((item) => <CopyCard key={item.title} title={item.title} description={item.description} />)}</div><p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200">{homepageContent.problem.closing}</p></section>;
}

export function BeliefsSection() {
  return <section id={homepageContent.beliefs.id} aria-labelledby="home-beliefs-title" className={`${shell} border-y border-white/8`}><Title id="home-beliefs-title" label={homepageContent.beliefs.label} title={homepageContent.beliefs.title} /><div className="mt-10 grid gap-4 lg:grid-cols-2">{beliefs.map((item) => <CopyCard key={item.title} title={item.title} description={item.description} />)}</div></section>;
}

export function ActorsSection() {
  return <section id={homepageContent.actors.id} aria-labelledby="home-actors-title" className={shell}><Title id="home-actors-title" label={homepageContent.actors.label} title={homepageContent.actors.title} /><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{homepageContent.actors.description}</p><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{actorGroups.map((item) => <CopyCard key={item.title} title={item.title} description={item.description} />)}</div></section>;
}

export function CurrentStageSection() {
  return <section id={homepageContent.currentStage.id} aria-labelledby="home-stage-title" className={`${shell} border-y border-white/8`}><Title id="home-stage-title" label={homepageContent.currentStage.label} title={homepageContent.currentStage.title} /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{stageBlocks.map((item) => <CopyCard key={item.title} title={item.title} description={item.description} />)}</div></section>;
}

export function TechnologySection() {
  return <section id={homepageContent.technology.id} aria-labelledby="home-technology-title" className={shell}><Title id="home-technology-title" label={homepageContent.technology.label} title={homepageContent.technology.title} /><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{homepageContent.technology.description}</p><div className="mt-10 grid gap-4 lg:grid-cols-2">{technologyCapabilities.map((item) => <article key={item} className={`${card} p-5`}><p className="text-sm leading-7 text-slate-200">{item}</p></article>)}</div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={homepageContent.technology.cta.href} className="rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">{homepageContent.technology.cta.label}</Link><Link href={homepageContent.routes.privacy} className="rounded-full border border-white/14 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Política de privacidad</Link></div></section>;
}

export function ParticipationSection() {
  return <section id={homepageContent.participation.id} aria-labelledby="home-participation-title" className={`${shell} border-y border-white/8`}><Title id="home-participation-title" label={homepageContent.participation.label} title={homepageContent.participation.title} /><div className="mt-10 grid gap-4 lg:grid-cols-3">{homepageContent.participation.cards.map((item) => { const contact = buildHomepageContact(item.profile); return <article key={item.profile} className={`${card} flex flex-col p-6`}><h3 className="text-xl font-semibold text-white">{item.title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{item.description}</p><a href={contact.href} className="mt-6 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">{item.ctaLabel}</a></article>; })}</div></section>;
}

export function FounderSection() {
  return <section id={homepageContent.founder.id} aria-labelledby="home-founder-title" className={shell}><div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start"><div className={`${card} p-6`}><div role="img" aria-label="Placeholder premium temporal para la foto real del fundador. No es una foto ni una likeness generada por IA." className="flex aspect-[4/5] items-center justify-center rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(30,41,59,0.88))]"><div className="text-center"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/35 bg-white/5 text-2xl font-semibold text-white">JC</div><p className="mt-4 text-sm leading-6 text-slate-300">Placeholder temporal hasta contar con la foto real del fundador.</p></div></div></div><div><Title id="home-founder-title" label={homepageContent.founder.label} title={homepageContent.founder.title} /><div className="mt-6 space-y-4 text-base leading-8 text-slate-300">{founderBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></div></section>;
}

export function FinalCtaSection() {
  const contact = buildHomepageContact(homepageContent.finalCta.primaryCta.profile);
  return <section id={homepageContent.finalCta.id} aria-labelledby="home-final-cta-title" className={`${shell} pt-0 md:pt-0`}><div className={`${card} overflow-hidden p-8 md:p-12`}><h2 id="home-final-cta-title" className="max-w-4xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">{homepageContent.finalCta.title}</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{homepageContent.finalCta.description}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={contact.href} className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">{homepageContent.finalCta.primaryCta.label}</a><Link href={homepageContent.finalCta.secondaryCta.href} className="rounded-full border border-white/14 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">{homepageContent.finalCta.secondaryCta.label}</Link></div><p className="mt-6 text-sm uppercase tracking-[0.24em] text-slate-400">{homepageContent.finalCta.closing}</p></div></section>;
}
