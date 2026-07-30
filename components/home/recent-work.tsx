import Link from 'next/link'
import type { Paper, WritingPostMeta } from '@/lib/types'
import { formatDate } from '@/lib/format'

export function RecentWork({
  paper,
  post,
}: {
  paper: Paper | null
  post: WritingPostMeta | null
}) {
  if (!paper && !post) return null

  return (
    <section className="border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--accent)]">
          Recent Work
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {paper && (
            <Link
              href="/papers"
              className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-6 hover:border-[var(--accent-soft)] hover:-translate-y-0.5 transition-all"
            >
              <span className="font-sans text-xs uppercase tracking-wider text-[var(--accent)]">Paper</span>
              <p className="mt-2 text-lg font-medium leading-snug text-[var(--heading)]">{paper.title}</p>
              <p className="mt-3 font-sans text-xs text-[var(--text-muted)]">{formatDate(paper.publishedDate)}</p>
            </Link>
          )}
          {post &&
            (post.externalUrl ? (
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-6 hover:border-[var(--accent-soft)] hover:-translate-y-0.5 transition-all"
              >
                <span className="font-sans text-xs uppercase tracking-wider text-[var(--accent)]">
                  {post.publication ?? 'Writing'}
                </span>
                <p className="mt-2 text-lg font-medium leading-snug text-[var(--heading)]">{post.title}</p>
                <p className="mt-3 font-sans text-xs text-[var(--text-muted)]">{formatDate(post.date)}</p>
              </a>
            ) : (
              <Link
                href={`/writing/${post.slug}`}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-6 hover:border-[var(--accent-soft)] hover:-translate-y-0.5 transition-all"
              >
                <span className="font-sans text-xs uppercase tracking-wider text-[var(--accent)]">
                  {post.tag ?? 'Essay'}
                </span>
                <p className="mt-2 text-lg font-medium leading-snug text-[var(--heading)]">{post.title}</p>
                <p className="mt-3 font-sans text-xs text-[var(--text-muted)]">{formatDate(post.date)}</p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}
