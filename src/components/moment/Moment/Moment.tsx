import { useLang } from '@/contexts/LangContext'
import { useCountUp } from '@/hooks/useCountUp'
import Section from '@/components/ui/Section/Section'
import YouTubeDemo from '@/components/moment/YouTubeDemo/YouTubeDemo'
import './Moment.css'

export default function Moment() {
  const { t } = useLang()
  const [count, startCount] = useCountUp(11172)

  return (
    <Section id="moment" onReveal={startCount}>
      <div className="moment">
        <div className="bignum">11,172</div>
        <div className="m-copy">
          <span className="sec-label">{t('moment_label')}</span>
          <h2>{t('moment_title')}</h2>
          <p className="sec-sub">{t('moment_sub')}</p>
          <div className="counter" aria-hidden="true">
            <span className="from">39</span>
            <span className="arrow">→</span>
            <span className="to">{count.toLocaleString()}</span>
            <span className="unit">{t('counter_unit')}</span>
          </div>
        </div>
      </div>
      <YouTubeDemo />
    </Section>
  )
}
