import { NextResponse } from "next/server";
import { saveInfluencerRequest } from "@/lib/portal-store";
import { getPortalSession } from "@/lib/portal-session";
import { limited } from "@/lib/rate-limit";
import { accountsOnlineMessage } from "@/lib/security";

function fail(request: Request, message: string) {
  const url = new URL("/influenciadores/candidatar", request.url);
  url.searchParams.set("erro", message);
  return NextResponse.redirect(url, 303);
}

function needAccount(request: Request) {
  const url = new URL("/entrar", request.url);
  url.searchParams.set("erro", "Entre na sua conta para enviar o relatório.");
  url.searchParams.set("next", "/influenciadores/candidatar");
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  try {
    const session = await getPortalSession();
    if (!session) {
      return needAccount(request);
    }
    if (!limited(request, "influencer", 6).ok) {
      return fail(request, "Muitos envios. Espera um pouco e tenta de novo.");
    }

    const form = await request.formData();
    const fields = Object.fromEntries([...form.entries()].map(([key, value]) => [key, String(value)])) as Record<string, string>;
    const result = await saveInfluencerRequest(fields, session.nickname);

    if (typeof result === "string") {
      return fail(request, result);
    }

    const url = new URL("/influenciadores/candidatar", request.url);
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
