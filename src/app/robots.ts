import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Necessário com output: export — gera o arquivo no build.
export const dynamic = "force-static";

/**
 * Permite indexação total e aponta para o sitemap.
 * Gerado estaticamente no build (output: export) → out/robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
