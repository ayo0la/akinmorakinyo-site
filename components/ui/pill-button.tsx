import Link from 'next/link'
import type { ReactNode } from 'react'

const BASE =
  'inline-flex items-center justify-center font-sans text-sm tracking-wide ' +
  'px-7 py-3 rounded-[var(--radius-pill)] ' +
  'transition-colors duration-200 motion-reduce:transition-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--accent)]'

const VARIANTS = {
  solid:
    'bg-[var(--accent)] text-[var(--accent-contrast)] font-semibold ' +
    'hover:bg-[var(--accent-strong)]',
  outline:
    'border border-[var(--accent)] text-[var(--accent)] ' +
    'hover:bg-[var(--accent-soft)]',
} as const

export function PillButton({
  children,
  href,
  variant = 'solid',
  external = false,
  className = '',
  type = 'button',
  onClick,
}: {
  children: ReactNode
  href?: string
  variant?: keyof typeof VARIANTS
  external?: boolean
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
