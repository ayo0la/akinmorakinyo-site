import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { PillButton } from '@/components/ui/pill-button'
import { formatDate } from '@/lib/format'
import type { StackSection } from '@/lib/home-sections'

export function StackedCards({ sections }: { sections: StackSection[] }) {
  if (sections.length === 0) return null

  return (
    <div className="flex flex-col gap-[var(--space-block)]">
      {sections.map((section, i) => (
        <div
          key={section.id}
          className="stack-item"
          style={{ '--i': i } as CSSProperties}
        >
          <Card>
            <span
              aria-hidden="true"
              className="font-sans text-sm tracking-[0.2em] text-[var(--accent)] tabular-nums"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--text-muted)]">
                {section.label}
              </p>
              {section.date && (
                <time
                  dateTime={section.date}
                  className="font-sans text-xs text-[var(--text-muted)] whitespace-nowrap"
                >
                  {formatDate(section.date)}
                </time>
              )}
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-medium leading-snug">
              {section.title}
            </h2>
            {section.description && (
              <p className="mt-4 max-w-[var(--measure)] leading-relaxed text-[var(--text)]">
                {section.description}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <PillButton
                href={section.href}
                external={section.external}
                variant="outline"
              >
                {section.cta}
              </PillButton>
              {section.secondaryHref && section.secondaryCta && (
                <Link
                  href={section.secondaryHref}
                  className="font-sans text-sm text-[var(--accent)] hover:underline underline-offset-4"
                >
                  {section.secondaryCta}
                </Link>
              )}
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
