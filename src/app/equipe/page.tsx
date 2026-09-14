import { EmptyState, PageHero, PageWrap } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/config/site";
import { staffRoles, team } from "@/data/team";
import { TeamCard } from "@/components/cards";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Equipe" };

export default function EquipePage() {
  return (
    <>
      <PageHero
        image={siteConfig.ctaFinal}
        kicker="EQUIPE"
        title="Quem faz a Royal acontecer."
        text="Os nomes da staff serão publicados aqui quando a cidade confirmar a formação oficial."
      />
      <PageWrap>
        {team.length === 0 ? (
          <EmptyState
            title="Staff em formação."
            text="Não vamos inventar rostos. Quando a equipe estiver definida, cada membro aparece com foto, cargo e contato."
            href={siteConfig.DISCORD_URL}
            cta="FALAR COM A EQUIPE NO DISCORD"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((m) => (
              <TeamCard key={m.id} {...m} />
            ))}
          </div>
        )}
        <h2 className="mt-12 font-display text-2xl">Cargos da cidade</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {staffRoles.map((r) => (
            <Card key={r.role}>
              <p className="text-[10px] tracking-[0.3em] text-[#FF0000]">{r.role}</p>
              <p className="mt-3 text-sm text-white/70">{r.text}</p>
            </Card>
          ))}
        </div>
      </PageWrap>
    </>
  );
}
