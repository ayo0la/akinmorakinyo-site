import { render, screen } from '@testing-library/react'
import { PageHeader } from '@/components/page-header'

describe('PageHeader', () => {
  it('renders eyebrow, title, and subtitle', () => {
    render(<PageHeader eyebrow="Writing" title="Essays" subtitle="A subtitle" />)
    expect(screen.getByText('Writing')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Essays' })).toBeInTheDocument()
    expect(screen.getByText('A subtitle')).toBeInTheDocument()
  })

  it('omits the subtitle when not given', () => {
    render(<PageHeader eyebrow="Papers" title="Research" />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('scales the title with the new display size', () => {
    render(<PageHeader eyebrow="Writing" title="Essays" />)
    expect(screen.getByRole('heading', { level: 1 }).className).toContain('clamp(')
  })
})
