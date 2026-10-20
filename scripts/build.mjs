import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { pageDefinitions, renderPage } from "../src/pages.js";
import { projects, site } from "../src/content.js";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const ids = projects.map((project) => project.id);
if (
  new Set(ids).size !== ids.length ||
  ids.some((id) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
)
  throw new Error("Project IDs must be unique, lowercase URL-safe slugs.");
if (projects.length < 1)
  throw new Error("Add at least one project to the catalogue.");
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
const template = await readFile(join(root, "index.html"), "utf8");
const pages = pageDefinitions();
for (const page of pages) {
  const values = renderPage(page);
  const html = template.replace(
    /\{\{(\w+)\}\}/g,
    (_, key) => values[key] ?? "",
  );
  await writeFile(join(dist, page.file), html);
}
for (const file of ["styles.css", "app.js", "theme.js"])
  await cp(join(root, file), join(dist, file), { recursive: true });
// Only fonts, favicon, and the requested brand avatar are public assets.
await mkdir(join(dist, "assets"), { recursive: true });
for (const file of ["fonts", "favicon.svg", "avatar.png"])
  await cp(join(root, "assets", file), join(dist, "assets", file), {
    recursive: true,
  });
await writeFile(
  join(dist, "_headers"),
  "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n",
);
// Preserve old incoming links without retaining or publishing old content.
await writeFile(
  join(dist, "_redirects"),
  [
    "systems",
    "navigation",
    "perception",
    "infrastructure",
    "troubleshooting",
    "insights",
    "philosophy",
  ]
    .map((name) => `/${name}.html /projects.html 301`)
    .join("\n") + "\n",
);
await writeFile(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n${site.url ? `Sitemap: ${site.url.replace(/\/$/, "")}/sitemap.xml\n` : ""}`,
);
if (site.url) {
  const urls = pages
    .filter((page) => page.file !== "404.html")
    .map(
      (page) =>
        `<url><loc>${new URL(page.file === "index.html" ? "" : page.file, site.url.endsWith("/") ? site.url : `${site.url}/`).href.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</loc></url>`,
    )
    .join("");
  await writeFile(
    join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
  );
}
console.log(
  `Built ${pages.length} static pages → dist/ (no runtime dependencies)`,
);
