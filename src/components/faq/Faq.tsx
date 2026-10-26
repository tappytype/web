import { useLang } from '@/contexts/LangContext'
import Section from '@/components/ui/Section/Section'
import './Faq.css'

const TOPICS = ['identity', 'letters', 'price', 'install'] as const

export default function Faq() {
  const { t } = useLang()
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">{t('faq_title')}</h2>
      <dl className="faq-list">
        {TOPICS.map((topic) => (
          <div key={topic}>
            <dt>{t(`faq_${topic}_q`)}</dt>
            <dd>{t(`faq_${topic}_a`)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
