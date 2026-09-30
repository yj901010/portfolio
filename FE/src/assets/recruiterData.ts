import { CATALOG } from "./catalog";
import { PROJECT_STORIES } from "./projectStories";

export const PROJECT_BRIEFS: Record<string, { focus: string; contribution: string; cases: string[]; tech: string[] }> = {
  khope: {
    focus: "연구 업무 API · AI 응답 연동 · 데이터 배치",
    contribution: "연구 조건·결과 API, 실행 중인 작업의 취소 처리, AI 스트리밍·결과 알림을 구현했습니다. Airflow 적재·집계와 Text-to-SQL 학습 데이터 제작 도구도 개발했습니다.",
    cases: ["execution-control", "ai-stream", "airflow-data"],
    tech: ["Java", "Spring Boot", "Python", "PostgreSQL", "Airflow"],
  },
  tlatfarm: {
    focus: "드론 데이터 처리 · 비동기 실행 · GCP 인프라",
    contribution: "Pub/Sub 드론 데이터 수신과 BigQuery 집계 결과 연동을 담당했습니다. Cloud Run에서 요청 종료 후 멈추던 비동기 작업을 Cloud Tasks의 별도 HTTP 요청으로 분리했습니다.",
    cases: ["task-execution", "drone-ingestion", "energy-aggregation"],
    tech: ["Spring Boot", "Pub/Sub", "Cloud Tasks", "Cloud Run", "BigQuery"],
  },
  checkmate: {
    focus: "민감한 파일의 저장·열람 · AI 서비스 연계",
    contribution: "계약서 원본·뷰어 PDF의 암호화와 키 분리 보관을 구현했습니다. OCR 후처리·요약 데이터 저장, 전자서명 웹훅을 사용자 기능으로 연결했습니다.",
    cases: ["security", "ocr", "signature"],
    tech: ["Spring Boot", "Python", "MySQL", "MongoDB", "S3"],
  },
  "sumsum-finder": {
    focus: "외부 데이터 수집·처리 · 검색 연동",
    contribution: "비순차 메시지 결합, 외부 API 호출 간격 제어와 MySQL 저장 직렬화를 구현했습니다. 검색 색인 갱신·재시도와 AI 매칭 결과 조회도 담당했습니다.",
    cases: ["pipeline", "search", "matching"],
    tech: ["Spring Boot", "Python", "Kafka", "Elasticsearch", "MySQL"],
  },
  "my-fairy": {
    focus: "서비스 실행 환경 · 회원 도메인",
    contribution: "Nginx에서 정적 화면·Spring·FastAPI·WebSocket 요청 경로를 나누고 Docker 실행 환경을 구성했습니다. 회원 조회·수정·탈퇴와 비밀번호 변경 API를 구현했습니다.",
    cases: ["runtime", "member", "deployment"],
    tech: ["Spring Boot", "Docker", "Nginx", "Jenkins", "MySQL"],
  },
};

export const SKILL_EVIDENCE = [
  { area: "백엔드", technologies: "Java · Spring Boot · REST API",
    description: "연구 업무 API, 작업 실행·취소, 회원·계약 도메인 개발",
    links: [{ slug: "khope", caseId: "execution-control", label: "작업 실행 제어" }, { slug: "my-fairy", caseId: "member", label: "회원 도메인" }] },
  { area: "데이터 처리", technologies: "Python · Airflow · Kafka · SQL",
    description: "외부 데이터 수집, 메시지 결합, 청크 적재와 대상별 집계",
    links: [{ slug: "sumsum-finder", caseId: "pipeline", label: "수집 파이프라인" }, { slug: "khope", caseId: "airflow-data", label: "적재·집계 DAG" }] },
  { area: "저장·검색", technologies: "MySQL · PostgreSQL · Elasticsearch · MongoDB",
    description: "원본 데이터와 검색 문서 연동, 실패 재시도와 조회 응답 구성",
    links: [{ slug: "sumsum-finder", caseId: "search", label: "검색 갱신·재시도" }, { slug: "checkmate", caseId: "security", label: "파일 저장·열람" }] },
  { area: "비동기·연동", technologies: "Cloud Tasks · Pub/Sub · WebSocket · Webhook",
    description: "별도 요청을 통한 작업 실행, AI 스트림·결과 수신과 화면 알림",
    links: [{ slug: "tlatfarm", caseId: "task-execution", label: "Cloud Run 비동기 실행" }, { slug: "khope", caseId: "ai-stream", label: "AI 응답 스트리밍" }] },
  { area: "실행 환경", technologies: "GCP · Docker · Nginx · Jenkins",
    description: "빌드·실행 환경 구성, 서비스별 요청 라우팅",
    links: [{ slug: "tlatfarm", caseId: "task-execution", label: "GCP 실행 환경" }, { slug: "my-fairy", caseId: "runtime", label: "컨테이너·라우팅" }] },
];

export function caseLink(slug: string, caseId: string) {
  return `/projects/${slug}?case=${caseId}#implementation`;
}

export const RECRUITER_PROJECTS = CATALOG.map(project => ({
  project, story: PROJECT_STORIES[project.slug]!, brief: PROJECT_BRIEFS[project.slug],
}));
