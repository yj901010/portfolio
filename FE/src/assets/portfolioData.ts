import type { Media, Row } from "./mockData";
import type { Profile } from "../types/profile";
import { img } from "./mockData";
import { LINKS } from "./links";

export function buildPortfolioContent(profile: Profile): { hero: Media; rows: Row[] } {
  const hero: Media = {
    id: `hero-${profile.id}`,
    title: `${profile.name} - ${profile.role}`,
    subtitle: "실전 프로젝트 · 시스템 아키텍처 · 성능 튜닝",
    description:
      "영향력 있는 대규모 애플리케이션을 설계/구현해온 백엔드 엔지니어입니다. 실시간 스트리밍, 메시지 큐, 데이터 파이프라인 등\n고난도 문제를 해결한 경험으로, 사용자와 비즈니스에 즉시 가치를 만드는 결과를 제시합니다.",
    thumb: img("photo-1518779578993-ec3579fee39f"),
    backdrop: img("photo-1517245386807-bb43f82c33c4"),
    tags: ["Spring", "FastAPI", "Kafka"],
    maturity: "ALL",
  };

  const row1: Row = {
    id: "recruiter-pick",
    title: "오늘의 채용담당자를 위한 최고의 선택",
    items: [
      { id: "skills", title: "기술", thumb: img("photo-1498050108023-c5249f4df085"), href: "/skills" },
      { id: "exp", title: "경험", thumb: img("photo-1527430253228-e93688616381"), href: "/experience", playHref: "/experience", moreHref: "/experience/all" },
      { id: "cert",      title: "인증 · 수료", thumb: img("photo-1500530855697-b586d89ba3ee") },
      { id: "ref",       title: "추천사항",    thumb: img("photo-1519681393784-d120267933ba") },
      { id: "projects",  title: "프로젝트",    thumb: img("photo-1555066931-4365d14bab8c") },
      { id: "contact",   title: "연락",        thumb: img("photo-1496307042754-b4aa456c4a2d") },
    ],
  };

  const row2: Row = {
    id: "contact",
    title: "채용담당자가 계속 주목할 항목",
    items: [
      {
        id: "github",
        title: "GitHub",
        subtitle: "프로젝트와 코드",
        thumb: img("photo-1555066931-4365d14bab8c"),
        href: LINKS.github,
        playHref: LINKS.github,
      },
      {
        id: "blog",
        title: "블로그",
        subtitle: "기술 기록과 회고",
        thumb: img("photo-1519681393784-d120267933ba"),
        href: LINKS.velogblog,
        playHref: LINKS.velogblog,
        moreHref: LINKS.tistoryblog,
      },
    ],
  };

  return { hero, rows: [row1, row2] };
}
