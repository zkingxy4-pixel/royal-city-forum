import { EmptyState, PageWrap } from "@/components/PageHero";
import { InfluencerSpotlight } from "@/components/InfluencerSpotlight";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { creatorTiers, creators } from "@/data/creators";

export default function InfluenciadoresPage() {
  return (
    <>
      <InfluencerSpotlight />
      <PageWrap>
        <p className="max-w-3xl text-white/75 leading-relaxed">
          Número de seguidores não define o valor do seu trabalho. Iniciantes, canais em crescimento e grandes audiências
          podem se candidatar.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {creatorTiers.map((t) => (
            <Card key={t.id}>
              <h2 className="font-display text-xl">{t.title}</h2>
              <p className="mt-3 text-sm text-white/70">{t.text}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/influenciadores/candidatar">QUERO SER INFLUENCIADOR</Button>
        </div>
        <h2 className="mt-14 font-display text-3xl">Criadores da Royal</h2>
        <div className="mt-6">
          {creators.length === 0 ? (
            <EmptyState
              title="Nenhum criador oficial no momento."
              text="Quando a Royal fechar parcerias, os perfis oficiais aparecerão aqui. Até lá, envie sua solicitação."
              href="/influenciadores/candidatar"
              cta="QUERO SER INFLUENCIADOR"
            />
          ) : null}
        </div>
      </PageWrap>
    </>
  );
}
