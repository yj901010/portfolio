export default function SectionTitle({ title, id }: { title: string; id?: string }) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <div className="h-6 w-1.5 rounded bg-red-600" />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">{title}</h2>
      </div>
    </div>
  );
}
