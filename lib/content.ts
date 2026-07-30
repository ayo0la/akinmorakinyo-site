import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { profile } from '@/content/profile'
import { papers } from '@/content/papers'
import { tools } from '@/content/tools'
import type { Paper, Profile, ResearchTool, WritingPost, WritingPostMeta } from '@/lib/types'

export function getProfile(): Profile {
  return profile
}

export function getPapers(): Paper[] {
  return [...papers].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
}

export function getFeaturedPaper(): Paper | null {
  return getPapers().find(p => p.featured) ?? null
}

export function getTools(): ResearchTool[] {
  return [...tools].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
}

export function getTool(id: string): ResearchTool | null {
  return tools.find(t => t.id === id) ?? null
}

const WRITING_DIR = path.join(process.cwd(), 'content', 'writing')

function frontmatterDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value ?? '')
}

function readPostFile(filePath: string): { meta: WritingPostMeta; body: string } {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fileName = path.basename(filePath)
  const slug = fileName.replace(/\.md$/, '')

  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(
      `Invalid post filename "${fileName}": post filenames must use lowercase letters, numbers, and hyphens only.`
    )
  }

  const date = frontmatterDate(data.date)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(
      `Invalid post "${fileName}": a date in YYYY-MM-DD form is required.`
    )
  }

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date,
      excerpt: data.excerpt ?? '',
      tag: data.tag,
      externalUrl: data.externalUrl,
      publication: data.publication,
      draft: data.draft === true,
    },
    body: content,
  }
}

export function getPosts(dir: string = WRITING_DIR): WritingPostMeta[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => readPostFile(path.join(dir, f)).meta)
    .filter(m => !m.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string, dir: string = WRITING_DIR): WritingPost | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  const filePath = path.join(dir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { meta, body } = readPostFile(filePath)
  if (meta.draft || meta.externalUrl) return null
  return { ...meta, html: marked.parse(body) as string }
}
