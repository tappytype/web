import { useEffect, useRef } from 'react'

interface UseRevealOptions {
  onReveal?: () => void
}

// 스크롤 진입 시 'is-visible'를 부여(원본 IntersectionObserver 동작 이식).
// 마운트 시 이미 뷰포트에 든 섹션은 즉시 노출(SSG hydration·풀페이지 캡처 안전망).
export function useReveal<T extends HTMLElement = HTMLElement>({ onReveal }: UseRevealOptions = {}) {
  const ref = useRef<T>(null)
  const firedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = () => {
      if (firedRef.current) return
      firedRef.current = true
      el.classList.add('is-visible')
      onReveal?.()
    }

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal()
            io.disconnect()
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [onReveal])

  return ref
}
