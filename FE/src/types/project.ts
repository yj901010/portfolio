export type TechWhy = { title: string; bullets: string[] };

export type Issue = {
  id: string;
  severity: "CRITICAL" | "MAJOR";
  title: string;
  detail?: { problem: string; cause: string; fix: string };
};

export type Contribution = { no: string; title: string; items: string[] };

export type KPI = { label: string; value: string; note?: string };

export type Scenario = { title: string; caption: string, image?: string };

export type ProjectDetailData = {
  slug: string;
  name: string;
  period: string;
  teamSize: number;
  teamComposition: string;
  roles: string[];

  overview: string;
  problem: string;

  scenarios: Scenario[];

  architectureImg?: string;
  erdImg?: string;
  thumb?: string;

  techChips: string[];
  techWhy: TechWhy[];

  code: { dockerfile: string; jenkins: string };

  contributions: Contribution[];
  issues: Issue[];
  kpis: KPI[];
};
