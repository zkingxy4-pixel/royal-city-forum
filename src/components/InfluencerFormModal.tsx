"use client";

import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";

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

export function InfluencerFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSent(false);
      setError(null);
    }
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch("/api/influencers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Não foi possível enviar a solicitação.");
      return;
    }
    setSent(true);
  }

  return (
    <Modal open={open} onClose={onClose} title="Quero ser influenciador">
      {sent ? (
        <p>Solicitação registrada. A equipe Royal entra em contato pelos canais oficiais.</p>
      ) : (
        <form method="post" className="grid gap-3" onSubmit={onSubmit}>
          {fields.map((f) => (
            <label key={f.name} className="grid gap-1 text-xs tracking-[0.16em] uppercase text-white/60">
              {f.label}
              <input
                required
                name={f.name}
                className="rounded-md bg-black/50 border border-white/10 px-3 py-2 text-sm text-white tracking-normal normal-case"
              />
            </label>
          ))}
          <label className="grid gap-1 text-xs tracking-[0.16em] uppercase text-white/60">
            Por que deseja representar a Royal City?
            <textarea
              required
              name="motivo"
              rows={4}
              className="rounded-md bg-black/50 border border-white/10 px-3 py-2 text-sm text-white tracking-normal normal-case"
            />
          </label>
          <Button type="submit">ENVIAR SOLICITAÇÃO</Button>
          {error ? <p className="text-sm text-[#FF0000]">{error}</p> : null}
        </form>
      )}
    </Modal>
  );
}
