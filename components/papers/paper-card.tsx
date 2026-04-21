import type { Paper } from '@/lib/types'

export function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="bg-[var(--navy)] rounded border border-transparent hover:border-[var(--gold-dim)] transition-colors p-5">
      <div className="flex justify-between items-start gap-4">
        <h2 className="font-serif text-white text-base font-semibold leading-snug">{paper.title}</h2>
        <span className="text-[var(--text-muted)] text-xs whitespace-nowrap">{paper.publishedDate?.slice(0, 4)}</span>
      </div>
      {paper.journal && <p className="text-[var(--gold)] text-xs mt-1">{paper.journal}</p>}
      {paper.coAuthors?.length > 0 && <p className="text-[var(--text-muted)] text-xs mt-1">with {paper.coAuthors.join(', ')}</p>}
      {paper.abstract && <p className="text-[var(--text-dim)] text-sm mt-3 leading-relaxed line-clamp-3">{paper.abstract}</p>}
      <div className="flex gap-3 mt-4">
        {paper.pdfUrl && <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] text-xs hover:underline">View PDF &rarr;</a>}
        {paper.googleScholarUrl && <a href={paper.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] text-xs hover:text-white">Google Scholar</a>}
      </div>
    </article>
  )
}
