"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { navItems, siteConfig } from "@/config/site";
import Link from "next/link";

export default function ContaPage() {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 pt-24 md:pt-16">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black px-4 pt-24 pb-16 md:pt-16">
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 p-8">
          <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">MINHA CONTA</p>
          <h1 className="mt-3 font-display text-3xl">Entre para ver sua conta.</h1>
          <p className="mt-4 text-sm text-white/70">Use o mesmo apelido e a senha que você cadastrou.</p>
          <Link
            href="/entrar"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#FF0000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-glow"
          >
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 pt-24 pb-16 md:pt-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">MINHA CONTA</p>
        <h1 className="mt-2 font-display text-4xl">Olá, {user.nickname}.</h1>
        <p className="mt-3 max-w-xl text-white/65">
          Esta é a sua área no portal. Para entrar no servidor, use o Discord oficial da Royal City.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/influenciadores"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#FF0000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-glow"
          >
            Programa de criadores
          </Link>
          <a
            href={siteConfig.DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#5865F2] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white"
          >
            Entrar na cidade
          </a>
          <a
            href="/api/portal/logout"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80"
          >
            Sair
          </a>
        </div>
        <h2 className="mt-12 font-display text-2xl">O que você quer ver?</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {navItems
            .filter((i) => i.href !== "/")
            .map((i) => {
              const featured = "featured" in i && i.featured;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={`rounded-xl border p-4 transition hover:border-white/25 ${
                    featured ? "border-[#FF0000]/60 shadow-glow" : "border-white/10"
                  }`}
                >
                  {featured ? (
                    <p className="flex items-center gap-1.5 text-[10px] tracking-[0.28em] text-[#FF0000]">
                      DESTAQUE
                    </p>
                  ) : null}
                  <p className="font-display text-lg">{i.label}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
