import { FAQ } from "@/components/FAQ";
import { PageHero, PageWrap } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function FaqPage() {
  return (
    <>
      <PageHero
        image={siteConfig.images.centro}
        kicker="FAQ"
        title="FAQ — Royal City RP"
        text="Respostas diretas para quem quer viver a cidade com clareza e respeito."
      />
      <PageWrap>
        <div className="max-w-3xl">
          <FAQ />
        </div>
        <section className="mt-16 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">AINDA TEM DÚVIDAS?</p>
          <h2 className="mt-3 font-display text-3xl">Nossa comunidade está pronta para receber você.</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Entre no Discord oficial, converse com outros jogadores e descubra tudo o que a Royal City preparou para
            sua nova história.
          </p>
          <div className="mt-8">
            <Button href={siteConfig.DISCORD_URL} variant="discord">
              ENTRAR NA ROYAL CITY
            </Button>
          </div>
        </section>
      </PageWrap>
    </>
  );
}
