import { useEffect, useRef, useState } from 'react'
import { LINKS } from '@/lib/constants/links'

const PLAYER_ID = 'ttDemo'
const API_SRC = 'https://www.youtube.com/iframe_api'

interface YTPlayer {
  setPlaybackRate: (rate: number) => void
  mute: () => void
  playVideo: () => void
}

interface YTWindow extends Window {
  YT?: { Player: new (id: string, opts: unknown) => YTPlayer }
  onYouTubeIframeAPIReady?: () => void
}

// 데모 영상은 사용자가 스크롤로 근처에 올 때만 마운트한다.
// 초기 로드에서 YouTube iframe·IFrame API(써드파티 쿠키 3종)를 완전히 배제해
// Best Practices(3P 쿠키) 실패와 초기 로드 성능 비용을 함께 없앤다.
// 컨테이너(.howto-demo)는 aspect-ratio로 공간을 미리 잡아두므로 CLS가 없다.
export default function YouTubeDemo() {
  const { demoVideoId } = LINKS
  const holderRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  // 뷰포트 300px 앞에서 미리 마운트해 도착 즉시 자동재생되게 한다.
  useEffect(() => {
    const el = holderRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // iframe이 마운트된 뒤에만 2배속 제어용 IFrame API를 주입한다.
  useEffect(() => {
    if (!active) return
    const w = window as YTWindow

    const createPlayer = () => {
      if (!w.YT) return
      new w.YT.Player(PLAYER_ID, {
        events: {
          onReady: (e: { target: YTPlayer }) => {
            try {
              e.target.setPlaybackRate(2)
              e.target.mute()
              e.target.playVideo()
            } catch {
              /* noop */
            }
          },
        },
      })
    }

    if (w.YT) {
      createPlayer()
    } else {
      w.onYouTubeIframeAPIReady = createPlayer
      if (!document.querySelector(`script[src="${API_SRC}"]`)) {
        const s = document.createElement('script')
        s.src = API_SRC
        document.body.appendChild(s)
      }
    }
  }, [active])

  const src =
    `https://www.youtube-nocookie.com/embed/${demoVideoId}` +
    `?autoplay=1&mute=1&playsinline=1&rel=0&loop=1&playlist=${demoVideoId}&enablejsapi=1&vq=hd1080`

  return (
    <div id="demo" className="howto-demo" ref={holderRef}>
      {active && (
        <iframe
          id={PLAYER_ID}
          src={src}
          title="TappyType 데모 영상 — 손글씨가 폰트가 되는 과정"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  )
}
