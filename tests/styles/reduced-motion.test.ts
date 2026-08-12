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
 * file (e.g. the `@media` block) contain nested rules, so a naive
 * `/\{[^}]*\}/` would stop at the first inner closing brace instead of the
 * block's own.
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

const mediaQueryIndex = css.indexOf('@media (prefers-reduced-motion: reduce)')
const mediaBlock =
  mediaQueryIndex > -1 ? extractRule(css, mediaQueryIndex) : ''
const mediaBlockEnd = mediaQueryIndex > -1 ? mediaQueryIndex + mediaBlock.length : -1

describe('reduced motion', () => {
  it('declares a reduced-motion media query', () => {
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
  })

  it('makes revealed content fully visible without animating, scoped to the .reveal rule itself', () => {
    const revealIndex = mediaBlock.indexOf('.reveal')
    expect(revealIndex).toBeGreaterThan(-1)

    const revealRule = extractRule(mediaBlock, revealIndex)
    expect(revealRule).toMatch(/opacity:\s*1/)
    expect(revealRule).toMatch(/transform:\s*none/)
  })

  it('explicitly cancels the reveal failsafe animation, scoped to the .reveal rule itself', () => {
    // Belt-and-suspenders: the global animation-duration/iteration-count
    // overrides below already neutralize the failsafe's visual effect,
    // but state the intent directly rather than relying on that alone.
    const revealIndex = mediaBlock.indexOf('.reveal')
    expect(revealIndex).toBeGreaterThan(-1)

    const revealRule = extractRule(mediaBlock, revealIndex)
    expect(revealRule).toMatch(/animation:\s*none/)
  })

  it('returns the sticky stack to normal document flow, scoped to the .stack-item rule itself', () => {
    const stackIndex = mediaBlock.indexOf('.stack-item')
    expect(stackIndex).toBeGreaterThan(-1)

    const stackRule = extractRule(mediaBlock, stackIndex)
    expect(stackRule).toMatch(/position:\s*static/)
  })

  it('does not let a later unlayered .stack-item rule re-enable sticky positioning under reduced motion', () => {
    // At equal specificity, an unlayered rule that appears later in the
    // stylesheet wins over an earlier unlayered rule regardless of a
    // @media condition attached to the earlier one. If a future change
    // (e.g. the sticky card-stack effect) appends an unlayered
    // `.stack-item { position: sticky }` rule after this reduced-motion
    // block, it would silently re-enable sticky positioning for users who
    // have reduced motion enabled -- exactly the vestibular effect this
    // block exists to prevent. Pin that no such rule exists after the
    // block.
    expect(mediaBlockEnd).toBeGreaterThan(-1)
    const rest = css.slice(mediaBlockEnd)
    expect(rest).not.toMatch(/\.stack-item[^{]*\{[^}]*position:\s*sticky/)
  })
})
