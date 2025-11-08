import type { Certificate, CertTag } from "../types/cert";

function ExternalIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
      <path d="M21 14v7h-7" />
      <path d="M3 10v11h11" />
    </svg>
  );
}

function CategoryIcon({ cat, tags }: { cat: Certificate["category"]; tags?: CertTag[] }) {
  const t = tags?.includes("hackathon") ? "hackathon" : tags?.includes("award") ? "award" : null;

  const wrap = "inline-grid place-items-center h-7 w-7 rounded-md";

  if (t === "hackathon") {
    return (
      <div className={`${wrap} bg-violet-600/20 text-violet-300`} title="해커톤">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M8 7l-5 5 5 5v-3h5v-4H8V7zM16 7h-2v10h2l5-5-5-5z" />
        </svg>
      </div>
    );
  }
  if (t === "award") {
    return (
      <div className={`${wrap} bg-yellow-500/20 text-yellow-300`} title="수상">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M17 3H7v6a5 5 0 105 5 5 5 0 005-5V3z" />
          <path d="M8 21l4-2 4 2" />
        </svg>
      </div>
    );
  }
  if (cat === "license") {
    return (
      <div className={`${wrap} bg-amber-500/20 text-amber-300`} title="자격증">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8l3-6z" />
        </svg>
      </div>
    );
  }
  // course
  return (
    <div className={`${wrap} bg-sky-500/20 text-sky-300`} title="수료·교육">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      </svg>
    </div>
  );
}

function CategoryBadge({ cat }: { cat: Certificate["category"] }) {
  const cx = cat === "license" ? "bg-emerald-600/20 text-emerald-300" : "bg-indigo-600/20 text-indigo-300";
  return <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-medium ${cx}`}>{cat === "license" ? "자격증" : "수료·교육"}</span>;
}

export default function CertificateCard({
  c,
  onPreview,
}: {
  c: Certificate;
  onPreview?: (c: Certificate) => void;
}) {
  const date = new Date(c.issueDate).toLocaleDateString();

  return (
    <article
      className="
        group relative rounded-xl bg-white/5 transition
        hover:shadow-[0_10px_30px_rgba(229,9,20,0.25)]
      "
    >
      <div className="pointer-events-none absolute inset-x-2 bottom-1 h-[2px] bg-gradient-to-r from-red-500/0 via-red-500/60 to-red-500/0 blur-[2px] opacity-0 group-hover:opacity-100 transition" />

      <div className="p-4">
        <div className="flex items-start gap-3">
          <CategoryIcon cat={c.category} tags={c.tags} />

          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2">
              <h3 className="text-white font-semibold leading-tight line-clamp-2">{c.title}</h3>
              <CategoryBadge cat={c.category} />
            </div>
            <p className="mt-1 text-white/70 text-sm line-clamp-1">{c.issuer}</p>
            <p className="mt-0.5 text-white/50 text-xs">Issued {date}</p>
            {c.credentialId && <p className="mt-0.5 text-white/45 text-[11px]">ID: {c.credentialId}</p>}
          </div>

          <button
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 hover:bg-white/10"
            title={c.previewUrl ? "미리보기" : "검증 링크"}
            onClick={(e) => {
              const openNewTab = () => c.verifyUrl && window.open(c.verifyUrl, "_blank", "noopener,noreferrer");
              if ((e.metaKey || e.ctrlKey)) return openNewTab();
              if (c.previewUrl) onPreview?.(c);
              else openNewTab();
            }}
            aria-label="미리보기/검증"
          >
            <ExternalIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
