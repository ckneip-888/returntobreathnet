# returntobreath.net

Companion site to the book *Return to Breath* and the Return App. Built with Astro, deployed to GitHub Pages.

---

## Stack

- **Astro 5** — static site generation
- **Tailwind CSS** — styling (sapphire / slate-950 dark theme)
- **MDX + Markdown** — content
- **Inter + IBM Plex Mono** — typography
- **Lucide** — icons (loaded via CDN)
- **Buttondown** — newsletter
- **GitHub Pages** — hosting (auto-deploy via Actions on `main`)

---

## Quick start

```bash
# install
npm install

# run dev server
npm run dev          # → http://localhost:4321

# production build
npm run build        # → ./dist

# preview production build locally
npm run preview
```

---

## Project structure

```
returntobreath-net/
├── astro.config.mjs            ← i18n routing (en/de), integrations
├── tailwind.config.mjs         ← sapphire palette + typography theme
├── package.json
│
├── public/                     ← static assets served as-is
│   ├── favicon.svg
│   ├── robots.txt
│   └── llms.txt                ← LLM/AI discoverability
│
├── src/
│   ├── content/
│   │   ├── config.ts           ← collection schemas (blog, pages)
│   │   ├── blog/               ← essay markdown — filter by frontmatter `lang`
│   │   │   ├── the-simplicity-problem.md
│   │   │   ├── the-breathline.md
│   │   │   └── ... (8 more)
│   │   └── pages/
│   │       └── en/
│   │           ├── about.md
│   │           └── impressum.md
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro    ← head/meta/JSON-LD/header/footer
│   │   └── BlogPostLayout.astro
│   │
│   ├── components/
│   │   ├── Header.astro        ← fixed nav + language toggle
│   │   ├── Footer.astro
│   │   ├── SapphirePulse.astro ← hero SVG (animated 11s breath cycle)
│   │   ├── PrinciplesBar.astro ← anti-optimization principles
│   │   ├── NewsletterForm.astro ← Buttondown subscribe
│   │   └── ArticleCard.astro
│   │
│   ├── pages/
│   │   ├── index.astro         ← redirect to /en/
│   │   ├── rss.xml.js          ← /rss.xml feed
│   │   ├── en/
│   │   │   ├── index.astro     ← homepage
│   │   │   ├── about.astro
│   │   │   ├── impressum.astro
│   │   │   └── writing/
│   │   │       ├── index.astro       ← archive
│   │   │       └── [slug].astro      ← dynamic post route
│   │   └── de/
│   │       └── index.astro     ← German placeholder (phase 2)
│   │
│   └── styles/
│       └── global.css          ← fonts, animations, custom utilities
│
└── .github/workflows/deploy.yml ← Pages auto-deploy
```

---

## Authoring new essays

Create a new markdown file in `src/content/blog/`:

```markdown
---
title: "Your Title"
description: "One-paragraph summary for cards and meta."
pubDate: 2026-04-12
author: "Christoph Kneip"
tags: ["breath", "nervous-system"]
slug: "your-title-slug"
lang: "en"
draft: false
---

Body text in markdown.
```

Constraints:

- `slug` must be URL-safe and match the filename (without `.md`)
- `lang` must be `"en"` or `"de"`
- `draft: true` excludes the post from production builds, archives, and the RSS feed
- `pubDate` controls sort order — newest first on archive and homepage

---

## Buttondown setup

`src/components/NewsletterForm.astro` posts to `https://buttondown.email/api/emails/embed-subscribe/returntobreath` — confirm that `returntobreath` matches your actual Buttondown username when you register the account. To change it, pass `buttondownUser="your-name"` as a prop.

---

## App store links

Currently placeholders (`href="#"`) in three places:

1. Hero CTAs in `src/pages/en/index.astro`
2. Footer "Elsewhere" column in `src/components/Footer.astro`
3. The Return App mini-block in `src/pages/en/index.astro`

Search the codebase for `aria-disabled="true"` to find all of them.

---

## YouTube link

The explainer card and footer link to the channel `https://www.youtube.com/@returnpulse`. When the explainer video is published, replace with the direct video URL in `src/pages/en/index.astro`.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which:

1. Installs deps
2. Runs `astro build`
3. Uploads `./dist` as a Pages artifact
4. Publishes to GitHub Pages

**One-time GitHub setup**:

1. Repo Settings → Pages → Source: **GitHub Actions**
2. Repo Settings → Pages → Custom domain: `returntobreath.net`
3. At your DNS provider, add a `CNAME` record pointing `returntobreath.net` to `<your-github-username>.github.io`
4. Add a `public/CNAME` file containing `returntobreath.net` (or let GitHub manage it via the Pages settings UI)

---

## i18n

- `astro.config.mjs` declares `en` (default) and `de`
- Routes: `/en/*` and `/de/*` — root `/` redirects to `/en/`
- The header language toggle preserves the current path across languages
- `de` is currently a placeholder homepage. To add a translated essay: copy the EN markdown to `src/content/blog/your-slug-de.md`, change `lang: "de"`, translate, then create `src/pages/de/writing/[slug].astro` mirroring the EN version

---

## SEO and LLM discoverability

- JSON-LD: `WebSite`, `Person` (×2), `MobileApplication`, plus per-page `MedicalWebPage`, `Article`, `Book`, `DefinedTermSet`
- `hreflang` alternates on every page (en/de/x-default)
- `sitemap-index.xml` auto-generated by `@astrojs/sitemap`
- `robots.txt` and `llms.txt` served from `/public`
- Canonical URLs on every page
- Open Graph + Twitter cards

---

## What to do next

1. Run `npm install` then `npm run dev` and review the build
2. Confirm Buttondown username matches `returntobreath`
3. Design and add `/public/og-default.png` (1200×630)
4. Wire real App Store + Google Play URLs when the app launches
5. Wire direct YouTube explainer URL when it's published
6. Begin DE translations of essays (phase 2)
7. Push to GitHub, enable Pages, point DNS

---

© 2026 Christoph Kneip. All writing is original work.
