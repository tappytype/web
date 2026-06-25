import { useLang } from '@/contexts/LangContext'
import { LINKS } from '@/lib/constants/links'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './Instagram.css'

// 빈 embed 홀더만 프리렌더한다. behold 위젯(외부 스크립트 + 인스타 피드)은
// 스크롤 근처에서만 마운트 — public/islands.js 의 setupInstagram 이 data-feed-id 를 읽어 처리.
export default function Instagram() {
  const { t } = useLang()

  return (
    <Section id="insta">
      <SectionHeading label={t('ig_label')} title={t('ig_title')} sub={t('ig_sub')} />
      <div className="insta-embed" data-feed-id={LINKS.beholdFeedId} />
      <a className="story-link" href={LINKS.instagram} target="_blank" rel="noopener">
        {t('ig_follow')}
      </a>
    </Section>
  )
}
