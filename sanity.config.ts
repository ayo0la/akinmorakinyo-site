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
