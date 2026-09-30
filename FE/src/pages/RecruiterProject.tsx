import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CATALOG } from "../assets/catalog";
import { PROJECT_STORIES } from "../assets/projectStories";
import ProjectStoryDetail from "../components/ProjectStoryDetail";

export function NotFound() {
  return <div className="content-width not-found"><p className="eyebrow">404</p><h1>페이지를 찾을 수 없습니다.</h1><p>아래에서 경력과 프로젝트를 확인할 수 있습니다.</p><Link to="/">포트폴리오로 돌아가기 →</Link></div>;
}

export default function RecruiterProject() {
  const { slug = "" } = useParams();
  const project = CATALOG.find(item => item.slug === slug);
  const story = PROJECT_STORIES[slug];
  useEffect(() => { document.title = story ? `${story.title} | 이영재` : "페이지를 찾을 수 없습니다 | 이영재"; }, [story]);
  return project && story ? <ProjectStoryDetail key={slug} project={project} story={story} /> : <NotFound />;
}
