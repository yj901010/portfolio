import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../assets/projects";

type AnyProject = {
  slug: string;
  name?: string;
  title?: string;
  period?: string;
  teamSize?: number;
  roles?: string[];
  thumb?: string;
  cover?: string;
  architectureImg?: string;
};

function ProjectCard({ p }: { p: AnyProject }) {
  const title = p.name ?? p.title ?? "Untitled Project";
  const thumb = p.thumb || p.cover || p.architectureImg || "";
  const roles = p.roles ?? [];

  return (
    <article className="group rounded-3xl overflow-hidden ring-1 ring-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition">
      <Link to={`/projects/${p.slug}`} className="block relative">
        {thumb ? (
          <img
            src={thumb}
            alt={title}
            className="w-full h-56 md:h-64 xl:h-72 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-56 md:h-64 xl:h-72 bg-gradient-to-br from-zinc-800/60 to-zinc-900/80" />
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 md:p-6">
          <h3 className="text-white font-semibold text-base md:text-lg line-clamp-1">
            {title}
          </h3>

          {!!roles.length && (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {roles.slice(0, 3).map((r) => (
                <span
                  key={r}
                  className="text-[10px] md:text-[11px] px-2 py-0.5 rounded-full bg-white/15 text-white/85"
                >
                  {r}
                </span>
              ))}
            </div>
          )}

          {(p.period || p.teamSize) && (
            <p className="mt-1.5 text-xs md:text-sm text-white/70">
              {p.period ? `기간 · ${p.period}` : ""}
              {p.period && p.teamSize ? " · " : ""}
              {p.teamSize ? `인원 ${p.teamSize}명` : ""}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}

export default function Projects() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-24">
        <header className="mb-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1.5 rounded bg-red-600" />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Projects
            </h1>
          </div>
          <p className="mt-2 text-white/60 text-sm">
            진행/완료한 프로젝트 목록입니다. 카드를 클릭하면 상세 페이지로 이동합니다.
          </p>
        </header>

        {!PROJECTS?.length ? (
          <div className="text-white/60">등록된 프로젝트가 없습니다.</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.slug} p={p as AnyProject} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
