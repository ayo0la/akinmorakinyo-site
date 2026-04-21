import type { ComponentType } from 'react'
import { InflationCalculator } from './inflation-calculator'

const registry: Record<string, ComponentType> = {
  'inflation-calculator': InflationCalculator,
}

export function getCalculator(slug: string): ComponentType | null {
  return registry[slug] ?? null
}
