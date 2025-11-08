const RAW_BASE: string =
  (import.meta as any)?.env?.BASE_URL ?? "/";

const BASE = RAW_BASE.endsWith("/") ? RAW_BASE : RAW_BASE + "/";

export const pub = (p: string) => {
  const clean = p.replace(/^\/+/, "");
  return BASE + clean;
};
