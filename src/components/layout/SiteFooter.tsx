"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { Logo } from "@/components/Logo";
import { hasInstagram, navItems, siteConfig } from "@/config/site";
import { Crown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const { user } = useAuth();
  const landing = pathname === "/" && !user;

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black px-4 py-12 sm:px-6">
      <div className={`mx-auto grid max-w-6xl gap-10 ${landing ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        <div>
          <Link href="/">
            <Logo />
          </Link>
          <p className="mt-4 text-sm text-white/60 max-w-sm">
            Royal City RP — Uma cidade feita para quem quer viver uma nova história.
          </p>
        </div>
        {!landing ? (
          <div>
            <p className="text-xs tracking-[0.3em] text-[#FF0000] mb-4">PORTAL</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
              {navItems
                .filter((l) => "featured" in l && l.featured)
                .map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="col-span-2 mb-1 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#9a0000] to-[#FF0000] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
                  >
                    <Crown className="h-3.5 w-3.5" fill="#E8C547" stroke="#C9A227" />
                    {l.label}
                  </Link>
                ))}
              {navItems
                .filter((l) => !("featured" in l && l.featured))
                .map((l) => (
                  <Link key={l.href} href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                ))}
            </div>
          </div>
        ) : null}
        <div>
          <p className="text-xs tracking-[0.3em] text-[#FF0000] mb-4">COMUNIDADE</p>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <a href={siteConfig.DISCORD_URL} target="_blank" rel="noreferrer" className="text-[#5865F2] hover:text-[#7289DA]">
              Discord oficial
            </a>
            {hasInstagram ? (
              <a href={siteConfig.INSTAGRAM_URL} className="text-[#DD2A7B] hover:text-[#F58529]">
                Instagram
              </a>
            ) : null}
            <Link href="/entrar">Entrar no portal</Link>
            <Link href="/criar-conta">Criar conta</Link>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-white/40">
        © {siteConfig.year} Royal City RP. Todos os direitos reservados. Royal City é uma cidade de Roleplay
        independente e não possui vínculo oficial com marcas de jogos de terceiros.
      </p>
    </footer>
  );
}
