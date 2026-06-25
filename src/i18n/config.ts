import ko from './locales/ko.json'
import en from './locales/en.json'

export type Lang = 'ko' | 'en'
export type TranslationKey = keyof typeof ko
export type TFunc = (key: TranslationKey) => string

// SSG에서 라우트별로 언어를 고정 렌더하므로 단순 key→문자열 사전 조회로 충분하다.
// i18next의 보간·복수형·런타임 언어전환을 전혀 쓰지 않아 라이브러리를 들이지 않는다
// (번들에서 i18next 제거 → 하이드레이션 파싱/실행 비용 감소). 누락 키는 ko로 폴백.
const dicts = { ko, en } as Record<Lang, Record<string, string>>

export function getT(lang: Lang): TFunc {
  const dict = dicts[lang]
  return (key) => dict[key] ?? dicts.ko[key] ?? key
}
