# Royal City RP — Site oficial

Portal institucional cinematográfico da **Royal City RP**.

## Como editar

Tudo o que muda com frequência está centralizado:

- `src/config/site.ts` — nome, URLs (Discord, Instagram, TikTok, YouTube), imagens, slogan
- `src/data/` — sistemas, empregos, organizações, eventos, criadores, galeria, notícias, regras, equipe e FAQ

Altere `DISCORD_URL` e `INSTAGRAM_URL` em `src/config/site.ts` antes de publicar.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Estrutura

- `src/components` — Navbar, Slider, cards, modal, galeria, FAQ, footer
- `src/sections` — os 16 slides
- `src/app` — páginas (início, notícias, regras, 404)
- `public/assets` — artes oficiais geradas para o site

## Notas

Royal City é uma cidade de Roleplay independente. Não utilize marcas de terceiros como se fossem da cidade.
