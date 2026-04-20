import { client } from './client'
import type {
  Profile,
  Paper,
  Article,
  BlogPost,
  ResearchTool,
} from '@/lib/types'

const IMAGE_FIELDS = `{ "url": asset->url, alt }`
const FILE_URL = `asset->url`

export async function getProfile(): Promise<Profile | null> {
  const query = `*[_type == "profile"][0] {
    name,
    photo ${IMAGE_FIELDS},
    bio,
    department,
    university,
    "cvFileUrl": cvFile.${FILE_URL},
    universityUrl,
    linkedinUrl,
    googleScholarUrl,
    email,
    statementOfPurpose
  }`
  return client.fetch(query)
}

export async function getPapers(): Promise<Paper[]> {
  const query = `*[_type == "paper"] | order(publishedDate desc) {
    _id,
    title,
    abstract,
    "pdfUrl": pdfFile.${FILE_URL},
    publishedDate,
    journal,
    coAuthors,
    tags,
    googleScholarUrl,
    featured
  }`
  return client.fetch(query)
}

export async function getFeaturedPaper(): Promise<Paper | null> {
  const query = `*[_type == "paper" && featured == true] | order(publishedDate desc) [0] {
    _id,
    title,
    publishedDate
  }`
  return client.fetch(query)
}

export async function getArticles(): Promise<Article[]> {
  const query = `*[_type == "article"] | order(publishedDate desc) {
    _id,
    title,
    publication,
    publicationLogo ${IMAGE_FIELDS},
    externalUrl,
    publishedDate,
    excerpt,
    tags,
    featured
  }`
  return client.fetch(query)
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const query = `*[_type == "article" && featured == true] | order(publishedDate desc) [0] {
    _id,
    title,
    publication,
    externalUrl,
    publishedDate
  }`
  return client.fetch(query)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedDate desc) {
    _id,
    title,
    "slug": slug.current,
    publishedDate,
    coverImage ${IMAGE_FIELDS},
    excerpt,
    tags,
    featured
  }`
  return client.fetch(query)
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    body,
    publishedDate,
    coverImage ${IMAGE_FIELDS},
    excerpt,
    tags,
    featured
  }`
  return client.fetch(query, { slug })
}

export async function getFeaturedBlogPost(): Promise<BlogPost | null> {
  const query = `*[_type == "blogPost" && featured == true] | order(publishedDate desc) [0] {
    _id,
    title,
    "slug": slug.current,
    publishedDate
  }`
  return client.fetch(query)
}

export async function getResearchTools(): Promise<ResearchTool[]> {
  const query = `*[_type == "researchTool"] | order(publishedDate desc) {
    _id,
    title,
    description,
    type,
    visualizationType,
    componentSlug,
    "datasetFileUrl": datasetFile.${FILE_URL},
    xAxis,
    yAxis,
    previewImage ${IMAGE_FIELDS},
    tags,
    publishedDate
  }`
  return client.fetch(query)
}

export async function getResearchTool(id: string): Promise<ResearchTool | null> {
  const query = `*[_type == "researchTool" && _id == $id][0] {
    _id,
    title,
    description,
    type,
    visualizationType,
    componentSlug,
    "datasetFileUrl": datasetFile.${FILE_URL},
    xAxis,
    yAxis,
    previewImage ${IMAGE_FIELDS},
    tags,
    publishedDate
  }`
  return client.fetch(query, { id })
}
