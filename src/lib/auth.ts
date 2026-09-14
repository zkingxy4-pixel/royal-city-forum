import "server-only";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { hash, compare } from "bcryptjs";
import { insert, query } from "@/lib/db";
import { isStrongPassword, isValidNickname } from "@/lib/security";

export const SESSION_COOKIE = "royal_session";
const SESSION_DAYS = 30;

export type DbUser = {
  id: number;
  nickname: string;
  email: string;
};

type UserRow = DbUser & { password_hash: string };

export async function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export async function findUserByIdentifier(identifier: string) {
  const id = identifier.trim();
  const rows = await query<UserRow[]>(
    `SELECT id, nickname, email, password_hash
     FROM users
     WHERE email = ? OR LOWER(nickname) = ?
     LIMIT 1`,
    [id.toLowerCase(), id.toLowerCase()]
  );
  return rows[0] || null;
}

export async function createUser(nickname: string, email: string, password: string) {
  if (!isValidNickname(nickname)) {
    throw new Error("INVALID_NICKNAME");
  }
  if (!isStrongPassword(password)) {
    throw new Error("WEAK_PASSWORD");
  }
  const password_hash = await hashPassword(password);
  const result = await insert(`INSERT INTO users (nickname, email, password_hash) VALUES (?, ?, ?)`, [
    nickname,
    email,
    password_hash,
  ]);
  return { id: Number(result.insertId), nickname, email };
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await insert(`INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))`, [
    userId,
    tokenHash(token),
  ]);
  return { token, expires };
}

export async function getUserBySessionToken(token: string) {
  const rows = await query<DbUser[]>(
    `SELECT u.id, u.nickname, u.email
     FROM sessions s
     INNER JOIN users u ON u.id = s.user_id
     WHERE s.token = ? AND s.expires_at > NOW()
     LIMIT 1`,
    [tokenHash(token)]
  );
  return rows[0] || null;
}

export async function destroySession(token: string) {
  await query(`DELETE FROM sessions WHERE token = ?`, [tokenHash(token)]);
}

export async function setSessionCookie(token: string, expires: Date) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getSessionUser() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return getUserBySessionToken(token);
}

export function publicUser(user: DbUser) {
  return { id: user.id, nickname: user.nickname, email: user.email };
}

export function isDuplicateError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "ER_DUP_ENTRY";
}

export function dbUnavailable(error: unknown) {
  const code = typeof error === "object" && error !== null && "code" in error ? String((error as { code: string }).code) : "";
  return ["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "ER_ACCESS_DENIED_ERROR", "ER_BAD_DB_ERROR"].includes(code);
}
