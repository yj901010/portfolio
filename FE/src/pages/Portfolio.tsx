import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  Code2,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react";
import { getProfileById } from "../assets/profiles";
import { CATALOG, FEATURED_PROJECT, PROJECT_GROUPS, toMedia } from "../assets/catalog";
import PortfolioHero from "../components/PortfolioHero";
import ProjectPreview from "../components/ProjectPreview";
import Row from "../components/Row";

export default function Portfolio() {
  const { profileId = "leeyj" } = useParams();
  const [selected, setSelected] = useState<string | null>(null);
  const project = CATALOG.find((p) => p.slug === selected);
  if (!getProfileById(profileId)) return <Navigate to="/browse" replace />;
  return (
    <div className="nf-home">
      <PortfolioHero
        item={toMedia(FEATURED_PROJECT)}
        onMore={() => setSelected(FEATURED_PROJECT.slug)}
      />
      <div className="nf-home-rows">
        {PROJECT_GROUPS.map((group) => (
          <Row
            key={group.id}
            row={{ id: group.id, title: group.title, items: group.items.map(toMedia) }}
            onSelect={setSelected}
          />
        ))}
        <section className="nf-explore">
          <h2>개발자를 더 알아보는 방법</h2>
          <div>
            <Link to="/skills">
              <Code2 size={26} />
              <span>
                <strong>기술 스택</strong>
                <small>코드를 구성하는 도구들</small>
              </span>
              <ArrowUpRight size={20} />
            </Link>
            <Link to="/experience">
              <BriefcaseBusiness size={26} />
              <span>
                <strong>경험과 경력</strong>
                <small>지금까지 이어온 개발 이야기</small>
              </span>
              <ArrowUpRight size={20} />
            </Link>
            <Link to="/certs">
              <GraduationCap size={26} />
              <span>
                <strong>자격·수료·수상</strong>
                <small>배움과 성취의 기록</small>
              </span>
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </section>
      </div>
      {project && (
        <ProjectPreview project={project} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
