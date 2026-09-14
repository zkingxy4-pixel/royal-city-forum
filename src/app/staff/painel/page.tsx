import { redirect } from "next/navigation";
import { isStaff } from "@/lib/staff-session";
import { listInbox } from "@/lib/portal-store";

function label(kind: "influencer" | "faction") {
  return kind === "influencer" ? "Influenciador" : "Facção";
}

export default async function StaffPainelPage() {
  if (!(await isStaff())) {
    redirect("/staff");
  }

  const items = await listInbox();

  return (
    <div className="min-h-screen bg-black px-4 pt-24 pb-16 md:pt-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] tracking-[0.3em] text-[#FF0000]">STAFF</p>
        <h1 className="mt-3 font-display text-4xl">Formulários recebidos</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
          Relatórios de influenciador e facção. Esta página não aparece no menu público.
        </p>
        <form method="post" action="/api/staff/logout" className="mt-6">
          <button type="submit" className="text-sm text-white/50 hover:text-white">
            Sair da staff
          </button>
        </form>

        {items.length === 0 ? (
          <div className="glass mt-8 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-white/70">Ainda não há formulários nesta lista.</p>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Envios feitos neste PC aparecem aqui. No site público, a lista só fica permanente quando o banco da nuvem
              estiver ligado.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {items.map((item) => (
              <article key={`${item.kind}-${item.protocol}-${item.createdAt}`} className="glass rounded-2xl p-5">
                <p className="text-[11px] tracking-[0.24em] text-[#FF0000]">{label(item.kind)}</p>
                <h2 className="mt-2 font-display text-2xl">
                  {item.fields.nome || item.fields.nomeFaccao || "Relatório"}
                </h2>
                <p className="mt-1 font-mono text-xs text-white/55">
                  {item.protocol} · {item.createdAt ? new Date(item.createdAt).toLocaleString("pt-BR") : ""}
                  {item.nickname ? ` · ${item.nickname}` : ""}
                </p>
                <dl className="mt-4 grid gap-2 text-sm text-white/75">
                  {Object.entries(item.fields)
                    .filter(([key]) => !["protocol", "createdAt", "nickname"].includes(key))
                    .map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-[11px] uppercase tracking-[0.16em] text-white/40">{key}</dt>
                        <dd className="mt-0.5 whitespace-pre-wrap break-words">{value}</dd>
                      </div>
                    ))}
                </dl>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
