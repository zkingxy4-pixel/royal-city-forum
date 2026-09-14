"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { Logo } from "@/components/Logo";
import { hasInstagram, navItems, siteConfig } from "@/config/site";
import { Crown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed top-0 bottom-0 left-0 z-[70] flex h-[100dvh] w-56 flex-col overflow-hidden border-r border-[#FF0000]/30 bg-black">
      <div className="shrink-0 border-b border-white/10 px-3 py-4">
        <Link href="/" className="inline-flex">
          <Logo compact />
        </Link>
      </div>
      <nav className="custom-scroll min-h-0 flex-1 overflow-y-auto px-2 py-3">
        <ul className="grid gap-1">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const featured = "featured" in item && item.featured;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch
                  className={`flex min-h-11 items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] uppercase tracking-[0.12em] ${
                    featured
                      ? `featured-nav text-white ${active ? "ring-2 ring-white/30" : ""}`
                      : active
                        ? "bg-[#FF0000] text-white"
                        : "text-white hover:bg-white/10"
                  }`}
                >
                  {featured ? (
                    <Crown className="h-4 w-4 shrink-0 text-[#E8C547]" fill="#E8C547" stroke="#C9A227" />
                  ) : null}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="grid shrink-0 gap-2 border-t border-white/10 p-2">
        {user ? (
          <>
            <Link
              href="/conta"
              className="rounded-lg border border-white/20 px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-white"
            >
              Minha conta
            </Link>
            <button
              type="button"
              onClick={() => void logout()}
              className="py-2 text-center text-[11px] uppercase tracking-[0.14em] text-white/50"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link href="/entrar" className="rounded-lg border border-white/20 px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-white">
              Entrar
            </Link>
            <Link href="/criar-conta" className="rounded-lg bg-[#FF0000] px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-white">
              Criar conta
            </Link>
          </>
        )}
        <a
          href={siteConfig.DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-[#5865F2] px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-white"
        >
          Discord
        </a>
        {hasInstagram ? (
          <a
            href={siteConfig.INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-white"
          >
            Instagram
          </a>
        ) : null}
      </div>
    </aside>
  );
}
