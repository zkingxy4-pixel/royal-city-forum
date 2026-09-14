import { NextResponse } from "next/server";
import { saveFactionRequest } from "@/lib/portal-store";
import { getPortalSession } from "@/lib/portal-session";
import { limited } from "@/lib/rate-limit";
import { accountsOnlineMessage } from "@/lib/security";

function fail(request: Request, message: string) {
  const url = new URL("/faccao/relatorio", request.url);
  url.searchParams.set("erro", message);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  try {
    const session = await getPortalSession();
    if (!limited(request, "faction", 6).ok) {
      return fail(request, "Muitos envios. Espera um pouco e tenta de novo.");
    }

    const form = await request.formData();
    const fields = Object.fromEntries([...form.entries()].map(([key, value]) => [key, String(value)])) as Record<
      string,
      string
    >;
    const result = await saveFactionRequest(fields, session?.nickname || "");

    if (typeof result === "string") {
      return fail(request, result);
    }

    const url = new URL("/faccao/relatorio", request.url);
    url.searchParams.set("enviado", "1");
    url.searchParams.set("protocolo", result.protocol);
    return NextResponse.redirect(url, 303);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cloud inbox")) {
      return fail(request, "Não deu para gravar o relatório agora. Tenta de novo em instantes.");
    }
    return fail(request, accountsOnlineMessage());
  }
}
