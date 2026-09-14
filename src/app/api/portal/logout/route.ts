import { NextResponse } from "next/server";
import { PORTAL_COOKIE } from "@/lib/portal-cookie";

export async function POST(request: Request) {
  const url = new URL("/entrar", request.url);
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(PORTAL_COOKIE, "", { path: "/", maxAge: 0, httpOnly: false });
  return res;
}

export async function GET(request: Request) {
  return POST(request);
}
