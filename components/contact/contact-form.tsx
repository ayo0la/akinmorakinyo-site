'use client'
import { useState } from 'react'
import type { InquiryType } from '@/lib/types'

function Field({ id, label, type = 'text', required = false }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[var(--text-muted)] text-xs mb-1">{label}{required && ' *'}</label>
      {type === 'textarea'
        ? <textarea id={id} name={id} required={required} rows={3} className="w-full bg-[var(--navy-mid)] border border-[var(--border)] text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[var(--gold)] resize-none" />
        : <input id={id} name={id} type={type} required={required} className="w-full bg-[var(--navy-mid)] border border-[var(--border)] text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[var(--gold)]" />
      }
    </div>
  )
}

export function ContactForm({ inquiryType }: { inquiryType: InquiryType }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, inquiryType }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[var(--navy)] border border-[var(--gold-dim)] rounded p-6 text-center">
        <p className="text-[var(--gold)] font-serif text-lg">Message sent.</p>
        <p className="text-[var(--text-muted)] text-sm mt-1">Dr. Morakinyo will respond within 3-5 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="name" label="Full Name" required />
        <Field id="email" label="Email" type="email" required />
      </div>
      {inquiryType === 'speaking' && (
        <>
          <Field id="organisation" label="Organisation" />
          <Field id="eventDate" label="Event Date" type="date" />
          <Field id="locationFormat" label="Location & Format (in-person / virtual)" />
          <Field id="eventDescription" label="Event / Topic Description" type="textarea" />
        </>
      )}
      {inquiryType === 'media' && (
        <>
          <Field id="outlet" label="Outlet / Publication" />
          <Field id="mediaFormat" label="Format (TV / podcast / radio / print)" />
          <Field id="topic" label="Topic" type="textarea" />
        </>
      )}
      {inquiryType === 'consulting' && (
        <>
          <Field id="organisation" label="Organisation" />
          <Field id="projectDescription" label="Project Description" type="textarea" />
          <Field id="timeline" label="Timeline" />
        </>
      )}
      {inquiryType === 'general' && <Field id="message" label="Message" type="textarea" required />}
      <button type="submit" disabled={status === 'sending'} className="bg-[var(--gold)] text-[var(--navy)] font-bold py-2.5 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-60">
        {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
      </button>
      {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
    </form>
  )
}
