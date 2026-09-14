import { NextResponse } from "next/server";
import { loginPortalUser } from "@/lib/portal-store";
import { PORTAL_COOKIE, serializePortalSession } from "@/lib/portal-cookie";

export async function POST(request: Request) {
  const form = await request.formData();
  const result = await loginPortalUser(String(form.get("nickname") || ""), String(form.get("password") || ""));

  if (typeof result === "string") {
    const url = new URL("/entrar", request.url);
    url.searchParams.set("erro", result);
    return NextResponse.redirect(url, 303);
  }

  const url = new URL("/conta", request.url);
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(PORTAL_COOKIE, serializePortalSession(result), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    httpOnly: false,
  });
  return res;
}
