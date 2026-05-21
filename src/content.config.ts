import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Christoph Kneip'),
    tags: z.array(z.string()).default([]),
    // NOTE: `slug` is intentionally NOT in the schema in Astro 6 — it is reserved.
    // The `slug:` field still exists in markdown frontmatter for reference but is unused.
    // Routing uses `post.id` (derived from filename) instead.
    lang: z.enum(['en', 'de']).default('en'),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lang: z.enum(['en', 'de']).default('en'),
  }),
});

export const collections = { blog, pages };
