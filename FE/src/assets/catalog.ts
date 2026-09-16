import { PROJECTS } from "./projects";
import type { ProjectDetailData } from "../types/project";
import type { Media } from "../types/media";

const ART: Record<
  string,
  { title: string; subtitle: string; image: string; accent: string }
> = {
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

export const FEATURED_PROJECT = PROJECTS.find(
  (p) => p.slug === "sumsum-finder",
)!;
export const CATALOG = ["sumsum-finder", "checkmate", "my-fairy", "tlatfarm"]
  .map((slug) => PROJECTS.find((p) => p.slug === slug)!)
  .filter(Boolean);

export function getArtwork(project: ProjectDetailData) {
  return (
    ART[project.slug] ?? {
      title: project.name,
      subtitle: "",
      image: project.thumb ?? "",
      accent: "#fff",
    }
  );
}

export function toMedia(project: ProjectDetailData): Media {
  const art = getArtwork(project);
  return {
    id: project.slug,
    title: art.title,
    subtitle: art.subtitle,
    thumb: art.image,
    backdrop: art.image,
    description: project.overview,
    tags: project.techChips,
    href: `/projects/${project.slug}`,
    playHref: `/projects/${project.slug}`,
  };
}
