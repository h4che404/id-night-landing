export type HomeSectionId =
  | "vision"
  | "problema"
  | "principios"
  | "actores"
  | "etapa"
  | "tecnologia"
  | "participar"
  | "fundador"
  | "cta-final";

export type CtaProfile = "events" | "venue" | "institution" | "general";

const sectionOrder = ["vision", "problema", "principios", "actores", "etapa", "tecnologia", "participar", "fundador", "cta-final"] as const satisfies readonly HomeSectionId[];

export const homepageWhatsappMessages = {
  events: "Hola, quiero participar desde la organización de eventos y compartir mi experiencia sobre accesos, listas, seguridad, excepciones e incidentes.",
  venue: "Hola, administro un espacio y quiero conversar sobre los desafíos de mi operación y la posibilidad de futuros pilotos con ID-NIGHT.",
  institution: "Hola, represento una institución y quiero explorar iniciativas, estándares y formas de colaboración para mejorar la nocturnidad con ID-NIGHT.",
  general: "Hola, quiero contar mi experiencia y conocer más sobre ID-NIGHT.",
} as const satisfies Record<CtaProfile, string>;

export const homepageContent = {
  sectionOrder,
  routes: { technology: "/productos", privacy: "/legal/privacidad", participation: "#participar" },
  hero: {
    id: "vision" as const,
    eyebrow: "Desde Mendoza, construyendo una nueva forma de pensar la noche.",
    title: "La noche que queremos se construye entre todos.",
    description: "ID-NIGHT es una iniciativa tecnológica que trabaja junto con quienes salen, organizan, trabajan y cuidan para construir una nocturnidad más segura, responsable y respetuosa de la privacidad.",
    primaryCta: { label: "Contanos tu experiencia", profile: "general" as const },
    secondaryCta: { label: "Conocé lo que estamos construyendo", href: "/productos" },
    status: "Actualmente estamos conversando con productores, espacios, trabajadores y referentes del sector.",
  },
  problem: {
    id: "problema" as const,
    label: "EL PUNTO DE PARTIDA",
    title: "La noche todavía se gestiona con información fragmentada.",
    description: "En accesos, listas, excepciones e incidentes se toman decisiones importantes en pocos segundos. Muchas veces la información está distribuida entre documentos, papeles, mensajes y distintas personas.",
    closing: "El desafío no es controlar más personas. Es contar con mejores herramientas, información limitada y procesos más claros.",
  },
  beliefs: { id: "principios" as const, label: "NUESTROS PRINCIPIOS", title: "Más seguridad no debería significar menos libertad ni menos privacidad." },
  actors: {
    id: "actores" as const,
    label: "UNA MIRADA COMPARTIDA",
    title: "Una mejor noche no puede construirse desde un solo lugar.",
    description: "Cada actor vive problemas, responsabilidades y necesidades diferentes. Por eso ID-NIGHT está comenzando por escuchar antes de imponer una respuesta.",
  },
  currentStage: { id: "etapa" as const, label: "LA ETAPA ACTUAL", title: "Escuchar, comprender, construir y probar." },
  technology: {
    id: "tecnologia" as const,
    label: "TECNOLOGÍA CON PROPÓSITO",
    title: "Mejores herramientas para organizar, decidir y comprender.",
    description: "ID-NIGHT está desarrollando un ecosistema tecnológico orientado a identidad, accesos, decisiones e incidentes, manteniendo la privacidad y la intervención humana como principios centrales.",
    cta: { label: "Explorar la tecnología", href: "/productos" },
  },
  participation: {
    id: "participar" as const,
    label: "SUMATE A LA CONVERSACIÓN",
    title: "Queremos escuchar a quienes viven la noche desde adentro.",
    cards: [
      { profile: "events" as const, title: "Trabajo u organizo eventos", description: "Compartí tu experiencia sobre accesos, listas, seguridad, excepciones e incidentes.", ctaLabel: "Quiero participar" },
      { profile: "venue" as const, title: "Administro un espacio", description: "Conversemos sobre los desafíos de tu operación y la posibilidad de futuros pilotos.", ctaLabel: "Hablar con ID-NIGHT" },
      { profile: "institution" as const, title: "Represento una institución", description: "Exploremos iniciativas, estándares y formas de colaboración para mejorar la nocturnidad.", ctaLabel: "Contacto institucional" },
    ],
  },
  founder: { id: "fundador" as const, label: "QUIÉN ESTÁ DETRÁS", title: "Una pregunta que empezó mucho antes que la tecnología." },
  finalCta: {
    id: "cta-final" as const,
    title: "La noche que queremos no se construye desde una sola mirada.",
    description: "Estamos empezando desde Mendoza y queremos sumar experiencias, preguntas y personas dispuestas a transformar la manera en que pensamos la noche.",
    primaryCta: { label: "Contanos tu experiencia", profile: "general" as const },
    secondaryCta: { label: "Conocé ID-NIGHT", href: "/productos" },
    closing: "Cuidarnos también es parte de salir.",
  },
} as const;
