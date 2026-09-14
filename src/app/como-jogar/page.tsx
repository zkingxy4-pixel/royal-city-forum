import { PageHero, PageWrap } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/config/site";
import { startSteps } from "@/data/jobs";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Como jogar" };

export default function ComoJogarPage() {
  return (
    <>
      <PageHero
        image={siteConfig.bannerDiscord}
        kicker="COMO JOGAR"
        title="Começar é mais fácil do que você imagina."
        text="O caminho oficial para entrar na Royal City é o Discord da cidade."
      />
      <PageWrap>
        <div className="grid gap-4 md:grid-cols-2">
          {startSteps.map((s) => (
            <Card key={s.n}>
              <p className="font-display text-3xl text-[#FF0000]">{s.n}</p>
              <h2 className="mt-2 font-display text-xl">{s.title}</h2>
              <p className="mt-2 text-sm text-white/70">{s.text}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <Button href={siteConfig.DISCORD_URL}>ENTRAR NA CIDADE</Button>
        </div>
      </PageWrap>
    </>
  );
}
