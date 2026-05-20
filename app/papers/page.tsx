export const revalidate = 60

import { getPapers } from '@/sanity/queries'
import { PaperCard } from '@/components/papers/paper-card'

export default async function PapersPage() {
  const papers = await getPapers()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl text-white font-bold mb-2">Academic Papers</h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">Peer-reviewed research and working papers.</p>
      {papers.length === 0
        ? <p className="text-[var(--text-muted)]">No papers published yet.</p>
        : <div className="flex flex-col gap-4">{papers.map(p => <PaperCard key={p._id} paper={p} />)}</div>
      }
    </div>
  )
}
