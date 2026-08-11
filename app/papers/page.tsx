import { getPapers } from '@/lib/content'
import { PaperCard } from '@/components/papers/paper-card'
import { PageHeader } from '@/components/page-header'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'

export const metadata = { title: 'Papers · Dr. Akinola E. Morakinyo' }

export default function PapersPage() {
  const papers = getPapers()
  return (
    <Section width="narrow">
      <PageHeader
        eyebrow="Research"
        title="Academic Papers"
        subtitle="Peer-reviewed research and working papers."
      />
      {papers.length === 0 ? (
        <p className="italic text-[var(--text-muted)]">
          Publications are being prepared for this page. Please check back soon.
        </p>
      ) : (
        <Reveal>
          <div className="flex flex-col gap-6">
            {papers.map(p => (
              <PaperCard key={p.id} paper={p} />
            ))}
          </div>
        </Reveal>
      )}
    </Section>
  )
}
