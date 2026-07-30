import Link from 'next/link'
import type { ResearchTool } from '@/lib/types'

export function ToolsStrip({ tools }: { tools: ResearchTool[] }) {
  if (tools.length === 0) return null
  return (
    <section className="border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-baseline justify-between">
          <h2 className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--accent)]">
            Research Tools
          </h2>
          <Link href="/tools" className="font-sans text-xs text-[var(--accent)] hover:underline underline-offset-4">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {tools.slice(0, 2).map(tool => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-6 hover:border-[var(--accent-soft)] hover:-translate-y-0.5 transition-all"
            >
              <span className="font-sans text-xs uppercase tracking-wider text-[var(--accent)] capitalize">
                {tool.type}
              </span>
              <p className="mt-2 text-lg font-medium leading-snug text-[var(--heading)]">{tool.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)] line-clamp-2">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
