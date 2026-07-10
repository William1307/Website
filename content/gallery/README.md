# Publishing photos (no code required)

Drop image files (`.jpg`, `.png`, `.webp`, `.avif`) into this folder — each one
becomes a numbered plate on `/fr/gallery` and `/en/gallery` at the next build.

The caption is derived from the filename: leading digits/dates are stripped and
dashes/underscores become spaces.

    2026-03_proliant-rack.jpg  →  "Plate 01 — Proliant rack"

Files are ordered alphabetically, so a date or number prefix controls the order.
