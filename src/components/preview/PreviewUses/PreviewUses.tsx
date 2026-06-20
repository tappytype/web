import { useLang } from '@/contexts/LangContext'
import type { TranslationKey } from '@/i18n/config'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './PreviewUses.css'

interface Shot {
  src: string
  alt: string
  captionKey: TranslationKey
}

const SHOTS: Shot[] = [
  {
    src: '/assets/use-cal-wide.jpg',
    alt: '아이패드 PDF 캘린더에 손글씨 폰트로 일정을 적은 화면',
    captionKey: 'pv2_cap1',
  },
  {
    src: '/assets/use-app.jpg',
    alt: '아이패드 TappyType 앱에서 손글씨로 폰트를 만드는 실제 화면',
    captionKey: 'pv2_cap2',
  },
]

export default function PreviewUses() {
  const { t } = useLang()
  return (
    <Section id="preview">
      <SectionHeading label={t('pv2_label')} title={t('pv2_title')} sub={t('pv2_sub')} />
      <div className="gallery">
        {SHOTS.map((shot) => (
          <figure className="frame-card" key={shot.src}>
            <span className="tape" />
            <div className="pic">
              <img src={shot.src} alt={shot.alt} loading="lazy" width={821} height={1095} />
            </div>
            <figcaption>{t(shot.captionKey)}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
