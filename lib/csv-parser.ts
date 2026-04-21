import Papa from 'papaparse'

export type CSVRow = Record<string, string>
export type ParsedCSV = { headers: string[]; rows: CSVRow[] }

export function parseCSV(raw: string): ParsedCSV {
  if (!raw.trim()) return { headers: [], rows: [] }
  const result = Papa.parse<CSVRow>(raw.trim(), { header: true, skipEmptyLines: true })
  return { headers: result.meta.fields ?? [], rows: result.data }
}

export function sortRows(rows: CSVRow[], column: string, direction: 'asc' | 'desc'): CSVRow[] {
  return [...rows].sort((a, b) => {
    const aVal = parseFloat(a[column]) || a[column]
    const bVal = parseFloat(b[column]) || b[column]
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

export function filterRows(rows: CSVRow[], search: string): CSVRow[] {
  if (!search.trim()) return rows
  const term = search.toLowerCase()
  return rows.filter(row => Object.values(row).some(v => v.toLowerCase().includes(term)))
}
