import { render, screen, act } from '@testing-library/react'
import { useThemeTokens } from '@/hooks/use-theme-tokens'

function Probe() {
  const tokens = useThemeTokens(['accent'])
  return <span data-testid="accent">{tokens.accent ?? 'none'}</span>
}

describe('useThemeTokens', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark'
    const style = document.createElement('style')
    style.textContent = `
      html[data-theme='dark'] { --accent: #c9a84c; }
      html[data-theme='light'] { --accent: #9a7b2d; }
    `
    document.head.appendChild(style)
  })

  it('resolves a token value for the active theme', () => {
    render(<Probe />)
    expect(screen.getByTestId('accent').textContent).toBe('#c9a84c')
  })

  it('re-resolves when the theme attribute changes', async () => {
    render(<Probe />)
    await act(async () => {
      document.documentElement.dataset.theme = 'light'
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    expect(screen.getByTestId('accent').textContent).toBe('#9a7b2d')
  })
})
