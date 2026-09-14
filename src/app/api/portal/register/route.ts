import { NextResponse } from "next/server";
import { registerPortalUser } from "@/lib/portal-store";
import { PORTAL_COOKIE } from "@/lib/portal-cookie";
import { safePortalNext } from "@/lib/portal-next";
import { canSignPortalSession, portalCookieOptions, serializePortalSession } from "@/lib/portal-session";
import { limited } from "@/lib/rate-limit";
import { accountsOnlineMessage, publicSignupEnabled } from "@/lib/security";

function fail(request: Request, message: string, next: string) {
  const url = new URL("/criar-conta", request.url);
  url.searchParams.set("erro", message);
  if (next && next !== "/conta") url.searchParams.set("next", next);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const next = safePortalNext(String(form.get("next") || ""));

    if (!publicSignupEnabled()) {
      return fail(request, "O cadastro público está fechado no momento.", next);
    }

    if (!limited(request, "register", 5).ok) {
      return fail(request, "Muitas tentativas. Espera uns minutos e tenta de novo.", next);
    }
    const result = await registerPortalUser(
      String(form.get("nickname") || ""),
      String(form.get("password") || ""),
      String(form.get("email") || "")
    );

    if (typeof result === "string") {
      return fail(request, result, next);
    }

    if (canSignPortalSession()) {
      const res = NextResponse.redirect(new URL(next, request.url), 303);
      res.cookies.set(PORTAL_COOKIE, serializePortalSession(result), portalCookieOptions);
      return res;
    }

    const url = new URL("/criar-conta", request.url);
    url.searchParams.set("ok", "1");
    url.searchParams.set("nome", result.nickname);
    if (next !== "/conta") url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  } catch {
    return fail(request, accountsOnlineMessage(), "/conta");
  }
}
