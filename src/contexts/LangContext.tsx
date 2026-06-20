import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { getT, type Lang, type TFunc } from '@/i18n/config'

interface LangValue {
  lang: Lang
  t: TFunc
}

const LangContext = createContext<LangValue | null>(null)

interface LangProviderProps {
  lang: Lang
  children: ReactNode
}

export function LangProvider({ lang, children }: LangProviderProps) {
  const value = useMemo<LangValue>(() => ({ lang, t: getT(lang) }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
