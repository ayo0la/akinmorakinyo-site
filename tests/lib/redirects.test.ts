// @vitest-environment node
import nextConfig from '@/next.config'

describe('redirects', () => {
  it('permanently redirects articles and blog to writing', async () => {
    const redirects = await nextConfig.redirects!()
    expect(redirects).toEqual(
      expect.arrayContaining([
        { source: '/articles', destination: '/writing', permanent: true },
        { source: '/blog', destination: '/writing', permanent: true },
        { source: '/blog/:slug', destination: '/writing/:slug', permanent: true },
      ])
    )
  })
})
