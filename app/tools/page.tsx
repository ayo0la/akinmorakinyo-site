import { getResearchTools } from '@/sanity/queries'
import { ToolCard } from '@/components/tools/tool-card'

export default async function ToolsPage() {
  const tools = await getResearchTools()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl text-white font-bold mb-2">Research Tools</h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">Interactive calculators and datasets for economic research.</p>
      {tools.length === 0
        ? <p className="text-[var(--text-muted)]">No tools published yet.</p>
        : <div className="grid gap-4 sm:grid-cols-2">{tools.map(t => <ToolCard key={t._id} tool={t} />)}</div>
      }
    </div>
  )
}
