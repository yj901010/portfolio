import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import type { ProjectDetailData } from "../types/project";
import { getArtwork } from "../assets/catalog";

export default function ProjectPreview({
  project,
  onClose,
}: {
  project: ProjectDetailData;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const art = getArtwork(project);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="nf-preview"
      aria-label={`${art.title} 상세 정보`}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="nf-preview-inner">
        <button
          className="nf-preview-close nf-round"
          aria-label="상세 정보 닫기"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className="nf-preview-cover">
          <img
            src={art.image}
            alt=""
            style={{ objectPosition: art.imagePosition }}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = project.thumb ?? "";
            }}
          />
          <div className="nf-preview-cover-shade" />
          <div className="nf-preview-cover-copy">
            <span className="nf-original">
              <span>M</span> ORIGINAL PROJECT
            </span>
            <h2>{art.title}</h2>
            <div className="nf-hero-actions">
              <Link
                className="nf-button nf-button-light"
                to={`/projects/${project.slug}`}
                onClick={onClose}
              >
                <Play fill="currentColor" size={21} />
                프로젝트 보기
              </Link>
            </div>
          </div>
        </div>
        <div className="nf-preview-body">
          <div>
            <p className="nf-preview-meta">
              {project.period} <span>{project.category === "work" ? "회사 프로젝트" : "SSAFY 프로젝트"}</span>
            </p>
            <h3>{art.subtitle}</h3>
            <p>{project.overview}</p>
          </div>
          <aside>
            <p>
              <span>기술: </span>
              {project.techChips.join(", ")}
            </p>
            <p><span>소속: </span>{project.organization}</p>
            {project.teamComposition && <p><span>팀 구성: </span>{project.teamComposition}</p>}
            <p>
              <span>담당: </span>
              {project.roles.join(", ")}
            </p>
          </aside>
        </div>
        <section className="nf-preview-story">
          <h3>{project.ongoing ? "담당 업무" : "프로젝트의 시작"}</h3>
          {project.ongoing ? (
            <ul className="nf-preview-responsibilities">
              {project.contributions.flatMap((contribution) => contribution.items).map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : <p>{project.problem}</p>}
          <Link to={`/projects/${project.slug}`} onClick={onClose}>
            설계와 개발 과정 전체 보기 →
          </Link>
        </section>
      </div>
    </dialog>
  );
}
