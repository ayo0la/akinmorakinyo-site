# Dr. Akinola Morakinyo — Personal Website Design Spec

**Date:** 2026-04-20
**Project:** dad-economics-site
**Stack:** Next.js + Sanity CMS, deployed to Vercel
**Domain:** drakinolamorakinyo.vercel.app (or similar)

---

## Overview

A personal academic website for Dr. Akinola Ezekiel Morakinyo, PhD in Economics. The site surfaces his research, writing, and interactive economic tools for a general public and media audience, while remaining credible to academic peers. Ayo maintains content via Sanity Studio; Dr. Morakinyo takes over when ready.

---

## Visual Style

- **Direction:** Classic Academic
- **Colors:** Dark navy (`#1a1a2e`) background, gold (`#c9a84c`) accent, off-white text
- **Typography:** Georgia serif for names and headings, system sans-serif for body
- **Tone:** Authoritative but approachable. No vanity titles or credential labels — the work speaks for itself.

---

## Site Architecture

7 pages:

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Hero, recent work feed, research tools preview |
| `/about` | About | Full bio, CV download, external profile links |
| `/papers` | Academic Papers | Published research with abstracts and PDFs |
| `/articles` | Articles & Columns | External pieces (Nairametrics + other publications) |
| `/blog` | Blog | Original posts hosted on-site |
| `/tools` | Research Tools | Interactive calculators and datasets |
| `/contact` | Contact & Booking | Structured inquiry form by type |

---

## Navigation

- Desktop: horizontal nav with name as logo on the left, links on the right. "Contact" styled as a gold outlined button CTA.
- Mobile: hamburger menu. Name remains visible in the header at all times.
- Name displayed as: **Dr. Akinola Morakinyo** (nav) / **Dr. Akinola E. Morakinyo** (hero)
- No title labels ("Professor of", "PhD") anywhere in the nav or hero.

---

## Homepage

Two-column layout on desktop. Single-column stacked on mobile.

**Left column (desktop) / Top section (mobile):**
- Circular photo with gold border
- Name: Dr. Akinola E. Morakinyo
- Department: Dept. of Economics, Finance & Quantitative Analysis, Kennesaw State University, GA, USA (muted, small text)
- One-line statement of purpose (written by Dr. Morakinyo)
- Two CTAs: "View Papers" (gold filled) and "Read Blog" (gold outlined)
- External links: LinkedIn, Google Scholar, University faculty page

**Right column (desktop) / Below hero (mobile):**
- Recent Work feed: pulls the latest `featured` item from Papers, Articles, and Blog. Each entry shows content type label, title, and date.
- Research Tools strip: two featured tools + "View All" link. Stacks vertically on mobile.

---

## Content Model (Sanity Schemas)

### Paper
- `title` (string)
- `abstract` (text)
- `pdfUrl` (url)
- `publishedDate` (date)
- `journal` (string)
- `coAuthors` (array of strings)
- `tags` (array of strings)
- `googleScholarUrl` (url)
- `featured` (boolean) — controls homepage visibility

### Article
- `title` (string)
- `publication` (string) — e.g. "Nairametrics"
- `publicationLogo` (image)
- `externalUrl` (url)
- `publishedDate` (date)
- `excerpt` (text)
- `tags` (array of strings)
- `featured` (boolean)

### Blog Post
- `title` (string)
- `slug` (slug)
- `body` (rich text / Portable Text)
- `publishedDate` (date)
- `coverImage` (image)
- `excerpt` (text)
- `tags` (array of strings)
- `featured` (boolean)

### Research Tool
- `title` (string)
- `description` (text)
- `type` (enum: `calculator` | `dataset`)
- `visualizationType` (enum: `table` | `line-chart` | `bar-chart` | `mixed`)
- `componentSlug` (string) — for calculators: maps to a registered React component
- `datasetFile` (file asset) — for datasets: CSV or JSON uploaded to Sanity
- `xAxis` (string) — CSV column name to use as x-axis
- `yAxis` (string) — CSV column name to use as y-axis
- `previewImage` (image)
- `tags` (array of strings)
- `publishedDate` (date)

### Profile (singleton)
- `name` (string)
- `photo` (image)
- `bio` (rich text)
- `department` (string)
- `university` (string)
- `cvFile` (file asset)
- `universityUrl` (url)
- `linkedinUrl` (url)
- `googleScholarUrl` (url)
- `email` (string)
- `statementOfPurpose` (string) — one-line, shown on homepage

---

## Research Tools

Two tool types, same upload workflow:

### Calculators
Built as individual React components. Each component is registered by a `componentSlug` string. To add a new calculator: write the React component, register its slug, create a Sanity entry pointing to that slug. No CMS editing of logic — Sanity holds metadata only.

Examples: inflation calculator (input amount + year range, output adjusted value), GDP comparator.

### Datasets
CSV or JSON uploaded as a file asset in Sanity. Parsed client-side. Rendered according to `visualizationType`:

- `table` — sortable, filterable table with CSV download button
- `line-chart` / `bar-chart` — rendered with Recharts, filterable by date range, hover tooltips, CSV download
- `mixed` — tab toggle between chart and table views; best for multi-dimensional data

`xAxis` and `yAxis` fields in Sanity map which CSV columns to plot. No code changes needed to add new datasets.

---

## Articles & Columns Page

Displays external pieces that link out to their original source. Dr. Morakinyo is an unofficial columnist for Nairametrics — this is the primary source for this page. Other publications go here too.

Each entry shows:
- Publication logo (uploaded to Sanity)
- Article title (links to external URL)
- Publication name
- Date
- Short excerpt

Filtered/sorted by date descending. No pagination needed initially — a "Load more" pattern if volume grows.

---

## Contact & Booking

Four inquiry types, selectable as cards. Clicking a type highlights it in gold and adapts the form fields below.

| Type | Extra fields |
|---|---|
| Speaking Engagement | Organisation, Event Date, Location & Format (in-person/virtual), Event/Topic Description |
| Media Interview | Outlet/Publication, Format (TV/podcast/radio/print), Topic |
| Consulting | Organisation, Project Description, Timeline |
| General Inquiry | Message only |

All types share: Full Name, Email.

Submissions sent to Dr. Morakinyo's email via Resend. No backend or database needed. A confirmation email is sent to the submitter on success.

**Mobile:** Inquiry type cards stack above the form. Form fields are full-width.

---

## Responsive Behavior

All pages designed for both desktop (1200px+) and mobile (375px). Key breakpoint behaviors:

- **Navigation:** horizontal links collapse to hamburger menu on mobile
- **Homepage:** two-column layout collapses to single column; Recent Work shows 2 items on mobile (3 on desktop)
- **Research Tools strip:** horizontal row on desktop, vertical list on mobile
- **Contact:** side-by-side type selector + form on desktop; stacked (selector above form) on mobile
- **Papers/Articles/Blog listings:** grid on desktop, single column on mobile

---

## Content Management Workflow

Ayo manages all content updates via Sanity Studio. Dr. Morakinyo takes over when ready.

- Publishing a new paper: fill in Paper schema fields, upload PDF, set `featured` if it should appear on homepage, hit Publish
- Publishing a Nairametrics column: fill in Article schema, paste external URL, upload Nairametrics logo once (reuse after), hit Publish
- Publishing a blog post: write in Sanity's rich text editor, upload cover image, hit Publish
- Adding a dataset tool: upload CSV, fill in title + description + axis fields, pick visualizationType, hit Publish
- Adding a calculator: Ayo writes the React component first, then creates the Sanity entry

Vercel rebuilds automatically on every Publish.

---

## External Integrations

- **Sanity CMS** — content management
- **Vercel** — deployment and hosting
- **Resend** — contact form email delivery
- **Google Scholar** — linked from About page and Papers page (manual links, no API)
- **LinkedIn** — linked from About and homepage
- **Nairametrics** — linked per article (no API, manual entry)
