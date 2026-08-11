import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
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

  it('defaults an https href to external, even without the external prop', () => {
    render(<PillButton href="https://example.com">Read at source</PillButton>)
    const link = screen.getByRole('link', { name: 'Read at source' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('defaults a relative href to internal, even without the external prop', () => {
    render(<PillButton href="/papers">View Papers</PillButton>)
    const link = screen.getByRole('link', { name: 'View Papers' })
    expect(link).toHaveAttribute('href', '/papers')
    expect(link).not.toHaveAttribute('target')
  })

  it('lets external={false} override the https default and force an internal link', () => {
    render(
      <PillButton href="https://example.com" external={false}>
        Read at source
      </PillButton>
    )
    const link = screen.getByRole('link', { name: 'Read at source' })
    expect(link).not.toHaveAttribute('target')
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('lets external={true} override a relative href and force an external anchor', () => {
    render(
      <PillButton href="/papers" external>
        View Papers
      </PillButton>
    )
    const link = screen.getByRole('link', { name: 'View Papers' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('fires onClick when a link-mode PillButton is clicked', () => {
    const onClick = vi.fn()
    render(
      <PillButton href="/papers" onClick={onClick}>
        View Papers
      </PillButton>
    )
    fireEvent.click(screen.getByRole('link', { name: 'View Papers' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('fires onClick in button mode', () => {
    const onClick = vi.fn()
    render(<PillButton onClick={onClick}>Send</PillButton>)
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('defaults to the default size padding', () => {
    render(<PillButton href="/x">Go</PillButton>)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('px-7')
    expect(link).toHaveClass('py-3')
  })

  it('renders compact size padding and not the default padding', () => {
    render(
      <PillButton href="/x" size="compact">
        Go
      </PillButton>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveClass('px-5')
    expect(link).toHaveClass('py-2')
    expect(link).not.toHaveClass('px-7')
    expect(link).not.toHaveClass('py-3')
  })
})
