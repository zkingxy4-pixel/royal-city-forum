import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { PORTAL_COOKIE, type PortalSession } from "@/lib/portal-cookie";

const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

type Payload = { n: string; e: number };

function authSecret() {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret || secret.length < 24) return null;
  return secret;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function canSignPortalSession() {
  return Boolean(authSecret());
}

export function serializePortalSession(user: PortalSession) {
  const secret = authSecret();
  if (!secret) {
    throw new Error("AUTH_SECRET_MISSING");
  }
  const body: Payload = { n: user.nickname, e: Date.now() + SESSION_MS };
  const payload = Buffer.from(JSON.stringify(body)).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function parsePortalSession(raw?: string | null): PortalSession | null {
  if (!raw) return null;
  const secret = authSecret();
  if (!secret) return null;
  const [payload, signature] = raw.split(".");
  if (!payload || !signature) return null;

  try {
    if (!safeEqual(sign(payload, secret), signature)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Payload;
    if (typeof data?.n !== "string" || !data.n.trim()) return null;
    if (typeof data.e !== "number" || data.e < Date.now()) return null;
    return { nickname: data.n };
  } catch {
    return null;
  }
}

export const portalCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: Math.floor(SESSION_MS / 1000),
};

export async function getPortalSession() {
  const jar = await cookies();
  return parsePortalSession(jar.get(PORTAL_COOKIE)?.value);
}
