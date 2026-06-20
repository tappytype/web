import { useLang } from '@/contexts/LangContext'
import type { TranslationKey } from '@/i18n/config'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './FontGallery.css'

const FONTS: { cls: string; tagKey: TranslationKey }[] = [
  { cls: 'f1', tagKey: 'fg_d1' },
  { cls: 'f3', tagKey: 'fg_d3' },
  { cls: 'f5', tagKey: 'fg_d5' },
]

export default function FontGallery() {
  const { t } = useLang()
  const sample = t('fg_sample')
  return (
    <Section id="fonts">
      <SectionHeading label={t('fg_label')} title={t('fg_title')} sub={t('fg_sub')} />
      <div className="fontgallery">
        {FONTS.map((font) => (
          <div className="fontline" key={font.cls}>
            <span className={`sample ${font.cls}`}>{sample}</span>
            <span className="tag">{t(font.tagKey)}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
