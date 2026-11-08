# Codex project guidance

- Photography must display the original uploaded files without resizing or re-encoding, including covers, gallery and viewer. Keep byte-identical files in `photography-originals/`, referenced by each `window.PHOTOS` entry's `original` URL and `originalSha256`. Do not substitute compressed previews. For new photographs, register the source in `scripts/audit-photo-originals.cjs` and run `node scripts/sync-photo-originals.cjs` before publication.

- This repository is currently a plain static HTML/CSS/JavaScript website. Do not add Next.js or another application framework unless the user asks.
- `dist/` contains the original website source. The GitHub Pages workflow runs `scripts/prepare-legacy.mjs` to produce the filtered static website in `public/legacy/` and publish it.
- `public/legacy/` is generated and ignored. Never edit it by hand; change `dist/` or its source/generator files instead.
- The home route opens the Ukrainian standard portfolio. The top comparison plaque should contain only its link to `concepts.html` and the close control. The hub retains ceramics, photography, and 3D art. Do not restore the museum or night exhibition options unless the user asks.
- Treat `dist/`, `src/`, `document-source/`, and artwork archives as source material. Avoid deleting or replacing portfolio assets during migration work.
- The GitHub Pages URL is `https://scbprod.github.io/mishenko/`. Its repository publishing source must be GitHub Actions. Keep `.nojekyll` in the artifact and set `include-hidden-files: true` on `upload-pages-artifact`.
