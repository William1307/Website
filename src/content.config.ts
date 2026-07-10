// THE BLOG PIPELINE CONTRACT.
//
// Publishing a post requires ZERO code changes:
//   1. Create a folder:  content/blog/<slug>/          (the folder name IS the URL slug)
//   2. Drop in:          index.en.md and/or index.fr.md
//   3. Reference images relatively inside the markdown: ![caption](./photo.png)
//      (images live in the same folder; Astro optimizes + fingerprints them at build)
//
// The frontmatter below is validated at build time — a malformed post FAILS THE
// BUILD with a readable error instead of silently rendering wrong. That is the
// zero-maintenance guarantee: the schema is the only documentation a post needs.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Matches content/blog/<slug>/index.<lang>.md — entry id becomes "<slug>/index.<lang>".
  // Language and slug are derived from that id by src/i18n/posts.ts, never hardcoded.
  loader: glob({
    pattern: '*/index.*.md',
    base: './content/blog',
    // Keep the literal "slug/index.lang" id (the default generateId slugifies
    // "index.en.md" into "indexen", which would break language detection).
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),          // "2025-12-08" in frontmatter
    excerpt: z.string(),            // one or two sentences, shown on listing pages
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
