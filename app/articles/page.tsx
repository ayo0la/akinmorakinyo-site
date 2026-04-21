import { getArticles } from '@/sanity/queries'
import { ArticleCard } from '@/components/articles/article-card'

export default async function ArticlesPage() {
  const articles = await getArticles()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl text-white font-bold mb-2">Articles &amp; Columns</h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">
        Published columns and op-eds, primarily in <span className="text-[var(--gold)]">Nairametrics</span> and other outlets.
      </p>
      {articles.length === 0
        ? <p className="text-[var(--text-muted)]">No articles published yet.</p>
        : <div className="flex flex-col gap-4">{articles.map(a => <ArticleCard key={a._id} article={a} />)}</div>
      }
    </div>
  )
}
