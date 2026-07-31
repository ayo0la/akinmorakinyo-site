import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '@/app/api/contact/route'

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }))

vi.mock('resend', () => {
  function Resend() {
    return { emails: { send: sendMock } }
  }
  return { Resend }
})

function request(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const validPayload = {
  inquiryType: 'general',
  name: 'Test User',
  email: 'test@example.com',
  message: 'Hello',
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendMock.mockReset()
    sendMock.mockResolvedValue({ data: { id: 'test-id' }, error: null })
    process.env.CONTACT_FROM_EMAIL = 'Test Sender <website@verified.example>'
    process.env.CONTACT_EMAIL = 'recipient@example.com'
  })

  it('returns 200 for a valid payload', async () => {
    const res = await POST(request(validPayload))
    expect(res.status).toBe(200)
  })

  it('returns 400 when name or email is missing', async () => {
    const res = await POST(request({ inquiryType: 'general', message: 'Hello' }))
    expect(res.status).toBe(400)
  })

  it('sends from the configured sender address, not a hardcoded domain', async () => {
    await POST(request(validPayload))
    for (const call of sendMock.mock.calls) {
      expect(call[0].from).toBe('Test Sender <website@verified.example>')
    }
  })

  it('sends the inquiry to the configured contact address and replies to the sender', async () => {
    await POST(request(validPayload))
    const inquiry = sendMock.mock.calls[0][0]
    expect(inquiry.to).toBe('recipient@example.com')
    expect(inquiry.replyTo).toBe('test@example.com')
  })

  it('returns 500 with a distinct message when the sender address is not configured', async () => {
    delete process.env.CONTACT_FROM_EMAIL
    const res = await POST(request(validPayload))
    expect(res.status).toBe(500)
    expect((await res.json()).error).toMatch(/not configured/i)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('still reports success when only the acknowledgement email fails', async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: 'test-id' }, error: null })
      .mockRejectedValueOnce(new Error('acknowledgement failed'))
    const res = await POST(request(validPayload))
    expect(res.status).toBe(200)
  })
})
