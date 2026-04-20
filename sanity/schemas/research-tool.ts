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
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'date', validation: r => r.required() }),
  ],
})
