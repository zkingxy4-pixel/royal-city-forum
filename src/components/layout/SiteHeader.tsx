"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { hasInstagram, siteConfig } from "@/config/site";
import Link from "next/link";

export function SiteHeader({ landing }: { landing: boolean }) {
  const { user, logout } = useAuth();

  if (!landing) return null;

  return (
    <header className="fixed top-0 right-0 left-0 z-[60] pt-[env(safe-area-inset-top)]">
      <div className="px-3 py-2 sm:px-4">
        <div className="glass flex flex-wrap items-center justify-between gap-2 rounded-2xl px-3 py-2">
          <Link href="/" className="shrink-0">
            <Logo compact />
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
            {user ? (
              <>
                <Button href="/conta" variant="secondary" className="!w-auto !min-h-10 !py-2 !px-3 !text-[10px]">
                  MINHA CONTA
                </Button>
                <button onClick={logout} className="px-2 text-[11px] text-white/50 hover:text-white">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Button href="/entrar" variant="secondary" className="!w-auto !min-h-10 !py-2 !px-3 !text-[10px]">
                  ENTRAR
                </Button>
                <Button href="/criar-conta" className="!w-auto !min-h-10 !py-2 !px-3 !text-[10px] shadow-glow">
                  CRIAR CONTA
                </Button>
              </>
            )}
            <Button href={siteConfig.DISCORD_URL} variant="discord" className="!w-auto !min-h-10 !py-2 !px-3 !text-[10px]">
              DISCORD
            </Button>
            {hasInstagram ? (
              <Button href={siteConfig.INSTAGRAM_URL} variant="instagram" className="!w-auto !min-h-10 !py-2 !px-3 !text-[10px]">
                INSTAGRAM
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
