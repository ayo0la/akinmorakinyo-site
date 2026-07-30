// @vitest-environment node
import path from 'node:path'
import { getPosts, getPost } from '@/lib/content'

const FIXTURES = path.join(__dirname, '..', 'fixtures', 'writing')

describe('getPosts', () => {
  it('returns non-draft posts sorted newest first', () => {
    const posts = getPosts(FIXTURES)
    expect(posts.map(p => p.slug)).toEqual([
      'first-essay',
      'nairametrics-column',
      'older-essay',
    ])
  })

  it('excludes drafts', () => {
    expect(getPosts(FIXTURES).some(p => p.slug === 'draft-post')).toBe(false)
  })

  it('parses frontmatter including externalUrl and publication', () => {
    const column = getPosts(FIXTURES).find(p => p.slug === 'nairametrics-column')
    expect(column?.externalUrl).toBe('https://nairametrics.com/example-column')
    expect(column?.publication).toBe('Nairametrics')
    expect(column?.date).toBe('2026-06-15')
  })

  it('returns an empty array for a missing directory', () => {
    expect(getPosts(path.join(FIXTURES, 'does-not-exist'))).toEqual([])
  })
})

describe('getPost', () => {
  it('renders markdown body to HTML', () => {
    const post = getPost('first-essay', FIXTURES)
    expect(post?.title).toBe('On Inflation Expectations')
    expect(post?.html).toContain('<strong>expectations</strong>')
    expect(post?.html).toContain('<h2>The anchoring problem</h2>')
  })

  it('returns null for missing, draft, and external posts', () => {
    expect(getPost('missing', FIXTURES)).toBeNull()
    expect(getPost('draft-post', FIXTURES)).toBeNull()
    expect(getPost('nairametrics-column', FIXTURES)).toBeNull()
  })

  it('rejects slugs with path characters', () => {
    expect(getPost('../fixtures/writing/first-essay', FIXTURES)).toBeNull()
  })
})

describe('content validation', () => {
  it('throws a descriptive error for a filename with invalid characters', () => {
    const dir = path.join(__dirname, '..', 'fixtures', 'writing-invalid-name')
    expect(() => getPosts(dir)).toThrow(/bad_name\.md/)
    expect(() => getPosts(dir)).toThrow(/lowercase/i)
  })

  it('throws a descriptive error for a post with no date', () => {
    const dir = path.join(__dirname, '..', 'fixtures', 'writing-invalid-date')
    expect(() => getPosts(dir)).toThrow(/no-date\.md/)
    expect(() => getPosts(dir)).toThrow(/YYYY-MM-DD/)
  })
})
