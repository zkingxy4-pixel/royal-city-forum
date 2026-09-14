const fieldClass =
  "rounded-md bg-black/50 border border-white/10 px-3 py-2 text-sm text-white tracking-normal normal-case";

const fields = [
  { name: "nome", label: "Nome" },
  { name: "instagram", label: "@ Instagram" },
  { name: "canal", label: "Canal" },
  { name: "plataforma", label: "Plataforma" },
  { name: "seguidores", label: "Quantidade de seguidores" },
  { name: "views", label: "Quantidade média de visualizações" },
  { name: "perfil", label: "Link do perfil" },
  { name: "conteudo", label: "Link de conteúdo" },
] as const;

export function InfluencerForm({ error }: { error?: string }) {
  return (
    <form method="post" action="/api/portal/influencer" className="grid gap-3">
      {fields.map((f) => (
        <label key={f.name} className="grid gap-1 text-xs tracking-[0.16em] uppercase text-white/60">
          {f.label}
          <input required name={f.name} className={fieldClass} />
        </label>
      ))}
      <label className="grid gap-1 text-xs tracking-[0.16em] uppercase text-white/60">
        Por que deseja representar a Royal City?
        <textarea required name="motivo" rows={4} className={fieldClass} />
      </label>
      {error ? <p className="text-sm text-[#FF0000]">{error}</p> : null}
      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#FF0000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-glow"
      >
        Enviar relatório
      </button>
    </form>
  );
}
