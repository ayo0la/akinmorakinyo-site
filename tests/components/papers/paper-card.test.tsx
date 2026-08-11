import { render, screen } from '@testing-library/react'
import { PaperCard } from '@/components/papers/paper-card'
import type { Paper } from '@/lib/types'

const basePaper: Paper = {
  id: 'paper-1',
  title: 'Household Debt and Consumption',
  abstract: 'This paper examines the relationship between debt and consumption.',
  publishedDate: '2022-06-01',
  journal: 'Journal of Applied Economics',
  coAuthors: ['Jane Doe', 'John Smith'],
  tags: ['macro'],
  pdfPath: '/papers/household-debt.pdf',
  googleScholarUrl: 'https://scholar.google.com/citations?id=abc',
}

describe('PaperCard', () => {
  it('renders the title and the four-digit publication year', () => {
    render(<PaperCard paper={basePaper} />)
    expect(screen.getByText('Household Debt and Consumption')).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
  })

  it('renders as a semantic <article>', () => {
    const { container } = render(<PaperCard paper={basePaper} />)
    expect(container.firstChild?.nodeName).toBe('ARTICLE')
  })

  it('renders the journal and co-authors when present', () => {
    render(<PaperCard paper={basePaper} />)
    expect(screen.getByText('Journal of Applied Economics')).toBeInTheDocument()
    expect(screen.getByText('with Jane Doe, John Smith')).toBeInTheDocument()
    expect(
      screen.getByText('This paper examines the relationship between debt and consumption.')
    ).toBeInTheDocument()
  })

  it('omits the journal and co-author lines when absent', () => {
    render(<PaperCard paper={{ ...basePaper, journal: undefined, coAuthors: [] }} />)
    expect(screen.queryByText('Journal of Applied Economics')).not.toBeInTheDocument()
    expect(screen.queryByText(/^with /)).not.toBeInTheDocument()
  })

  it('links to the PDF with a safe target/rel when pdfPath is present', () => {
    render(<PaperCard paper={basePaper} />)
    const link = screen.getByRole('link', { name: 'View PDF →' })
    expect(link).toHaveAttribute('href', '/papers/household-debt.pdf')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('links to Google Scholar with a safe target/rel when googleScholarUrl is present', () => {
    render(<PaperCard paper={basePaper} />)
    const link = screen.getByRole('link', { name: 'Google Scholar' })
    expect(link).toHaveAttribute('href', 'https://scholar.google.com/citations?id=abc')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders no links when pdfPath and googleScholarUrl are absent', () => {
    render(<PaperCard paper={{ ...basePaper, pdfPath: undefined, googleScholarUrl: undefined }} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
