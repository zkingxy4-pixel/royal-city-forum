"use client";

import { siteConfig } from "@/config/site";
import { aboutCards, jobs, startSteps, whyCards } from "@/data/jobs";
import { economyCards, organizations } from "@/data/orgs";
import { eventTypes, nextEvent } from "@/data/events";
import { creatorTiers, creators } from "@/data/creators";
import { news } from "@/data/news";
import { rules } from "@/data/rules";
import { team } from "@/data/team";
import { systems } from "@/data/systems";
import { Banknote, Briefcase, Building2, Car, Crown, Radio, Shield, Smartphone, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, SectionTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { EventCard, InfluencerCard, NewsCard, TeamCard } from "@/components/cards";
import { Gallery } from "@/components/Gallery";
import { FAQ } from "@/components/FAQ";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

const systemIcons: Record<string, LucideIcon> = {
  inventario: Briefcase,
  celular: Smartphone,
  banco: Banknote,
  garagem: Car,
  veiculos: Car,
  casas: Building2,
  empresas: Building2,
  empregos: Briefcase,
  organizacoes: Shield,
  faccoes: Crown,
  hospital: Shield,
  policia: Shield,
  mecanica: Wrench,
  eventos: Crown,
  craft: Wrench,
  radio: Radio,
  voz: Radio,
  admin: Shield,
  economia: Banknote,
  comercio: Banknote,
};

function SlideShell({
  id,
  bg,
  bgMobile,
  children,
  overlay = "from-black/55 via-black/45 to-black/70",
}: {
  id?: string;
  bg?: string;
  bgMobile?: string;
  children: React.ReactNode;
  overlay?: string;
}) {
  return (
    <section id={id} className="relative min-h-[100svh] w-full overflow-hidden">
      {bg ? (
        <>
          <img
            src={bgMobile || bg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover md:hidden"
          />
          <img src={bg} alt="" className="absolute inset-0 hidden h-full w-full object-cover md:block" />
        </>
      ) : (
        <div className="absolute inset-0 bg-royal-gradient" />
      )}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
      <div className="relative z-10 px-4 pt-24 pb-16 sm:px-6 sm:pt-28 md:px-10 md:pt-32 lg:px-16 lg:pb-24">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </section>
  );
}

export function SlideHero({ onExplore }: { onExplore: () => void }) {
  return (
    <SlideShell bg={siteConfig.hero} bgMobile={siteConfig.heroMobile} overlay="from-black/80 via-black/60 to-black/85">
      <div className="flex min-h-[72svh] flex-col justify-end md:min-h-[70vh] md:justify-center">
        <p className="text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.5em] text-[#FF0000]">CIDADE OFICIAL</p>
        <h1 className="mt-3 font-display text-[2.6rem] sm:text-5xl md:text-8xl leading-[0.95] red-glow-title">
          ROYAL CITY
        </h1>
        <p className="mt-4 text-xs sm:text-sm md:text-lg tracking-[0.16em] sm:tracking-[0.28em]">{siteConfig.tagline}</p>
        <p className="mt-5 max-w-2xl text-sm sm:text-base text-white/75 leading-relaxed">
          Entre em uma cidade onde cada escolha tem consequência, cada conquista tem valor e cada jogador pode
          construir sua própria história.
        </p>
        <div className="mt-7 flex w-full max-w-xl flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
          <Button href={siteConfig.DISCORD_URL}>ENTRAR NA CIDADE</Button>
          <Button variant="secondary" onClick={onExplore}>
            CONHECER A ROYAL
          </Button>
        </div>
        <button
          onClick={onExplore}
          className="mt-10 flex flex-col items-start gap-2 text-[10px] tracking-[0.32em] text-white/45"
        >
          EXPLORAR
          <span className="h-8 w-px bg-gradient-to-b from-[#FF0000] to-transparent" />
        </button>
      </div>
    </SlideShell>
  );
}

export function SlideAbout() {
  return (
    <SlideShell bg={siteConfig.images.centro}>
      <SectionTitle
        kicker="SOBRE A CIDADE"
        title="MAIS DO QUE UM SERVIDOR. UMA CIDADE PARA VIVER."
      />
      <div className="mt-8 max-w-3xl space-y-4 text-white/75 leading-relaxed">
        <p>
          A Royal City nasceu com um propósito simples: criar uma experiência de Roleplay onde cada jogador tenha
          espaço para construir sua própria história.
        </p>
        <p>
          Aqui, você não é apenas mais um personagem. Você pode começar do zero, construir seu patrimônio, fazer
          amizades, conquistar respeito, abrir seu próprio negócio, entrar para uma organização ou simplesmente viver
          uma vida completamente diferente da realidade.
        </p>
        <p>
          Nossa cidade está em constante evolução, buscando sempre entregar novidades, sistemas modernos, eventos e
          experiências que mantenham o Roleplay vivo.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {aboutCards.map((c) => (
          <Card key={c.title}>
            <h3 className="font-display text-2xl">{c.title}</h3>
            <p className="mt-3 text-sm text-white/70">{c.text}</p>
          </Card>
        ))}
      </div>
    </SlideShell>
  );
}

export function SlideWhy() {
  return (
    <SlideShell>
      <SectionTitle kicker="A ESCOLHA" title="POR QUE ESCOLHER A ROYAL?" />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {whyCards.map((c) => (
          <Card key={c.title}>
            <h3 className="font-display text-xl">{c.title}</h3>
            <p className="mt-3 text-sm text-white/70">{c.text}</p>
          </Card>
        ))}
      </div>
    </SlideShell>
  );
}

export function SlideStart() {
  return (
    <SlideShell bg={siteConfig.bannerDiscord}>
      <SectionTitle kicker="COMO JOGAR" title="COMEÇAR É MAIS FÁCIL DO QUE VOCÊ IMAGINA." />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {startSteps.map((s) => (
          <Card key={s.n}>
            <p className="text-[#FF0000] font-display text-3xl">{s.n}</p>
            <h3 className="mt-2 font-display text-xl">{s.title}</h3>
            <p className="mt-2 text-sm text-white/70">{s.text}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Button href={siteConfig.DISCORD_URL}>ENTRAR NO DISCORD</Button>
      </div>
    </SlideShell>
  );
}

export function SlideSystems() {
  const [id, setId] = useState<string | null>(null);
  const current = systems.find((s) => s.id === id);
  return (
    <SlideShell>
      <SectionTitle kicker="SISTEMAS" title="UMA CIDADE FEITA PARA VOCÊ." />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {systems.map((s) => {
          const Icon = systemIcons[s.id] ?? Crown;
          return (
            <Card key={s.id} onClick={() => setId(s.id)} className="!p-4">
              <Icon className="text-[#FF0000]" size={18} />
              <h3 className="mt-3 font-display text-base">{s.title}</h3>
              <p className="mt-2 text-xs text-white/65">{s.short}</p>
            </Card>
          );
        })}
      </div>
      <Modal open={!!current} onClose={() => setId(null)} title={current?.title || ""}>
        <p>{current?.detail}</p>
      </Modal>
    </SlideShell>
  );
}

export function SlideJobs({ onOrg }: { onOrg: () => void }) {
  return (
    <SlideShell bg={siteConfig.images.veiculos}>
      <SectionTitle
        kicker="EMPREGOS"
        title="SEU CAMINHO COMEÇA COM UMA ESCOLHA."
        subtitle="Nem todo mundo começa a vida no topo. Na Royal City, você pode construir sua trajetória do seu jeito."
      />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {jobs.map((j) => (
          <Card key={j.id} className="!p-4">
            <h3 className="font-display">{j.title}</h3>
            <p className="mt-2 text-xs text-white/65">{j.text}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Button onClick={onOrg}>VER OPORTUNIDADES</Button>
      </div>
    </SlideShell>
  );
}

export function SlideOrgs() {
  return (
    <SlideShell>
      <SectionTitle kicker="ORGANIZAÇÕES E FACÇÕES" title="ENCONTRE O SEU LADO DA CIDADE." />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((o) => (
          <div key={o.id} id={o.id} className="relative min-h-[230px] overflow-hidden rounded-2xl">
            <img src={o.image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
            <div className="relative z-10 flex h-full flex-col justify-end p-5">
              <p className="text-[10px] tracking-[0.3em] text-[#FF0000]">{o.name}</p>
              <h3 className="font-display text-2xl">{o.title}</h3>
              <p className="mt-2 text-sm text-white/75">{o.text}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

export function SlideEconomy() {
  return (
    <SlideShell bg={siteConfig.images.economia}>
      <SectionTitle
        kicker="ECONOMIA"
        title="CONSTRUA SEU IMPÉRIO."
        subtitle="Na Royal City, dinheiro não aparece do nada. Conquiste, trabalhe, invista e construa seu patrimônio."
      />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {economyCards.map((c) => (
          <Card key={c.title} className="!p-4">
            <p className="text-[10px] tracking-[0.3em] text-[#FF0000]">PAINEL</p>
            <h3 className="mt-2 font-display text-lg">{c.title}</h3>
            <p className="mt-2 text-xs text-white/65">{c.text}</p>
          </Card>
        ))}
      </div>
    </SlideShell>
  );
}

export function SlideEvents() {
  return (
    <SlideShell bg={siteConfig.images.eventos}>
      <SectionTitle kicker="EVENTOS" title="NA ROYAL, SEMPRE ACONTECE ALGUMA COISA." />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {eventTypes.map((e) => (
          <EventCard key={e.id} {...e} />
        ))}
      </div>
      <Card className="mt-6">
        <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">PRÓXIMO EVENTO</p>
        <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-display text-3xl">{nextEvent.name}</p>
            <p className="mt-2 text-white/70">
              {nextEvent.date} · {nextEvent.time} · {nextEvent.place}
            </p>
          </div>
          <Button href={siteConfig.DISCORD_URL}>PARTICIPAR</Button>
        </div>
      </Card>
    </SlideShell>
  );
}

export function SlideInfluencers() {
  return (
    <SlideShell bg={siteConfig.images.influenciadores}>
      <SectionTitle kicker="INFLUENCIADORES" title="VOCÊ CRIA. A ROYAL VALORIZA." />
      <div className="mt-6 max-w-3xl space-y-4 text-white/75 leading-relaxed text-sm md:text-base">
        <p>
          Na Royal City, acreditamos que uma cidade forte é construída por pessoas que acreditam nela. Por isso,
          criadores de conteúdo têm espaço para crescer junto com a nossa comunidade.
        </p>
        <p>
          Se você produz vídeos, lives, cortes, TikToks, Shorts ou qualquer outro tipo de conteúdo, queremos conhecer o
          seu trabalho. Não importa se você está começando agora ou já possui uma grande audiência.
        </p>
        <p>
          Nosso objetivo é dar atenção a todos, valorizar cada criador e criar oportunidades para quem realmente deseja
          fazer parte da história da Royal City.
        </p>
        <p className="font-display text-xl text-white">
          NA ROYAL, NÚMERO DE SEGUIDORES NÃO DEFINE O VALOR DO SEU TRABALHO.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {creatorTiers.map((t) => (
          <Card key={t.id}>
            <h3 className="font-display text-xl">{t.title}</h3>
            <p className="mt-3 text-sm text-white/70">{t.text}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Button href="/influenciadores/candidatar">QUERO SER INFLUENCIADOR</Button>
      </div>
      <h3 className="mt-10 font-display text-2xl">CRIADORES DA ROYAL</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {creators.map((c) => (
          <InfluencerCard key={c.id} {...c} />
        ))}
      </div>
    </SlideShell>
  );
}

export function SlideGallery() {
  return (
    <SlideShell>
      <SectionTitle kicker="GALERIA" title="VEJA A ROYAL PELOS OLHOS DE QUEM VIVE." />
      <div className="mt-8">
        <Gallery />
      </div>
    </SlideShell>
  );
}

export function SlideNews() {
  return (
    <SlideShell>
      <SectionTitle kicker="NOTÍCIAS" title="FIQUE POR DENTRO." />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {news.map((n) => (
          <NewsCard
            key={n.slug}
            title={n.title}
            category={n.category}
            date={n.date}
            image={n.image}
            excerpt={n.excerpt}
            href={`/noticias/${n.slug}`}
          />
        ))}
      </div>
    </SlideShell>
  );
}

export function SlideRules() {
  return (
    <SlideShell>
      <SectionTitle
        kicker="REGRAS"
        title="ROLEPLAY COMEÇA COM RESPEITO."
        subtitle="Para que todos possam aproveitar a cidade, precisamos construir uma comunidade baseada em respeito, bom senso e responsabilidade."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rules.map((r) => (
          <Card key={r.id}>
            <h3 className="font-display text-xl">{r.title}</h3>
            <p className="mt-3 text-sm text-white/70">{r.text}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Button href="/regras" variant="secondary">
          LER REGRAS COMPLETAS
        </Button>
      </div>
    </SlideShell>
  );
}

export function SlideTeam() {
  return (
    <SlideShell>
      <SectionTitle kicker="EQUIPE" title="QUEM FAZ A ROYAL ACONTECER." />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {team.map((m) => (
          <TeamCard key={m.id} {...m} />
        ))}
      </div>
    </SlideShell>
  );
}

export function SlideFaq() {
  return (
    <SlideShell>
      <SectionTitle kicker="FAQ" title="AINDA TEM DÚVIDAS?" />
      <div className="mt-8 max-w-3xl">
        <FAQ />
      </div>
      <div className="mt-8">
        <Button href={siteConfig.DISCORD_URL}>ENTRAR NO DISCORD</Button>
      </div>
    </SlideShell>
  );
}

export function SlideCta() {
  return (
    <SlideShell bg={siteConfig.ctaFinal} overlay="from-black/70 via-black/60 to-black/80">
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="font-display text-[2rem] sm:text-4xl md:text-7xl max-w-4xl leading-tight red-glow-title">
          SUA HISTÓRIA ESTÁ ESPERANDO.
        </h2>
        <p className="mt-6 max-w-xl text-white/75 px-1">
          A cidade está pronta. As oportunidades estão esperando. Agora falta apenas uma coisa: você.
        </p>
        <div className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <Button href={siteConfig.DISCORD_URL}>ENTRAR NO DISCORD</Button>
          <Button href={siteConfig.INSTAGRAM_URL} variant="secondary">
            SEGUIR NO INSTAGRAM
          </Button>
        </div>
        <p className="mt-12 font-display text-2xl tracking-[0.2em]">ROYAL CITY RP</p>
        <p className="mt-2 text-xs tracking-[0.4em] text-white/60">{siteConfig.tagline}</p>
      </div>
    </SlideShell>
  );
}
