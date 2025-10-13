export type Media = {
  id: string;
  title: string;
  subtitle?: string;
  thumb: string;
  backdrop?: string;
  progress?: number; 
  tags?: string[];
  maturity?: string;
  description?: string;
};

export type Row = {
  id: string;
  title: string;
  kind?: "default" | "top10" | "continue";
  items: Media[];
};

export const img = (q: string) =>
  `https://images.unsplash.com/${q}?q=80&w=1600&auto=format&fit=crop`;
