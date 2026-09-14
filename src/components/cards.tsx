"use client";

import Link from "next/link";
import { Button } from "./ui/Button";

export function InfluencerCard({
  name,
  handle,
  platform,
  photo,
  url,
}: {
  name: string;
  handle: string;
  platform: string;
  photo: string;
  url: string;
}) {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <img src={photo} alt={name} className="h-56 w-full object-cover" loading="lazy" />
      <div className="p-4">
        <p className="font-display text-xl">{name}</p>
        <p className="text-sm text-white/60">{handle}</p>
        <p className="mt-1 text-[11px] tracking-[0.25em] text-[#FF0000]">{platform}</p>
        <div className="mt-4">
          <Button href={url} variant="secondary" className="!py-2 !text-[10px]">
            VER PERFIL
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EventCard({ title, text, image }: { title: string; text: string; image: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl min-h-[220px]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <h3 className="font-display text-xl">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{text}</p>
      </div>
    </div>
  );
}

export function NewsCard({
  title,
  category,
  date,
  image,
  excerpt,
  href,
}: {
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  href: string;
}) {
  return (
    <Link href={href} className="glass overflow-hidden rounded-2xl block hover:border-[#FF0000]/40 transition">
      <img src={image} alt="" className="h-40 w-full object-cover" loading="lazy" />
      <div className="p-4">
        <p className="text-[10px] tracking-[0.25em] text-[#FF0000]">
          {category} · {date}
        </p>
        <h3 className="mt-2 font-display text-xl">{title}</h3>
        <p className="mt-2 text-sm text-white/65">{excerpt}</p>
        <p className="mt-3 text-xs tracking-[0.2em]">LER MAIS</p>
      </div>
    </Link>
  );
}

export function TeamCard({
  name,
  role,
  photo,
  instagram,
  discord,
}: {
  name: string;
  role: string;
  photo: string;
  instagram?: string;
  discord?: string;
}) {
  return (
    <div className="glass overflow-hidden rounded-2xl text-center">
      <img src={photo} alt={name} className="h-52 w-full object-cover" loading="lazy" />
      <div className="p-4">
        <p className="text-[10px] tracking-[0.3em] text-[#FF0000]">{role}</p>
        <p className="mt-1 font-display text-xl">{name}</p>
        <div className="mt-3 flex justify-center gap-3 text-xs text-white/60">
          {instagram ? <a href={instagram}>Instagram</a> : null}
          {discord ? <a href={discord}>Discord</a> : null}
        </div>
      </div>
    </div>
  );
}
