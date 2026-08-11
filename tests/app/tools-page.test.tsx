import { render, screen } from '@testing-library/react'
import type { ResearchTool } from '@/lib/types'

const { getToolsMock } = vi.hoisted(() => ({ getToolsMock: vi.fn() }))

vi.mock('@/lib/content', () => ({ getTools: getToolsMock }))

const sampleTool: ResearchTool = {
  id: 'sample-tool',
  title: 'A Sample Tool',
  description: 'A description.',
  type: 'calculator',
  visualizationType: 'table',
  componentSlug: 'sample-tool',
  tags: [],
  publishedDate: '2026-01-01',
}

describe('ToolsPage', () => {
  beforeEach(() => {
    getToolsMock.mockReset()
  })

  it('renders the eyebrow, title, and subtitle', async () => {
    getToolsMock.mockReturnValue([])
    const { default: ToolsPage } = await import('@/app/tools/page')
    render(ToolsPage())
    expect(screen.getByText('Interactive')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Research Tools' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Interactive calculators and datasets for economic research.')
    ).toBeInTheDocument()
  })

  it('shows the exact empty-state copy when there are no tools', async () => {
    getToolsMock.mockReturnValue([])
    const { default: ToolsPage } = await import('@/app/tools/page')
    render(ToolsPage())
    expect(
      screen.getByText('New tools are in the works. Please check back soon.')
    ).toBeInTheDocument()
  })

  it('renders a card per tool and no empty state when tools exist', async () => {
    getToolsMock.mockReturnValue([sampleTool])
    const { default: ToolsPage } = await import('@/app/tools/page')
    render(ToolsPage())
    expect(
      screen.getByRole('heading', { level: 2, name: sampleTool.title })
    ).toBeInTheDocument()
    expect(
      screen.queryByText('New tools are in the works. Please check back soon.')
    ).not.toBeInTheDocument()
  })

  it('keeps the page metadata title', async () => {
    const { metadata } = await import('@/app/tools/page')
    expect(metadata).toEqual({ title: 'Research Tools · Dr. Akinola E. Morakinyo' })
  })
})
