import { useState } from 'react'
import { useLang } from '@/contexts/LangContext'
import './Tester.css'

// 라이브 미리보기: 입력한 문장이 즉시 손글씨 폰트로 워터폴 렌더된다.
export default function Tester() {
  const { t } = useLang()
  const [value, setValue] = useState(t('tester_default'))
  const shown = value || ' '

  return (
    <div className="tester">
      <span className="tester-tab">{t('tt_label')}</span>
      <p className="note">{t('tt_note')}</p>
      <input
        type="text"
        maxLength={40}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label={t('tester_aria')}
      />
      <div className="waterfall" aria-live="polite">
        <div className="wf-line s1">{shown}</div>
        <div className="wf-line s2">{shown}</div>
        <div className="wf-line s3">{shown}</div>
      </div>
    </div>
  )
}
