// @vitest-environment node
import fs from 'node:fs'
import path from 'node:path'

const css = fs.readFileSync(
  path.join(process.cwd(), 'app', 'globals.css'),
  'utf8'
)

/**
 * Extracts a rule's full text, from `startIndex` through its matching
 * closing brace, by scanning and counting brace depth rather than doing a
 * lazy regex match to the first `}`. This matters because rules in this
 * file (e.g. the `@layer components` block) contain nested rules, so a
 * naive `/\{[^}]*\}/` would stop at the first inner closing brace instead
 * of the block's own. Mirrors the helper in tests/styles/reduced-motion.test.ts.
 */
function extractRule(source: string, startIndex: number): string {
  const openBrace = source.indexOf('{', startIndex)
  if (openBrace === -1) {
    throw new Error(`No opening brace found for rule starting at ${startIndex}`)
  }

  let depth = 0
  for (let i = openBrace; i < source.length; i++) {
    if (source[i] === '{') {
      depth++
    } else if (source[i] === '}') {
      depth--
      if (depth === 0) {
        return source.slice(startIndex, i + 1)
      }
    }
  }

  throw new Error(`Unbalanced braces for rule starting at ${startIndex}`)
}

const componentsLayerIndex = css.indexOf('@layer components')
const componentsLayer =
  componentsLayerIndex > -1 ? extractRule(css, componentsLayerIndex) : ''
const componentsLayerEnd =
  componentsLayerIndex > -1
    ? componentsLayerIndex + componentsLayer.length
    : -1

const reducedMotionIndex = css.indexOf('@media (prefers-reduced-motion: reduce)')

describe('reveal failsafe animation', () => {
  it('defines the @keyframes reveal-failsafe block', () => {
    expect(css).toContain('@keyframes reveal-failsafe')
  })

  it('makes the failsafe keyframes end fully visible and untransformed', () => {
    const keyframesIndex = css.indexOf('@keyframes reveal-failsafe')
    expect(keyframesIndex).toBeGreaterThan(-1)

    const keyframesRule = extractRule(css, keyframesIndex)
    expect(keyframesRule).toMatch(/opacity:\s*1/)
    expect(keyframesRule).toMatch(/transform:\s*none/)
  })

  it('gives .reveal an animation declaration referencing the failsafe keyframes', () => {
    // Scope to the base .reveal rule, not .reveal[data-revealed='true'],
    // by finding the first `.reveal {` (not `.reveal[`).
    const revealIndex = css.indexOf('.reveal {')
    expect(revealIndex).toBeGreaterThan(-1)

    const revealRule = extractRule(css, revealIndex)
    expect(revealRule).toMatch(/animation:\s*reveal-failsafe/)
  })

  it('delays the failsafe by 8s so it does not fire before a normal scroll reaches the section', () => {
    const revealIndex = css.indexOf('.reveal {')
    expect(revealIndex).toBeGreaterThan(-1)

    const revealRule = extractRule(css, revealIndex)
    expect(revealRule).toMatch(/animation:\s*reveal-failsafe\s+400ms\s+ease-out\s+8s\s+forwards/)
  })

  it('cancels the failsafe animation once JS marks the element revealed', () => {
    const revealedIndex = css.indexOf(".reveal[data-revealed='true']")
    expect(revealedIndex).toBeGreaterThan(-1)

    const revealedRule = extractRule(css, revealedIndex)
    expect(revealedRule).toMatch(/animation:\s*none/)
  })

  it('keeps @keyframes reveal-failsafe inside @layer components', () => {
    expect(componentsLayerIndex).toBeGreaterThan(-1)
    const keyframesIndex = css.indexOf('@keyframes reveal-failsafe')
    expect(keyframesIndex).toBeGreaterThan(componentsLayerIndex)
    expect(keyframesIndex).toBeLessThan(componentsLayerEnd)
  })

  it('keeps the .reveal rules inside @layer components, not after the reduced-motion block', () => {
    expect(componentsLayerIndex).toBeGreaterThan(-1)
    expect(reducedMotionIndex).toBeGreaterThan(-1)

    // The whole @layer components block, including .reveal, must close
    // before the reduced-motion media query begins -- nothing relevant to
    // .reveal should be appended after it, or it would break the
    // unlayered reduced-motion override's ability to keep winning the
    // cascade regardless of source order.
    expect(componentsLayerEnd).toBeLessThanOrEqual(reducedMotionIndex)

    const revealIndex = css.indexOf('.reveal {')
    expect(revealIndex).toBeGreaterThan(componentsLayerIndex)
    expect(revealIndex).toBeLessThan(componentsLayerEnd)
  })
})
