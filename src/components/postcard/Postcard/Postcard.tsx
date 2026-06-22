import { useLang } from '@/contexts/LangContext'
import type { TranslationKey } from '@/i18n/config'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './Postcard.css'

interface Card {
  src: string
  alt: string
  captionKey: TranslationKey
}

// 산뜻체 손글씨 + 사진/파스텔 배경으로 만든 실제 엽서(4:5).
// 메시지는 Maya 결(팬·자기표현). 영어 페이지는 캡션에 로마자·뜻 병기(한글 학습 즐거움), 한국어는 생략.
const CARDS: Card[] = [
  {
    src: '/assets/postcard-walk.jpg',
    alt: 'A handwritten postcard reading 사랑해 over a photo of summer green trees',
    captionKey: 'pc_cap1',
  },
  {
    src: '/assets/postcard-pastel.jpg',
    alt: 'A handwritten postcard reading 보고 싶어 / 또 봐 on a soft pink background',
    captionKey: 'pc_cap2',
  },
  {
    src: '/assets/postcard-desk.jpg',
    alt: 'A handwritten postcard reading 고마워 over a cozy desk photo',
    captionKey: 'pc_cap3',
  },
]

export default function Postcard() {
  const { t } = useLang()
  return (
    <Section id="postcard">
      <SectionHeading label={t('pc_label')} title={t('pc_title')} sub={t('pc_sub')} />
      <div className="postcard-gallery">
        {CARDS.map((card) => {
          const caption = t(card.captionKey)
          return (
            <figure className="postcard-card" key={card.src}>
              <img src={card.src} alt={card.alt} loading="lazy" width={1080} height={1350} />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          )
        })}
      </div>
    </Section>
  )
}
