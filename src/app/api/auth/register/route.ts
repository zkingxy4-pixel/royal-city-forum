import { NextResponse } from "next/server";
import {
  createSession,
  createUser,
  dbUnavailable,
  isDuplicateError,
  publicUser,
  setSessionCookie,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nickname = String(body.nickname || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (nickname.length < 2 || nickname.length > 32) {
      return NextResponse.json({ error: "Informe um apelido com 2 a 32 caracteres." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "A senha precisa ter pelo menos 6 caracteres." }, { status: 400 });
    }

    const user = await createUser(nickname, email, password);
    const session = await createSession(user.id);
    await setSessionCookie(session.token, session.expires);
    return NextResponse.json({ user: publicUser(user) });
  } catch (error) {
    if (isDuplicateError(error)) {
      const msg = String((error as { message?: string }).message || "");
      if (msg.includes("nickname")) {
        return NextResponse.json({ error: "Este apelido já está em uso." }, { status: 409 });
      }
      return NextResponse.json({ error: "Este e-mail já possui conta no portal." }, { status: 409 });
    }
    if (dbUnavailable(error)) {
      return NextResponse.json({ error: "Banco de dados indisponível. Confira o MariaDB no HeidiSQL." }, { status: 503 });
    }
    console.error(error);
    return NextResponse.json({ error: "Não foi possível criar a conta." }, { status: 500 });
  }
}
