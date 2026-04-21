'use client'
import { useState } from 'react'

// Nigeria CPI index (2019 = 100 base). Update annually from NBS data.
const CPI: Record<number, number> = {
  2015: 72.0,
  2016: 84.5,
  2017: 95.0,
  2018: 101.7,
  2019: 100.0,
  2020: 113.2,
  2021: 130.0,
  2022: 149.6,
  2023: 174.3,
  2024: 228.0,
}

export function adjustForInflation(amount: number, fromYear: number, toYear: number): number | null {
  const fromCPI = CPI[fromYear]
  const toCPI = CPI[toYear]
  if (!fromCPI || !toCPI) return null
  if (fromYear === toYear) return amount
  return Math.round((amount * (toCPI / fromCPI)) * 100) / 100
}

export function InflationCalculator() {
  const [amount, setAmount] = useState('')
  const [fromYear, setFromYear] = useState('2020')
  const [toYear, setToYear] = useState('2024')
  const [result, setResult] = useState<number | null | undefined>(undefined)

  function calculate() {
    const a = parseFloat(amount)
    const from = parseInt(fromYear)
    const to = parseInt(toYear)
    if (isNaN(a) || isNaN(from) || isNaN(to)) return
    setResult(adjustForInflation(a, from, to))
  }

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <label htmlFor="amount" className="block text-[var(--text-muted)] text-xs mb-1">Amount (NGN)</label>
        <input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 50000" className="w-full bg-[var(--navy)] border border-[var(--border)] text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[var(--gold)]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="fromYear" className="block text-[var(--text-muted)] text-xs mb-1">From Year</label>
          <input id="fromYear" type="number" value={fromYear} onChange={e => setFromYear(e.target.value)} min="2015" max="2024" className="w-full bg-[var(--navy)] border border-[var(--border)] text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[var(--gold)]" />
        </div>
        <div>
          <label htmlFor="toYear" className="block text-[var(--text-muted)] text-xs mb-1">To Year</label>
          <input id="toYear" type="number" value={toYear} onChange={e => setToYear(e.target.value)} min="2015" max="2024" className="w-full bg-[var(--navy)] border border-[var(--border)] text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[var(--gold)]" />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-[var(--gold)] text-[var(--navy)] font-bold py-2 rounded text-sm hover:opacity-90 transition-opacity">
        Calculate
      </button>
      {result === null && <p className="text-red-400 text-sm">No data available for that year range.</p>}
      {result !== null && result !== undefined && (
        <div className="bg-[var(--navy)] border border-[var(--gold-dim)] rounded p-4 text-center">
          <p className="text-[var(--text-muted)] text-xs">{parseFloat(amount).toLocaleString()} NGN in {fromYear} is equivalent to</p>
          <p className="text-[var(--gold)] text-2xl font-bold font-serif mt-1">₦{result.toLocaleString()}</p>
          <p className="text-[var(--text-muted)] text-xs">in {toYear}</p>
        </div>
      )}
    </div>
  )
}
