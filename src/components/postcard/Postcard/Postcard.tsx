import { useLang } from '@/contexts/LangContext'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import './Postcard.css'

interface Card {
  src: string
  alt: string
}

// 산뜻체 손글씨 + 사진/파스텔 배경 무드보드 엽서(4:5). 감성 가사·편지 톤으로 통일.
// 카드 자체가 영어+한글로 무드를 전하므로 별도 캡션(로마자 병기)은 두지 않는다.
const CARDS: Card[] = [
  {
    src: '/assets/postcard-walk.jpg',
    alt: 'A handwritten postcard over summer green trees: 완벽한 날씨 딱 맞는 Playlist',
  },
  {
    src: '/assets/postcard-pastel.jpg',
    alt: 'A handwritten postcard on soft pink: Polaroid Love, 사랑 촌스러운 그 감정',
  },
  {
    src: '/assets/postcard-desk.jpg',
    alt: 'A handwritten postcard over a cozy desk: Dear younger me, Love older you',
  },
]

export default function Postcard() {
  const { t } = useLang()
  return (
    <Section id="postcard">
      <p className="postcard-soon">{t('pc_soon')}</p>
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
