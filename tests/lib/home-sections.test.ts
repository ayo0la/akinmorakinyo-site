import { buildStackSections } from '@/lib/home-sections'
import type { Paper, ResearchTool, WritingPostMeta } from '@/lib/types'

const post: WritingPostMeta = {
  slug: 'the-akara-economy',
  title: 'The Akara economy',
  date: '2026-06-30',
  excerpt: 'Informal sector economics.',
  publication: 'Nairametrics',
  externalUrl: 'https://nairametrics.com/x',
  draft: false,
}

const paper: Paper = {
  id: 'p1',
  title: 'A paper',
  abstract: 'An abstract about a paper.',
  publishedDate: '2025-01-01',
  coAuthors: [],
  tags: [],
  featured: true,
}

const tool: ResearchTool = {
  id: 'inflation-calculator',
  title: 'Inflation Calculator',
  description: 'Convert naira across years.',
  type: 'calculator',
  visualizationType: 'line-chart',
  componentSlug: 'inflation-calculator',
  tags: [],
  publishedDate: '2026-01-01',
}

describe('buildStackSections', () => {
  it('omits sections with no content', () => {
    const sections = buildStackSections({ post, paper: null, tools: [] })
    expect(sections.map(s => s.id)).toEqual(['writing'])
  })

  it('omits papers while content/papers.ts is empty', () => {
    const sections = buildStackSections({ post, paper: null, tools: [tool] })
    expect(sections.map(s => s.id)).toEqual(['writing', 'tools'])
  })

  it('includes papers between writing and tools once one exists', () => {
    const sections = buildStackSections({ post, paper, tools: [tool] })
    expect(sections.map(s => s.id)).toEqual(['writing', 'papers', 'tools'])
  })

  it('returns an empty array when nothing is populated', () => {
    expect(buildStackSections({ post: null, paper: null, tools: [] })).toEqual([])
  })

  it('marks an external post as external and links out', () => {
    const [writing] = buildStackSections({ post, paper: null, tools: [] })
    expect(writing.external).toBe(true)
    expect(writing.href).toBe('https://nairametrics.com/x')
  })

  it('links an internal post to its detail page', () => {
    const internal = { ...post, externalUrl: undefined, publication: undefined }
    const [writing] = buildStackSections({ post: internal, paper: null, tools: [] })
    expect(writing.external).toBe(false)
    expect(writing.href).toBe('/writing/the-akara-economy')
  })
})
