"use client";

import { siteConfig } from "@/config/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={siteConfig.logo}
      alt="Royal City RP"
      className={compact ? "h-10 sm:h-12 w-auto object-contain" : "h-14 sm:h-16 w-auto object-contain"}
    />
  );
}
