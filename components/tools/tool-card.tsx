import Link from 'next/link'
import type { ResearchTool } from '@/lib/types'
import { formatYear } from '@/lib/format'
import { Card } from '@/components/ui/card'

export function ToolCard({ tool }: { tool: ResearchTool }) {
  return (
    <Link href={`/tools/${tool.id}`} className="block h-full">
      <Card interactive className="flex flex-col gap-2 h-full">
        <div className="flex justify-between items-baseline font-sans text-xs">
          <span className="uppercase tracking-wider text-[var(--accent)] capitalize">{tool.type}</span>
          <span className="text-[var(--text-muted)]">{formatYear(tool.publishedDate)}</span>
        </div>
        <h2 className="text-xl font-medium leading-snug">{tool.title}</h2>
        <p className="text-sm leading-relaxed text-[var(--text)] line-clamp-2">{tool.description}</p>
      </Card>
    </Link>
  )
}
