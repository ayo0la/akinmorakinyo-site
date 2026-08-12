import { render, screen } from '@testing-library/react'
import type { WritingPost } from '@/lib/types'

const { getPostMock, notFoundMock } = vi.hoisted(() => ({
  getPostMock: vi.fn(),
  notFoundMock: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

vi.mock('@/lib/content', () => ({ getPost: getPostMock, getPosts: vi.fn(() => []) }))
vi.mock('next/navigation', () => ({ notFound: notFoundMock }))

const samplePost: WritingPost = {
  slug: 'a-sample-essay',
  title: 'A Sample Essay',
  date: '2026-01-01',
  excerpt: 'An excerpt.',
  tag: 'Column',
  html: '<p>Body text.</p><blockquote>A quote.</blockquote>',
}

describe('WritingPostPage', () => {
  beforeEach(() => {
    getPostMock.mockReset()
    notFoundMock.mockClear()
  })

  it('renders the tag eyebrow, title, and dated time element', async () => {
    getPostMock.mockReturnValue(samplePost)
    const { default: WritingPostPage } = await import('@/app/writing/[slug]/page')
    render(await WritingPostPage({ params: Promise.resolve({ slug: 'a-sample-essay' }) }))
    expect(screen.getByText('Column')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'A Sample Essay' })).toBeInTheDocument()
    expect(screen.getByText('January 1, 2026')).toHaveAttribute('datetime', '2026-01-01')
  })

  it('falls back to "Essay" when no tag is set', async () => {
    getPostMock.mockReturnValue({ ...samplePost, tag: undefined })
    const { default: WritingPostPage } = await import('@/app/writing/[slug]/page')
    render(await WritingPostPage({ params: Promise.resolve({ slug: 'a-sample-essay' }) }))
    expect(screen.getByText('Essay')).toBeInTheDocument()
  })

  it('renders the post html body, including blockquotes', async () => {
    getPostMock.mockReturnValue(samplePost)
    const { default: WritingPostPage } = await import('@/app/writing/[slug]/page')
    const { container } = render(
      await WritingPostPage({ params: Promise.resolve({ slug: 'a-sample-essay' }) })
    )
    expect(container.querySelector('blockquote')).toHaveTextContent('A quote.')
    expect(screen.getByText('Body text.')).toBeInTheDocument()
  })

  it('calls notFound when the post does not exist', async () => {
    getPostMock.mockReturnValue(null)
    const { default: WritingPostPage } = await import('@/app/writing/[slug]/page')
    await expect(
      WritingPostPage({ params: Promise.resolve({ slug: 'missing' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
    expect(notFoundMock).toHaveBeenCalled()
  })

  // The prose selector chain ([&_p], [&_h2], [&_h3], [&_a], [&_blockquote], [&_ul], [&_ol],
  // [&_strong]) has no independent behavioral surface of its own — it only ever matters
  // together, as the one thing that must not silently regress when this page is restyled.
  it('keeps the prose selector chain on the content wrapper', async () => {
    getPostMock.mockReturnValue(samplePost)
    const { default: WritingPostPage } = await import('@/app/writing/[slug]/page')
    const { container } = render(
      await WritingPostPage({ params: Promise.resolve({ slug: 'a-sample-essay' }) })
    )
    const wrapper = container.querySelector('[class*="leading-\\[1\\.75\\]"]')
    expect(wrapper).not.toBeNull()
    const className = wrapper!.className
    for (const selector of [
      '[&_p]:mb-5',
      '[&_h2]:mt-10',
      '[&_h2]:mb-3',
      '[&_h2]:text-2xl',
      '[&_h3]:mt-8',
      '[&_h3]:mb-2',
      '[&_h3]:text-xl',
      '[&_a]:text-[var(--accent)]',
      '[&_a]:underline',
      '[&_a]:underline-offset-4',
      '[&_blockquote]:border-l-2',
      '[&_blockquote]:border-[var(--accent)]',
      '[&_blockquote]:pl-5',
      '[&_blockquote]:italic',
      '[&_ul]:list-disc',
      '[&_ul]:pl-6',
      '[&_ul]:mb-5',
      '[&_ol]:list-decimal',
      '[&_ol]:pl-6',
      '[&_ol]:mb-5',
      '[&_strong]:text-[var(--heading)]',
    ]) {
      expect(className).toContain(selector)
    }
  })
})
