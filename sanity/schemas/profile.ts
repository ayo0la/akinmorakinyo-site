import { defineField, defineType } from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
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
