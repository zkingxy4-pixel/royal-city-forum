import { PageHero, PageWrap } from "@/components/PageHero";
import { siteConfig } from "@/config/site";
import { organizations } from "@/data/orgs";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Organizações" };

export default function OrganizacoesPage() {
  return (
    <>
      <PageHero
        image={siteConfig.images.policia}
        kicker="ORGANIZAÇÕES"
        title="Encontre o seu lado da cidade."
        text="Nomes específicos mudam com o tempo. Aqui você encontra as categorias oficiais da Royal."
      />
      <PageWrap>
        <div className="grid gap-4 md:grid-cols-2">
          {organizations.map((o) => (
            <article key={o.id} className="relative min-h-[240px] overflow-hidden rounded-2xl">
              <img src={o.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <p className="text-[10px] tracking-[0.3em] text-[#FF0000]">{o.name}</p>
                <h2 className="font-display text-3xl">{o.title}</h2>
                <p className="mt-2 text-white/75">{o.text}</p>
              </div>
            </article>
          ))}
        </div>
      </PageWrap>
    </>
  );
}
