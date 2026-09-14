import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_INDEXING !== "true") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/staff" },
    ],
    sitemap: `${siteConfig.SITE_URL}/sitemap.xml`,
  };
}
