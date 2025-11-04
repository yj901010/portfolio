// src/assets/projects.ts
export type ADR = {
  option: string;
  pros: string;
  cons: string;
  reason: string;
};

export type DeepDive = {
  title: string;
  bullets: string[];
};

export type Intervention = {
  date: string;
  label: string;
  description?: string;
};

export type CaseStudy = {
  problemGoals: string[];    // 문제/목표
  constraints: string[];     // 제약
  adrs: ADR[];               // 대안표
  architecture?: {           // 아키텍처/플로우
    diagram?: string;        // public/diagrams/<slug>.png
    steps: string[];         // 핵심 경로 bullet
  };
  deepDives: DeepDive[];     // 구현 딥다이브 2~3개
  outcome?: {                // 결과 요약 숫자
    p95?: string;
    tps?: string;
    error?: string;
    cost?: string;
  };
  risksNext: string[];       // 리스크/한계/Next
};

export type Project = {
  slug: string;
  title: string;
  period?: string;
  summary: string;
  stack: string[];
  bullets?: string[];
  links?: { github?: string; demo?: string; docs?: string };
  hasMetrics?: boolean;
  cover?: string;
  caseStudy?: CaseStudy;
  interventions?: Intervention[];
};

export const PROJECTS: Project[] = [
  {
    slug: "checkmate",
    title: "Checkmate — 계약서 AI 요약 · 전자서명",
    period: "2024.07–2025.06",
    summary:
      "Upstage OCR + LangChain 요약 · AES-GCM 2-of-2 키분할 · Dropbox Sign · STOMP 알림로 계약/서명 파이프라인 구축.",
    stack: [
      "Spring Boot","FastAPI","AWS S3/CloudFront","Redis",
      "MySQL/MongoDB","WebSocket(STOMP)","Dropbox Sign","Upstage OCR"
    ],
    bullets: [
      "대용량 스트리밍 복호(AES-GCM) · 키분할(XOR)로 보안 강화",
      "실시간 상태 알림(WebSocket) · 리트라이/캐싱으로 지연 최적화"
    ],
    links: { github: "https://github.com/yj901010" },
    hasMetrics: true,
    cover: "/covers/checkmate.jpg",
    caseStudy: {
      problemGoals: [
        "다양 포맷(hwp/pdf/img) 계약서를 빠르고 신뢰성 있게 요약",
        "p95 ≤ 1초, 실패율 ≤ 1%, 전자서명 상태 실시간 알림",
        "민감 파일 안전 저장(AES-GCM + 2-of-2 키분할), 악성코드 사전 차단",
        "S3+CloudFront 캐시로 egress 비용 30% 절감"
      ],
      constraints: [
        "입력 포맷/용량 편차 → OCR 품질 변동·지연",
        "외부 OCR API SLA/쿼터(간헐 오류) → 리트라이·캐시 필요",
        "이기종 스택(Spring/FastAPI) + 소팀 운영 → 단순한 운영/배포 필요",
        "실시간 알림(STOMP) 신뢰성/부하 제어"
      ],
      adrs: [
        {
          option: "앱단 AES-GCM + 2-of-2 키분할 vs S3 SSE-KMS",
          pros: "세밀제어·감사, 스트리밍 복호 가능",
          cons: "초기 구현/키 관리 복잡",
          reason: "민감 문서 보안 최우선 → 앱단 AES-GCM + 키분할 채택"
        },
        {
          option: "Dropbox Sign vs 자체 서명",
          pros: "성숙 API·감사 대응, TTM↑",
          cons: "과금/커스터마이즈 제약",
          reason: "리드타임 우선 → Dropbox Sign 채택"
        },
        {
          option: "알림: Polling vs STOMP",
          pros: "STOMP 실시간/오버헤드↓",
          cons: "연결/권한/부하 관리 필요",
          reason: "UX·지연 목표 충족 → STOMP 채택"
        }
      ],
      architecture: {
        diagram: "/diagrams/checkmate.png",
        steps: [
          "업로드 → ClamAV 검사 → AES-GCM 암호화 → S3",
          "FastAPI → Upstage OCR → LangChain 요약",
          "Spring → Dropbox Sign 요청/콜백",
          "STOMP로 상태 알림 푸시",
          "Redis 캐시(요약/외부 API)로 지연·비용 절감"
        ]
      },
      deepDives: [
        {
          title: "AES-GCM + 2-of-2 키분할",
          bullets: [
            "256bit DEK 생성 → XOR 분할(MySQL/MongoDB 분산 저장)",
            "CipherInputStream 스트리밍 복호(대용량 안전)",
            "키 회전/감사 로그 표준화"
          ]
        },
        {
          title: "STOMP 알림 신뢰성",
          bullets: [
            "CONNECT 인증 + 토픽 권한 캐시(1m TTL)",
            "Heartbeat 10s/10s, 세션당 구독 제한",
            "표준 ERROR(JSON) 규격화"
          ]
        },
        {
          title: "외부 API 리트라이 + 캐시",
          bullets: [
            "지수 백오프 + idempotency key",
            "Redis TTL 1h(빈응답 캐시 제외)",
            "캐시히트 시 p95 급감"
          ]
        }
      ],
      outcome: { p95: "≈ 1.8s → 0.95s", tps: "≈ 420 → 720 req/s", error: "≈ 2.1% → 0.6%", cost: "CDN egress 30%↓" },
      risksNext: [
        "OCR 품질 편차 → 후처리 룰/사전 보강",
        "서명 벤더 종속 → 멀티 벤더 어댑터",
        "키관리 복잡 → 회전 자동화·운영 가이드"
      ]
    },
    interventions: [
      { date: "2025-05-30", label: "Redis 캐싱+리트라이 도입", description: "OCR/요약 결과 캐시 & idempotency → p95↓, 실패율↓" },
      { date: "2025-06-03", label: "STOMP 튜닝", description: "Heartbeat/브로드캐스트 최적화 → TPS↑, 에러↓" },
      { date: "2025-06-05", label: "Streaming 복호 안정화", description: "대용량 파일 경로 병목 제거 → p95 변동성↓" }
    ]
  },

];
