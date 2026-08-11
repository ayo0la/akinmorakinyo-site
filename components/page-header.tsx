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
    <header className="mb-[var(--space-block)]">
      <p className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--accent)]">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.1] tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-5 max-w-[var(--measure)] leading-relaxed text-[var(--text-muted)]">
          {subtitle}
        </p>
      )}
      <div className="mt-8 h-px w-16 bg-[var(--accent)]" />
    </header>
  )
}
