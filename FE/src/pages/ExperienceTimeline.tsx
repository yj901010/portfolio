import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TIMELINE, type TimelineItem, type Category } from "../assets/timelineData";
import {
  Briefcase,
  GraduationCap,
  Code2,
  FileText,
  Star,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

const CAT: Record<
  Category,
  { label: string; dot: string; ring: string; glow: string }
> = {
  WORK: { label: "경력", dot: "bg-blue-500", ring: "ring-blue-500/40", glow: "before:bg-blue-500/20" },
  PROJECT: { label: "경험", dot: "bg-red-500", ring: "ring-red-500/40", glow: "before:bg-red-500/20" },
  EDU: { label: "교육", dot: "bg-green-500", ring: "ring-green-500/40", glow: "before:bg-green-500/20" },
  NONDEV: { label: "비개발", dot: "bg-gray-500", ring: "ring-gray-500/40", glow: "before:bg-gray-500/20" },
};

const CAT_ICON: Record<Category, LucideIcon> = {
  WORK: Briefcase,
  PROJECT: Code2,
  EDU: GraduationCap,
  NONDEV: FileText,
};

function Badge({ item }: { item: TimelineItem }) {
  const c = CAT[item.category];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium text-white ${c.dot}`}>
      {c.label}
    </span>
  );
}

function Node({ category }: { category: Category }) {
  const c = CAT[category];
  const Icon = CAT_ICON[category];
  return (
    <div className="hidden xl:block absolute inset-0 pointer-events-none">
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full ${c.dot} ring-4 ring-black/70 flex items-center justify-center z-10 shadow-[0_10px_30px_-5px_rgba(0,0,0,.5)]`}>
        <Icon size={18} className="text-white" />
      </div>
    </div>
  );
}

function CenterPeriod({ text, side }: { text: string; side: "left" | "right" }) {
  const base =
    "hidden xl:block absolute top-1/2 -translate-y-1/2 text-xs text-white/70 whitespace-nowrap";
  return side === "left" ? (
    <div className={`${base} left-11/21 translate-x-6`}>{text}</div>
  ) : (
    <div className={`${base} right-11/21 -translate-x-6 text-right`}>{text}</div>
  );
}

function Modal({ open, onClose, item }: { open: boolean; onClose: () => void; item?: TimelineItem }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative max-w-2xl w-full rounded-2xl bg-neutral-900 text-white ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <div className="h-1.5 w-full bg-white/10" />
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge item={item} />
                <span className="text-sm text-white/70">{item.period}</span>
              </div>
              <h3 className="text-xl font-bold mt-1">{item.title}</h3>
              {item.subtitle && <p className="text-white/70 text-sm mt-0.5">{item.subtitle}</p>}
            </div>
            <button onClick={onClose} className="rounded-full bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
              닫기
            </button>
          </div>
          {item.bullets && (
            <ul className="mt-4 space-y-2 text-sm leading-relaxed">
              {item.bullets.map((b, i) => (
                <li key={i}>• {b}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({
  item,
  ring,
  glow,
  side,
  onOpen,
}: {
  item: TimelineItem;
  ring: string;
  glow: string;
  side: "left" | "right";
  onOpen: (id: string) => void;
}) {
  return (
    <article
      className={`
        relative group w-full xl:w-[560px]
        rounded-2xl border border-neutral-800 p-4 sm:p-5
        bg-neutral-900/80 ring-1 ${ring}
        shadow-[inset_0_1px_0_rgba(255,255,255,.04)]
        transition-transform duration-300 ease-out will-change-transform
        ${side === "left" ? "origin-right" : "origin-left"} hover:scale-[1.02]
      `}
    >
      <div
        className={`pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-[18px] transition-opacity duration-300 ${glow} group-hover:opacity-100`}
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <Badge item={item} />
          <span className="xl:hidden text-xs sm:text-sm text-white/70">{item.period}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mt-1">{item.title}</h3>
        {item.subtitle && <p className="text-white/70 text-sm">{item.subtitle}</p>}
        <p className="text-sm sm:text-base mt-2 text-white/85">{item.summary}</p>

        {item.bullets && item.bullets.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => onOpen(item.id)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs sm:text-sm font-medium hover:bg-white/20 hover:translate-x-0.5 transition"
            >
              자세히 보기 <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function ExperienceTimeline() {
  const [params, setParams] = useSearchParams();
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo(() => TIMELINE, []);
  const openItem = items.find((i) => i.id === openId);

  useEffect(() => {
    const fromQuery = params.get("exp");
    if (fromQuery) setOpenId(fromQuery);
  }, [params]);

  const onOpen = (id: string) => {
    setOpenId(id);
    const p = new URLSearchParams(params);
    p.set("exp", id);
    setParams(p, { replace: false });
  };
  const onClose = () => {
    setOpenId(null);
    const p = new URLSearchParams(params);
    p.delete("exp");
    setParams(p, { replace: true });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold">
          Work Experience & Education Timeline
        </h1>

        <div className="relative mt-10">
          <div className="hidden xl:block absolute left-1/2 top-0 -ml-px h-full w-px bg-white/10" />

          <ol className="space-y-24">
            {items.map((item, idx) => {
              const side: "left" | "right" = idx % 2 === 0 ? "left" : "right";
              const c = CAT[item.category];
              return (
                <li key={item.id} className="relative">
                  <Node category={item.category} />
                  <CenterPeriod text={item.period} side={side} />

                  <div className="grid grid-cols-1 xl:grid-cols-2 items-center">
                    {side === "left" ? (
                      <div className="xl:justify-self-end xl:mr-8">
                        <Card item={item} ring={c.ring} glow={c.glow} side="left" onOpen={onOpen} />
                      </div>
                    ) : (
                      <div className="xl:col-start-2 xl:justify-self-start xl:ml-8">
                        <Card item={item} ring={c.ring} glow={c.glow} side="right" onOpen={onOpen} />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="relative mt-24 h-20">
            <div className="absolute left-1/2 -translate-x-1/2 top-0">
              <div className="relative">
                <div className="absolute inset-0 blur-xl rounded-full bg-emerald-500/25" />
                <div className="relative h-12 w-12 rounded-full bg-emerald-500 ring-4 ring-black/70 flex items-center justify-center">
                  <Star size={20} className="text-white" />
                </div>
              </div>
              <div className="text-center text-xs text-white/70 mt-2">End of timeline</div>
            </div>
          </div>
        </div>
      </main>

      <Modal open={!!openId} onClose={onClose} item={openItem!} />
    </div>
  );
}
