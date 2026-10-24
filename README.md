# Krystyna Mishchenko portfolio

Live website: https://kristina-coder908.github.io/krystyna_portfolio/

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes the contents of `dist/`.
In repository Settings > Pages, the source must be **GitHub Actions**.
Every push to `main` deploys the website automatically.
Keep `dist/index.html` and use relative asset and page links so the site works
under `/krystyna_portfolio/`. No server-side application or build is required.

## Local preview

Run `python -m http.server 8000 --directory dist`, then open http://localhost:8000/.
Run `node validate-full.cjs` to check the main pages and assets.

The full archive notes are in `README-UK.txt`.
