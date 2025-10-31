// src/pages/ExperiencePlay.tsx
import { EXPERIENCES } from "../assets/experienceData";

function Chip({ children }: { children: string }) {
  return <span className="text-[10px] md:text-[11px] text-white/90 bg-white/10 rounded px-1.5 py-0.5">{children}</span>;
}

function Card({ exp }: { exp: (typeof EXPERIENCES)[number] }) {
  return (
    <article className="group relative">
      <div className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-md" style={{ boxShadow: "0 14px 46px rgba(220,38,38,0.55)" }} />
      <div className="relative h-48 sm:h-56 md:h-60 rounded-2xl bg-neutral-900/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transform-gpu transition-transform duration-200 group-hover:[transform:scaleX(1.03)] p-4 flex flex-col">
        <h3 className="text-lg md:text-xl font-bold text-white">{exp.title}</h3>
        <p className="text-white/70 text-xs md:text-sm mt-1">{exp.role} · {exp.period}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">{exp.stack.slice(0, 6).map(t => <Chip key={t}>{t}</Chip>)}</div>
        <ul className="mt-3 space-y-1.5 text-[12px] md:text-sm text-white/85">{exp.highlights.slice(0, 3).map((h, i) => <li key={i}>• {h}</li>)}</ul>
      </div>
    </article>
  );
}

export default function ExperiencePlay() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1120px] mx-auto">
        <h2 className="relative w-fit mx-auto text-2xl md:text-3xl font-extrabold text-neutral-100">
          경험 하이라이트
          <span className="block h-[3px] w-full bg-red-600 rounded-full mt-2" />
        </h2>
        <p className="text-white/70 text-sm text-center mt-3">대표 3가지를 빠르게 보여줍니다.</p>
        <div className="mt-6 grid gap-3 md:gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {EXPERIENCES.slice(0, 3).map(e => <Card key={e.id} exp={e} />)}
        </div>
      </main>
    </div>
  );
}
