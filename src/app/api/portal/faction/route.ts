import { NextResponse } from "next/server";
import { saveFactionRequest } from "@/lib/portal-store";
import { getPortalSession } from "@/lib/portal-session";
import { limited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const session = await getPortalSession();
  if (!session) {
    return NextResponse.redirect(new URL("/entrar", request.url), 303);
  }

  if (!limited(request, "faction", 6).ok) {
    const url = new URL("/faccao/relatorio", request.url);
    url.searchParams.set("erro", "Muitos envios. Espera um pouco e tenta de novo.");
    return NextResponse.redirect(url, 303);
  }

  const form = await request.formData();
  const fields = Object.fromEntries([...form.entries()].map(([key, value]) => [key, String(value)])) as Record<
    string,
    string
  >;
  const result = await saveFactionRequest(fields, session.nickname);

  if (typeof result === "string") {
    const url = new URL("/faccao/relatorio", request.url);
    url.searchParams.set("erro", result);
    return NextResponse.redirect(url, 303);
  }

  const url = new URL("/faccao/relatorio", request.url);
  url.searchParams.set("enviado", "1");
  url.searchParams.set("protocolo", result.protocol);
  return NextResponse.redirect(url, 303);
}
