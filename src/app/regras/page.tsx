import { PageHero, PageWrap } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { rules } from "@/data/rules";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Regras" };

export default function RulesPage() {
  return (
    <>
      <PageHero
        image={siteConfig.images.centro}
        kicker="REGRAS"
        title="Roleplay começa com respeito."
        text="Para que todos aproveitem a cidade, a comunidade precisa de respeito, bom senso e responsabilidade."
      />
      <PageWrap>
        <div className="space-y-6">
          {rules.map((r) => (
            <section key={r.id} className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl">{r.title}</h2>
              <p className="mt-2 text-white/70">{r.text}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/75">
                {r.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="mt-10">
          <Button href={siteConfig.DISCORD_URL}>ENTRAR NA CIDADE</Button>
        </div>
      </PageWrap>
    </>
  );
}
