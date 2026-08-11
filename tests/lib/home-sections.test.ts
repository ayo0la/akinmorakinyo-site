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

  it("carries the post's date on the writing section", () => {
    const [writing] = buildStackSections({ post, paper: null, tools: [] })
    expect(writing.date).toBe('2026-06-30')
  })

  it("labels an external post's writing section with its publication", () => {
    const [writing] = buildStackSections({ post, paper: null, tools: [] })
    expect(writing.label).toBe('Nairametrics')
  })

  it('falls back to "Writing" when an external post has no publication', () => {
    const external = { ...post, publication: undefined }
    const [writing] = buildStackSections({ post: external, paper: null, tools: [] })
    expect(writing.label).toBe('Writing')
  })

  it("labels an internal post's writing section with its tag", () => {
    const internal = { ...post, externalUrl: undefined, publication: undefined, tag: 'Policy' }
    const [writing] = buildStackSections({ post: internal, paper: null, tools: [] })
    expect(writing.label).toBe('Policy')
  })

  it('falls back to "Essay" when an internal post has no tag', () => {
    const internal = { ...post, externalUrl: undefined, publication: undefined, tag: undefined }
    const [writing] = buildStackSections({ post: internal, paper: null, tools: [] })
    expect(writing.label).toBe('Essay')
  })

  it("carries the tools section's secondary link to the tools index", () => {
    const sections = buildStackSections({ post: null, paper: null, tools: [tool] })
    const tools = sections.find(s => s.id === 'tools')
    expect(tools?.secondaryHref).toBe('/tools')
    expect(tools?.secondaryCta).toBe('View all')
  })

  it('gives the writing and papers sections no secondary link', () => {
    const sections = buildStackSections({ post, paper, tools: [tool] })
    const writing = sections.find(s => s.id === 'writing')
    const papers = sections.find(s => s.id === 'papers')
    expect(writing?.secondaryHref).toBeUndefined()
    expect(writing?.secondaryCta).toBeUndefined()
    expect(papers?.secondaryHref).toBeUndefined()
    expect(papers?.secondaryCta).toBeUndefined()
  })
})
