"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteSidebar } from "@/components/layout/SiteSidebar";
import { navItems } from "@/config/site";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const landing = pathname === "/" && !user;

  useEffect(() => {
    for (const item of navItems) {
      router.prefetch(item.href);
    }
  }, [router]);

  return (
    <>
      <SiteHeader landing={landing} />
      {!landing ? <SiteSidebar /> : null}
      <div className={landing ? "" : "pl-56"}>
        <main>{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
