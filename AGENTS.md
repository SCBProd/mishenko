# Codex project guidance

- This repository has been migrated to Next.js for Vercel. Keep the Next.js app and its Vercel deployment path. The user explicitly authorized restoring GitHub Pages on 2026-10-26; maintain its parallel workflow, publishing the generated public/legacy/ copy from the same dist/ sources.
- The App Router entry point is `app/[[...slug]]/page.jsx`. It maps supported routes to the preserved portfolio pages under `public/legacy/`.
- `public/legacy/` is generated and ignored. `npm run dev` and `npm run build` run `scripts/prepare-legacy.mjs` first, which copies the source site from `dist/` and applies the runtime-only plaque/title adjustments. Never make durable edits in `public/legacy/`; change `dist/` or its source/generator files instead.
- The home route opens the Ukrainian standard portfolio. The top comparison plaque should contain only its link to `concepts.html` and the close control. The hub retains ceramics, photography, and 3D art. Do not restore the museum or night exhibition options unless the user asks.
- Treat `dist/`, `src/`, `document-source/`, and artwork archives as source material. Avoid deleting or replacing portfolio assets during migration work.
- Use `npm ci` and `npm run build` to verify application changes. Keep `package-lock.json` in sync with `package.json`.