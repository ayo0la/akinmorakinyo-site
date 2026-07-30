// @vitest-environment node
import { formatDate, formatYear } from '@/lib/format'

describe('date formatting', () => {
  it('formats an ISO date without timezone drift', () => {
    expect(formatDate('2026-07-01')).toBe('July 1, 2026')
  })

  it('extracts the year', () => {
    expect(formatYear('2026-07-01')).toBe('2026')
  })
})
