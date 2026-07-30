# Dr. Akinola E. Morakinyo: Personal Site

This is the personal academic website for Dr. Akinola E. Morakinyo. It is a Next.js site with no CMS: all content lives in plain files in this repo, and you edit those files directly to update the site.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

Before committing changes, run:

```bash
npm run test:run
npm run build
```

`test:run` runs the full test suite once. `build` produces a production build and will fail loudly if a writing post is missing required frontmatter or has an invalid filename, so it is worth running before you push.

## Where content lives

- `content/profile.ts`: name, bio paragraphs, links (LinkedIn, Google Scholar, university profile), and the profile photo path.
- `content/papers.ts`: the list of published papers. Add a new entry to add a paper. Any PDF referenced by a paper should be placed in `public/papers/` and linked from there.
- `content/tools.ts`: the research tools shown on `/tools` (currently the inflation calculator).
- `content/writing/*.md`: one Markdown file per writing post, essay, or outbound column.

## Writing posts

Each file in `content/writing/` is a Markdown file with frontmatter at the top, for example:

```markdown
---
title: On Inflation Expectations
date: 2026-07-01
excerpt: Why anchored expectations matter more than headline numbers.
tag: Essay
---

Body text goes here.
```

Frontmatter fields:

- `title` (required)
- `date` (required, must be in `YYYY-MM-DD` form)
- `excerpt` (required, shown on the writing list)
- `tag` (optional, a short label like "Essay")
- `publication` and `externalUrl` (optional, use both together for a column that was published elsewhere, like Nairametrics, so the site links out instead of rendering the body)
- `draft: true` (optional, hides the post from the site while you are still writing it)

### Filename rule

The filename becomes the post's URL, so filenames must use lowercase letters, numbers, and hyphens only, for example `on-inflation-expectations.md`. No underscores, no capital letters, no spaces. If a file breaks this rule, or is missing a valid `date`, the build will fail with an error naming the exact file, rather than shipping a broken page.

## Themes

The site has a dark theme and a light theme, toggled from the nav. Dark is the default theme.

## Environment variables

The contact form needs two environment variables to send email, set in `.env.local` for local development and in your hosting provider's settings for production:

- `RESEND_API_KEY`: API key for Resend, used to send contact form submissions.
- `CONTACT_EMAIL`: the email address that should receive contact form submissions.
