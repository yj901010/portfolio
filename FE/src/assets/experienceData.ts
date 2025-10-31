// src/assets/experienceData.ts
export type Experience = {
  id: string;
  title: string;
  role: string;
  period: string;
  stack: string[];
  highlights: string[]; // Play에서 보여줄 2~4줄 핵심
  details?: {
    problem?: string;
    actions?: string[];   // 내가 한 일(핵심 액션)
    results?: string[];   // 수치/성과
  };
  links?: { github?: string; post?: string; demo?: string };
};

export const EXPERIENCES: Experience[] = [
  {
    id: "checkmate",
    title: "Checkmate – 계약 리스크 RAG",
    role: "Backend / AI Pipeline",
    period: "2024.06 – 2024.11",
    stack: ["Spring Boot", "FastAPI", "Qdrant", "Kafka", "S3", "React"],
    highlights: [
      "조항 단위 청크·임베딩, RAG 체인 단순화로 p95 ≤ 1s",
      "인용 근거 하이라이트/스트리밍, 캐시·재시도로 안정성↑",
    ],
    details: {
      problem: "근거가 명확한 답변 + 응답 지연 p95 ≤ 1s 동시 달성",
      actions: [
        "조항 기준 chunking/embedding → Qdrant 인덱싱",
        "검색→생성 체인 단순화, 프롬프트/파라미터 주기 검증",
        "Streamed answer + 근거 하이라이트, 캐시·재시도·스레드풀",
      ],
      results: ["인용률 상승, p95 1s 달성, 운영 대시보드 지표 정례화"],
    },
    links: { github: "https://github.com/yj901010" },
  },
  {
    id: "tlatfarm",
    title: "TlatFarm – 스마트팜 NDVI/IoT",
    role: "Backend / Data Pipeline",
    period: "2024.12 – 진행중",
    stack: ["Spring Boot", "Kafka", "FastAPI", "MySQL", "Elasticsearch", "GCP"],
    highlights: [
      "Kafka → Consumer(FastAPI) → MySQL/ES/HDFS 파이프라인",
      "OpenCV 전처리·지오코딩, FCM/Redis 알림, BigQuery 뷰",
    ],
    details: {
      problem: "드론 NDVI/RGB 대용량 처리와 실시간 알림",
      actions: [
        "Kafka 스트림 설계, idempotent 소비자 + 재처리 가드",
        "ES 검색/지도 시각화, Redis/FCM 알림 채널",
        "SSE 1k+ 연결 안정화(Heartbeat, 배압)",
      ],
      results: ["실시간 감지·알림, 조회 지연 감소, 운영 비용 최적화"],
    },
  },
  {
    id: "finance-msa",
    title: "금융 통합 플랫폼(MSA)",
    role: "Backend",
    period: "2025.06 – 진행중",
    stack: ["Spring", "React", "Redis", "Nginx", "Jenkins", "Docker"],
    highlights: [
      "실시간 시세·뉴스 리스크 알림, 모듈 분리(MSA)",
      "Jenkins+GitLab CI/CD, Blue/Green 배포",
    ],
    details: {
      problem: "실시간성·안정성·릴리즈 속도",
      actions: [
        "모듈 경계 재설계, 캐시/비동기 튜닝",
        "Nginx 리버스 프록시 + HTTPS, 헬스체크 라우팅",
      ],
      results: ["장애 0 배포, 평균 응답·비용 개선"],
    },
  },
];
