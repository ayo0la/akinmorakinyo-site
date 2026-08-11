import { render, screen } from '@testing-library/react'
import { PillButton } from '@/components/ui/pill-button'

describe('PillButton', () => {
  it('renders an internal link for a plain href', () => {
    render(<PillButton href="/papers">View Papers</PillButton>)
    const link = screen.getByRole('link', { name: 'View Papers' })
    expect(link).toHaveAttribute('href', '/papers')
    expect(link).not.toHaveAttribute('target')
  })

  it('renders an external link with safe rel attributes', () => {
    render(
      <PillButton href="https://example.com" external>
        Read at source
      </PillButton>
    )
    const link = screen.getByRole('link', { name: 'Read at source' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders a button when no href is given', () => {
    render(<PillButton type="submit">Send</PillButton>)
    const button = screen.getByRole('button', { name: 'Send' })
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('uses the pill radius token', () => {
    render(<PillButton href="/x">Go</PillButton>)
    expect(screen.getByRole('link')).toHaveClass('rounded-[var(--radius-pill)]')
  })

  it('defaults to the solid variant', () => {
    render(<PillButton href="/x">Go</PillButton>)
    expect(screen.getByRole('link')).toHaveClass('bg-[var(--accent)]')
  })

  it('renders the outline variant without a solid fill', () => {
    render(<PillButton href="/x" variant="outline">Go</PillButton>)
    const link = screen.getByRole('link')
    expect(link).not.toHaveClass('bg-[var(--accent)]')
    expect(link).toHaveClass('border-[var(--accent)]')
  })
})
