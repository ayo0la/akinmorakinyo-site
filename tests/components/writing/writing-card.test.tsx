import { render, screen } from '@testing-library/react'
import { WritingCard } from '@/components/writing/writing-card'
import type { WritingPostMeta } from '@/lib/types'

const basePost: WritingPostMeta = {
  slug: 'first-essay',
  title: 'On Household Formation',
  date: '2024-03-15',
  excerpt: 'A short excerpt about the topic.',
  tag: 'Field Note',
}

describe('WritingCard', () => {
  it('links internally to the post slug for a post with no externalUrl', () => {
    render(<WritingCard post={basePost} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/writing/first-essay')
    expect(link).not.toHaveAttribute('target')
  })

  it('renders the title, tag, and excerpt', () => {
    render(<WritingCard post={basePost} />)
    expect(screen.getByText('On Household Formation')).toBeInTheDocument()
    expect(screen.getByText('Field Note')).toBeInTheDocument()
    expect(screen.getByText('A short excerpt about the topic.')).toBeInTheDocument()
    expect(screen.getByText('Read →')).toBeInTheDocument()
  })

  it('renders the card body as a semantic <article>', () => {
    const { container } = render(<WritingCard post={basePost} />)
    expect(container.querySelector('article')).not.toBeNull()
  })

  it('falls back to "Essay" when tag is missing', () => {
    render(<WritingCard post={{ ...basePost, tag: undefined }} />)
    expect(screen.getByText('Essay')).toBeInTheDocument()
    expect(screen.queryByText('Field Note')).not.toBeInTheDocument()
  })

  it('does not render an excerpt paragraph when the post has no excerpt', () => {
    const postWithoutExcerpt = { ...basePost, excerpt: undefined } as unknown as WritingPostMeta
    const { container } = render(<WritingCard post={postWithoutExcerpt} />)
    expect(container.querySelector('p')).toBeNull()
  })

  it('links out to the external source with safe rel/target for an externalUrl post', () => {
    const externalPost: WritingPostMeta = {
      ...basePost,
      externalUrl: 'https://nairametrics.com/some-column',
      publication: 'Nairametrics',
    }
    render(<WritingCard post={externalPost} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://nairametrics.com/some-column')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows the publication and "Read at {publication}" label for external posts', () => {
    const externalPost: WritingPostMeta = {
      ...basePost,
      externalUrl: 'https://nairametrics.com/some-column',
      publication: 'Nairametrics',
    }
    render(<WritingCard post={externalPost} />)
    expect(screen.getByText('Nairametrics')).toBeInTheDocument()
    expect(screen.getByText('Read at Nairametrics →')).toBeInTheDocument()
  })

  it('falls back to "External" and "source" labels when publication is missing on an external post', () => {
    const externalPost: WritingPostMeta = {
      ...basePost,
      externalUrl: 'https://example.com/piece',
    }
    render(<WritingCard post={externalPost} />)
    expect(screen.getByText('External')).toBeInTheDocument()
    expect(screen.getByText('Read at source →')).toBeInTheDocument()
  })
})
