import type { Metadata } from "next";
import Problema from "@/components/Problema";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Seguridad en boliches: ingresos, conflictos y trazabilidad",
  description:
    "Muchos boliches y eventos todavía dependen de controles manuales, registros informales y decisiones rápidas en puerta. ID-Night ordena ese proceso con identidad, acceso y trazabilidad.",
  path: "/problema",
});

export default function ProblemaPage() {
  return <Problema />;
}
