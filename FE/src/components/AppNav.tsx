import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Search, X } from "lucide-react";
import { useScrolledHeader } from "../hooks/useScrolledHeader";
import type { Profile } from "../types/profile";

export default function AppNav({ profile }: { profile?: Profile }) {
  const scrolled = useScrolledHeader(24);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState<"profile" | "mobile" | null>(null);
  const header = useRef<HTMLElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const home = `/portfolio/${profile?.id ?? "leeyj"}`;
  const links = [
    { to: home, label: "홈" },
    { to: "/projects", label: "프로젝트" },
    { to: "/skills", label: "기술" },
    { to: "/experience", label: "경험·경력" },
    { to: "/certs", label: "자격·수료·수상" },
  ];
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenu(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);
  const isHome = location.pathname.startsWith("/portfolio/");
  return (
    <header
      ref={header}
      className={`nf-header ${scrolled || !isHome ? "is-solid" : ""}`}
    >
      <nav className="nf-navigation" aria-label="주 메뉴">
        <Link className="nf-wordmark" to={home} aria-label="마이플릭스 홈">
          MYFLIX
        </Link>
        <div className="nf-desktop-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <button
          className="nf-mobile-menu"
          aria-expanded={menu === "mobile"}
          aria-controls="nf-mobile-navigation"
          onClick={() => setMenu(menu === "mobile" ? null : "mobile")}
        >
          메뉴 <ChevronDown size={13} />
        </button>
        <div className="nf-nav-actions">
          <form
            className={`nf-search ${searchOpen ? "is-open" : ""}`}
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              navigate(`/search?q=${encodeURIComponent(query.trim())}`);
              setMenu(null);
            }}
          >
            <button
              type="button"
              className="nf-icon-button"
              aria-label={searchOpen ? "검색 닫기" : "검색 열기"}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? <X size={22} /> : <Search size={24} />}
            </button>
            {searchOpen && (
              <input
                ref={searchInput}
                aria-label="프로젝트 또는 기술 검색"
                placeholder="프로젝트, 기술"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            )}
          </form>
          <Link className="nf-contact-link" to="/contact">
            연락하기
          </Link>
          <button
            className="nf-profile-button"
            aria-label="프로필 메뉴"
            aria-expanded={menu === "profile"}
            aria-controls="nf-profile-menu"
            onClick={() => setMenu(menu === "profile" ? null : "profile")}
          >
            <img src="/info/leeyj.jpg" alt="" />
            <ChevronDown size={15} />
          </button>
        </div>
        {menu === "mobile" && (
          <div
            id="nf-mobile-navigation"
            className="nf-dropdown nf-mobile-dropdown"
          >
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenu(null)}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
        {menu === "profile" && (
          <div id="nf-profile-menu" className="nf-dropdown">
            <span className="nf-menu-person">
              <img src="/info/leeyj.jpg" alt="" /> 이영재 · Backend
            </span>
            <Link to="/contact" onClick={() => setMenu(null)}>
              연락처와 소개
            </Link>
            <Link to="/browse" onClick={() => setMenu(null)}>
              프로필 선택으로 돌아가기
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
