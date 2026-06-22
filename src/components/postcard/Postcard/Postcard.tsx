import { useLang } from '@/contexts/LangContext'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './Postcard.css'

interface Card {
  src: string
  alt: string
}

// 산뜻체 손글씨 + 내 사진 배경으로 만든 실제 엽서(4:5).
const CARDS: Card[] = [
  {
    src: '/assets/postcard-walk.jpg',
    alt: '여름 가로수 사진 위에 손글씨로 "산책하기 좋은 날"이라 적은 엽서',
  },
  {
    src: '/assets/postcard-pastel.jpg',
    alt: '파스텔 핑크 배경 위에 손글씨로 "보고 싶었어 잘 지내?"라 두 줄로 적은 엽서',
  },
  {
    src: '/assets/postcard-desk.jpg',
    alt: '아늑한 책상 사진 위에 손글씨로 "오늘도 수고했어"라 적은 엽서',
  },
]

export default function Postcard() {
  const { t } = useLang()
  return (
    <Section id="postcard">
      <SectionHeading label={t('pc_label')} title={t('pc_title')} sub={t('pc_sub')} />
      <div className="postcard-gallery">
        {CARDS.map((card) => (
          <figure className="postcard-card" key={card.src}>
            <img src={card.src} alt={card.alt} loading="lazy" width={1080} height={1350} />
          </figure>
        ))}
      </div>
    </Section>
  )
}
