import { describe, it, expect } from 'vitest'
import { parseCSV, sortRows, filterRows } from '@/lib/csv-parser'

const RAW_CSV = `year,inflation,gdp
2020,13.2,448.1
2021,17.0,440.8
2022,19.6,477.4
2023,24.7,363.8`

describe('parseCSV', () => {
  it('returns headers and rows', () => {
    const result = parseCSV(RAW_CSV)
    expect(result.headers).toEqual(['year', 'inflation', 'gdp'])
    expect(result.rows).toHaveLength(4)
    expect(result.rows[0]).toEqual({ year: '2020', inflation: '13.2', gdp: '448.1' })
  })

  it('handles empty input', () => {
    const result = parseCSV('')
    expect(result.headers).toEqual([])
    expect(result.rows).toEqual([])
  })
})

describe('sortRows', () => {
  it('sorts ascending by a column', () => {
    const { rows } = parseCSV(RAW_CSV)
    const sorted = sortRows(rows, 'inflation', 'asc')
    expect(sorted[0].inflation).toBe('13.2')
    expect(sorted[3].inflation).toBe('24.7')
  })

  it('sorts descending by a column', () => {
    const { rows } = parseCSV(RAW_CSV)
    const sorted = sortRows(rows, 'year', 'desc')
    expect(sorted[0].year).toBe('2023')
  })
})

describe('filterRows', () => {
  it('filters rows by a search term', () => {
    const { rows } = parseCSV(RAW_CSV)
    expect(filterRows(rows, '2021')).toHaveLength(1)
    expect(filterRows(rows, '2021')[0].year).toBe('2021')
  })

  it('returns all rows for an empty search term', () => {
    const { rows } = parseCSV(RAW_CSV)
    expect(filterRows(rows, '')).toHaveLength(4)
  })
})
