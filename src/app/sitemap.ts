import { navItems, siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", ...navItems.map((i) => i.href), "/entrar", "/criar-conta"];
  return [...new Set(pages)].map((path) => ({
    url: `${siteConfig.SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
