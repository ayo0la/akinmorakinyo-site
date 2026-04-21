import { render, screen, fireEvent } from '@testing-library/react'
import { Nav } from '@/components/nav'

describe('Nav', () => {
  it('renders the site name', () => {
    render(<Nav />)
    expect(screen.getByText('Akinola Morakinyo')).toBeInTheDocument()
  })

  it('renders all desktop nav links', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Papers' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Articles' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tools' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('toggles mobile menu open and closed', () => {
    render(<Nav />)
    const btn = screen.getByRole('button', { name: /menu/i })
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    fireEvent.click(btn)
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()
    fireEvent.click(btn)
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })
})
