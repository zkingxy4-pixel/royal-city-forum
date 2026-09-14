import { NextResponse } from "next/server";
import { dbUnavailable, getSessionUser } from "@/lib/auth";
import { insert } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await getSessionUser();
    const nome = String(body.nome || "").trim();
    const instagram = String(body.instagram || "").trim();
    const canal = String(body.canal || "").trim();
    const plataforma = String(body.plataforma || "").trim();
    const seguidores = String(body.seguidores || "").trim();
    const views = String(body.views || "").trim();
    const perfil = String(body.perfil || "").trim();
    const conteudo = String(body.conteudo || "").trim();
    const motivo = String(body.motivo || "").trim();

    if (!nome || !instagram || !canal || !plataforma || !seguidores || !views || !perfil || !conteudo || !motivo) {
      return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
    }

    await insert(
      `INSERT INTO influencer_requests
        (user_id, nome, instagram, canal, plataforma, seguidores, views_media, perfil_url, conteudo_url, motivo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user?.id || null, nome, instagram, canal, plataforma, seguidores, views, perfil, conteudo, motivo]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (dbUnavailable(error)) {
      return NextResponse.json({ error: "Banco de dados indisponível. Confira o MariaDB no HeidiSQL." }, { status: 503 });
    }
    console.error(error);
    return NextResponse.json({ error: "Não foi possível enviar a solicitação." }, { status: 500 });
  }
}
