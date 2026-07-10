# Publishing a blog post (no code required)

1. Create a folder here. Its name becomes the URL slug:
   `content/blog/my-new-post/` → `kwol.cloud/fr/blog/my-new-post/`
2. Add `index.fr.md` and/or `index.en.md` (a post may exist in one language only).
3. Put the post's images **in the same folder** and reference them relatively:
   `![My caption](./screenshot.png)`
4. Frontmatter (validated at build time — a typo fails the build loudly):

```markdown
---
title: "Post title"
date: 2026-07-10
excerpt: "One or two sentences shown on the listing page."
tags: ["Network", "DNS"]
---
```

That's it. The blog index, sorting (newest first), the home page's "latest
notes", image optimization and the sitemap all update automatically at the
next build. The schema lives in `src/content.config.ts`.
