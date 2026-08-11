// @vitest-environment node
import fs from 'node:fs'
import path from 'node:path'

const css = fs.readFileSync(
  path.join(process.cwd(), 'app', 'globals.css'),
  'utf8'
)

describe('globals.css cascade layers', () => {
  it('imports tailwind', () => {
    expect(css).toContain("@import 'tailwindcss'")
  })

  it('wraps base element styles in @layer base so utilities can override them', () => {
    const layerStart = css.indexOf('@layer base')
    expect(layerStart).toBeGreaterThan(-1)

    // Every bare element selector must live inside the @layer base block.
    // Unlayered element rules beat layered utilities in Tailwind v4 and
    // silently break every color utility applied to that element.
    const layerBlock = css.slice(layerStart)
    for (const selector of ['body', 'a {', '::selection']) {
      expect(layerBlock).toContain(selector)
    }

    const beforeLayer = css.slice(0, layerStart)
    expect(beforeLayer).not.toMatch(/^\s*a\s*\{/m)
    expect(beforeLayer).not.toMatch(/^\s*body\s*\{/m)
  })

  it('keeps theme custom properties unlayered', () => {
    const rootIndex = css.indexOf(':root')
    const layerStart = css.indexOf('@layer base')
    expect(rootIndex).toBeGreaterThan(-1)
    expect(rootIndex).toBeLessThan(layerStart)
  })

  it('defines the layout scale tokens on a theme-independent :root block', () => {
    for (const token of [
      '--space-section:',
      '--space-block:',
      '--radius-card:',
      '--radius-input:',
      '--radius-pill:',
      '--measure:',
      '--gutter:',
      '--nav-h:',
      '--nav-h-compact:',
    ]) {
      expect(css).toContain(token)
    }
  })

  it('defines a card shadow in both themes', () => {
    const dark = css.slice(
      css.indexOf("html[data-theme='dark']"),
      css.indexOf("html[data-theme='light']")
    )
    const light = css.slice(css.indexOf("html[data-theme='light']"))
    expect(dark).toContain('--card-shadow:')
    expect(light).toContain('--card-shadow:')
  })
})
