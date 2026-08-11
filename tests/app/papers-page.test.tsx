import { render, screen } from '@testing-library/react'
import type { Paper } from '@/lib/types'

const { getPapersMock } = vi.hoisted(() => ({ getPapersMock: vi.fn() }))

vi.mock('@/lib/content', () => ({ getPapers: getPapersMock }))

const samplePaper: Paper = {
  id: 'sample-paper',
  title: 'A Sample Paper on Nigerian Trade',
  abstract: 'An abstract.',
  publishedDate: '2026-01-01',
  coAuthors: [],
  tags: [],
}

describe('PapersPage', () => {
  beforeEach(() => {
    getPapersMock.mockReset()
  })

  it('renders the eyebrow, title, and subtitle', async () => {
    getPapersMock.mockReturnValue([])
    const { default: PapersPage } = await import('@/app/papers/page')
    render(PapersPage())
    expect(screen.getByText('Research')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Academic Papers' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Peer-reviewed research and working papers.')
    ).toBeInTheDocument()
  })

  it('shows the exact empty-state copy when there are no papers', async () => {
    getPapersMock.mockReturnValue([])
    const { default: PapersPage } = await import('@/app/papers/page')
    render(PapersPage())
    expect(
      screen.getByText(
        'Publications are being prepared for this page. Please check back soon.'
      )
    ).toBeInTheDocument()
  })

  it('renders a card per paper and no empty state when papers exist', async () => {
    getPapersMock.mockReturnValue([samplePaper])
    const { default: PapersPage } = await import('@/app/papers/page')
    render(PapersPage())
    expect(
      screen.getByRole('heading', { level: 2, name: samplePaper.title })
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        'Publications are being prepared for this page. Please check back soon.'
      )
    ).not.toBeInTheDocument()
  })

  it('keeps the page metadata title', async () => {
    const { metadata } = await import('@/app/papers/page')
    expect(metadata).toEqual({ title: 'Papers · Dr. Akinola E. Morakinyo' })
  })
})
