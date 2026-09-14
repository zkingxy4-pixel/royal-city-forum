"use server";

import { dbUnavailable, getSessionUser } from "@/lib/auth";
import { insert } from "@/lib/db";
import { isSafeText, publicError } from "@/lib/security";
import { redirect } from "next/navigation";

type InfluencerState = { error: string | null };

export async function influencerAction(_prev: InfluencerState, formData: FormData): Promise<InfluencerState> {
  const user = await getSessionUser();
  if (!user) {
    return { error: "Entre na conta para enviar o relatório." };
  }

  const nome = String(formData.get("nome") || "").trim();
  const instagram = String(formData.get("instagram") || "").trim();
  const canal = String(formData.get("canal") || "").trim();
  const plataforma = String(formData.get("plataforma") || "").trim();
  const seguidores = String(formData.get("seguidores") || "").trim();
  const views = String(formData.get("views") || "").trim();
  const perfil = String(formData.get("perfil") || "").trim();
  const conteudo = String(formData.get("conteudo") || "").trim();
  const motivo = String(formData.get("motivo") || "").trim();

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
    return { error: "Preencha todos os campos." };
  }

  try {
    await insert(
      `INSERT INTO influencer_requests
        (user_id, nome, instagram, canal, plataforma, seguidores, views_media, perfil_url, conteudo_url, motivo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user.id, nome, instagram, canal, plataforma, seguidores, views, perfil, conteudo, motivo]
    );
  } catch (error) {
    if (dbUnavailable(error)) {
      return { error: publicError("Banco de dados indisponível. Abra o MariaDB no HeidiSQL.") };
    }
    console.error(error);
    return { error: "Não foi possível enviar a solicitação." };
  }

  redirect("/influenciadores/candidatar?enviado=1");
}
