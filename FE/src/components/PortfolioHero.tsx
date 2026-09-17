import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Info, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { getArtwork } from "../assets/catalog";
import type { ProjectDetailData } from "../types/project";
import "../styles/portfolio-hero.css";

const ROTATION_MS = 8000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export default function PortfolioHero({
  projects,
  onMore,
  previewOpen = false,
}: {
  projects: ProjectDetailData[];
  onMore: (slug: string) => void;
  previewOpen?: boolean;
}) {
  const billboard = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(() => !window.matchMedia(REDUCED_MOTION).matches);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(() => !document.hidden);
  const [inView, setInView] = useState(true);
  const count = projects.length;
  const activeIndex = count ? index % count : 0;
  const project = projects[activeIndex];
  const art = project ? getArtwork(project) : null;

  useEffect(() => {
    const motion = window.matchMedia(REDUCED_MOTION);
    const onMotionChange = () => { if (motion.matches) setAutoPlay(false); };
    const onVisibilityChange = () => setVisible(!document.hidden);
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    if (billboard.current) observer.observe(billboard.current);
    return () => {
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (count < 2 || !autoPlay || hovered || !visible || !inView || previewOpen) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [index, count, autoPlay, hovered, visible, inView, previewOpen]);

  if (!project || !art) return null;

  function selectProject(nextIndex: number) {
    setAutoPlay(false);
    setIndex((nextIndex + count) % count);
  }

  return (
    <section ref={billboard} className="nf-billboard nf-project-billboard" aria-label="추천 프로젝트"
      aria-roledescription="캐러셀" data-project={project.slug}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest("[data-rotation-control]")) setAutoPlay(false);
      }}>
      <img key={project.slug} className="nf-billboard-image" src={art.heroImage ?? art.image} alt=""
        fetchPriority={activeIndex === 0 ? "high" : "auto"} decoding="async"
        style={{ objectPosition: art.heroPosition ?? art.imagePosition }}
        onError={(event) => {
          const image = event.currentTarget;
          if (project.thumb && image.getAttribute("src") !== project.thumb) image.src = project.thumb;
          else image.hidden = true;
        }} />
      <div className="nf-billboard-shade" />
      <div className="nf-billboard-copy" key={`copy-${project.slug}`}>
        <div className="nf-original"><span>M</span> ORIGINAL PROJECT</div>
        <h1 className={`nf-feature-title nf-feature-${project.slug}`}>{art.title}</h1>
        <p className="nf-feature-line">{art.subtitle}</p>
        <p className="nf-feature-description">{project.overview}</p>
        <div className="nf-hero-actions">
          <Link className="nf-button nf-button-light" to={`/projects/${project.slug}`}>
            <Play fill="currentColor" size={25} />프로젝트 보기
          </Link>
          <button className="nf-button nf-button-muted" onClick={() => onMore(project.slug)}>
            <Info size={25} />상세 정보
          </button>
        </div>
      </div>
      <span className="nf-billboard-category">{project.category === "work" ? "회사 프로젝트" : "SSAFY 프로젝트"} · {project.organization}</span>
      {count > 1 && <div className="nf-billboard-controls" role="group" aria-label="추천 프로젝트 전환">
        <div className="nf-billboard-toolbar">
          <span className="nf-billboard-count" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} <span>/ {String(count).padStart(2, "0")}</span></span>
          <button className="nf-billboard-control" aria-label="이전 추천 프로젝트" onClick={() => selectProject(activeIndex - 1)}><ChevronLeft size={20} /></button>
          <button className="nf-billboard-control" aria-label="다음 추천 프로젝트" onClick={() => selectProject(activeIndex + 1)}><ChevronRight size={20} /></button>
          <button className="nf-billboard-control" data-rotation-control aria-label={autoPlay ? "자동 전환 정지" : "자동 전환 시작"}
            onClick={() => setAutoPlay((current) => !current)}>
            {autoPlay ? <Pause size={17} /> : <Play size={17} />}
          </button>
        </div>
        <div className="nf-billboard-selectors" role="group" aria-label="프로젝트 바로 선택">
          {projects.map((item, itemIndex) => <button key={item.slug} aria-label={`${getArtwork(item).title} 표시`}
            title={getArtwork(item).title} aria-pressed={activeIndex === itemIndex}
            onClick={() => selectProject(itemIndex)}><span /></button>)}
        </div>
      </div>}
      <span className="nf-sr-only" aria-live={autoPlay ? "off" : "polite"} aria-atomic="true">
        {activeIndex + 1} / {count} · {art.title}
      </span>
    </section>
  );
}
