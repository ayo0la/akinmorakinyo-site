import { render, screen } from '@testing-library/react'
import { Reveal } from '@/components/ui/reveal'

describe('Reveal', () => {
  const original = globalThis.IntersectionObserver

  afterEach(() => {
    globalThis.IntersectionObserver = original
  })

  it('always renders its children', () => {
    render(<Reveal><p>visible content</p></Reveal>)
    expect(screen.getByText('visible content')).toBeInTheDocument()
  })

  it('reveals immediately when IntersectionObserver is unavailable', () => {
    // @ts-expect-error deliberately removing the global for this test
    delete globalThis.IntersectionObserver
    const { container } = render(<Reveal><p>x</p></Reveal>)
    expect(container.firstChild).toHaveAttribute('data-revealed', 'true')
  })

  it('starts unrevealed when an observer is available', () => {
    const observe = vi.fn()
    globalThis.IntersectionObserver = vi.fn(function () {
      return {
        observe,
        disconnect: vi.fn(),
        unobserve: vi.fn(),
        takeRecords: vi.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
      }
    }) as unknown as typeof IntersectionObserver

    const { container } = render(<Reveal><p>x</p></Reveal>)
    expect(container.firstChild).toHaveAttribute('data-revealed', 'false')
    expect(observe).toHaveBeenCalled()
  })

  it('carries the reveal class so CSS can animate it', () => {
    const { container } = render(<Reveal><p>x</p></Reveal>)
    expect(container.firstChild).toHaveClass('reveal')
  })
})
