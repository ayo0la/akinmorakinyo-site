export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <header className="mb-12">
      <p className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--accent)]">{eyebrow}</p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-medium leading-tight">{title}</h1>
      {subtitle && (
        <p className="mt-3 max-w-xl leading-relaxed text-[var(--text-muted)]">{subtitle}</p>
      )}
      <div className="mt-6 h-px w-16 bg-[var(--accent)]" />
    </header>
  )
}
