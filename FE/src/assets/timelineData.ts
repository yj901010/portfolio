export type Category = "WORK" | "PROJECT" | "EDU" | "NONDEV";

export type TimelineItem = {
  id: string;
  category: Category;
  period: string;
  title: string;
  subtitle?: string;
  summary: string;
  bullets?: string[];
  links?: { github?: string; demo?: string; post?: string; proof?: string };
};

export const TIMELINE: TimelineItem[] = [
  {
    id: "turbincrew",
    category: "WORK",
    period: "2025.08 ~ 현재",
    title: "터빈크루",
    subtitle: "백엔드 개발",
    summary:
      "Spring Boot 스마트팜 프로젝트 백엔드 · GCP Pub/Sub 명령/상태 채널 · WebSocket 알림",
    bullets: [
      "문제: 드론 명령·상태를 안정적으로 실시간 전달해야 함",
      "Action: Spring Boot 서비스, Pub/Sub 토픽(명령/상태) 설계, 구독/발행 흐름, WebSocket 알림",
      "Result: 안정적인 실시간 명령/피드백 경로 확립",
    ],
  },

  {
    id: "ssafy",
    category: "EDU",
    period: "2024.07 ~ 2025.06",
    title: "삼성청년 SW·AI 아카데미",
    subtitle: "Python/DB/CS  · 팀 프로젝트",
    summary: "기초 프로그래밍/DB/CS · 풀스택 프로젝트 수행",
    bullets: [
      "Checkmate: FastAPI+Upstage OCR → 요약, ClamAV, AES-GCM(2-of-2 키 분할), Redis 캐시, Dropbox Sign, WebSocket, S3+CloudFront",
      "숨숨파인더: 공공데이터 수집 → Kafka(요약/ID 이원화) → 병합/상세 → MySQL/Elasticsearch/HDFS, OpenCV, 지오코딩",
      "MyFairy/MoneyMate: 멀티 컨테이너·Nginx 프록시·CI/CD 등 실습",
    ],
  },

  {
    id: "gai",
    category: "EDU",
    period: "2023.06 ~ 2023.11",
    title: "광주 인공지능사관학교",
    subtitle: "ML/DL 기초 · Spring  · 팀 프로젝트",
    summary: "기초 ML/DL · Spring 백엔드 개발 · 팀 프로젝트 수행",
    bullets: [
      "아이톡: Spring Security, JPA, JSP/AJAX",
      "TTS/STT/ChatGPT 스크립트, AWS EB/Route53 배포",
    ],
  },

  {
    id: "elin",
    category: "PROJECT",
    period: "2022.07 ~ 2022.11",
    title: "(주) 엘인 – AI 융합 프로젝트",
    subtitle: "Android SDK 연동 · OCR/기초 AI",
    summary: "안드로이드 앱 개발 · SDK 연동, OCR·확률통계 기초 적용",
  },

  {
    id: "dongshin-rdc",
    category: "NONDEV",
    period: "2021.06 ~ 2021.08",
    title: "동신대 산학협력단 연구원",
    subtitle: "실감콘텐츠 장비 관리/운영",
    summary: "장비 관리 및 유지보수, 서류 업무",
  },

  {
    id: "kocca",
    category: "NONDEV",
    period: "2020.09 ~ 2020.12",
    title: "한국콘텐츠진흥원 인턴",
    subtitle: "지역콘텐츠팀",
    summary: "기획/행정/운영 지원",
  },

  {
    id: "dongshin-degree",
    category: "EDU",
    period: "2014.03 ~ 2021.08",
    title: "동신대학교 디지털콘텐츠학과 졸업 (GPA 3.86/4.5)",
    summary:
      "C, 자료구조, 전산수학, OS/네트워크, Java OOP, Spring, DB, 안드로이드 등 개발 전공 이수",
  },
];
