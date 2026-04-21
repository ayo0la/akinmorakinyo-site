'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { parseCSV, sortRows, filterRows } from '@/lib/csv-parser'
import type { CSVRow } from '@/lib/csv-parser'
import type { VisualizationType } from '@/lib/types'

type Props = {
  csvUrl: string
  initialCsv?: string
  xAxis: string
  yAxis: string
  visualizationType: VisualizationType
}

export function DatasetViewer({ csvUrl, initialCsv, xAxis, yAxis, visualizationType }: Props) {
  const [rawCsv, setRawCsv] = useState(initialCsv ?? '')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null)
  const [view, setView] = useState<'chart' | 'table'>('chart')

  useEffect(() => {
    if (csvUrl && !initialCsv) {
      fetch(csvUrl).then(r => r.text()).then(setRawCsv)
    }
  }, [csvUrl, initialCsv])

  const { headers, rows } = parseCSV(rawCsv)
  const filtered = filterRows(rows, search)
  const sorted = sort ? sortRows(filtered, sort.column, sort.direction) : filtered

  const showChart = visualizationType !== 'table' && (visualizationType !== 'mixed' || view === 'chart')
  const showTable = visualizationType === 'table' || (visualizationType === 'mixed' && view === 'table')

  const chartData = sorted.map(row => ({ [xAxis]: row[xAxis], [yAxis]: parseFloat(row[yAxis]) || 0 }))

  function handleSort(col: string) {
    setSort(prev => prev?.column === col
      ? { column: col, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      : { column: col, direction: 'asc' }
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
        <input
          type="text"
          placeholder="Search data..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-[var(--navy-mid)] border border-[var(--border)] rounded px-3 py-1.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)] w-full sm:w-64"
        />
        {visualizationType === 'mixed' && (
          <div className="flex gap-2">
            <button onClick={() => setView('chart')} className={`px-3 py-1.5 rounded text-sm ${view === 'chart' ? 'bg-[var(--gold)] text-[var(--navy)] font-bold' : 'border border-[var(--border)] text-[var(--text-muted)]'}`}>
              Chart
            </button>
            <button onClick={() => setView('table')} className={`px-3 py-1.5 rounded text-sm ${view === 'table' ? 'bg-[var(--gold)] text-[var(--navy)] font-bold' : 'border border-[var(--border)] text-[var(--text-muted)]'}`}>
              Table
            </button>
          </div>
        )}
      </div>

      {showChart && chartData.length > 0 && (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {visualizationType === 'bar-chart' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey={xAxis} tick={{ fill: '#888', fontSize: 11 }} />
                <YAxis tick={{ fill: '#888', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a84c33', color: '#f0f0f0' }} />
                <Bar dataKey={yAxis} fill="#c9a84c" />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey={xAxis} tick={{ fill: '#888', fontSize: 11 }} />
                <YAxis tick={{ fill: '#888', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a84c33', color: '#f0f0f0' }} />
                <Line type="monotone" dataKey={yAxis} stroke="#c9a84c" dot={false} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {showTable && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {headers.map(h => (
                  <th key={h} onClick={() => handleSort(h)} className="py-2 px-3 text-[var(--gold)] text-xs uppercase tracking-wide cursor-pointer hover:text-white select-none">
                    {h} {sort?.column === h ? (sort.direction === 'asc' ? '↑' : '↓') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--navy-mid)]">
                  {headers.map(h => (
                    <td key={h} className="py-2 px-3 text-[var(--text-dim)]">{row[h]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
