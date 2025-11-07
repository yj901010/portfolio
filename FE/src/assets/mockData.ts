import type { Media, Row } from "../types/media";

export const img = (q: string, opts?: { w?: number; q?: number; h?: number }) => {
  const w = opts?.w ?? 1600;
  const quality = opts?.q ?? 80;
  const base = /^(https?:)?\/\//.test(q) ? q : `https://images.unsplash.com/${q}`;
  const h = opts?.h ? `&h=${opts.h}` : "";
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}q=${quality}&w=${w}${h}&auto=format&fit=crop`;
};


export const HERO: Media = {
  id: "hero-browse",
  title: "Smart Agriculture: Beyond the Field",
  subtitle: "Drones · AI Vision · Real-time Analytics",
  thumb: img("photo-1516726817505-f5ed825624d8"),
  backdrop: img("photo-1518779578993-ec3579fee39f"),
  tags: ["Spring", "FastAPI", "GCP"],
  maturity: "12",
};

export const ROWS: Row[] = [
  {
    id: "trending",
    title: "Trending Now",
    items: Array.from({ length: 8 }).map((_, i) => ({
      id: `tr-${i + 1}`,
      title: `Project TR-${i + 1}`,
      thumb: img("photo-1517245386807-bb43f82c33c4"),
      tags: ["React", "TypeScript", "Tailwind"],
    })),
  },
];

export const rows = ROWS;
export const hero = HERO;
