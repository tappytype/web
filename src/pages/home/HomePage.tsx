import { LangProvider } from '@/contexts/LangContext'
import type { Lang } from '@/i18n/config'
import Seo from '@/components/seo/Seo'
import Nav from '@/components/layout/Nav/Nav'
import Footer from '@/components/layout/Footer/Footer'
import Hero from '@/components/hero/Hero/Hero'
import Howto from '@/components/howto/Howto/Howto'
import Moment from '@/components/moment/Moment/Moment'
import FontGallery from '@/components/fonts/FontGallery/FontGallery'
// '이렇게 써요'(PreviewUses) 섹션은 잠시 내려둠 — 되살리려면 이 import와 아래 <PreviewUses /> 주석을 해제.
// import PreviewUses from '@/components/preview/PreviewUses/PreviewUses'
import PrivacyPromise from '@/components/privacy/PrivacyPromise/PrivacyPromise'
import FounderStory from '@/components/founder/FounderStory/FounderStory'
import Makers from '@/components/makers/Makers/Makers'
import Instagram from '@/components/instagram/Instagram/Instagram'
import DownloadBand from '@/components/download/DownloadBand/DownloadBand'

const HOME_PATH = { ko: '/', en: '/en' }

interface HomePageProps {
  lang: Lang
}

export default function HomePage({ lang }: HomePageProps) {
  return (
    <LangProvider lang={lang}>
      <Seo path={HOME_PATH} />
      <Nav />
      <Hero />
      <main>
        <Howto />
        <Moment />
        <FontGallery />
        {/* <PreviewUses /> 잠시 내려둠 — 위 import와 함께 되살리면 복구됨 */}
        <PrivacyPromise />
        <FounderStory />
        <Makers />
        <Instagram />
        <DownloadBand />
      </main>
      <Footer />
    </LangProvider>
  )
}
