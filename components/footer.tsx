import { getProfile } from '@/lib/content'

export function Footer() {
  const profile = getProfile()
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-[var(--heading)]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            {profile.name}
          </p>
          <p className="mt-1 font-sans text-xs text-[var(--text-muted)]">
            {profile.department}
            <br />
            {profile.university}
          </p>
        </div>
        <div className="flex gap-5 font-sans text-xs text-[var(--text-muted)]">
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
              LinkedIn
            </a>
          )}
          {profile.googleScholarUrl && (
            <a href={profile.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
              Google Scholar
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 font-sans text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} Dr. Akinola E. Morakinyo
        </div>
      </div>
    </footer>
  )
}
