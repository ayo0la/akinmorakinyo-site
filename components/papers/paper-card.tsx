import type { Paper } from '@/lib/types'
import { formatYear } from '@/lib/format'

export function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-6 hover:border-[var(--accent-soft)] transition-colors">
      <div className="flex justify-between items-start gap-4">
        <h2 className="text-xl font-medium leading-snug">{paper.title}</h2>
        <span className="font-sans text-xs text-[var(--text-muted)] whitespace-nowrap">
          {formatYear(paper.publishedDate)}
        </span>
      </div>
      {paper.journal && (
        <p className="mt-1 font-sans text-xs text-[var(--accent)]">{paper.journal}</p>
      )}
      {paper.coAuthors.length > 0 && (
        <p className="mt-1 font-sans text-xs text-[var(--text-muted)]">
          with {paper.coAuthors.join(', ')}
        </p>
      )}
      {paper.abstract && (
        <p className="mt-4 text-sm leading-relaxed text-[var(--text)] line-clamp-3">{paper.abstract}</p>
      )}
      <div className="mt-5 flex gap-4 font-sans text-xs">
        {paper.pdfPath && (
          <a href={paper.pdfPath} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline underline-offset-4">
            View PDF →
          </a>
        )}
        {paper.googleScholarUrl && (
          <a href={paper.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--heading)] transition-colors">
            Google Scholar
          </a>
        )}
      </div>
    </article>
  )
}
