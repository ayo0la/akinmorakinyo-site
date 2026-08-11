import { getTools } from '@/lib/content'
import { ToolCard } from '@/components/tools/tool-card'
import { PageHeader } from '@/components/page-header'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'

export const metadata = { title: 'Research Tools · Dr. Akinola E. Morakinyo' }

export default function ToolsPage() {
  const tools = getTools()
  return (
    <Section width="narrow">
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
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {tools.map(t => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </Reveal>
      )}
    </Section>
  )
}
