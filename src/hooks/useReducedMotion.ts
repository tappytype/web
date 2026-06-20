import { useEffect, useState } from 'react'

// prefers-reduced-motion 존중. SSR/프리렌더에서는 false로 시작해 hydration 후 동기화.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}
