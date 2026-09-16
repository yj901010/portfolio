import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProjectBySlug } from "../assets/projects";
import SectionTitle from "../components/SectionTitle";
import MutedCard from "../components/MutedCard";
import { Chip, Pill } from "../components/Chips";
import CodeBlock from "../components/CodeBlock";
import ImageOrPlaceholder from "../components/ImageOrPlaceholder";
import Accordion from "../components/Accordion";
import KpiCard from "../components/KpiCard";

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const p = getProjectBySlug(slug);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [slug]);

  if (!p) return <Navigate to="/projects" replace />;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="pt-16" />

      {/* 헤더 요약 */}
      <header className="border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{p.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {p.roles.map((r) => (
              <Pill key={r} tone="red">{r}</Pill>
            ))}
            <Chip>기간 · {p.period}</Chip>
            {p.teamSize != null && <Chip>인원 · {p.teamSize}명</Chip>}
            <Chip>{p.category === "work" ? "회사 프로젝트" : "SSAFY 프로젝트"} · {p.organization}</Chip>
            {p.teamComposition && <Chip>팀 구성 · {p.teamComposition}</Chip>}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-24 space-y-16">
        {/* 개요 & 문제정의 */}
        <SectionTitle id="intro" title="프로젝트 소개" />
        <div className="grid gap-10 md:grid-cols-2">
          <MutedCard>
            <div className="text-red-400 font-semibold mb-2">📖 개요 (Overview)</div>
            <p className="text-white/80 leading-relaxed">{p.overview}</p>
          </MutedCard>
          <MutedCard>
            <div className="text-red-400 font-semibold mb-2">📍 기획 배경 (Problem Definition)</div>
            <p className="text-white/80 leading-relaxed">{p.problem}</p>
          </MutedCard>
        </div>

        {p.scenarios.length > 0 && (<>
        {/* 사용자 시나리오 */}
        <SectionTitle id="scenario" title="사용자 시나리오" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {p.scenarios.map((s, i) => (
            <figure
              key={s.title}
              className="rounded-2xl p-4 bg-white/[0.02] ring-1 ring-white/10 hover:bg-white/[0.04] transition"
            >
              <div className="w-full h-36">
                <ImageOrPlaceholder
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <figcaption className="mt-3 text-center">
                <div className="text-white/90 font-medium">{s.title}</div>
                <div className="text-[12px] text-white/60 mt-1">
                  <span className="text-white/50">{i + 1}. </span>
                  {s.caption}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        </>)}

        {(p.architectureImg || p.erdImg) && (<>
        {/* 시스템 설계 */}
        <SectionTitle id="design" title="시스템 설계" />
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-white/90 font-semibold mb-2">🗺️ 서비스 아키텍처</div>
            <div className="h-72">
              <ImageOrPlaceholder
                src={p.architectureImg}
                alt="Architecture Diagram Placeholder"
                hint="public/projects/myfairy/architecture.png 로 이미지를 넣어주세요"
                className="rounded-xl"
              />
            </div>
          </div>
          <div>
            <div className="text-white/90 font-semibold mb-2">🗃️ ERD (데이터 모델)</div>
            <div className="h-72">
              <ImageOrPlaceholder
                src={p.erdImg}
                alt="ERD Image Placeholder"
                hint="public/projects/myfairy/erd.png 로 이미지를 넣어주세요"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
        </>)}

        {/* 기술 스택 */}
        <SectionTitle id="stack" title="기술 스택 (Tech Stack)" />
        <div className="flex flex-wrap gap-2">
          {p.techChips.map((t) => (
            <span key={t} className="rounded-full bg-white/10 text-white/90 px-3 py-1 text-xs">{t}</span>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {p.techWhy.map((w) => (
            <MutedCard key={w.title}>
              <div className="font-semibold text-white">{w.title}</div>
              <ul className="mt-2 list-disc list-inside text-sm text-white/75 space-y-1">
                {w.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </MutedCard>
          ))}
        </div>

        {(p.code.dockerfile || p.code.jenkins) && (<>
        {/* 기술 구현(코드) */}
        <SectionTitle id="impl" title="기술 구현 (코드 스냅샷)" />
        <div className="grid gap-6 md:grid-cols-2">
          <MutedCard className="flex flex-col">
            <div className="text-white font-semibold mb-2">Dockerfile (멀티스테이지, Vite/React → Nginx)</div>
            <div className="mt-1 flex-1">
              <CodeBlock lang="dockerfile" code={p.code.dockerfile} height={360} initialCollapsed />
            </div>
          </MutedCard>
          <MutedCard className="flex flex-col">
            <div className="text-white font-semibold mb-2">Jenkinsfile (Blue/Green + 헬스체크)</div>
            <div className="mt-1 flex-1">
              <CodeBlock lang="groovy" code={p.code.jenkins} height={360} initialCollapsed />
            </div>
          </MutedCard>
        </div>
        </>)}

        {p.contributions.length > 0 && (<>
        {/* 나의 기여 */}
        <SectionTitle id="contrib" title="나의 기여 (Contributions)" />
        <div className="space-y-4">
          {p.contributions.map((c) => (
            <div key={c.no} className="rounded-2xl ring-1 ring-white/10 bg-white/[0.03] p-0 overflow-hidden">
              <div className="flex">
                <div className="w-20 shrink-0 grid place-items-center bg-white/[0.04] text-3xl font-extrabold text-white/10">{c.no}</div>
                <div className="flex-1 p-5">
                  <div className="font-semibold text-white">{c.title}</div>
                  <ul className="mt-2 list-disc list-inside text-white/80 text-sm space-y-1">
                    {c.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
                <div className="hidden md:block pr-4 pt-4 text-[11px] text-red-400 font-semibold">MAIN ROLE</div>
              </div>
            </div>
          ))}
        </div>
        </>)}

        {p.issues.length > 0 && (<>
        {/* 트러블 슈팅 */}
        <SectionTitle id="troubleshoot" title="트러블 슈팅 (Troubleshooting)" />
        <Accordion items={p.issues} />
        </>)}

        {p.kpis.length > 0 && (<>
        {/* 주요 성과 */}
        <SectionTitle id="kpi" title="주요 성과 (Key Achievements)" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {p.kpis.map((k) => <KpiCard key={k.label} label={k.label} value={k.value} note={k.note} />)}
        </div>
        </>)}

        {p.references && (
          <section aria-label="프로젝트 참고 자료" className="flex flex-wrap gap-5 text-sm text-white/75">
            {p.references.map((reference) => <a key={reference.url} href={reference.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">{reference.label} ↗<span className="nf-sr-only"> (새 탭)</span></a>)}
          </section>
        )}

        <section className="pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
            <a href="/projects" className="text-white/80 hover:text-white">← 프로젝트 목록</a>
          </div>
        </section>
      </div>
    </div>
  );
}
