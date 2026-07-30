'use client'
import { useEffect, useState } from 'react'

function readTokens(names: string[]): Record<string, string> {
  const styles = getComputedStyle(document.documentElement)
  const resolved: Record<string, string> = {}
  for (const name of names) {
    const value = styles.getPropertyValue(`--${name}`).trim()
    if (value) resolved[name] = value
  }
  return resolved
}

export function useThemeTokens(names: string[]): Record<string, string> {
  const key = names.join(',')
  const [tokens, setTokens] = useState<Record<string, string>>({})

  useEffect(() => {
    const list = key ? key.split(',') : []
    const update = () => setTokens(readTokens(list))
    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [key])

  return tokens
}
