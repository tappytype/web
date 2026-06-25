import { LINKS } from '@/lib/constants/links'

// 빈 데모 홀더만 프리렌더한다(.howto-demo 는 aspect-ratio 로 공간 예약 → CLS 0).
// 스크롤 근처에서 iframe + 2배속 IFrame API 마운트, youtube 써드파티 쿠키 지연은
// public/islands.js 의 setupYouTube 가 data-yt 를 읽어 처리한다.
export default function YouTubeDemo() {
  return <div id="demo" className="howto-demo" data-yt={LINKS.demoVideoId} />
}
