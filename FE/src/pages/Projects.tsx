import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { CATALOG, PROJECT_GROUPS } from "../assets/catalog";
import ProjectCard from "../components/ProjectCard";
import ProjectPreview from "../components/ProjectPreview";

export default function Projects() {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);
  const isSearch = pathname === "/search";
  const query = params.get("q")?.trim() ?? "";
  const items = CATALOG.filter((p) =>
    !isSearch || `${p.name} ${p.summary} ${p.overview} ${p.organization} ${p.category === "work" ? "회사 실무" : "SSAFY"} ${p.roles.join(" ")} ${p.techChips.join(" ")}`
      .toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  const title = isSearch ? query ? `“${query}” 검색 결과` : "프로젝트 검색" : "프로젝트";
  const project = CATALOG.find((p) => p.slug === selected);

  return (
    <div className="nf-projects-page">
      <header className="nf-projects-heading">
        <h1>{title}</h1>
        <p>{items.length}개의 프로젝트</p>
      </header>
      {items.length ? isSearch ? (
        <div className="nf-project-grid">
          {items.map((p) => <ProjectCard key={p.slug} p={p} onPreview={setSelected} />)}
        </div>
      ) : (
        <div className="nf-project-groups">
          {PROJECT_GROUPS.map((group) => (
            <section key={group.id} className={`nf-project-group nf-project-group-${group.id}`} aria-labelledby={`projects-${group.id}`}>
              <header className="nf-project-group-heading">
                <div>
                  <h2 id={`projects-${group.id}`}>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
                <span>{group.items.length}개 · 최신순</span>
              </header>
              <div className="nf-project-grid">
                {group.items.map((p) => <ProjectCard key={p.slug} p={p} headingLevel={3} onPreview={setSelected} />)}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="nf-empty">
          <h2>검색 결과가 없어요.</h2>
          <p>프로젝트 이름이나 Spring, Kafka 같은 기술 이름으로 검색해 보세요.</p>
          <Link className="nf-button nf-button-light" to="/projects">프로젝트 둘러보기</Link>
        </div>
      )}
      {project && <ProjectPreview key={project.slug} project={project} onClose={() => setSelected(null)} />}
    </div>
  );
}
