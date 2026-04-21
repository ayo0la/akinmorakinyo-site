import { render, screen, fireEvent } from '@testing-library/react'
import { InflationCalculator, adjustForInflation } from '@/components/tools/calculators/inflation-calculator'

describe('adjustForInflation', () => {
  it('returns an adjusted amount greater than original when adjusting forward in time', () => {
    const result = adjustForInflation(1000, 2020, 2022)
    expect(result).not.toBeNull()
    expect(result as number).toBeGreaterThan(1000)
  })

  it('returns the same amount when fromYear equals toYear', () => {
    expect(adjustForInflation(1000, 2021, 2021)).toBe(1000)
  })

  it('returns null for years outside the CPI data range', () => {
    expect(adjustForInflation(1000, 1800, 2022)).toBeNull()
  })
})

describe('InflationCalculator', () => {
  it('renders amount, from-year, and to-year inputs', () => {
    render(<InflationCalculator />)
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/from year/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/to year/i)).toBeInTheDocument()
  })

  it('shows a result in naira after calculating', () => {
    render(<InflationCalculator />)
    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '1000' } })
    fireEvent.change(screen.getByLabelText(/from year/i), { target: { value: '2020' } })
    fireEvent.change(screen.getByLabelText(/to year/i), { target: { value: '2022' } })
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    expect(screen.getByText(/₦/)).toBeInTheDocument()
  })

  it('shows an error message for invalid year range', () => {
    render(<InflationCalculator />)
    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '500' } })
    fireEvent.change(screen.getByLabelText(/from year/i), { target: { value: '1800' } })
    fireEvent.change(screen.getByLabelText(/to year/i), { target: { value: '2022' } })
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    expect(screen.getByText(/no data/i)).toBeInTheDocument()
  })
})
