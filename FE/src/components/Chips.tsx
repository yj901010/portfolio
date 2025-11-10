export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-white/10 text-white/80 px-2.5 py-0.5 text-xs">{children}</span>;
}

export function Pill({
  children,
  tone = "red",
}: {
  children: React.ReactNode;
  tone?: "red" | "emerald" | "violet" | "sky" | "amber";
}) {
  const map: Record<string, string> = {
    red: "bg-red-500/20 text-red-100 ring-1 ring-red-400/30",
    emerald: "bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-400/30",
    violet: "bg-violet-500/20 text-violet-100 ring-1 ring-violet-400/30",
    sky: "bg-sky-500/20 text-sky-100 ring-1 ring-sky-400/30",
    amber: "bg-amber-500/20 text-amber-100 ring-1 ring-amber-400/30",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${map[tone]}`}>{children}</span>;
}
