import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useScrolledHeader } from "../hooks/useScrolledHeader";
import type { Profile } from "../types/profile";
import { getProfileById } from "../assets/profiles";

type Props = {
  profile?: Profile;
};

export default function AppNav({ profile }: Props) {
  const scrolled = useScrolledHeader(20);
  const nav = useNavigate();

  const profileId =
    profile?.id ||
    (typeof window !== "undefined" && localStorage.getItem("profileId")) ||
    "leeyj";

  const effectiveProfile = profile ?? getProfileById(profileId);
  const homeTo = `/portfolio/${profileId}`;

  const linkCx =
    "px-3 py-2 text-sm rounded hover:text-white focus:outline-none focus:ring focus:ring-white/20";
  const activeCx = "text-white font-semibold";
  const idleCx = "text-white/80";

  const [open, setOpen] = React.useState(false);
  const popref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!popref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header
      role="banner"
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled
          ? "bg-black/60 backdrop-blur border-b border-white/10"
          : "bg-gradient-to-b from-black/70 to-transparent",
      ].join(" ")}
    >
      <nav className="w-full h-14 px-5 flex items-center">
        <div className="flex items-center gap-4">
          <Link
            to={homeTo}
            className="text-white font-extrabold tracking-tight"
            aria-label="Home"
          >
            LeeYeongjae
          </Link>

          <ul className="flex items-center gap-2">
            <li>
              <NavLink
                to="/skills"
                className={({ isActive }) => `${linkCx} ${isActive ? activeCx : idleCx}`}
              >
                기술
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/experience"
                className={({ isActive }) => `${linkCx} ${isActive ? activeCx : idleCx}`}
              >
                경험·경력
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/certs"
                className={({ isActive }) => `${linkCx} ${isActive ? activeCx : idleCx}`}
              >
                인증·수료
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => `${linkCx} ${isActive ? activeCx : idleCx}`}
              >
                프로젝트
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `${linkCx} ${isActive ? activeCx : idleCx}`}
              >
                연락
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="ml-auto relative" ref={popref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-8 h-8 grid place-items-center rounded bg-white/15 hover:bg-white/25 transition-colors"
            aria-haspopup="menu"
            aria-expanded={open}
            title={effectiveProfile?.name ?? "프로필"}
          >
            <span className="text-xl leading-none select-none">
              {effectiveProfile?.emoji ?? effectiveProfile?.name?.charAt(0) ?? "👤"}
            </span>
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-48 rounded-md bg-black/90 ring-1 ring-white/10 shadow-lg p-1 text-sm"
            >
              <button
                className="w-full text-left px-3 py-2 rounded hover:bg-white/10"
                onClick={() => {
                  setOpen(false);
                  nav(`/portfolio/${profileId}`);
                }}
              >
                내 포트폴리오
              </button>
              <button
                className="w-full text-left px-3 py-2 rounded hover:bg-white/10"
                onClick={() => {
                  setOpen(false);
                  nav("/browse");
                }}
              >
                프로필 선택
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
