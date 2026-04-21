import { describe, it, expect, vi } from 'vitest'
import { POST } from '@/app/api/contact/route'

vi.mock('resend', () => {
  const sendMock = vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null })
  function Resend() {
    return { emails: { send: sendMock } }
  }
  return { Resend }
})

describe('POST /api/contact', () => {
  it('returns 200 for a valid payload', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inquiryType: 'general', name: 'Test User', email: 'test@example.com', message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })

  it('returns 400 when name or email is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inquiryType: 'general', message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
