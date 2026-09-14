import { NextResponse } from "next/server";
import { registerPortalUser } from "@/lib/portal-store";
import { limited } from "@/lib/rate-limit";
import { publicSignupEnabled } from "@/lib/security";

export async function POST(request: Request) {
  if (!publicSignupEnabled()) {
    const url = new URL("/criar-conta", request.url);
    url.searchParams.set("erro", "O cadastro público está fechado no momento.");
    return NextResponse.redirect(url, 303);
  }

  if (!limited(request, "register", 5).ok) {
    const url = new URL("/criar-conta", request.url);
    url.searchParams.set("erro", "Muitas tentativas. Espera uns minutos e tenta de novo.");
    return NextResponse.redirect(url, 303);
  }

  const form = await request.formData();
  const result = await registerPortalUser(String(form.get("nickname") || ""), String(form.get("password") || ""));

  if (typeof result === "string") {
    const url = new URL("/criar-conta", request.url);
    url.searchParams.set("erro", result);
    return NextResponse.redirect(url, 303);
  }

  const url = new URL("/criar-conta", request.url);
  url.searchParams.set("ok", "1");
  url.searchParams.set("nome", result.nickname);
  return NextResponse.redirect(url, 303);
}
