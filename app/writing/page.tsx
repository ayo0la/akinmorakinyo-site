import { getPosts } from '@/lib/content'
import { WritingCard } from '@/components/writing/writing-card'
import { PageHeader } from '@/components/page-header'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'

export const metadata = { title: 'Writing · Dr. Akinola E. Morakinyo' }

export default function WritingPage() {
  const posts = getPosts()
  return (
    <Section width="narrow">
      <PageHeader
        eyebrow="Writing"
        title="Essays, Columns & Commentary"
        subtitle="Original essays alongside published columns, including pieces for Nairametrics and other outlets."
      />
      {posts.length === 0 ? (
        <p className="italic text-[var(--text-muted)]">
          New writing is on its way. Please check back soon.
        </p>
      ) : (
        <Reveal>
          <div className="flex flex-col gap-6">
            {posts.map(p => (
              <WritingCard key={p.slug} post={p} />
            ))}
          </div>
        </Reveal>
      )}
    </Section>
  )
}
