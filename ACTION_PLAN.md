# ACTION PLAN — Portfolio & Blog Rebuild

> Phase 1 deliverable. Written before any code was changed.
> Author: Claude (autonomous refactor session, July 2026).

---

## 1. Audit of the current state

**Stack:** Vite 7 + React 18 SPA, Tailwind 3, framer-motion, three.js (`@react-three/fiber`/`drei`), react-markdown, react-helmet-async. A separate Express server (`/server`) exists solely to proxy the Gemini API for an on-page chatbot.

**What works:**
- Bilingual FR/EN content is real and complete (translations, CV data, two full blog posts in both languages).
- Blog posts already live as Markdown with frontmatter (`src/content/posts/*.{en,fr}.md`), loaded via `import.meta.glob` — a proto-pipeline exists.
- Rich, genuine data files: CV, certifications (with Credly verification links), projects, tech stack.
- Contact form works via Formspree (no backend needed).

**Problems found:**

| # | Problem | Severity |
|---|---------|----------|
| 1 | **No routing.** Articles and the CV open as modal overlays driven by `useState`. No URLs, no deep links, no SEO, back button broken. | Critical |
| 2 | **Fabricated telemetry.** `src/utils/homelab.ts` generates fake "real-time" CPU/uptime/query stats from the wall clock. On a site aimed at recruiters this is an integrity liability. | Critical |
| 3 | **"AI-slop" visual language.** Slate-950 dark theme, cyan/purple gradients, glassmorphism cards, particle background, typing effects, glowing status dots — the exact generic look the redesign must eliminate. | High |
| 4 | **Blog pipeline is half-manual.** Flat files keyed by numeric `id` in frontmatter; images must be placed in `public/Images/` and referenced by absolute path; no folder-per-post; excerpts/tags not supported. | High |
| 5 | **Heavy, purposeless payload.** ~5 MB of `.glb` rack models + three.js for a decorative 3D rack; 5 stray Python scripts (`assemble_custom_rack.py`, etc.) used once to build those models sit in the repo root. | High |
| 6 | **Chatbot requires a second deployment.** The Express/Gemini proxy means the "static" site needs a Node server, an API key, and rate limiting — for a feature recruiters don't need. | Medium |
| 7 | **Gallery is fake.** Six hardcoded "Image Placeholder" tiles; no photos exist in the repo. | Medium |
| 8 | **Monolithic prop drilling.** `t`, `lang`, `setReadingArticle`, `setViewingResume` threaded through every component. | Medium |

## 2. Proposed tech stack & structure

**Astro 5, fully static output. No UI framework. No Tailwind. No backend.**

Why Astro, specifically for this site and for future AI agents:
- **Content collections are the requested blog pipeline, natively.** A folder dropped into `content/blog/` with an `index.*.md` and images becomes a routed, typed, validated page at build time. Frontmatter is schema-checked with Zod (a typo in `date` fails the build instead of silently breaking the UI).
- **Relative image paths in Markdown just work** — Astro resolves, optimizes, and hashes colocated images. No path-mapping code to maintain.
- **File-based routing** gives every article, the CV, and the gallery real URLs in both languages.
- **Zero JS by default.** The only client scripts are the generative sketch, the contact form handler, and small progressive enhancements — each an explicit, findable `<script>`.
- **AI-legibility:** one `.astro` file = markup + scoped style + logic in one place; the content/config/data/presentation split is enforced by the framework rather than by convention.

**New tree:**

```
/
├── content/                      # ALL editable content. No code below this line.
│   ├── blog/
│   │   └── <slug>/               # one folder per post — drop in and it publishes
│   │       ├── index.en.md       # English version (frontmatter: title, date, excerpt, tags)
│   │       ├── index.fr.md       # French version
│   │       └── *.png|jpg         # post images, referenced relatively: ![](./shot.png)
│   └── gallery/
│       └── *.jpg|png             # drop a photo in → it appears on /[lang]/gallery
├── src/
│   ├── content.config.ts         # collection schemas (the pipeline contract)
│   ├── data/                     # structured facts (CV, projects, certs) — data, not copy-in-components
│   ├── i18n/                     # locale list, UI strings, helpers
│   ├── layouts/                  # BaseLayout (head/SEO, header, footer)
│   ├── components/               # .astro components, one concern each
│   ├── pages/
│   │   ├── index.astro           # / → language redirect
│   │   └── [lang]/               # fr + en variants generated from ONE template each
│   │       ├── index.astro       # home: about, projects, homelab, latest writing, contact
│   │       ├── cv.astro          # full CV + PDF download + demoted certifications
│   │       ├── gallery.astro
│   │       └── blog/
│   │           ├── index.astro   # auto-generated listing, sorted by date
│   │           └── [slug].astro  # article page
│   └── styles/                   # tokens.css (design system) + global.css
├── public/                       # CV PDF, favicon, certification images
├── ACTION_PLAN.md                # this file
└── AGENT_HANDOFF.md              # architecture / changelog / rationale (Phase 3)
```

**Removed outright:** React, three.js, framer-motion, Tailwind, react-markdown, helmet; `/server` (Gemini proxy) and the chatbot; all `.glb` models; the five Python model-building scripts; the fake telemetry module.

## 3. Design philosophy — "The Engineer's Journal"

The anti-slop strategy is to commit to a specific, referenced visual tradition instead of a generic one: **print-era technical publishing** — the look of a well-set field notebook or a vintage engineering journal, not a SaaS landing page.

- **Ground:** warm paper (`#f4efe6` family), near-black ink, one accent: **oxide rust** (`#a8431e` family). Dark mode is a lamplight inversion of the same system, not a slate theme.
- **Type:** Fraunces (serif, for display and body — old-style figures, real italics) + IBM Plex Mono for annotations, dates, and figure labels. Self-hosted via Fontsource.
- **Structure:** a ruled page — visible hairline rules, numbered sections (`№ 01 — Selected work`), margin annotations in mono smallcaps, generous whitespace, asymmetric editorial grid. Images get figure numbers and captions.
- **Motion:** almost none. No particles, no typing effects, no tilt cards. Ink-draw underlines on hover; `prefers-reduced-motion` respected everywhere.
- **The 3D rack's replacement:** a lightweight generative "plotter sketch" — a canvas drawing of a slowly self-tracing network topology (nodes + routed traces, like a hand-plotted PCB/graph), ink on paper with one rust node. Pure vanilla canvas, ~2 KB of JS, seeded per visit, static fallback without JS.
- **Honesty as aesthetic:** the homelab section becomes a labeled *architecture inventory* (what runs where, on what hardware) instead of fake live monitoring. Real facts, typeset well.

**UX guarantees (form follows function):**
- CV reachable in one click from a persistent header link on every page, plus a hero-level link — under 3 seconds for a recruiter.
- Semantic HTML, WCAG-AA contrast on paper/ink pairs, keyboard navigable, visible focus states.
- Fully responsive; the editorial grid collapses to a single ruled column on mobile.
- FR/EN toggle preserved (it switches to the same page in the other language).

## 4. Content hierarchy decisions

| Item | Directive | Implementation |
|---|---|---|
| Blog | highlight | Top-level nav, latest-writing block on home, full listing at `/[lang]/blog` |
| CV | highlight | Header link on every page + hero link; `/[lang]/cv` renders full CV + PDF download |
| Gallery | highlight | `/[lang]/gallery`, auto-built from `content/gallery/` |
| About / What I do | highlight | Opening spread of the home page, using existing hero/profile copy |
| 3D rack | **remove** | Deleted; replaced by the generative plotter sketch |
| Certifications | **demote** | Moved off the home page into a collapsed appendix on the CV page (with Credly links intact) |
| Fake monitoring | (found in audit) | Replaced with honest static infrastructure inventory |
| AI chatbot | (not protected by directives) | Removed — it needs a second deployment, and an on-page chatbot is itself an AI-slop marker. Documented in AGENT_HANDOFF.md; trivial to re-add later. |

## 5. Roadmap

1. **Scaffold** Astro 5 project in place; remove dead stack (React/three/Tailwind/server/glb/py).
2. **Design system:** `tokens.css` + `global.css`, fonts, BaseLayout with header/footer/SEO/hreflang.
3. **Blog pipeline:** content collection schema; migrate both posts to `content/blog/<slug>/index.{en,fr}.md`, moving the Pi-hole images into the post folder with relative paths; listing + article templates.
4. **Pages:** home (about → projects → infrastructure → latest writing → contact), CV (+ certifications appendix), gallery (auto from folder), 404.
5. **Interactive element:** the plotter-sketch canvas.
6. **Verify:** `astro build` clean, `astro check` types clean, both locales render, all links resolve, mobile layout checked.
7. **Phase 3 docs:** `AGENT_HANDOFF.md` (architecture, changelog, problem log, design rationale).
8. Commit, push, open draft PR.
