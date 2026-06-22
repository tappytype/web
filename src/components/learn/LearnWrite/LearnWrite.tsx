import { useEffect, useState } from 'react'
import { useLang } from '@/contexts/LangContext'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './LearnWrite.css'

// 배우면서 쓰기 — 재밌는 K-culture 문장을 따라 쓰며 폰트를 만든다(핵심 글자 채움 + 영어 뜻 병기).
// 실제 iPad mini 캡처를 자동재생 캐러셀로: 문장마다 손글씨가 칸을 채워가는 화면을 번갈아 보여준다.
const SLIDES = [
  { src: '/assets/learn-1.jpg', ko: '최애가 가죽 재킷 입었어', en: 'My bias wore a leather jacket' },
  { src: '/assets/learn-2.jpg', ko: '오늘 밤 별이 참 많아', en: 'So many stars tonight' },
  { src: '/assets/learn-3.jpg', ko: '최애가 윙크했어!', en: 'My bias winked at me!' },
  { src: '/assets/learn-4.jpg', ko: '얘가 너의 최애야?', en: 'Is this one your bias?' },
  { src: '/assets/learn-5.jpg', ko: '인파를 뚫고 온 강아지가 손을 핥아', en: 'A puppy pushed through the crowd and licks my hand' },
  { src: '/assets/learn-6.jpg', ko: '굿즈 값이 비싸', en: 'The merch is pricey' },
] as const

const INTERVAL = 3200

export default function LearnWrite() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // 자동재생 — 멈춤(호버) 또는 모션 최소화 선호 시 정지. functional setState 로 active 의존성 제거.
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL)
    return () => window.clearInterval(id)
  }, [paused])

  return (
    <Section id="learn">
      <SectionHeading label={t('lw_label')} title={t('lw_title')} sub={t('lw_sub')} />
      <div
        className="learn-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        <div className="learn-stage">
          {SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={`${s.ko} — ${s.en}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              width={820}
              height={1124}
              className={i === active ? 'is-active' : undefined}
              aria-hidden={i === active ? undefined : true}
            />
          ))}
        </div>
        <div className="learn-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className={i === active ? 'is-active' : undefined}
              aria-label={s.ko}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
