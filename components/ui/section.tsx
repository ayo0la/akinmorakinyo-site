import type { ReactNode } from 'react'

type SectionElement = 'section' | 'div' | 'article' | 'header'

const WIDTHS = {
  wide: 'max-w-5xl',
  medium: 'max-w-4xl',
  narrow: 'max-w-3xl',
  prose: 'max-w-2xl',
} as const

export function Section({
  children,
  className = '',
  as: Tag = 'section',
  width = 'wide',
}: {
  children: ReactNode
  className?: string
  as?: SectionElement
  width?: keyof typeof WIDTHS
}) {
  return (
    <Tag className={`py-[var(--space-section)] px-[var(--gutter)] ${className}`}>
      <div className={`${WIDTHS[width]} mx-auto`}>{children}</div>
    </Tag>
  )
}
