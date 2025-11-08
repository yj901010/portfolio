import React from "react";
import { CERTS } from "../assets/certs";
import type { CertCategory, CertTag, Certificate } from "../types/cert";
import CertificateCard from "../components/CertificateCard";
import MediaLightbox from "../components/MediaLightbox";

type ChipKey = "all" | CertCategory | CertTag;

const CHIPS: Array<{ key: ChipKey; label: string }> = [
  { key: "all", label: "전체" },
  { key: "license", label: "자격증" },
  { key: "course", label: "수료·교육" },
  { key: "hackathon", label: "해커톤" },
  { key: "award", label: "수상" },
];

export default function Certifications() {
  const [active, setActive] = React.useState<ChipKey>("all");
  const [preview, setPreview] = React.useState<Certificate | null>(null);

  const list = React.useMemo(() => {
    if (active === "all") return CERTS;
    if (active === "license" || active === "course") {
      return CERTS.filter((c) => c.category === active);
    }
    return CERTS.filter((c) => c.tags?.includes(active as CertTag));
  }, [active]);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-4 pt-24 md:pt-32 lg:pt-36">
        <div className="mt-2 md:mt-4 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={[
                "px-3 py-1.5 text-sm rounded-full",
                active === c.key ? "bg-white text-black" : "bg-white/10 hover:bg-white/15",
              ].join(" ")}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        {list.length === 0 ? (
          <p className="mt-10 text-white/60">표시할 항목이 없습니다.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map((c) => (
              <CertificateCard key={c.id} c={c} onPreview={setPreview} />
            ))}
          </div>
        )}
      </section>

      {preview?.previewUrl && (
        <MediaLightbox
          src={preview.previewUrl}
          alt={preview.title}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
}