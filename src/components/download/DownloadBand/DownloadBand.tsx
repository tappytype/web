import { useCallback, useState } from 'react'
import { useLang } from '@/contexts/LangContext'
import Section from '@/components/ui/Section/Section'
import AppStoreBadge from '@/components/ui/AppStoreBadge/AppStoreBadge'
import './DownloadBand.css'

export default function DownloadBand() {
  const { t } = useLang()
  const [filled, setFilled] = useState(false)

  // 섹션 진입 250ms 뒤 첫 칸이 '가'로 채워지는 연출(원본 동작 이식).
  const onReveal = useCallback(() => {
    setTimeout(() => setFilled(true), 250)
  }, [])

  return (
    <Section id="download" onReveal={onReveal}>
      <div className={`download-band${filled ? ' filled' : ''}`}>
        <div className="dl-cell" aria-hidden="true">
          <span className="dl-cell-char">{filled ? '가' : ''}</span>
        </div>
        <span className="sec-label">{t('dl_label')}</span>
        <h2>{t('dl_title')}</h2>
        <p className="dl-sub">{t('dl_sub')}</p>
        <div className="dl-actions">
          <AppStoreBadge size="lg" />
          <p className="dl-universal">{t('dl_universal')}</p>
          <div className="dl-qr">
            <span className="qr">
              <img
                src="/assets/appstore-qr.svg"
                alt="App Store 다운로드 QR 코드"
                width={64}
                height={64}
                loading="lazy"
              />
            </span>
            <span>{t('dl_qr')}</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
