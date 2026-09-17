# shramadeep.dev

> I build machines that learn.

Machine learning engineer portfolio — AI researcher · data scientist. A single-page
app (plus a `/blogs` news-article blog) built with Next.js, TypeScript, Tailwind
CSS v4, and Framer Motion. Light &amp; dark themes, systems-and-computation visual
language, data-driven content, SEO-optimised articles.

```
stack
├── Next.js (App Router)      // static, SSR-ready
├── TypeScript
├── Tailwind CSS v4            // custom design tokens in app/globals.css
├── Framer Motion              // scroll reveals, accordions, micro-interactions
├── Lucide                     // icons
└── canvas + SVG               // neural-net hero, knowledge graph (no three.js)
```

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build & checks:

```bash
npm run build      # next build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

---

## Project structure

```
app/
├── page.tsx               # single-page portfolio (all sections)
├── globals.css            # design system: tokens, grid, noise, motion
├── layout.tsx             # fonts, metadata, Vercel Analytics
├── blogs/                 # markdown blog: index + date-permalink articles (SSG)
├── notes/                 # legacy routes → redirect to /blogs
└── not-found.tsx

components/
├── Hero · NeuralNetwork · Terminal
├── Stats · About · HowIThink
├── Projects                # expandable case studies, per-project visuals
├── Experiments · Engineering
├── TechStack · KnowledgeGraph
├── Experience · Education · Exploring
├── Notes · OpenSource · Resume · Contact · Footer
├── BlogMarkdown            # markdown renderer (images, code, callouts)
├── ShareLinks · ThemeToggle
├── Nav · CursorGlow        # chrome / micro-interactions
└── ui.tsx                  # Reveal, SectionHeading, Tag, TechPills

data/                       # ← all site content lives here
├── site.ts                 #   name, links, hero, terminal, stats, about
├── content.ts              #   how-I-think, stack, engineering, graph, experience, education
├── projects.ts             #   featured projects + experiments
└── repos.ts                #   GitHub repo cards

lib/
├── blogs.ts                # markdown loader: frontmatter, sorting, image paths
└── seo.ts                  # site URL + JSON-LD (NewsArticle, breadcrumbs)

public/blogs/               # ← blog posts live here, one folder per post
└── <slug>/
    ├── index.md            #   frontmatter + markdown body
    └── image.png           #   images referenced from the md
```

Components are dumb renderers; section content lives in `data/`, blog posts in
markdown. To add a project or change copy, edit the data file — no component
changes needed.

---

## Customize

| Task | File |
| --- | --- |
| Your name / role / tagline | `data/site.ts` |
| Social links, email, resume path | `data/site.ts` → `links` |
| Availability badge & hero terminal | `data/site.ts` |
| Quick stats numbers | `data/site.ts` → `stats` |
| About paragraphs & interests | `data/site.ts` → `about` |
| How-I-think stages | `data/content.ts` → `howIThink` |
| Stack map / knowledge graph | `data/content.ts` → `stack`, `knowledgeGraph` |
| Experience / education | `data/content.ts` → `experience`, `education` |
| Featured projects | `data/projects.ts` → `projects` |
| Experiments (research log) | `data/projects.ts` → `experiments` |
| Blog posts | `public/blogs/<slug>/index.md` (markdown) |
| GitHub repo cards | `data/repos.ts` → `repos` |

### Placeholder convention

Unverified content stays honest with placeholders — `[ADD METRIC]`,
`[ADD GITHUB LINK]`, `[ADD RESPONSIBILITY]`. Replace them as you verify facts.
Repo star counts are only rendered when a real number is set in the data file.

### Resume

Drop your PDF at `public/resume.pdf` (path configured in `data/site.ts` →
`links.resume`). Any public URL works too — a Drive/GCS link or a different
filename.

---

## Writing a blog post

Posts are plain markdown. Create a folder per post under `public/blogs/` and add
an `index.md` — it appears automatically on the home page and at `/blogs`,
sorted by date (newest first). No code changes, no CMS.

Each post gets a news-style date permalink derived from its frontmatter:

```
/blogs/2026/09/18/why-my-loss-curve-did-that
        └── date ───┘ └── slugified title (or frontmatter `slug`)
```

Add a `slug:` field to the frontmatter to override the final URL segment. Old
`/blogs/<folder>` and `/notes/<folder>` links 308-redirect to the permalink.

```
public/blogs/
└── my-new-post/          # folder name = stable internal id, not the URL
    ├── index.md
    └── loss-curve.png
```

**`index.md`:**

````markdown
---
title: "Why my loss curve did that"
date: 2026-09-18
updated: 2026-09-21        # optional — adds an "Updated" date + dateModified
domain: "DEEP LEARNING"        # shown as the accent tag
mins: "7 min read"
excerpt: "One-line summary used on cards and for social previews."
tags: ["training", "debugging"]
---

Opening paragraph in plain markdown.

## A heading

Regular **bold**, _italic_, `inline code`, [links](https://example.com).

- bullet points
- more bullets

1. numbered lists work too

> Blockquotes render as accent callout panels.

```text
fenced code blocks render in the mono code style
```

![Alt text describing the figure](./loss-curve.png)
````

**Images** live next to the markdown and are referenced relatively
(`./loss-curve.png` or `loss-curve.png`). Raster images are automatically sized
and served through `next/image`; SVGs render directly. Absolute URLs
(`https://…`) work as well.

The blog engine is `lib/blogs.ts` — it parses frontmatter with `gray-matter` and
renders with `react-markdown` + `remark-gfm` (tables, task lists, strikethrough).
Old `/notes/...` URLs 308-redirect to the new permalinks.

Each post renders as a news-style article: breadcrumbs, author byline, published
date, reading time, an auto-generated table of contents (when a post has 3+
`##`/`###` headings), linked heading anchors, captioned figures, tags, a share
row, and previous/next navigation.

### SEO

Everything needed for search engines and social previews is wired up:

| Feature | Where |
| --- | --- |
| Canonical + Open Graph + Twitter metadata | `app/blogs/[year]/[month]/[day]/[slug]/page.tsx`, `app/layout.tsx` |
| `NewsArticle` structured data | `lib/seo.ts` → `articleJsonLd` |
| `BreadcrumbList` structured data | `lib/seo.ts` → `breadcrumbJsonLd` |
| Per-post social card (1200×630) | `app/blogs/[year]/[month]/[day]/[slug]/opengraph-image.tsx` |
| XML sitemap | `app/sitemap.ts` → `/sitemap.xml` |
| robots.txt | `app/robots.ts` → `/robots.txt` |
| RSS feed | `app/blogs/rss.xml/route.ts` → `/blogs/rss.xml` |

Set your canonical origin so absolute URLs (canonical, OG images, RSS, sitemap)
are correct in production:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Locally it falls back to `http://localhost:3000`.

Preview while writing:

```bash
npm run dev     # http://localhost:3000/blogs
```

---

## Theming

The site ships with **light and dark** modes via a toggle in the nav and the blog
header. The choice is saved to `localStorage` and, on first visit, follows the
OS `prefers-color-scheme`. An inline script in `app/layout.tsx` applies the theme
before first paint, so there is no flash.

Themes are CSS variables. Dark is the default in `@theme`; light overrides live
in `html[data-theme="light"]` in `app/globals.css`. To retune a theme, edit those
tokens — every component reads them, so no component changes are needed. The
`light:` Tailwind variant (e.g. `light:hidden`) is available for one-off cases.

---

## Deploy

Works out of the box on **Vercel** — framework auto-detected. Add
`NEXT_PUBLIC_SITE_URL` (your production origin) in the project's environment
variables so canonical/OG/RSS URLs are absolute.

```bash
git init && git add -A && git commit -m "init: ML/AI portfolio"
git remote add origin <repo-url>
git push -u origin main
```

Import the repo at vercel.com → Deploy. `git push` auto-redeploys.

No CLI needed:

```bash
npm i -g vercel && vercel --prod
```

---

## Design notes

- Palette: dark by default (`#0a0a0a` ink, off-white type) with a matching light
  theme (`#f6f7f9` ink, near-black type); a single restrained accent
  (`#6e9bff` blue → `#9d86ff` violet) used sparingly.
- Typography: Space Grotesk (display) · Inter (body) · JetBrains Mono (metadata).
- Motifs — graphs, waveforms, matrices, terminal output — repeat subtly across
  sections. No stock photos, no glassmorphism, no particle spam.
- Motion honours `prefers-reduced-motion`; the hero graph falls back to a static
  frame and halts when off-screen.
- Lighthouse-minded: static prerendering, canvas/SVG instead of animation
  libraries, lazy section reveal, no image payloads.

```
// learning · experimenting · building · measuring · shipping
```

© 2026 — built with React / Next.js