import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/home/hero'
import type { Profile } from '@/lib/types'

const profile: Profile = {
  name: 'Dr. Akinola E. Morakinyo',
  department: 'Department of Economics, Finance & Quantitative Analysis',
  university: 'Kennesaw State University',
  statementOfPurpose: 'Advancing economic thought.',
  bio: ['First paragraph.'],
  photo: '/photo.jpg',
  linkedinUrl: 'https://linkedin.com/in/x',
  googleScholarUrl: 'https://scholar.google.com/x',
  universityUrl: 'https://kennesaw.edu/x',
  email: 'x@example.com',
}

describe('Hero', () => {
  it('renders the name as the page heading', () => {
    render(<Hero profile={profile} />)
    expect(
      screen.getByRole('heading', { level: 1, name: profile.name })
    ).toBeInTheDocument()
  })

  it('renders both calls to action as pills', () => {
    render(<Hero profile={profile} />)
    expect(screen.getByRole('link', { name: 'View Papers' })).toHaveClass(
      'rounded-[var(--radius-pill)]'
    )
    expect(screen.getByRole('link', { name: 'Read Writing' })).toHaveClass(
      'rounded-[var(--radius-pill)]'
    )
  })

  it('keeps the portrait small so a low-quality photo is not exposed', () => {
    render(<Hero profile={profile} />)
    const img = screen.getByAltText(profile.name)
    expect(img.parentElement?.className).toContain('w-40')
    expect(img.parentElement?.className).not.toContain('w-full')
  })

  it('renders the profile links', () => {
    render(<Hero profile={profile} />)
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      profile.linkedinUrl
    )
  })
})
