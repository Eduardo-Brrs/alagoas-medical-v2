import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Necessário com output: export — gera o arquivo no build.
export const dynamic = "force-static";

/**
 * Site de página única (seções são âncoras na mesma URL), então o sitemap
 * lista apenas a home. Gerado estaticamente no build (output: export) → out/sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
