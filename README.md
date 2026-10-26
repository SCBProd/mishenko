# Krystyna Mishchenko portfolio — Next.js

This repository is prepared for Vercel and uses Next.js as its application and routing layer. The home page opens the Ukrainian standard portfolio. Existing portfolio content is preserved in `dist/` and served through the compatibility copy generated in `public/legacy/`.

The top plaque contains a link to the original portfolio hub at `concepts.html` plus its close control. The hub retains ceramics, photography, and 3D art. The museum and night exhibition alternatives are excluded from the runtime.

`scripts/prepare-legacy.mjs` copies `dist/` into the ignored `public/legacy/` directory before development and production builds. Edit the original files or their generators in `dist/`, `src/`, and supporting source folders; do not edit `public/legacy/`, because it is regenerated.

## Local development

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
```

Import the GitHub repository into Vercel and use the default Next.js build settings. The GitHub Actions workflow checks the build; it does not deploy to GitHub Pages.