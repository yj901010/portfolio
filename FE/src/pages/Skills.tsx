import { useState } from "react";
import type { SkillCategory, SkillItem, Level } from "../assets/skillsData";
import { SKILLS } from "../assets/skillsData";

function LogoImage({
  srcs,
  alt,
  className,
}: {
  srcs: string[];
  alt: string;
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  const url = srcs[idx];
  if (!url) return null;

  const usingFallback = idx > 0;
  const tintStyle = usingFallback
    ? {
        filter:
          "brightness(0) saturate(100%) invert(12%) sepia(94%) saturate(6426%) hue-rotate(356deg) brightness(92%) contrast(95%)",
      }
    : undefined;

  return (
    <img
      src={url}
      alt={alt}
      onError={() => setIdx((i) => i + 1)}
      className={className}
      style={tintStyle}
      loading="lazy"
    />
  );
}

function LevelBadge({ level }: { level?: Level }) {
  if (!level) return null;
  const color =
    level === "Expert"
      ? "bg-red-600"
      : level === "Advanced"
      ? "bg-red-500"
      : level === "Proficient"
      ? "bg-emerald-600"
      : "bg-slate-600";
  return (
    <span className={`text-[10px] text-white ${color} px-2 py-0.5 rounded-full`}>
      {level}
    </span>
  );
}

function SkillCard({ s }: { s: SkillItem }) {
  const srcs = [s.logo, ...(s.logoFallbacks ?? [])].filter(Boolean) as string[];
  return (
    <div className="group relative">
      <div
        className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-200 blur-md"
        style={{ boxShadow: "0 14px 46px rgba(220,38,38,0.55)" }}
      />
      <div
        className="relative h-36 sm:h-40 md:h-44 rounded-2xl bg-neutral-900/80
                   shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]
                   transform-gpu will-change-transform transition-transform duration-200
                   group-hover:[transform:scaleX(1.04)]
                   p-2 flex items-center justify-center"
      >
        <div className="flex flex-col items-center text-center">
          <LogoImage srcs={srcs} alt={s.name} className="h-8 w-8 object-contain opacity-90" />

          <div className="mt-2 text-neutral-100 font-semibold text-[15px] leading-tight">
            {s.name}
          </div>

          <div className="mt-1">
            <LevelBadge level={s.level} />
          </div>

          {s.desc && (
            <div className="text-neutral-400 text-[11px] mt-2">{s.desc}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2
      className="
        relative w-fit mx-auto text-2xl md:text-3xl font-extrabold text-neutral-100 tracking-wide
        after:content-[''] after:block after:h-[3px] after:bg-red-600 after:rounded-full after:mt-2 after:w-full
      "
    >
      {children}
    </h2>
  );
}

export default function Skills() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1120px] mx-auto">
        {SKILLS.map((cat: SkillCategory, idx) => (
          <section id={cat.id} key={cat.id} className={idx === 0 ? "" : "mt-12 md:mt-16"}>
            <SectionTitle>{cat.title}</SectionTitle>
            <div
              className="mt-5 grid gap-2.5 md:gap-3.5"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
            >
              {cat.items.map((s) => (
                <SkillCard key={s.name} s={s} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
