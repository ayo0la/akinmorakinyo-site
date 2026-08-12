import { render, screen } from '@testing-library/react'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'

describe('Section', () => {
  it('renders children', () => {
    render(<Section><p>hello</p></Section>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('applies the section spacing token', () => {
    const { container } = render(<Section><p>x</p></Section>)
    expect(container.firstChild).toHaveClass('py-[calc(var(--space-section)/2)]')
  })

  it('renders as the requested element', () => {
    const { container } = render(<Section as="header"><p>x</p></Section>)
    expect(container.firstChild?.nodeName).toBe('HEADER')
  })

  it('merges a caller className', () => {
    const { container } = render(<Section className="custom"><p>x</p></Section>)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('defaults to the wide measure', () => {
    const { container } = render(<Section><p>x</p></Section>)
    expect(container.querySelector('.max-w-5xl')).not.toBeNull()
  })

  it('supports the narrow measure used by index pages', () => {
    const { container } = render(<Section width="narrow"><p>x</p></Section>)
    expect(container.querySelector('.max-w-3xl')).not.toBeNull()
    expect(container.querySelector('.max-w-5xl')).toBeNull()
  })

  it('supports the medium measure used by the contact page', () => {
    const { container } = render(<Section width="medium"><p>x</p></Section>)
    expect(container.querySelector('.max-w-4xl')).not.toBeNull()
    expect(container.querySelector('.max-w-3xl')).toBeNull()
    expect(container.querySelector('.max-w-5xl')).toBeNull()
  })

  it('supports the prose measure used by the writing detail page', () => {
    const { container } = render(<Section width="prose"><p>x</p></Section>)
    expect(container.querySelector('.max-w-2xl')).not.toBeNull()
  })
})

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>body</p></Card>)
    expect(screen.getByText('body')).toBeInTheDocument()
  })

  it('applies the card radius and shadow tokens', () => {
    const { container } = render(<Card><p>x</p></Card>)
    expect(container.firstChild).toHaveClass('rounded-[var(--radius-card)]')
    expect(container.firstChild).toHaveClass('shadow-[var(--card-shadow)]')
  })

  it('is not interactive by default', () => {
    const { container } = render(<Card><p>x</p></Card>)
    expect(container.firstChild).not.toHaveClass('hover:-translate-y-0.5')
  })

  it('adds hover affordances when interactive', () => {
    const { container } = render(<Card interactive><p>x</p></Card>)
    expect(container.firstChild).toHaveClass('hover:-translate-y-0.5')
  })

  it('renders as the requested element', () => {
    const { container } = render(<Card as="article"><p>x</p></Card>)
    expect(container.firstChild?.nodeName).toBe('ARTICLE')
  })
})
