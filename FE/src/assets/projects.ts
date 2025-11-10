import type { ProjectDetailData } from "../types/project";

export const PROJECTS: ProjectDetailData[] = [
  {
    slug: "tlatfarm",
    name: "TlatFarm (스마트팜 · NDVI/AI 분석)",
    period: "2024.09 ~ 2025.02",
    teamSize: 5,
    teamComposition: "BE 1 · FE 1 · AI 1 · DevOps 1 · HW 1",
    roles: ["NDVI", "GCP", "Spring Boot"],
    thumb: "/covers/tlat-farm.jpg",
    overview:
      "드론 NDVI/RGB 촬영 → AI 분석 → 농가 단위 대시보드/알림까지 제공하는 스마트팜 플랫폼.",
    problem:
      "원본 대용량 이미지와 분석 결과를 일관되게 매핑하고 시계열로 관리할 파이프라인 필요.",
    scenarios: [
      { title: "1) 촬영/업로드", caption: "GCS 업로드 → AI 웹훅 수신 → 엔티티 매핑" },
    ],
    architectureImg: "", erdImg: "",
    techChips: ["Spring", "GCS", "AI Webhook"],
    techWhy: [],
    code: { dockerfile: "", jenkins: "" },
    contributions: [],
    issues: [],
    kpis: [],
  },
  {
    slug: "sumsum-finder",
    name: "숨숨파인더 (유실물 통합 관리)",
    period: "2025.03 ~ 진행중",
    teamSize: 6,
    teamComposition: "BE 3 · FE 2 · AI 1",
    roles: ["Kafka", "FastAPI", "Elasticsearch"],
    thumb: "/covers/ssfinder.jpg",
    overview:
      "경찰청/대중교통 유실물 데이터를 통합 수집·검색·매칭하고 알림까지 제공하는 서비스.",
    problem:
      "기관별 데이터 포맷 상이·지연/중복 발생. 스트리밍 수집과 검색 인덱싱 자동화 필요.",
    scenarios: [
      { title: "1) 수집 파이프라인", caption: "Kafka 스트림 → 컨슈머 → ES/HDFS 적재" },
    ],
    architectureImg: "/projects/ssfinder/architecture.png", erdImg: "/projects/ssfinder/erd.png",
    techChips: ["Kafka", "FastAPI", "ES", "MySQL"],
    techWhy: [],
    code: { dockerfile: "", jenkins: "" },
    contributions: [],
    issues: [],
    kpis: [],
  },
  {
    slug: "checkmate",
    name: "Checkmate (AI 계약 분석 · 전자서명)",
    period: "2024.05 ~ 2024.08",
    teamSize: 4,
    teamComposition: "BE 2 · AI 1 · FE 1",
    roles: ["Spring Boot", "FastAPI", "LangChain"],
    thumb: "/covers/checkmate.jpg",
    overview:
      "계약서 업로드 시 조항 분해/요약/리스크 하이라이트 및 전자서명까지 지원하는 통합 플랫폼.",
    problem:
      "대량의 계약 검토가 느리고 휴먼 에러가 발생. 핵심 리스크를 빠르게 드러내는 자동화 필요.",
    scenarios: [
      { title: "1) 계약 업로드", caption: "PDF 업로드 → 청크/임베딩 → 벡터 검색 준비" },
    ],
    architectureImg: "", erdImg: "",
    techChips: ["Spring", "FastAPI", "Qdrant", "S3"],
    techWhy: [],
    code: { dockerfile: "", jenkins: "" },
    contributions: [],
    issues: [],
    kpis: [],
  },
  {
    slug: "my-fairy",
    name: "My Fairy (마이 페어리)",
    period: "2025.01.13 ~ 2025.02.21 (6주)",
    teamSize: 6,
    teamComposition: "BE 2 · FE 2 · AI 1 · DevOps 1",
    roles: ["Backend", "DevOps", "Frontend"],
    thumb: "/covers/myfairy.jpg",

    overview:
      "아이들이 능동적으로 참여해 창의력을 키울 수 있는 양방향 동화 창작 서비스를 목표로, 핵심 화면과 기본 흐름을 빠르게 검증한 프로토타입입니다.",
    problem:
      "현재 유아용 디지털 콘텐츠는 상호작용이 제한적이라 창의력 자극과 몰입도가 낮다는 문제에서 출발했습니다. 아이가 직접 참여하고 결과를 만들어내는 구조로 전환하는 것을 목표로 했습니다.",

    scenarios: [
      { title: "동화 선택", caption: "동화 선택", image: "/projects/myfairy/scenario1.png" },
      { title: "방 생성", caption: "친구 초대 및 대기방", image: "/projects/myfairy/scenario2.png"  },
      { title: "동화 요소 입력", caption: "동화 내용 완성하기", image: "/projects/myfairy/scenario3.png"  },
      { title: "손그림 그리기", caption: "캔버스 스케치", image: "/projects/myfairy/scenario4.png"  },
      { title: "완성 & 공유", caption: "나만의 동화책", image: "/projects/myfairy/scenario5.png"  },
    ],

    architectureImg: "/projects/myfairy/architecture.png",
    erdImg: "/projects/myfairy/erd.png",

    techChips: ["Java", "Spring Boot", "MySQL", "Redis", "Docker & Compose", "Jenkins", "Nginx", "OpenVidu", "React", "FastAPI"],
    techWhy: [
      {
        title: "Jenkins — 왜?",
        bullets: [
          "자가 호스팅 환경에서 SSH/Compose 오케스트레이션이 간단함",
          "웹훅으로 브랜치 기준 자동 빌드, 단계별 게이트 설정 용이",
          "Blue/Green·헬스체크·롤백 스텝을 Groovy로 명시적 관리",
        ],
      },
      {
        title: "OpenVidu — 왜?",
        bullets: [
          "SFU 기반으로 다자간 통화 지연·대역폭 관리가 유리",
          "토큰 발급/권한 모델 단순 → 백엔드 연동 부담↓",
          "대안(WebRTC raw, Twilio) 대비 구축 속도/비용 우위",
        ],
      },
      {
        title: "Docker Compose — 왜?",
        bullets: [
          "초기 단일 노드 운영에서 K8s 대비 학습·운영 비용 최소화",
          "서비스 의존성/환경변수(.env)/볼륨 관리가 직관적",
          "프로파일로 Blue/Green 전환 및 부분 재배포가 쉬움",
        ],
      },
    ],

    code: {
      dockerfile: `# syntax=docker/dockerfile:1
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]`.trim(),
      jenkins: `
pipeline {
  agent any
  environment {
    REMOTE_SERVER = 'ubuntu@i12c206.p.ssafy.io'
    REMOTE_DIR = '/home/ubuntu/MyFairy'
  }
  stages {
    stage('Checkout Repository') {
      steps {
        git branch: 'deploy', credentialsId: 'GIT-LAB-TEST', url: 'https://lab.ssafy.com/s12-webmobile1-sub1/S12P11C206.git'
      }
    }
    stage('Build Frontend & Extract dist') {
      steps {
        script {
          sh """
            ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "cd \${REMOTE_DIR} && docker build -t frontend-builder ./frontend"
          """
          sh """
            ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "cd \${REMOTE_DIR} && docker create --name temp-frontend frontend-builder"
          """
          sh """
            ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "docker cp temp-frontend:/app/dist \${REMOTE_DIR}/frontend/"
          """
          sh """
            ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "cd \${REMOTE_DIR} && docker rm temp-frontend"
          """
        }
      }
    }
    stage('Deploy Blue-Green (Backend & AI)') {
      steps {
        script {
          def backendBlueStatus = sh(
            script: "ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} \\"docker ps --filter 'name=backend-blue' --format '{{.Names}}'\\"",
            returnStdout: true
          ).trim()
          def activeVersion = backendBlueStatus ? 'blue' : 'green'
          def newVersion = (activeVersion == 'blue') ? 'green' : 'blue'
          echo "현재 활성: \${activeVersion} → 새 버전: \${newVersion}"

          if (newVersion == 'green') {
            sh """ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "sed -i '/ai-green:/,/expose:/ { s/^#\\\\s*ports:/  ports:/ }' \${REMOTE_DIR}/docker-compose.yml" """
            sh """ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "sed -i '/ai-blue:/,/expose:/ { s/^[[:space:]]*ports:/# ports:/ }' \${REMOTE_DIR}/docker-compose.yml" """
          } else {
            sh """ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "sed -i '/ai-blue:/,/expose:/ { s/^#\\\\s*ports:/  ports:/ }' \${REMOTE_DIR}/docker-compose.yml" """
            sh """ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "sed -i '/ai-green:/,/expose:/ { s/^[[:space:]]*ports:/# ports:/ }' \${REMOTE_DIR}/docker-compose.yml" """
          }

          sh """ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "cd \${REMOTE_DIR} && docker-compose --env-file .env up -d --no-deps --build backend-\${newVersion} ai-\${newVersion}" """

          sh """ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "docker network inspect app-network || docker network create app-network" """

          def maxAttempts = 10
          def attempt = 1
          def backendHealthy = false
          def aiHealthy = false
          while (attempt <= maxAttempts && (!backendHealthy || !aiHealthy)) {
            echo "헬스체크 \${attempt}…"
            backendHealthy = (sh(
              script: "ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} \\"docker run --rm --network app-network curlimages/curl -s -o /dev/null -w '%{http_code}' http://backend-\${newVersion}:8080/health\\"",
              returnStdout: true
            ).trim() == "200")
            aiHealthy = (sh(
              script: "ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} 'curl -s -o /dev/null -w \"%{http_code}\" http://localhost:8000/health'",
              returnStdout: true
            ).trim() == "200")
            if (backendHealthy && aiHealthy) break
            sleep 10; attempt++
          }
          if (!backendHealthy || !aiHealthy) { error("신규 버전 헬스체크 실패") }

          if (newVersion == 'green') {
            sh """ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "sed -i 's/server backend-blue:8080;/# server backend-blue:8080;/; s/# server backend-green:8080;/server backend-green:8080;/' \${REMOTE_DIR}/nginx/conf.d/ssl-server.conf" """
          } else {
            sh """ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "sed -i 's/server backend-green:8080;/# server backend-green:8080;/; s/# server backend-blue:8080;/server backend-blue:8080;/' \${REMOTE_DIR}/nginx/conf.d/ssl-server.conf" """
          }
          sh "ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} 'sudo nginx -s reload'"
          sh """ssh -o StrictHostKeyChecking=no \${REMOTE_SERVER} "docker-compose --env-file .env rm -f backend-\${activeVersion} ai-\${activeVersion}" """
        }
      }
    }
  }
  post { success { echo "배포 성공" } failure { echo "배포 실패" } }
}
`.trim(),
    },

    contributions: [
      { no: "01", title: "배포 파이프라인", items: ["멀티스테이지 Dockerfile", "Jenkins file 구성", "Nginx 리로드 구성"] },
      { no: "02", title: "백엔드 간단 RESTful API", items: ["Story CRUD", "JPA 구성"] },
      { no: "03", title: "프론트 UI/상태/연동(간단)", items: ["화면 상태 흐름 구성", "Redux 상태관리", "컴포넌트 단위 API 연결"] },
    ],

    issues: [
      {
        id: "nginx-443",
        severity: "CRITICAL",
        title: "OpenVidu & Nginx 443 포트 충돌",
        detail: {
          problem: "OpenVidu가 443을 선점해 메인 Nginx의 외부 HTTPS 제공 불가.",
          cause: "OV 기본 배포가 80/443을 점유하는 구조.",
          fix: "OV 내부 포트 이관 + 메인 Nginx가 SSL 담당하도록 재설계.",
        },
      },
      {
        id: "docker-build-slow",
        severity: "MAJOR",
        title: "Docker 빌드 속도 저하",
        detail: {
          problem: "빌드/배포 리드타임 과도.",
          cause: "캐시 미활용, 레이어 과다, 의존성 설치 중복.",
          fix: "멀티스테이지 · 캐시 최적화 · 레이어 분리.",
        },
      },
    ],

    kpis: [
      { label: "AI 추론 대기시간 단축", value: "61.9%", note: "21s → 8s" },
      { label: "배포 리드타임 감소", value: "33%", note: "파이프라인 최적화" },
      { label: "유저 테스트", value: "TESTED", note: "삼성 임직원 유저테스트 완료" },
      { label: "이미지 경량화", value: "40%", note: "멀티스테이지 빌드" },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
