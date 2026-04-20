import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article / Column',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'publication', title: 'Publication', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'publicationLogo',
      title: 'Publication Logo',
      type: 'image',
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({ name: 'externalUrl', title: 'External URL', type: 'url', validation: r => r.required() }),
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Date, Newest', name: 'dateDesc', by: [{ field: 'publishedDate', direction: 'desc' }] }],
})
