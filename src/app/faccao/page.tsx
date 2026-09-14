import { PageHero, PageWrap } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Facção" };

export default function FaccaoPage() {
  return (
    <>
      <PageHero
        image={siteConfig.images.favela}
        kicker="FACÇÃO"
        title="Relatório da sua organização."
        text="Quer registrar a facção na Royal City? Envie o relatório com dados do líder, membros e o estilo de Roleplay."
      />
      <PageWrap>
        <p className="max-w-3xl text-sm leading-relaxed text-white/70">
          A staff analisa cada pedido. Facção reconhecida no portal não significa poder fora das regras: o Roleplay
          continua valendo para todo mundo.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-[10px] tracking-[0.28em] text-[#FF0000]">01</p>
            <h2 className="mt-2 font-display text-xl">Identidade</h2>
            <p className="mt-3 text-sm text-white/70">Nome da facção, líder e como vocês se apresentam na cidade.</p>
          </Card>
          <Card>
            <p className="text-[10px] tracking-[0.28em] text-[#FF0000]">02</p>
            <h2 className="mt-2 font-display text-xl">Estrutura</h2>
            <p className="mt-3 text-sm text-white/70">Idade do líder, membros ativos e território de atuação.</p>
          </Card>
          <Card>
            <p className="text-[10px] tracking-[0.28em] text-[#FF0000]">03</p>
            <h2 className="mt-2 font-display text-xl">Postura</h2>
            <p className="mt-3 text-sm text-white/70">Estilo legal, ilegal ou misto — sempre dentro do Roleplay.</p>
          </Card>
        </div>
        <div className="mt-10">
          <Button href="/faccao/relatorio">Preencher relatório</Button>
        </div>
      </PageWrap>
    </>
  );
}
