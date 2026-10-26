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

Import the GitHub repository into Vercel and use the default Next.js build settings. The Next.js workflow checks the build. A separate, user-authorized GitHub Pages workflow publishes the generated static portfolio from `public/legacy/` to the existing github.io address. Both hosting paths use the same `dist/` source and document assets.
## CV and biography documents

The reviewed source records are in `document-source/cv-content.json` and the language-specific editorial JSON files. `document-source/build.py` builds the ten DOCX files and `dist/cv-data.js` from those records. It accepts optional language codes, for example `build.py de`.

On Windows with Microsoft Word available, run `document-source/export-pdf.ps1` to export matching PDF files and rebuild the ZIP containing all five languages. Word runs hidden and each exported document is closed after conversion. Review the exported pages before publishing. The website uses `cv-data.js` and `cv-documents.js` for the CV section, preview links and downloads. Source edits belong in `dist/`, not generated `public/legacy/`.
