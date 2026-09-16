import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Row as RowData, Media } from "../types/media";
import { PROJECTS } from "../assets/projects";

function Tile({
  item,
  onSelect,
}: {
  item: Media;
  onSelect?: (id: string) => void;
}) {
  const project = PROJECTS.find((p) => p.slug === item.id);
  return (
    <article className="nf-tile">
      <div className="nf-tile-picture">
        <Link
          to={item.href ?? "/projects"}
          aria-label={`${item.title} 프로젝트 보기`}
        >
          <img
            src={item.thumb}
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              if (project?.thumb) event.currentTarget.src = project.thumb;
            }}
          />
          <span className="nf-tile-shade" />
          <span className="nf-tile-mark" aria-hidden="true">
            M
          </span>
          <span className={`nf-tile-title nf-title-${item.id}`}>
            {item.title}
          </span>
        </Link>
      </div>
      <div className="nf-tile-info">
        <div className="nf-tile-controls">
          <Link
            className="nf-round nf-round-play"
            aria-label={`${item.title} 프로젝트 보기`}
            to={item.href ?? "/projects"}
          >
            <Play size={18} fill="currentColor" />
          </Link>
          {project && onSelect && (
            <button
              className="nf-round nf-info-open"
              aria-label={`${item.title} 상세 정보`}
              onClick={() => onSelect(item.id)}
            >
              <ChevronDown size={23} />
            </button>
          )}
        </div>
        <p className="nf-tile-subtitle">{item.subtitle ?? "프로젝트 기록"}</p>
        <p className="nf-tile-tags">{item.tags?.slice(0, 3).join(" · ")}</p>
      </div>
    </article>
  );
}

export default function Row({
  row,
  onSelect,
}: {
  row: RowData;
  onSelect?: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft < 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [row.items.length]);
  const scroll = (direction: number) => {
    const el = ref.current;
    if (el)
      el.scrollBy({
        left: direction * el.clientWidth * 0.85,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <section className="nf-row" aria-labelledby={`row-${row.id}`}>
      <div className="nf-row-heading">
        <h2 id={`row-${row.id}`}>{row.title}</h2>
        <Link to="/projects">
          모두 보기 <ChevronRight size={15} />
        </Link>
      </div>
      <div className="nf-row-rail">
        <button
          className="nf-row-arrow previous"
          disabled={edges.start}
          aria-label={`${row.title} 이전`}
          onClick={() => scroll(-1)}
        >
          <ChevronLeft size={32} />
        </button>
        <div className="nf-row-track" ref={ref}>
          {row.items.map((item) => (
            <Tile key={item.id} item={item} onSelect={onSelect} />
          ))}
        </div>
        <button
          className="nf-row-arrow next"
          disabled={edges.end}
          aria-label={`${row.title} 다음`}
          onClick={() => scroll(1)}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  );
}
