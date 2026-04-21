import { render, screen, fireEvent } from '@testing-library/react'
import { DatasetViewer } from '@/components/tools/dataset-viewer'

const CSV = `year,inflation
2020,13.2
2021,17.0
2022,19.6`

describe('DatasetViewer', () => {
  it('renders table headers', () => {
    render(<DatasetViewer csvUrl="" initialCsv={CSV} xAxis="year" yAxis="inflation" visualizationType="table" />)
    expect(screen.getByText('year')).toBeInTheDocument()
    expect(screen.getByText('inflation')).toBeInTheDocument()
  })

  it('renders all data rows', () => {
    render(<DatasetViewer csvUrl="" initialCsv={CSV} xAxis="year" yAxis="inflation" visualizationType="table" />)
    expect(screen.getByText('2020')).toBeInTheDocument()
    expect(screen.getByText('13.2')).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
  })

  it('filters rows based on search input', () => {
    render(<DatasetViewer csvUrl="" initialCsv={CSV} xAxis="year" yAxis="inflation" visualizationType="table" />)
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: '2021' } })
    expect(screen.getByText('2021')).toBeInTheDocument()
    expect(screen.queryByText('2020')).not.toBeInTheDocument()
  })

  it('shows Chart and Table tabs for mixed type', () => {
    render(<DatasetViewer csvUrl="" initialCsv={CSV} xAxis="year" yAxis="inflation" visualizationType="mixed" />)
    expect(screen.getByRole('button', { name: /chart/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /table/i })).toBeInTheDocument()
  })

  it('switches to table view when Table tab clicked in mixed mode', () => {
    render(<DatasetViewer csvUrl="" initialCsv={CSV} xAxis="year" yAxis="inflation" visualizationType="mixed" />)
    fireEvent.click(screen.getByRole('button', { name: /table/i }))
    expect(screen.getByText('year')).toBeInTheDocument()
  })
})
