import { NextResponse } from "next/server";
import {
  createSession,
  dbUnavailable,
  findUserByIdentifier,
  publicUser,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = String(body.identifier || "").trim();
    const password = String(body.password || "");

    if (!identifier || password.length < 6) {
      return NextResponse.json({ error: "E-mail, apelido ou senha inválidos." }, { status: 400 });
    }

    const found = await findUserByIdentifier(identifier);
    if (!found || !(await verifyPassword(password, found.password_hash))) {
      return NextResponse.json({ error: "E-mail, apelido ou senha inválidos." }, { status: 401 });
    }

    const session = await createSession(found.id);
    await setSessionCookie(session.token, session.expires);
    return NextResponse.json({ user: publicUser(found) });
  } catch (error) {
    if (dbUnavailable(error)) {
      return NextResponse.json({ error: "Banco de dados indisponível. Confira o MariaDB no HeidiSQL." }, { status: 503 });
    }
    console.error(error);
    return NextResponse.json({ error: "Não foi possível entrar." }, { status: 500 });
  }
}
