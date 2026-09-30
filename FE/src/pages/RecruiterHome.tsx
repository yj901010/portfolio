import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Mail, Printer } from "lucide-react";
import { TIMELINE } from "../assets/timelineData";
import { CERTS } from "../assets/certs";
import { PROFILE } from "../assets/constants";
import { LINKS } from "../assets/links";
import { SKILL_EVIDENCE, caseLink } from "../assets/recruiterData";
import { ProjectRows } from "./RecruiterProjectList";

function SectionHeading({ number, title, note }: { number: string; title: string; note?: string }) {
  return <header className="section-heading"><span className="section-number">{number}</span><div><h2>{title}</h2>{note && <p>{note}</p>}</div></header>;
}

export default function RecruiterHome() {
  useEffect(() => { document.title = "이영재 | 백엔드 개발자"; }, []);
  return <div className="content-width home-document">
    <section className="introduction" aria-labelledby="intro-title">
      <div className="intro-main">
        <p className="eyebrow">BACKEND · DATA PROCESSING</p>
        <h1 id="intro-title">이영재<span>백엔드 개발자</span></h1>
        <p className="intro-description">Spring Boot로 업무 API를 개발하고,<br className="desktop-break" /> 비동기 처리와 데이터 적재·집계를 서비스에 연결합니다.</p>
        <p className="intro-context">현재 아이티아이즈에서 임상시험 지원 플랫폼 K-HOPE의 백엔드를 개발하고 있습니다.</p>
        <div className="intro-links">
          <a href={`mailto:${PROFILE.email}`}><Mail size={16} />이메일</a>
          <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={14} /><span className="sr-only"> (새 탭)</span></a>
          <a href={LINKS.velogblog} target="_blank" rel="noreferrer">기술 블로그<ArrowUpRight size={14} /><span className="sr-only"> (새 탭)</span></a>
          <button className="text-button print-button" onClick={() => window.print()}><Printer size={15} />인쇄 / PDF 저장</button>
        </div>
      </div>
      <aside className="intro-aside" aria-label="주요 개발 경험">
        <img src={PROFILE.avatar} alt="이영재 프로필" width="88" height="104" />
        <div><span className="small-label">주요 개발 경험</span><p>업무 API · 비동기 연동<br />데이터 수집·적재·집계<br />클라우드 실행 환경</p></div>
      </aside>
    </section>

    <section id="experience" tabIndex={-1} className="document-section">
      <SectionHeading number="01" title="경력" note="최근 실무에서 맡은 역할과 개발 범위입니다." />
      <div className="section-body career-list">
        {TIMELINE.filter(item => item.category === "WORK").map(item => <article className="career-row" key={item.id}>
          <div className="career-meta"><p>{item.period}</p><h3>{item.title}</h3><span>{item.subtitle}</span>{item.current && <span className="current-status">재직 중</span>}</div>
          <div className="career-work"><h4>{item.project}</h4><p>{item.summary}</p>
            <ul>{(item.id === "iteyes" ? [item.highlights![0], item.highlights![4], item.highlights![2]] : item.highlights?.slice(0,3) ?? []).map(highlight => <li key={highlight.label}><strong>{highlight.label}</strong>{highlight.description}</li>)}</ul>
            {item.context && <p className="career-context"><a href={item.references?.[0]?.url} target="_blank" rel="noreferrer">{item.context} ↗<span className="sr-only"> (새 탭)</span></a></p>}
            <Link to={item.relatedProjects![0].path}>담당 업무와 구현 사례 <ArrowRight size={14} /></Link>
          </div>
        </article>)}
      </div>
    </section>

    <section id="projects" tabIndex={-1} className="document-section">
      <SectionHeading number="02" title="프로젝트" note="서비스의 목적과 제가 구현한 부분을 구분해 정리했습니다." />
      <div className="section-body">
        <h3 className="group-heading">회사 프로젝트 <span>실무</span></h3><ProjectRows category="work" />
        <h3 className="group-heading">SSAFY 프로젝트 <span>6인 팀 프로젝트</span></h3><ProjectRows category="ssafy" />
        <Link className="all-projects-link" to="/projects">전체 프로젝트 검색 <ArrowRight size={14} /></Link>
      </div>
    </section>

    <section id="skills" tabIndex={-1} className="document-section">
      <SectionHeading number="03" title="기술" note="프로젝트에서 사용한 기술과 구현 사례를 함께 연결했습니다." />
      <div className="section-body skill-evidence">
        {SKILL_EVIDENCE.map(item => <div className="skill-row" key={item.area}><h3>{item.area}</h3><div><strong>{item.technologies}</strong><p>{item.description}</p>
          <div className="case-links">{item.links.map(link => <Link key={link.label} to={caseLink(link.slug,link.caseId)}>{link.label}<ArrowUpRight size={12} /></Link>)}</div></div></div>)}
      </div>
    </section>

    <section id="records" tabIndex={-1} className="document-section">
      <SectionHeading number="04" title="학력·자격" note="교육, 자격과 수상 내역입니다. 증빙은 별도로 열어볼 수 있습니다." />
      <div className="section-body records-columns">
        <div><h3>학력·교육</h3>
          {["ssafy","gai","dongshin-degree"].map(id => {
            const item = TIMELINE.find(entry => entry.id === id)!;
            const proof = id === "ssafy" ? CERTS.find(c => c.id === "ssafy-course-2024") : id === "gai" ? CERTS.find(c => c.id === "gai-course-2023") : undefined;
            return <article className="record-entry" key={id}><time>{item.period}</time><h4>{item.title}</h4><p>{item.subtitle}</p>
              {proof?.previewUrl && <a href={proof.previewUrl} target="_blank" rel="noreferrer">수료 증빙 ↗<span className="sr-only"> (새 탭)</span></a>}
            </article>;
          })}
        </div>
        <div><h3>자격·수상</h3>
          {CERTS.filter(c => c.category === "license").concat(CERTS.filter(c => c.category === "award")).map(cert => <article className="record-entry record-proof" key={cert.id}>
            <div><time>{cert.issueDate.replaceAll("-", ".")}</time><h4>{cert.title}</h4><p>{cert.issuer}</p></div>
            {cert.previewUrl && <a href={cert.previewUrl} target="_blank" rel="noreferrer" aria-label={`${cert.title} 증빙 보기 (새 탭)`}>증빙 ↗</a>}
          </article>)}
        </div>
        <details className="earlier-experience"><summary>이전 경험 더 보기</summary>
          {TIMELINE.filter(item => item.category === "NONDEV" || item.id === "elin").map(item => <div key={item.id}><span>{item.period}</span><strong>{item.title} · {item.subtitle}</strong><p>{item.summary}</p></div>)}
        </details>
      </div>
    </section>

    <section id="contact" tabIndex={-1} className="document-section contact-section">
      <SectionHeading number="05" title="연락" />
      <div className="section-body"><h3>프로젝트와 채용 문의</h3><p>개발 경험이나 프로젝트에 관해 궁금한 점은 이메일로 연락 주세요.</p>
        <a className="email-link" href={`mailto:${PROFILE.email}`}>{PROFILE.email}<ArrowUpRight size={22} /></a>
        <div className="case-links"><a href={LINKS.github} target="_blank" rel="noreferrer">GitHub ↗<span className="sr-only"> (새 탭)</span></a><a href={LINKS.velogblog} target="_blank" rel="noreferrer">기술 블로그 ↗<span className="sr-only"> (새 탭)</span></a></div>
      </div>
    </section>
  </div>;
}
