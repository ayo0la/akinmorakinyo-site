import type { PortableTextBlock } from '@portabletext/react'

export type SanityImage = {
  asset: { _ref: string; url?: string }
  alt?: string
}

export type SanityFile = {
  asset: { _ref: string; url?: string }
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
  slug: { current: string }
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
  datasetFileUrl?: string
  xAxis?: string
  yAxis?: string
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
