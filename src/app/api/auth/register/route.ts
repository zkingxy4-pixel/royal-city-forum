import { NextResponse } from "next/server";
import {
  createSession,
  createUser,
  dbUnavailable,
  isDuplicateError,
  publicUser,
  setSessionCookie,
} from "@/lib/auth";
import { limited } from "@/lib/rate-limit";
import { isStrongPassword, isValidNickname, publicError, publicSignupEnabled } from "@/lib/security";

export async function POST(request: Request) {
  if (!publicSignupEnabled()) {
    return NextResponse.json({ error: "O cadastro público está fechado no momento." }, { status: 403 });
  }
  if (!limited(request, "auth-register", 5).ok) {
    return NextResponse.json({ error: "Muitas tentativas. Espera uns minutos." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const nickname = String(body.nickname || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!isValidNickname(nickname)) {
      return NextResponse.json({ error: "Use um apelido de 2 a 32 caracteres (letras, números, ponto, _ ou -)." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 190) {
      return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
    }
    if (!isStrongPassword(password)) {
      return NextResponse.json({ error: "A senha precisa ter pelo menos 8 caracteres." }, { status: 400 });
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
      return NextResponse.json({ error: publicError("Banco de dados indisponível. Confira o MariaDB no HeidiSQL.") }, { status: 503 });
    }
    console.error(error);
    return NextResponse.json({ error: "Não foi possível criar a conta." }, { status: 500 });
  }
}
