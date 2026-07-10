# AGENT_HANDOFF.md

Read this before changing anything. It explains how the site is built, what was
changed from the original codebase and why, and which decisions are deliberate
so they don't get "fixed" back into generic defaults.
Companion document: `ACTION_PLAN.md` (the pre-rebuild audit and plan).

---

## 1. Architecture overview

**Stack:** Astro 5, fully static output (`dist/`), zero backend, TypeScript
strict. No UI framework, no Tailwind — hand-written CSS on design tokens.
Deploy = serve `dist/` from any static host (`npm run build`).

**Mental model:** three layers, strictly separated.

| Layer | Location | Rule |
|---|---|---|
| Content | `content/` | Markdown + images. Publishing requires **zero code**. |
| Data | `src/data/` | Structured facts (CV, projects, certs, machines). Bilingual fields are `{ fr, en }` objects. |
| Presentation | `src/{layouts,components,pages,styles}` | Never contains copy, post metadata, or image paths. |

**Routing:** every page exists per locale under `/fr/…` and `/en/…`
(`src/pages/[lang]/`, static paths from `src/i18n/locales.ts`). The root `/`
redirects by browser language (JS) with a meta-refresh fallback to `/fr/`.
The FR/EN toggle in the masthead swaps the locale prefix of the current URL;
article pages override `altPath` when a translation is missing.

**The blog pipeline** (the core feature — see `content/blog/README.md`):
- `content/blog/<slug>/index.{en,fr}.md` + colocated images.
- Schema validated at build time in `src/content.config.ts` (title, date,
  excerpt, tags). A malformed post fails the build loudly.
- `glob` loader uses a custom `generateId` to preserve `"<slug>/index.<lang>"`
  ids; `src/i18n/posts.ts` is the only code that parses them.
- Listing pages, home-page "latest notes", sorting, image optimization and the
  sitemap all derive from the collection. Nothing is hardcoded anywhere.

**The gallery pipeline:** drop images into `content/gallery/` →
`src/pages/[lang]/gallery.astro` globs them, derives captions from filenames,
numbers them as "plates". Empty folder → honest empty state (currently empty:
the repo has never contained real gallery photos).

**i18n:** locales in `src/i18n/locales.ts`, all UI copy in `src/i18n/ui.ts`.
Components take `lang` and read `t = UI[lang]`. No prop-drilled translation
objects, no client-side language state.

**Interactive element:** `src/components/PlotterSketch.astro` — a vanilla-canvas
generative "plotter drawing" of a network topology (~2 KB, self-terminating
animation, `prefers-reduced-motion` respected, redraws on theme change).

## 2. Changelog vs. the original codebase

**Removed**
- React, Vite-SPA setup, Tailwind, framer-motion, react-markdown, helmet,
  lucide-react — replaced by Astro + scoped CSS.
- three.js / @react-three/* and **all `.glb` models (~5 MB)**: the 3D rack is
  gone per the brief, replaced by the plotter sketch.
- The five Python scripts in the repo root (one-off GLB assembly tools).
- **The Express server and the Gemini chatbot** (`/server`, `Assistant.tsx`,
  `utils/gemini.ts`, `utils/context.ts`). Rationale: it forced a second
  deployment + API-key management for a feature recruiters don't need, and an
  on-page AI chatbot is itself part of the generic-AI-site look. To re-add:
  any serverless function proxying the old payload shape works; see git
  history at `server/index.js`.
- **The fake homelab telemetry** (`utils/homelab.ts` generated pseudo-random
  CPU/uptime/query numbers from the clock). Replaced by an honest hardware/
  service inventory in `src/data/infrastructure.ts`. **Do not reintroduce
  invented metrics** — this was an integrity fix, not a styling choice.
- `public/Images/FAUVETTE_Kristofer_CV.txt` (was chatbot RAG context).

**Changed**
- Blog: flat `src/content/posts/*.{en,fr}.md` keyed by numeric frontmatter id
  → folder-per-post content collection keyed by slug (see §1). The Pi-hole
  post's images moved from `public/Images/pihole/` into the post folder with
  relative references. `5_privacy mode.png` renamed (space → underscore).
- Articles/CV: modal overlays with no URLs → real routed pages per locale
  (`/fr/blog/<slug>/`, `/fr/cv/` …), with canonical + hreflang tags and a
  sitemap.
- Certifications: home-page section + modal → **collapsed appendix on the CV
  page** (brief: "demote"). Data preserved in `src/data/certifications.ts`
  including Credly verification links.
- All CV/projects/socials data carried over into typed bilingual data files.

**Added**
- Design-token system (`src/styles/tokens.css`) with light "paper" and dark
  "lamplight" themes; three-state toggle (auto/dark/light) in the masthead.
- Gallery pipeline (was six hardcoded placeholder tiles).
- 404 page, sitemap, per-page SEO meta.

## 3. Problem / solution log (this session)

1. **Glob-loader ids were slugified.** `index.en.md` became id `"indexen"` — the
   dot is stripped by Astro's default id slugifier, so language detection
   failed (all posts registered as `en`, `/fr/blog/*` pages weren't generated
   and `en` paths were emitted twice). Fix: custom `generateId` in
   `src/content.config.ts` preserving the literal path; caught by reading the
   build log's route list, confirmed via `node_modules/.astro/data-store.json`.
2. **Dates off by one day.** `date: 2025-12-08` parses as UTC midnight;
   `Intl.DateTimeFormat` formatted it in the build machine's timezone,
   printing "7 décembre". Fix: `timeZone: 'UTC'` in `formatDate`
   (`src/i18n/locales.ts`). Caught by screenshot review, not by the build.
3. **Verification:** production build + `astro check` (0 errors), a script
   asserting every internal `href`/`src` in `dist/` resolves (14 pages), and
   headless-Chromium screenshots of home (desktop/mobile/dark), article and CV
   pages against `astro preview`.

## 4. Design rationale — do not regress these

The visual language is **"The Engineer's Journal"**: print-era technical
publishing (field notebook / engineering journal), chosen specifically to be
the opposite of the default AI-generated portfolio look.

- **One accent color.** Oxide rust (`--rust`) is the only accent. If you're
  about to add a second accent, a gradient, a glow, glassmorphism, particles,
  or `slate-900`, stop — that's the exact look this redesign removed.
- **Paper and lamplight, not light and dark.** Dark mode re-inks the same
  paper system (warm blacks, cream ink). Never swap it for a neutral/blue
  dark theme.
- **Type is the interface.** Fraunces (serif, real italics, old-style figures)
  for text; IBM Plex Mono, uppercase + letterspaced (`.annot`), for the
  "annotation layer": section numbers, dates, tags, captions, nav. Tags are
  bracketed mono text `[DNS]`, not colored pills.
- **Structure over decoration:** hairline rules, numbered sections
  (`№ 01…05` on the home page), figure captions, ruled ledger rows. Almost no
  motion; everything honours `prefers-reduced-motion`.
- **Recruiter path is sacred:** the rust CV button in the masthead is on every
  page and is intentionally the loudest element on the site. Keep it one click
  away from everywhere.
- **Honesty is part of the aesthetic:** the infrastructure section is a real
  inventory; the gallery says it's empty rather than faking content. Keep the
  site truthful.

## 5. How to (common tasks)

- **New blog post:** see `content/blog/README.md`. No code.
- **New photo:** drop into `content/gallery/`. No code.
- **CV update:** edit `src/data/cv.ts` and replace the PDF in
  `public/Images/` (path in `src/data/site.ts`).
- **New locale:** add to `LOCALES` in `src/i18n/locales.ts`, add strings in
  `ui.ts`, add `{ xx: … }` fields in `src/data/*` — the type errors will walk
  you through every required translation.
- **Verify before merging:** `npm run build` (includes `astro check`), then
  eyeball `/fr/`, `/en/`, one article, `/fr/cv/` via `npm run preview`.
