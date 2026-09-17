import { Fragment, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATALOG } from "../assets/catalog";
import { PROJECT_STORIES } from "../assets/projectStories";
import type { ProjectDetailData } from "../types/project";
import type { DiagramBlock, ImplementationStory, ProjectStory } from "../types/projectStory";
import "../styles/project-story.css";

function stepIds(blocks: DiagramBlock[]): number[] {
  return blocks.flatMap((block) => {
    if (block.type === "node") return block.step === undefined ? [] : [block.step];
    return "items" in block ? stepIds(block.items) : [];
  });
}

type DiagramProps = {
  block: DiagramBlock;
  selected: number;
  onSelect: (step: number) => void;
  explanationId: string;
};

function Diagram({ block, selected, onSelect, explanationId }: DiagramProps) {
  const child = (item: DiagramBlock, index: number) => (
    <Diagram key={index} block={item} selected={selected} onSelect={onSelect} explanationId={explanationId} />
  );
  switch (block.type) {
    case "node": {
      const step = block.step;
      const contents = <>
        <span className="ps-node-title">
          {step !== undefined && <span className="ps-node-number">{String(step + 1).padStart(2, "0")} </span>}
          {block.title}
        </span>
        {block.detail && <span className="ps-node-detail">{block.detail}</span>}
      </>;
      return step === undefined ? <div className="ps-node">{contents}</div> : (
        <button type="button" className="ps-node ps-node-selectable" aria-pressed={selected === step}
          aria-controls={explanationId} onClick={() => onSelect(step)}>
          {contents}
        </button>
      );
    }
    case "flow":
      return <div className="ps-flow">
        {block.items.map((item, index) => <Fragment key={index}>
          {index > 0 && <span className={`ps-edge${block.labels?.[index - 1] ? " ps-edge-labeled" : ""}`}>
            {block.labels?.[index - 1] && <span>{block.labels[index - 1]}</span>}
            <span className="ps-edge-arrow" aria-hidden="true">→</span>
          </span>}
          <div className="ps-flow-item">{child(item, index)}</div>
        </Fragment>)}
      </div>;
    case "stack":
    case "split":
      return <div className={`ps-${block.type}`}>{block.items.map(child)}</div>;
    case "group":
      return <section className="ps-diagram-group" aria-label={block.title}>
        <p className="ps-diagram-label">{block.title}</p>
        {block.items.map(child)}
      </section>;
    case "label":
      return <p className="ps-diagram-label">{block.text}</p>;
    case "note":
      return <p className="ps-diagram-note">{block.text}</p>;
  }
}

function StoryCase({ story, number }: { story: ImplementationStory; number: number }) {
  const [viewIndex, setViewIndex] = useState(story.defaultView);
  const [selected, setSelected] = useState(() => stepIds(story.views[story.defaultView].blocks)[0] ?? 0);
  const explanationId = useId();
  const view = story.views[viewIndex];
  const hasSteps = stepIds(view.blocks).length > 0;
  const step = (view.steps ?? story.steps)[selected];

  return <>
    <header className="ps-case-heading">
      <span className="ps-case-number" aria-hidden="true">{String(number).padStart(2, "0")}</span>
      <div><h2>{story.title}</h2><p>{story.context}</p></div>
    </header>
    <div className="ps-view-options" role="group" aria-label="구현 흐름 선택">
      {story.views.map((option, index) => <button type="button" key={option.title} aria-pressed={index === viewIndex}
        onClick={() => { setViewIndex(index); setSelected(stepIds(option.blocks)[0] ?? 0); }}>
        {option.title}
      </button>)}
      {hasSteps && <span>항목을 선택하면 설명이 이어집니다</span>}
    </div>
    <div className="ps-diagram" aria-label={`${story.label} — ${view.title}`}>
      {hasSteps && <p className="ps-legend"><span /> 담당한 구현</p>}
      {view.blocks.map((block, index) => <Diagram key={index} block={block} selected={selected} onSelect={setSelected} explanationId={explanationId} />)}
    </div>
    <div id={explanationId} className="ps-explanation" aria-live="polite" aria-atomic="true">
      <span className="ps-explain-number" aria-hidden="true">{hasSteps ? String(selected + 1).padStart(2, "0") : "!"}</span>
      <div>
        <h3>{hasSteps ? step.title : view.title}</h3>
        <p>{hasSteps ? step.text : story.context}</p>
      </div>
    </div>
    <div className="ps-outcome"><span>구현 결과</span><p>{story.outcome}</p></div>
  </>;
}

export default function ProjectStoryDetail({ project, story }: { project: ProjectDetailData; story: ProjectStory }) {
  const navigate = useNavigate();
  const [caseIndex, setCaseIndex] = useState(0);
  const current = story.cases[caseIndex];

  return <article className="project-story">
    <nav className="ps-project-nav" aria-label="프로젝트 이동">
      <Link to="/projects">← 프로젝트 목록</Link>
      <label><span className="nf-sr-only">프로젝트 선택</span>
        <select value={project.slug} onChange={(event) => navigate(`/projects/${event.target.value}`)}>
          {CATALOG.filter((item) => PROJECT_STORIES[item.slug]).map((item) => (
            <option key={item.slug} value={item.slug}>{PROJECT_STORIES[item.slug]!.title}</option>
          ))}
        </select>
      </label>
    </nav>
    <header className="ps-banner">
      <img src={story.image} alt="" className="ps-cover" fetchPriority="high" decoding="async"
        onError={(event) => { event.currentTarget.hidden = true; }} />
      <div className="ps-banner-shade" />
      <div className="ps-banner-copy">
        <p className="ps-meta">{project.organization} · {project.period} · {project.teamSize}인 팀 프로젝트</p>
        <h1>{story.title}</h1>
        <p className="ps-description">{story.description}</p>
      </div>
    </header>
    <div className="ps-content">
      <section className="ps-responsibility" aria-labelledby="project-responsibility">
        <h2 id="project-responsibility">담당 업무</h2>
        <div><p>{story.responsibility}</p><p className="ps-technologies">{story.technologies.join(" · ")}</p></div>
      </section>
      <dl className="ps-contributions" aria-label="주요 기여">
        {story.contributions.map((contribution) => <div key={contribution.title}>
          <dt>{contribution.title}</dt><dd>{contribution.text}</dd>
        </div>)}
      </dl>
      <section className="ps-stories" aria-label="구현 이야기">
        <label className="ps-case-picker">구현 이야기
          <select aria-label="구현 사례 선택" value={caseIndex} onChange={(event) => setCaseIndex(Number(event.target.value))}>
            {story.cases.map((item, index) => <option key={item.id} value={index}>{String(index + 1).padStart(2, "0")} · {item.label}</option>)}
          </select>
        </label>
        <StoryCase key={current.id} story={current} number={caseIndex + 1} />
      </section>
      <footer className="ps-footer">
        <span>이영재 · Backend Developer</span>
        <a href={story.repository} target="_blank" rel="noopener noreferrer">GitHub 저장소 ↗<span className="nf-sr-only"> (새 탭)</span></a>
      </footer>
    </div>
  </article>;
}
