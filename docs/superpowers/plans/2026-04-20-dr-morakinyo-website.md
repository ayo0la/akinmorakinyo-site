# Dr. Akinola Morakinyo Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7-page personal academic website for Dr. Akinola Morakinyo using Next.js 14 + Sanity CMS, deployed to Vercel.

**Architecture:** Next.js App Router site with Sanity v3 as the CMS. Static content pages (Papers, Articles, Blog, About) are server-rendered. Interactive pages (Tools, Contact) use client components. Research tools render CSV datasets via Recharts and a calculator registry pattern. Contact form submits via a Next.js API route to Resend.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Sanity v3, Recharts, PapaParse, Resend, Vitest + React Testing Library

---

## File Map

**New files to create:**
- `app/layout.tsx` — root layout with Nav + Footer
- `app/globals.css` — CSS variables and global resets
- `app/page.tsx` — homepage (server component)
- `app/about/page.tsx` — about page
- `app/papers/page.tsx` — papers listing
- `app/articles/page.tsx` — articles listing
- `app/blog/page.tsx` — blog listing
- `app/blog/[slug]/page.tsx` — individual blog post
- `app/tools/page.tsx` — tools listing
- `app/tools/[id]/page.tsx` — individual tool page
- `app/contact/page.tsx` — contact page (client component)
- `app/api/contact/route.ts` — Resend email API route
- `components/nav.tsx` — sticky nav with mobile hamburger (client)
- `components/footer.tsx` — site footer
- `components/home/hero.tsx` — homepage hero
- `components/home/recent-work.tsx` — featured items feed
- `components/home/tools-strip.tsx` — tools preview row
- `components/papers/paper-card.tsx` — single paper card
- `components/articles/article-card.tsx` — single article card
- `components/blog/post-card.tsx` — single blog post card
- `components/tools/tool-card.tsx` — single tool card
- `components/tools/dataset-viewer.tsx` — CSV table + charts (client)
- `components/tools/calculators/registry.tsx` — slug → component map
- `components/tools/calculators/inflation-calculator.tsx` — inflation calc (client)
- `components/contact/inquiry-selector.tsx` — 4-type selector (client)
- `components/contact/contact-form.tsx` — adaptive form (client)
- `sanity/client.ts` — Sanity client instance
- `sanity/image-builder.ts` — image URL helper
- `sanity/queries.ts` — all GROQ queries
- `sanity/schemas/paper.ts`
- `sanity/schemas/article.ts`
- `sanity/schemas/blog-post.ts`
- `sanity/schemas/research-tool.ts`
- `sanity/schemas/profile.ts`
- `sanity.config.ts` — Sanity Studio config
- `lib/types.ts` — all TypeScript types
- `lib/csv-parser.ts` — parse, sort, filter utilities
- `vitest.config.ts`
- `vitest.setup.ts`
- `tests/lib/csv-parser.test.ts`
- `tests/components/nav.test.tsx`
- `tests/components/tools/dataset-viewer.test.tsx`
- `tests/components/tools/calculators/inflation-calculator.test.tsx`
- `tests/components/contact/inquiry-selector.test.tsx`
- `tests/components/contact/contact-form.test.tsx`
- `tests/api/contact.test.ts`

---

### Task 1: Project Scaffold + Dependencies

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `vitest.config.ts`, `vitest.setup.ts`, `.env.local`, `.gitignore`

- [ ] **Step 1: Scaffold the Next.js project**

```bash
cd ~/Desktop
npx create-next-app@latest dad-economics-site \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
cd dad-economics-site
```

Expected: project created with `app/`, `public/` directories, no errors.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install \
  @sanity/client \
  @sanity/image-url \
  next-sanity \
  sanity \
  @portabletext/react \
  recharts \
  papaparse \
  resend

npm install -D \
  @types/papaparse \
  vitest \
  @vitejs/plugin-react \
  jsdom \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event
```

Expected: `node_modules/` updated, no peer dependency errors.

- [ ] **Step 3: Create vitest.config.ts**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

- [ ] **Step 4: Create vitest.setup.ts**

```typescript
// vitest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test scripts to package.json**

Open `package.json` and add to `"scripts"`:
```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 6: Create .env.local**

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token
RESEND_API_KEY=your-resend-key
CONTACT_EMAIL=ayoola@mdfld.co
EOF
```

- [ ] **Step 7: Create .env.example**

```bash
cat > .env.example << 'EOF'
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token
RESEND_API_KEY=your-resend-api-key
CONTACT_EMAIL=dr-morakinyo-email@example.com
EOF
```

- [ ] **Step 8: Append to .gitignore**

```bash
cat >> .gitignore << 'EOF'
.env.local
.env*.local
.superpowers/
EOF
```

- [ ] **Step 9: Verify test runner works**

```bash
npx vitest run
```

Expected: "No test files found" — exits with 0.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, Sanity, Recharts, Vitest"
```

---

### Task 2: TypeScript Types

**Files:**
- Create: `lib/types.ts`

- [ ] **Step 1: Create lib/types.ts**

```typescript
// lib/types.ts
import type { PortableTextBlock } from '@portabletext/react'

export type SanityImage = {
  asset: { _ref: string; url: string }
  alt?: string
}

export type SanityFile = {
  asset: { _ref: string; url: string }
}

export type Paper = {
  _id: string
  title: string
  abstract: string
  pdfUrl: string
  publishedDate: string
  journal: string
  coAuthors: string[]
  tags: string[]
  googleScholarUrl: string
  featured: boolean
}

export type Article = {
  _id: string
  title: string
  publication: string
  publicationLogo: SanityImage
  externalUrl: string
  publishedDate: string
  excerpt: string
  tags: string[]
  featured: boolean
}

export type BlogPost = {
  _id: string
  title: string
  slug: string
  body: PortableTextBlock[]
  publishedDate: string
  coverImage: SanityImage
  excerpt: string
  tags: string[]
  featured: boolean
}

export type VisualizationType = 'table' | 'line-chart' | 'bar-chart' | 'mixed'
export type ToolType = 'calculator' | 'dataset'

export type ResearchTool = {
  _id: string
  title: string
  description: string
  type: ToolType
  visualizationType: VisualizationType
  componentSlug: string
  datasetFileUrl: string
  xAxis: string
  yAxis: string
  previewImage: SanityImage
  tags: string[]
  publishedDate: string
}

export type Profile = {
  name: string
  photo: SanityImage
  bio: PortableTextBlock[]
  department: string
  university: string
  cvFileUrl: string
  universityUrl: string
  linkedinUrl: string
  googleScholarUrl: string
  email: string
  statementOfPurpose: string
}

export type InquiryType = 'speaking' | 'media' | 'consulting' | 'general'

export type ContactPayload = {
  inquiryType: InquiryType
  name: string
  email: string
  organisation?: string
  eventDate?: string
  locationFormat?: string
  eventDescription?: string
  outlet?: string
  mediaFormat?: string
  topic?: string
  projectDescription?: string
  timeline?: string
  message?: string
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/types.ts
git commit -m "feat: add TypeScript types for all content and contact models"
```

---

### Task 3: Sanity Schemas + Config

**Files:**
- Create: `sanity/schemas/paper.ts`
- Create: `sanity/schemas/article.ts`
- Create: `sanity/schemas/blog-post.ts`
- Create: `sanity/schemas/research-tool.ts`
- Create: `sanity/schemas/profile.ts`
- Create: `sanity.config.ts`

- [ ] **Step 1: Create sanity/schemas/paper.ts**

```typescript
// sanity/schemas/paper.ts
import { defineField, defineType } from 'sanity'

export const paper = defineType({
  name: 'paper',
  title: 'Academic Paper',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'abstract', title: 'Abstract', type: 'text' }),
    defineField({ name: 'pdfUrl', title: 'PDF URL', type: 'url' }),
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'journal', title: 'Journal / Publisher', type: 'string' }),
    defineField({ name: 'coAuthors', title: 'Co-Authors', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'googleScholarUrl', title: 'Google Scholar URL', type: 'url' }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Date, Newest', name: 'dateDesc', by: [{ field: 'publishedDate', direction: 'desc' }] }],
})
```

- [ ] **Step 2: Create sanity/schemas/article.ts**

```typescript
// sanity/schemas/article.ts
import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article / Column',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'publication', title: 'Publication', type: 'string', validation: r => r.required() }),
    defineField({ name: 'publicationLogo', title: 'Publication Logo', type: 'image' }),
    defineField({ name: 'externalUrl', title: 'External URL', type: 'url', validation: r => r.required() }),
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Date, Newest', name: 'dateDesc', by: [{ field: 'publishedDate', direction: 'desc' }] }],
})
```

- [ ] **Step 3: Create sanity/schemas/blog-post.ts**

```typescript
// sanity/schemas/blog-post.ts
import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Date, Newest', name: 'dateDesc', by: [{ field: 'publishedDate', direction: 'desc' }] }],
})
```

- [ ] **Step 4: Create sanity/schemas/research-tool.ts**

```typescript
// sanity/schemas/research-tool.ts
import { defineField, defineType } from 'sanity'

export const researchTool = defineType({
  name: 'researchTool',
  title: 'Research Tool',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'type', title: 'Type', type: 'string',
      options: { list: [{ title: 'Calculator', value: 'calculator' }, { title: 'Dataset', value: 'dataset' }] },
      validation: r => r.required(),
    }),
    defineField({
      name: 'visualizationType', title: 'Visualization Type', type: 'string',
      options: {
        list: [
          { title: 'Table', value: 'table' },
          { title: 'Line Chart', value: 'line-chart' },
          { title: 'Bar Chart', value: 'bar-chart' },
          { title: 'Mixed (Chart + Table)', value: 'mixed' },
        ],
      },
    }),
    defineField({ name: 'componentSlug', title: 'Calculator Component Slug', type: 'string', description: 'For calculators only. Must match a registered component.' }),
    defineField({ name: 'datasetFile', title: 'Dataset File (CSV/JSON)', type: 'file' }),
    defineField({ name: 'xAxis', title: 'X-Axis Column Name', type: 'string' }),
    defineField({ name: 'yAxis', title: 'Y-Axis Column Name', type: 'string' }),
    defineField({ name: 'previewImage', title: 'Preview Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date' }),
  ],
})
```

- [ ] **Step 5: Create sanity/schemas/profile.ts**

```typescript
// sanity/schemas/profile.ts
import { defineField, defineType } from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'department', title: 'Department', type: 'string' }),
    defineField({ name: 'university', title: 'University', type: 'string' }),
    defineField({ name: 'cvFile', title: 'CV File (PDF)', type: 'file' }),
    defineField({ name: 'universityUrl', title: 'University Profile URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'googleScholarUrl', title: 'Google Scholar URL', type: 'url' }),
    defineField({ name: 'email', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'statementOfPurpose', title: 'Statement of Purpose (1 line)', type: 'string' }),
  ],
})
```

- [ ] **Step 6: Create sanity.config.ts**

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { paper } from './sanity/schemas/paper'
import { article } from './sanity/schemas/article'
import { blogPost } from './sanity/schemas/blog-post'
import { researchTool } from './sanity/schemas/research-tool'
import { profile } from './sanity/schemas/profile'

export default defineConfig({
  name: 'dr-morakinyo-website',
  title: 'Dr. Morakinyo Website',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('paper').title('Academic Papers'),
            S.documentTypeListItem('article').title('Articles & Columns'),
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.documentTypeListItem('researchTool').title('Research Tools'),
            S.divider(),
            S.listItem()
              .title('Profile')
              .child(S.document().schemaType('profile').documentId('profile')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: [paper, article, blogPost, researchTool, profile] },
})
```

- [ ] **Step 7: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add sanity/ sanity.config.ts
git commit -m "feat: add Sanity schemas for all 5 content types"
```

---

### Task 4: Sanity Client + GROQ Queries

**Files:**
- Create: `sanity/client.ts`
- Create: `sanity/image-builder.ts`
- Create: `sanity/queries.ts`

- [ ] **Step 1: Create sanity/client.ts**

```typescript
// sanity/client.ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

- [ ] **Step 2: Create sanity/image-builder.ts**

```typescript
// sanity/image-builder.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImage } from '@/lib/types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}
```

- [ ] **Step 3: Create sanity/queries.ts**

```typescript
// sanity/queries.ts
import { client } from './client'
import type { Paper, Article, BlogPost, ResearchTool, Profile } from '@/lib/types'

const IMAGE_FIELDS = `{ asset->{ url }, alt }`
const FILE_FIELDS = `{ asset->{ url } }`

export async function getProfile(): Promise<Profile | null> {
  return client.fetch(`
    *[_type == "profile"][0] {
      name, photo ${IMAGE_FIELDS}, bio,
      department, university,
      "cvFileUrl": cvFile ${FILE_FIELDS}.asset.url,
      universityUrl, linkedinUrl, googleScholarUrl,
      email, statementOfPurpose
    }
  `)
}

export async function getPapers(): Promise<Paper[]> {
  return client.fetch(`
    *[_type == "paper"] | order(publishedDate desc) {
      _id, title, abstract, pdfUrl, publishedDate,
      journal, coAuthors, tags, googleScholarUrl, featured
    }
  `)
}

export async function getFeaturedPaper(): Promise<Paper | null> {
  return client.fetch(`
    *[_type == "paper" && featured == true] | order(publishedDate desc)[0] {
      _id, title, publishedDate
    }
  `)
}

export async function getArticles(): Promise<Article[]> {
  return client.fetch(`
    *[_type == "article"] | order(publishedDate desc) {
      _id, title, publication,
      publicationLogo ${IMAGE_FIELDS},
      externalUrl, publishedDate, excerpt, tags, featured
    }
  `)
}

export async function getFeaturedArticle(): Promise<Article | null> {
  return client.fetch(`
    *[_type == "article" && featured == true] | order(publishedDate desc)[0] {
      _id, title, publication, externalUrl, publishedDate
    }
  `)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedDate desc) {
      _id, title, "slug": slug.current,
      coverImage ${IMAGE_FIELDS},
      publishedDate, excerpt, tags, featured
    }
  `)
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id, title, "slug": slug.current,
      body, coverImage ${IMAGE_FIELDS},
      publishedDate, excerpt, tags
    }
  `, { slug })
}

export async function getFeaturedBlogPost(): Promise<BlogPost | null> {
  return client.fetch(`
    *[_type == "blogPost" && featured == true] | order(publishedDate desc)[0] {
      _id, title, "slug": slug.current, publishedDate
    }
  `)
}

export async function getResearchTools(): Promise<ResearchTool[]> {
  return client.fetch(`
    *[_type == "researchTool"] | order(publishedDate desc) {
      _id, title, description, type, visualizationType,
      componentSlug,
      "datasetFileUrl": datasetFile ${FILE_FIELDS}.asset.url,
      xAxis, yAxis,
      previewImage ${IMAGE_FIELDS},
      tags, publishedDate
    }
  `)
}

export async function getResearchTool(id: string): Promise<ResearchTool | null> {
  return client.fetch(`
    *[_type == "researchTool" && _id == $id][0] {
      _id, title, description, type, visualizationType,
      componentSlug,
      "datasetFileUrl": datasetFile ${FILE_FIELDS}.asset.url,
      xAxis, yAxis,
      previewImage ${IMAGE_FIELDS},
      tags, publishedDate
    }
  `, { id })
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add sanity/client.ts sanity/image-builder.ts sanity/queries.ts
git commit -m "feat: add Sanity client and GROQ queries for all content types"
```

---

### Task 5: Global Styles + Root Layout

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Replace app/globals.css**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --navy: #1a1a2e;
  --navy-mid: #111827;
  --navy-light: #2d2d4e;
  --gold: #c9a84c;
  --gold-dim: #c9a84c33;
  --text: #f0f0f0;
  --text-muted: #888888;
  --text-dim: #cccccc;
  --border: #334155;
}

body {
  background-color: var(--navy);
  color: var(--text);
  font-family: system-ui, -apple-system, sans-serif;
}

h1, h2, h3 {
  font-family: Georgia, 'Times New Roman', serif;
}

a { color: inherit; text-decoration: none; }
```

- [ ] **Step 2: Replace app/layout.tsx**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Dr. Akinola Morakinyo',
  description: 'Economist. Researcher. Columnist.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Update next.config.ts for Sanity image CDN**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default nextConfig
```

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx next.config.ts
git commit -m "feat: add global styles, root layout, and Sanity image domain config"
```

---

### Task 6: Nav + Footer

**Files:**
- Create: `components/nav.tsx`
- Create: `components/footer.tsx`
- Create: `tests/components/nav.test.tsx`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/components/nav.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Nav } from '@/components/nav'

describe('Nav', () => {
  it('renders the site name', () => {
    render(<Nav />)
    expect(screen.getByText('Akinola Morakinyo')).toBeInTheDocument()
  })

  it('renders all desktop nav links', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Papers' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Articles' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tools' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('toggles mobile menu open and closed', () => {
    render(<Nav />)
    const btn = screen.getByRole('button', { name: /menu/i })
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    fireEvent.click(btn)
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()
    fireEvent.click(btn)
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/nav.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/nav'"

- [ ] **Step 3: Create components/nav.tsx**

```typescript
// components/nav.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/about', label: 'About' },
  { href: '/papers', label: 'Papers' },
  { href: '/articles', label: 'Articles' },
  { href: '/blog', label: 'Blog' },
  { href: '/tools', label: 'Tools' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-[var(--navy)] border-b border-[var(--gold-dim)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-[var(--gold)] text-[0.6rem] tracking-widest uppercase">Dr.</span>
          <span className="text-white font-bold font-serif text-sm sm:text-base">Akinola Morakinyo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-[var(--text-dim)] hover:text-white text-sm transition-colors">
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-[var(--gold)] border border-[var(--gold)] px-3 py-1 rounded text-sm hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-colors"
          >
            Contact
          </Link>
        </nav>

        <button
          aria-label="menu"
          className="md:hidden flex flex-col gap-1 p-2"
          onClick={() => setOpen(o => !o)}
        >
          <span className="w-5 h-0.5 bg-[var(--gold)] block" />
          <span className="w-5 h-0.5 bg-[var(--gold)] block" />
          <span className="w-5 h-0.5 bg-[var(--gold)] block" />
        </button>
      </div>

      {open && (
        <nav data-testid="mobile-menu" className="md:hidden bg-[var(--navy)] border-t border-[var(--gold-dim)] px-4 pb-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="block py-2 text-[var(--text-dim)] hover:text-white text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="block mt-2 text-center text-[var(--gold)] border border-[var(--gold)] px-3 py-2 rounded text-sm" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/components/nav.test.tsx
```

Expected: PASS (3 tests)

- [ ] **Step 5: Create components/footer.tsx**

```typescript
// components/footer.tsx
export function Footer() {
  return (
    <footer className="bg-[var(--navy)] border-t border-[var(--gold-dim)] py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[var(--text-muted)] text-xs">
        <span>© {new Date().getFullYear()} Dr. Akinola E. Morakinyo</span>
        <span className="text-center sm:text-right">Dept. of Economics, Finance & Quantitative Analysis · Kennesaw State University</span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add components/nav.tsx components/footer.tsx tests/components/nav.test.tsx
git commit -m "feat: add Nav with mobile hamburger and Footer (TDD)"
```

---

### Task 7: Homepage

**Files:**
- Create: `components/home/hero.tsx`
- Create: `components/home/recent-work.tsx`
- Create: `components/home/tools-strip.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create components/home/hero.tsx**

```typescript
// components/home/hero.tsx
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
          <p className="text-[var(--text-muted)] text-xs mt-1">
            {profile.department}
          </p>
          <p className="text-[var(--text-muted)] text-xs">
            {profile.university}
          </p>
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
```

- [ ] **Step 2: Create components/home/recent-work.tsx**

```typescript
// components/home/recent-work.tsx
import Link from 'next/link'
import type { Paper, Article, BlogPost } from '@/lib/types'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export function RecentWork({ paper, article, post }: {
  paper: Paper | null
  article: Article | null
  post: BlogPost | null
}) {
  const items = [
    paper && { kind: 'paper' as const, data: paper },
    article && { kind: 'article' as const, data: article },
    post && { kind: 'blog' as const, data: post },
  ].filter(Boolean) as Array<
    | { kind: 'paper'; data: Paper }
    | { kind: 'article'; data: Article }
    | { kind: 'blog'; data: BlogPost }
  >

  if (items.length === 0) return null

  return (
    <section className="py-8 px-4 sm:px-6">
      <h2 className="text-[var(--gold)] text-xs tracking-widest uppercase mb-4">Recent Work</h2>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => {
          if (item.kind === 'paper') return (
            <Link key={i} href="/papers" className="bg-[var(--navy)] rounded p-4 flex justify-between items-start border border-transparent hover:border-[var(--gold-dim)] transition-colors">
              <div><span className="text-[var(--text-muted)] text-xs uppercase">Paper</span><p className="text-white text-sm mt-0.5">{item.data.title}</p></div>
              <span className="text-[var(--text-muted)] text-xs ml-4 whitespace-nowrap">{formatDate(item.data.publishedDate)}</span>
            </Link>
          )
          if (item.kind === 'article') return (
            <a key={i} href={item.data.externalUrl} target="_blank" rel="noopener noreferrer" className="bg-[var(--navy)] rounded p-4 flex justify-between items-start border border-transparent hover:border-[var(--gold-dim)] transition-colors">
              <div><span className="text-[var(--text-muted)] text-xs uppercase">{item.data.publication}</span><p className="text-white text-sm mt-0.5">{item.data.title}</p></div>
              <span className="text-[var(--text-muted)] text-xs ml-4 whitespace-nowrap">{formatDate(item.data.publishedDate)}</span>
            </a>
          )
          return (
            <Link key={i} href={`/blog/${item.data.slug}`} className="bg-[var(--navy)] rounded p-4 flex justify-between items-start border border-transparent hover:border-[var(--gold-dim)] transition-colors">
              <div><span className="text-[var(--text-muted)] text-xs uppercase">Blog</span><p className="text-white text-sm mt-0.5">{item.data.title}</p></div>
              <span className="text-[var(--text-muted)] text-xs ml-4 whitespace-nowrap">{formatDate(item.data.publishedDate)}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create components/home/tools-strip.tsx**

```typescript
// components/home/tools-strip.tsx
import Link from 'next/link'
import type { ResearchTool } from '@/lib/types'

export function ToolsStrip({ tools }: { tools: ResearchTool[] }) {
  if (tools.length === 0) return null
  return (
    <section className="py-6 px-4 sm:px-6 border-t border-[var(--gold-dim)]">
      <h2 className="text-[var(--gold)] text-xs tracking-widest uppercase mb-3">Research Tools</h2>
      <div className="flex flex-col sm:flex-row gap-2">
        {tools.slice(0, 2).map(tool => (
          <Link key={tool._id} href={`/tools/${tool._id}`} className="bg-[var(--navy)] px-4 py-3 rounded text-sm text-[var(--text-muted)] hover:text-white flex-1 transition-colors">
            {tool.title}
          </Link>
        ))}
        <Link href="/tools" className="bg-[var(--navy)] px-4 py-3 rounded text-sm text-[var(--gold)] hover:opacity-80 text-center sm:text-left">
          View All →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Replace app/page.tsx**

```typescript
// app/page.tsx
import { getProfile, getFeaturedPaper, getFeaturedArticle, getFeaturedBlogPost, getResearchTools } from '@/sanity/queries'
import { Hero } from '@/components/home/hero'
import { RecentWork } from '@/components/home/recent-work'
import { ToolsStrip } from '@/components/home/tools-strip'

export default async function HomePage() {
  const [profile, paper, article, post, tools] = await Promise.all([
    getProfile(),
    getFeaturedPaper(),
    getFeaturedArticle(),
    getFeaturedBlogPost(),
    getResearchTools(),
  ])

  if (!profile) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-[var(--text-muted)]">
        Profile not configured. Add content in Sanity Studio.
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto md:grid md:grid-cols-[300px_1fr]">
      <div className="md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto">
        <Hero profile={profile} />
      </div>
      <div>
        <RecentWork paper={paper} article={article} post={post} />
        <ToolsStrip tools={tools} />
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add components/home/ app/page.tsx
git commit -m "feat: add homepage Hero, RecentWork, and ToolsStrip components"
```

---

### Task 8: About, Papers, Articles, and Blog Pages

**Files:**
- Create: `app/about/page.tsx`
- Create: `components/papers/paper-card.tsx`
- Create: `app/papers/page.tsx`
- Create: `components/articles/article-card.tsx`
- Create: `app/articles/page.tsx`
- Create: `components/blog/post-card.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create app/about/page.tsx**

```typescript
// app/about/page.tsx
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
```

- [ ] **Step 2: Create components/papers/paper-card.tsx**

```typescript
// components/papers/paper-card.tsx
import type { Paper } from '@/lib/types'

export function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="bg-[var(--navy)] rounded border border-transparent hover:border-[var(--gold-dim)] transition-colors p-5">
      <div className="flex justify-between items-start gap-4">
        <h2 className="font-serif text-white text-base font-semibold leading-snug">{paper.title}</h2>
        <span className="text-[var(--text-muted)] text-xs whitespace-nowrap">{paper.publishedDate?.slice(0, 4)}</span>
      </div>
      {paper.journal && <p className="text-[var(--gold)] text-xs mt-1">{paper.journal}</p>}
      {paper.coAuthors?.length > 0 && <p className="text-[var(--text-muted)] text-xs mt-1">with {paper.coAuthors.join(', ')}</p>}
      {paper.abstract && <p className="text-[var(--text-dim)] text-sm mt-3 leading-relaxed line-clamp-3">{paper.abstract}</p>}
      <div className="flex gap-3 mt-4">
        {paper.pdfUrl && <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] text-xs hover:underline">View PDF →</a>}
        {paper.googleScholarUrl && <a href={paper.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] text-xs hover:text-white">Google Scholar</a>}
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Create app/papers/page.tsx**

```typescript
// app/papers/page.tsx
import { getPapers } from '@/sanity/queries'
import { PaperCard } from '@/components/papers/paper-card'

export default async function PapersPage() {
  const papers = await getPapers()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl text-white font-bold mb-2">Academic Papers</h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">Peer-reviewed research and working papers.</p>
      {papers.length === 0
        ? <p className="text-[var(--text-muted)]">No papers published yet.</p>
        : <div className="flex flex-col gap-4">{papers.map(p => <PaperCard key={p._id} paper={p} />)}</div>
      }
    </div>
  )
}
```

- [ ] **Step 4: Create components/articles/article-card.tsx**

```typescript
// components/articles/article-card.tsx
import Image from 'next/image'
import { urlFor } from '@/sanity/image-builder'
import type { Article } from '@/lib/types'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <a href={article.externalUrl} target="_blank" rel="noopener noreferrer" className="bg-[var(--navy)] rounded border border-transparent hover:border-[var(--gold-dim)] transition-colors p-5 flex gap-4 items-start">
      {article.publicationLogo?.asset?.url && (
        <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-white/5 flex items-center justify-center">
          <Image src={urlFor(article.publicationLogo).width(40).height(40).url()} alt={article.publication} width={40} height={40} className="object-contain" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <span className="text-[var(--gold)] text-xs">{article.publication}</span>
          <span className="text-[var(--text-muted)] text-xs whitespace-nowrap">{formatDate(article.publishedDate)}</span>
        </div>
        <h2 className="font-serif text-white text-base font-semibold mt-1 leading-snug">{article.title}</h2>
        {article.excerpt && <p className="text-[var(--text-dim)] text-sm mt-2 leading-relaxed line-clamp-2">{article.excerpt}</p>}
        <span className="text-[var(--gold)] text-xs mt-3 inline-block hover:underline">Read article →</span>
      </div>
    </a>
  )
}
```

- [ ] **Step 5: Create app/articles/page.tsx**

```typescript
// app/articles/page.tsx
import { getArticles } from '@/sanity/queries'
import { ArticleCard } from '@/components/articles/article-card'

export default async function ArticlesPage() {
  const articles = await getArticles()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl text-white font-bold mb-2">Articles & Columns</h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">
        Published columns and op-eds, primarily in <span className="text-[var(--gold)]">Nairametrics</span> and other outlets.
      </p>
      {articles.length === 0
        ? <p className="text-[var(--text-muted)]">No articles published yet.</p>
        : <div className="flex flex-col gap-4">{articles.map(a => <ArticleCard key={a._id} article={a} />)}</div>
      }
    </div>
  )
}
```

- [ ] **Step 6: Create components/blog/post-card.tsx**

```typescript
// components/blog/post-card.tsx
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/image-builder'
import type { BlogPost } from '@/lib/types'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="bg-[var(--navy)] rounded border border-transparent hover:border-[var(--gold-dim)] transition-colors overflow-hidden flex flex-col sm:flex-row">
      {post.coverImage?.asset?.url && (
        <div className="sm:w-40 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
          <Image src={urlFor(post.coverImage).width(160).height(160).url()} alt={post.title} width={160} height={160} className="object-cover w-full h-full" />
        </div>
      )}
      <div className="p-5">
        <span className="text-[var(--text-muted)] text-xs">{formatDate(post.publishedDate)}</span>
        <h2 className="font-serif text-white text-base font-semibold mt-1 leading-snug">{post.title}</h2>
        {post.excerpt && <p className="text-[var(--text-dim)] text-sm mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>}
      </div>
    </Link>
  )
}
```

- [ ] **Step 7: Create app/blog/page.tsx**

```typescript
// app/blog/page.tsx
import { getBlogPosts } from '@/sanity/queries'
import { PostCard } from '@/components/blog/post-card'

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl text-white font-bold mb-2">Blog</h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">Commentary, explainers, and economic analysis.</p>
      {posts.length === 0
        ? <p className="text-[var(--text-muted)]">No posts yet.</p>
        : <div className="flex flex-col gap-4">{posts.map(p => <PostCard key={p._id} post={p} />)}</div>
      }
    </div>
  )
}
```

- [ ] **Step 8: Create app/blog/[slug]/page.tsx**

```typescript
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { getBlogPost, getBlogPosts } from '@/sanity/queries'
import { urlFor } from '@/sanity/image-builder'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map(p => ({ slug: p.slug }))
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {post.coverImage?.asset?.url && (
        <div className="w-full h-52 sm:h-72 rounded overflow-hidden mb-8">
          <Image src={urlFor(post.coverImage).width(800).height(400).url()} alt={post.title} width={800} height={400} className="object-cover w-full h-full" />
        </div>
      )}
      <span className="text-[var(--text-muted)] text-xs">{formatDate(post.publishedDate)}</span>
      <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold mt-2 mb-6">{post.title}</h1>
      <div className="text-[var(--text-dim)] text-sm leading-relaxed [&_p]:mb-4 [&_h2]:font-serif [&_h2]:text-white [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-white [&_a]:text-[var(--gold)] [&_a]:underline">
        <PortableText value={post.body} />
      </div>
    </div>
  )
}
```

- [ ] **Step 9: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 10: Commit**

```bash
git add app/about/ app/papers/ app/articles/ app/blog/ components/papers/ components/articles/ components/blog/
git commit -m "feat: add About, Papers, Articles, and Blog pages"
```

---

### Task 9: CSV Parser Utility

**Files:**
- Create: `lib/csv-parser.ts`
- Create: `tests/lib/csv-parser.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/lib/csv-parser.test.ts
import { describe, it, expect } from 'vitest'
import { parseCSV, sortRows, filterRows } from '@/lib/csv-parser'

const RAW_CSV = `year,inflation,gdp
2020,13.2,448.1
2021,17.0,440.8
2022,19.6,477.4
2023,24.7,363.8`

describe('parseCSV', () => {
  it('returns headers and rows', () => {
    const result = parseCSV(RAW_CSV)
    expect(result.headers).toEqual(['year', 'inflation', 'gdp'])
    expect(result.rows).toHaveLength(4)
    expect(result.rows[0]).toEqual({ year: '2020', inflation: '13.2', gdp: '448.1' })
  })

  it('handles empty input', () => {
    const result = parseCSV('')
    expect(result.headers).toEqual([])
    expect(result.rows).toEqual([])
  })
})

describe('sortRows', () => {
  it('sorts ascending by a column', () => {
    const { rows } = parseCSV(RAW_CSV)
    const sorted = sortRows(rows, 'inflation', 'asc')
    expect(sorted[0].inflation).toBe('13.2')
    expect(sorted[3].inflation).toBe('24.7')
  })

  it('sorts descending by a column', () => {
    const { rows } = parseCSV(RAW_CSV)
    const sorted = sortRows(rows, 'year', 'desc')
    expect(sorted[0].year).toBe('2023')
  })
})

describe('filterRows', () => {
  it('filters rows by a search term', () => {
    const { rows } = parseCSV(RAW_CSV)
    expect(filterRows(rows, '2021')).toHaveLength(1)
    expect(filterRows(rows, '2021')[0].year).toBe('2021')
  })

  it('returns all rows for an empty search term', () => {
    const { rows } = parseCSV(RAW_CSV)
    expect(filterRows(rows, '')).toHaveLength(4)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/lib/csv-parser.test.ts
```

Expected: FAIL — "Cannot find module '@/lib/csv-parser'"

- [ ] **Step 3: Create lib/csv-parser.ts**

```typescript
// lib/csv-parser.ts
import Papa from 'papaparse'

export type CSVRow = Record<string, string>
export type ParsedCSV = { headers: string[]; rows: CSVRow[] }

export function parseCSV(raw: string): ParsedCSV {
  if (!raw.trim()) return { headers: [], rows: [] }
  const result = Papa.parse<CSVRow>(raw.trim(), { header: true, skipEmptyLines: true })
  return { headers: result.meta.fields ?? [], rows: result.data }
}

export function sortRows(rows: CSVRow[], column: string, direction: 'asc' | 'desc'): CSVRow[] {
  return [...rows].sort((a, b) => {
    const aVal = parseFloat(a[column]) || a[column]
    const bVal = parseFloat(b[column]) || b[column]
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

export function filterRows(rows: CSVRow[], search: string): CSVRow[] {
  if (!search.trim()) return rows
  const term = search.toLowerCase()
  return rows.filter(row => Object.values(row).some(v => v.toLowerCase().includes(term)))
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/lib/csv-parser.test.ts
```

Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/csv-parser.ts tests/lib/csv-parser.test.ts
git commit -m "feat: add CSV parser with sort and filter utilities (TDD)"
```

---

### Task 10: Dataset Viewer Component

**Files:**
- Create: `components/tools/dataset-viewer.tsx`
- Create: `tests/components/tools/dataset-viewer.test.tsx`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/components/tools/dataset-viewer.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { DatasetViewer } from '@/components/tools/dataset-viewer'

const CSV = `year,inflation
2020,13.2
2021,17.0
2022,19.6`

describe('DatasetViewer', () => {
  it('renders table headers', () => {
    render(<DatasetViewer csvUrl="" initialCsv={CSV} xAxis="year" yAxis="inflation" visualizationType="table" />)
    expect(screen.getByText('year')).toBeInTheDocument()
    expect(screen.getByText('inflation')).toBeInTheDocument()
  })

  it('renders all data rows', () => {
    render(<DatasetViewer csvUrl="" initialCsv={CSV} xAxis="year" yAxis="inflation" visualizationType="table" />)
    expect(screen.getByText('2020')).toBeInTheDocument()
    expect(screen.getByText('13.2')).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
  })

  it('filters rows based on search input', () => {
    render(<DatasetViewer csvUrl="" initialCsv={CSV} xAxis="year" yAxis="inflation" visualizationType="table" />)
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: '2021' } })
    expect(screen.getByText('2021')).toBeInTheDocument()
    expect(screen.queryByText('2020')).not.toBeInTheDocument()
  })

  it('shows Chart and Table tabs for mixed type', () => {
    render(<DatasetViewer csvUrl="" initialCsv={CSV} xAxis="year" yAxis="inflation" visualizationType="mixed" />)
    expect(screen.getByRole('button', { name: /chart/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /table/i })).toBeInTheDocument()
  })

  it('switches to table view when Table tab clicked in mixed mode', () => {
    render(<DatasetViewer csvUrl="" initialCsv={CSV} xAxis="year" yAxis="inflation" visualizationType="mixed" />)
    fireEvent.click(screen.getByRole('button', { name: /table/i }))
    expect(screen.getByText('year')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/tools/dataset-viewer.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/tools/dataset-viewer'"

- [ ] **Step 3: Create components/tools/dataset-viewer.tsx**

```typescript
// components/tools/dataset-viewer.tsx
'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { parseCSV, sortRows, filterRows } from '@/lib/csv-parser'
import type { CSVRow } from '@/lib/csv-parser'
import type { VisualizationType } from '@/lib/types'

type Props = {
  csvUrl: string
  initialCsv?: string
  xAxis: string
  yAxis: string
  visualizationType: VisualizationType
}

export function DatasetViewer({ csvUrl, initialCsv, xAxis, yAxis, visualizationType }: Props) {
  const [rawCsv, setRawCsv] = useState(initialCsv ?? '')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null)
  const [view, setView] = useState<'chart' | 'table'>('chart')

  useEffect(() => {
    if (csvUrl && !initialCsv) {
      fetch(csvUrl).then(r => r.text()).then(setRawCsv)
    }
  }, [csvUrl, initialCsv])

  const { headers, rows } = parseCSV(rawCsv)
  const filtered = filterRows(rows, search)
  const sorted = sort ? sortRows(filtered, sort.column, sort.direction) : filtered
  const chartData = sorted.map(row => ({ [xAxis]: row[xAxis], [yAxis]: parseFloat(row[yAxis]) || 0 }))

  function toggleSort(column: string) {
    setSort(prev =>
      prev?.column === column
        ? { column, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { column, direction: 'asc' }
    )
  }

  function downloadCSV() {
    const content = [headers.join(','), ...sorted.map((r: CSVRow) => headers.map(h => r[h]).join(','))].join('\n')
    const blob = new Blob([content], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'data.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const showChart = visualizationType !== 'table' && (visualizationType !== 'mixed' || view === 'chart')
  const showTable = visualizationType === 'table' || (visualizationType === 'mixed' && view === 'table')

  return (
    <div className="space-y-4">
      {visualizationType === 'mixed' && (
        <div className="flex gap-2">
          {(['chart', 'table'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-4 py-1.5 rounded text-sm capitalize ${view === v ? 'bg-[var(--gold)] text-[var(--navy)] font-bold' : 'bg-[var(--navy)] text-[var(--text-muted)] border border-[var(--border)]'}`}>
              {v}
            </button>
          ))}
        </div>
      )}

      {showChart && headers.length > 0 && (
        <div className="bg-[var(--navy)] rounded p-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            {visualizationType === 'bar-chart' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey={xAxis} stroke="#888" tick={{ fontSize: 11 }} />
                <YAxis stroke="#888" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a84c', color: '#fff' }} />
                <Bar dataKey={yAxis} fill="#c9a84c" />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey={xAxis} stroke="#888" tick={{ fontSize: 11 }} />
                <YAxis stroke="#888" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a84c', color: '#fff' }} />
                <Line type="monotone" dataKey={yAxis} stroke="#c9a84c" strokeWidth={2} dot={false} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {showTable && (
        <>
          <div className="flex gap-2">
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="bg-[var(--navy)] border border-[var(--border)] text-white text-sm px-3 py-1.5 rounded flex-1 focus:outline-none focus:border-[var(--gold)]" />
            <button onClick={downloadCSV} className="bg-[var(--navy)] border border-[var(--border)] text-[var(--text-muted)] text-sm px-3 py-1.5 rounded hover:text-white whitespace-nowrap">↓ Download CSV</button>
          </div>
          <div className="overflow-x-auto rounded border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {headers.map(h => (
                    <th key={h} onClick={() => toggleSort(h)} className="text-left px-4 py-2 text-[var(--gold)] text-xs uppercase tracking-wide cursor-pointer select-none hover:text-white">
                      {h} {sort?.column === h ? (sort.direction === 'asc' ? '↑' : '↓') : ''}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((row: CSVRow, i: number) => (
                  <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--navy-light)] transition-colors">
                    {headers.map(h => <td key={h} className="px-4 py-2 text-[var(--text-dim)]">{row[h]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/components/tools/dataset-viewer.test.tsx
```

Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add components/tools/dataset-viewer.tsx tests/components/tools/dataset-viewer.test.tsx
git commit -m "feat: add DatasetViewer with table, charts, search, sort, CSV download (TDD)"
```

---

### Task 11: Calculator Registry + Inflation Calculator

**Files:**
- Create: `components/tools/calculators/inflation-calculator.tsx`
- Create: `components/tools/calculators/registry.tsx`
- Create: `tests/components/tools/calculators/inflation-calculator.test.tsx`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/components/tools/calculators/inflation-calculator.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { InflationCalculator, adjustForInflation } from '@/components/tools/calculators/inflation-calculator'

describe('adjustForInflation', () => {
  it('returns an adjusted amount greater than original when adjusting forward in time', () => {
    const result = adjustForInflation(1000, 2020, 2022)
    expect(result).not.toBeNull()
    expect(result as number).toBeGreaterThan(1000)
  })

  it('returns the same amount when fromYear equals toYear', () => {
    expect(adjustForInflation(1000, 2021, 2021)).toBe(1000)
  })

  it('returns null for years outside the CPI data range', () => {
    expect(adjustForInflation(1000, 1800, 2022)).toBeNull()
  })
})

describe('InflationCalculator', () => {
  it('renders amount, from-year, and to-year inputs', () => {
    render(<InflationCalculator />)
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/from year/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/to year/i)).toBeInTheDocument()
  })

  it('shows a result in naira after calculating', () => {
    render(<InflationCalculator />)
    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '1000' } })
    fireEvent.change(screen.getByLabelText(/from year/i), { target: { value: '2020' } })
    fireEvent.change(screen.getByLabelText(/to year/i), { target: { value: '2022' } })
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    expect(screen.getByText(/₦/)).toBeInTheDocument()
  })

  it('shows an error message for invalid year range', () => {
    render(<InflationCalculator />)
    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '500' } })
    fireEvent.change(screen.getByLabelText(/from year/i), { target: { value: '1800' } })
    fireEvent.change(screen.getByLabelText(/to year/i), { target: { value: '2022' } })
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    expect(screen.getByText(/no data/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/tools/calculators/inflation-calculator.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/tools/calculators/inflation-calculator'"

- [ ] **Step 3: Create components/tools/calculators/inflation-calculator.tsx**

```typescript
// components/tools/calculators/inflation-calculator.tsx
'use client'
import { useState } from 'react'

// Nigeria CPI index (2019 = 100 base). Update annually from NBS data.
const CPI: Record<number, number> = {
  2015: 72.0,
  2016: 84.5,
  2017: 95.0,
  2018: 101.7,
  2019: 100.0,
  2020: 113.2,
  2021: 130.0,
  2022: 149.6,
  2023: 174.3,
  2024: 228.0,
}

export function adjustForInflation(amount: number, fromYear: number, toYear: number): number | null {
  const fromCPI = CPI[fromYear]
  const toCPI = CPI[toYear]
  if (!fromCPI || !toCPI) return null
  if (fromYear === toYear) return amount
  return Math.round((amount * (toCPI / fromCPI)) * 100) / 100
}

export function InflationCalculator() {
  const [amount, setAmount] = useState('')
  const [fromYear, setFromYear] = useState('2020')
  const [toYear, setToYear] = useState('2024')
  const [result, setResult] = useState<number | null | undefined>(undefined)

  const years = Object.keys(CPI).map(Number).sort()

  function calculate() {
    const a = parseFloat(amount)
    const from = parseInt(fromYear)
    const to = parseInt(toYear)
    if (isNaN(a) || isNaN(from) || isNaN(to)) return
    setResult(adjustForInflation(a, from, to))
  }

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <label htmlFor="amount" className="block text-[var(--text-muted)] text-xs mb-1">Amount (₦)</label>
        <input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 50000" className="w-full bg-[var(--navy)] border border-[var(--border)] text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[var(--gold)]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="fromYear" className="block text-[var(--text-muted)] text-xs mb-1">From Year</label>
          <select id="fromYear" value={fromYear} onChange={e => setFromYear(e.target.value)} className="w-full bg-[var(--navy)] border border-[var(--border)] text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[var(--gold)]">
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="toYear" className="block text-[var(--text-muted)] text-xs mb-1">To Year</label>
          <select id="toYear" value={toYear} onChange={e => setToYear(e.target.value)} className="w-full bg-[var(--navy)] border border-[var(--border)] text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[var(--gold)]">
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-[var(--gold)] text-[var(--navy)] font-bold py-2 rounded text-sm hover:opacity-90 transition-opacity">
        Calculate
      </button>
      {result === null && <p className="text-red-400 text-sm">No data available for that year range.</p>}
      {result !== null && result !== undefined && (
        <div className="bg-[var(--navy)] border border-[var(--gold-dim)] rounded p-4 text-center">
          <p className="text-[var(--text-muted)] text-xs">₦{parseFloat(amount).toLocaleString()} in {fromYear} is equivalent to</p>
          <p className="text-[var(--gold)] text-2xl font-bold font-serif mt-1">₦{result.toLocaleString()}</p>
          <p className="text-[var(--text-muted)] text-xs">in {toYear}</p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create components/tools/calculators/registry.tsx**

```typescript
// components/tools/calculators/registry.tsx
import type { ComponentType } from 'react'
import { InflationCalculator } from './inflation-calculator'

const registry: Record<string, ComponentType> = {
  'inflation-calculator': InflationCalculator,
}

export function getCalculator(slug: string): ComponentType | null {
  return registry[slug] ?? null
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx vitest run tests/components/tools/calculators/inflation-calculator.test.tsx
```

Expected: PASS (6 tests)

- [ ] **Step 6: Commit**

```bash
git add components/tools/calculators/ tests/components/tools/calculators/
git commit -m "feat: add InflationCalculator, adjustForInflation, and calculator registry (TDD)"
```

---

### Task 12: Research Tools Pages

**Files:**
- Create: `components/tools/tool-card.tsx`
- Create: `app/tools/page.tsx`
- Create: `app/tools/[id]/page.tsx`

- [ ] **Step 1: Create components/tools/tool-card.tsx**

```typescript
// components/tools/tool-card.tsx
import Link from 'next/link'
import type { ResearchTool } from '@/lib/types'

export function ToolCard({ tool }: { tool: ResearchTool }) {
  return (
    <Link href={`/tools/${tool._id}`} className="bg-[var(--navy)] rounded border border-transparent hover:border-[var(--gold-dim)] transition-colors p-5 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <span className="text-[var(--gold)] text-xs capitalize">{tool.type}</span>
        {tool.publishedDate && <span className="text-[var(--text-muted)] text-xs">{tool.publishedDate.slice(0, 4)}</span>}
      </div>
      <h2 className="font-serif text-white text-base font-semibold">{tool.title}</h2>
      {tool.description && <p className="text-[var(--text-dim)] text-sm leading-relaxed line-clamp-2">{tool.description}</p>}
    </Link>
  )
}
```

- [ ] **Step 2: Create app/tools/page.tsx**

```typescript
// app/tools/page.tsx
import { getResearchTools } from '@/sanity/queries'
import { ToolCard } from '@/components/tools/tool-card'

export default async function ToolsPage() {
  const tools = await getResearchTools()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl text-white font-bold mb-2">Research Tools</h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">Interactive calculators and datasets for economic research.</p>
      {tools.length === 0
        ? <p className="text-[var(--text-muted)]">No tools published yet.</p>
        : <div className="grid gap-4 sm:grid-cols-2">{tools.map(t => <ToolCard key={t._id} tool={t} />)}</div>
      }
    </div>
  )
}
```

- [ ] **Step 3: Create app/tools/[id]/page.tsx**

```typescript
// app/tools/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getResearchTool } from '@/sanity/queries'
import { DatasetViewer } from '@/components/tools/dataset-viewer'
import { getCalculator } from '@/components/tools/calculators/registry'

export default async function ToolPage({ params }: { params: { id: string } }) {
  const tool = await getResearchTool(params.id)
  if (!tool) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <span className="text-[var(--gold)] text-xs uppercase tracking-wide">{tool.type}</span>
        <h1 className="font-serif text-2xl text-white font-bold mt-1">{tool.title}</h1>
        {tool.description && <p className="text-[var(--text-dim)] text-sm mt-2 leading-relaxed">{tool.description}</p>}
      </div>

      {tool.type === 'calculator' && (() => {
        const Calculator = getCalculator(tool.componentSlug)
        return Calculator
          ? <Calculator />
          : <p className="text-[var(--text-muted)]">Calculator not found: {tool.componentSlug}</p>
      })()}

      {tool.type === 'dataset' && tool.datasetFileUrl && (
        <DatasetViewer
          csvUrl={tool.datasetFileUrl}
          xAxis={tool.xAxis}
          yAxis={tool.yAxis}
          visualizationType={tool.visualizationType}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/tools/tool-card.tsx app/tools/
git commit -m "feat: add Research Tools listing and individual tool pages"
```

---

### Task 13: Contact Page + API Route

**Files:**
- Create: `components/contact/inquiry-selector.tsx`
- Create: `components/contact/contact-form.tsx`
- Create: `app/contact/page.tsx`
- Create: `app/api/contact/route.ts`
- Create: `tests/components/contact/inquiry-selector.test.tsx`
- Create: `tests/components/contact/contact-form.test.tsx`
- Create: `tests/api/contact.test.ts`

- [ ] **Step 1: Write failing tests for InquirySelector**

```typescript
// tests/components/contact/inquiry-selector.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { InquirySelector } from '@/components/contact/inquiry-selector'

describe('InquirySelector', () => {
  it('renders all four inquiry types', () => {
    render(<InquirySelector value="speaking" onChange={() => {}} />)
    expect(screen.getByText('Speaking Engagement')).toBeInTheDocument()
    expect(screen.getByText('Media Interview')).toBeInTheDocument()
    expect(screen.getByText('Consulting')).toBeInTheDocument()
    expect(screen.getByText('General Inquiry')).toBeInTheDocument()
  })

  it('calls onChange with correct value when a type is clicked', () => {
    const onChange = vi.fn()
    render(<InquirySelector value="speaking" onChange={onChange} />)
    fireEvent.click(screen.getByText('Media Interview'))
    expect(onChange).toHaveBeenCalledWith('media')
  })

  it('marks the selected type with data-selected="true"', () => {
    render(<InquirySelector value="consulting" onChange={() => {}} />)
    const btn = screen.getByText('Consulting').closest('[data-selected]')
    expect(btn).toHaveAttribute('data-selected', 'true')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/contact/inquiry-selector.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/contact/inquiry-selector'"

- [ ] **Step 3: Create components/contact/inquiry-selector.tsx**

```typescript
// components/contact/inquiry-selector.tsx
import type { InquiryType } from '@/lib/types'

const TYPES: { value: InquiryType; label: string; description: string }[] = [
  { value: 'speaking', label: 'Speaking Engagement', description: 'Conferences, panels, public lectures' },
  { value: 'media', label: 'Media Interview', description: 'Press, TV, podcast, radio' },
  { value: 'consulting', label: 'Consulting', description: 'Policy, research, advisory' },
  { value: 'general', label: 'General Inquiry', description: 'Everything else' },
]

export function InquirySelector({ value, onChange }: { value: InquiryType; onChange: (v: InquiryType) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {TYPES.map(t => (
        <button
          key={t.value}
          data-selected={value === t.value}
          onClick={() => onChange(t.value)}
          className={`text-left p-4 rounded border transition-colors ${value === t.value ? 'border-[var(--gold)] bg-[var(--navy)]' : 'border-[var(--border)] bg-[var(--navy)] hover:border-[var(--gold-dim)]'}`}
        >
          <p className={`text-sm font-semibold ${value === t.value ? 'text-[var(--gold)]' : 'text-[var(--text-dim)]'}`}>{t.label}</p>
          <p className="text-[var(--text-muted)] text-xs mt-0.5">{t.description}</p>
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/components/contact/inquiry-selector.test.tsx
```

Expected: PASS (3 tests)

- [ ] **Step 5: Write failing tests for ContactForm**

```typescript
// tests/components/contact/contact-form.test.tsx
import { render, screen } from '@testing-library/react'
import { ContactForm } from '@/components/contact/contact-form'

describe('ContactForm', () => {
  it('always renders name and email fields', () => {
    render(<ContactForm inquiryType="general" />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('renders speaking-specific fields for speaking type', () => {
    render(<ContactForm inquiryType="speaking" />)
    expect(screen.getByLabelText(/organisation/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/event date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/event.*description/i)).toBeInTheDocument()
  })

  it('renders media-specific fields for media type', () => {
    render(<ContactForm inquiryType="media" />)
    expect(screen.getByLabelText(/outlet/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/format/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/topic/i)).toBeInTheDocument()
  })

  it('renders consulting-specific fields for consulting type', () => {
    render(<ContactForm inquiryType="consulting" />)
    expect(screen.getByLabelText(/organisation/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/timeline/i)).toBeInTheDocument()
  })

  it('renders only message field for general type', () => {
    render(<ContactForm inquiryType="general" />)
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/organisation/i)).not.toBeInTheDocument()
  })

  it('renders a submit button', () => {
    render(<ContactForm inquiryType="general" />)
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npx vitest run tests/components/contact/contact-form.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/contact/contact-form'"

- [ ] **Step 7: Create components/contact/contact-form.tsx**

```typescript
// components/contact/contact-form.tsx
'use client'
import { useState } from 'react'
import type { InquiryType } from '@/lib/types'

function Field({ id, label, type = 'text', required = false }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[var(--text-muted)] text-xs mb-1">{label}{required && ' *'}</label>
      {type === 'textarea'
        ? <textarea id={id} name={id} required={required} rows={3} className="w-full bg-[var(--navy-mid)] border border-[var(--border)] text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[var(--gold)] resize-none" />
        : <input id={id} name={id} type={type} required={required} className="w-full bg-[var(--navy-mid)] border border-[var(--border)] text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[var(--gold)]" />
      }
    </div>
  )
}

export function ContactForm({ inquiryType }: { inquiryType: InquiryType }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, inquiryType }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[var(--navy)] border border-[var(--gold-dim)] rounded p-6 text-center">
        <p className="text-[var(--gold)] font-serif text-lg">Message sent.</p>
        <p className="text-[var(--text-muted)] text-sm mt-1">Dr. Morakinyo will respond within 3–5 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="name" label="Full Name" required />
        <Field id="email" label="Email" type="email" required />
      </div>
      {inquiryType === 'speaking' && (
        <>
          <Field id="organisation" label="Organisation" />
          <Field id="eventDate" label="Event Date" type="date" />
          <Field id="locationFormat" label="Location & Format (in-person / virtual)" />
          <Field id="eventDescription" label="Event / Topic Description" type="textarea" />
        </>
      )}
      {inquiryType === 'media' && (
        <>
          <Field id="outlet" label="Outlet / Publication" />
          <Field id="mediaFormat" label="Format (TV / podcast / radio / print)" />
          <Field id="topic" label="Topic" type="textarea" />
        </>
      )}
      {inquiryType === 'consulting' && (
        <>
          <Field id="organisation" label="Organisation" />
          <Field id="projectDescription" label="Project Description" type="textarea" />
          <Field id="timeline" label="Timeline" />
        </>
      )}
      {inquiryType === 'general' && <Field id="message" label="Message" type="textarea" required />}
      <button type="submit" disabled={status === 'sending'} className="bg-[var(--gold)] text-[var(--navy)] font-bold py-2.5 rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-60">
        {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
      </button>
      {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
    </form>
  )
}
```

- [ ] **Step 8: Run tests to verify they pass**

```bash
npx vitest run tests/components/contact/contact-form.test.tsx
```

Expected: PASS (6 tests)

- [ ] **Step 9: Write failing API test**

```typescript
// tests/api/contact.test.ts
import { describe, it, expect, vi } from 'vitest'
import { POST } from '@/app/api/contact/route'

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }) },
  })),
}))

describe('POST /api/contact', () => {
  it('returns 200 for a valid payload', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inquiryType: 'general', name: 'Test User', email: 'test@example.com', message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })

  it('returns 400 when name or email is missing', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inquiryType: 'general', message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Step 10: Run test to verify it fails**

```bash
npx vitest run tests/api/contact.test.ts
```

Expected: FAIL — "Cannot find module '@/app/api/contact/route'"

- [ ] **Step 11: Create app/api/contact/route.ts**

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import type { ContactPayload } from '@/lib/types'

const resend = new Resend(process.env.RESEND_API_KEY)

function formatBody(p: ContactPayload): string {
  const lines = [`Inquiry Type: ${p.inquiryType}`, `Name: ${p.name}`, `Email: ${p.email}`]
  if (p.organisation) lines.push(`Organisation: ${p.organisation}`)
  if (p.eventDate) lines.push(`Event Date: ${p.eventDate}`)
  if (p.locationFormat) lines.push(`Location/Format: ${p.locationFormat}`)
  if (p.eventDescription) lines.push(`Description: ${p.eventDescription}`)
  if (p.outlet) lines.push(`Outlet: ${p.outlet}`)
  if (p.mediaFormat) lines.push(`Media Format: ${p.mediaFormat}`)
  if (p.topic) lines.push(`Topic: ${p.topic}`)
  if (p.projectDescription) lines.push(`Project: ${p.projectDescription}`)
  if (p.timeline) lines.push(`Timeline: ${p.timeline}`)
  if (p.message) lines.push(`Message: ${p.message}`)
  return lines.join('\n')
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload

  if (!payload.name || !payload.email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'website@drakinolamorakinyo.com',
    to: process.env.CONTACT_EMAIL!,
    replyTo: payload.email,
    subject: `[${payload.inquiryType}] New inquiry from ${payload.name}`,
    text: formatBody(payload),
  })

  if (error) return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })

  await resend.emails.send({
    from: 'website@drakinolamorakinyo.com',
    to: payload.email,
    subject: 'Your message to Dr. Akinola Morakinyo',
    text: `Hi ${payload.name},\n\nThank you for reaching out. Dr. Morakinyo will respond within 3–5 business days.\n\nBest regards,\nDr. Akinola E. Morakinyo`,
  })

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 12: Run API tests to verify they pass**

```bash
npx vitest run tests/api/contact.test.ts
```

Expected: PASS (2 tests)

- [ ] **Step 13: Create app/contact/page.tsx**

```typescript
// app/contact/page.tsx
'use client'
import { useState } from 'react'
import { InquirySelector } from '@/components/contact/inquiry-selector'
import { ContactForm } from '@/components/contact/contact-form'
import type { InquiryType } from '@/lib/types'

const LABELS: Record<InquiryType, string> = {
  speaking: 'Speaking Engagement',
  media: 'Media Interview',
  consulting: 'Consulting',
  general: 'General Inquiry',
}

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('speaking')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-2xl text-white font-bold mb-2">Get in Touch</h1>
      <p className="text-[var(--text-muted)] text-sm mb-8">Select the nature of your inquiry. Dr. Morakinyo responds within 3–5 business days.</p>
      <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-6">
        <InquirySelector value={inquiryType} onChange={setInquiryType} />
        <div className="bg-[var(--navy)] rounded border border-[var(--gold-dim)] p-6">
          <h2 className="text-[var(--gold)] text-xs uppercase tracking-widest mb-4 pb-3 border-b border-[var(--gold-dim)]">
            {LABELS[inquiryType]}
          </h2>
          <ContactForm inquiryType={inquiryType} />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 14: Run the full test suite**

```bash
npx vitest run
```

Expected: all tests pass.

- [ ] **Step 15: Commit**

```bash
git add components/contact/ app/contact/ app/api/ tests/components/contact/ tests/api/
git commit -m "feat: add Contact page with InquirySelector, ContactForm, and Resend API route (TDD)"
```

---

### Task 14: Final Verification

- [ ] **Step 1: Run full test suite**

```bash
npx vitest run
```

Expected: all tests pass, no failures.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts at http://localhost:3000, no compilation errors in terminal.

- [ ] **Step 4: Check all 7 routes load without error**

Open in browser and verify each returns a page (not a 500):
- http://localhost:3000
- http://localhost:3000/about
- http://localhost:3000/papers
- http://localhost:3000/articles
- http://localhost:3000/blog
- http://localhost:3000/tools
- http://localhost:3000/contact

- [ ] **Step 5: Update project memory with completion status**

In a new Claude session after this plan is complete, update the `project_dad_economics_site.md` memory file to reflect that implementation is done and the Sanity project ID needs to be configured.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: final verification pass — all tests pass, all routes load"
```
