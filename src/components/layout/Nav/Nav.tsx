import { Link } from 'react-router-dom'
import { useLang } from '@/contexts/LangContext'
import { LINKS } from '@/lib/constants/links'
import AppleMark from '@/components/ui/AppleMark/AppleMark'
import './Nav.css'

export default function Nav() {
  const { lang, t } = useLang()
  const home = lang === 'ko' ? '/' : '/en'
  const otherHome = lang === 'ko' ? '/en' : '/'

  return (
    <nav>
      <img className="logo" src="/assets/favicon.png" alt="" width={34} height={34} />
      <Link className="wordmark" to={home} aria-label="TappyType 홈">
        <span className="tappy">Tappy</span>
        <span className="type">Type</span>
      </Link>
      <div className="spacer" />
      <a
        className="plain"
        href={LINKS.appStore}
        target="_blank"
        rel="noopener"
        aria-label="App Store에서 다운로드"
      >
        <AppleMark width={15} height={18} fill="currentColor" style={{ verticalAlign: -3 }} />
      </a>
      <a
        className="plain"
        href={LINKS.instagram}
        target="_blank"
        rel="noopener"
        aria-label="Instagram @tappytype"
      >
        <svg
          width={17}
          height={17}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          style={{ verticalAlign: -3 }}
          aria-hidden="true"
        >
          <rect x={2} y={2} width={20} height={20} rx={5} />
          <circle cx={12} cy={12} r={4.2} />
          <circle cx={17.4} cy={6.6} r={1.1} fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a className="plain nav-privacy-link" href={LINKS.privacy}>
        {t('nav_privacy')}
      </a>
      <Link className="lang-toggle" to={otherHome} aria-label={t('lang_switch_label')}>
        {t('lang_switch_to')}
      </Link>
    </nav>
  )
}
