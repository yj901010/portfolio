export default function KpiCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] p-8 ring-1 ring-red-600/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600" />
      <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">{value}</div>
      <div className="mt-2 text-sm text-white/80">{label}</div>
      {note ? <div className="mt-1 text-xs text-white/60">{note}</div> : null}
    </div>
  );
}
