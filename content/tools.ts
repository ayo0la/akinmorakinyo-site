import type { ResearchTool } from '@/lib/types'

// Calculators need a matching entry in components/tools/calculators/registry.tsx
// (componentSlug). Datasets need a CSV in public/ referenced by datasetPath.
export const tools: ResearchTool[] = [
  {
    id: 'inflation-calculator',
    title: 'Inflation Calculator',
    description:
      'Adjust a naira amount for inflation between two years using Nigerian CPI data.',
    type: 'calculator',
    visualizationType: 'table',
    componentSlug: 'inflation-calculator',
    tags: ['inflation', 'cpi'],
    publishedDate: '2026-04-21',
  },
]
