import { Link } from "react-router-dom";
import type { Project } from "../assets/projects";

function TechBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-neutral-800/90 border border-white/10 px-2.5 py-1 text-[11px] text-white/85">
      {text}
    </span>
  );
}

export default function ProjectCard({ p }: { p: Project }) {
  const hasSlug = Boolean(p.slug);
  const detailPath = hasSlug ? `/projects/${encodeURIComponent(p.slug!)}` : "#";
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <article
      className={`
        group relative overflow-hidden rounded-2xl
        border border-neutral-800 bg-neutral-900/80
        shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
        hover:-translate-y-0.5 transition
        after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-8
        after:h-16 after:bg-[radial-gradient(ellipse_at_bottom,rgba(255,60,60,.35),transparent_60%)]
        after:opacity-0 group-hover:after:opacity-100 after:transition
      `}
    >
      {/* 썸네일 */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden">
        {p.cover ? (
          <img
            src={p.cover}
            alt={p.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-tr from-neutral-800 to-neutral-700" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.25),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/30" />
      </div>

      {/* 본문 */}
      <div className="relative p-5">
        <h3 className="text-lg font-bold text-[#ff4d4d]">{p.title}</h3>
        {p.period && <p className="mt-1 text-xs text-white/60">{p.period}</p>}
        <p className="mt-2 text-sm text-white/85">{p.summary}</p>

        {!!p.stack?.length && (
          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.slice(0, 6).map((s) => (
              <TechBadge key={s} text={s} />
            ))}
          </div>
        )}

        {/* 액션 */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {p.links?.github && (
            <a
              href={p.links.github}
              target="_blank"
              rel="noreferrer"
              onClick={stop}
              className="rounded-full bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
            >
              Play (GitHub)
            </a>
          )}

          <Link
            to={detailPath}
            onClick={(e) => {
              if (!hasSlug) e.preventDefault();
              stop(e);
            }}
            aria-disabled={!hasSlug}
            className={`rounded-full px-3 py-1.5 text-sm ${
              hasSlug
                ? "bg-white text-black hover:bg-white/90"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
          >
            More
          </Link>

        </div>
      </div>
    </article>
  );
}
