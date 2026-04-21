'use client'
import { useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/about', label: 'About' },
  { href: '/papers', label: 'Papers' },
  { href: '/articles', label: 'Articles' },
  { href: '/blog', label: 'Blog' },
  { href: '/tools', label: 'Tools' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-[var(--navy)] border-b border-[var(--gold-dim)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-[var(--gold)] text-[0.6rem] tracking-widest uppercase">Dr.</span>
          <span className="text-white font-bold font-serif text-sm sm:text-base">Akinola Morakinyo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-[var(--text-dim)] hover:text-white text-sm transition-colors">
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-[var(--gold)] border border-[var(--gold)] px-3 py-1 rounded text-sm hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-colors"
          >
            Contact
          </Link>
        </nav>

        <button
          aria-label="menu"
          className="md:hidden flex flex-col gap-1 p-2"
          onClick={() => setOpen(o => !o)}
        >
          <span className="w-5 h-0.5 bg-[var(--gold)] block" />
          <span className="w-5 h-0.5 bg-[var(--gold)] block" />
          <span className="w-5 h-0.5 bg-[var(--gold)] block" />
        </button>
      </div>

      {open && (
        <nav data-testid="mobile-menu" className="md:hidden bg-[var(--navy)] border-t border-[var(--gold-dim)] px-4 pb-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="block py-2 text-[var(--text-dim)] hover:text-white text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="block mt-2 text-center text-[var(--gold)] border border-[var(--gold)] px-3 py-2 rounded text-sm" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  )
}
