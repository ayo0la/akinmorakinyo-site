export function Footer() {
  return (
    <footer className="bg-[var(--navy)] border-t border-[var(--gold-dim)] py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[var(--text-muted)] text-xs">
        <span>© {new Date().getFullYear()} Dr. Akinola E. Morakinyo</span>
        <span className="text-center sm:text-right">Dept. of Economics, Finance & Quantitative Analysis · Kennesaw State University</span>
      </div>
    </footer>
  )
}
