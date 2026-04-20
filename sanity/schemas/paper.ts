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
