export type Media = {
  id: string;
  title: string;
  subtitle?: string;
  thumb: string;      // poster/thumbnail
  backdrop?: string;  // widescreen
  progress?: number;  // for "continue"
  tags?: string[];
  maturity?: string;  // e.g. '15', '18', 'A'
  description?: string;
  href?: string;      // 외부 링크(깃허브/블로그 등)
};

export type Row = {
  id: string;
  title: string;
  kind?: "default" | "top10" | "continue";
  items: Media[];
};

export const img = (q: string) =>
  `https://images.unsplash.com/${q}?q=80&w=1600&auto=format&fit=crop`;

// --- Browse 페이지 호환을 위한 더미 ---
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
