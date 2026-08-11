import { render, screen } from '@testing-library/react'
import { ToolCard } from '@/components/tools/tool-card'
import type { ResearchTool } from '@/lib/types'

const baseTool: ResearchTool = {
  id: 'inflation-calculator',
  title: 'Inflation Calculator',
  description: 'Estimate the real value of a dollar amount across years.',
  type: 'calculator',
  visualizationType: 'line-chart',
  componentSlug: 'inflation-calculator',
  tags: ['prices'],
  publishedDate: '2023-01-10',
}

describe('ToolCard', () => {
  it('links internally to the tool detail route', () => {
    render(<ToolCard tool={baseTool} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/tools/inflation-calculator')
    expect(link).not.toHaveAttribute('target')
  })

  it('renders the type, publication year, title, and description', () => {
    render(<ToolCard tool={baseTool} />)
    expect(screen.getByText('calculator')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getByText('Inflation Calculator')).toBeInTheDocument()
    expect(
      screen.getByText('Estimate the real value of a dollar amount across years.')
    ).toBeInTheDocument()
  })
})
