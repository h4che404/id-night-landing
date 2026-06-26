import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = "2026-06-24T00:00:00.000Z";

export const PUBLIC_SITEMAP_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/productos", priority: 0.9, changeFrequency: "monthly" },
  { path: "/soluciones", priority: 0.9, changeFrequency: "monthly" },
  { path: "/precios", priority: 0.9, changeFrequency: "monthly" },
  { path: "/problema", priority: 0.8, changeFrequency: "monthly" },
  { path: "/como-funciona", priority: 0.8, changeFrequency: "monthly" },
  { path: "/herramientas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/seguridad", priority: 0.8, changeFrequency: "monthly" },
  { path: "/recursos", priority: 0.6, changeFrequency: "monthly" },
  { path: "/recursos/aprender", priority: 0.6, changeFrequency: "monthly" },
  { path: "/recursos/empresa", priority: 0.5, changeFrequency: "monthly" },
  { path: "/recursos/soporte", priority: 0.5, changeFrequency: "monthly" },
  { path: "/recursos/contacto", priority: 0.6, changeFrequency: "yearly" },
  { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/terminos", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/privacidad", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_SITEMAP_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}
