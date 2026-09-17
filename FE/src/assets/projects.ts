import type { ProjectDetailData } from "../types/project";
import { PROJECT_STORIES } from "./projectStories";
import { KHOPE_STORY } from "./khopeStory";

type SsafyMetadata = Pick<ProjectDetailData, "slug" | "name" | "summary" | "period" | "teamComposition" | "roles" | "problem">;

// Cards, search, previews and details share the same responsibility/technology copy.
function ssafyProject(metadata: SsafyMetadata): ProjectDetailData {
  const story = PROJECT_STORIES[metadata.slug]!;
  return {
    ...metadata,
    category: "ssafy",
    organization: "SSAFY",
    teamSize: 6,
    thumb: story.image,
    overview: story.description,
    techChips: story.technologies,
    contributions: story.contributions.map((item, index) => ({
      no: String(index + 1).padStart(2, "0"), title: item.title, items: [item.text],
    })),
    references: story.repository ? [{ label: "GitHub 저장소", url: story.repository }] : [],
    scenarios: [], techWhy: [], code: { dockerfile: "", jenkins: "" }, issues: [], kpis: [],
  };
}

export const PROJECTS: ProjectDetailData[] = [
  {
    slug: "khope",
    name: "K-HOPE (임상시험 지원 플랫폼)",
    category: "work",
    organization: "아이티아이즈",
    summary: "연구 업무 API와 AI 서비스 연동",
    ongoing: true,
    period: "2026.02 ~ 현재 (참여 기간)",
    roles: ["백엔드 개발", "연구 업무·AI 연동"],
    thumb: "/artwork/khope.svg",
    overview: KHOPE_STORY.description,
    problem: "연구 조건 관리와 결과 조회를 연결하고, 실행 중인 작업과 외부 AI 응답을 서비스에서 일관된 흐름으로 처리하는 백엔드를 개발합니다.",
    scenarios: [],
    techChips: KHOPE_STORY.technologies,
    techWhy: [],
    code: { dockerfile: "", jenkins: "" },
    contributions: KHOPE_STORY.contributions.map((item, index) => ({
      no: String(index + 1).padStart(2, "0"), title: item.title, items: [item.text],
    })),
    issues: [],
    kpis: [],
    references: [{ label: "K-HOPE 공식 사업 소개", url: "https://www.iteyes.co.kr/reference-1" }],
  },
  {
    slug: "tlatfarm",
    category: "work",
    organization: "터빈크루",
    summary: "드론·에너지 데이터를 연결하는 스마트팜",
    name: "TlatFarm (스마트팜 · NDVI/AI 분석)",
    period: "2025.08 ~ 2026.02 (참여 기간)",
    teamSize: 5,
    teamComposition: "BE 1 · FE 1 · AI 1 · DevOps 1 · HW 1",
    roles: ["백엔드 개발", "GCP 인프라"],
    thumb: "/covers/tlat-farm.jpg",
    overview:
      "드론 NDVI/RGB 촬영 → AI 분석 → 농가 단위 대시보드/알림까지 제공하는 스마트팜 플랫폼.",
    problem:
      "원본 대용량 이미지와 분석 결과를 일관되게 매핑하고 시계열로 관리할 파이프라인 필요.",
    scenarios: [
      { title: "1) 촬영/업로드", caption: "GCS 업로드 → AI 웹훅 수신 → 엔티티 매핑" },
    ],
    architectureImg: "", erdImg: "",
    techChips: ["Spring Boot", "Pub/Sub", "Cloud Tasks", "Cloud Run", "Cloud Build", "BigQuery"],
    techWhy: [],
    code: { dockerfile: "", jenkins: "" },
    contributions: [],
    issues: [],
    kpis: [],
  },
  ssafyProject({
    "slug": "checkmate",
    "name": "CheckMate (AI 계약 분석 · 전자서명)",
    "summary": "계약서 분석·요약과 전자서명 서비스",
    "period": "2025.04.14 ~ 2025.05.22",
    "teamComposition": "BE 3 · FE 3",
    "roles": [
      "백엔드 개발",
      "OCR·요약 연계"
    ],
    "problem": "복잡한 계약서의 내용을 이해하기 어려운 사용자를 위해 문서 업로드·요약·열람·전자서명을 하나의 서비스에서 연결했습니다."
  }),
  ssafyProject({
    "slug": "sumsum-finder",
    "name": "숨숨파인더 (유실물 통합 관리)",
    "summary": "공공 습득물 수집·지도 검색·AI 매칭",
    "period": "2025.03.03 ~ 2025.04.11",
    "teamComposition": "BE 4 · FE 2",
    "roles": [
      "백엔드 개발",
      "데이터 수집·검색"
    ],
    "problem": "흩어진 습득물 정보를 위치와 속성 조건으로 탐색할 수 있도록, 공공데이터 수집·가공부터 지도 검색과 AI 매칭 결과 조회까지 연결했습니다."
  }),
  ssafyProject({
    "slug": "my-fairy",
    "name": "MyFairy (양방향 동화 창작)",
    "summary": "아이의 그림으로 함께 만드는 동화",
    "period": "2025.01.13 ~ 2025.02.21",
    "teamComposition": "BE 3 · FE 3",
    "roles": [
      "인프라·배포",
      "백엔드 개발",
      "화면·API 연동"
    ],
    "problem": "아이가 콘텐츠를 보기만 하는 대신 그림을 그리고 이야기를 만드는 과정에 참여하도록 기획했습니다. 친구와의 협업과 부모용 화면을 함께 제공하는 동화 창작 서비스입니다."
  })
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
