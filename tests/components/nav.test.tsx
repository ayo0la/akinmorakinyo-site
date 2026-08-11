import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Nav } from '@/components/nav'

describe('Nav', () => {
  it('renders the site name', () => {
    render(<Nav />)
    expect(screen.getByText('Akinola Morakinyo')).toBeInTheDocument()
  })

  it('renders all desktop nav links including Writing', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Papers' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Writing' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tools' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('does not render Articles or Blog links', () => {
    render(<Nav />)
    expect(screen.queryByRole('link', { name: 'Articles' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Blog' })).not.toBeInTheDocument()
  })

  it('renders the theme toggle', () => {
    render(<Nav />)
    expect(screen.getByRole('button', { name: /switch to (light|dark) theme/i })).toBeInTheDocument()
  })

  it('toggles mobile menu open and closed', () => {
    render(<Nav />)
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }))
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })

  it('starts at full height', () => {
    const { container } = render(<Nav />)
    expect(container.firstChild).toHaveAttribute('data-compact', 'false')
  })

  it('compacts once the page is scrolled past the threshold', async () => {
    const { container } = render(<Nav />)
    window.scrollY = 120
    window.dispatchEvent(new Event('scroll'))
    await waitFor(() =>
      expect(container.firstChild).toHaveAttribute('data-compact', 'true')
    )
  })

  it('returns to full height at the top of the page', async () => {
    const { container } = render(<Nav />)
    window.scrollY = 120
    window.dispatchEvent(new Event('scroll'))
    await waitFor(() =>
      expect(container.firstChild).toHaveAttribute('data-compact', 'true')
    )
    window.scrollY = 0
    window.dispatchEvent(new Event('scroll'))
    await waitFor(() =>
      expect(container.firstChild).toHaveAttribute('data-compact', 'false')
    )
  })
})
