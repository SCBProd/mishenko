import { createHash } from "node:crypto";
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
// Content-addressed entry assets prevent stale CSS/JS across photography releases.
for (const name of ["photography.css", "photography.js", "photography-data.js", "hub-language.js"]) {
  const assetPath = path.join(destination, name);
  const contents = readFileSync(assetPath);
  const fingerprint = createHash("sha256").update(contents).digest("hex").slice(0, 12);
  const extension = path.extname(name);
  const versioned = `${name.slice(0, -extension.length)}.${fingerprint}${extension}`;
  writeFileSync(path.join(destination, versioned), contents);
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const assetReference = new RegExp(`(["'])${escaped}(?:\\?[^"']*)?(["'])`, "g");
  for (const entry of readdirSync(destination)) {
    if (!entry.endsWith(".html")) continue;
    const htmlPath = path.join(destination, entry);
    const html = readFileSync(htmlPath, "utf8");
    writeFileSync(htmlPath, html.replace(assetReference, `$1${versioned}$2`));
  }
}

// A release stamp lets a restored browser tab discover a newer publication.
const photoHtmlPath = path.join(destination, "photography.html");
const photoHtml = readFileSync(photoHtmlPath, "utf8");
const photoVersion = createHash("sha256").update(photoHtml).digest("hex").slice(0, 16);
writeFileSync(photoHtmlPath, photoHtml.replace("</head>", `<meta name="photography-release" content="${photoVersion}"></head>`));
writeFileSync(path.join(destination, "photography-release.json"), JSON.stringify({version: photoVersion}));
