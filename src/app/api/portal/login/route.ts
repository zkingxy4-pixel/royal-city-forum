import { NextResponse } from "next/server";
import { loginPortalUser } from "@/lib/portal-store";
import { PORTAL_COOKIE } from "@/lib/portal-cookie";
import { portalCookieOptions, serializePortalSession } from "@/lib/portal-session";
import { limited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!limited(request, "login", 8).ok) {
    const url = new URL("/entrar", request.url);
    url.searchParams.set("erro", "Muitas tentativas. Espera uns minutos e tenta de novo.");
    return NextResponse.redirect(url, 303);
  }

  const form = await request.formData();
  const result = await loginPortalUser(String(form.get("nickname") || ""), String(form.get("password") || ""));

  if (typeof result === "string") {
    const url = new URL("/entrar", request.url);
    url.searchParams.set("erro", result);
    return NextResponse.redirect(url, 303);
  }

  const url = new URL("/conta", request.url);
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(PORTAL_COOKIE, serializePortalSession(result), portalCookieOptions);
  return res;
}
