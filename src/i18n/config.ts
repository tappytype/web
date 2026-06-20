import i18next from 'i18next'
import ko from './locales/ko.json'
import en from './locales/en.json'

export type Lang = 'ko' | 'en'
export type TranslationKey = keyof typeof ko

// SSG에서 라우트별로 언어를 고정 렌더하므로 전역 changeLanguage 대신 getFixedT를 쓴다.
i18next.init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
  lng: 'ko',
  fallbackLng: 'ko',
  interpolation: { escapeValue: false },
})

export type TFunc = (key: TranslationKey) => string

export function getT(lang: Lang): TFunc {
  return i18next.getFixedT(lang) as TFunc
}

export default i18next
