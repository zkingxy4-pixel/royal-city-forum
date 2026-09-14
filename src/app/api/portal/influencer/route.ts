import { NextResponse } from "next/server";
import { saveInfluencerRequest } from "@/lib/portal-store";
import { parsePortalSession, PORTAL_COOKIE } from "@/lib/portal-cookie";

export async function POST(request: Request) {
  const form = await request.formData();
  const fields = Object.fromEntries([...form.entries()].map(([key, value]) => [key, String(value)])) as Record<string, string>;
  const cookie = request.headers.get("cookie") || "";
  const row = cookie.split("; ").find((part) => part.startsWith(`${PORTAL_COOKIE}=`));
  const session = parsePortalSession(row?.slice(PORTAL_COOKIE.length + 1));

  const result = await saveInfluencerRequest(fields, session?.nickname);

  if (typeof result === "string") {
    const url = new URL("/influenciadores/candidatar", request.url);
    url.searchParams.set("erro", result);
    return NextResponse.redirect(url, 303);
  }

  const url = new URL("/influenciadores/candidatar", request.url);
  url.searchParams.set("enviado", "1");
  url.searchParams.set("protocolo", result.protocol);
  return NextResponse.redirect(url, 303);
}
