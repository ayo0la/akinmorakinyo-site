import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { getProfile } from '@/sanity/queries'
import { urlFor } from '@/sanity/image-builder'

export default async function AboutPage() {
  const profile = await getProfile()
  if (!profile) return <div className="max-w-3xl mx-auto px-4 py-20 text-[var(--text-muted)]">Profile not configured.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        {profile.photo?.asset?.url && (
          <div className="w-32 h-32 rounded-full border-2 border-[var(--gold)] overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
            <Image
              src={urlFor(profile.photo).width(128).height(128).url()}
              alt={profile.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div>
          <h1 className="font-serif text-2xl text-white font-bold">{profile.name}</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">{profile.department}</p>
          <p className="text-[var(--text-muted)] text-sm">{profile.university}</p>
          <div className="flex gap-4 mt-3 flex-wrap">
            {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] text-sm hover:opacity-80">LinkedIn</a>}
            {profile.googleScholarUrl && <a href={profile.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] text-sm hover:opacity-80">Google Scholar</a>}
            {profile.universityUrl && <a href={profile.universityUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] text-sm hover:opacity-80">University Profile</a>}
            {profile.cvFileUrl && (
              <a href={profile.cvFileUrl} download className="bg-[var(--gold)] text-[var(--navy)] px-3 py-1 rounded text-sm font-bold hover:opacity-90">Download CV</a>
            )}
          </div>
        </div>
      </div>
      {profile.bio && (
        <div className="prose prose-invert prose-sm max-w-none text-[var(--text-dim)] [&_p]:mb-4 [&_p]:leading-relaxed [&_h2]:font-serif [&_h2]:text-white">
          <PortableText value={profile.bio} />
        </div>
      )}
    </div>
  )
}
