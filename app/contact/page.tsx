'use client'
import { useState } from 'react'
import { InquirySelector } from '@/components/contact/inquiry-selector'
import { ContactForm } from '@/components/contact/contact-form'
import { PageHeader } from '@/components/page-header'
import { Section } from '@/components/ui/section'
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
    <Section width="narrow">
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Select the nature of your inquiry. Dr. Morakinyo responds within 3 to 5 business days."
      />
      <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-6">
        <InquirySelector value={inquiryType} onChange={setInquiryType} />
        <div className="bg-[var(--surface)] rounded border border-[var(--accent-soft)] p-6">
          <h2 className="text-[var(--accent)] text-xs uppercase tracking-widest mb-4 pb-3 border-b border-[var(--accent-soft)]">
            {LABELS[inquiryType]}
          </h2>
          <ContactForm inquiryType={inquiryType} />
        </div>
      </div>
    </Section>
  )
}
