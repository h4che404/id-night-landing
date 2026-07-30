import type { Metadata } from "next";
import Precios from "@/components/Precios";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Planes de ID-Night | Próximamente",
  description:
    "Conocé los planes previstos de ID-Night. Los precios, demos y contrataciones estarán disponibles cuando se habilite el servicio.",
  path: "/precios",
});

export default function PreciosPage() {
  return <Precios />;
}
