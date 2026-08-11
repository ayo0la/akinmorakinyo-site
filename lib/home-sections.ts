import type { Paper, ResearchTool, WritingPostMeta } from '@/lib/types'

export type StackSection = {
  id: 'writing' | 'papers' | 'tools'
  label: string
  title: string
  description: string
  href: string
  external: boolean
  cta: string
}

export function buildStackSections({
  post,
  paper,
  tools,
}: {
  post: WritingPostMeta | null
  paper: Paper | null
  tools: ResearchTool[]
}): StackSection[] {
  const sections: StackSection[] = []

  if (post) {
    sections.push({
      id: 'writing',
      label: 'Writing',
      title: post.title,
      description: post.excerpt ?? '',
      href: post.externalUrl ?? `/writing/${post.slug}`,
      external: Boolean(post.externalUrl),
      cta: post.externalUrl
        ? `Read at ${post.publication ?? 'source'}`
        : 'Read the essay',
    })
  }

  if (paper) {
    sections.push({
      id: 'papers',
      label: 'Papers',
      title: paper.title,
      description: paper.abstract ?? '',
      href: '/papers',
      external: false,
      cta: 'View papers',
    })
  }

  if (tools.length > 0) {
    sections.push({
      id: 'tools',
      label: 'Research Tools',
      title: tools[0].title,
      description: tools[0].description,
      href: `/tools/${tools[0].id}`,
      external: false,
      cta: 'Open the tool',
    })
  }

  return sections
}
