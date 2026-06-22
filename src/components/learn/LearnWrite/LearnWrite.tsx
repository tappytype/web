import { useLang } from '@/contexts/LangContext'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './LearnWrite.css'

// 배우면서 쓰기 — 재밌는 K-culture 문장을 따라 쓰며 폰트를 만든다(핵심 글자 채움 + 영어 뜻 병기).
// persona Maya 핵심 기능: 한글을 가르쳐주고 축하 → 설렘.
export default function LearnWrite() {
  const { t } = useLang()
  return (
    <Section id="learn">
      <SectionHeading label={t('lw_label')} title={t('lw_title')} sub={t('lw_sub')} />
      <div className="learn-shot">
        <img
          src="/assets/learn-write.jpg"
          alt="Tracing the sentence 최애가 가죽 재킷 입었어 (My bias wore a leather jacket) to build a handwriting font"
          loading="lazy"
          width={1032}
          height={1376}
        />
      </div>
    </Section>
  )
}
