import { Button } from "@/components/ui/Button";
import { ReportLoginGate } from "@/components/ReportLoginGate";
import { siteConfig } from "@/config/site";
import { getPortalSession } from "@/lib/portal-session";
import { CandidatarForm } from "./CandidatarForm";

export default async function CandidatarInfluencerPage({
  searchParams,
}: {
  searchParams: Promise<{ enviado?: string; protocolo?: string; erro?: string }>;
}) {
  const query = await searchParams;
  const session = await getPortalSession();

  if (query.enviado) {
    const protocolo = query.protocolo?.trim();
    return (
      <div className="min-h-screen bg-black px-4 pt-24 pb-16 md:pt-16">
        <div className="glass mx-auto w-full max-w-2xl rounded-2xl p-6 sm:p-8" role="status">
          <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">RELATÓRIO RECEBIDO</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl">Obrigado. Seu pedido está com a equipe.</h1>
          {protocolo ? (
            <p className="mt-4 font-mono text-sm tracking-[0.18em] text-white/80">Protocolo {protocolo}</p>
          ) : null}
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            A equipe da Royal City vai analisar o relatório e, em breve, vai te chamar pelos canais oficiais — em
            especial no Discord da cidade. Não precisa enviar de novo. Fique atento às mensagens da staff.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Número de seguidores não define o valor do seu trabalho. O que importa é o Roleplay, a postura e o
            conteúdo que você constrói.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={siteConfig.DISCORD_URL} variant="discord" className="w-full">
              Abrir Discord
            </Button>
            <Button href="/influenciadores" variant="secondary" className="w-full">
              Voltar ao programa
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <ReportLoginGate next="/influenciadores/candidatar" />;
  }

  return (
    <CandidatarForm error={query.erro} />
  );
}
