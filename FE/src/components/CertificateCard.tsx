import { ArrowUpRight, FileText } from "lucide-react";
import type { Certificate } from "../types/cert";

function date(value?: string) {
  return value ? value.slice(0, 7).replace("-", ".") : "";
}

export default function CertificateCard({
  c,
  index,
  onPreview,
}: {
  c: Certificate;
  index: number;
  onPreview: (c: Certificate) => void;
}) {
  const isCourse = c.category === "course";
  const dateLine =
    isCourse && c.startDate
      ? `${date(c.startDate)} — ${c.endDate ? date(c.endDate) : "진행 중"}`
      : date(c.issueDate);
  const dateLabel = isCourse
    ? "교육 기간"
    : c.category === "license"
      ? "취득"
      : "수상";
  return (
    <article className="nf-record">
      <span className="nf-record-number" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <div className="nf-record-content">
        <h3>{c.title}</h3>
        <p className="nf-record-issuer">{c.issuer}</p>
        {!!c.skills?.length && (
          <p className="nf-record-skills">
            <span className="nf-sr-only">관련 기술: </span>
            {c.skills.join(" · ")}
          </p>
        )}
        {c.expireDate && (
          <p className="nf-record-skills">
            유효기간: {c.expireDate.replaceAll("-", ".")}
          </p>
        )}
      </div>
      <div className="nf-record-date">
        <span>{dateLabel}</span>
        <p>{dateLine}</p>
      </div>
      {c.previewUrl ? (
        <button
          className="nf-record-open"
          aria-label={`${c.title} 증빙 보기`}
          onClick={() => onPreview(c)}
        >
          <FileText size={17} />
          <span>증빙 보기</span>
          <ArrowUpRight size={15} />
        </button>
      ) : (
        <span className="nf-record-no-file">첨부 없음</span>
      )}
    </article>
  );
}
