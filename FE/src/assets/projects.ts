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
  problemGoals: string[]; // 문제/목표
  constraints: string[];  // 제약
  adrs: ADR[];            // 대안표
  architecture?: {        // 아키텍처/플로우
    diagram?: string;     // public/diagrams/<slug>.png
    steps: string[];      // 핵심 경로 bullet
  };
  deepDives: DeepDive[];  // 구현 딥다이브 2~3개
  outcome?: {             // 결과 요약 숫자
    p95?: string;
    tps?: string;
    error?: string;
    cost?: string;
  };
  risksNext: string[];    // 리스크/한계/Next
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

  userTesting?: {
    summary?: string;
    items: Array<{
      id: string;
      title: string;
      priority: "Critical" | "Major" | "Minor";
      status: "Fixed" | "In Progress" | "Planned";
      summary: string;
      steps?: string[];
      change?: string[];
      attachments?: { before?: string; after?: string };
      date?: string;
    }>;
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "myfairy",
    title: "MyFairy — 인터랙티브 스토리텔링",
    period: "2025 (Samsung SW AI Academy, WebRTC 6인 팀)",
    stack: [
      "React",
      "Canvas",
      "OpenVidu/WebRTC",
      "Spring Boot",
      "MySQL",
      "Redis",
      "FastAPI(AI)",
      "SD ControlNet",
      "LLM",
      "Docker",
      "Nginx",
      "Jenkins",
    ],
    summary:
      "아이가 주도해 친구와 동화를 만드는 협업 서비스. 실시간 그리기, 낙서→동화풍 보정, 스토리 보조까지 하나로.",
    bullets: [
      "Nginx 단일 게이트웨이(TLS 종료/정적 캐싱/프록시/WS 업그레이드)",
      "Gallery–Like 복합키 모델링, 좋아요 토글 + 정렬/필터/페이지네이션",
      "Zustand 무한 스크롤 & 지연 시 AI 재요청",
      "Jenkins CI/CD + Docker 멀티스테이지",
    ],
    caseStudy: {
      problemGoals: [
        "아이 주도 실시간 협업 그리기 + 동화풍 보정으로 ‘창작 참여도’ 향상",
        "실시간 알림/협업의 끊김 최소화(연결 안정성·지연 체감 개선)",
        "웹/모바일 혼합 디바이스에서도 일관된 UX 제공(캔버스 퍼포먼스)",
      ],
      constraints: [
        "브라우저 Canvas 성능과 단말 스펙 편차가 큼",
        "오픈소스 OpenVidu CE의 배포/운영 한계",
        "소규모 팀, 짧은 기간(6주) — 빠른 통합/배포 필요",
      ],
      adrs: [
        {
          option: "캔버스 단일 레이어 vs 2-레이어(base/overlay) 구조",
          pros: "2-레이어는 텍스트/스티커 보존·합성 제어 용이",
          cons: "레이어 동기화/내보내기(merge) 핸들링 필요",
          reason: "텍스트 유실 이슈 방지 및 성능/보전성 트레이드오프 최적",
        },
        {
          option: "OpenVidu CE vs 직접 WebRTC 시그널링",
          pros: "OpenVidu는 시나리오·토큰 발급 플로우가 성숙",
          cons: "커스터마이즈 제약, 리소스 요구",
          reason: "TTM 우선, 운영 복잡도↓ — OpenVidu 채택",
        },
        {
          option: "단일 게이트웨이(Nginx) vs 개별 서비스 노출",
          pros: "TLS/정적 캐시/라우팅 일원화, 배포·운영 단순화",
          cons: "프록시 계층 추가에 따른 설정 복잡성",
          reason: "소규모 팀 운영성 최적화 — Nginx 단일 게이트웨이 채택",
        },
      ],
      architecture: {
        diagram: "/diagrams/myfairy.png",
        steps: [
          "FE: React Canvas 협업 UI ↔ OpenVidu(WebRTC) 스트림",
          "AI: FastAPI → SD ControlNet/Scribble로 보정",
          "BE: Spring Boot API, JPA(Gallery/Like), Redis 캐시",
          "Nginx: TLS 종료, /api·/api/ai·/ws 프록시, 정적 캐시",
          "Jenkins: GitLab Webhook → Docker 빌드/푸시 → 원격 compose 배포",
        ],
      },
      deepDives: [
        {
          title: "Nginx 게이트웨이 설계",
          bullets: [
            "http→https 리다이렉트, server_tokens off, 캐시 무효화(해시 산출물)",
            "/ws 업그레이드 헤더 정리, CORS/Origin 허용 범위 최소",
          ],
        },
        {
          title: "JPA — Gallery/Like(@IdClass)",
          bullets: [
            "복합키로 유일성·멱등성 확보, 동시 토글 레이스 완화",
            "정렬(최신/인기)+hasOrigin 필터, 페이지네이션",
          ],
        },
        {
          title: "CI/CD — Jenkins on Docker",
          bullets: [
            "레지스트리 푸시, SSH 원격 서버 compose 배포 자동화",
            "브랜치 분기(be/ai), 자격증명 안전 주입",
          ],
        },
      ],
      outcome: {
        p95: "—", // 실제 수치 없으면 비워둬도 됨
        tps: "—",
        error: "갤러리 상세 오류율 2.6% → 0.8% (팀 테스트 기준)",
        cost: "배포 리드타임 15m → 4m",
      },
      risksNext: [
        "OpenVidu 커스터마이즈 한계 → 대안(LiveKit/mediasoup) 탐색",
        "캔버스 성능: 오프스크린 캔버스·WebGL 도입 검토",
      ],
    },
    userTesting: {
      summary:
        "삼성 임직원 8명 대상, 태블릿/노트북 혼합 30분 세션 — 실사용 시나리오 기반 피드백을 즉시 반영.",
      items: [
        {
          id: "UT-8",
          title: "그림 생성 시 기존 글씨 사라짐",
          priority: "Critical",
          status: "Fixed",
          summary: "이미지 생성 이후 페이지에 입력된 텍스트가 유실됨.",
          steps: ["그림 구경 → 이미지 생성 실행", "기존 글씨가 사라짐(그림과 함께 보여야 함)"],
          change: [
            "Canvas 2-레이어(base/overlay) 구조로 분리",
            "생성 완료 시 base만 교체, overlay(글씨) 유지",
            "내보내기(export) 시에만 merge",
          ],
          attachments: {
            before: "/images/ut/myfairy-8-before.png",
            after: "/images/ut/myfairy-8-after.png",
          },
          date: "2025-11-04",
        },
        {
          id: "UT-5",
          title: "로딩 진행 상태 표시 추가",
          priority: "Major",
          status: "Fixed",
          summary: "‘곧 화면이 나올 거예요’만 노출되어 대기 체감이 큼.",
          steps: ["로딩 화면에서 진행률 파악 불가", "예상 남은 시간·취소 불가"],
          change: [
            "FastAPI → SSE(progress) 채널 도입, determinate 진행률 UI",
            "SSE 실패 시 폴링 fallback",
            "취소 버튼 및 indeterminate 모드 추가",
          ],
          attachments: { after: "/images/ut/myfairy-5-after.png" },
          date: "2025-11-04",
        },
        {
          id: "UT-7",
          title: "그림 완료 상태 표시",
          priority: "Major",
          status: "Fixed",
          summary: "누가 완료했는지/진행 중인지 확인 어려움.",
          steps: ["협업 참여자 상태 구분 불가"],
          change: [
            "OpenVidu data channel로 READY_TOGGLE 브로드캐스트",
            "참여자 목록에 ✅(완료)/⌛(진행) 표시",
            "전원 완료 시 다음 단계 CTA 노출",
          ],
        },
        {
          id: "UT-3",
          title: "조사(을/를 등) 자동 변환",
          priority: "Major",
          status: "Fixed",
          summary: "받침 유무 상관없이 ‘를’만 표시되던 문제.",
          steps: ["명사 받침 유무에 따라 을/를 자동 적용 필요"],
          change: [
            "한글 종성 판단 유틸 FE/BE 공통 모듈화",
            "을/를·이/가·은/는·과/와까지 확대 지원",
          ],
        },
        {
          id: "UT-2",
          title: "친구 신청 푸시 알림",
          priority: "Major",
          status: "Fixed",
          summary: "푸시 미전송으로 신규 요청 확인 지연.",
          steps: ["친구 요청 발생 시 즉시 인지가 필요"],
          change: [
            "FCM 토큰 등록 API + NotificationService",
            "FriendRequestCreated 이벤트 발생 시 FCM 전송",
            "딥링크로 ‘받은 친구 신청’ 바로 이동",
          ],
        },
        {
          id: "UT-4",
          title: "동화 만들기 시간 설정",
          priority: "Major",
          status: "Fixed",
          summary: "5분 고정 — 사용자별 맞춤/무제한 옵션 필요.",
          change: [
            "무제한/3·5·10/사용자 지정 옵션",
            "방장만 변경, 서버 타임스탬프 기준 동기화",
            "만료 시 소프트락 + 연장 제안",
          ],
        },
        {
          id: "UT-6",
          title: "펜 종류·두께 확장",
          priority: "Major",
          status: "Fixed",
          summary: "펜 스타일 단일/두께 1단계라 표현 제약.",
          change: [
            "연필/마커/붓/형광펜 추가, 두께 5단계",
            "최근 색상 5개, 오프스크린 캔버스 최적화",
            "Undo/Redo 20단계",
          ],
        },
        {
          id: "UT-1",
          title: "메인 메뉴 좌우 화살표",
          priority: "Minor",
          status: "Fixed",
          summary: "화살표가 없어 메뉴 탐색이 불편.",
          change: [
            "캐러셀/섹션 네비 좌우 버튼 + 키보드/스와이프",
            "접근성 라벨/포커스 링 추가",
          ],
        },
      ],
    },
  },

  {
    slug: "checkmate",
    title: "Checkmate — 계약서 AI 요약 · 전자서명",
    period: "2024.07–2025.06",
    summary:
      "Upstage OCR + LangChain 요약 · AES-GCM 2-of-2 키분할 · Dropbox Sign · STOMP 알림로 계약/서명 파이프라인 구축.",
    stack: [
      "Spring Boot",
      "FastAPI",
      "AWS S3/CloudFront",
      "Redis",
      "MySQL/MongoDB",
      "WebSocket(STOMP)",
      "Dropbox Sign",
      "Upstage OCR",
    ],
    bullets: [
      "대용량 스트리밍 복호(AES-GCM) · 키분할(XOR)로 보안 강화",
      "실시간 상태 알림(WebSocket) · 리트라이/캐싱으로 지연 최적화",
    ],
    links: { github: "https://github.com/yj901010" },
    hasMetrics: true,
    cover: "/covers/checkmate.jpg",
    caseStudy: {
      problemGoals: [
        "다양 포맷(hwp/pdf/img) 계약서를 빠르고 신뢰성 있게 요약",
        "p95 ≤ 1초, 실패율 ≤ 1%, 전자서명 실시간 알림",
        "민감 파일 안전 저장(AES-GCM + 2-of-2 키분할), 악성코드 사전 차단",
        "S3+CloudFront 캐시로 egress 비용 30% 절감",
      ],
      constraints: [
        "입력 포맷/용량 편차 → OCR 품질/지연 변동",
        "외부 OCR API SLA/쿼터 → 리트라이·캐시 필요",
        "이기종 스택(Spring/FastAPI) + 소팀 운영 → 단순 배포 필요",
        "실시간 알림(STOMP) 신뢰성/부하 제어",
      ],
      adrs: [
        {
          option: "앱단 AES-GCM + 2-of-2 키분할 vs S3 SSE-KMS",
          pros: "세밀제어·감사, 스트리밍 복호",
          cons: "키 관리 복잡",
          reason: "보안/감사 요구 최우선",
        },
        {
          option: "Dropbox Sign vs 자체 서명",
          pros: "성숙 API·감사 대응, TTM↑",
          cons: "과금/커스터마이즈 제약",
          reason: "리드타임 우선",
        },
        {
          option: "알림: Polling vs STOMP",
          pros: "실시간/오버헤드↓",
          cons: "연결/권한/부하 관리 필요",
          reason: "UX·지연 목표 충족",
        },
      ],
      architecture: {
        diagram: "/diagrams/checkmate.png",
        steps: [
          "업로드 → ClamAV 검사 → AES-GCM 암호화 → S3",
          "FastAPI → Upstage OCR → LangChain 요약",
          "Spring → Dropbox Sign 요청/콜백",
          "STOMP로 상태 알림 푸시",
          "Redis 캐시(요약/외부 API)로 지연·비용 절감",
        ],
      },
      deepDives: [
        {
          title: "AES-GCM + 2-of-2 키분할",
          bullets: [
            "256bit DEK 생성 → XOR 분할(MySQL/MongoDB 분산 저장)",
            "CipherInputStream 스트리밍 복호(대용량 안정)",
            "키 회전/감사 로그 표준화",
          ],
        },
        {
          title: "STOMP 알림 신뢰성",
          bullets: [
            "CONNECT 인증 + 토픽 권한 캐시(1m TTL)",
            "Heartbeat 10s/10s, 세션당 구독 제한",
            "표준 ERROR(JSON) 규격화",
          ],
        },
        {
          title: "외부 API 리트라이 + 캐시",
          bullets: [
            "지수 백오프 + idempotency key",
            "Redis TTL 1h(빈응답 캐시 제외)",
            "캐시 히트 시 p95 급감",
          ],
        },
      ],
      outcome: {
        p95: "≈ 1.8s → 0.95s",
        tps: "≈ 420 → 720 req/s",
        error: "≈ 2.1% → 0.6%",
        cost: "CDN egress 30%↓",
      },
      risksNext: [
        "OCR 품질 편차 → 후처리 룰/사전 보강",
        "서명 벤더 종속 → 멀티 벤더 어댑터",
        "키 관리 복잡 → 회전 자동화·운영 가이드",
      ],
    },
    interventions: [
      {
        date: "2025-05-30",
        label: "Redis 캐싱+리트라이 도입",
        description:
          "OCR/요약 결과 캐시 & idempotency → p95↓, 실패율↓",
      },
      {
        date: "2025-06-03",
        label: "STOMP 튜닝",
        description:
          "Heartbeat/브로드캐스트 최적화 → TPS↑, 에러↓",
      },
      {
        date: "2025-06-05",
        label: "Streaming 복호 안정화",
        description:
          "대용량 파일 경로 병목 제거 → p95 변동성↓",
      },
    ],
  },
];
