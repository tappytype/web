import type { AnchorHTMLAttributes } from 'react'
import AppleMark from '@/components/ui/AppleMark/AppleMark'
import { useLang } from '@/contexts/LangContext'
import { LINKS } from '@/lib/constants/links'
import './AppStoreBadge.css'

const sizeStyles = {
  sm: 'appstore sm',
  md: 'appstore',
  lg: 'appstore lg',
}

interface AppStoreBadgeProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: keyof typeof sizeStyles
}

export default function AppStoreBadge({ size = 'md', className = '', ...rest }: AppStoreBadgeProps) {
  const { t } = useLang()
  return (
    <a
      className={`${sizeStyles[size]} ${className}`.trim()}
      href={LINKS.appStore}
      target="_blank"
      rel="noopener"
      {...rest}
    >
      <AppleMark />
      <span className="ab-text">
        <small>{t('ab_small')}</small>
        <b>{t('ab_big')}</b>
      </span>
    </a>
  )
}
