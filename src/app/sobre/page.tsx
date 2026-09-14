import { PageHero, PageWrap } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/config/site";
import { aboutCards } from "@/data/jobs";
import { whyCards } from "@/data/jobs";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sobre a cidade" };

export default function SobrePage() {
  return (
    <>
      <PageHero
        image={siteConfig.images.centro}
        kicker="SOBRE"
        title="Mais do que um servidor. Uma cidade para viver."
        text="A Royal City nasceu para dar espaço a histórias reais de Roleplay — com consequência, respeito e evolução constante."
      />
      <PageWrap>
        <div className="max-w-3xl space-y-4 text-white/75 leading-relaxed">
          <p>
            Aqui, você não é apenas mais um personagem. Pode começar do zero, construir patrimônio, fazer amizades,
            conquistar respeito, abrir um negócio ou viver uma rotina completamente diferente.
          </p>
          <p>
            A cidade está em constante evolução, com sistemas, eventos e uma comunidade construída por jogadores.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {aboutCards.map((c) => (
            <Card key={c.title}>
              <h2 className="font-display text-2xl">{c.title}</h2>
              <p className="mt-3 text-sm text-white/70">{c.text}</p>
            </Card>
          ))}
        </div>
        <h2 className="mt-14 font-display text-3xl">Por que a Royal?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyCards.map((c) => (
            <Card key={c.title}>
              <h3 className="font-display text-xl">{c.title}</h3>
              <p className="mt-3 text-sm text-white/70">{c.text}</p>
            </Card>
          ))}
        </div>
      </PageWrap>
    </>
  );
}
