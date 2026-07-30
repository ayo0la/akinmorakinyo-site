import { getTools } from '@/lib/content'
import { ToolCard } from '@/components/tools/tool-card'
import { PageHeader } from '@/components/page-header'

export const metadata = { title: 'Research Tools · Dr. Akinola E. Morakinyo' }

export default function ToolsPage() {
  const tools = getTools()
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <PageHeader
        eyebrow="Interactive"
        title="Research Tools"
        subtitle="Interactive calculators and datasets for economic research."
      />
      {tools.length === 0 ? (
        <p className="italic text-[var(--text-muted)]">
          New tools are in the works. Please check back soon.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {tools.map(t => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      )}
    </div>
  )
}
