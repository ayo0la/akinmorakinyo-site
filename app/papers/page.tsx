import { getPapers } from '@/lib/content'
import { PaperCard } from '@/components/papers/paper-card'
import { PageHeader } from '@/components/page-header'

export const metadata = { title: 'Papers · Dr. Akinola E. Morakinyo' }

export default function PapersPage() {
  const papers = getPapers()
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
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
        <div className="flex flex-col gap-5">
          {papers.map(p => (
            <PaperCard key={p.id} paper={p} />
          ))}
        </div>
      )}
    </div>
  )
}
