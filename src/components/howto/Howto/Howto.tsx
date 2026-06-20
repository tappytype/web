import { useLang } from '@/contexts/LangContext'
import type { TranslationKey } from '@/i18n/config'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './Howto.css'

interface Step {
  no: number
  img: { src: string; alt: string; width: number; height: number }
  titleKey: TranslationKey
  descKey: TranslationKey
}

// 단계 순서: 설치 → 쓰기 → .ttf 내보내기(step4_*) → 어디서나 사용(step3_*)
const STEPS: Step[] = [
  {
    no: 1,
    img: { src: '/assets/shot-onboarding.png', alt: 'App Store에서 태피타입을 설치하고 처음 만나는 화면', width: 750, height: 1000 },
    titleKey: 'step1_t',
    descKey: 'step1_p',
  },
  {
    no: 2,
    img: { src: '/assets/shot-main.png', alt: '가이드 따라 글자 셀에 손글씨를 쓰는 편집 화면', width: 750, height: 1000 },
    titleKey: 'step2_t',
    descKey: 'step2_p',
  },
  {
    no: 3,
    img: { src: '/assets/howto-export.jpg', alt: '내보낸 폰트가 굿노트 서체 목록에 나타난 모습', width: 540, height: 960 },
    titleKey: 'step4_t',
    descKey: 'step4_p',
  },
  {
    no: 4,
    img: { src: '/assets/use-calendar.jpg', alt: '아이패드 PDF 캘린더에 내 손글씨 폰트로 일정을 적은 모습', width: 821, height: 1095 },
    titleKey: 'step3_t',
    descKey: 'step3_p',
  },
]

export default function Howto() {
  const { t } = useLang()
  return (
    <Section id="howto">
      <SectionHeading label={t('how_label')} title={t('how_title')} sub={t('how_sub')} />
      <div className="stories">
        {STEPS.map((step) => (
          <figure className="story" key={step.no}>
            <div className="frame">
              <span className="step-no">{step.no}</span>
              <img
                src={step.img.src}
                alt={step.img.alt}
                loading="lazy"
                width={step.img.width}
                height={step.img.height}
              />
            </div>
            <figcaption className="body">
              <h3>{t(step.titleKey)}</h3>
              <p>{t(step.descKey)}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
