import type { Metadata } from "next";
import Seguridad from "@/components/Seguridad";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Seguridad, privacidad y revisión humana | ID-Night",
  description:
    "Minimización de datos, acceso por rol, revisión por personal autorizado ante dudas y trazabilidad de acciones. Así protege ID-Night la identidad y el ingreso.",
  path: "/seguridad",
});

export default function SeguridadPage() {
  return <Seguridad />;
}
