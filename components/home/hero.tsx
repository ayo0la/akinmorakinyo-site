import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/image-builder'
import type { Profile } from '@/lib/types'

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="py-10 px-4 sm:px-6 border-b border-[var(--gold-dim)] md:border-b-0 md:border-r">
      <div className="flex flex-col items-center text-center gap-4">
        {profile.photo?.asset?.url && (
          <div className="w-24 h-24 rounded-full border-2 border-[var(--gold)] overflow-hidden flex-shrink-0">
            <Image
              src={urlFor(profile.photo).width(96).height(96).url()}
              alt={profile.name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold">{profile.name}</h1>
          <p className="text-[var(--text-muted)] text-xs mt-1">{profile.department}</p>
          <p className="text-[var(--text-muted)] text-xs">{profile.university}</p>
        </div>
        {profile.statementOfPurpose && (
          <blockquote className="border-l-2 border-[var(--gold)] pl-4 text-[var(--text-dim)] text-sm italic text-left max-w-sm">
            {profile.statementOfPurpose}
          </blockquote>
        )}
        <div className="flex gap-3">
          <Link href="/papers" className="bg-[var(--gold)] text-[var(--navy)] px-4 py-2 rounded text-sm font-bold hover:opacity-90 transition-opacity">
            View Papers
          </Link>
          <Link href="/blog" className="border border-[var(--gold)] text-[var(--gold)] px-4 py-2 rounded text-sm hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-colors">
            Read Blog
          </Link>
        </div>
        <div className="flex gap-4 text-xs text-[var(--text-muted)]">
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors">LinkedIn</a>
          )}
          {profile.googleScholarUrl && (
            <a href={profile.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors">Google Scholar</a>
          )}
          {profile.universityUrl && (
            <a href={profile.universityUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors">University</a>
          )}
        </div>
      </div>
    </section>
  )
}
