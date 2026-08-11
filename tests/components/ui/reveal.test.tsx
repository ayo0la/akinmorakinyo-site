import { act, render, screen } from '@testing-library/react'
import { Reveal } from '@/components/ui/reveal'

describe('Reveal', () => {
  const original = globalThis.IntersectionObserver

  afterEach(() => {
    globalThis.IntersectionObserver = original
  })

  // Installs a mock IntersectionObserver and returns handles to its spies
  // plus a way to fire the callback the hook registered, so tests can
  // drive the observer the way a real browser would.
  function mockObserver() {
    const observe = vi.fn()
    const disconnect = vi.fn()
    const unobserve = vi.fn()
    let callback: IntersectionObserverCallback | undefined

    globalThis.IntersectionObserver = vi.fn(function (
      cb: IntersectionObserverCallback
    ) {
      callback = cb
      return {
        observe,
        disconnect,
        unobserve,
        takeRecords: vi.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
      }
    }) as unknown as typeof IntersectionObserver

    return {
      observe,
      disconnect,
      unobserve,
      fire: (isIntersecting: boolean) => {
        act(() => {
          callback?.(
            [{ isIntersecting } as IntersectionObserverEntry],
            {} as IntersectionObserver
          )
        })
      },
    }
  }

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
    const { observe } = mockObserver()

    const { container } = render(<Reveal><p>x</p></Reveal>)
    expect(container.firstChild).toHaveAttribute('data-revealed', 'false')
    expect(observe).toHaveBeenCalled()
  })

  it('carries the reveal class so CSS can animate it', () => {
    const { container } = render(<Reveal><p>x</p></Reveal>)
    expect(container.firstChild).toHaveClass('reveal')
  })

  it('flips to revealed once the observed entry intersects', () => {
    const { fire } = mockObserver()

    const { container } = render(<Reveal><p>x</p></Reveal>)
    expect(container.firstChild).toHaveAttribute('data-revealed', 'false')

    fire(true)

    expect(container.firstChild).toHaveAttribute('data-revealed', 'true')
  })

  it('does not reveal when the entry is reported as not intersecting', () => {
    const { fire } = mockObserver()

    const { container } = render(<Reveal><p>x</p></Reveal>)

    fire(false)

    expect(container.firstChild).toHaveAttribute('data-revealed', 'false')
  })

  it('disconnects the observer once revealed', () => {
    const { fire, disconnect } = mockObserver()

    render(<Reveal><p>x</p></Reveal>)
    expect(disconnect).not.toHaveBeenCalled()

    fire(true)

    // The hook disconnects both from inside the intersection callback and
    // from the effect's own cleanup once `revealed` flips (the second call
    // is a no-op on a real observer) — what matters is it stops observing.
    expect(disconnect).toHaveBeenCalled()
  })

  it('disconnects the observer on unmount before ever intersecting', () => {
    const { disconnect } = mockObserver()

    const { unmount } = render(<Reveal><p>x</p></Reveal>)
    expect(disconnect).not.toHaveBeenCalled()

    unmount()

    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
