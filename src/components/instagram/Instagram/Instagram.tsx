import { createElement, useEffect } from 'react'
import { useLang } from '@/contexts/LangContext'
import { LINKS } from '@/lib/constants/links'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './Instagram.css'

const WIDGET_SRC = 'https://w.behold.so/widget.js'

export default function Instagram() {
  const { t } = useLang()

  useEffect(() => {
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return
    const s = document.createElement('script')
    s.type = 'module'
    s.src = WIDGET_SRC
    document.body.appendChild(s)
  }, [])

  return (
    <Section id="insta">
      <SectionHeading label={t('ig_label')} title={t('ig_title')} sub={t('ig_sub')} />
      <div className="insta-embed">
        {createElement('behold-widget', { 'feed-id': LINKS.beholdFeedId })}
      </div>
      <a className="story-link" href={LINKS.instagram} target="_blank" rel="noopener">
        {t('ig_follow')}
      </a>
    </Section>
  )
}
