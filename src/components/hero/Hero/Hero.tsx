import { useLang } from '@/contexts/LangContext'
import AppStoreBadge from '@/components/ui/AppStoreBadge/AppStoreBadge'
import Tester from '@/components/tester/Tester/Tester'
import './Hero.css'

export default function Hero() {
  const { t } = useLang()
  return (
    <header className="hero">
      <div className="hero-copy">
        <span className="eyebrow">✦ {t('badge')}</span>
        <h1>
          {t('hero_h1a')}
          <br />
          {t('hero_h1b')}
        </h1>
        <p className="sub">{t('hero_sub')}</p>

        <div className="hero-cta">
          <AppStoreBadge />
          <a className="demo-link" href="#howto">
            ▶ {t('cta_demo')}
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <Tester />
        <img
          className="hero-tappy"
          src="/assets/mascot-waving.png"
          alt="펜을 든 태피가 손을 흔들어요"
          width={488}
          height={500}
        />
      </div>
    </header>
  )
}
