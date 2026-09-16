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
    technologies: ["REST API", "WebSocket", "Streaming", "Webhook", "Airflow"],
    highlights: [
      { label: "API 구현", description: "설계된 API 명세를 바탕으로 REST API와 업무 로직을 개발합니다." },
      { label: "실시간 통신·연동", description: "WebSocket, 스트리밍, 웹훅을 활용한 통신 및 외부 연동 기능을 구현합니다." },
      { label: "데이터 수집", description: "Airflow를 활용한 데이터 수집 작업을 개발합니다." },
    ],
    references: [{ label: "K-HOPE 공식 사업 소개", url: "https://www.iteyes.co.kr/reference-1" }],
  },
  {
    id: "turbincrew",
    category: "WORK",
    period: "2025.08 ~ 2026.02.01",
    title: "터빈크루",
    subtitle: "백엔드 · GCP 인프라 개발",
    project: "TlatFarm",
    summary: "드론과 에너지 데이터를 연결하는 스마트팜 플랫폼",
    context: "참여 프로젝트 · CES 2026 혁신상 Honoree / Construction & Industrial Tech",
    technologies: ["Spring Boot", "Pub/Sub", "BigQuery", "Cloud Tasks", "Cloud Run", "Cloud Build"],
    highlights: [
      { label: "드론 데이터 연동", description: "Spring Boot 백엔드에서 Pub/Sub으로 드론 데이터를 수신하고 서비스에 연결했습니다." },
      { label: "에너지 통계", description: "BigQuery에 쌓인 풍력·태양광 에너지 데이터를 주기적으로 집계하고, 통계 결과를 서비스에 연동했습니다." },
      { label: "비동기 처리·인프라", description: "Cloud Run의 요청 종료 후 비동기 작업이 중단되는 문제를 Cloud Tasks로 해결하고, Cloud Run·Cloud Build 기반 실행 및 빌드 환경을 다뤘습니다." },
    ],
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
