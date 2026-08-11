'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { PillButton } from '@/components/ui/pill-button'

const links = [
  { href: '/about', label: 'About' },
  { href: '/papers', label: 'Papers' },
  { href: '/writing', label: 'Writing' },
  { href: '/tools', label: 'Tools' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      data-compact={compact ? 'true' : 'false'}
      className="group sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-[8px] transition-all duration-200 motion-reduce:transition-none"
    >
      <div className="max-w-5xl mx-auto px-[var(--gutter)] flex items-center justify-between transition-all duration-200 motion-reduce:transition-none h-[var(--nav-h)] group-data-[compact=true]:h-[var(--nav-h-compact)]">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[var(--accent)]">Dr.</span>
          <span className="font-display text-base sm:text-lg font-semibold text-[var(--heading)]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Akinola Morakinyo
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-sm text-[var(--text-muted)] hover:text-[var(--heading)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <PillButton href="/contact" variant="outline" size="compact">
              Contact
            </PillButton>
          </nav>

          <ThemeToggle />

          <button
            aria-label={open ? 'close menu' : 'open menu'}
            aria-expanded={open}
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(o => !o)}
          >
            <span className="w-5 h-px bg-[var(--accent)] block" />
            <span className="w-5 h-px bg-[var(--accent)] block" />
            <span className="w-5 h-px bg-[var(--accent)] block" />
          </button>
        </div>
      </div>

      {open && (
        <nav
          data-testid="mobile-menu"
          className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 pb-5 pt-2"
        >
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2.5 font-sans text-sm text-[var(--text-muted)] hover:text-[var(--heading)]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3">
            <PillButton
              href="/contact"
              variant="outline"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Contact
            </PillButton>
          </div>
        </nav>
      )}
    </header>
  )
}
