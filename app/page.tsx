import Link from 'next/link'
import { getProfile, getFeaturedPaper, getPosts, getTools } from '@/lib/content'
import { Hero } from '@/components/home/hero'
import { RecentWork } from '@/components/home/recent-work'
import { ToolsStrip } from '@/components/home/tools-strip'

export default function HomePage() {
  const profile = getProfile()
  const paper = getFeaturedPaper()
  const post = getPosts()[0] ?? null
  const tools = getTools()

  return (
    <div>
      <Hero profile={profile} />
      <RecentWork paper={paper} post={post} />
      <section className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--accent)]">About</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{profile.bio[0]}</p>
          <Link
            href="/about"
            className="mt-5 inline-block font-sans text-sm text-[var(--accent)] hover:underline underline-offset-4"
          >
            More about Dr. Morakinyo →
          </Link>
        </div>
      </section>
      <ToolsStrip tools={tools} />
    </div>
  )
}
