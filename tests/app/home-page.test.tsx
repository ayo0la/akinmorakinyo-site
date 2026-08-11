import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders the hero heading', () => {
    render(HomePage())
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders a numbered stack starting at 01', () => {
    render(HomePage())
    expect(screen.getByText('01')).toBeInTheDocument()
  })

  it('does not render a papers card while papers are empty', () => {
    render(HomePage())
    expect(screen.queryByText('Papers')).not.toBeInTheDocument()
  })

  it('renders a contact call to action', () => {
    render(HomePage())
    expect(
      screen.getByRole('link', { name: /get in touch/i })
    ).toHaveAttribute('href', '/contact')
  })
})
