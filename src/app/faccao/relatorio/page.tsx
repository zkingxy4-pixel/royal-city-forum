import { Button } from "@/components/ui/Button";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { FactionForm } from "@/components/FactionForm";
import { siteConfig } from "@/config/site";

export default async function FaccaoRelatorioPage({
  searchParams,
}: {
  searchParams: Promise<{ enviado?: string; protocolo?: string; erro?: string }>;
}) {
  const query = await searchParams;

  if (query.enviado) {
    const protocolo = query.protocolo?.trim();
    return (
      <div className="min-h-screen bg-black px-4 pt-32 pb-16">
        <div className="glass mx-auto w-full max-w-2xl rounded-2xl p-6 sm:p-8" role="status">
          <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">RELATÓRIO DE FACÇÃO RECEBIDO</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl">A equipe vai analisar a sua organização.</h1>
          {protocolo ? (
            <p className="mt-4 font-mono text-sm tracking-[0.18em] text-white/80">Protocolo {protocolo}</p>
          ) : null}
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            O relatório da facção chegou. Em breve a staff chama o responsável pelos canais oficiais, principalmente no
            Discord. Não precisa enviar de novo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={siteConfig.DISCORD_URL} variant="discord" className="w-full">
              Abrir Discord
            </Button>
            <Button href="/faccao" variant="secondary" className="w-full">
              Voltar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-black px-4 pt-32 pb-16">
        <div className="glass mx-auto w-full max-w-2xl rounded-2xl p-6 sm:p-8">
          <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">FACÇÃO</p>
          <h1 className="mt-3 font-display text-3xl">Relatório da organização</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Oito perguntas. Seja direto: a staff usa isso para conhecer a facção e o líder.
          </p>
          <div className="mt-6">
            <FactionForm error={query.erro} />
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
