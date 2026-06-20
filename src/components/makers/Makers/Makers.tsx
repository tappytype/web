import { useLang } from '@/contexts/LangContext'
import { LINKS } from '@/lib/constants/links'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './Makers.css'

export default function Makers() {
  const { t } = useLang()
  return (
    <Section id="makers">
      <SectionHeading label={t('mk_label')} title={t('mk_title')} />
      <div className="makers-grid">
        <article className="maker-card">
          <span className="doodle">
            <img src="/assets/creator-jiin.png" alt="석지인 도트 캐릭터" width={612} height={551} loading="lazy" />
          </span>
          <div className="maker-body">
            <h3 className="m-name">석지인 · Jiin</h3>
            <p className="m-note">{t('mk_jiin')}</p>
            <a href={LINKS.jiin} target="_blank" rel="noopener">
              → usejiin.link
            </a>
          </div>
        </article>
        <article className="maker-card reverse">
          <span className="doodle">
            <img src="/assets/creator-bobae.png" alt="전보배 도트 캐릭터" width={624} height={600} loading="lazy" />
          </span>
          <div className="maker-body">
            <h3 className="m-name">전보배 · Bobae</h3>
            <p className="m-note">{t('mk_bobae')}</p>
            <a href={LINKS.bobae} target="_blank" rel="noopener">
              → bobaejeon.github.io
            </a>
          </div>
        </article>
      </div>
    </Section>
  )
}
