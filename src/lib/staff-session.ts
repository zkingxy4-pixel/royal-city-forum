import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const STAFF_COOKIE = "royal_staff";
const SESSION_MS = 12 * 60 * 60 * 1000;

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

export function staffPasswordConfigured() {
  return Boolean(process.env.STAFF_PASSWORD?.trim());
}

export function verifyStaffPassword(password: string) {
  const expected = process.env.STAFF_PASSWORD?.trim() || "";
  const given = password.trim();
  if (!expected || !given) return false;
  const left = Buffer.from(given);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function serializeStaffSession() {
  const secret = authSecret();
  if (!secret) throw new Error("AUTH_SECRET_MISSING");
  const payload = Buffer.from(JSON.stringify({ r: "staff", e: Date.now() + SESSION_MS })).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function parseStaffSession(raw?: string | null) {
  if (!raw) return false;
  const secret = authSecret();
  if (!secret) return false;
  const [payload, signature] = raw.split(".");
  if (!payload || !signature) return false;
  try {
    if (!safeEqual(sign(payload, secret), signature)) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { r?: string; e?: number };
    return data?.r === "staff" && typeof data.e === "number" && data.e >= Date.now();
  } catch {
    return false;
  }
}

export const staffCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: Math.floor(SESSION_MS / 1000),
};

export async function isStaff() {
  const jar = await cookies();
  return parseStaffSession(jar.get(STAFF_COOKIE)?.value);
}
