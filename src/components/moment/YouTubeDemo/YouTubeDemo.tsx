import { useEffect } from 'react'
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

// 데모 영상을 2배속·음소거·자동재생으로 띄운다. YT IFrame API는 클라이언트에서만 로드.
export default function YouTubeDemo() {
  const { demoVideoId } = LINKS

  useEffect(() => {
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
  }, [])

  const src =
    `https://www.youtube-nocookie.com/embed/${demoVideoId}` +
    `?autoplay=1&mute=1&playsinline=1&rel=0&loop=1&playlist=${demoVideoId}&enablejsapi=1&vq=hd1080`

  return (
    <div id="demo" className="howto-demo">
      <iframe
        id={PLAYER_ID}
        src={src}
        title="TappyType 데모 영상 — 손글씨가 폰트가 되는 과정"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
