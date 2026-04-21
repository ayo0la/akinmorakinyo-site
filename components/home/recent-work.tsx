import Link from 'next/link'
import type { Paper, Article, BlogPost } from '@/lib/types'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export function RecentWork({ paper, article, post }: {
  paper: Paper | null
  article: Article | null
  post: BlogPost | null
}) {
  const items = [
    paper && { kind: 'paper' as const, data: paper },
    article && { kind: 'article' as const, data: article },
    post && { kind: 'blog' as const, data: post },
  ].filter(Boolean) as Array<
    | { kind: 'paper'; data: Paper }
    | { kind: 'article'; data: Article }
    | { kind: 'blog'; data: BlogPost }
  >

  if (items.length === 0) return null

  return (
    <section className="py-8 px-4 sm:px-6">
      <h2 className="text-[var(--gold)] text-xs tracking-widest uppercase mb-4">Recent Work</h2>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => {
          if (item.kind === 'paper') return (
            <Link key={i} href="/papers" className="bg-[var(--navy)] rounded p-4 flex justify-between items-start border border-transparent hover:border-[var(--gold-dim)] transition-colors">
              <div>
                <span className="text-[var(--text-muted)] text-xs uppercase">Paper</span>
                <p className="text-white text-sm mt-0.5">{item.data.title}</p>
              </div>
              <span className="text-[var(--text-muted)] text-xs ml-4 whitespace-nowrap">{formatDate(item.data.publishedDate)}</span>
            </Link>
          )
          if (item.kind === 'article') return (
            <a key={i} href={item.data.externalUrl} target="_blank" rel="noopener noreferrer" className="bg-[var(--navy)] rounded p-4 flex justify-between items-start border border-transparent hover:border-[var(--gold-dim)] transition-colors">
              <div>
                <span className="text-[var(--text-muted)] text-xs uppercase">{item.data.publication}</span>
                <p className="text-white text-sm mt-0.5">{item.data.title}</p>
              </div>
              <span className="text-[var(--text-muted)] text-xs ml-4 whitespace-nowrap">{formatDate(item.data.publishedDate)}</span>
            </a>
          )
          const slugStr = typeof item.data.slug === 'string' ? item.data.slug : item.data.slug.current
          return (
            <Link key={i} href={`/blog/${slugStr}`} className="bg-[var(--navy)] rounded p-4 flex justify-between items-start border border-transparent hover:border-[var(--gold-dim)] transition-colors">
              <div>
                <span className="text-[var(--text-muted)] text-xs uppercase">Blog</span>
                <p className="text-white text-sm mt-0.5">{item.data.title}</p>
              </div>
              <span className="text-[var(--text-muted)] text-xs ml-4 whitespace-nowrap">{formatDate(item.data.publishedDate)}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
