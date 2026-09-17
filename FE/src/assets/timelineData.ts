import { KHOPE_STORY } from "./khopeStory";
import { TLATFARM_STORY } from "./tlatfarmStory";

export type Category = "WORK" | "PROJECT" | "EDU" | "NONDEV";

type Reference = { label: string; url: string };
type Highlight = { label: string; description: string };

export type TimelineItem = {
  id: string;
  category: Category;
  period: string;
  title: string;
  subtitle?: string;
  summary: string;
  current?: boolean;
  project?: string;
  bullets?: string[];
  highlights?: Highlight[];
  context?: string;
  technologies?: string[];
  references?: Reference[];
  relatedProjects?: { label: string; path: string }[];
  caseStudy?: {
    title: string;
    summary: string;
    sections: Highlight[];
    flow: string[];
    reference: Reference;
  };
};

export const TIMELINE: TimelineItem[] = [
  {
    id: "iteyes",
    category: "WORK",
    period: "2026.02 ~ 현재",
    title: "아이티아이즈",
    subtitle: "백엔드 개발",
    current: true,
    project: "K-HOPE",
    summary: "한국인 암 특화 디지털 스마트 임상시험 플랫폼",
    technologies: KHOPE_STORY.technologies,
    highlights: [
      { label: "연구 업무·결과 조회", description: "연구 조건 관리와 결과 조회 API를 개발하고, 조회 응답·다운로드의 출력 기준을 공통화했습니다." },
      { label: "학습 데이터 제작", description: "Text-to-SQL 학습에 사용할 용어·표현 데이터의 입력·검토·관계 시각화·JSON/ZIP 내보내기 도구를 개발했습니다." },
      { label: "데이터 적재·집계", description: "Airflow로 청크 단위 데이터 적재와 건수 확인, 대상별 일일 집계·재집계·실행 결과 요약을 구성했습니다." },
      { label: "작업 실행·취소", description: "실행 중인 작업을 식별자로 관리하고, 취소 요청을 쿼리 중단과 리소스 정리로 연결했습니다." },
      { label: "AI 서비스 연동", description: "AI 응답 스트리밍과 WebSocket 전송을 분리하고, 비동기 결과 수신·저장·화면 알림을 구현했습니다." },
    ],
    relatedProjects: [{ label: "K-HOPE 구현 이야기", path: "/projects/khope" }],
    references: [{ label: "K-HOPE 공식 사업 소개", url: "https://www.iteyes.co.kr/reference-1" }],
  },
  {
    id: "turbincrew",
    category: "WORK",
    period: "2025.08 ~ 2026.02.01",
    title: "터빈크루",
    subtitle: "백엔드 · GCP 인프라 개발",
    project: "TlatFarm",
    summary: TLATFARM_STORY.description,
    context: "참여 프로젝트 · CES 2026 혁신상 Honoree / Construction & Industrial Tech",
    technologies: TLATFARM_STORY.technologies,
    highlights: TLATFARM_STORY.contributions.map((item) => ({ label: item.title, description: item.text })),
    relatedProjects: [{ label: "TlatFarm 구현 이야기", path: "/projects/tlatfarm" }],
    references: [{ label: "CES 공식 수상 소개", url: "https://www.ces.tech/ces-innovation-awards/2026/tlatfarm-technologies-live-at-the-farm/" }],
    caseStudy: {
      title: "응답은 끝났는데, 비동기 작업도 멈췄다",
      summary: "Cloud Run의 CPU 할당 정책을 확인하고 Cloud Tasks로 실행 방식을 바꾼 과정.",
      sections: [
        { label: "문제", description: "로컬에서는 정상 동작하던 @Async 작업이 Cloud Run에서는 HTTP 응답 이후 진행되지 않았습니다. 블로그에는 Contact 폼의 메일 발송을 재현 사례로 정리했습니다." },
        { label: "원인", description: "사용 중인 요청 기반 CPU 할당 설정에서는 요청 처리가 끝난 뒤 CPU 사용이 제한됐습니다. 응답 이후에도 계속 실행될 것이라 가정한 백그라운드 작업이 이 환경과 맞지 않았습니다." },
        { label: "선택", description: "CPU를 상시 할당하는 방식도 검토했지만, 간헐적으로 들어오는 요청과 비용을 고려해 Cloud Tasks의 HTTP 작업 큐를 선택했습니다." },
        { label: "적용", description: "비동기 작업을 Cloud Tasks에 등록하고, Cloud Run에 별도의 HTTP 요청을 보내 실행하도록 변경했습니다. 작업이 자체 요청의 처리 시간 안에서 실행되도록 해 기존 요청 종료 후 작업이 멈추는 문제를 해결했습니다." },
      ],
      flow: ["작업 등록", "Cloud Tasks", "Cloud Run HTTP 처리"],
      reference: {
        label: "구현 과정과 선택 이유 · Velog",
        url: "https://velog.io/@joker901010/Cloud-Run에서-Async가-동작하지-않았던Cloud-Run에서-Async가-동작하지-않았던-이유-feat.-CPU-Throttling",
      },
    },
  },
  {
    id: "ssafy",
    category: "EDU",
    period: "2024.07 ~ 2025.06",
    title: "삼성청년 SW·AI 아카데미",
    subtitle: "SSAFY · 소프트웨어 교육",
    summary: "Python·DB·CS 기초를 학습하고, 팀 프로젝트에서 백엔드와 데이터 처리·배포를 경험했습니다.",
    bullets: [
      "Checkmate — OCR·AI 비동기 처리, 웹훅 연동, 파일 검사와 암호화",
      "숨숨파인더 — Kafka 기반 공공데이터 수집·적재, API 요청 제한 대응, 검색 연동",
      "MyFairy — Docker·Jenkins·Nginx·OpenVidu 기반 인프라 작업",
    ],
    relatedProjects: [
      { label: "Checkmate", path: "/projects/checkmate" },
      { label: "숨숨파인더", path: "/projects/sumsum-finder" },
      { label: "MyFairy", path: "/projects/my-fairy" },
    ],
  },
  {
    id: "gai",
    category: "EDU",
    period: "2023.06 ~ 2023.11",
    title: "광주 인공지능사관학교",
    subtitle: "AI · 백엔드 교육",
    summary: "머신러닝·딥러닝 기초를 학습하고, Spring 기반 팀 프로젝트를 진행했습니다.",
    bullets: [
      "아이톡 — Spring Security·JPA를 활용한 백엔드 개발",
      "TTS·STT·ChatGPT 연동 및 AWS Elastic Beanstalk·Route 53 배포",
    ],
  },
  {
    id: "elin",
    category: "PROJECT",
    period: "2022.07 ~ 2022.11",
    title: "엘인 · AI 융합 프로젝트",
    subtitle: "프로젝트 참여",
    summary: "안드로이드 앱 개발과 SDK 연동을 진행하고, OCR과 확률·통계 기초를 적용했습니다.",
  },
  {
    id: "dongshin-rdc",
    category: "NONDEV",
    period: "2021.06 ~ 2021.08",
    title: "동신대 산학협력단",
    subtitle: "연구원",
    summary: "실감콘텐츠 장비 관리·운영, 유지보수 및 관련 서류 업무를 담당했습니다.",
  },
  {
    id: "kocca",
    category: "NONDEV",
    period: "2020.09 ~ 2020.12",
    title: "한국콘텐츠진흥원",
    subtitle: "지역콘텐츠팀 · 인턴",
    summary: "지역콘텐츠팀의 기획·행정·운영 업무를 지원했습니다.",
  },
  {
    id: "dongshin-degree",
    category: "EDU",
    period: "2014.03 ~ 2021.08",
    title: "동신대학교 디지털콘텐츠학과",
    subtitle: "학사 졸업 · 3.86 / 4.5",
    summary: "자료구조, 운영체제, 네트워크, 데이터베이스와 Java·Spring 등 개발 전공을 이수했습니다.",
  },
];
