import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const legacyDirectory = path.join(process.cwd(), "public", "legacy");
const portfolioPages = new Set([
  "3d-art.html",
  "cinema.html",
  "cinema-de.html",
  "cinema-pl.html",
  "cinema-ru.html",
  "cinema-uk.html",
  "concepts.html",
  "designs.html",
  "index.html",
  "photography.html",
]);

export default async function PortfolioPage({ params }) {
  const { slug = [] } = await params;
  const requestedPath = slug.join("/");
  const page = requestedPath || "cinema-uk.html";
  const target = path.resolve(legacyDirectory, page);

  if (!portfolioPages.has(page) || !target.startsWith(`${legacyDirectory}${path.sep}`) || !existsSync(target)) {
    notFound();
  }

  return (
    <main className="portfolio-frame">
      <iframe src={`${basePath}/legacy/${page}`} title="Krystyna Mishchenko — portfolio" allow="fullscreen" />
    </main>
  );
}