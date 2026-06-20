import { useCallback, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

// 카운트업(easing). reduce-motion이면 즉시 목표값. start()는 한 번만 동작.
export function useCountUp(target: number) {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  const start = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true

    if (reduced) {
      setValue(target)
      return
    }

    const dur = 1100
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [reduced, target])

  return [value, start] as const
}
