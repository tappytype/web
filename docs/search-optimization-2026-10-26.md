# 검색 노출 점검과 브랜드 이름 연결

## 확인된 사실

- 공개 웹의 제목·설명·구조화 데이터에는 TappyType만 있고 이지폰트·EasyFont와의 관계가 설명되어 있지 않았다.
- AI 생성 범위를 11,172자로 소개했지만 현재 iOS의 AI 생성 범위는 2,350자다. 한글 전체 조합 수와 AI 생성 범위를 구분해야 한다.
- Google Search Console에서 루트, /en, /privacy/, /data-deletion/ 4개 URL의 색인이 확인됐다. 제외 URL은 리디렉션 9개와 대체 canonical 1개로, 이를 10개 페이지의 검색 장애로 해석하지 않는다.
- Bing Webmaster의 기존 사이트에는 사이트맵 등록이 없었다. 2026-10-26에 https://tappytype.com/sitemap.xml 을 제출했고 상태는 처리 중이다. 아직 재수집·색인 완료를 의미하지 않는다.
- Bing AI Performance는 데이터 없음으로 표시됐다. 사이트 처리 중 상태이므로 생성형 검색 노출이 실제로 전혀 없다는 결론은 내리지 않는다.

## 변경

- 한국어·영어 제목, 설명, OG, 본문, 하단에 이지폰트·EasyFont·TappyType이 같은 앱임을 명시한다.
- SoftwareApplication의 공통 @id, alternateName, 공식 App Store 및 Instagram 연결을 추가한다. App Store 링크는 국가·이름에 의존하지 않는 앱 ID 주소를 사용한다.
- AI 생성 범위는 2,350자로 정정하고, 영문·숫자·기호 직접 작성과 무료 기능·유료 TTF 저장의 차이를 설명한다.
- 실제 화면에 FAQ를 추가한다. 검색 순위, AI 인용, FAQ 검색 결과 표시를 보장하지 않는다.
- 이미 제공 중인 엽서 기능의 ‘출시 예정’ 표기를 제거한다. 과거 제작 과정의 원문은 보존한다.

## 검증과 남은 조건

- npm run build: TypeScript와 한국어·영어 정적 페이지 빌드 통과.
- 생성된 두 HTML의 단일 canonical·description, hreflang 3개, JSON-LD, FAQ, 기능 범위, 로컬 자산 경로 검사 통과.
- 개인 Chrome에서 한국어·영어 화면과 언어 이동 확인.
- 배포·Google 재수집 요청은 수행하지 않았다. 배포 후 공개 HTML과 실제 검색 도구 상태를 별도로 확인해야 한다.
- 웹 검색 실적은 App Store 검색 실적과 다르다. 앱 이름 변경의 영향은 App Analytics의 App Store Search 유입과 전환으로 별도 평가해야 한다.

## 출처

- https://developer.apple.com/app-store/search/
- https://developers.google.com/search/docs/appearance/site-names
- https://schema.org/SoftwareApplication
