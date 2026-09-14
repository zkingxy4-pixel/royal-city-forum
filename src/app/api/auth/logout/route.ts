import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { clearSessionCookie, destroySession, SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    await destroySession(token).catch(() => undefined);
  }
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
