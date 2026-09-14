import { NextResponse } from "next/server";
import { registerPortalUser } from "@/lib/portal-store";
import { limited } from "@/lib/rate-limit";
import { accountsOnlineMessage, publicSignupEnabled } from "@/lib/security";

function fail(request: Request, message: string) {
  const url = new URL("/criar-conta", request.url);
  url.searchParams.set("erro", message);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  try {
    if (!publicSignupEnabled()) {
      return fail(request, "O cadastro público está fechado no momento.");
    }

    if (!limited(request, "register", 5).ok) {
      return fail(request, "Muitas tentativas. Espera uns minutos e tenta de novo.");
    }

    const form = await request.formData();
    const result = await registerPortalUser(String(form.get("nickname") || ""), String(form.get("password") || ""));

    if (typeof result === "string") {
      return fail(request, result);
    }

    const url = new URL("/criar-conta", request.url);
    url.searchParams.set("ok", "1");
    url.searchParams.set("nome", result.nickname);
    return NextResponse.redirect(url, 303);
  } catch {
    return fail(request, accountsOnlineMessage());
  }
}
