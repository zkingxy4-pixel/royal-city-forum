import { NextResponse } from "next/server";
import { PORTAL_COOKIE } from "@/lib/portal-cookie";
import { portalCookieOptions } from "@/lib/portal-session";

export async function POST(request: Request) {
  const url = new URL("/entrar", request.url);
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(PORTAL_COOKIE, "", { ...portalCookieOptions, maxAge: 0 });
  return res;
}
