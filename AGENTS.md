# Codex project guidance

- This repository is currently a plain static HTML/CSS/JavaScript website. Do not add Next.js or another application framework unless the user asks.
- `dist/` contains the original website source. The GitHub Pages workflow runs `scripts/prepare-legacy.mjs` to copy it into `public/legacy/` and publish that static output.
- `public/legacy/` is generated and ignored. Never make durable edits there; change `dist/` or its source/generator files instead.
- The home route opens the Ukrainian standard portfolio. The top comparison plaque should contain only its link to `concepts.html` and the close control. The hub retains ceramics, photography, and 3D art. Do not restore the museum or night exhibition options unless the user asks.
- Treat `dist/`, `src/`, `document-source/`, and artwork archives as source material. Avoid deleting or replacing portfolio assets during migration work.
- The GitHub Pages URL is `https://scbprod.github.io/mishenko/`. Its repository setting must use the GitHub Actions publishing source. Keep `.nojekyll` in the published artifact.
