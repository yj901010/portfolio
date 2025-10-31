// src/pages/ExperienceMore.tsx
import { useState } from "react";
import { EXPERIENCES, type Experience } from "../assets/experienceData";

function Row({ e }: { e: Experience }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative pl-6">
      <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-red-600" />
      <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
          <div>
            <h3 className="text-white font-semibold">{e.title}</h3>
            <p className="text-white/70 text-xs">{e.role} · {e.period}</p>
          </div>
          <button onClick={() => setOpen(!open)} className="self-start md:self-auto text-xs px-2 py-1 rounded bg-white/15 text-white hover:bg-white/25">{open ? "접기" : "자세히"}</button>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {e.stack.map(s => <span key={s} className="text-[10px] text-white/90 bg-white/10 rounded px-1.5 py-0.5">{s}</span>)}
        </div>

        {open && (
          <div className="mt-3 space-y-3 text-sm">
            {e.details?.problem && (
              <div>
                <div className="text-white font-medium">문제</div>
                <p className="text-white/80 text-[13px] mt-1">{e.details.problem}</p>
              </div>
            )}
            {e.details?.actions && e.details.actions.length > 0 && (
              <div>
                <div className="text-white font-medium">내가 한 일</div>
                <ul className="list-disc pl-5 text-white/80 text-[13px] mt-1">
                  {e.details.actions.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            )}
            {e.details?.results && e.details.results.length > 0 && (
              <div>
                <div className="text-white font-medium">성과</div>
                <ul className="list-disc pl-5 text-white/80 text-[13px] mt-1">
                  {e.details.results.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}
            {(e.links?.github || e.links?.post || e.links?.demo) && (
              <div className="flex gap-2 pt-1">
                {e.links.github && <a className="text-xs px-2 py-1 rounded bg-white text-black hover:bg-white/90" href={e.links.github}>GitHub</a>}
                {e.links.post && <a className="text-xs px-2 py-1 rounded bg-white/15 text-white hover:bg-white/25" href={e.links.post}>글 보기</a>}
                {e.links.demo && <a className="text-xs px-2 py-1 rounded bg-white/15 text-white hover:bg-white/25" href={e.links.demo}>데모</a>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExperienceMore() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-10 max-w-[880px] mx-auto">
        <h2 className="relative w-fit mx-auto text-2xl md:text-3xl font-extrabold text-neutral-100">
          경험 – 전체 보기
          <span className="block h-[3px] w-full bg-red-600 rounded-full mt-2" />
        </h2>
        <div className="mt-8 space-y-6">
          {EXPERIENCES.map(e => <Row key={e.id} e={e} />)}
        </div>
      </main>
    </div>
  );
}
