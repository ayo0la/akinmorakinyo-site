export const revalidate = 60

import { notFound } from 'next/navigation'
import { getResearchTool } from '@/sanity/queries'
import { DatasetViewer } from '@/components/tools/dataset-viewer'
import { getCalculator } from '@/components/tools/calculators/registry'

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = await getResearchTool(id)
  if (!tool) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <span className="text-[var(--gold)] text-xs uppercase tracking-wide">{tool.type}</span>
        <h1 className="font-serif text-2xl text-white font-bold mt-1">{tool.title}</h1>
        {tool.description && <p className="text-[var(--text-dim)] text-sm mt-2 leading-relaxed">{tool.description}</p>}
      </div>

      {tool.type === 'calculator' && (() => {
        const Calculator = getCalculator(tool.componentSlug)
        return Calculator
          ? <Calculator />
          : <p className="text-[var(--text-muted)]">Calculator not found: {tool.componentSlug}</p>
      })()}

      {tool.type === 'dataset' && tool.datasetFileUrl && (
        <DatasetViewer
          csvUrl={tool.datasetFileUrl}
          xAxis={tool.xAxis ?? 'x'}
          yAxis={tool.yAxis ?? 'y'}
          visualizationType={tool.visualizationType}
        />
      )}
    </div>
  )
}
