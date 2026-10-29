# Krystyna Mishchenko portfolio — static site

The portfolio is plain HTML, CSS and JavaScript. The source website is in `dist/`; GitHub Actions prepares it and publishes a filtered copy from `public/legacy/` to `https://scbprod.github.io/mishenko/`.

The published home page is the three-discipline hub. It links to ceramics, photography and 3D art. The comparison plaque contains the return link to the hub and its close control; the museum and night exhibition alternatives are excluded from the published copy.

## Preview locally

Run the preparation script, then serve the generated files with any static HTTP server:

```sh
node scripts/prepare-legacy.mjs
python -m http.server 8000 --directory public/legacy
```

Open `http://localhost:8000`.

## GitHub Pages

The workflow `.github/workflows/pages.yml` runs on pushes to `main` and publishes `public/legacy/`. In repository Settings → Pages, set the source to **GitHub Actions**. For a GitHub Free personal account, the repository must be public for Pages; private repositories require an eligible paid plan.

Edit the original pages and assets in `dist/`, or their generators and source data in `src/`, `document-source/` and `scripts/`. Do not edit `public/legacy/`; it is generated. Preserve source material and archived artworks.
## CV and biography documents

The reviewed source records are in `document-source/cv-content.json` and the language-specific editorial JSON files. `document-source/build.py` builds the ten DOCX files and `dist/cv-data.js` from those records. It accepts optional language codes, for example `build.py de`.

On Windows with Microsoft Word available, run `document-source/export-pdf.ps1` to export matching PDF files and rebuild the ZIP containing all five languages. Word runs hidden and each exported document is closed after conversion. Review the exported pages before publishing. The website uses `cv-data.js` and `cv-documents.js` for the CV section, preview links and downloads. Source edits belong in `dist/`, not generated `public/legacy/`.
