import { site, navigation } from "./content.js";

export const escape = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
export const arrow = (direction = "up-right") =>
  `<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="${direction === "left" ? "M20 12H4M11 5l-7 7 7 7" : direction === "right" ? "M4 12h15M13 5l7 7-7 7" : direction === "down" ? "M12 4v15M5 13l7 7 7-7" : "M5 19 19 5M5 5h14v14"}" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const mark = `<img class="brand-avatar" src="${escape(site.avatar)}" alt="" width="32" height="32" decoding="async">`;

export function Navbar(active = "") {
  const links = navigation
    .map(
      ({ href, label, id }) =>
        `<a href="${href}" ${active === id ? 'aria-current="page"' : ""}>${label}</a>`,
    )
    .join("");
  return `<header class="navbar" data-navbar>
    <div class="container nav-inner">
      <a class="brand" href="index.html" aria-label="${escape(site.name)} — Home">${mark}<span>${escape(site.name)}</span></a>
      <div class="nav-actions"><nav class="desktop-nav" aria-label="Main navigation">${links}</nav>
        <button class="theme-toggle" type="button" aria-label="Light mode" aria-pressed="false" title="Switch to light mode" data-theme-toggle>
          <svg class="theme-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>
          <svg class="theme-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.9 13.1A9 9 0 0 1 10.9 3.1a9 9 0 1 0 10 10Z"/></svg>
        </button>
        <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
      </div>
    </div>
    <nav id="mobile-menu" class="mobile-menu" aria-label="Mobile navigation" inert><div class="container">${links}</div></nav>
  </header>`;
}

export function Footer(active = "") {
  const links =
    active === "home"
      ? ""
      : `<nav aria-label="Footer navigation">${navigation
          .filter((item) => item.id !== "home")
          .map(
            ({ href, label, id }) =>
              `<a href="${href}" ${active === id ? 'aria-current="page"' : ""}>${label}</a>`,
          )
          .join("")}</nav>`;
  return `<footer class="footer"><div class="container footer-top">
    <a class="brand" href="index.html">${mark}<span>${escape(site.name)}</span></a>${links}
  </div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} ${escape(site.name)}</span><span class="site-credit">Built with Codex</span></div></footer>`;
}

export function Button({ href, text, secondary = false, download = false }) {
  return `<a class="button ${secondary ? "button-secondary" : ""}" href="${escape(href)}" ${download ? "download" : ""}>${escape(text)}${download ? arrow("down") : arrow("right")}</a>`;
}
export function TextLink(href, text) {
  return `<a class="text-link" href="${escape(href)}">${escape(text)}${arrow("right")}</a>`;
}
export function TechTag(text) {
  return `<span class="tech-tag mono">${escape(text)}</span>`;
}
export function SectionHeader({ title, link = "" }) {
  return `<div class="section-heading"><h2>${escape(title)}</h2>${link}</div>`;
}

export function AnimatedSection(content, className = "") {
  return `<div class="reveal ${className}" data-reveal>${content}</div>`;
}
export function ProjectCard(project) {
  return `<article class="project-card reveal" data-reveal data-category="${escape(project.category)}">
    <a class="project-card-link" href="${escape(project.id)}.html">
      <div class="project-card-copy"><span class="project-category">${escape(project.category)} · ${escape(project.year)}</span><h3>${escape(project.title)}</h3><p>${escape(project.subtitle)}</p></div>${arrow("right")}
    </a>
  </article>`;
}

export function ProjectGrid(projects) {
  return `<div class="project-grid">${projects.map(ProjectCard).join("")}</div>`;
}
export function CategoryFilter(categories, projects) {
  return `<div class="filter-bar"><div class="category-filters" role="group" aria-label="Filter projects by category">${categories.map((category, i) => `<button class="filter-button ${i === 0 ? "is-active" : ""}" data-filter="${escape(category)}" aria-pressed="${i === 0}">${escape(category)}</button>`).join("")}</div></div><p class="sr-only" role="status" data-filter-status>Showing all ${projects.length} projects.</p>`;
}

export function ProjectMetadata(project) {
  return `<dl class="project-metadata source-metadata">${[
    ["기간", project.duration],
    ["담당", project.role],
    ["플랫폼", project.platform],
  ]
    .filter(([, value]) => value)
    .map(
      ([key, value]) =>
        `<div><dt>${escape(key)}</dt><dd>${escape(value)}</dd></div>`,
    )
    .join("")}</dl>`;
}

export function ExperienceTimeline(experience) {
  return `<ol class="experience-timeline">${experience.map((item) => `<li><span class="timeline-dot" aria-hidden="true"></span><p class="mono">${escape(item.period)}</p><div><h3>${escape(item.title)}</h3>${item.organization ? `<p class="organization">${escape(item.organization)}</p>` : ""}${item.description ? `<p>${escape(item.description)}</p>` : ""}</div></li>`).join("")}</ol>`;
}

// The portfolio is deliberately text-only; archived media never enters the page.
export function ContentBlock(block) {
  if (block.type !== "text" && block.type !== "split") return "";
  return `<div class="content-text"><h3>${escape(block.title)}</h3><p>${escape(block.text)}</p></div>`;
}

export function PublicationEntry(publication, { compact = false } = {}) {
  const links = [
    publication.pdf ? TextLink(publication.pdf, "PDF") : "",
    publication.doi ? TextLink(publication.doi, "DOI") : "",
  ]
    .filter(Boolean)
    .join("");
  const metadata = [publication.authorRole, publication.venue]
    .filter(Boolean)
    .map(escape)
    .join(" · ");
  const displayTitle = publication.displayTitle || publication.title;
  return `<article class="publication-entry ${compact ? "publication-compact" : ""}" aria-labelledby="${escape(publication.id)}-title">
    <span class="publication-year" ${publication.year ? "" : 'aria-hidden="true"'}>${publication.year ? escape(publication.year) : ""}</span>
    <div class="publication-content"><h${compact ? "3" : "2"} id="${escape(publication.id)}-title">${publication.url ? `<a class="publication-title-link" href="${escape(publication.url)}" target="_blank" rel="noopener noreferrer">${escape(displayTitle)}${arrow()}</a>` : escape(displayTitle)}</h${compact ? "3" : "2"}>
      ${metadata ? `<p class="publication-authors">${metadata}</p>` : ""}
      ${!compact && displayTitle !== publication.title ? `<details class="publication-abstract"><summary>전체 제목${arrow("down")}</summary><p>${escape(publication.title)}</p></details>` : ""}
      ${!compact && publication.abstract ? `<details class="publication-abstract"><summary>Abstract${arrow("down")}</summary><p>${escape(publication.abstract)}</p></details>` : ""}
      ${links ? `<div class="publication-links">${links}</div>` : ""}
    </div>
  </article>`;
}
