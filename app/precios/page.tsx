import type { Metadata } from "next";
import Precios from "@/components/Precios";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Precios de ID-Night | Pilotos para boliches y eventos",
  description:
    "Conocé cómo iniciar un piloto de ID-Night para validar identidad, controlar accesos y registrar incidentes en boliches y eventos.",
  path: "/precios",
});

export default function PreciosPage() {
  return <Precios />;
}
