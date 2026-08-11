import type { ReactNode } from 'react'

type CardElement = 'div' | 'article' | 'li'

const BASE =
  'bg-[var(--surface)] border border-[var(--border)] ' +
  'rounded-[var(--radius-card)] shadow-[var(--card-shadow)] ' +
  'p-[clamp(1.5rem,3vw,2.5rem)]'

const INTERACTIVE =
  'transition-all duration-200 ease-out ' +
  'motion-reduce:transition-none ' +
  '[@media(hover:hover)]:hover:-translate-y-0.5 ' +
  'hover:-translate-y-0.5 ' +
  'hover:border-[var(--accent-soft)]'

export function Card({
  children,
  className = '',
  as: Tag = 'div',
  interactive = false,
}: {
  children: ReactNode
  className?: string
  as?: CardElement
  interactive?: boolean
}) {
  return (
    <Tag className={`${BASE} ${interactive ? INTERACTIVE : ''} ${className}`}>
      {children}
    </Tag>
  )
}
