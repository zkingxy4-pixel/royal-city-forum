const fieldClass =
  "rounded-md border border-white/10 bg-black/50 px-3 py-3 text-sm text-white normal-case tracking-normal";

export function FactionForm({ error }: { error?: string }) {
  return (
    <form method="post" action="/api/portal/faction" className="grid gap-4">
      <label className="grid gap-1 text-xs uppercase tracking-[0.16em] text-white/55">
        1. Nome da facção
        <input required name="nomeFaccao" minLength={2} className={fieldClass} />
      </label>
      <label className="grid gap-1 text-xs uppercase tracking-[0.16em] text-white/55">
        2. Nome do líder
        <input required name="nomeLider" minLength={2} className={fieldClass} />
      </label>
      <label className="grid gap-1 text-xs uppercase tracking-[0.16em] text-white/55">
        3. Idade do líder
        <input required name="idadeLider" type="number" min={16} max={80} className={fieldClass} />
      </label>
      <label className="grid gap-1 text-xs uppercase tracking-[0.16em] text-white/55">
        4. Quantidade de membros ativos
        <input required name="membrosAtivos" type="number" min={1} max={500} className={fieldClass} />
      </label>
      <label className="grid gap-1 text-xs uppercase tracking-[0.16em] text-white/55">
        5. Discord do responsável
        <input required name="discordResponsavel" placeholder="ex: nome ou ID" className={fieldClass} />
      </label>
      <label className="grid gap-1 text-xs uppercase tracking-[0.16em] text-white/55">
        6. Território ou zona de atuação na cidade
        <input required name="territorio" className={fieldClass} />
      </label>
      <label className="grid gap-1 text-xs uppercase tracking-[0.16em] text-white/55">
        7. Estilo da organização
        <select required name="estilo" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Selecione
          </option>
          <option value="legal">Legal (empresas, serviços, instituições)</option>
          <option value="ilegal">Ilegal (crime organizado no RP)</option>
          <option value="mista">Mista</option>
        </select>
      </label>
      <label className="grid gap-1 text-xs uppercase tracking-[0.16em] text-white/55">
        8. História, regras internas e o que a facção busca na Royal
        <textarea required name="historia" rows={5} minLength={20} className={fieldClass} />
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
