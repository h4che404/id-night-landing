import type { Metadata } from "next";
import Herramientas from "@/components/Herramientas";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Herramientas de ID-Night para el control de ingreso",
  description:
    "Validación de ingresos, panel de administración, revisión por personal autorizado, historial de accesos y registro de incidentes para operar con orden.",
  path: "/herramientas",
});

export default function HerramientasPage() {
  return <Herramientas />;
}
