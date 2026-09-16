import { PROJECTS } from "./projects";
import type { ProjectDetailData } from "../types/project";
import type { Media } from "../types/media";

const ART: Record<string, { title: string; subtitle: string; image: string; accent: string }> = {
  khope: {
    title: "K-HOPE",
    subtitle: "임상시험을 지원하는 웹 플랫폼",
    image: "/artwork/khope.svg",
    accent: "#d8e6e8",
  },
  "sumsum-finder": {
    title: "숨숨파인더",
    subtitle: "흩어진 기록, 하나의 연결",
    image: "/artwork/ssfinder.png",
    accent: "#dfc14c",
  },
  checkmate: {
    title: "CHECKMATE",
    subtitle: "계약서의 행간을 읽다",
    image: "/artwork/checkmate.png",
    accent: "#e9dfd0",
  },
  "my-fairy": {
    title: "MY FAIRY",
    subtitle: "우리가 함께 만드는 이야기",
    image: "/artwork/myfairy.png",
    accent: "#e9dbaa",
  },
  tlatfarm: {
    title: "TlatFarm",
    subtitle: "데이터로 바라보는 농장",
    image: "/covers/tlat-farm.jpg",
    accent: "#b7dd87",
  },
};

export const FEATURED_PROJECT = PROJECTS.find((p) => p.slug === "sumsum-finder")!;

// Latest participation first, in the order confirmed by the portfolio owner.
export const CATALOG = ["khope", "tlatfarm", "checkmate", "sumsum-finder", "my-fairy"]
  .map((slug) => PROJECTS.find((p) => p.slug === slug)!)
  .filter(Boolean);

export const PROJECT_GROUPS = [
  { id: "work", title: "회사 프로젝트", description: "회사에서 참여한 서비스 개발", items: CATALOG.filter((p) => p.category === "work") },
  { id: "ssafy", title: "SSAFY 프로젝트", description: "SSAFY에서 함께 만든 팀 프로젝트", items: CATALOG.filter((p) => p.category === "ssafy") },
];

export function getArtwork(project: ProjectDetailData) {
  return ART[project.slug] ?? { title: project.name, subtitle: "", image: project.thumb ?? "", accent: "#fff" };
}

export function toMedia(project: ProjectDetailData): Media {
  const art = getArtwork(project);
  return {
    id: project.slug,
    title: art.title,
    subtitle: project.summary,
    thumb: art.image,
    backdrop: art.image,
    description: project.overview,
    tags: project.techChips,
    href: `/projects/${project.slug}`,
    playHref: `/projects/${project.slug}`,
  };
}
