import type { InquiryType } from '@/lib/types'

const TYPES: { value: InquiryType; label: string; description: string }[] = [
  { value: 'speaking', label: 'Speaking Engagement', description: 'Conferences, panels, public lectures' },
  { value: 'media', label: 'Media Interview', description: 'Press, TV, podcast, radio' },
  { value: 'consulting', label: 'Consulting', description: 'Policy, research, advisory' },
  { value: 'general', label: 'General Inquiry', description: 'Everything else' },
]

export function InquirySelector({ value, onChange }: { value: InquiryType; onChange: (v: InquiryType) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {TYPES.map(t => (
        <button
          key={t.value}
          data-selected={value === t.value}
          onClick={() => onChange(t.value)}
          className={`text-left p-4 rounded border transition-colors ${value === t.value ? 'border-[var(--accent)] bg-[var(--surface)]' : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-soft)]'}`}
        >
          <p className={`text-sm font-semibold ${value === t.value ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>{t.label}</p>
          <p className="text-[var(--text-muted)] text-xs mt-0.5">{t.description}</p>
        </button>
      ))}
    </div>
  )
}
