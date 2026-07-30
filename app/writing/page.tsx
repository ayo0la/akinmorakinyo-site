import { getPosts } from '@/lib/content'
import { WritingCard } from '@/components/writing/writing-card'
import { PageHeader } from '@/components/page-header'

export const metadata = { title: 'Writing · Dr. Akinola E. Morakinyo' }

export default function WritingPage() {
  const posts = getPosts()
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <PageHeader
        eyebrow="Writing"
        title="Essays, Columns & Commentary"
        subtitle="Original essays alongside published columns, including pieces for Nairametrics and other outlets."
      />
      {posts.length === 0 ? (
        <p className="italic text-[var(--text-muted)]">
          New writing is on its way. Please check back soon.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {posts.map(p => (
            <WritingCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  )
}
