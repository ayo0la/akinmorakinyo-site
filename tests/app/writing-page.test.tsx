import { render, screen } from '@testing-library/react'
import type { WritingPostMeta } from '@/lib/types'

const { getPostsMock } = vi.hoisted(() => ({ getPostsMock: vi.fn() }))

vi.mock('@/lib/content', () => ({ getPosts: getPostsMock }))

const samplePost: WritingPostMeta = {
  slug: 'a-sample-essay',
  title: 'A Sample Essay',
  date: '2026-01-01',
  excerpt: 'An excerpt.',
}

describe('WritingPage', () => {
  beforeEach(() => {
    getPostsMock.mockReset()
  })

  it('renders the eyebrow, title, and subtitle', async () => {
    getPostsMock.mockReturnValue([])
    const { default: WritingPage } = await import('@/app/writing/page')
    render(WritingPage())
    expect(screen.getByText('Writing')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Essays, Columns & Commentary' })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Original essays alongside published columns, including pieces for Nairametrics and other outlets.'
      )
    ).toBeInTheDocument()
  })

  it('shows the exact empty-state copy when there are no posts', async () => {
    getPostsMock.mockReturnValue([])
    const { default: WritingPage } = await import('@/app/writing/page')
    render(WritingPage())
    expect(
      screen.getByText('New writing is on its way. Please check back soon.')
    ).toBeInTheDocument()
  })

  it('renders a card per post and no empty state when posts exist', async () => {
    getPostsMock.mockReturnValue([samplePost])
    const { default: WritingPage } = await import('@/app/writing/page')
    render(WritingPage())
    expect(
      screen.getByRole('heading', { level: 2, name: samplePost.title })
    ).toBeInTheDocument()
    expect(
      screen.queryByText('New writing is on its way. Please check back soon.')
    ).not.toBeInTheDocument()
  })

  it('keeps the page metadata title', async () => {
    const { metadata } = await import('@/app/writing/page')
    expect(metadata).toEqual({ title: 'Writing · Dr. Akinola E. Morakinyo' })
  })
})
