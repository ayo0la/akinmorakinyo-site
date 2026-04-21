import { getProfile, getFeaturedPaper, getFeaturedArticle, getFeaturedBlogPost, getResearchTools } from '@/sanity/queries'
import { Hero } from '@/components/home/hero'
import { RecentWork } from '@/components/home/recent-work'
import { ToolsStrip } from '@/components/home/tools-strip'

export default async function HomePage() {
  const [profile, paper, article, post, tools] = await Promise.all([
    getProfile(),
    getFeaturedPaper(),
    getFeaturedArticle(),
    getFeaturedBlogPost(),
    getResearchTools(),
  ])

  if (!profile) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-[var(--text-muted)]">
        Profile not configured. Add content in Sanity Studio.
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto md:grid md:grid-cols-[300px_1fr]">
      <div className="md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto">
        <Hero profile={profile} />
      </div>
      <div>
        <RecentWork paper={paper} article={article} post={post} />
        <ToolsStrip tools={tools} />
      </div>
    </div>
  )
}
