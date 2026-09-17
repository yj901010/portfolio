# TlatFarm 표지

- 생성 방식: 내장 image_gen 도구. 프로젝트를 소개하기 위한 생성 이미지이며 실제 농장·고객·운영 화면의 사진이 아니다.
- 최종 파일: `FE/public/artwork/tlatfarm-cover.webp` (1672 × 941, 219,510 bytes).
- 용도: 홈·프로젝트 목록·미리보기·상세 페이지의 공통 표지. 문구는 이미지에 넣지 않고 기존 HTML로 표시한다.
- 처리: 생성된 PNG를 동일 해상도의 WebP로 인코딩했다. 미리보기·상세에서는 드론이 잘리지 않도록 이미지 표시 기준점을 지정했다.

## 사용한 프롬프트

```text
Use case: photorealistic-natural. Asset type: wide 16:9 cinematic cover photograph for TlatFarm, a smart-farm project in a Netflix-inspired developer portfolio. Primary request: a believable agricultural inspection drone flying above a real green crop field divided into clear rectangular survey plots. Style: a restrained, tactile documentary film still, natural photography, subtle film grain, rich dark greens with warm early-morning highlights, quiet and grounded rather than futuristic. Composition: aerial oblique view looking across parallel crop rows and narrow earthen paths; one unbranded compact quadcopter with a small downward-facing camera in the upper-right third, clearly recognizable even in a small landscape thumbnail. The drone is medium sized in frame, not a giant close-up. Keep the left half relatively dark and uncluttered for website title overlay; the strongest field geometry and drone belong in the center-right. Crop rows and paths form the natural grid, with modest dawn haze toward the far horizon. This is an illustrative project cover, not a screenshot or depiction of a specific real customer location. Wide landscape 16:9, ideally 1600x900. No text, letters, numbers, logos, UI, dashboards, charts, maps, holograms, digital grid overlay, scan beams, neon, lens flare, sparkles, people, wind turbines, or solar panels. No glossy CGI or plastic look. Produce just one finished cover image.
```
