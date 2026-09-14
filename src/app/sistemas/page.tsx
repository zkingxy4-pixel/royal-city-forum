"use client";

import { PageHero, PageWrap } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { siteConfig } from "@/config/site";
import { systems } from "@/data/systems";
import { useState } from "react";

export default function SistemasPage() {
  const [id, setId] = useState<string | null>(null);
  const current = systems.find((s) => s.id === id);
  return (
    <>
      <PageHero image={siteConfig.images.veiculos} kicker="SISTEMAS" title="Uma cidade feita para você." />
      <PageWrap>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {systems.map((s) => (
            <button key={s.id} type="button" className="text-left" onClick={() => setId(s.id)}>
              <Card>
                <h2 className="font-display text-lg">{s.title}</h2>
                <p className="mt-2 text-sm text-white/65">{s.short}</p>
              </Card>
            </button>
          ))}
        </div>
        <Modal open={!!current} onClose={() => setId(null)} title={current?.title || ""}>
          <p>{current?.detail}</p>
        </Modal>
      </PageWrap>
    </>
  );
}
