import Link from 'next/link'
import type { ResearchTool } from '@/lib/types'

export function ToolsStrip({ tools }: { tools: ResearchTool[] }) {
  if (tools.length === 0) return null
  return (
    <section className="py-6 px-4 sm:px-6 border-t border-[var(--gold-dim)]">
      <h2 className="text-[var(--gold)] text-xs tracking-widest uppercase mb-3">Research Tools</h2>
      <div className="flex flex-col sm:flex-row gap-2">
        {tools.slice(0, 2).map(tool => (
          <Link key={tool._id} href={`/tools/${tool._id}`} className="bg-[var(--navy)] px-4 py-3 rounded text-sm text-[var(--text-muted)] hover:text-white flex-1 transition-colors">
            {tool.title}
          </Link>
        ))}
        <Link href="/tools" className="bg-[var(--navy)] px-4 py-3 rounded text-sm text-[var(--gold)] hover:opacity-80 text-center sm:text-left">
          View All →
        </Link>
      </div>
    </section>
  )
}
