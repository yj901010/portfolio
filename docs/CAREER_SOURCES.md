# 경력 내용과 근거

확인일: 2026-09-16. 개인 담당 범위는 사용자의 직접 설명을 기준으로 하며, 공개 자료는 프로젝트 소개와 수상 사실을 뒷받침한다.

## 아이티아이즈

- 2026년 2월부터 재직. K-HOPE 백엔드 개발.
- 설계된 명세를 기반으로 REST API 및 업무 로직 구현.
- WebSocket, 스트리밍, 웹훅 관련 개발과 Airflow를 활용한 데이터 수집 작업.
- 전체 플랫폼 설계 책임, AI 모델 개발, 대규모 데이터 엔지니어링 총괄로 확대 해석하지 않는다.
- 프로젝트 소개: https://www.iteyes.co.kr/reference-1

## 터빈크루 / TlatFarm

- 입사 2025년 8월은 기존 사이트와 PDF가 일치. 퇴사일은 사용자가 2026-02-01로 정정했다.
- Spring Boot 백엔드 및 GCP 인프라 작업.
- Pub/Sub을 통한 드론 데이터 수신·연동.
- 풍력·태양광 등 에너지 데이터의 BigQuery 주기적 집계 및 통계 결과 연동은 TlatFarm 업무에 포함된다고 사용자가 확인했다.
- Cloud Run, Cloud Build, Cloud Tasks 사용.
- TlatFarm은 CES 2026 Innovation Awards의 Construction & Industrial Tech 부문 Honoree. 참여 프로젝트의 수상이며 개인 수상으로 표시하지 않는다.
- 수상 공식 출처: https://www.ces.tech/ces-innovation-awards/2026/tlatfarm-technologies-live-at-the-farm/

## Cloud Run 비동기 처리 사례

사용자는 요청이 없는 동안 CPU가 제한돼 비동기 작업이 수행되지 않았고 Cloud Tasks로 해결했다고 설명했다. 개인 블로그의 구체적인 재현 예시는 Contact 폼에서 DB 저장 후 HTTP 200 응답을 반환하고 @Async로 메일을 보내는 흐름이다. 응답 이후 메일 전송이 진행되지 않는 현상과 요청 기반 CPU 할당의 관계를 설명하고, 상시 CPU 할당과 메시지 큐를 비교한 뒤 Cloud Tasks를 선택했다.

- 블로그: https://velog.io/@joker901010/Cloud-Run에서-Async가-동작하지-않았던Cloud-Run에서-Async가-동작하지-않았던-이유-feat.-CPU-Throttling
- Google CPU 할당: https://docs.cloud.google.com/run/docs/configuring/billing-settings
- Cloud Tasks 연동: https://docs.cloud.google.com/run/docs/triggering/using-tasks

표현은 '요청 처리 외 시간의 CPU throttling'을 사용한다. '인스턴스가 0개로 축소됨'과 혼동하지 않는다. 특정 CPU 백분율, 비용 절감률, 처리량, 성공률 또는 재시도·멱등성 구현을 별도로 확인하지 않고 추가하지 않는다. 블로그는 메일 발송 사례이므로 드론 자동화의 구현 증명으로 바꾸어 인용하지 않는다. BigQuery의 구체적인 실행 방식이 Scheduled Queries인지 다른 스케줄러인지 확인되지 않아 '주기적 집계'로만 기록했다.

## 제공된 포트폴리오 PDF

로컬 원본: `C:/Users/leeyj/Downloads/이영재 포트폴리오.pdf` (24쪽)

텍스트를 검토하고 이력 및 프로젝트 담당 업무 관련 3, 7, 13, 19, 22쪽을 렌더링하여 시각적으로 확인했다. PDF 원본은 수정하거나 사이트에 업로드하지 않았다.

- MyFairy: Ubuntu, Jenkins, Docker, Nginx, OpenVidu 중심 인프라 작업.
- 숨숨파인더: Kafka 수집·적재, API 요청 제한 대응, MySQL/Elasticsearch 검색.
- 체크메이트: OCR/AI 비동기 처리, 웹훅, Redis 캐시, 업로드 파일 검사·암호화.
- PDF의 터빈크루 종료월은 2025.12로 오래된 값이다. 최신 사용자 설명인 2026.02.01을 우선했다.
- PDF의 한국콘텐츠진흥원 인턴 기간(2021.06~2021.08)은 기존 사이트와 다르지만, 사용자가 2020.09~2020.12를 직접 확인했다. 사이트는 확인된 기간을 유지한다.
- PDF의 정보처리기사 날짜는 기존 증빙 문서의 합격일과 다르므로 기존 증빙을 따른다.
- PDF 요약 인덱스와 일부 상세 페이지의 프로젝트 기간도 달라 별도 프로젝트 내용 정리 시 확인한다. 이번 변경은 현재 회사 경력 두 항목과 TlatFarm 참여 기간·기술 정보에 한정했다.
