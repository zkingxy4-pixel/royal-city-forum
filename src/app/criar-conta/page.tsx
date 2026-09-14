import { Button } from "@/components/ui/Button";

const fieldClass =
  "rounded-md border border-white/10 bg-black/50 px-3 py-3 text-sm text-white normal-case tracking-normal";

export default async function CriarContaPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; nome?: string; erro?: string }>;
}) {
  const query = await searchParams;

  if (query.ok) {
    const nome = query.nome?.trim() || "jogador";
    return (
      <div className="min-h-screen bg-black px-4 pt-32 pb-16">
        <div className="glass mx-auto w-full max-w-md rounded-2xl p-6 sm:p-8" role="status">
          <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">CONTA CRIADA</p>
          <h1 className="mt-3 font-display text-3xl">Bem-vindo, {nome}.</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Sua conta foi criada. Agora entre com o mesmo apelido e a senha.
          </p>
          <div className="mt-8">
            <Button href="/entrar" className="w-full">
              ENTRAR
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 pt-32 pb-16">
      <form method="post" action="/api/portal/register" className="glass mx-auto w-full max-w-md rounded-2xl p-6 sm:p-8">
        <h1 className="font-display text-3xl">Criar conta</h1>
        {query.erro ? <p className="mt-4 text-sm text-[#FF0000]">{query.erro}</p> : null}
        <label className="mt-6 grid gap-1 text-xs uppercase tracking-[0.16em] text-white/50">
          Apelido
          <input required name="nickname" autoComplete="username" className={fieldClass} />
        </label>
        <label className="mt-4 grid gap-1 text-xs uppercase tracking-[0.16em] text-white/50">
          Senha
          <input required minLength={6} type="password" name="password" autoComplete="new-password" className={fieldClass} />
        </label>
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#FF0000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-glow"
          >
            CRIAR CONTA
          </button>
        </div>
        <div className="mt-3">
          <Button href="/entrar" variant="secondary" className="w-full">
            ENTRAR
          </Button>
        </div>
      </form>
    </div>
  );
}
