import Link from 'next/link'
import type { WritingPostMeta } from '@/lib/types'
import { formatDate } from '@/lib/format'
import { Card } from '@/components/ui/card'

export function WritingCard({ post }: { post: WritingPostMeta }) {
  const card = (
    <Card as="article" interactive>
      <div className="flex items-baseline justify-between gap-4 font-sans text-xs">
        <span className="uppercase tracking-wider text-[var(--accent)]">
          {post.externalUrl ? (post.publication ?? 'External') : (post.tag ?? 'Essay')}
        </span>
        <time dateTime={post.date} className="text-[var(--text-muted)] whitespace-nowrap">
          {formatDate(post.date)}
        </time>
      </div>
      <h2 className="mt-2 text-xl font-medium leading-snug">{post.title}</h2>
      {post.excerpt && (
        <p className="mt-2 text-sm leading-relaxed text-[var(--text)] line-clamp-2">{post.excerpt}</p>
      )}
      <span className="mt-4 inline-block font-sans text-xs text-[var(--accent)]">
        {post.externalUrl ? `Read at ${post.publication ?? 'source'} →` : 'Read →'}
      </span>
    </Card>
  )

  return post.externalUrl ? (
    <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
      {card}
    </a>
  ) : (
    <Link href={`/writing/${post.slug}`}>{card}</Link>
  )
}
