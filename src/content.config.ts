import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    // Keep language folders in the id so EN/DE files with the same slug stay distinct.
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Christoph Kneip'),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'de']).default('en'),
    draft: z.boolean().default(false),
    pinned: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
