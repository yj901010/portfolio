import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";
import { LINKS } from "../assets/links";
import { PROFILE } from "../assets/constants";

export default function SiteFooter() {
  return (
    <footer className="nf-footer">
      <div className="nf-footer-social">
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github size={23} />
        </a>
        <a href={`mailto:${PROFILE.email}`} aria-label="이메일">
          <Mail size={25} />
        </a>
      </div>
      <div className="nf-footer-links">
        <Link to="/projects">프로젝트</Link>
        <Link to="/skills">기술 스택</Link>
        <Link to="/experience">경험과 경력</Link>
        <Link to="/certs">자격·수료·수상</Link>
        <Link to="/contact">연락처</Link>
        <a href={LINKS.velogblog} target="_blank" rel="noopener noreferrer">
          기술 블로그
        </a>
        <Link to="/browse">프로필 선택</Link>
      </div>
      <Link className="nf-footer-contact" to="/contact">
        개발자에게 연락하기
      </Link>
      <p>© {new Date().getFullYear()} 이영재 · 개인 포트폴리오</p>
      <p className="nf-footer-note">
        Netflix의 화면 구성에서 영감을 받은 개인 프로젝트입니다. Netflix와
        관련이 없습니다.
      </p>
    </footer>
  );
}
