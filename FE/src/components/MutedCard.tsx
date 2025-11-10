export default function MutedCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"rounded-2xl border border-white/15 bg-white/[0.03] p-4 " + className}>{children}</div>;
}
