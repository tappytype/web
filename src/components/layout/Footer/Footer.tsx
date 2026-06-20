import { useLang } from '@/contexts/LangContext'
import { LINKS } from '@/lib/constants/links'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer>
      <div className="fbrand">
        <span className="tappy">Tappy</span>
        <span className="type">Type</span>
      </div>
      <div>{t('ft_tag')}</div>
      <div className="links">
        <a href={LINKS.appStore} target="_blank" rel="noopener">
          {t('ft_download')}
        </a>
        <a href={LINKS.privacy}>{t('nav_privacy')}</a>
        <a href={LINKS.dataDeletion}>{t('ft_datadel')}</a>
        <a href={LINKS.instagram} target="_blank" rel="noopener">
          Instagram @tappytype
        </a>
        <a href={LINKS.contact}>{t('ft_contact')}</a>
      </div>
      <div>© 2026 TappyType</div>
      <div className="pen-sign">{t('ft_sign')}</div>
    </footer>
  )
}
