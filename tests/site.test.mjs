import test, { before } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pageDefinitions } from "../src/pages.js";
import { projects, publications, navigation, site } from "../src/content.js";
import { ContentBlock } from "../src/components.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
before(() => {
  const build = spawnSync(process.execPath, ["scripts/build.mjs"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(build.status, 0, build.stderr);
});

test("every generated page has a unique title, one h1, landmarks, and SEO metadata", async () => {
  const files = (await readdir(dist)).filter((file) => file.endsWith(".html"));
  assert.equal(files.length, projects.length + 6);
  const titles = new Set();
  for (const file of files) {
    const html = await readFile(resolve(dist, file), "utf8");
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, file);
    for (const marker of [
      '<main id="main-content">',
      "<footer",
      'name="description"',
      'property="og:title"',
      'name="viewport"',
      "Skip to content",
    ])
      assert.ok(html.includes(marker), `${file}: ${marker}`);
    assert.ok(!/\{\{\w+\}\}/.test(html), `${file}: unexpanded template`);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), `Duplicate page title: ${title}`);
    titles.add(title);
  }
});

test("all local page links, fragments, images, fonts, and downloads resolve", async () => {
  const files = (await readdir(dist)).filter((file) => file.endsWith(".html"));
  for (const file of files) {
    const html = await readFile(resolve(dist, file), "utf8");
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const href = match[1].replace(/&amp;/g, "&");
      if (/^(?:https?:|mailto:|data:)/.test(href)) continue;
      const url = new URL(href, `https://example.test/${file}`);
      const target = resolve(dist, "." + url.pathname);
      assert.ok((await stat(target)).isFile(), `${file}: ${href}`);
      if (url.hash) {
        const targetHTML = await readFile(target, "utf8");
        assert.ok(
          targetHTML.includes(`id="${url.hash.slice(1)}"`),
          `${file}: missing fragment ${href}`,
        );
      }
    }
  }
  const css = await readFile(resolve(dist, "styles.css"), "utf8");
  for (const [, href] of css.matchAll(/url\([\'"]([^\'"]+)[\'"]\)/g))
    assert.ok((await stat(resolve(dist, href))).size > 0, href);
});

test("new project data automatically adds a detail page and catalogue entry", () => {
  const sample = {
    ...projects[0],
    id: "project-new",
    title: "New illustrative project",
    number: "05",
  };
  projects.push(sample);
  try {
    const pages = pageDefinitions();
    assert.ok(pages.some((page) => page.file === "project-new.html"));
    assert.ok(
      pages
        .find((page) => page.file === "projects.html")
        .content.includes("project-new.html"),
    );
    const catalogue = pages.find((page) => page.file === "projects.html");
    const order = [
      ...catalogue.content.matchAll(
        /class="project-card-link" href="([^"]+)"/g,
      ),
    ].map((match) => match[1]);
    for (let i = 0; i < order.length; i++) {
      const detail = pages.find((page) => page.file === order[i]);
      const nextLink = detail.content.match(
        /class="project-page-link next-project" href="([^"]+)"/,
      )?.[1];
      const previousLink = detail.content.match(
        /class="project-page-link previous-project" href="([^"]+)"/,
      )?.[1];
      assert.equal(previousLink, order[i - 1]);
      assert.equal(nextLink, order[i + 1]);
    }
  } finally {
    projects.pop();
  }
});

test("a single project still produces a usable detail template", () => {
  const removed = projects.splice(1);
  try {
    const page = pageDefinitions().find(
      (page) => page.file === "project-01.html",
    );
    assert.ok(!page.content.includes('aria-label="Project navigation"'));
    assert.ok(page.content.includes(projects[0].role));
    assert.ok(!page.content.includes("undefined"));
  } finally {
    projects.push(...removed);
  }
});

test("text content escapes replacement content", () => {
  const text = ContentBlock({
    type: "text",
    title: "<script>alert(1)</script>",
    text: "A & B",
  });
  assert.ok(!text.includes("<script>"));
  assert.ok(text.includes("A &amp; B"));
});

test("only the requested brand avatar is published; content photos stay excluded", async () => {
  for (const page of pageDefinitions()) {
    const html = await readFile(resolve(dist, page.file), "utf8");
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
    assert.ok(!/<(?:img|picture|video|dialog)\b/.test(main), page.file);
    const images = [...html.matchAll(/<img[^>]*src="([^"]+)"/g)].map(
      (match) => match[1],
    );
    assert.deepEqual(images, [site.avatar, site.avatar], page.file);
    assert.ok(!html.includes("assets/projects/"), page.file);
    assert.ok(!html.includes("data-lightbox"), page.file);
  }
  assert.deepEqual((await readdir(resolve(dist, "assets"))).sort(), [
    "avatar.png",
    "favicon.svg",
    "fonts",
  ]);
});

test("the deployment contains only the new site and preserves legacy redirects", async () => {
  const files = await readdir(dist);
  assert.ok(!files.includes("robotics-knowledge-base"));
  assert.ok(!files.includes("src"));
  assert.ok(!files.includes("package.json"));
  assert.ok(!files.includes("systems.html"));
  assert.ok(
    (await readFile(resolve(dist, "_redirects"), "utf8")).includes(
      "/systems.html /projects.html 301",
    ),
  );
});

test("all pages use the current branding and the five shared navigation tabs", async () => {
  assert.deepEqual(
    navigation.map((item) => item.label),
    ["Home", "Project", "Publication", "About", "Contact"],
  );
  for (const page of pageDefinitions()) {
    const html = await readFile(resolve(dist, page.file), "utf8");
    assert.ok(html.includes(site.name), page.file);
    assert.ok(!html.includes("FORM"), page.file);
    const nav = html.match(
      /<nav class="desktop-nav"[^>]*>([\s\S]*?)<\/nav>/,
    )[1];
    for (const item of navigation)
      assert.ok(
        nav.includes(`href="${item.href}"`),
        `${page.file}: ${item.label}`,
      );
    assert.ok(
      html.indexOf('src="theme.js"') < html.indexOf('href="styles.css"'),
      "Saved theme must load before CSS",
    );
    assert.equal((html.match(/data-theme-toggle/g) || []).length, 1);
  }
});

test("publication records preserve full titles and omit unavailable abstracts and links", () => {
  const page = pageDefinitions().find(
    (item) => item.file === "publication.html",
  );
  assert.ok(page);
  assert.equal(
    (page.content.match(/class="publication-abstract"/g) || []).length,
    publications.filter(
      (publication) =>
        publication.abstract ||
        (publication.displayTitle &&
          publication.displayTitle !== publication.title),
    ).length,
  );
  for (const publication of publications) {
    assert.ok(page.content.includes(publication.title));
    if (publication.abstract)
      assert.ok(page.content.includes(publication.abstract));
    if (publication.authorRole)
      assert.ok(page.content.includes(publication.authorRole));
  }
  assert.ok(!page.content.includes('href="null"'));
  assert.ok(!page.content.includes("Sample entries"));
  assert.ok(!page.content.includes("undefined"));
  assert.ok(!page.content.includes("<summary>Abstract"));
});
