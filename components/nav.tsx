'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { href: '/about', label: 'About' },
  { href: '/papers', label: 'Papers' },
  { href: '/writing', label: 'Writing' },
  { href: '/tools', label: 'Tools' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
            <Link
              href="/contact"
              className="font-sans text-sm border border-[var(--accent)] text-[var(--accent)] px-4 py-1.5 rounded-sm hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] transition-colors"
            >
              Contact
            </Link>
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
          <Link
            href="/contact"
            className="mt-3 block text-center font-sans text-sm border border-[var(--accent)] text-[var(--accent)] px-4 py-2.5 rounded-sm"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  )
}
