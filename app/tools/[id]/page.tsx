import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTool, getTools } from '@/lib/content'
import { DatasetViewer } from '@/components/tools/dataset-viewer'
import { getCalculator } from '@/components/tools/calculators/registry'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'

export const dynamicParams = false

export function generateStaticParams() {
  return getTools().map(t => ({ id: t.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const tool = getTool(id)
  return tool ? { title: `${tool.title} · Dr. Akinola E. Morakinyo`, description: tool.description } : {}
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = getTool(id)
  if (!tool) notFound()

  return (
    <Section width="narrow">
      <div className="mb-[var(--space-block)]">
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--accent)] capitalize">
          {tool.type}
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-medium leading-tight">{tool.title}</h1>
        {tool.description && (
          <p className="mt-3 max-w-xl leading-relaxed text-[var(--text-muted)]">{tool.description}</p>
        )}
        <div className="mt-6 h-px w-16 bg-[var(--accent)]" />
      </div>

      {tool.type === 'calculator' &&
        (() => {
          const Calculator = getCalculator(tool.componentSlug)
          return Calculator ? (
            <Card>
              <Calculator />
            </Card>
          ) : (
            <p className="text-[var(--text-muted)]">Calculator not found: {tool.componentSlug}</p>
          )
        })()}

      {tool.type === 'dataset' && tool.datasetPath && (
        <Card>
          <DatasetViewer
            csvUrl={tool.datasetPath}
            xAxis={tool.xAxis ?? 'x'}
            yAxis={tool.yAxis ?? 'y'}
            visualizationType={tool.visualizationType}
          />
        </Card>
      )}
    </Section>
  )
}
