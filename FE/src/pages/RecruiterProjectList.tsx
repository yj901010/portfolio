import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { RECRUITER_PROJECTS, caseLink } from "../assets/recruiterData";

export function ProjectRows({ category, query = "" }: { category?: "work" | "ssafy"; query?: string }) {
  const matches = RECRUITER_PROJECTS.filter(({ project, brief }) =>
    (!category || project.category === category) &&
    `${project.name} ${project.organization} ${project.overview} ${brief.focus} ${project.techChips.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="project-rows">
    {matches.map(({ project, story, brief }) => <article className="project-row" key={project.slug}>
      <Link className="project-cover-link" to={`/projects/${project.slug}`} aria-label={`${story.title} 프로젝트 상세`}>
        <img src={story.image} alt="" loading="lazy" decoding="async" style={{ objectPosition: story.imagePosition }} />
        <span>{project.organization}</span>
      </Link>
      <div className="project-row-content">
        <div className="project-title-line"><h3><Link to={`/projects/${project.slug}`}>{story.title}<ArrowUpRight size={19} /></Link></h3>
          <span className="project-period">{project.period.replace(" (참여 기간)", "")}</span></div>
        <p className="project-focus">{brief.focus}</p>
        <p className="service-description">{project.overview}</p>
        <p className="contribution-copy"><strong>담당</strong>{brief.contribution}</p>
        <p className="project-tech">{brief.tech.join(" · ")}</p>
        <div className="case-links" aria-label={`${story.title} 구현 사례`}>
          {brief.cases.map(id => {
            const item = story.cases.find(c => c.id === id);
            return item ? <Link key={id} to={caseLink(project.slug,id)}>{item.label}<ArrowUpRight size={12} /></Link> : null;
          })}
        </div>
      </div>
    </article>)}
    {!matches.length && <div className="empty-state"><h2>검색 결과가 없습니다.</h2><p>프로젝트 이름이나 기술명으로 다시 찾아보세요.</p><Link to="/projects">전체 프로젝트 보기 <ArrowRight size={15} /></Link></div>}
  </div>;
}

export default function RecruiterProjectList() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  useEffect(() => { document.title = "프로젝트 | 이영재"; }, []);
  return <div className="content-width projects-page">
    <Link className="back-link" to="/#projects">← 포트폴리오</Link>
    <header className="page-heading"><p className="eyebrow">PROJECTS</p><h1>프로젝트</h1><p>회사 실무와 팀 프로젝트에서 맡은 역할, 구현 방식과 선택의 이유.</p></header>
    <form className="project-search" role="search" onSubmit={event => event.preventDefault()}>
      <label htmlFor="project-query">프로젝트·기술 검색</label>
      <input id="project-query" type="search" placeholder="예: Cloud Tasks, Kafka, 계약서" value={query}
        onChange={event => setParams(event.target.value ? { q:event.target.value } : {}, { replace:true })} />
    </form>
    {query ? <ProjectRows query={query.trim()} /> : <>
      <h2 className="group-heading">회사 프로젝트 <span>실무</span></h2><ProjectRows category="work" />
      <h2 className="group-heading">SSAFY 프로젝트 <span>6인 팀 프로젝트</span></h2><ProjectRows category="ssafy" />
    </>}
  </div>;
}
