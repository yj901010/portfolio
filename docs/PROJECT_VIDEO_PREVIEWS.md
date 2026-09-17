# 프로젝트 배너 영상

기존 포스터를 바탕으로 장면 요소를 움직이는 6초 무음 합성 영상(시네마그래프)을 제작했다. AI 영상 서비스로 생성한 영상이나 실제 서비스 운영 촬영물이 아니다. 섬네일·미리보기·프로젝트 상세 표지는 그대로 유지한다.

| 프로젝트 | 움직임 | 결과 파일 | 용량 |
| --- | --- | --- | --- |
| K-HOPE | 여러 연구 문서가 겹쳐지고 정리되는 움직임 | FE/public/videos/khope.mp4 | 114,744 bytes |
| TlatFarm | 멀리서 다가온 드론이 화면 오른쪽으로 지나가는 비행 | FE/public/videos/tlatfarm.mp4 | 284,848 bytes |
| CheckMate | 창가 빛과 계약서 왼쪽 위 종이 끝의 작은 들림 | FE/public/videos/checkmate.mp4 | 250,365 bytes |
| ssFinder | 고정된 플랫폼에 내리는 빗줄기 | FE/public/videos/ssfinder.mp4 | 451,765 bytes |
| MyFairy | 오른쪽에서 왼쪽으로 책장 넘김·수직으로 흐르는 폭포 빛·등불 | FE/public/videos/myfairy.mp4 | 570,404 bytes |

각 파일: 1280 × 720, 24fps, 144프레임, H.264 High / yuv420p, faststart, 오디오 트랙 없음. 전체 1,672,126 bytes. 드론은 화면 밖으로 지나가고 책장은 마지막에 정지된 그림으로 부드럽게 연결된다. 다른 움직임은 주기 함수로 이어진다. 마지막 프레임이 첫 프레임과 완전히 같지는 않다.

## 배너 동작

- 활성 프로젝트 하나에만 video 요소를 둔다. preload=none, muted, playsInline, loop.
- 첫 재생 프레임 전에는 기존 포스터를 보여준다. 자동재생이 거부되거나 영상 로딩이 실패하면 포스터가 남는다.
- 재생 버튼은 영상과 8초 간격 프로젝트 전환을 함께 제어한다. 프로젝트를 직접 선택하면 전환은 멈추고 선택한 장면의 영상은 계속 재생한다.
- 상세창 열림, 비활성 탭, 배너가 화면 밖에 있을 때 영상을 멈춘다. 포인터 호버는 프로젝트 전환만 멈춘다.
- 동작 줄이기 환경에서는 영상과 전환을 기본 정지하고, 사용자의 명시적 재생을 허용한다.

## 소스 및 재생성

기존 public/artwork 포스터를 사용했다. K-HOPE는 기존 khope-billboard.svg의 문서 도형을 별도 SVG/PNG 레이어로 분리하고 여러 장의 문서로 합성했다. TlatFarm의 배경과 드론은 내장 image_gen의 **이미지 편집 모드**로 분리한 뒤 영상 합성용 WebP/투명 PNG로 변환했다. 나머지 움직임은 Pillow·NumPy로 프레임을 합성하고 FFmpeg로 인코딩했다. 카메라 줌만으로 움직임을 대체하지 않았다.

원본 섬네일을 수정하지 않았다. 드론은 생성된 개념 이미지이며 제품·촬영 현장·운영 화면의 사실 증빙이 아니다. 고객 데이터나 로그인한 운영 화면은 사용하지 않았다.

- 렌더러: scripts/render-previews.py, scripts/paper_motion.py
- 준비된 레이어: scripts/video-assets/{khope-document.svg,khope-document.png,tlatfarm-plate.webp,drone.png}
- 출력 메타데이터: FE/public/videos/manifest.json
- 빌드 도구: scripts/video-requirements.txt (웹 런타임 의존성 없음)

저장소 루트에서 전용 Python 환경을 준비한 뒤:

```sh
python -m pip install -r scripts/video-requirements.txt
python scripts/render-previews.py --repo .
```

## 이미지 편집에 사용한 정확한 프롬프트

두 편집 모두 기존 FE/public/artwork/tlatfarm-cover.webp를 참조했다.

### 배경 레이어

```text
Edit target: the supplied TlatFarm cover. Create a clean background plate for compositing a six-second video. Remove ONLY the flying drone and its rotor blur, filling that small region with the matching distant fields and dawn haze. Preserve the field geometry, trees, sunrise, color grade, lighting, camera angle, entire canvas framing and all other image content as closely as possible. No new subjects. No text. Keep the same wide aspect ratio. Output one clean drone-free landscape.
```

### 드론 레이어

```text
Edit target: the supplied TlatFarm cover. Extract ONLY its existing gray quadcopter and its soft spinning-propeller blur as one isolated foreground asset for video compositing. Preserve the exact drone design, perspective, forward camera, lighting and proportions from the reference. Remove every part of the landscape and sky. The background must be truly transparent alpha, not white, black, gray or a checkerboard. Center the extracted drone with comfortable transparent padding; keep all rotors and landing legs fully inside the canvas. No floor, drop shadow, border, text or new objects. A clean photorealistic transparent cutout of that same drone, not a redesigned product.
```

생성된 레이어는 표현의 일관성을 확인하고 합성했다. 생성 편집의 특성상 드론의 세부 형태·시점은 원본과 완전히 동일하지 않다.


## 동작 범위

바닥·카메라·책 주변 배경은 고정한다. 숨숨파인더의 바닥 굴절과 잔물결은 제거했다. MyFairy는 물의 좌우 변형을 사용하지 않고 아래로 진행하는 밝기 변화만 주었다. 책장과 계약서의 움직임은 원래 그림에서 추출한 종이 텍스처를 작은 메시로 합성한 표현이다. 실제 종이의 물리 시뮬레이션이나 생성형 영상 모델을 사용한 것은 아니다.
