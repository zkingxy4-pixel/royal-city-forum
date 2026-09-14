import { InfluencerForm } from "@/components/InfluencerForm";

export function CandidatarForm({ error }: { error?: string }) {
  return (
    <div className="min-h-screen bg-black px-4 pt-32 pb-16">
      <div className="glass mx-auto w-full max-w-2xl rounded-2xl p-6 sm:p-8">
        <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">PROGRAMA DE CRIADORES</p>
        <h1 className="mt-3 font-display text-3xl">Relatório de candidatura</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Preencha com calma. A equipe da Royal City analisa cada pedido e responde pelos canais oficiais.
        </p>
        <div className="mt-6">
          <InfluencerForm error={error} />
        </div>
      </div>
    </div>
  );
}
