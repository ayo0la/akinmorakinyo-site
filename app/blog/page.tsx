export const revalidate = 60

import { getBlogPosts } from '@/sanity/queries'
import { PostCard } from '@/components/blog/post-card'

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl text-white font-bold mb-2">Blog</h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">Commentary, explainers, and economic analysis.</p>
      {posts.length === 0
        ? <p className="text-[var(--text-muted)]">No posts yet.</p>
        : <div className="flex flex-col gap-4">{posts.map(p => <PostCard key={p._id} post={p} />)}</div>
      }
    </div>
  )
}
