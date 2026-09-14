import { NextResponse } from "next/server";
import { loginPortalUser } from "@/lib/portal-store";
import { PORTAL_COOKIE } from "@/lib/portal-cookie";
import { safePortalNext } from "@/lib/portal-next";
import { canSignPortalSession, portalCookieOptions, serializePortalSession } from "@/lib/portal-session";
import { limited } from "@/lib/rate-limit";
import { accountsOnlineMessage } from "@/lib/security";

function fail(request: Request, message: string, next: string) {
  const url = new URL("/entrar", request.url);
  url.searchParams.set("erro", message);
  if (next && next !== "/conta") url.searchParams.set("next", next);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const next = safePortalNext(String(form.get("next") || ""));

    if (!limited(request, "login", 8).ok) {
      return fail(request, "Muitas tentativas. Espera uns minutos e tenta de novo.", next);
    }

    const result = await loginPortalUser(String(form.get("nickname") || ""), String(form.get("password") || ""));

    if (typeof result === "string") {
      return fail(request, result, next);
    }

    if (!canSignPortalSession()) {
      return fail(request, accountsOnlineMessage(), next);
    }

    const url = new URL(next, request.url);
    const res = NextResponse.redirect(url, 303);
    res.cookies.set(PORTAL_COOKIE, serializePortalSession(result), portalCookieOptions);
    return res;
  } catch {
    return fail(request, accountsOnlineMessage(), "/conta");
  }
}
