import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { PROJECTS, type Project } from "../assets/projects";
import { FileText, GitBranch, Database, GaugeCircle, Shield } from "lucide-react";

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}
function Pill({ text }: { text: string }) {
  return <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">{text}</span>;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project: Project | undefined = useMemo(() => PROJECTS.find(p => p.slug === slug), [slug]);
  if (!project) return <Navigate to="/projects" replace />;

  const cs = project.caseStudy;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
      {/* 헤더 */}
      <header className="mb-6">
        {project.period && <p className="text-xs text-white/60">{project.period}</p>}
        <h1 className="text-2xl sm:text-3xl font-extrabold">{project.title}</h1>
        {project.summary && <p className="text-white/75 mt-2">{project.summary}</p>}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => <Pill key={s} text={s} />)}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer"
               className="rounded-full bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
              GitHub
            </a>
          )}
          <Link to="/projects" className="rounded-full bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
            ← Back to list
          </Link>
        </div>
      </header>

      <div className="grid gap-6">
        {/* Overview (하이라이트/스택) */}
        {(project.bullets?.length ?? 0) > 0 && (
          <Section title="Highlights" icon={<FileText size={18} className="text-white/80" />}>
            <ul className="list-disc pl-5 space-y-1 text-white/85">
              {project.bullets!.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </Section>
        )}

        {/* Case Study: Metrics 제외 버전 */}
        {cs && (
          <>
            <Section title="문제 / 목표" icon={<GaugeCircle size={18} className="text-white/80" />}>
              <ul className="list-disc pl-5 space-y-1 text-white/85">
                {cs.problemGoals.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </Section>

            <Section title="제약" icon={<Shield size={18} className="text-white/80" />}>
              <ul className="list-disc pl-5 space-y-1 text-white/85">
                {cs.constraints.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </Section>

            <Section title="대안 비교 & 결정 (ADR)" icon={<GitBranch size={18} className="text-white/80" />}>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left p-3">Option</th>
                      <th className="text-left p-3">장점</th>
                      <th className="text-left p-3">단점</th>
                      <th className="text-left p-3">선택 사유</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {cs.adrs.map((a, i) => (
                      <tr key={i}>
                        <td className="p-3">{a.option}</td>
                        <td className="p-3">{a.pros}</td>
                        <td className="p-3">{a.cons}</td>
                        <td className="p-3">{a.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {cs.adrs[0] && (
                <p className="mt-3 text-white/85">
                  <b>결정 한 줄:</b> “{cs.adrs[0].option} 선택. 이유: {cs.adrs[0].reason}”.
                </p>
              )}
            </Section>

            <Section title="아키텍처 / 플로우" icon={<Database size={18} className="text-white/80" />}>
              {cs.architecture?.diagram && (
                <img
                  src={cs.architecture.diagram}
                  alt="architecture"
                  className="rounded-xl border border-white/10 mb-4"
                />
              )}
              <ol className="list-decimal pl-5 space-y-1 text-white/85">
                {cs.architecture?.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </Section>

            <Section title="구현 딥다이브 (Top 2–3)" icon={<FileText size={18} className="text-white/80" />}>
              <div className="grid md:grid-cols-3 gap-4">
                {cs.deepDives.map((d, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-semibold mb-2">{d.title}</div>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {d.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {cs.outcome && (
              <Section title="결과 (숫자 요약)" icon={<GaugeCircle size={18} className="text-white/80" />}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {cs.outcome.p95 && <div className="rounded-xl border border-white/10 bg-white/5 p-3"><div className="text-xs text-white/60">p95</div><div className="text-base font-semibold">{cs.outcome.p95}</div></div>}
                  {cs.outcome.tps && <div className="rounded-xl border border-white/10 bg-white/5 p-3"><div className="text-xs text-white/60">Throughput</div><div className="text-base font-semibold">{cs.outcome.tps}</div></div>}
                  {cs.outcome.error && <div className="rounded-xl border border-white/10 bg-white/5 p-3"><div className="text-xs text-white/60">Failure</div><div className="text-base font-semibold">{cs.outcome.error}</div></div>}
                  {cs.outcome.cost && <div className="rounded-xl border border-white/10 bg-white/5 p-3"><div className="text-xs text-white/60">Cost</div><div className="text-base font-semibold">{cs.outcome.cost}</div></div>}
                </div>
              </Section>
            )}

            <Section title="리스크 · 한계 & Next" icon={<Shield size={18} className="text-white/80" />}>
              <ul className="list-disc pl-5 space-y-1 text-white/85">
                {cs.risksNext.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </Section>
          </>
        )}
      </div>
    </main>
  );
}
