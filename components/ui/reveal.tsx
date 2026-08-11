'use client'
import type { ReactNode } from 'react'
import { useReveal } from '@/lib/use-reveal'

export function Reveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-revealed={revealed ? 'true' : 'false'}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  )
}
