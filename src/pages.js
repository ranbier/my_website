import {
  site,
  homeContent,
  projects,
  categories,
  experience,
  skills,
  publications,
} from "./content.js";
import {
  escape,
  arrow,
  Navbar,
  Footer,
  Button,
  SectionHeader,
  ProjectGrid,
  CategoryFilter,
  ProjectMetadata,
  ExperienceTimeline,
  TechTag,
  ContentBlock,
  PublicationEntry,
} from "./components.js";

const contactCTA = () =>
  `<section class="contact-cta section-pad"><div class="container cta-row"><h2>Let’s talk<span class="accent">.</span></h2><a href="contact.html" class="circle-link" aria-label="Contact">${arrow()}</a></div></section>`;

function home() {
  return `<section class="home-hero">
    <div class="container hero-inner"><div class="hero-copy"><h1 class="hero-enter">${homeContent.title.map(escape).join("<br>")}<span class="accent">.</span></h1><p class="hero-name hero-enter">${escape(site.person)}</p><p class="hero-description hero-enter">${escape(site.biography)}</p></div><p class="hero-bio" lang="en">${escape(homeContent.bio)}</p></div>
  </section>`;
}

function projectsByRecency() {
  return [...projects].sort((a, b) => b.duration.localeCompare(a.duration));
}

function projectList() {
  const recent = projectsByRecency();
  return `<section class="page-intro container"><h1>Projects<span class="accent">.</span></h1></section><section class="container projects-section">${CategoryFilter(categories, projects)}${ProjectGrid(recent)}</section>${contactCTA()}`;
}

function detail(project) {
  const recent = projectsByRecency();
  const position = recent.indexOf(project);
  const previous = recent[position - 1];
  const next = recent[position + 1];
  return `<section class="container evidence-detail-intro"><a class="back-link" href="projects.html">← All projects</a><h1>${escape(project.title)}</h1>${ProjectMetadata(project)}</section>
    <section class="container project-focus" aria-label="핵심 작업"><div class="focus-headings">${project.highlights.map((title) => `<h2>${escape(title)}</h2>`).join("")}</div>${project.award ? `<p class="project-award">${escape(project.award)}</p>` : ""}</section>
    ${project.sections?.length ? `<section class="container custom-content" aria-label="프로젝트 자료">${project.sections.map(ContentBlock).join("")}</section>` : ""}
    ${previous || next ? `<nav class="project-pagination container" aria-label="Project navigation">${previous ? `<a class="project-page-link previous-project" href="${previous.id}.html" rel="prev">${arrow("left")}<div><span>Previous project</span><h2>${escape(previous.title)}</h2></div></a>` : ""}${next ? `<a class="project-page-link next-project" href="${next.id}.html" rel="next"><div><span>Next project</span><h2>${escape(next.title)}</h2></div>${arrow("right")}</a>` : ""}</nav>` : ""}`;
}

function publicationPage() {
  return `<section class="container page-intro publication-intro"><h1>Publication<span class="accent">.</span></h1></section><section class="container publications-section" aria-label="논문 목록"><div class="publication-list">${publications.map((publication) => PublicationEntry(publication)).join("")}</div></section>${contactCTA()}`;
}

function about() {
  const recentTeams = [...experience].sort((a, b) =>
    b.period.localeCompare(a.period),
  );
  return `<section class="container page-intro source-about-intro"><h1>${escape(site.person)}<span class="accent">.</span></h1><p>${escape(site.role)}</p></section>
    <section class="container about-education"><h2>${escape(site.education.institution)} ${escape(site.education.department)}</h2><p>${escape(site.education.period)}</p></section>
    <section class="container experience-section section-pad">${SectionHeader({ title: "Team" })}<div class="experience-layout">${ExperienceTimeline(recentTeams)}</div></section>
    <section class="skills-section"><div class="container section-pad">${SectionHeader({ title: "Skills" })}<div class="skills-grid source-skills">${skills.map((skill) => `<article><h3>${escape(skill.name)}</h3><div class="skill-list">${skill.items.map(TechTag).join("")}</div></article>`).join("")}</div></div></section>${contactCTA()}`;
}

function contact() {
  const emailIcon = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect x="5" y="9" width="30" height="22" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="m6 11 14 11 14-11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const githubIcon = `<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.4-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .94-.3 3.1 1.15a10.82 10.82 0 0 1 5.62 0c2.16-1.46 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98a4.35 4.35 0 0 1 1.16 3.02c0 4.32-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"/></svg>`;
  return `<section class="container contact-page"><div class="contact-heading"><h1>Let’s talk<span class="accent">.</span></h1></div><div class="contact-cards">
    <article class="contact-card contact-email-card"><a class="contact-card-link email-link" href="mailto:${escape(site.email)}"><span class="contact-card-icon">${emailIcon}</span><h2>Email</h2><span class="contact-card-address email-address">${escape(site.email)}</span><span class="contact-card-arrow">${arrow()}</span></a><button class="copy-email" type="button" data-copy-email="${escape(site.email)}">Copy email</button></article>
    ${site.socials
      .filter((social) => social.url)
      .map(
        (social) =>
          `<article class="contact-card"><a class="contact-card-link" href="${escape(social.url)}" target="_blank" rel="noopener noreferrer"><span class="contact-card-icon">${githubIcon}</span><h2>${escape(social.name)}</h2><span class="contact-card-address">${escape(social.url.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</span><span class="contact-card-arrow">${arrow()}</span></a></article>`,
      )
      .join("")}
  </div></section>`;
}

export function pageDefinitions() {
  return [
    {
      file: "index.html",
      active: "home",
      title: `${site.person} · ${site.name} — ${site.role}`,
      description: site.description,
      content: home(),
    },
    {
      file: "projects.html",
      active: "projects",
      title: `Project — ${site.name}`,
      description: "자율주행, 수중로봇, 임베디드 제어 프로젝트.",
      content: projectList(),
    },
    {
      file: "publication.html",
      active: "publication",
      title: `Publication — ${site.name}`,
      description: "MPC 기반 경로 생성과 비선형 모델 예측 제어 연구.",
      content: publicationPage(),
    },
    ...projects.map((project) => ({
      file: `${project.id}.html`,
      active: "projects",
      title: `${project.title}: ${project.subtitle} — ${site.name}`,
      description: `${project.title} · ${project.role} · ${project.duration}`,
      content: detail(project),
    })),
    {
      file: "about.html",
      active: "about",
      title: `About — ${site.name}`,
      description:
        "김진성 · 국민대학교 자동차IT융합학과 · 자율주행과 수중로봇.",
      content: about(),
    },
    {
      file: "contact.html",
      active: "contact",
      title: `Contact — ${site.name}`,
      description: "김진성의 이메일과 GitHub.",
      content: contact(),
    },
    {
      file: "404.html",
      active: "",
      title: `Page not found — ${site.name}`,
      description:
        "This page could not be found. Explore the portfolio or return home.",
      content: `<section class="container not-found"><p class="eyebrow">404 / A SMALL DETOUR</p><h1>Not quite<br>the right place<span class="accent">.</span></h1><p>The page you’re looking for may have moved.</p>${Button({ href: "index.html", text: "Back to the beginning" })}</section>`,
    },
  ];
}

export function renderPage(page) {
  const canonical = site.url
    ? `<link rel="canonical" href="${escape(new URL(page.file === "index.html" ? "" : page.file, site.url.endsWith("/") ? site.url : `${site.url}/`).href)}">`
    : "";
  return {
    robots:
      page.file === "404.html" ? '<meta name="robots" content="noindex">' : "",
    title: escape(page.title),
    description: escape(page.description),
    canonical,
    body: `${Navbar(page.active)}<main id="main-content">${page.content}</main>${Footer(page.active)}<div class="toast" role="status" aria-live="polite"></div>`,
    page: page.active || "error",
  };
}
