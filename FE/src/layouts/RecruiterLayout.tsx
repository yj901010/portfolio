import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, Printer } from "lucide-react";
import { PROFILE } from "../assets/constants";

export default function RecruiterLayout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
        target.focus({ preventScroll: true });
      } else if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return <div className="recruiter-app">
    <a className="skip-link" href="#main-content">본문으로 바로가기</a>
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="name-mark" to="/" aria-label="이영재 포트폴리오 홈">이영재<span>개발 포트폴리오</span></Link>
        <nav aria-label="주 메뉴">
          <Link to="/#experience">경력</Link><Link to="/#projects">프로젝트</Link>
          <Link to="/#skills">기술</Link><Link to="/#records">학력·자격</Link>
          <Link className="header-contact" to="/#contact">연락 <ArrowUpRight size={14} /></Link>
        </nav>
      </div>
    </header>
    <main id="main-content" tabIndex={-1}><Outlet /></main>
    <footer className="site-footer">
      <div><strong>이영재</strong><span>Backend Developer</span></div>
      <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
      <button className="text-button print-button" onClick={() => window.print()}><Printer size={15} />인쇄 / PDF 저장</button>
    </footer>
  </div>;
}
