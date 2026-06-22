import type { ReactNode } from 'react'

interface SectionHeadingProps {
  label: string
  title: string
  sub?: ReactNode
}

// 섹션 상단 표준 레이아웃: 손글씨 라벨 + 제목 + (선택) 보조문구
export default function SectionHeading({ label, title, sub }: SectionHeadingProps) {
  return (
    <>
      <span className="sec-label">{label}</span>
      <h2>{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </>
  )
}
