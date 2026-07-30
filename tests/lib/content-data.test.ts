// @vitest-environment node
import { profile } from '@/content/profile'
import { getProfile, getPapers, getFeaturedPaper, getTools, getTool } from '@/lib/content'

describe('profile content', () => {
  it('has the correct name with no vanity titles', () => {
    expect(profile.name).toBe('Dr. Akinola E. Morakinyo')
  })

  it('has a local photo path', () => {
    expect(profile.photo).toBe('/images/profile.jpg')
  })

  it('has bio paragraphs with no garbled text', () => {
    expect(profile.bio.length).toBeGreaterThanOrEqual(2)
    for (const p of profile.bio) {
      expect(p).not.toContain('*')
      expect(p).not.toContain('that delivers, high-impact')
    }
  })

  it('has department, university, and email', () => {
    expect(profile.department).toBe('Department of Economics, Finance & Quantitative Analysis')
    expect(profile.university).toBe('Kennesaw State University')
    expect(profile.email).toBe('amorakinyo1@gmail.com')
  })
})

describe('content loaders', () => {
  it('getProfile returns the profile', () => {
    expect(getProfile().name).toBe('Dr. Akinola E. Morakinyo')
  })

  it('getPapers returns an array (empty until papers are added)', () => {
    expect(Array.isArray(getPapers())).toBe(true)
  })

  it('getFeaturedPaper returns null when no paper is featured', () => {
    expect(getFeaturedPaper()).toBeNull()
  })

  it('getTools includes the inflation calculator', () => {
    const tools = getTools()
    expect(tools.some(t => t.id === 'inflation-calculator')).toBe(true)
  })

  it('getTool returns a tool by id and null for unknown ids', () => {
    expect(getTool('inflation-calculator')?.type).toBe('calculator')
    expect(getTool('nope')).toBeNull()
  })
})
