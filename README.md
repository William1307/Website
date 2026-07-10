# kwol.cloud — portfolio & blog

Personal site of Kristofer Fauvette: projects, blog (FR/EN), photo gallery and CV.

Static [Astro](https://astro.build) site — no backend, no trackers. The visual
language is an editorial "engineer's journal": paper, ink, one rust accent,
Fraunces + IBM Plex Mono.

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

**Publish a blog post without touching code:** drop a folder into
`content/blog/` — see [content/blog/README.md](content/blog/README.md).
**Publish photos:** drop images into `content/gallery/`.

Architecture, changelog and design rationale: [AGENT_HANDOFF.md](AGENT_HANDOFF.md).
