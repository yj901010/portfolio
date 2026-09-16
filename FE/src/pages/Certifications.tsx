import { useState } from "react";
import { CERTS } from "../assets/certs";
import type { CertCategory, Certificate } from "../types/cert";
import CertificateCard from "../components/CertificateCard";
import MediaLightbox from "../components/MediaLightbox";

const GROUPS: { key: CertCategory; label: string; description: string }[] = [
  {
    key: "license",
    label: "자격증",
    description: "소프트웨어와 데이터에 관한 자격",
  },
  {
    key: "course",
    label: "교육·수료",
    description: "학습하고, 직접 만들어본 과정",
  },
  { key: "award", label: "수상", description: "프로젝트로 함께 이룬 성과" },
  {
    key: "hackathon",
    label: "해커톤",
    description: "제한된 시간 안에 도전한 기록",
  },
];
const groups = GROUPS.map((group) => ({
  ...group,
  items: CERTS.filter((c) => c.category === group.key).sort((a, b) =>
    b.issueDate.localeCompare(a.issueDate),
  ),
})).filter((group) => group.items.length);

export default function Certifications() {
  const [active, setActive] = useState<"all" | CertCategory>("all");
  const [preview, setPreview] = useState<Certificate | null>(null);
  const visible = groups.filter(
    (group) => active === "all" || group.key === active,
  );
  const count = visible.reduce((total, group) => total + group.items.length, 0);
  return (
    <div className="nf-records-page">
      <header className="nf-records-header">
        <p className="nf-records-eyebrow">이영재의 기록</p>
        <h1>자격·수료·수상</h1>
        <p>배운 것과 이룬 것, 그동안의 기록을 모았습니다.</p>
      </header>
      <div className="nf-records-filterbar">
        <div className="nf-records-filters" role="group" aria-label="기록 분류">
          <button
            aria-pressed={active === "all"}
            onClick={() => setActive("all")}
          >
            전체 <span>{CERTS.length}</span>
          </button>
          {groups.map((group) => (
            <button
              key={group.key}
              aria-pressed={active === group.key}
              onClick={() => setActive(group.key)}
            >
              {group.label} <span>{group.items.length}</span>
            </button>
          ))}
        </div>
        <span className="nf-records-count" role="status">
          {count}개의 기록
        </span>
      </div>
      <div className="nf-records-sections">
        {visible.map((group) => (
          <section
            key={group.key}
            className="nf-records-section"
            aria-labelledby={`records-${group.key}`}
          >
            <header>
              <h2 id={`records-${group.key}`}>{group.label}</h2>
              <p>{group.description}</p>
            </header>
            <ol>
              {group.items.map((c, index) => (
                <li key={c.id}>
                  <CertificateCard
                    c={c}
                    index={index + 1}
                    onPreview={setPreview}
                  />
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      {preview?.previewUrl && (
        <MediaLightbox
          key={preview.id}
          src={preview.previewUrl}
          previewImageSrc={preview.previewImageUrl}
          alt={preview.title}
          description={`${preview.issuer} · ${preview.category === "license" ? "취득" : preview.category === "course" ? "수료" : "수상"} ${preview.issueDate.replaceAll("-", ".")}`}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
}
