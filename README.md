# shramadeep.dev

> I build machines that learn.

Machine learning engineer portfolio — AI researcher · data scientist. A single-page
app (plus `/notes`) built with Next.js, TypeScript, Tailwind CSS v4, and Framer
Motion. Dark-first, systems-and-computation visual language, data-driven content.

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
├── layout.tsx             # fonts, metadata
├── notes/                 # lab notes index + detail pages (SSG)
└── not-found.tsx

components/
├── Hero · NeuralNetwork · Terminal
├── Stats · About · HowIThink
├── Projects                # expandable case studies, per-project visuals
├── Experiments · Engineering
├── TechStack · KnowledgeGraph
├── Experience · Education · Exploring
├── Notes · OpenSource · Resume · Contact · Footer
├── Nav · CursorGlow        # chrome / micro-interactions
└── ui.tsx                  # Reveal, SectionHeading, Tag, TechPills

data/                       # ← all content lives here
├── site.ts                 #   name, links, hero, terminal, stats, about
├── content.ts              #   how-I-think, stack, engineering, graph, experience, education
├── projects.ts            #   featured projects + experiments
└── notes.ts               #   lab notes + GitHub repos
```

Components are dumb renderers; every piece of content lives in `data/`. To add a
project or change copy, edit the data file — no component changes needed.

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
| Lab notes + article content | `data/notes.ts` → `notes` |
| GitHub repo cards | `data/notes.ts` → `repos` |

### Placeholder convention

Unverified content stays honest with placeholders — `[ADD METRIC]`,
`[ADD GITHUB LINK]`, `[ADD RESPONSIBILITY]`. Replace them as you verify facts.
Repo star counts are only rendered when a real number is set in the data file.

### Resume

Drop your PDF at `public/resume.pdf` (path configured in `data/site.ts` →
`links.resume`). Any public URL works too — a Drive/GCS link or a different
filename.

---

## Deploy

Works out of the box on **Vercel** — framework auto-detected, no env vars.

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

- Palette: `#0a0a0a` ink, off-white type, single restrained accent
  (`#6e9bff` blue → `#9d86ff` violet), used sparingly.
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