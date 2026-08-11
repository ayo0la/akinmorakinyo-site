import { getProfile, getFeaturedPaper, getPosts, getTools } from '@/lib/content'
import { buildStackSections } from '@/lib/home-sections'
import { Hero } from '@/components/home/hero'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { StackedCards } from '@/components/ui/stacked-cards'
import { PillButton } from '@/components/ui/pill-button'

export default function HomePage() {
  const profile = getProfile()
  const sections = buildStackSections({
    post: getPosts()[0] ?? null,
    paper: getFeaturedPaper(),
    tools: getTools(),
  })

  return (
    <div>
      <Hero profile={profile} />

      <Section>
        <Reveal>
          <StackedCards sections={sections} />
        </Reveal>
      </Section>

      <Section className="border-t border-[var(--border)]">
        <Reveal>
          <h2 className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--accent)]">
            About
          </h2>
          <p className="mt-8 max-w-[var(--measure)] text-lg leading-relaxed">
            {profile.bio[0]}
          </p>
          <div className="mt-10">
            <PillButton href="/about" variant="outline">
              More about Dr. Morakinyo
            </PillButton>
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-[var(--border)] text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-medium leading-tight">
            Speaking, media, or research enquiries
          </h2>
          <div className="mt-10 flex justify-center">
            <PillButton href="/contact">Get in touch</PillButton>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}
