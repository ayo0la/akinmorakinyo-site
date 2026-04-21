import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/image-builder'
import type { BlogPost } from '@/lib/types'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function PostCard({ post }: { post: BlogPost }) {
  const slug = typeof post.slug === 'string' ? post.slug : post.slug.current
  return (
    <Link href={`/blog/${slug}`} className="bg-[var(--navy)] rounded border border-transparent hover:border-[var(--gold-dim)] transition-colors overflow-hidden flex flex-col sm:flex-row">
      {post.coverImage?.asset?.url && (
        <div className="sm:w-40 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
          <Image src={urlFor(post.coverImage).width(160).height(160).url()} alt={post.title} width={160} height={160} className="object-cover w-full h-full" />
        </div>
      )}
      <div className="p-5">
        <span className="text-[var(--text-muted)] text-xs">{formatDate(post.publishedDate)}</span>
        <h2 className="font-serif text-white text-base font-semibold mt-1 leading-snug">{post.title}</h2>
        {post.excerpt && <p className="text-[var(--text-dim)] text-sm mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>}
      </div>
    </Link>
  )
}
