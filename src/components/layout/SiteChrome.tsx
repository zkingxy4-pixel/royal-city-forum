"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MobileNavBar, SiteSidebar } from "@/components/layout/SiteSidebar";
import { navItems } from "@/config/site";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const landing = pathname === "/" && !user;
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    for (const item of navItems) {
      router.prefetch(item.href);
    }
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <SiteHeader landing={landing} />
      {!landing ? (
        <>
          <MobileNavBar onOpen={() => setMenuOpen(true)} />
          <SiteSidebar mobileOpen={menuOpen} onClose={closeMenu} />
        </>
      ) : null}
      <div className={landing ? "" : "md:pl-56"}>
        <main>{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
