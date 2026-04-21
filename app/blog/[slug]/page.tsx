import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { getBlogPost, getBlogPosts } from '@/sanity/queries'
import { urlFor } from '@/sanity/image-builder'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map(p => ({ slug: typeof p.slug === 'string' ? p.slug : p.slug.current }))
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {post.coverImage?.asset?.url && (
        <div className="w-full h-52 sm:h-72 rounded overflow-hidden mb-8">
          <Image src={urlFor(post.coverImage).width(800).height(400).url()} alt={post.title} width={800} height={400} className="object-cover w-full h-full" />
        </div>
      )}
      <span className="text-[var(--text-muted)] text-xs">{formatDate(post.publishedDate)}</span>
      <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold mt-2 mb-6">{post.title}</h1>
      <div className="text-[var(--text-dim)] text-sm leading-relaxed [&_p]:mb-4 [&_h2]:font-serif [&_h2]:text-white [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-white [&_a]:text-[var(--gold)] [&_a]:underline">
        <PortableText value={post.body} />
      </div>
    </div>
  )
}
