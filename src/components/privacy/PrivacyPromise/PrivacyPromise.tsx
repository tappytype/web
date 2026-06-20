import { useLang } from '@/contexts/LangContext'
import { LINKS } from '@/lib/constants/links'
import Section from '@/components/ui/Section/Section'
import './PrivacyPromise.css'

export default function PrivacyPromise() {
  const { t } = useLang()
  return (
    <Section id="privacy">
      <div className="privacy-band">
        <img src="/assets/brand-logo.png" alt="" width={600} height={600} loading="lazy" />
        <div>
          <span className="sec-label">{t('pv_label')}</span>
          <h2>{t('pv_title')}</h2>
          <ul>
            <li>{t('pv_li1')}</li>
            <li>{t('pv_li2')}</li>
            <li>{t('pv_li3')}</li>
          </ul>
          <p style={{ marginTop: '1.1rem' }}>
            <a href={LINKS.privacy}>{t('pv_link')}</a>
          </p>
        </div>
      </div>
    </Section>
  )
}
