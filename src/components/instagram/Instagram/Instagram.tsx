import { createElement, useEffect, useRef, useState } from 'react'
import { useLang } from '@/contexts/LangContext'
import { LINKS } from '@/lib/constants/links'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './Instagram.css'

const WIDGET_SRC = 'https://w.behold.so/widget.js'

export default function Instagram() {
  const { t } = useLang()
  const embedRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  // behold 위젯(외부 스크립트 + 인스타 피드)은 사용자가 근처로 스크롤할 때만 마운트한다.
  // 초기 로드의 써드파티 네트워크/실행 비용을 제거(아래 YouTube 데모와 동일한 전략).
  useEffect(() => {
    const el = embedRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return
    const s = document.createElement('script')
    s.type = 'module'
    s.src = WIDGET_SRC
    document.body.appendChild(s)
  }, [active])

  return (
    <Section id="insta">
      <SectionHeading label={t('ig_label')} title={t('ig_title')} sub={t('ig_sub')} />
      <div className="insta-embed" ref={embedRef}>
        {active && createElement('behold-widget', { 'feed-id': LINKS.beholdFeedId })}
      </div>
      <a className="story-link" href={LINKS.instagram} target="_blank" rel="noopener">
        {t('ig_follow')}
      </a>
    </Section>
  )
}
