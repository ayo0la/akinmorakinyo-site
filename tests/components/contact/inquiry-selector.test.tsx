import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { InquirySelector } from '@/components/contact/inquiry-selector'

describe('InquirySelector', () => {
  it('renders all four inquiry types', () => {
    render(<InquirySelector value="speaking" onChange={() => {}} />)
    expect(screen.getByText('Speaking Engagement')).toBeInTheDocument()
    expect(screen.getByText('Media Interview')).toBeInTheDocument()
    expect(screen.getByText('Consulting')).toBeInTheDocument()
    expect(screen.getByText('General Inquiry')).toBeInTheDocument()
  })

  it('calls onChange with correct value when a type is clicked', () => {
    const onChange = vi.fn()
    render(<InquirySelector value="speaking" onChange={onChange} />)
    fireEvent.click(screen.getByText('Media Interview'))
    expect(onChange).toHaveBeenCalledWith('media')
  })

  it('marks the selected type with data-selected="true"', () => {
    render(<InquirySelector value="consulting" onChange={() => {}} />)
    const btn = screen.getByText('Consulting').closest('[data-selected]')
    expect(btn).toHaveAttribute('data-selected', 'true')
  })
})
