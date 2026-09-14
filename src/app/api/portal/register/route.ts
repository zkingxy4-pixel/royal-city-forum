import { NextResponse } from "next/server";
import { registerPortalUser } from "@/lib/portal-store";

export async function POST(request: Request) {
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
