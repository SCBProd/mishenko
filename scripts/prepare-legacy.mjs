import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(projectRoot, "dist");
const destination = path.join(projectRoot, "public", "legacy");
const cinematicPage = /^cinema(?:-(?:de|pl|ru|uk))?\.html$/;
const standardTitles = {
  "cinema.html": "Portfolio — Krystyna Mishchenko",
  "cinema-de.html": "Portfolio — Krystyna Mishchenko",
  "cinema-pl.html": "Portfolio — Krystyna Mishchenko",
  "cinema-ru.html": "Портфолио — Krystyna Mishchenko",
  "cinema-uk.html": "Портфоліо — Krystyna Mishchenko",
};

if (!existsSync(path.join(source, "index.html"))) {
  throw new Error("The original portfolio build is missing at dist/index.html.");
}

mkdirSync(path.dirname(destination), { recursive: true });
rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true });

for (const page of ["museum.html", "exhibition.html"]) {
  rmSync(path.join(destination, page), { force: true });
}

for (const entry of readdirSync(destination, { withFileTypes: true })) {
  if (!entry.isFile() || !cinematicPage.test(entry.name)) continue;
  const pagePath = path.join(destination, entry.name);
  const html = readFileSync(pagePath, "utf8")
    .replace(/<a href="museum\.html">[\s\S]*?<\/a>/g, "")
    .replace(/<a href="exhibition\.html">[\s\S]*?<\/a>/g, "")
    .replace(
      /<div class="compare"><a href="concepts\.html">(.*?)<\/a><div>([\s\S]*?)<\/div>/,
      '<div class="compare"><div>$2<a href="concepts.html">$1</a></div>',
    )
    .replace(
      /<a href="cinema(?:-(?:de|pl|ru|uk))?\.html" aria-current="page">08<span>.*?<\/span><\/a>/,
      "",
    )
    .replace(/<span aria-current="page">.*?<\/span>/, "")
    .replace(/<title>.*?<\/title>/, `<title>${standardTitles[entry.name]}</title>`);
  writeFileSync(pagePath, html);
}

console.log("Prepared the portfolio with only the hub link in the comparison plaque.");