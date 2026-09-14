import { PageHero, PageWrap } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EventCard } from "@/components/cards";
import { siteConfig } from "@/config/site";
import { eventTypes, nextEvent } from "@/data/events";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Eventos" };

export default function EventosPage() {
  return (
    <>
      <PageHero image={siteConfig.images.eventos} kicker="EVENTOS" title="Na Royal, sempre acontece alguma coisa." />
      <PageWrap>
        <div className="grid gap-4 md:grid-cols-2">
          {eventTypes.map((e) => (
            <EventCard key={e.id} {...e} />
          ))}
        </div>
        <Card className="mt-8">
          <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">PRÓXIMO EVENTO</p>
          <p className="mt-3 font-display text-3xl">{nextEvent.name}</p>
          <p className="mt-2 text-white/70">
            {nextEvent.date} · {nextEvent.time} · {nextEvent.place}
          </p>
          <div className="mt-6">
            <Button href={siteConfig.DISCORD_URL}>PARTICIPAR NO DISCORD</Button>
          </div>
        </Card>
      </PageWrap>
    </>
  );
}
