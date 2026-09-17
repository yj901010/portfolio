import type { ProjectDetailData } from "../types/project";
import { PROJECT_STORIES } from "./projectStories";

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
    references: [{ label: "GitHub 저장소", url: story.repository }],
    scenarios: [], techWhy: [], code: { dockerfile: "", jenkins: "" }, issues: [], kpis: [],
  };
}

export const PROJECTS: ProjectDetailData[] = [
  {
    slug: "khope",
    name: "K-HOPE (임상시험 지원 플랫폼)",
    category: "work",
    organization: "아이티아이즈",
    summary: "임상시험을 지원하는 웹 플랫폼",
    ongoing: true,
    period: "2026.02 ~ 현재 (참여 기간)",
    roles: ["백엔드 개발", "API 구현·연동"],
    thumb: "/artwork/khope.svg",
    overview: "한국인 암 특화 디지털 스마트 임상시험 플랫폼 K-HOPE의 백엔드 개발에 참여하고 있습니다.",
    problem: "임상시험 관련 업무를 지원하는 웹 플랫폼에서 API, 실시간 통신, 외부 연동과 데이터 수집 기능을 개발합니다.",
    scenarios: [],
    techChips: ["REST API", "WebSocket", "Streaming", "Webhook", "Airflow"],
    techWhy: [],
    code: { dockerfile: "", jenkins: "" },
    contributions: [
      { no: "01", title: "API와 업무 로직", items: ["설계된 API 명세를 바탕으로 REST API와 업무 로직 구현"] },
      { no: "02", title: "실시간 통신·외부 연동", items: ["WebSocket, 스트리밍, 웹훅 관련 기능 개발"] },
      { no: "03", title: "데이터 수집", items: ["Airflow를 활용한 데이터 수집 작업 개발"] },
    ],
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
