# TappyType 랜딩 사이트 — React + Vite + Tailwind 변환 설계

- 날짜: 2026-06-19
- 대상: `web/` (현 정적 HTML 사이트 → React 컴포넌트 기반으로 재구성)
- 목표: "관리하기 쉽게" — 64KB 단일 `index.html`을 컴포넌트·i18n 리소스로 분해하되, **현재의 SEO·소셜 미리보기·시각 결과·Cloudflare 배포를 보존**한다.

## 1. 결정 사항 (확정)

| 항목 | 결정 | 이유 |
|---|---|---|
| 렌더링 | **SSG** (`vite-react-ssg`) | 마케팅 랜딩 — 빌드 시 완성 HTML 생성으로 SEO/OG/LCP 유지 |
| 다국어 | **/en 경로 분리** | 언어별 독립 HTML → `hreflang`·언어별 인덱싱 최적 |
| 작업 위치 | **`web/` 그대로 재구성** | 기존 git·배포 설정 유지, 정적 자산은 `public/` 잔류 |
| 비주얼 | **현행 동일 유지 + 작은 개선 여지 허용** | 순수 기술 변환 우선, 발견되는 a11y/디자인 개선은 제안 |
| 코드 스타일 | `seokjiin-react-style` 준수 | 전역 규칙 |

## 2. 스택

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (또는 프로젝트 표준 버전) — 디자인 토큰을 theme로 추출
- `vite-react-ssg` — 라우트별 정적 HTML 프리렌더 + per-route `<head>` 관리
- `react-i18next` — ko/en 리소스 분리, **경로 기반** 언어 결정
- 배포: Cloudflare(wrangler) 유지

## 3. 라우팅 / SSG 출력

빌드 산출물 `dist/`:

| 경로 | 컴포넌트 | 비고 |
|---|---|---|
| `/` | `HomePage` (ko) | |
| `/en/` | `HomePage` (en) | |
| `/privacy/` | `PrivacyPage` (ko) | |
| `/en/privacy/` | `PrivacyPage` (en) | |
| `/data-deletion/` | `DataDeletionPage` | 단일 언어(현행 유지) |
| `/404` | `NotFoundPage` | Cloudflare `not_found_handling` |

- `waitlist` → 기존 `public/_redirects`의 301(`/#download`) **그대로 유지**.
- `sitemap.xml` → `/en/`, `/en/privacy/` 추가. 각 페이지에 `hreflang` 상호 링크(`ko` ↔ `en` ↔ `x-default`).
- 언어 토글 버튼: 현재 경로의 반대 언어 경로로 이동(`/` ↔ `/en/`). localStorage 대신 URL이 진실의 원천.

## 4. 폴더 구조 (`seokjiin-react-style` 준수)

```
web/
  src/
    pages/
      home/            # HomePage + 섹션 조립
      privacy/
      data-deletion/
      not-found/
    components/
      ui/              # 디자인 시스템 프리미티브: Container, Section, Eyebrow, Badge, Button, AppStoreBadge, Card, TextField
      hero/            # Hero (이름 데모 입력 + 글씨체 칩)
      tester/          # 라이브 미리보기(폰트 테스터)
      moment/          # 카운트업 섹션
      howto/           # 4단계
      fonts/           # 폰트 갤러리
      story/           # 만든 이의 이야기
      instagram/       # behold.so 위젯 래퍼
      makers/          # 만든 사람
      preview-uses/    # 사용 예시
      privacy-promise/ # 데이터 안내
      download/        # 다운로드 밴드(채워지는 셀 연출)
      layout/          # Nav(언어 토글·App Store 배지), Footer
    hooks/
      use-reveal.ts        # IntersectionObserver 스크롤 리빌
      use-count-up.ts      # 카운트업(easing, reduce-motion 대응)
      use-nav-badge.ts     # hero 통과 시 nav 배지 노출
    i18n/
      config.ts
      locales/ko.json
      locales/en.json
    styles/
      tokens.css       # 디자인 토큰 (:root CSS 변수) — 단일 진실의 원천
      fonts.css        # @font-face (hero/tester woff2 등)
      keyframes.css    # 모핑·애니메이션 keyframe
      globals.css      # Tailwind @layer + 전역
    routes.tsx         # vite-react-ssg 라우트 정의
    main.tsx
  public/              # 폰트·이미지·mp4·robots·manifest·_redirects (정적 자산 그대로)
  index.html           # Vite 엔트리(메타는 SSG가 주입)
  tailwind.config.ts
  vite.config.ts
```

## 5. 디자인 시스템 (관리 용이성의 핵심)

목표: 토큰·프리미티브·패턴을 한 곳에 모아, 색·간격·폰트를 **한 군데만 고치면 전 페이지에 반영**되게 한다. 앱(iOS `TypeTapTheme`)의 토큰 네이밍과 **이름을 맞춰** 앱↔웹 일관성을 확보한다.

### 5.1 디자인 토큰

- 현 424줄 CSS의 하드코딩 값을 추출해 **단일 진실의 원천**으로 정의:
  - **색**: `background`(#FFF7F3), `cardSurface`, `textPrimary`, `textSecondary`, `border`, `primary`, `primaryStrong`, `coralAccent` 등 — iOS `TypeTapTheme` 색 이름과 정합.
  - **타이포**: 폰트 패밀리(본문/제목/손글씨), 사이즈 스케일, 행간, 자간.
  - **간격/라운드/그림자/모션**: spacing 스케일, radius(sm~xl), 그림자, 트랜지션 duration/easing.
- 구현: CSS 변수(`:root`)로 정의 → `tailwind.config` theme가 이 변수를 참조. 컴포넌트는 유틸리티 클래스만 사용(매직 넘버 금지). 다크모드/테마 확장 여지 확보.
- `styles/tokens.css` + `tailwind.config.ts`에 문서화. `seokjiin-react-style`의 `tailwind-theme` 규칙 준수.

### 5.2 폰트 / 애니메이션

- **`@font-face`**(hero-jiin*, tester-jiin*, sample 등 woff2)는 `styles/fonts.css`로 이전. 손글씨체 클래스(`font-dotom`/`font-ttobak`/`font-santteut`)는 Tailwind theme의 `fontFamily` 토큰으로 등록.
- **keyframe 애니메이션**(모핑 헤드라인 등)은 `styles/keyframes.css`에 유지하고 Tailwind 유틸과 공존.

### 5.3 프리미티브 컴포넌트 (`components/ui/`)

재사용 UI 프리미티브를 분리해 섹션 컴포넌트가 조립만 하도록 한다 (`seokjiin-react-style`의 `component-variant-dict` 패턴):

- `Container` — 최대폭·패딩 일관화
- `Section` — eyebrow 라벨 + 제목 + 본문 + 리빌 래핑 표준 레이아웃
- `Eyebrow` / `Badge` — 섹션 상단 라벨, 배지
- `Button` / `AppStoreBadge` — CTA·App Store 배지(variant dict)
- `Card` — 카드 표면(폰트 갤러리·단계 카드 등)
- `TextField` — 테스터/히어로 입력
- 각 프리미티브는 토큰만 참조하고 색·간격 하드코딩 금지.

### 5.4 문서화 (선택, 가벼움)

- `src/styles/tokens.css` 상단 주석 + spec으로 토큰 표를 1차 기록.
- 과한 도구(Storybook 등)는 범위 밖(YAGNI). 필요 시 후속.

## 6. 다국어 (react-i18next, 경로 기반)

- 현 `I18N` 객체의 72개 키를 `locales/ko.json` / `en.json`으로 이전.
- `data-i18n`(textContent) → `t('key')`. `data-i18n-html`(innerHTML) → `<Trans>` 또는 신뢰된 정적 HTML(`dangerouslySetInnerHTML`은 번역 리소스 한정).
- **GLUE 로직 제거**: 한글 의미단위 줄바꿈은 `ko.json` 값에 ` `(nbsp)를 **미리 박아** 해결. CSS `word-break:keep-all` 유지. 런타임 치환 코드 삭제.
- 언어는 라우트로 결정(`/en/*` → en, 그 외 ko). i18next `lng`를 라우트에서 주입.

## 7. 인터랙티브 요소 매핑

| 현행(바닐라 JS) | React |
|---|---|
| 언어 토글(`localStorage`) | 라우트 이동 링크(`/` ↔ `/en/`) |
| 폰트 테스터 입력 → waterfall 동기화 | `Tester`의 controlled input + state |
| 히어로 이름 입력 → 렌더 + 글씨체 칩 | `Hero`의 controlled input + `selectedFont` state, `aria-pressed` 유지 |
| `countUp(11172)` | `useCountUp` 훅(reduce-motion 분기 유지) |
| 스크롤 리빌 `IntersectionObserver` | `useReveal` 훅(threshold 0.05, rootMargin 유지) + 안전망 리사이즈/로드 |
| moment 진입 → 카운트업 / download 진입 → 밴드 filled + 셀 '가' | 해당 섹션 컴포넌트의 in-view 콜백 |
| nav App Store 배지(hero 통과 시 show) | `useNavBadge` 훅 |
| behold.so 위젯 `<script>` | `Instagram` 컴포넌트에서 스크립트 1회 주입(이펙트) |

- `prefers-reduced-motion` 분기는 모든 애니메이션 훅에서 보존.

## 8. SEO / `<head>` 보존

- JSON-LD(`SoftwareApplication`) → 페이지별 SSG head에 그대로 주입. 언어별 텍스트 반영.
- OG/Twitter 메타, canonical, `theme-color`, manifest, 폰트 `preload`(hero/tester woff2) → SSG head로 이전.
- Google Fonts(`Gowun Dodum`, `Nanum Pen Script`, `Playfair Display`) preconnect/link 유지.
- 언어별 canonical + hreflang 상호 링크 추가.

## 9. 배포 변경

- `wrangler.jsonc`: `assets.directory` `./public` → `./dist`.
- 빌드: `vite-react-ssg build` → `dist/`에 정적 HTML + 자산.
- `public/`의 정적 자산(폰트·이미지·mp4·robots·_redirects·webmanifest)은 Vite가 `dist/`로 그대로 복사.

## 10. 검증 기준

- 모든 라우트(`/`, `/en/`, `/privacy/`, `/en/privacy/`, `/data-deletion/`, `/404`)가 정적 HTML로 생성되고, JS 비활성 상태에서도 본문·메타가 보인다.
- ko/en 72개 문자열이 누락 없이 표시된다(스냅샷/수동 대조).
- 인터랙션(폰트 테스터, 히어로 글씨체, 카운트업, 리빌, nav 배지) 현행과 동작 동일.
- Lighthouse SEO/접근성 점수가 현행 대비 하락하지 않는다.
- `wrangler dev`로 로컬 서빙 확인.

## 11. 범위 밖 (YAGNI)

- 새 디자인/리브랜딩, 추가 페이지, CMS, 분석 도구 도입.
- en 외 언어 추가.
- 발견된 작은 a11y/디자인 개선은 제안 후 적용하되, 대규모 리디자인은 별도 작업.
