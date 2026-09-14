import { NextResponse } from "next/server";
import { dbUnavailable, getSessionUser } from "@/lib/auth";
import { insert } from "@/lib/db";
import { limited } from "@/lib/rate-limit";
import { isSafeText, publicError } from "@/lib/security";

export async function POST(request: Request) {
  if (!limited(request, "auth-influencer", 6).ok) {
    return NextResponse.json({ error: "Muitos envios. Espera um pouco." }, { status: 429 });
  }

  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Entre na conta para enviar o relatório." }, { status: 401 });
    }

    const body = await request.json();
    const nome = String(body.nome || "").trim();
    const instagram = String(body.instagram || "").trim();
    const canal = String(body.canal || "").trim();
    const plataforma = String(body.plataforma || "").trim();
    const seguidores = String(body.seguidores || "").trim();
    const views = String(body.views || "").trim();
    const perfil = String(body.perfil || "").trim();
    const conteudo = String(body.conteudo || "").trim();
    const motivo = String(body.motivo || "").trim();

    if (
      !isSafeText(nome, 160) ||
      !isSafeText(instagram, 80) ||
      !isSafeText(canal, 80) ||
      !isSafeText(plataforma, 80) ||
      !isSafeText(seguidores, 40) ||
      !isSafeText(views, 40) ||
      !isSafeText(perfil, 160) ||
      !isSafeText(conteudo, 160) ||
      !isSafeText(motivo, 2000)
    ) {
      return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
    }

    await insert(
      `INSERT INTO influencer_requests
        (user_id, nome, instagram, canal, plataforma, seguidores, views_media, perfil_url, conteudo_url, motivo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user.id, nome, instagram, canal, plataforma, seguidores, views, perfil, conteudo, motivo]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (dbUnavailable(error)) {
      return NextResponse.json({ error: publicError("Banco de dados indisponível. Confira o MariaDB no HeidiSQL.") }, { status: 503 });
    }
    console.error(error);
    return NextResponse.json({ error: "Não foi possível enviar a solicitação." }, { status: 500 });
  }
}
