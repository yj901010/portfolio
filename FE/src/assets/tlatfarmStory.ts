import type { DiagramBlock, ProjectStory } from "../types/projectStory";

// Historical contribution summary. Sources and publication boundaries: docs/TLATFARM_CONTENT.md.
const node = (title: string, detail: string, step?: number): DiagramBlock => ({ type: "node", title, detail, step });
const flow = (...items: DiagramBlock[]): DiagramBlock => ({ type: "flow", items });

export const TLATFARM_STORY: ProjectStory = {
  title: "TlatFarm",
  description: "드론의 구역별 촬영과 AI 병해충 분석으로 작물 생육 상태를 확인하는 스마트팜 플랫폼",
  responsibility: "Spring Boot 백엔드와 GCP 인프라 개발에 참여했습니다. Pub/Sub으로 전달된 드론 데이터 처리, Cloud Tasks를 활용한 예약 작업 실행, BigQuery의 에너지 집계 결과 연동을 담당했습니다.",
  technologies: ["Spring Boot", "Pub/Sub", "Cloud Tasks", "Cloud Run", "Cloud Build", "BigQuery"],
  image: "/artwork/tlatfarm-cover.webp",
  imagePosition: "75% 25%",
  reference: {
    label: "Cloud Tasks 선택 배경 · Velog",
    url: "https://velog.io/@joker901010/Cloud-Run에서-Async가-동작하지-않았던Cloud-Run에서-Async가-동작하지-않았던-이유-feat.-CPU-Throttling",
  },
  contributions: [
    { title: "드론 데이터 수신·처리", text: "Pub/Sub으로 전달되는 드론 데이터를 Spring Boot 백엔드에서 받아 처리하고, 스마트팜 서비스에 연결했습니다." },
    { title: "예약 작업·비동기 실행", text: "Cloud Run의 요청 종료 후 비동기 작업이 진행되지 않는 문제를 다루고, Cloud Tasks의 별도 HTTP 요청으로 실행하도록 변경했습니다. 재직 당시 드론 예약 운행에도 활용했습니다." },
    { title: "에너지 집계 연동", text: "BigQuery에 적재된 태양광·풍력 데이터를 집계하고, 집계 결과를 Spring 백엔드에서 가져와 서비스에 연결했습니다." },
    { title: "GCP 빌드·실행 환경", text: "Cloud Build·Cloud Run 기반 빌드·실행 환경을 다루고, 런타임의 CPU 할당 특성을 비동기 처리 방식에 반영했습니다." },
  ],
  cases: [
    {
      id: "task-execution", label: "Cloud Run 비동기 실행",
      title: "응답 이후 멈춘 작업을 별도 요청으로 실행하다",
      context: "로컬에서 동작하던 @Async 작업이 Cloud Run에서는 HTTP 응답 이후 진행되지 않았습니다. 요청 처리 외 시간의 CPU 할당 제한을 확인하고, 작업 실행을 Cloud Tasks의 별도 요청으로 분리했습니다.",
      outcome: "응답 뒤 백그라운드 스레드에 맡기던 작업을 별도 HTTP 요청 안에서 처리하도록 변경했습니다. 재직 당시에는 드론 예약 운행에 Cloud Tasks를 활용했습니다.",
      defaultView: 1,
      steps: [
        { title: "비동기 작업을 Cloud Tasks에 등록", text: "기존 요청이 끝난 뒤에도 같은 프로세스의 스레드가 계속 실행된다고 가정하지 않도록 작업을 큐에 등록하는 방식으로 바꿨습니다. CPU 상시 할당도 검토했지만, 간헐적인 요청과 비용을 고려해 Cloud Tasks를 선택했습니다." },
        { title: "예약 작업을 별도 HTTP 요청으로 전달", text: "Cloud Tasks가 실행 시점에 Cloud Run으로 HTTP 요청을 보내도록 구성했습니다. 재직 당시 드론 예약 운행을 처리할 때도 이 방식을 활용했습니다." },
        { title: "새 요청의 처리 시간 안에서 작업 실행", text: "Spring이 작업 요청을 받아 해당 요청의 처리 과정에서 실행하도록 변경했습니다. 최초 사용자 요청이 끝난 뒤의 CPU 할당에 의존하던 실행 흐름을 바꾼 작업입니다." },
      ],
      views: [
        {
          title: "발생한 문제",
          blocks: [
            flow(node("사용자 요청", "Spring에서 처리"), node("HTTP 응답 종료", "사용자 요청 처리 완료"), node("@Async 작업", "응답 뒤 실행을 기대")),
            { type: "note", text: "사용 중인 요청 기반 CPU 할당 설정에서는 요청 처리 외 시간의 CPU 사용이 제한됨" },
            { type: "label", text: "관련 글에는 Contact 폼의 메일 발송을 재현 사례로 정리했습니다." },
          ],
        },
        {
          title: "Cloud Tasks 적용",
          blocks: [
            flow(node("작업 등록", "Spring → 작업 큐", 0), node("Cloud Tasks", "실행 시점에 HTTP 요청", 1), node("Cloud Run · Spring", "작업 요청 안에서 실행", 2)),
            { type: "note", text: "최초 요청과 작업 실행 요청을 분리" },
          ],
        },
        {
          title: "빌드·실행 환경",
          steps: [
            { title: "Cloud Build 기반 빌드 환경", text: "Cloud Build로 애플리케이션 이미지를 빌드하고 Cloud Run에서 사용하는 환경을 다뤘습니다. 관련 글에도 소스 변경에서 이미지 빌드·저장과 서비스 실행으로 이어지는 배포 흐름을 정리했습니다." },
            { title: "Cloud Run의 실행 특성에 맞춘 처리", text: "Spring 백엔드가 실행되는 Cloud Run에서 요청 기반 CPU 할당의 영향을 확인했습니다. 로컬에서의 비동기 동작을 그대로 기대하기보다, 배포 환경의 실행 정책에 맞춰 작업 호출 방식을 변경했습니다." },
          ],
          blocks: [flow(node("소스 변경", "빌드 입력"), node("Cloud Build", "이미지 빌드", 0), node("이미지 저장소", "배포 이미지 보관"), node("Cloud Run", "Spring 백엔드 실행", 1))],
        },
      ],
    },
    {
      id: "drone-ingestion", label: "Pub/Sub 드론 데이터 연동",
      title: "드론에서 전달된 데이터를 Spring 백엔드로 연결하다",
      context: "TlatFarm은 드론이 구역별로 촬영한 이미지를 AI로 분석해 작물 상태와 병해충을 확인하는 서비스입니다. 이 안에서 Pub/Sub으로 전달되는 드론 데이터를 수신·처리하는 백엔드를 개발했습니다.",
      outcome: "드론 측에서 전달된 데이터를 Spring Boot 서비스가 받아 처리하는 Pub/Sub 연동을 구현했습니다.",
      defaultView: 1,
      steps: [
        { title: "Pub/Sub을 통한 드론 데이터 수신", text: "드론 데이터가 Pub/Sub을 거쳐 Spring Boot 백엔드로 전달되는 연동을 구현했습니다. 드론 측 데이터 전달과 서버의 수신 처리 사이를 연결하는 작업을 담당했습니다." },
        { title: "수신 데이터를 서비스 처리로 연결", text: "전달받은 드론 데이터를 Spring 백엔드에서 처리하도록 개발했습니다. 서비스 전체의 촬영·AI 분석 흐름 중 데이터 수신과 백엔드 연동을 맡았습니다." },
      ],
      views: [
        {
          title: "서비스 이용 흐름",
          blocks: [
            flow(node("구역별 촬영", "드론이 그리드마다 촬영"), node("AI 이미지 분석", "작물 상태 · 병해충 판독"), node("분석 결과 확인", "농장 상태 파악")),
            { type: "note", text: "서비스 전체 기능을 설명한 흐름 · 담당 구현은 드론 데이터 수신·처리" },
          ],
        },
        {
          title: "담당한 연동",
          blocks: [flow(node("드론 데이터", "드론 측에서 전달"), node("Pub/Sub", "메시지 전달"), node("Spring 수신", "드론 메시지 수신", 0), node("백엔드 처리", "서비스 연동", 1))],
        },
      ],
    },
    {
      id: "energy-aggregation", label: "BigQuery 에너지 집계",
      title: "적재된 에너지 데이터를 집계해 서비스에 연결하다",
      context: "스마트팜의 작물 분석과 함께 에너지 데이터를 확인하는 기능을 지원했습니다. BigQuery에 쌓인 태양광·풍력 데이터에서 집계 결과를 만들고 Spring 백엔드로 가져왔습니다.",
      outcome: "BigQuery의 에너지 데이터를 집계 결과로 가공하고, Spring 서비스에서 활용할 수 있도록 연동했습니다.",
      defaultView: 0,
      steps: [
        { title: "BigQuery에 적재된 데이터 집계", text: "BigQuery에 누적된 태양광·풍력 에너지 데이터를 대상으로 집계 결과를 만드는 작업을 담당했습니다. 개별 원본 기록을 서비스에서 활용할 통계 데이터로 정리했습니다." },
        { title: "집계 결과를 Spring 서비스로 연동", text: "집계된 에너지 데이터를 Spring 백엔드에서 가져와 서비스에 연결했습니다. 데이터가 저장된 분석 환경과 사용자가 정보를 확인하는 서비스 사이의 연동을 맡았습니다." },
      ],
      views: [{
        title: "집계·연동 흐름",
        blocks: [flow(node("BigQuery", "태양광 · 풍력 데이터 적재"), node("에너지 집계", "서비스용 통계 데이터", 0), node("Spring 백엔드", "집계 결과 조회·연동", 1))],
      }],
    },
  ],
};
