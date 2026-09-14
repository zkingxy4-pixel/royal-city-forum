import { NextResponse } from "next/server";
import { limited } from "@/lib/rate-limit";
import { STAFF_COOKIE, serializeStaffSession, staffCookieOptions, staffPasswordConfigured, verifyStaffPassword } from "@/lib/staff-session";

export async function POST(request: Request) {
  const url = new URL("/staff", request.url);
  if (!staffPasswordConfigured()) {
    url.searchParams.set("erro", "A senha da staff ainda não foi configurada.");
    return NextResponse.redirect(url, 303);
  }
  if (!limited(request, "staff-login", 8).ok) {
    url.searchParams.set("erro", "Muitas tentativas. Espera uns minutos.");
    return NextResponse.redirect(url, 303);
  }

  const form = await request.formData();
  if (!verifyStaffPassword(String(form.get("password") || ""))) {
    url.searchParams.set("erro", "Senha inválida.");
    return NextResponse.redirect(url, 303);
  }

  try {
    const res = NextResponse.redirect(new URL("/staff/painel", request.url), 303);
    res.cookies.set(STAFF_COOKIE, serializeStaffSession(), staffCookieOptions);
    return res;
  } catch {
    url.searchParams.set("erro", "Não foi possível entrar na staff.");
    return NextResponse.redirect(url, 303);
  }
}
