import { render, screen } from '@testing-library/react'
import { ContactForm } from '@/components/contact/contact-form'

describe('ContactForm', () => {
  it('always renders name and email fields', () => {
    render(<ContactForm inquiryType="general" />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('renders speaking-specific fields for speaking type', () => {
    render(<ContactForm inquiryType="speaking" />)
    expect(screen.getByLabelText(/organisation/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/event date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/event.*description/i)).toBeInTheDocument()
  })

  it('renders media-specific fields for media type', () => {
    render(<ContactForm inquiryType="media" />)
    expect(screen.getByLabelText(/outlet/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/format/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/topic/i)).toBeInTheDocument()
  })

  it('renders consulting-specific fields for consulting type', () => {
    render(<ContactForm inquiryType="consulting" />)
    expect(screen.getByLabelText(/organisation/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/timeline/i)).toBeInTheDocument()
  })

  it('renders only message field for general type', () => {
    render(<ContactForm inquiryType="general" />)
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/organisation/i)).not.toBeInTheDocument()
  })

  it('renders a submit button', () => {
    render(<ContactForm inquiryType="general" />)
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })
})
