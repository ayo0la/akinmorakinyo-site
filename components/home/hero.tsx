import Image from 'next/image'
import type { Profile } from '@/lib/types'
import { Section } from '@/components/ui/section'
import { PillButton } from '@/components/ui/pill-button'

export function Hero({ profile }: { profile: Profile }) {
  return (
    <Section>
      <div className="grid gap-[var(--space-block)] md:grid-cols-[1fr_auto] md:items-center">
        <div className="order-2 md:order-1 text-center md:text-left">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--accent)]">
            Economist · Researcher · Columnist
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
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
            <PillButton href="/papers">View Papers</PillButton>
            <PillButton href="/writing" variant="outline">
              Read Writing
            </PillButton>
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
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden ring-1 ring-[var(--accent-soft)] ring-offset-8 ring-offset-[var(--bg)]">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="(min-width: 640px) 192px, 160px"
              className="object-cover"
              preload
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
