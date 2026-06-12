# returntobreath.net

Companion site to the book *Return to Breath* and the Return App. Built with Astro 5 + Tailwind 4, deployed to GitHub Pages at [returntobreath.net](https://returntobreath.net).

---

## Current status (June 2026)

The site is **live but pre-launch** — fully functional and viewable via direct URL, but intentionally hidden from search engines and AI crawlers via `noindex` meta tags and a `Disallow: /` `robots.txt`. This will be reversed when the Return App launches.

---

## Stack

- **Astro 5.18** (pinned) — static site generation
- **Tailwind 4** via `@tailwindcss/vite` — styling (no `@astrojs/tailwind`)
- **MDX + Markdown** — content
- **Inter + IBM Plex Mono** — typography
- **Lucide** — icons (CDN)
- **Buttondown** — newsletter (`returntobreath` username — confirm at buttondown.email)
- **GitHub Pages** — hosting, auto-deploy via Actions on push to `main`

---

## Quick start

```bash
npm install
npm run dev      # → http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview production build locally
```

---

## Project structure

```
src/
├── content/
│   ├── content.config.ts        ← Astro v6 glob-loader schema (blog only)
│   └── blog/                    ← 10 launch essays (.md)
├── components/
│   ├── Header.astro             ← fixed nav, EN/DE toggle
│   ├── Footer.astro
│   ├── SapphirePulse.astro      ← 3D icosahedron + breathing dot (JS rotation, SVG animate)
│   ├── PrinciplesBar.astro      ← 3-item anti-optimization bar
│   ├── NewsletterForm.astro     ← Buttondown embed
│   └── ArticleCard.astro        ← blog post card with optional pin indicator
├── layouts/
│   ├── BaseLayout.astro         ← head/meta/JSON-LD/header/footer
│   └── BlogPostLayout.astro
├── pages/
│   ├── index.astro              ← homepage (EN, at root /)
│   ├── about.astro
│   ├── impressum.astro
│   ├── rss.xml.js
│   ├── writing/
│   │   ├── index.astro          ← essay archive
│   │   └── [slug].astro         ← dynamic post route
│   ├── de/
│   │   └── index.astro          ← German placeholder
│   └── en/                      ← 301 redirects only (old /en/ paths → root)
│       ├── index.astro
│       ├── about.astro
│       ├── impressum.astro
│       └── writing/
│           ├── index.astro
│           └── [slug].astro
└── styles/
    └── global.css               ← Tailwind 4 @theme, animations, custom utilities
public/
├── CNAME                        ← returntobreath.net
├── robots.txt                   ← Disallow: / (pre-launch)
├── llms.txt                     ← pre-launch notice for LLMs
└── favicon.svg
```

---

## Authoring essays

Add a new file to `src/content/blog/`:

```markdown
---
title: "Your Title"
description: "Summary for cards and meta."
pubDate: 2026-05-01
author: "Christoph Kneip"
tags: ["breath", "nervous-system"]
lang: "en"
draft: false
---

Body text in markdown.
```

`draft: true` excludes from build, archive, and RSS. `lang` must be `"en"` or `"de"`.

**Pinning posts**: to pin a post to the top of the homepage and archive, open `src/pages/index.astro` and `src/pages/writing/index.astro` and add its filename (without `.md`) to the `PINNED_SLUGS` array:

```js
const PINNED_SLUGS = ['the-simplicity-problem', 'another-slug'];
```

---

## ✅ Done

- Astro 5 + Tailwind 4 project scaffolded and deploying via GitHub Actions
- Homepage: hero with 3D icosahedron pulse mark, 3-column layout (anchor / stream / matrix)
- 10 launch essays written, Astro-ready, published at `/writing/[slug]/`
- About and Impressum pages
- EN routes at root (`/`, `/about/`, `/writing/`), 301 redirects from old `/en/` paths
- DE placeholder at `/de/` (German homepage stub)
- `noindex` meta + `robots.txt` blocking crawlers (pre-launch)
- `llms.txt` pre-launch notice
- Newsletter form (Buttondown)
- RSS feed at `/rss.xml`
- Pinned post ("The Simplicity Problem") with pin icon indicator
- Introduction video slot in left column (awaiting YouTube video ID)
- Bold micro-label typography for all sapphire headings

---

## 🔲 Still to do before public launch

### Required before flipping noindex

- [ ] **App Store URL** — swap `href="#"` placeholders in hero CTAs, footer, and left-column app block. Search codebase for `aria-disabled="true"` to find all three.
- [ ] **Google Play URL** — same as above.
- [ ] **Introduction video ID** — in `src/pages/index.astro`, left column, `01 · INTRODUCTION` block: replace `VIDEO_ID` in the iframe `src` with your YouTube video ID (e.g. `dQw4w9WgXcQ`).
- [ ] **Explainer video direct link** — in `02 · THE EXPLAINER` card, the link currently points to the channel (`@returnpulse`). Replace with the direct video URL once the 90-second explainer is published.
- [ ] **Buttondown username** — confirm the Buttondown account is registered as `returntobreath`. If different, update `buttondownUser` prop in `src/components/NewsletterForm.astro`.
- [ ] **OG image** — create a 1200×630px image, save as `public/og-default.png`. Currently commented out in `BaseLayout.astro`.
- [ ] **Flip noindex** — when ready to launch:
  1. `src/layouts/BaseLayout.astro`: change `noindex, nofollow...` → `index, follow, max-image-preview:large`; remove `googlebot` and `bingbot` lines
  2. `public/robots.txt`: replace contents with `User-agent: *\nAllow: /\nSitemap: https://returntobreath.net/sitemap-index.xml`
  3. `public/llms.txt`: restore the full discoverability version

### Phase 2 (post-launch)

- [ ] **German translations** — translate the 10 essays and add `lang: "de"` variants to `src/content/blog/`. Add `src/pages/de/writing/` route. Make the EN/DE toggle in the header page-aware (currently always points to `/de/` home).
- [ ] **DE About + Impressum** — translate and add `src/pages/de/about.astro` and `src/pages/de/impressum.astro`.
- [ ] **Analytics** — add privacy-respecting analytics (e.g. Fathom or Plausible) once the site goes public.
- [ ] **Community** — if a community is added in future, add a fourth card to `src/components/PrinciplesBar.astro` and link from the footer.
- [ ] **Additional essays** — add to `src/content/blog/`. To pin a new one, update `PINNED_SLUGS` in `index.astro` and `writing/index.astro`.

---

## Deployment

Push to `main` → GitHub Action builds + deploys automatically (~2 min).

**One-time setup** (already done): Settings → Pages → Source: GitHub Actions. Custom domain: `returntobreath.net`. DNS A records pointing to `185.199.108-111.153`.

---

## Key decisions / tech notes

- `@astrojs/tailwind` was removed (deprecated, Tailwind v4 incompatible). Using `@tailwindcss/vite` instead.
- EN routes serve from root (`/`), not `/en/`. Old `/en/` paths 301-redirect.
- `prefixDefaultLocale: false` in `astro.config.mjs`.
- The pulsing dot in `SapphirePulse.astro` uses SVG `<animate>` (not CSS transforms) so it stays centered while the JS-driven icosahedron rotates around it.
- Pinning is hardcoded via `PINNED_SLUGS` array in page files — no frontmatter field needed.

---

© 2026 Christoph Kneip. All writing is original work.
