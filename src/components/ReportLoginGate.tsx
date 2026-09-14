import { Button } from "@/components/ui/Button";

export function ReportLoginGate({ next }: { next: "/faccao/relatorio" | "/influenciadores/candidatar" }) {
  const entrar = `/entrar?next=${encodeURIComponent(next)}`;
  const criar = `/criar-conta?next=${encodeURIComponent(next)}`;

  return (
    <div className="min-h-screen bg-black px-4 pt-24 pb-16 md:pt-16">
      <div className="glass mx-auto w-full max-w-2xl rounded-2xl p-6 sm:p-8">
        <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">CONTA OBRIGATÓRIA</p>
        <h1 className="mt-3 font-display text-3xl">Entre na sua conta para preencher o relatório.</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          Só quem tem cadastro no portal consegue enviar o formulário. Cria a conta ou entra, e depois volta para
          este relatório.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={entrar} className="w-full">
            Entrar
          </Button>
          <Button href={criar} variant="secondary" className="w-full">
            Criar conta
          </Button>
        </div>
      </div>
    </div>
  );
}
