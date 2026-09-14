import { PageHero, PageWrap } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/config/site";
import { jobs } from "@/data/jobs";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Empregos" };

export default function EmpregosPage() {
  return (
    <>
      <PageHero
        image={siteConfig.images.mecanica}
        kicker="EMPREGOS"
        title="Seu caminho começa com uma escolha."
        text="Nem todo mundo começa no topo. Na Royal, você constrói a trajetória do seu jeito."
      />
      <PageWrap>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {jobs.map((j) => (
            <Card key={j.id}>
              <h2 className="font-display text-xl">{j.title}</h2>
              <p className="mt-2 text-sm text-white/65">{j.text}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/organizacoes">VER ORGANIZAÇÕES</Button>
        </div>
      </PageWrap>
    </>
  );
}
