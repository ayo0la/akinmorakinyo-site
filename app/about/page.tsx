import Image from 'next/image'
import { getProfile } from '@/lib/content'
import { PageHeader } from '@/components/page-header'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'

export const metadata = { title: 'About · Dr. Akinola E. Morakinyo' }

export default function AboutPage() {
  const profile = getProfile()

  return (
    <Section width="narrow">
      <PageHeader eyebrow="About" title={profile.name} />
      <div className="flex flex-col sm:flex-row gap-10 items-center sm:items-start">
        <div className="relative w-36 h-36 flex-shrink-0 rounded-full overflow-hidden ring-1 ring-[var(--accent-soft)] ring-offset-4 ring-offset-[var(--bg)]">
          <Image src={profile.photo} alt={profile.name} fill sizes="144px" className="object-cover" priority />
        </div>
        <div className="text-center sm:text-left">
          <p className="font-sans text-sm text-[var(--text-muted)]">
            {profile.department}
            <br />
            {profile.university}
          </p>
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4 font-sans text-sm">
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline underline-offset-4">
                LinkedIn
              </a>
            )}
            {profile.googleScholarUrl && (
              <a href={profile.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline underline-offset-4">
                Google Scholar
              </a>
            )}
            {profile.universityUrl && (
              <a href={profile.universityUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline underline-offset-4">
                University Profile
              </a>
            )}
            {profile.cvPath && (
              <a
                href={profile.cvPath}
                download
                className="bg-[var(--accent)] text-[var(--accent-contrast)] px-4 py-1.5 rounded-sm font-semibold hover:bg-[var(--accent-strong)] transition-colors"
              >
                Download CV
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="mt-12 max-w-[var(--measure)] space-y-5 text-lg leading-relaxed">
        <Reveal>
          <p>{profile.bio[0]}</p>
        </Reveal>
        <blockquote className="my-[var(--space-block)] border-l-2 border-[var(--accent)] pl-8 font-display text-[clamp(1.35rem,3vw,1.9rem)] italic leading-snug text-[var(--heading)]">
          {profile.statementOfPurpose}
        </blockquote>
        <Reveal>
          {profile.bio.slice(1).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
