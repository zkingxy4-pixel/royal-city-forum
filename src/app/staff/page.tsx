import { Button } from "@/components/ui/Button";

const fieldClass =
  "rounded-md border border-white/10 bg-black/50 px-3 py-3 text-sm text-white normal-case tracking-normal";

export default async function StaffLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const query = await searchParams;

  return (
    <div className="min-h-screen bg-black px-4 pt-24 pb-16 md:pt-16">
      <form method="post" action="/api/staff/login" className="glass mx-auto w-full max-w-md rounded-2xl p-6 sm:p-8">
        <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">STAFF</p>
        <h1 className="mt-3 font-display text-3xl">Formulários</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/65">Área privada para ver os relatórios enviados no site.</p>
        {query.erro ? <p className="mt-4 text-sm text-[#FF0000]">{query.erro}</p> : null}
        <label className="mt-6 grid gap-1 text-xs uppercase tracking-[0.16em] text-white/50">
          Senha da staff
          <input required minLength={8} type="password" name="password" autoComplete="current-password" className={fieldClass} />
        </label>
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#FF0000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-glow"
          >
            Entrar
          </button>
        </div>
        <div className="mt-3">
          <Button href="/" variant="secondary" className="w-full">
            Voltar ao site
          </Button>
        </div>
      </form>
    </div>
  );
}
