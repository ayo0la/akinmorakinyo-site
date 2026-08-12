import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPost, getPosts } from '@/lib/content'
import { formatDate } from '@/lib/format'
import { Section } from '@/components/ui/section'

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts()
    .filter(p => !p.externalUrl)
    .map(p => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  return post ? { title: `${post.title} · Dr. Akinola E. Morakinyo`, description: post.excerpt } : {}
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <Section as="article" width="prose">
      <p className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--accent)]">
        {post.tag ?? 'Essay'}
      </p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-medium leading-tight">{post.title}</h1>
      <time dateTime={post.date} className="mt-4 block font-sans text-xs text-[var(--text-muted)]">
        {formatDate(post.date)}
      </time>
      <div className="mt-6 h-px w-16 bg-[var(--accent)]" />
      <div
        className="mt-[var(--space-block)] text-lg leading-[1.75] [&_p]:mb-5 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent)] [&_blockquote]:pl-5 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_strong]:text-[var(--heading)]"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Section>
  )
}
