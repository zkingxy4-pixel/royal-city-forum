"use client";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export function InfluencerSpotlight() {
  return (
    <section className="relative overflow-hidden border-y border-[#FF0000]/25 bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF0000] to-transparent" />
      <div className="relative min-h-[420px] sm:min-h-[480px]">
        <img
          src={siteConfig.images.influenciadores}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-6xl flex-col justify-center px-4 pb-16 pt-32 sm:min-h-[480px] sm:px-6">
          <div className="max-w-xl rounded-2xl border border-white/10 bg-black/45 p-6 backdrop-blur-md sm:p-8">
            <p className="text-[11px] tracking-[0.42em] text-[#FF0000]">PROGRAMA OFICIAL</p>
            <h2 className="mt-3 font-display text-4xl leading-none sm:text-5xl md:text-6xl">
              Influenciadores
              <span className="block text-[#FF0000]">Royal City</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/72 sm:text-base">
              Espaço para quem cria conteúdo e quer crescer com a cidade. Iniciantes, canais em
              crescimento e grandes audiências têm o mesmo respeito.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/influenciadores/candidatar">CANDIDATAR-SE</Button>
              <Button href="/influenciadores" variant="secondary">
                CONHECER O PROGRAMA
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {[
          { label: "Iniciantes", text: "Seu conteúdo também merece espaço." },
          { label: "Em crescimento", text: "Construa audiência junto com a Royal." },
          { label: "Grandes criadores", text: "Traga sua comunidade para a cidade." },
        ].map((item) => (
          <Link
            key={item.label}
            href="/influenciadores"
            className="px-6 py-5 transition hover:bg-white/[0.03]"
          >
            <p className="font-display text-lg">{item.label}</p>
            <p className="mt-1 text-sm text-white/55">{item.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
