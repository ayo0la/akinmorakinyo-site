export type Paper = {
  id: string
  title: string
  abstract: string
  publishedDate: string
  journal?: string
  coAuthors: string[]
  tags: string[]
  pdfPath?: string
  googleScholarUrl?: string
  featured?: boolean
}

export type WritingPostMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  tag?: string
  externalUrl?: string
  publication?: string
  draft?: boolean
}

export type WritingPost = WritingPostMeta & { html: string }

export type VisualizationType = 'table' | 'line-chart' | 'bar-chart' | 'mixed'
export type ToolType = 'calculator' | 'dataset'

export type ResearchTool = {
  id: string
  title: string
  description: string
  type: ToolType
  visualizationType: VisualizationType
  componentSlug: string
  datasetPath?: string
  xAxis?: string
  yAxis?: string
  tags: string[]
  publishedDate: string
}

export type Profile = {
  name: string
  photo: string
  bio: string[]
  department: string
  university: string
  email: string
  universityUrl?: string
  linkedinUrl?: string
  googleScholarUrl?: string
  cvPath?: string
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
