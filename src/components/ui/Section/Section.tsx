import type { HTMLAttributes } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  onReveal?: () => void
}

// 스크롤 리빌 래퍼. 모든 섹션의 공통 <section class="reveal"> 진입 처리.
export default function Section({ onReveal, className = '', children, ...rest }: SectionProps) {
  const ref = useReveal<HTMLElement>({ onReveal })
  return (
    <section ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </section>
  )
}
