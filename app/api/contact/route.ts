import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import type { ContactPayload } from '@/lib/types'

const resend = new Resend(process.env.RESEND_API_KEY)

function formatBody(p: ContactPayload): string {
  const lines = [`Inquiry Type: ${p.inquiryType}`, `Name: ${p.name}`, `Email: ${p.email}`]
  if (p.organisation) lines.push(`Organisation: ${p.organisation}`)
  if (p.eventDate) lines.push(`Event Date: ${p.eventDate}`)
  if (p.locationFormat) lines.push(`Location/Format: ${p.locationFormat}`)
  if (p.eventDescription) lines.push(`Description: ${p.eventDescription}`)
  if (p.outlet) lines.push(`Outlet: ${p.outlet}`)
  if (p.mediaFormat) lines.push(`Media Format: ${p.mediaFormat}`)
  if (p.topic) lines.push(`Topic: ${p.topic}`)
  if (p.projectDescription) lines.push(`Project: ${p.projectDescription}`)
  if (p.timeline) lines.push(`Timeline: ${p.timeline}`)
  if (p.message) lines.push(`Message: ${p.message}`)
  return lines.join('\n')
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload

  if (!payload.name || !payload.email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'website@drakinolamorakinyo.com',
    to: process.env.CONTACT_EMAIL!,
    replyTo: payload.email,
    subject: `[${payload.inquiryType}] New inquiry from ${payload.name}`,
    text: formatBody(payload),
  })

  if (error) return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })

  await resend.emails.send({
    from: 'website@drakinolamorakinyo.com',
    to: payload.email,
    subject: 'Your message to Dr. Akinola Morakinyo',
    text: `Hi ${payload.name},\n\nThank you for reaching out. Dr. Morakinyo will respond within 3-5 business days.\n\nBest regards,\nDr. Akinola E. Morakinyo`,
  })

  return NextResponse.json({ success: true })
}
