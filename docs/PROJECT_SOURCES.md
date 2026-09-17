# SSAFY 프로젝트 콘텐츠 근거

## 편집 원칙

사용자가 제공한 「이영재 포트폴리오.pdf」, 프로젝트 설명 초안, GitHub의 실제 구현과 작성 이력을 함께 사용했다. PDF는 수행한 업무와 운영 경험의 출처로 삼고, 코드와 작성 이력으로 구체적인 처리 방식과 기여 범위를 다듬었다. 서버에서 설정한 Jenkins 작업처럼 저장소에 없는 운영 경험도 PDF에 명시된 범위에서 포함한다.

채용 담당자가 보는 화면은 서비스 소개, 담당 업무, 주요 기여, 선택 가능한 구현 사례와 구현 결과로 구성한다. 커밋 번호와 검증 과정, 남은 과제는 본문에 노출하지 않는다. 측정 근거가 없는 처리량·개선율·무손실 보장과 팀 전체 구현을 개인 기여로 확대하는 표현은 제외한다.

## 기간과 팀 구성

PDF 요약 인덱스보다 각 프로젝트 상세 페이지의 정확한 기간·인원을 적용했다. 승인한 시안의 내용을 실제 페이지에 반영하면서 기존 사이트의 오래된 기간도 함께 정정했다.

| 프로젝트 | PDF 상세 페이지 | 기간 | 팀 구성 |
| --- | --- | --- | --- |
| CheckMate | 18–22쪽 | 2025.04.14–2025.05.22 | BE 3 · FE 3 |
| 숨숨파인더 | 12–16쪽 | 2025.03.03–2025.04.11 | BE 4 · FE 2 |
| MyFairy | 6–10쪽 | 2025.01.13–2025.02.21 | BE 3 · FE 3 |

목록 순서는 사용자가 정한 K-HOPE → TlatFarm → CheckMate → 숨숨파인더 → MyFairy를 유지한다.

## CheckMate

저장소: https://github.com/CheckMate-6B/CheckMate (master)

- `648e8dea`: 파일별 AES-256-GCM, XOR 2-of-2 키 분할을 도입한 사용자 변경. ContractFileService/S3Service에서 원본·뷰어 분리, 파일 검사, 저장소 연결과 소유자 확인 흐름을 확인했다.
- `7219ec67`, `0f197865`: 페이지별 OCR 후처리, MySQL 일괄 저장, LLM 요약·MongoDB 보고서 연결, 기존 결과 확인, 요약만 재실행하는 BackgroundTasks 경로, LangChain/Tenacity 재시도. 이 사례는 본인이 담당했던 구현을 설명한다. 이후 팀의 Redis OCR 경로와 전체 RAG·분석·콜백 작업을 개인 기여로 합치지 않는다.
- `04e533d1`: Dropbox Sign 테스트 모드 요청, 요청 ID와 계약 연결, 웹훅 및 서명된 PDF 재저장. 이후 사용자 변경 `0823c5ce`–`14d2870c`와 HelloSignCallbackService에서 다운로드 가능한 이벤트, 완료 상태 확인, 뷰어 교체와 WebSocket 알림을 확인했다. `984b67db`에 알림 저장·전송 변경이 있다.
- `70d34b95`, `2fe9735c`: 뉴스 API와 캐시. NewsService/CacheConfig에서 contractNews 키, 20개 기사 조회, 빈 결과 제외, Redis JSON 직렬화와 1시간 TTL을 확인했다.

표현 범위: 서버가 복호화하므로 종단 간 암호화로 부르지 않는다. 여러 저장소의 원자성, 영구적인 파일 잔존 제거, 전자서명의 상용 운영, 웹훅의 정확히 한 번 처리나 필수 인증을 보장한다고 쓰지 않는다.

## 숨숨파인더

저장소: https://github.com/soom-ggaebi/ssFinder (main)

- `b5fe7f8a`, `3ee92d7f`: 수집·처리 코드와 작성 이력. detail_service.py의 SUMMARY/ID 결합과 API 간격 제어, kafka_consumer.py의 MySQL 전용 큐·건별 저장, 성공 콜백에서 ES/HDFS 후속 처리를 확인했다.
- image_processing.py: CLAHE, 언샤프 마스킹, 밝기·크기 처리와 JPEG 인코딩, S3/HDFS 업로드. geocoding.py: 주소 정제, VWorld 좌표 조회와 주소 캐시. color_matching.py: 동의어 및 RapidFuzz 매핑. PDF 16쪽과 함께 사용했다.
- FoundItemQueryBuilder/FoundItemElasticsearchQueryService 및 사용자 변경 `754e73fd` 이후: geo_bounding_box, 상태·출처·장소·날짜·분류·색상 필터, 지도용 좌표/목록 조회 분리, search_after, 페이지네이션, 북마크 여부 반영. 현재 확인한 구현은 지도 경계 기반이므로 이를 반경·키워드 검색으로 바꾸어 그리지 않는다.
- `72557d7c`, `2d1e40fe`, `cbb00248`: 비동기 검색 저장·재시도. 실제 즉시 처리 경로는 총 3회 시도이며 대기 시간은 1초·5초다. 복구 큐는 메모리 기반, 5분 주기·실행당 최대 20건·항목별 최대 5회다.
- `9cbd286e`: JOIN/CASE·Projection·점수 정렬·LIMIT 5를 적용한 AI 매칭 조회 변경.

표현 범위: MySQL은 건별 순차 저장이며 ES/HDFS가 배치 대상이다. 오프셋 커밋과 메모리 큐의 내구성 한계를 고려해 무손실·정합성 보장으로 표현하지 않는다. 측정 없이 N+1 완전 해소나 속도 개선 배수를 기재하지 않는다.

## MyFairy

저장소: https://github.com/TinkerBell-SSAFY/MyFairy (master)

- PDF 7–10쪽: Ubuntu/Jenkins, GitLab Webhook, Credentials, Docker Compose 원격 배포, Mattermost 알림, OpenVidu 자체 호스팅·포트 구성. 이는 사용자가 제공한 운영 경험이며 현재 저장소만으로 전체 Jenkins 운영을 독립 검증했다는 의미는 아니다.
- `225a1bb1`, `39b03b9b` 및 Nginx/Docker 설정: 화면 빌드·정적 서비스 분리, Linux 의존성·모듈 경로·Uvicorn 실행 명령. `/api/openvidu`는 현재 Spring backend:8080으로 전달된다. 미디어 전송 경로를 Nginx의 API 라우팅과 동일하게 표현하지 않는다.
- `706f2969`, `7858514d`, `569fc4ff`: 회원 API, 부분 수정, JWT loginId 추출, 비밀번호 검증·인코딩, 탈퇴 상태 변경.
- `cb8b2f41`: 로그인 이력 페이지 조회, MAX/SUM·CASE 집계 SQL, 일·주·월 접속 횟수와 최근 접속 조회, 부모용 KidTrack 화면 연동.

표현 범위: 회원 DB 트랜잭션을 S3 원자성으로 확대하지 않는다. 별도 검증 자료가 없는 무중단·자동 롤백 시간·지연 개선율·배포 실패 제로는 표시하지 않는다.
