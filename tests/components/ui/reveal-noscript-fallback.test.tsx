import { renderToStaticMarkup } from 'react-dom/server'
import { RevealNoScriptFallback } from '@/components/ui/reveal-noscript-fallback'

// Rendered with react-dom/server rather than @testing-library/react: jsdom
// (like a real browser with scripting enabled) does not materialize
// <noscript> children into the live DOM, so a client-side render can never
// see this markup — which is exactly why the fallback works in the first
// place. Server-rendered HTML is what a no-JS browser actually parses, so
// asserting against that output is what proves the override exists and is
// well-formed.
describe('RevealNoScriptFallback', () => {
  it('renders a noscript-scoped style forcing .reveal to full visibility', () => {
    const html = renderToStaticMarkup(<RevealNoScriptFallback />)

    expect(html).toBe(
      '<noscript><style>.reveal { opacity: 1; transform: none; }</style></noscript>'
    )
  })
})
