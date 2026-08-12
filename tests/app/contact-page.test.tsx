import { render } from '@testing-library/react'
import ContactPage from '@/app/contact/page'

describe('ContactPage', () => {
  it('pins the page to the medium (max-w-4xl) measure, not narrow or wide', () => {
    const { container } = render(<ContactPage />)
    expect(container.querySelector('.max-w-4xl')).not.toBeNull()
    expect(container.querySelector('.max-w-3xl')).toBeNull()
    expect(container.querySelector('.max-w-5xl')).toBeNull()
  })
})
