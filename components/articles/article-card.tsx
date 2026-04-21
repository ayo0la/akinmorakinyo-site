import Image from 'next/image'
import { urlFor } from '@/sanity/image-builder'
import type { Article } from '@/lib/types'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <a href={article.externalUrl} target="_blank" rel="noopener noreferrer" className="bg-[var(--navy)] rounded border border-transparent hover:border-[var(--gold-dim)] transition-colors p-5 flex gap-4 items-start">
      {article.publicationLogo?.asset?.url && (
        <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-white/5 flex items-center justify-center">
          <Image src={urlFor(article.publicationLogo).width(40).height(40).url()} alt={article.publication} width={40} height={40} className="object-contain" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <span className="text-[var(--gold)] text-xs">{article.publication}</span>
          <span className="text-[var(--text-muted)] text-xs whitespace-nowrap">{formatDate(article.publishedDate)}</span>
        </div>
        <h2 className="font-serif text-white text-base font-semibold mt-1 leading-snug">{article.title}</h2>
        {article.excerpt && <p className="text-[var(--text-dim)] text-sm mt-2 leading-relaxed line-clamp-2">{article.excerpt}</p>}
        <span className="text-[var(--gold)] text-xs mt-3 inline-block hover:underline">Read article &rarr;</span>
      </div>
    </a>
  )
}
