import type { ProjectStory } from "../types/projectStory";

// Editorial sources and attribution boundaries: docs/PROJECT_SOURCES.md.
export const PROJECT_STORIES: Partial<Record<string, ProjectStory>> = {
  "sumsum-finder": {
    "title": "ssFinder · 숨숨파인더",
    "description": "공공 습득물 데이터를 모아 분실물 검색과 AI 매칭 결과를 제공하는 서비스",
    "responsibility": "공공 습득물 데이터를 수집·가공하고, 지도 검색과 AI 매칭 결과 조회로 연결하는 백엔드를 개발했습니다.",
    "technologies": [
      "Spring Boot",
      "Python",
      "Kafka",
      "Elasticsearch",
      "MySQL",
      "OpenCV",
      "S3",
      "HDFS"
    ],
    "image": "/artwork/ssfinder-detail.webp",
    "repository": "https://github.com/soom-ggaebi/ssFinder",
    "contributions": [
      {
        "title": "공공데이터 수집·저장",
        "text": "Kafka 메시지 결합, 상세 API 호출 간격 제어, MySQL 전용 저장 워커와 후속 색인·배치 저장을 구현했습니다."
      },
      {
        "title": "이미지·주소·색상 전처리",
        "text": "OpenCV 이미지 보정, 지오코딩과 주소 캐시, 색상 동의어·유사도 매핑으로 외부 데이터를 가공했습니다."
      },
      {
        "title": "지도·조건 검색",
        "text": "지도 표시 영역과 분류·색상·날짜·상태·출처 조건을 조합하고, 좌표 조회와 목록 조회를 분리했습니다."
      },
      {
        "title": "검색 갱신과 결과 조회",
        "text": "Elasticsearch 비동기 갱신·재시도, 검색 결과의 북마크 상태 반영, AI 매칭 상위 5건 조회를 구현했습니다."
      }
    ],
    "cases": [
      {
        "id": "pipeline",
        "label": "데이터 수집·저장",
        "title": "수집·가공·저장의 처리 속도를 분리하다",
        "context": "서로 다른 시점에 도착하는 데이터를 결합하고, 외부 API 호출과 DB 저장을 각각의 큐에서 처리했습니다.",
        "outcome": "메시지 결합, API 호출 간격 제어, MySQL 순차 저장을 연결했습니다. DB 저장에 성공한 데이터를 검색 색인과 후속 배치 저장으로 전달했습니다.",
        "defaultView": 1,
        "steps": [
          {
            "title": "요약과 ID를 관리번호로 연결",
            "text": "SUMMARY와 ID 메시지를 각각 보관하고 관리번호가 같은 두 데이터가 모두 준비되면 상세 조회 큐에 넣었습니다. 메시지가 도착하는 순서와 상세 조회 시점을 분리했습니다."
          },
          {
            "title": "외부 API 호출 간격을 별도로 제어",
            "text": "상세 API는 단일 워커가 요청 큐를 순서대로 처리하도록 구성했습니다. 이전 작업 완료 후 다음 호출까지 최소 1초 간격을 두어 내부 전처리와 외부 API의 처리 속도를 구분했습니다."
          },
          {
            "title": "전처리는 병렬로, MySQL 저장은 순서대로",
            "text": "이미지·위치·색상 전처리 후 결과를 MySQL 전용 큐에 넣었습니다. 전용 워커가 한 건씩 저장하고 커밋하도록 구성해 병렬 전처리가 동시 DB 쓰기로 이어지지 않게 했습니다."
          },
          {
            "title": "저장에 성공한 데이터를 검색·배치 저장으로 전달",
            "text": "MySQL 저장 성공 콜백에서 Elasticsearch Bulk와 HDFS 배치 저장을 연결했습니다. 검색 문서에는 MySQL ID를 사용해 원본 데이터와 검색 데이터를 연결했습니다."
          }
        ],
        "views": [
          {
            "title": "고려한 문제",
            "blocks": [
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "메시지 도착 시점의 차이",
                    "detail": "요약과 ID를 따로 수신"
                  },
                  {
                    "type": "node",
                    "title": "외부 API의 호출 간격",
                    "detail": "내부 전처리와 다른 속도"
                  },
                  {
                    "type": "node",
                    "title": "동시 DB 쓰기",
                    "detail": "병렬 처리와 저장 순서"
                  }
                ]
              }
            ]
          },
          {
            "title": "구현 방식",
            "blocks": [
              {
                "type": "label",
                "text": "수집 메시지 결합 → 상세 조회"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "요약 메시지",
                        "detail": "Kafka: SUMMARY"
                      },
                      {
                        "type": "node",
                        "title": "식별 정보 메시지",
                        "detail": "Kafka: ID"
                      }
                    ]
                  },
                  {
                    "type": "node",
                    "title": "관리번호 기준 결합",
                    "detail": "두 메시지가 모두 준비되면 큐에 추가",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "상세 API 전용 워커",
                    "detail": "완료 후 다음 호출까지 최소 1초",
                    "step": 1
                  }
                ]
              },
              {
                "type": "note",
                "text": "요약 + 상세 결과를 DETAIL 토픽으로 ↓"
              },
              {
                "type": "group",
                "title": "병렬 전처리 → 순차 저장",
                "items": [
                  {
                    "type": "flow",
                    "items": [
                      {
                        "type": "node",
                        "title": "상세 데이터 수신",
                        "detail": "Kafka: DETAIL"
                      },
                      {
                        "type": "node",
                        "title": "병렬 전처리",
                        "detail": "이미지 · 위치 · 색상",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "MySQL 전용 큐",
                        "detail": "단일 워커",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "MySQL 원본 저장",
                        "detail": "한 건씩 저장 · 커밋",
                        "step": 2
                      }
                    ]
                  }
                ]
              },
              {
                "type": "note",
                "text": "MySQL 저장 성공 후 ↓"
              },
              {
                "type": "split",
                "items": [
                  {
                    "type": "node",
                    "title": "검색 색인",
                    "detail": "Elasticsearch Bulk",
                    "step": 3
                  },
                  {
                    "type": "node",
                    "title": "후속 데이터 저장",
                    "detail": "HDFS 배치 저장",
                    "step": 3
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "preprocessing",
        "label": "데이터 전처리",
        "title": "서로 다른 형태의 공공데이터를 검색에 쓸 수 있게 정리하다",
        "context": "이미지는 서비스에 맞게 가공하고, 주소는 좌표로, 다양한 색상 표기는 공통 기준으로 변환했습니다.",
        "outcome": "이미지·좌표·색상 정보를 공통 형태로 가공해 습득물 데이터에 연결했습니다. 동일한 주소의 지오코딩 결과는 재사용하도록 구성했습니다.",
        "defaultView": 0,
        "steps": [
          {
            "title": "이미지의 대비·선명도와 크기 조정",
            "text": "OpenCV의 CLAHE와 언샤프 마스킹으로 이미지 대비와 선명도를 조정하고, 밝기 처리와 리사이징 후 JPEG로 인코딩했습니다. 입력 이미지가 후속 저장에 필요한 형태로 변환되도록 처리했습니다."
          },
          {
            "title": "주소 정제와 좌표 변환",
            "text": "주소의 특수문자와 공백을 정리한 뒤 지오코딩 API로 위·경도를 조회했습니다. 정제한 주소를 캐시 키로 사용해 같은 주소의 조회 결과를 재사용했습니다."
          },
          {
            "title": "색상 표기를 공통 목록으로 매핑",
            "text": "‘블랙’과 ‘검정’ 같은 동의어를 표준 색상으로 매핑했습니다. 사전에 없는 표현은 RapidFuzz 유사도 비교를 적용해 정해진 색상 목록에 연결했습니다."
          },
          {
            "title": "가공한 이미지와 메타데이터를 저장 흐름에 연결",
            "text": "가공 이미지를 S3와 HDFS에 업로드하고 이미지 주소·위치 좌표·색상을 습득물 데이터에 반영했습니다. 전처리 결과는 이후 MySQL 저장과 검색 색인에 사용하도록 연결했습니다."
          }
        ],
        "views": [
          {
            "title": "가공 흐름",
            "blocks": [
              {
                "type": "label",
                "text": "수집된 속성에 맞춰 전처리"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "공공 습득물 데이터",
                    "detail": "이미지 · 주소 · 색상"
                  },
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "이미지 보정·리사이징",
                        "detail": "CLAHE · 언샤프 마스킹",
                        "step": 0
                      },
                      {
                        "type": "node",
                        "title": "주소 정제·좌표 변환",
                        "detail": "지오코딩 · 주소 캐시",
                        "step": 1
                      },
                      {
                        "type": "node",
                        "title": "색상 표준화",
                        "detail": "동의어 사전 · 유사도 비교",
                        "step": 2
                      }
                    ]
                  },
                  {
                    "type": "node",
                    "title": "정제된 습득물 정보",
                    "detail": "이미지 경로 · 위경도 · 색상",
                    "step": 3
                  }
                ]
              }
            ]
          },
          {
            "title": "저장 연결",
            "blocks": [
              {
                "type": "label",
                "text": "전처리 결과를 습득물 데이터에 반영"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "가공 이미지",
                    "detail": "JPEG 인코딩",
                    "step": 0
                  },
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "S3",
                        "detail": "서비스용 이미지 주소",
                        "step": 3
                      },
                      {
                        "type": "node",
                        "title": "HDFS",
                        "detail": "후속 처리용 이미지 저장",
                        "step": 3
                      }
                    ]
                  },
                  {
                    "type": "node",
                    "title": "이미지 참조 정보",
                    "detail": "저장된 이미지 경로",
                    "step": 3
                  }
                ]
              },
              {
                "type": "group",
                "title": "원본 데이터에 정제한 속성을 결합",
                "items": [
                  {
                    "type": "flow",
                    "items": [
                      {
                        "type": "node",
                        "title": "주소 → 좌표",
                        "detail": "정제한 주소로 결과 캐시",
                        "step": 1
                      },
                      {
                        "type": "node",
                        "title": "색상 → 표준 값",
                        "detail": "동의어 · RapidFuzz",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "습득물 저장 흐름",
                        "detail": "이미지 주소 · 좌표 · 색상",
                        "step": 3
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "mapsearch",
        "label": "지도·조건 검색",
        "title": "지도에 보이는 좌표와 목록에 필요한 정보를 나누어 조회하다",
        "context": "지도 표시 범위 안의 습득물을 찾고, 사용자가 선택한 분류·색상·날짜 등의 조건을 Elasticsearch 쿼리로 조합했습니다.",
        "outcome": "지도 영역과 필터를 함께 적용하는 검색 API를 구현했습니다. 지도용 좌표 조회에는 필요한 필드만 선택하고, 목록에는 페이지네이션과 사용자별 북마크 상태를 반영했습니다.",
        "defaultView": 0,
        "steps": [
          {
            "title": "현재 지도 범위 안의 데이터 검색",
            "text": "지도의 위·경도 경계값을 geo_bounding_box 조건으로 구성했습니다. 현재 화면에 해당하는 위치 범위로 검색 대상을 제한하도록 구현했습니다."
          },
          {
            "title": "선택된 조건을 동적으로 조합",
            "text": "상태·출처·보관 장소·습득 날짜·대분류·소분류·색상 중 입력된 조건을 Bool 쿼리에 추가했습니다. 지도 위치와 속성 조건을 함께 적용하도록 구성했습니다."
          },
          {
            "title": "지도에는 식별자와 좌표를 제공",
            "text": "클러스터 표시용 조회는 MySQL ID·위도·경도만 선택했습니다. search_after를 사용해 정렬된 결과의 다음 묶음을 이어서 조회하는 경로를 구현했습니다."
          },
          {
            "title": "목록에는 요약 정보와 북마크 상태를 제공",
            "text": "목록 응답에는 이미지·분류·이름·위치 등의 필드를 선택하고 페이지네이션을 적용했습니다. 조회한 아이템 ID의 북마크 여부를 함께 조회해 사용자별 상태를 응답에 반영했습니다."
          }
        ],
        "views": [
          {
            "title": "검색 조건",
            "blocks": [
              {
                "type": "label",
                "text": "현재 지도 범위에 속성 조건을 더하기"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "지도 경계값",
                    "detail": "위·경도 최대·최솟값",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "위치 범위 쿼리",
                    "detail": "geo_bounding_box",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "선택된 속성 조건",
                    "detail": "분류 · 색상 · 날짜 · 상태 · 출처",
                    "step": 1
                  }
                ]
              },
              {
                "type": "group",
                "title": "검색 결과를 화면 기능으로 연결",
                "items": [
                  {
                    "type": "split",
                    "items": [
                      {
                        "type": "node",
                        "title": "지도·클러스터용 좌표",
                        "detail": "식별자 · 위도 · 경도",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "상세 목록",
                        "detail": "페이지네이션 · 북마크 상태",
                        "step": 3
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "title": "응답 구성",
            "blocks": [
              {
                "type": "label",
                "text": "화면에서 필요한 정보에 따라 응답 분리"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "Elasticsearch 검색",
                    "detail": "지도 범위 + 선택 조건",
                    "step": 1
                  },
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "지도용 좌표 조회",
                        "detail": "ID · 위도 · 경도만 선택",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "페이지 단위 목록 조회",
                        "detail": "이미지 · 이름 · 분류 · 위치",
                        "step": 3
                      }
                    ]
                  },
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "다음 좌표 묶음 조회",
                        "detail": "search_after",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "사용자별 상태 반영",
                        "detail": "조회 목록의 북마크 여부",
                        "step": 3
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "search",
        "label": "검색 갱신·재시도",
        "title": "원본 저장과 검색 갱신의 실패 경로를 나누다",
        "context": "MySQL 원본과 Elasticsearch 검색 문서를 분리하고, 검색 저장 실패를 재시도와 복구 작업으로 연결했습니다.",
        "outcome": "검색 문서 갱신을 별도 실행기에서 처리하고, 지연 재시도 후에도 실패한 저장 요청은 메모리 복구 큐에서 주기적으로 다시 처리하도록 구현했습니다.",
        "defaultView": 1,
        "steps": [
          {
            "title": "원본 데이터와 검색 문서를 분리",
            "text": "MySQL에 업무 데이터를 저장하고 Elasticsearch 갱신은 별도 실행기에 맡겼습니다. MySQL ID를 검색 문서 ID로 사용해 두 저장소의 데이터를 연결했습니다."
          },
          {
            "title": "일시적인 실패는 간격을 두고 재시도",
            "text": "검색 문서 저장이 실패하면 1초, 이후 5초를 기다려 다시 시도합니다. 최초 요청을 포함한 세 번의 시도 안에서 일시적인 장애에 대응하도록 구성했습니다."
          },
          {
            "title": "반복 실패한 저장 요청을 복구 큐로 전달",
            "text": "세 번의 저장 시도가 모두 실패하면 대상 문서를 메모리 복구 큐에 추가했습니다. 즉시 재시도와 주기적인 복구 작업을 서로 다른 경로로 나눴습니다."
          },
          {
            "title": "복구 작업의 주기와 처리량을 제한",
            "text": "5분마다 실행되는 작업에서 최대 20건을 꺼내 처리하고, 항목별 복구 시도는 최대 5회로 제한했습니다. 실패 요청이 한 번에 다시 몰리지 않도록 처리 범위를 정했습니다."
          }
        ],
        "views": [
          {
            "title": "고려한 문제",
            "blocks": [
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "원본 데이터 저장",
                    "detail": "MySQL에 반영"
                  },
                  {
                    "type": "node",
                    "title": "검색 갱신 실패",
                    "detail": "검색 저장소의 일시 장애"
                  },
                  {
                    "type": "node",
                    "title": "검색 결과 반영 지연",
                    "detail": "원본과 검색 문서의 차이"
                  }
                ]
              }
            ]
          },
          {
            "title": "구현 방식",
            "blocks": [
              {
                "type": "label",
                "text": "원본 저장과 검색 갱신 분리"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "MySQL 원본",
                    "detail": "업무 데이터"
                  },
                  {
                    "type": "node",
                    "title": "비동기 검색 갱신",
                    "detail": "별도 실행기",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "Elasticsearch 문서",
                    "detail": "문서 ID = MySQL ID"
                  }
                ]
              },
              {
                "type": "group",
                "title": "검색 문서 저장 실패 시",
                "items": [
                  {
                    "type": "flow",
                    "items": [
                      {
                        "type": "node",
                        "title": "1차 저장 시도",
                        "detail": "최초 요청",
                        "step": 1
                      },
                      {
                        "type": "node",
                        "title": "2차 저장 시도",
                        "detail": "재시도",
                        "step": 1
                      },
                      {
                        "type": "node",
                        "title": "3차 저장 시도",
                        "detail": "재시도",
                        "step": 1
                      }
                    ],
                    "labels": [
                      "실패 · 1초",
                      "실패 · 5초"
                    ]
                  },
                  {
                    "type": "note",
                    "text": "반복 실패한 저장 요청 ↓"
                  },
                  {
                    "type": "flow",
                    "items": [
                      {
                        "type": "node",
                        "title": "메모리 복구 큐",
                        "detail": "실패 문서 보관",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "주기적 복구 작업",
                        "detail": "5분마다 · 실행당 최대 20건",
                        "step": 3
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "matching",
        "label": "AI 매칭 결과 조회",
        "title": "화면에 필요한 상위 5건을 DB에서 조회하다",
        "context": "매칭 엔티티와 연관 객체를 순회하던 조회를 JOIN과 Projection 기반으로 변경했습니다.",
        "outcome": "점수 정렬과 상위 5건 제한을 DB 쿼리에 적용했습니다. 대·소분류와 데이터 출처를 함께 조회해 화면에 필요한 응답을 구성했습니다.",
        "defaultView": 1,
        "steps": [
          {
            "title": "필요한 데이터를 JOIN으로 조회",
            "text": "매칭 결과, 습득물, 분류 정보를 JOIN하고 필요한 열을 선택했습니다. 엔티티를 조회한 뒤 연관 객체를 순회하던 응답 조립 경로를 쿼리 중심으로 바꿨습니다."
          },
          {
            "title": "점수 정렬과 상위 5건 제한을 DB에 적용",
            "text": "매칭 점수 내림차순 정렬과 LIMIT 5를 쿼리에 적용했습니다. 화면에서 보여줄 상위 결과를 DB 조회 단계에서 제한했습니다."
          },
          {
            "title": "분류와 출처를 Projection으로 받기",
            "text": "분류 계층의 JOIN·CASE 처리로 대·소분류를 구성하고, 관리번호 유무에 따른 데이터 출처를 함께 조회했습니다. 필요한 필드는 인터페이스 Projection으로 받았습니다."
          },
          {
            "title": "AI 결과를 사용자가 볼 수 있는 응답으로 연결",
            "text": "조회한 이름·이미지·위치·분류·점수를 DTO로 변환해 반환했습니다. AI가 계산한 매칭 결과를 사용자의 검색 기능으로 제공하는 조회 API를 구현했습니다."
          }
        ],
        "views": [
          {
            "title": "변경 전",
            "blocks": [
              {
                "type": "label",
                "text": "엔티티 조회 후 응답 조립"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "매칭 엔티티 조회",
                    "detail": "점수순 목록"
                  },
                  {
                    "type": "node",
                    "title": "연관 객체 순회",
                    "detail": "습득물 · 사용자 · 분류"
                  },
                  {
                    "type": "node",
                    "title": "응답 조립",
                    "detail": "필요한 필드 추출"
                  }
                ]
              }
            ]
          },
          {
            "title": "변경 후",
            "blocks": [
              {
                "type": "label",
                "text": "화면에 필요한 데이터를 쿼리에서 구성"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "필요한 열 JOIN",
                    "detail": "매칭 · 습득물 · 분류",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "DB에서 정렬·제한",
                    "detail": "점수 내림차순 · LIMIT 5",
                    "step": 1
                  },
                  {
                    "type": "node",
                    "title": "Projection 조회",
                    "detail": "대·소분류 · 데이터 출처",
                    "step": 2
                  },
                  {
                    "type": "node",
                    "title": "화면용 응답",
                    "detail": "상위 5건 DTO",
                    "step": 3
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "checkmate": {
    "title": "CheckMate",
    "description": "업로드한 계약서를 열람하고, OCR과 LLM으로 계약 내용을 분석·요약하는 서비스",
    "responsibility": "민감한 계약서의 업로드·열람·요약·전자서명 흐름을 개발하고, 외부 서비스 결과가 계약서 데이터와 사용자 알림으로 이어지도록 연결했습니다.",
    "technologies": [
      "Spring Boot",
      "Python",
      "FastAPI",
      "LangChain",
      "MySQL",
      "MongoDB",
      "Redis",
      "S3"
    ],
    "image": "/artwork/checkmate-detail.webp",
    "repository": "https://github.com/CheckMate-6B/CheckMate",
    "contributions": [
      {
        "title": "계약서 업로드·관리",
        "text": "파일 검사와 PDF 변환·병합, 원본·뷰어 암호화, 키 분리 보관, 소유자 확인 후 열람·다운로드를 구현했습니다."
      },
      {
        "title": "OCR·LLM 요약 연계",
        "text": "페이지별 후처리·저장, 백그라운드 요약 처리, 기존 결과 확인과 재사용, 모델 호출 실패 시 재시도를 구현했습니다."
      },
      {
        "title": "전자서명·웹훅",
        "text": "Dropbox Sign 테스트 환경에서 서명 요청과 완료 이벤트를 연결하고, 서명된 PDF의 재저장·계약 상태 갱신·사용자 알림을 구현했습니다."
      },
      {
        "title": "외부 정보 조회·캐싱",
        "text": "계약 관련 뉴스 조회 API에 Redis 캐시와 만료 시간을 적용해 반복 요청에서 외부 응답을 재사용하도록 구성했습니다."
      }
    ],
    "cases": [
      {
        "id": "security",
        "label": "계약서 저장·열람",
        "title": "계약서 파일과 복호화 키의 보관 위치를 나누다",
        "context": "원본과 뷰어 PDF를 각각 암호화하고, 키를 두 저장소에 분리해 소유자 확인 후 열람하도록 구현했습니다.",
        "outcome": "원본·뷰어 파일별 암호화와 키 분리 보관을 구현했습니다. 계약서 소유자를 확인한 뒤 서버에서 키를 복원하고 PDF를 제공하도록 저장과 열람을 연결했습니다.",
        "defaultView": 0,
        "steps": [
          {
            "title": "원본과 뷰어 PDF를 별도로 관리",
            "text": "확장자·파일 크기·악성코드 검사를 거친 원본을 저장하고, PDF 변환·병합으로 만든 뷰어 파일도 별도로 저장했습니다. 보관할 원본과 화면에서 열람할 파일의 처리 흐름을 나눴습니다."
          },
          {
            "title": "파일마다 새로운 키로 암호화",
            "text": "각 원본과 뷰어 PDF에 독립적인 256비트 키와 랜덤 IV를 생성했습니다. AES-256-GCM으로 암호화한 파일은 S3에 저장하도록 구성했습니다."
          },
          {
            "title": "두 조각이 모두 있어야 키를 복원",
            "text": "랜덤 조각 A와 B = K XOR A를 만들어 MySQL과 MongoDB에 나누어 저장했습니다. 파일 ID로 두 조각을 연결하고, A XOR B로 원래 키를 복원하는 2-of-2 키 분할을 구현했습니다."
          },
          {
            "title": "소유자 확인 후 서버에서 복호화",
            "text": "뷰어 요청 시 계약서 소유자를 확인하고 두 저장소에서 키 조각을 조회했습니다. 서버가 복원한 키로 S3 파일을 복호화한 뒤 PDF 응답으로 제공하도록 구성했습니다."
          }
        ],
        "views": [
          {
            "title": "저장 구조",
            "blocks": [
              {
                "type": "split",
                "items": [
                  {
                    "type": "node",
                    "title": "원본 파일",
                    "detail": "확장자·크기·악성코드 검사 후 저장"
                  },
                  {
                    "type": "node",
                    "title": "뷰어 PDF",
                    "detail": "원본을 변환·병합해 별도 저장"
                  }
                ]
              },
              {
                "type": "label",
                "text": "각 파일을 독립적인 키로 암호화"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "원본 또는 뷰어 PDF",
                    "detail": "두 파일의 저장 흐름 분리",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "AES-256-GCM 암호화",
                    "detail": "파일별 새 키 · 랜덤 IV",
                    "step": 1
                  },
                  {
                    "type": "node",
                    "title": "S3",
                    "detail": "암호문 보관"
                  }
                ]
              },
              {
                "type": "group",
                "title": "암호화 키를 나누어 보관",
                "items": [
                  {
                    "type": "flow",
                    "items": [
                      {
                        "type": "node",
                        "title": "파일별 256비트 키",
                        "detail": "원본·뷰어 각각 생성",
                        "step": 1
                      },
                      {
                        "type": "node",
                        "title": "두 조각으로 분할",
                        "detail": "A = 랜덤 · B = K XOR A",
                        "step": 2
                      },
                      {
                        "type": "stack",
                        "items": [
                          {
                            "type": "node",
                            "title": "MySQL",
                            "detail": "조각 A · IV · 파일 정보",
                            "step": 2
                          },
                          {
                            "type": "node",
                            "title": "MongoDB",
                            "detail": "조각 B · 동일 파일 ID",
                            "step": 2
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "title": "열람 흐름",
            "blocks": [
              {
                "type": "label",
                "text": "계약서 소유자의 뷰어 요청"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "소유자 확인",
                    "detail": "요청 사용자와 계약서 소유자",
                    "step": 3
                  },
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "MySQL",
                        "detail": "파일 ID · IV · 키 조각 A"
                      },
                      {
                        "type": "node",
                        "title": "MongoDB",
                        "detail": "동일 파일 ID · 키 조각 B"
                      }
                    ]
                  },
                  {
                    "type": "node",
                    "title": "서버에서 키 복원",
                    "detail": "K = A XOR B",
                    "step": 3
                  }
                ]
              },
              {
                "type": "group",
                "title": "복원한 키로 파일 제공",
                "items": [
                  {
                    "type": "flow",
                    "items": [
                      {
                        "type": "node",
                        "title": "S3 암호문 조회",
                        "detail": "뷰어 PDF"
                      },
                      {
                        "type": "node",
                        "title": "서버에서 복호화",
                        "detail": "복원한 키 + IV",
                        "step": 3
                      },
                      {
                        "type": "node",
                        "title": "PDF 응답",
                        "detail": "소유자에게 제공"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "ocr",
        "label": "OCR·요약 데이터 연결",
        "title": "OCR 후처리부터 요약 저장·재사용까지 연결하다",
        "context": "페이지별 텍스트를 저장하고 백그라운드에서 요약을 생성했습니다. 기존 결과를 확인하는 분기와 모델 호출 재시도도 구현했습니다.",
        "outcome": "페이지별 OCR 결과와 계약서별 요약 저장을 연결했습니다. 기존 OCR을 활용해 요약만 수행하는 경로와 모델 호출 실패 시 지연 재시도를 구현했습니다.",
        "defaultView": 0,
        "steps": [
          {
            "title": "OCR 결과를 페이지 단위로 후처리",
            "text": "OCR 원시 응답을 페이지 번호와 정리된 본문으로 구성했습니다. 페이지별 텍스트를 저장하거나 전체 계약서의 요약 입력으로 사용할 수 있도록 결과 형식을 정리했습니다."
          },
          {
            "title": "정리한 OCR 텍스트를 일괄 저장",
            "text": "계약서 ID·페이지 번호·OCR 텍스트를 묶어 MySQL에 일괄 저장하는 처리를 연결했습니다. 계약서와 페이지 기준으로 텍스트를 구분해 관리하도록 구현했습니다."
          },
          {
            "title": "페이지 본문을 LLM 요약 입력으로 연결",
            "text": "후처리한 페이지 본문을 모아 요약 생성 함수에 전달했습니다. OCR 호출 결과가 텍스트 정리와 LLM 요약으로 이어지도록 처리 흐름을 연결했습니다."
          },
          {
            "title": "계약서·분석 보고서·요약을 연결해 저장",
            "text": "MongoDB의 분석 보고서에 계약서 ID를 기록하고, 요약 보고서는 분석 보고서 ID를 참조하도록 연결했습니다. 생성된 요약이 어느 계약서의 결과인지 추적할 수 있도록 구성했습니다."
          }
        ],
        "views": [
          {
            "title": "처리 흐름",
            "blocks": [
              {
                "type": "label",
                "text": "OCR 결과를 페이지별 텍스트로 정리"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "OCR 원시 결과",
                    "detail": "외부 OCR 응답"
                  },
                  {
                    "type": "node",
                    "title": "페이지별 후처리",
                    "detail": "페이지 번호 · 정리한 본문",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "MySQL에 일괄 저장",
                    "detail": "계약서별 OCR 텍스트",
                    "step": 1
                  }
                ]
              },
              {
                "type": "group",
                "title": "정리된 본문을 요약 보고서로 연결",
                "items": [
                  {
                    "type": "flow",
                    "items": [
                      {
                        "type": "node",
                        "title": "페이지 본문 결합",
                        "detail": "정리한 텍스트",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "LLM 요약 생성",
                        "detail": "요약 함수 호출",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "MongoDB 보고서 저장",
                        "detail": "계약서 · 분석 · 요약 연결",
                        "step": 3
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "title": "재사용·재시도",
            "blocks": [
              {
                "type": "label",
                "text": "저장된 결과에 따라 실행할 작업 선택"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "계약서 ID로 결과 확인",
                    "detail": "OCR · 요약 존재 여부",
                    "step": 0
                  },
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "OCR·요약 모두 있음",
                        "detail": "기존 결과 사용",
                        "step": 0
                      },
                      {
                        "type": "node",
                        "title": "OCR만 있음",
                        "detail": "저장된 본문으로 요약만 실행",
                        "step": 1
                      },
                      {
                        "type": "node",
                        "title": "OCR도 없음",
                        "detail": "OCR·후처리부터 실행",
                        "step": 1
                      }
                    ]
                  },
                  {
                    "type": "node",
                    "title": "백그라운드 작업",
                    "detail": "요청에는 접수 응답",
                    "step": 1
                  }
                ]
              },
              {
                "type": "group",
                "title": "요약 호출의 실패 대응과 저장",
                "items": [
                  {
                    "type": "flow",
                    "items": [
                      {
                        "type": "node",
                        "title": "LLM 요약 호출",
                        "detail": "LangChain",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "오류·빈 응답 재시도",
                        "detail": "지수 백오프 · 총 3회까지",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "MongoDB 요약 저장",
                        "detail": "계약서의 분석 보고서와 연결",
                        "step": 3
                      }
                    ]
                  }
                ]
              }
            ],
            "steps": [
              {
                "title": "기존 OCR·요약 결과를 먼저 확인",
                "text": "계약서 ID로 저장된 OCR과 요약 결과의 존재 여부를 확인하는 분기를 구현했습니다. 두 결과가 이미 있으면 새 작업을 시작하지 않고 완료 상태를 반환하도록 연결했습니다."
              },
              {
                "title": "OCR 결과가 있으면 요약 단계만 실행",
                "text": "OCR 텍스트는 있지만 요약이 없는 경우 저장된 페이지 본문을 읽어 요약 작업에 전달했습니다. 요청에는 접수 응답을 반환하고 BackgroundTasks에서 요약을 실행하도록 구성했습니다."
              },
              {
                "title": "빈 응답과 호출 오류에 지연 재시도 적용",
                "text": "LangChain의 요약 호출에 Tenacity 재시도를 적용했습니다. 빈 요약도 실패로 처리하고, 지수 백오프로 최초 호출을 포함해 최대 세 번 시도하도록 구성했습니다."
              },
              {
                "title": "생성 결과를 계약서별 보고서로 저장",
                "text": "정리한 본문을 요약한 뒤 분석 보고서 ID와 연결해 MongoDB에 저장했습니다. OCR 처리 결과를 다음 작업과 이후 조회에 활용할 수 있는 데이터로 관리하도록 구현했습니다."
              }
            ]
          }
        ]
      },
      {
        "id": "signature",
        "label": "전자서명·웹훅",
        "title": "외부 전자서명 결과를 계약서 상태와 파일에 반영하다",
        "context": "Dropbox Sign 테스트 환경에서 서명 요청부터 웹훅 수신, 서명된 파일 저장과 완료 알림까지 연결했습니다.",
        "outcome": "서명 요청 ID와 계약서를 연결하고, PDF를 받을 수 있는 완료 이벤트에 맞춰 계약 상태·뷰어 파일·사용자 알림을 갱신하는 흐름을 구현했습니다.",
        "defaultView": 1,
        "steps": [
          {
            "title": "열람 권한을 확인한 계약서로 서명 요청",
            "text": "계약서 소유자 확인 후 뷰어 PDF를 복호화하고 서명자 정보와 함께 Dropbox Sign에 전달했습니다. 테스트 모드에서 외부 전자서명 API 연동을 구현했습니다."
          },
          {
            "title": "외부 요청 ID와 내부 계약서 연결",
            "text": "응답으로 받은 signature_request_id를 계약서에 저장하고 서명 상태를 대기로 변경했습니다. 이후 웹훅 이벤트가 어느 계약서에 해당하는지 찾을 수 있도록 연결했습니다."
          },
          {
            "title": "PDF를 받을 수 있는 완료 이벤트 처리",
            "text": "signature_request_downloadable 이벤트를 처리하고 요청 ID로 계약서를 조회했습니다. 이미 완료 상태인 계약서는 다시 처리하지 않도록 상태 확인을 추가했습니다."
          },
          {
            "title": "서명된 PDF 재저장과 상태·알림 갱신",
            "text": "서명된 PDF를 내려받아 다시 암호화해 저장하고 기존 뷰어를 교체했습니다. 계약의 완료 상태와 서명 시각을 기록하고, 완료 알림과 읽지 않은 알림 수를 WebSocket으로 전달하도록 연결했습니다."
          }
        ],
        "views": [
          {
            "title": "서명 요청",
            "blocks": [
              {
                "type": "label",
                "text": "Dropbox Sign 테스트 환경의 요청 흐름"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "계약서 소유자 확인",
                    "detail": "뷰어 PDF 복호화",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "서명 요청 전송",
                    "detail": "PDF + 서명자 정보",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "요청 ID 저장",
                    "detail": "계약서 연결 · PENDING 상태",
                    "step": 1
                  }
                ]
              }
            ]
          },
          {
            "title": "완료 이벤트",
            "blocks": [
              {
                "type": "label",
                "text": "PDF 다운로드 가능한 이벤트 수신"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "서명 완료 웹훅",
                    "detail": "signature_request_downloadable",
                    "step": 2
                  },
                  {
                    "type": "node",
                    "title": "계약서·상태 확인",
                    "detail": "요청 ID 조회 · 완료 건 제외",
                    "step": 2
                  },
                  {
                    "type": "node",
                    "title": "서명된 PDF 다운로드",
                    "detail": "외부 서명 결과",
                    "step": 3
                  }
                ]
              },
              {
                "type": "group",
                "title": "파일과 서비스 상태에 완료 결과 반영",
                "items": [
                  {
                    "type": "flow",
                    "items": [
                      {
                        "type": "node",
                        "title": "암호화 후 뷰어 교체",
                        "detail": "S3 · 키 조각 분리 저장",
                        "step": 3
                      },
                      {
                        "type": "node",
                        "title": "계약 상태 갱신",
                        "detail": "COMPLETED · 서명 시각",
                        "step": 3
                      },
                      {
                        "type": "node",
                        "title": "사용자 알림 전송",
                        "detail": "WebSocket · 읽지 않은 알림 수",
                        "step": 3
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "newscache",
        "label": "외부 API 캐싱",
        "title": "반복되는 뉴스 조회에서 외부 API 응답을 재사용하다",
        "context": "계약 관련 뉴스 조회에 Redis 캐시를 적용하고, 만료 후에는 외부 API에서 결과를 다시 가져오도록 구성했습니다.",
        "outcome": "캐시가 유효한 동안 저장된 뉴스 응답을 반환하도록 구현했습니다. 빈 결과는 캐싱하지 않고, 1시간 만료 설정으로 이후 요청에서 새 결과를 조회하도록 구성했습니다.",
        "defaultView": 0,
        "steps": [
          {
            "title": "반복 조회를 하나의 캐시 키로 연결",
            "text": "‘계약’ 키워드의 뉴스 조회에 Spring Cache의 @Cacheable을 적용했습니다. 동일한 조회 결과를 contractNews 키로 재사용하도록 구성했습니다."
          },
          {
            "title": "캐시가 없을 때 외부 API 호출",
            "text": "저장된 응답이 없으면 네이버 뉴스 API에서 계약 관련 기사 20건을 조회했습니다. 외부 응답을 서비스의 뉴스 응답 DTO로 변환해 반환했습니다."
          },
          {
            "title": "빈 결과는 캐시에 넣지 않음",
            "text": "null이거나 기사 목록이 비어 있는 결과는 캐싱 대상에서 제외했습니다. 다음 요청에서 외부 API를 다시 조회할 수 있도록 조건을 적용했습니다."
          },
          {
            "title": "1시간 만료와 JSON 직렬화 설정",
            "text": "RedisCacheManager에 1시간 TTL과 JSON 직렬화를 적용했습니다. 캐시가 만료된 뒤 들어오는 요청은 외부 API에서 결과를 갱신하도록 구성했습니다."
          }
        ],
        "views": [
          {
            "title": "캐시 조회",
            "blocks": [
              {
                "type": "label",
                "text": "계약 관련 뉴스 조회"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "뉴스 조회 요청",
                    "detail": "contractNews 키",
                    "step": 0
                  },
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "캐시 있음",
                        "detail": "저장된 응답 반환",
                        "step": 0
                      },
                      {
                        "type": "node",
                        "title": "캐시 없음",
                        "detail": "네이버 뉴스 API 조회",
                        "step": 1
                      }
                    ]
                  },
                  {
                    "type": "node",
                    "title": "조회 결과 반환",
                    "detail": "유효한 결과만 캐시 저장",
                    "step": 2
                  }
                ]
              }
            ]
          },
          {
            "title": "갱신 정책",
            "blocks": [
              {
                "type": "label",
                "text": "결과와 만료 시간에 따른 재조회"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "뉴스 API 응답",
                    "detail": "계약 관련 기사 20건",
                    "step": 1
                  },
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "유효한 결과",
                        "detail": "Redis에 저장",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "null·빈 기사 목록",
                        "detail": "캐시 대상에서 제외",
                        "step": 2
                      }
                    ]
                  },
                  {
                    "type": "node",
                    "title": "다음 요청에서 조회",
                    "detail": "1시간 TTL 이후 갱신",
                    "step": 3
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "my-fairy": {
    "title": "MyFairy",
    "description": "아이가 그린 그림을 바탕으로 동화를 생성하고 읽어주는 서비스",
    "responsibility": "서비스 배포·실행 환경을 구성하고, 회원 기능과 부모용 화면의 API 연결을 개발했습니다.",
    "technologies": [
      "Spring Boot",
      "Jenkins",
      "Docker Compose",
      "Nginx",
      "OpenVidu",
      "MySQL",
      "S3"
    ],
    "image": "/artwork/myfairy-detail.webp",
    "repository": "https://github.com/TinkerBell-SSAFY/MyFairy",
    "contributions": [
      {
        "title": "배포 자동화",
        "text": "Ubuntu 서버와 Jenkins를 구성하고 GitLab Webhook 기반 빌드, Docker Compose 배포, Mattermost 알림을 연결했습니다."
      },
      {
        "title": "실시간 서비스 운영 환경",
        "text": "OpenVidu 자체 호스팅과 포트 구성을 담당하고, Nginx HTTPS 진입점에서 화면·API·WebSocket 경로를 구분했습니다."
      },
      {
        "title": "컨테이너 실행 환경",
        "text": "프론트엔드 빌드와 정적 서비스 역할을 나누고, Python의 Linux 의존성·모듈 경로·실행 명령을 정의했습니다."
      },
      {
        "title": "회원·사용자 기능",
        "text": "회원 조회·부분 수정·탈퇴·프로필·비밀번호 변경을 구현하고, 부모용 페이지에 접속 기록과 일·주·월 집계 조회를 연결했습니다."
      }
    ],
    "cases": [
      {
        "id": "deployment",
        "label": "빌드·배포 자동화",
        "title": "여러 서비스의 빌드와 배포를 하나의 작업 흐름으로 연결하다",
        "context": "잦은 배포에서 반복되는 작업을 줄이기 위해 GitLab 변경 감지부터 Jenkins 빌드, 컨테이너 배포와 알림까지 구성했습니다.",
        "outcome": "GitLab Webhook·Jenkins·Docker Compose를 연결해 서비스 배포 절차를 자동화했습니다. 자격 증명 관리와 배포 결과 알림도 함께 구성했습니다.",
        "defaultView": 0,
        "steps": [
          {
            "title": "코드 변경으로 빌드 시작",
            "text": "GitLab Webhook을 Jenkins의 빌드 트리거와 연결했습니다. 코드 변경 이후 빌드·배포 작업을 시작하는 흐름을 구성했습니다."
          },
          {
            "title": "Jenkins에서 서비스 빌드 실행",
            "text": "Jenkins에 파이프라인을 구성하고 필요한 자격 증명을 Credentials로 관리했습니다. 여러 서비스의 빌드와 배포 명령을 실행하는 환경을 마련했습니다."
          },
          {
            "title": "Docker Compose로 서비스 배포",
            "text": "Docker Compose의 원격 실행으로 여러 컨테이너를 배포하도록 구성했습니다. Nginx 라우팅과 각 서비스 실행 환경을 함께 관리했습니다."
          },
          {
            "title": "배포 결과를 협업 채널에 전달",
            "text": "Mattermost 배포 알림을 연결해 팀이 배포 결과를 확인할 수 있도록 구성했습니다. 반복되는 배포 절차와 결과 확인을 하나의 흐름으로 묶었습니다."
          }
        ],
        "views": [
          {
            "title": "배포 흐름",
            "blocks": [
              {
                "type": "label",
                "text": "코드 변경에서 배포 결과 확인까지"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "GitLab Webhook",
                    "detail": "변경 감지 · 빌드 트리거",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "Jenkins",
                    "detail": "빌드·배포 작업 실행",
                    "step": 1
                  },
                  {
                    "type": "node",
                    "title": "Docker Compose",
                    "detail": "원격 컨테이너 배포",
                    "step": 2
                  },
                  {
                    "type": "node",
                    "title": "Mattermost",
                    "detail": "배포 결과 알림",
                    "step": 3
                  }
                ]
              }
            ]
          },
          {
            "title": "운영 구성",
            "blocks": [
              {
                "type": "label",
                "text": "배포에 필요한 설정과 결과 공유"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "Jenkins Credentials",
                    "detail": "배포 자격 증명 관리",
                    "step": 1
                  },
                  {
                    "type": "node",
                    "title": "Docker Compose",
                    "detail": "여러 서비스의 실행 정의",
                    "step": 2
                  },
                  {
                    "type": "node",
                    "title": "Mattermost 알림",
                    "detail": "팀에 배포 결과 공유",
                    "step": 3
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "runtime",
        "label": "요청 라우팅·실행 환경",
        "title": "화면과 Java·Python API를 하나의 진입점으로 연결하다",
        "context": "Nginx에서 서비스별 요청 경로를 구분하고, Python 서비스의 의존성과 실행 명령을 컨테이너에 정의했습니다.",
        "outcome": "HTTPS 진입점에서 정적 화면·Spring API·FastAPI·WebSocket 경로를 분리했습니다. Python 서비스를 Linux 컨테이너에서 실행할 수 있도록 환경을 구성했습니다.",
        "defaultView": 0,
        "steps": [
          {
            "title": "Nginx를 HTTPS 진입점으로 구성",
            "text": "443 포트에 인증서를 적용하고 경로별로 내부 서비스에 요청을 전달하도록 구성했습니다. React 빌드 산출물은 Nginx에서 직접 제공하고 SPA 경로의 fallback도 설정했습니다."
          },
          {
            "title": "백엔드 API 요청을 Spring으로 전달",
            "text": "/api와 /api/openvidu 요청을 Spring Boot 서비스로 전달하도록 설정했습니다. API 경로와 내부 서비스 주소를 Nginx에서 연결했습니다."
          },
          {
            "title": "WebSocket 연결 전환 설정",
            "text": "/ws 경로에 HTTP/1.1과 Upgrade·Connection 헤더를 적용했습니다. WebSocket 연결 전환 요청이 Spring Boot로 전달되도록 설정했습니다."
          },
          {
            "title": "Python API를 별도 서비스로 연결",
            "text": "/api/ai 요청은 FastAPI 서비스로 전달하도록 구성했습니다. 같은 도메인으로 들어오는 요청을 Java와 Python 서비스에 나누어 연결했습니다."
          }
        ],
        "views": [
          {
            "title": "요청 라우팅",
            "blocks": [
              {
                "type": "label",
                "text": "경로에 따라 내부 서비스로 요청 전달"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "브라우저",
                    "detail": "HTTP → HTTPS"
                  },
                  {
                    "type": "node",
                    "title": "Nginx :443",
                    "detail": "TLS · 경로별 라우팅",
                    "step": 0
                  },
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "화면·정적 파일",
                        "detail": "React 산출물 · SPA fallback",
                        "step": 0
                      },
                      {
                        "type": "node",
                        "title": "/api · /api/openvidu",
                        "detail": "Spring Boot · backend:8080",
                        "step": 1
                      },
                      {
                        "type": "node",
                        "title": "/ws",
                        "detail": "Spring Boot · HTTP/1.1 + Upgrade",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "/api/ai",
                        "detail": "FastAPI · ai:8000",
                        "step": 3
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "title": "실행 환경",
            "blocks": [
              {
                "type": "label",
                "text": "화면 빌드와 서비스 역할 분리"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "Node 빌드",
                    "detail": "React 프로젝트",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "정적 산출물",
                    "detail": "dist"
                  },
                  {
                    "type": "node",
                    "title": "Nginx 정적 서비스",
                    "detail": "화면 · 리소스 제공",
                    "step": 0
                  }
                ]
              },
              {
                "type": "group",
                "title": "Python 서비스의 컨테이너 실행 환경",
                "items": [
                  {
                    "type": "flow",
                    "items": [
                      {
                        "type": "node",
                        "title": "Linux 의존성",
                        "detail": "ffmpeg · 빌드 도구 · 패키지",
                        "step": 1
                      },
                      {
                        "type": "node",
                        "title": "모듈 탐색 경로",
                        "detail": "WORKDIR · PYTHONPATH",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "Uvicorn 실행",
                        "detail": "app.main:app · 포트 8000",
                        "step": 3
                      }
                    ]
                  }
                ]
              }
            ],
            "steps": [
              {
                "title": "프론트엔드 빌드와 정적 서비스 역할 분리",
                "text": "Node 환경에서 프론트엔드를 빌드하고, 만들어진 산출물은 Nginx에서 제공하도록 역할을 나눴습니다. 빌드 환경과 실제 화면을 제공하는 실행 환경을 구분했습니다."
              },
              {
                "title": "Linux에 맞게 Python 의존성 정리",
                "text": "Python slim 이미지에 ffmpeg와 빌드 의존성을 설치하고 Windows 전용 pywin 계열 의존성을 제거했습니다. 서비스에 필요한 시스템·Python 패키지를 Dockerfile에 정의했습니다."
              },
              {
                "title": "컨테이너의 모듈 탐색 경로 정의",
                "text": "작업 디렉터리와 PYTHONPATH, 패키지 경로 설정을 명시했습니다. 컨테이너에서 애플리케이션 모듈을 찾을 수 있도록 실행 환경을 구성했습니다."
              },
              {
                "title": "Uvicorn 실행 대상과 포트 지정",
                "text": "app.main:app을 실행 대상으로 지정하고 0.0.0.0:8000에서 Uvicorn을 실행하도록 작성했습니다. 서비스 시작 명령을 컨테이너 설정에 포함했습니다."
              }
            ]
          }
        ]
      },
      {
        "id": "member",
        "label": "회원 정보·비밀번호",
        "title": "회원 정보 변경에 검증과 처리 규칙을 더하다",
        "context": "요청 사용자를 식별하고, 정보 부분 수정·탈퇴 상태 변경·비밀번호 검증을 회원 서비스에 구현했습니다.",
        "outcome": "회원 조회와 변경 API를 구현하고, 전달된 정보만 수정하도록 처리했습니다. 비밀번호 변경은 기존 값 검증 후 인코딩해 저장하고, 탈퇴는 회원 상태 변경으로 관리했습니다.",
        "defaultView": 0,
        "steps": [
          {
            "title": "요청 사용자와 변경 대상 회원 연결",
            "text": "Authorization 토큰에서 loginId를 추출해 회원 서비스로 전달했습니다. 회원 조회·수정·탈퇴·프로필·비밀번호 변경 API가 요청 사용자 기준으로 처리되도록 연결했습니다."
          },
          {
            "title": "전달된 회원 정보만 수정",
            "text": "닉네임과 생일 값이 전달된 경우에만 해당 필드를 변경하도록 구현했습니다. 변경하지 않은 정보는 유지하면서 요청한 항목을 반영하도록 처리했습니다."
          },
          {
            "title": "회원 탈퇴를 상태 변경으로 처리",
            "text": "회원의 isDeleted 값을 변경하는 탈퇴 로직을 구현했습니다. 대상 회원 조회와 상태 변경을 회원 서비스에서 처리하도록 구성했습니다."
          },
          {
            "title": "프로필 이미지와 회원 URL 연결",
            "text": "프로필 이미지 업로드·변경을 S3 서비스와 연결하고, 회원 정보에 이미지 URL을 반영했습니다. 파일 저장 결과가 회원 프로필 조회에 이어지도록 구현했습니다."
          }
        ],
        "views": [
          {
            "title": "회원 변경",
            "blocks": [
              {
                "type": "label",
                "text": "요청 사용자 기준으로 변경 처리"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "사용자 식별",
                    "detail": "Authorization → loginId",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "회원 서비스",
                    "detail": "대상 회원 조회"
                  },
                  {
                    "type": "stack",
                    "items": [
                      {
                        "type": "node",
                        "title": "정보 부분 수정",
                        "detail": "전달된 닉네임·생일만 반영",
                        "step": 1
                      },
                      {
                        "type": "node",
                        "title": "회원 탈퇴",
                        "detail": "isDeleted 상태 변경",
                        "step": 2
                      },
                      {
                        "type": "node",
                        "title": "프로필 이미지",
                        "detail": "S3 파일 · 회원 URL 연결",
                        "step": 3
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "title": "비밀번호 변경",
            "blocks": [
              {
                "type": "label",
                "text": "기존 비밀번호 확인 후 변경"
              },
              {
                "type": "flow",
                "items": [
                  {
                    "type": "node",
                    "title": "회원 조회",
                    "detail": "요청 사용자 기준",
                    "step": 0
                  },
                  {
                    "type": "node",
                    "title": "기존 비밀번호 검증",
                    "detail": "PasswordEncoder.matches",
                    "step": 1
                  },
                  {
                    "type": "node",
                    "title": "새 비밀번호 인코딩",
                    "detail": "PasswordEncoder.encode",
                    "step": 2
                  },
                  {
                    "type": "node",
                    "title": "변경 저장",
                    "detail": "회원 트랜잭션",
                    "step": 3
                  }
                ]
              }
            ],
            "steps": [
              {
                "title": "변경할 회원 조회",
                "text": "요청 사용자의 loginId로 회원을 찾고 기존 비밀번호와 새 비밀번호를 변경 서비스에 전달했습니다."
              },
              {
                "title": "기존 비밀번호 검증",
                "text": "PasswordEncoder.matches로 기존 비밀번호와 저장된 값을 비교했습니다. 일치하지 않으면 변경을 중단하고 예외를 반환하도록 처리했습니다."
              },
              {
                "title": "새 비밀번호 인코딩",
                "text": "기존 비밀번호 검증 후 PasswordEncoder.encode로 새 비밀번호를 인코딩해 회원 엔티티에 설정했습니다."
              },
              {
                "title": "트랜잭션 안에서 변경 저장",
                "text": "검증과 새 비밀번호 저장이 서비스의 트랜잭션 범위 안에서 수행되도록 구현했습니다."
              }
            ]
          }
        ]
      }
    ]
  }
};
