import { NextResponse } from "next/server";
import { loginPortalUser } from "@/lib/portal-store";
import { PORTAL_COOKIE } from "@/lib/portal-cookie";
import { canSignPortalSession, portalCookieOptions, serializePortalSession } from "@/lib/portal-session";
import { limited } from "@/lib/rate-limit";
import { accountsOnlineMessage } from "@/lib/security";

function fail(request: Request, message: string) {
  const url = new URL("/entrar", request.url);
  url.searchParams.set("erro", message);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  try {
    if (!limited(request, "login", 8).ok) {
      return fail(request, "Muitas tentativas. Espera uns minutos e tenta de novo.");
    }

    const form = await request.formData();
    const result = await loginPortalUser(String(form.get("nickname") || ""), String(form.get("password") || ""));

    if (typeof result === "string") {
      return fail(request, result);
    }

    if (!canSignPortalSession()) {
      return fail(request, accountsOnlineMessage());
    }

    const url = new URL("/conta", request.url);
    const res = NextResponse.redirect(url, 303);
    res.cookies.set(PORTAL_COOKIE, serializePortalSession(result), portalCookieOptions);
    return res;
  } catch {
    return fail(request, accountsOnlineMessage());
  }
}
