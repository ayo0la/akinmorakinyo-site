import { render, screen } from '@testing-library/react'
import { StackedCards } from '@/components/ui/stacked-cards'
import type { StackSection } from '@/lib/home-sections'

const sections: StackSection[] = [
  {
    id: 'writing',
    label: 'Writing',
    title: 'A column',
    description: 'About the economy.',
    href: 'https://example.com',
    external: true,
    cta: 'Read at Nairametrics',
  },
  {
    id: 'tools',
    label: 'Research Tools',
    title: 'Inflation Calculator',
    description: 'Convert naira across years.',
    href: '/tools/inflation-calculator',
    external: false,
    cta: 'Open the tool',
  },
]

describe('StackedCards', () => {
  it('numbers sections sequentially from one', () => {
    render(<StackedCards sections={sections} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
  })

  it('renders nothing when there are no sections', () => {
    const { container } = render(<StackedCards sections={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('gives each card its stack index so CSS can offset it', () => {
    const { container } = render(<StackedCards sections={sections} />)
    const items = container.querySelectorAll('.stack-item')
    expect(items).toHaveLength(2)
    expect(items[0].getAttribute('style')).toContain('--i: 0')
    expect(items[1].getAttribute('style')).toContain('--i: 1')
  })

  it('opens external links safely', () => {
    render(<StackedCards sections={sections} />)
    const link = screen.getByRole('link', { name: 'Read at Nairametrics' })
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('hides the decorative number from assistive technology', () => {
    render(<StackedCards sections={sections} />)
    expect(screen.getByText('01')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders a <time> element with the correct dateTime when a section has a date', () => {
    const withDate: StackSection[] = [{ ...sections[0], date: '2026-06-30' }]
    const { container } = render(<StackedCards sections={withDate} />)
    const time = container.querySelector('time')
    expect(time).not.toBeNull()
    expect(time).toHaveAttribute('dateTime', '2026-06-30')
  })

  it('renders no <time> element when a section has no date', () => {
    const { container } = render(<StackedCards sections={sections} />)
    expect(container.querySelector('time')).not.toBeInTheDocument()
  })

  it('renders a secondary link pointing at the right href when the section has one', () => {
    const withSecondary: StackSection[] = [
      { ...sections[1], secondaryHref: '/tools', secondaryCta: 'View all' },
    ]
    render(<StackedCards sections={withSecondary} />)
    expect(screen.getByRole('link', { name: 'View all' })).toHaveAttribute('href', '/tools')
  })

  it('renders only the primary CTA when a section has no secondary link', () => {
    render(<StackedCards sections={sections} />)
    expect(screen.queryByRole('link', { name: 'View all' })).not.toBeInTheDocument()
  })
})
