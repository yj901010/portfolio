import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import type { ProjectDetailData } from "../types/project";
import { getArtwork } from "../assets/catalog";

export default function ProjectCard({
  p,
  onPreview,
}: {
  p: ProjectDetailData;
  onPreview?: (id: string) => void;
}) {
  const art = getArtwork(p);
  return (
    <article className="nf-project-card">
      <div className="nf-project-card-image">
        <Link
          to={`/projects/${p.slug}`}
          aria-label={`${art.title} 프로젝트 보기`}
        >
          <img
            src={art.image}
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = p.thumb ?? "";
            }}
          />
          <span className="nf-tile-shade" />
          <span className="nf-tile-mark" aria-hidden="true">
            M
          </span>
          <span className={`nf-tile-title nf-title-${p.slug}`}>
            {art.title}
          </span>
        </Link>
      </div>
      <div className="nf-project-card-bottom">
        <div>
          <h2>{art.title}</h2>
          <p>{p.techChips.slice(0, 3).join(" · ")}</p>
        </div>
        <div className="nf-project-card-actions">
          {onPreview && (
            <button
              className="nf-round"
              aria-label={`${art.title} 상세 정보`}
              onClick={() => onPreview(p.slug)}
            >
              <ChevronDown size={22} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
