import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronRight, X } from "lucide-react";
import { TIMELINE, type TimelineItem } from "../assets/timelineData";
import "../styles/experience.css";

function References({ item }: { item: TimelineItem }) {
  if (!item.references?.length) return null;
  return (
    <div className="nf-career-links">
      {item.references.map((reference) => (
        <a key={reference.url} href={reference.url} target="_blank" rel="noopener noreferrer">
          {reference.label} <ArrowUpRight size={14} aria-hidden="true" />
          <span className="nf-sr-only"> (새 탭)</span>
        </a>
      ))}
    </div>
  );
}

function Highlights({ item }: { item: TimelineItem }) {
  return (
    <>
      {item.highlights && (
        <dl className="nf-career-highlights">
          {item.highlights.map((highlight) => (
            <div key={highlight.label}>
              <dt>{highlight.label}</dt>
              <dd>{highlight.description}</dd>
            </div>
          ))}
        </dl>
      )}
      {item.bullets && (
        <ul className="nf-career-bullets">
          {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      )}
    </>
  );
}

function Detail({ item, onClose }: { item: TimelineItem; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const restoreFrame = useRef<number | undefined>(undefined);
  const study = item.caseStudy;

  useEffect(() => {
    if (restoreFrame.current !== undefined) cancelAnimationFrame(restoreFrame.current);
    const element = dialog.current;
    if (!element) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    const scrollTop = window.scrollY;
    const pathname = window.location.pathname;
    element.showModal();
    heading.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      // Restore after the browser finishes its history/hash scroll restoration.
      restoreFrame.current = requestAnimationFrame(() => {
        if (window.location.pathname !== pathname) return;
        window.scrollTo({ top: scrollTop, behavior: "instant" });
        if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true });
      });
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="nf-career-dialog"
      aria-labelledby="experience-detail-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="nf-career-dialog-inner">
        <button className="nf-career-close" onClick={onClose} aria-label="경력 상세 닫기">
          <X size={22} aria-hidden="true" />
        </button>
        <p className="nf-career-eyebrow">{item.project || item.title} <span> / </span> {study ? "문제 해결 기록" : "경험 상세"}</p>
        <h2 id="experience-detail-title" ref={heading} tabIndex={-1}>{study?.title || item.title}</h2>
        <p className="nf-career-dialog-meta">{item.title} · {item.period}</p>
        <p className="nf-career-dialog-intro">{study?.summary || item.summary}</p>
        {study ? (
          <>
            <dl className="nf-career-case-sections">
              {study.sections.map((section, index) => (
                <div key={section.label}>
                  <dt><span aria-hidden="true">0{index + 1}</span>{section.label}</dt>
                  <dd>{section.description}</dd>
                </div>
              ))}
            </dl>
            <div className="nf-career-flow">
              <p>변경한 실행 흐름</p>
              <ol>
                {study.flow.map((step, index) => (
                  <li key={step}>
                    {index > 0 && <ArrowRight size={15} aria-hidden="true" />}
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <a className="nf-career-article" href={study.reference.url} target="_blank" rel="noopener noreferrer">
              {study.reference.label} <ArrowUpRight size={17} aria-hidden="true" />
              <span className="nf-sr-only"> (새 탭)</span>
            </a>
          </>
        ) : (
          <><Highlights item={item} /><References item={item} /></>
        )}
      </div>
    </dialog>
  );
}

function WorkEntry({ item, index, onOpen }: { item: TimelineItem; index: number; onOpen: (id: string) => void }) {
  return (
    <article className="nf-career-work" aria-labelledby={`career-${item.id}`}>
      <header className="nf-career-company">
        <div className="nf-career-company-top">
          <span className="nf-career-index" aria-hidden="true">0{index + 1}</span>
          {item.current && <span className="nf-career-current">현재 재직 중</span>}
        </div>
        <h3 id={`career-${item.id}`}>{item.title}</h3>
        <p className="nf-career-role">{item.subtitle}</p>
        <p className="nf-career-period">{item.period}</p>
      </header>
      <div className="nf-career-work-body">
        <h4 className="nf-career-project">{item.project}</h4>
        <p className="nf-career-summary">{item.summary}</p>
        {item.context && <p className="nf-career-recognition">{item.context}</p>}
        <Highlights item={item} />
        {item.technologies && <p className="nf-career-tech"><span className="nf-sr-only">사용 기술: </span>{item.technologies.join(" · ")}</p>}
        {item.caseStudy && (
          <button className="nf-career-case-button" onClick={() => onOpen(item.id)} aria-haspopup="dialog">
            <span>
              <span className="nf-career-case-label">문제 해결 기록</span>
              <strong>Cloud Run 비동기 처리</strong>
              <span className="nf-career-case-caption">CPU throttling을 확인하고 Cloud Tasks로 전환한 이유</span>
            </span>
            <ChevronRight size={23} aria-hidden="true" />
          </button>
        )}
        <References item={item} />
      </div>
    </article>
  );
}

function RecordEntry({ item }: { item: TimelineItem }) {
  return (
    <article className="nf-career-record" aria-labelledby={`career-${item.id}`}>
      <p className="nf-career-period">{item.period}</p>
      <div>
        <p className="nf-career-record-label">{item.subtitle}</p>
        <h3 id={`career-${item.id}`}>{item.title}</h3>
        <p className="nf-career-summary">{item.summary}</p>
        <Highlights item={item} />
        {item.relatedProjects && (
          <div className="nf-career-links">
            {item.relatedProjects.map((project) => (
              <Link key={project.path} to={project.path}>
                {project.label}<ArrowRight size={14} aria-hidden="true" />
                <span className="nf-sr-only"> 프로젝트 보기</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function ExperienceTimeline() {
  const { search, hash } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const openItem = TIMELINE.find((item) => item.id === params.get("exp"));
  const work = TIMELINE.filter((item) => item.category === "WORK");
  const education = TIMELINE.filter((item) => item.category === "EDU" || item.category === "PROJECT");
  const previous = TIMELINE.filter((item) => item.category === "NONDEV");

  const onOpen = (id: string) => {
    const next = new URLSearchParams(params);
    next.set("exp", id);
    navigate({ search: next.toString(), hash }, { preventScrollReset: true });
  };
  const onClose = () => {
    const next = new URLSearchParams(params);
    next.delete("exp");
    navigate({ search: next.toString(), hash }, { replace: true, preventScrollReset: true });
  };

  return (
    <div className="nf-career-page">
      <header className="nf-career-header">
        <p className="nf-career-eyebrow">BACKEND · DATA · INFRASTRUCTURE</p>
        <h1>경험과 경력</h1>
        <p>API 구현부터 데이터 수집·연동, 서비스가 실행되는 인프라까지.<br />프로젝트 안에서 직접 맡아온 일들을 정리했습니다.</p>
      </header>

      <nav className="nf-career-jump" aria-label="경험·경력 목차">
        <a href="#career-work">실무 경력 <span>{work.length}</span></a>
        <a href="#career-education">교육·프로젝트 <span>{education.length}</span></a>
        <a href="#career-previous">이전 경험 <span>{previous.length}</span></a>
      </nav>

      <section className="nf-career-section" id="career-work" aria-labelledby="career-work-title">
        <header className="nf-career-section-heading">
          <h2 id="career-work-title">실무 경력</h2><p>함께 만든 서비스와 담당 업무</p>
        </header>
        {work.map((item, index) => <WorkEntry key={item.id} item={item} index={index} onOpen={onOpen} />)}
      </section>

      <section className="nf-career-section" id="career-education" aria-labelledby="career-education-title">
        <header className="nf-career-section-heading">
          <h2 id="career-education-title">교육·프로젝트</h2><p>개발의 기반을 쌓은 과정</p>
        </header>
        {education.map((item) => <RecordEntry key={item.id} item={item} />)}
      </section>

      <section className="nf-career-section" id="career-previous" aria-labelledby="career-previous-title">
        <header className="nf-career-section-heading">
          <h2 id="career-previous-title">이전 경험</h2><p>콘텐츠 현장에서의 업무 경험</p>
        </header>
        {previous.map((item) => <RecordEntry key={item.id} item={item} />)}
      </section>

      <div className="nf-career-next">
        <p>직접 만든 서비스가 더 궁금하다면</p>
        <Link to="/projects">프로젝트 둘러보기 <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
      {openItem && <Detail key={openItem.id} item={openItem} onClose={onClose} />}
    </div>
  );
}
