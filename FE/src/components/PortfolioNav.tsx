import React from "react";
import type { Profile } from "../types/profile";

type Props = { profile: Profile };

export default function PortfolioNav({ profile }: Props) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300
        ${scrolled ? "bg-black/90" : "bg-gradient-to-b from-black/80 to-transparent"}`}
    >
      <div className="w-full h-16 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <div className="flex items-center gap-6 min-w-0">
          <div className="text-red-600 font-black tracking-wider text-xl whitespace-nowrap">
            LeeYeongjae
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="text-white font-semibold" href="#home">홈</a>
            <a className="text-white/80 hover:text-white" href="#exp">경험</a>
            <a className="text-white/80 hover:text-white" href="#skills">기술</a>
            <a className="text-white/80 hover:text-white" href="#projects">프로젝트</a>
            <a className="text-white/80 hover:text-white" href="#contact">연락</a>
          </nav>
        </div>

        <div className="flex items-center">
          <div className="w-8 h-8 rounded overflow-hidden bg-white/15 grid place-items-center text-xl select-none">
            {(() => {
              const anyProfile: any = profile;
              if (anyProfile?.avatarUrl) {
                return (
                  <img
                    src={anyProfile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                );
              }
              if (profile.emoji) return <span>{profile.emoji}</span>;
              return <span>{profile.name?.charAt(0) ?? "👤"}</span>;
            })()}
          </div>
        </div>
      </div>
    </header>
  );
}
