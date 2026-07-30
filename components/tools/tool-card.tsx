import Link from 'next/link'
import type { ResearchTool } from '@/lib/types'
import { formatYear } from '@/lib/format'

export function ToolCard({ tool }: { tool: ResearchTool }) {
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-6 flex flex-col gap-2 hover:border-[var(--accent-soft)] hover:-translate-y-0.5 transition-all"
    >
      <div className="flex justify-between items-baseline font-sans text-xs">
        <span className="uppercase tracking-wider text-[var(--accent)] capitalize">{tool.type}</span>
        <span className="text-[var(--text-muted)]">{formatYear(tool.publishedDate)}</span>
      </div>
      <h2 className="text-xl font-medium leading-snug">{tool.title}</h2>
      <p className="text-sm leading-relaxed text-[var(--text)] line-clamp-2">{tool.description}</p>
    </Link>
  )
}
