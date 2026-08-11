// @vitest-environment node
import fs from 'node:fs'
import path from 'node:path'

const css = fs.readFileSync(
  path.join(process.cwd(), 'app', 'globals.css'),
  'utf8'
)

describe('reduced motion', () => {
  const block = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'))

  it('declares a reduced-motion media query', () => {
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
  })

  it('makes revealed content fully visible without animating', () => {
    expect(block).toContain('.reveal')
    expect(block).toMatch(/opacity:\s*1/)
    expect(block).toMatch(/transform:\s*none/)
  })

  it('returns the sticky stack to normal document flow', () => {
    expect(block).toContain('.stack-item')
    expect(block).toMatch(/position:\s*static/)
  })
})
