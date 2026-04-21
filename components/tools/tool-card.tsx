import Link from 'next/link'
import type { ResearchTool } from '@/lib/types'

export function ToolCard({ tool }: { tool: ResearchTool }) {
  return (
    <Link href={`/tools/${tool._id}`} className="bg-[var(--navy)] rounded border border-transparent hover:border-[var(--gold-dim)] transition-colors p-5 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <span className="text-[var(--gold)] text-xs capitalize">{tool.type}</span>
        {tool.publishedDate && <span className="text-[var(--text-muted)] text-xs">{tool.publishedDate.slice(0, 4)}</span>}
      </div>
      <h2 className="font-serif text-white text-base font-semibold">{tool.title}</h2>
      {tool.description && <p className="text-[var(--text-dim)] text-sm leading-relaxed line-clamp-2">{tool.description}</p>}
    </Link>
  )
}
