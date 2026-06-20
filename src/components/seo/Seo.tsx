import { Head } from 'vite-react-ssg'
import { useLang } from '@/contexts/LangContext'
import { SITE } from '@/lib/constants/links'

interface SeoProps {
  // 현재 페이지의 ko/en 경로 쌍 (canonical·hreflang 생성용)
  path: { ko: string; en: string }
}

export default function Seo({ path }: SeoProps) {
  const { lang, t } = useLang()
  const canonical = SITE.origin + path[lang]
  const koUrl = SITE.origin + path.ko
  const enUrl = SITE.origin + path.en
  const locale = lang === 'ko' ? 'ko_KR' : 'en_US'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TappyType',
    alternateName: '태피타입',
    description: t('seo_desc'),
    applicationCategory: 'DesignApplication',
    operatingSystem: 'iOS, iPadOS',
    url: canonical,
    image: SITE.ogImage,
    downloadUrl: 'https://apps.apple.com/us/app/tappytype/id6777860562',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: {
      '@type': 'Organization',
      name: 'TappyType',
      url: SITE.origin + '/',
      sameAs: ['https://www.instagram.com/tappytype/'],
    },
  }

  return (
    <Head>
      <html lang={lang} />
      <title>{t('seo_title')}</title>
      <meta name="description" content={t('seo_desc')} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ko" href={koUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={koUrl} />

      <meta property="og:site_name" content="TappyType" />
      <meta property="og:title" content={t('og_title')} />
      <meta property="og:description" content={t('og_desc')} />
      <meta property="og:image" content={SITE.ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={locale} />
      <meta
        property="og:locale:alternate"
        content={lang === 'ko' ? 'en_US' : 'ko_KR'}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('og_title')} />
      <meta name="twitter:description" content={t('og_desc')} />
      <meta name="twitter:image" content={SITE.ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  )
}
