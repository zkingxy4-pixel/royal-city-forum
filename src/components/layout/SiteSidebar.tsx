"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { Logo } from "@/components/Logo";
import { hasInstagram, navItems, siteConfig } from "@/config/site";
import { Crown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SiteSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="Fechar menu"
        className={`fixed inset-0 z-[75] bg-black/70 md:hidden ${mobileOpen ? "block" : "hidden"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 bottom-0 left-0 z-[80] flex h-[100dvh] w-[min(18rem,88vw)] flex-col overflow-hidden border-r border-[#FF0000]/30 bg-black pt-[env(safe-area-inset-top)] transition-transform duration-200 md:w-56 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-3 py-4">
          <Link href="/" className="inline-flex" onClick={onClose}>
            <Logo compact />
          </Link>
          <button
            type="button"
            aria-label="Fechar menu"
            className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
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
                    onClick={onClose}
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
        <div className="grid shrink-0 gap-2 border-t border-white/10 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {user ? (
            <>
              <Link
                href="/conta"
                onClick={onClose}
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
              <Link
                href="/entrar"
                onClick={onClose}
                className="rounded-lg border border-white/20 px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-white"
              >
                Entrar
              </Link>
              <Link
                href="/criar-conta"
                onClick={onClose}
                className="rounded-lg bg-[#FF0000] px-3 py-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-white"
              >
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
    </>
  );
}

export function MobileNavBar({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="fixed top-0 right-0 left-0 z-[60] border-b border-white/10 bg-black/90 pt-[env(safe-area-inset-top)] backdrop-blur-md md:hidden">
      <div className="flex h-14 items-center justify-between px-3">
        <Link href="/" className="inline-flex">
          <Logo compact />
        </Link>
        <button
          type="button"
          aria-label="Abrir menu"
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-white"
          onClick={onOpen}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
