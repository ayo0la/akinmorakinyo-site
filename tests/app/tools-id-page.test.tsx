import { render, screen } from '@testing-library/react'
import type { ResearchTool } from '@/lib/types'

const { getToolMock, getCalculatorMock, notFoundMock } = vi.hoisted(() => ({
  getToolMock: vi.fn(),
  getCalculatorMock: vi.fn(),
  notFoundMock: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

vi.mock('@/lib/content', () => ({ getTool: getToolMock, getTools: vi.fn(() => []) }))
vi.mock('next/navigation', () => ({ notFound: notFoundMock }))
vi.mock('@/components/tools/calculators/registry', () => ({
  getCalculator: getCalculatorMock,
}))
vi.mock('@/components/tools/dataset-viewer', () => ({
  DatasetViewer: (props: { csvUrl: string }) => (
    <div data-testid="dataset-viewer-stub">{props.csvUrl}</div>
  ),
}))

const calculatorTool: ResearchTool = {
  id: 'inflation-calculator',
  title: 'Inflation Calculator',
  description: 'Estimate the real value of a dollar amount across years.',
  type: 'calculator',
  visualizationType: 'line-chart',
  componentSlug: 'inflation-calculator',
  tags: ['prices'],
  publishedDate: '2023-01-10',
}

const datasetTool: ResearchTool = {
  id: 'cpi-dataset',
  title: 'CPI Dataset',
  description: 'Historical CPI values.',
  type: 'dataset',
  visualizationType: 'table',
  componentSlug: 'cpi-dataset',
  datasetPath: '/data/cpi.csv',
  xAxis: 'year',
  yAxis: 'cpi',
  tags: [],
  publishedDate: '2023-01-10',
}

describe('ToolPage', () => {
  beforeEach(() => {
    getToolMock.mockReset()
    getCalculatorMock.mockReset()
    notFoundMock.mockClear()
  })

  it('renders the type eyebrow, title, and description', async () => {
    getToolMock.mockReturnValue(calculatorTool)
    getCalculatorMock.mockReturnValue(() => <div data-testid="calculator-stub" />)
    const { default: ToolPage } = await import('@/app/tools/[id]/page')
    render(await ToolPage({ params: Promise.resolve({ id: 'inflation-calculator' }) }))
    expect(screen.getByText('calculator')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Inflation Calculator' })).toBeInTheDocument()
    expect(
      screen.getByText('Estimate the real value of a dollar amount across years.')
    ).toBeInTheDocument()
  })

  it('wraps the calculator in a Card when one is registered', async () => {
    getToolMock.mockReturnValue(calculatorTool)
    getCalculatorMock.mockReturnValue(() => <div data-testid="calculator-stub" />)
    const { default: ToolPage } = await import('@/app/tools/[id]/page')
    render(await ToolPage({ params: Promise.resolve({ id: 'inflation-calculator' }) }))
    const stub = screen.getByTestId('calculator-stub')
    expect(stub.closest('[class*="rounded-\\[var(--radius-card)\\]"]')).not.toBeNull()
  })

  it('shows a not-found message when no calculator is registered for the slug', async () => {
    getToolMock.mockReturnValue(calculatorTool)
    getCalculatorMock.mockReturnValue(null)
    const { default: ToolPage } = await import('@/app/tools/[id]/page')
    render(await ToolPage({ params: Promise.resolve({ id: 'inflation-calculator' }) }))
    expect(screen.getByText('Calculator not found: inflation-calculator')).toBeInTheDocument()
  })

  it('wraps the dataset viewer in a Card and passes dataset props through', async () => {
    getToolMock.mockReturnValue(datasetTool)
    const { default: ToolPage } = await import('@/app/tools/[id]/page')
    render(await ToolPage({ params: Promise.resolve({ id: 'cpi-dataset' }) }))
    const stub = screen.getByTestId('dataset-viewer-stub')
    expect(stub).toHaveTextContent('/data/cpi.csv')
    expect(stub.closest('[class*="rounded-\\[var(--radius-card)\\]"]')).not.toBeNull()
  })

  it('calls notFound when the tool does not exist', async () => {
    getToolMock.mockReturnValue(null)
    const { default: ToolPage } = await import('@/app/tools/[id]/page')
    await expect(
      ToolPage({ params: Promise.resolve({ id: 'missing' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
    expect(notFoundMock).toHaveBeenCalled()
  })
})
