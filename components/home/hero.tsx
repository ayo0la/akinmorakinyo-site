import Image from 'next/image'
import Link from 'next/link'
import type { Profile } from '@/lib/types'

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="px-4 sm:px-6">
      <div className="max-w-5xl mx-auto py-16 sm:py-24 grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
        <div className="order-2 md:order-1 text-center md:text-left">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--accent)]">
            Economist · Researcher · Columnist
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08]">
            {profile.name}
          </h1>
          <div className="mt-6 h-px w-16 bg-[var(--accent)] mx-auto md:mx-0" />
          <p className="mt-6 font-sans text-sm text-[var(--text-muted)]">
            {profile.department}
            <br />
            {profile.university}
          </p>
          <blockquote className="mt-8 max-w-md mx-auto md:mx-0 border-l-2 border-[var(--accent)] pl-5 text-left text-lg italic leading-relaxed text-[var(--text)]">
            {profile.statementOfPurpose}
          </blockquote>
          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              href="/papers"
              className="bg-[var(--accent)] text-[var(--accent-contrast)] px-6 py-3 rounded-sm font-sans text-sm font-semibold tracking-wide hover:bg-[var(--accent-strong)] transition-colors"
            >
              View Papers
            </Link>
            <Link
              href="/writing"
              className="border border-[var(--accent)] text-[var(--accent)] px-6 py-3 rounded-sm font-sans text-sm tracking-wide hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] transition-colors"
            >
              Read Writing
            </Link>
          </div>
          <div className="mt-8 flex justify-center md:justify-start gap-5 font-sans text-xs text-[var(--text-muted)]">
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                LinkedIn
              </a>
            )}
            {profile.googleScholarUrl && (
              <a href={profile.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                Google Scholar
              </a>
            )}
            {profile.universityUrl && (
              <a href={profile.universityUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                University
              </a>
            )}
          </div>
        </div>
        <div className="order-1 md:order-2 justify-self-center md:justify-self-end">
          <div className="relative w-44 h-44 sm:w-60 sm:h-60 rounded-full overflow-hidden ring-1 ring-[var(--accent-soft)] ring-offset-8 ring-offset-[var(--bg)]">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="(min-width: 640px) 240px, 176px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
