import { Button } from "@/components/ui/Button";

const fieldClass =
  "rounded-md border border-white/10 bg-black/50 px-3 py-3 text-sm text-white normal-case tracking-normal";

export default async function EntrarPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const query = await searchParams;

  return (
    <div className="min-h-screen bg-black px-4 pt-32 pb-16">
      <form method="post" action="/api/portal/login" className="glass mx-auto w-full max-w-md rounded-2xl p-6 sm:p-8">
        <h1 className="font-display text-3xl">Entrar</h1>
        {query.erro ? <p className="mt-4 text-sm text-[#FF0000]">{query.erro}</p> : null}
        <label className="mt-6 grid gap-1 text-xs uppercase tracking-[0.16em] text-white/50">
          Apelido
          <input required name="nickname" minLength={2} maxLength={32} pattern="[A-Za-z0-9._-]+" title="Letras, números, ponto, _ ou -" autoComplete="username" className={fieldClass} />
        </label>
        <label className="mt-4 grid gap-1 text-xs uppercase tracking-[0.16em] text-white/50">
          Senha
          <input required minLength={8} maxLength={72} type="password" name="password" autoComplete="current-password" className={fieldClass} />
        </label>
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#FF0000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-glow"
          >
            ENTRAR
          </button>
        </div>
        <div className="mt-3">
          <Button href="/criar-conta" variant="secondary" className="w-full">
            CRIAR CONTA
          </Button>
        </div>
      </form>
    </div>
  );
}
