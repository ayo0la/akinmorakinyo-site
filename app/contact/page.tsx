'use client'
import { useState } from 'react'
import { InquirySelector } from '@/components/contact/inquiry-selector'
import { ContactForm } from '@/components/contact/contact-form'
import type { InquiryType } from '@/lib/types'

const LABELS: Record<InquiryType, string> = {
  speaking: 'Speaking Engagement',
  media: 'Media Interview',
  consulting: 'Consulting',
  general: 'General Inquiry',
}

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('speaking')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl text-white font-bold mb-2">Get in Touch</h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">Select the nature of your inquiry. Dr. Morakinyo responds within 3-5 business days.</p>
      <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-6">
        <InquirySelector value={inquiryType} onChange={setInquiryType} />
        <div className="bg-[var(--navy)] rounded border border-[var(--gold-dim)] p-6">
          <h2 className="text-[var(--gold)] text-xs uppercase tracking-widest mb-4 pb-3 border-b border-[var(--gold-dim)]">
            {LABELS[inquiryType]}
          </h2>
          <ContactForm inquiryType={inquiryType} />
        </div>
      </div>
    </div>
  )
}
