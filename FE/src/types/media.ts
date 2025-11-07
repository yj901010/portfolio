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
  href?: string;
  playHref?: string;
  moreHref?: string;
};

export type Row = {
  id: string;
  title: string;
  kind?: "default" | "top10" | "continue";
  items: Media[];
};
