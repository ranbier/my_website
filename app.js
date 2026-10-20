const themeButton = document.querySelector("[data-theme-toggle]");
const systemAppearance = window.matchMedia("(prefers-color-scheme: dark)");
let themePreference = null;

function readThemePreference() {
  try {
    const saved = localStorage.getItem("dmdnot-theme");
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    // Preserve a choice made on this page if storage is blocked.
    return themePreference;
  }
}

function updateTheme() {
  const theme =
    themePreference || (systemAppearance.matches ? "dark" : "light");
  const light = theme === "light";
  document.documentElement.dataset.theme = theme;
  themeButton?.setAttribute("aria-pressed", String(light));
  themeButton?.setAttribute(
    "title",
    light ? "Switch to dark mode" : "Switch to light mode",
  );
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", light ? "#F7F8F8" : "#0B0E11");
}

themePreference = readThemePreference();
updateTheme();
themeButton?.addEventListener("click", () => {
  themePreference =
    document.documentElement.dataset.theme === "light" ? "dark" : "light";
  updateTheme();
  try {
    localStorage.setItem("dmdnot-theme", themePreference);
  } catch {}
});
systemAppearance.addEventListener("change", () => {
  if (themePreference === null) updateTheme();
});
window.addEventListener("storage", (event) => {
  if (event.key === "dmdnot-theme" || event.key === null) {
    themePreference =
      event.newValue === "light" || event.newValue === "dark"
        ? event.newValue
        : null;
    updateTheme();
  }
});
window.addEventListener("pageshow", () => {
  themePreference = readThemePreference();
  updateTheme();
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const navbar = document.querySelector("[data-navbar]");
let scheduled = false;
function updateNavigation() {
  navbar?.classList.toggle("is-scrolled", window.scrollY > 12);
  scheduled = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateNavigation);
    }
  },
  { passive: true },
);
updateNavigation();

// Reveal only after the observer exists; a failed script never hides the content.
if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
    },
    { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
  );
  document
    .querySelectorAll("[data-reveal]")
    .forEach((element) => revealObserver.observe(element));
  document.documentElement.classList.add("motion-ready");
}

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
function setMenu(open, restoreFocus = true) {
  document.body.classList.toggle("menu-open", open);
  menuButton?.setAttribute("aria-expanded", String(open));
  menuButton?.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  if (mobileMenu) mobileMenu.inert = !open;
  if (main) main.inert = open;
  if (footer) footer.inert = open;
  if (open) mobileMenu?.querySelector("a")?.focus({ preventScroll: true });
  else if (restoreFocus) menuButton?.focus({ preventScroll: true });
}
menuButton?.addEventListener("click", () =>
  setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
);
mobileMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false, false);
});
document.addEventListener("keydown", (event) => {
  if (!document.body.classList.contains("menu-open")) return;
  if (event.key === "Escape") {
    setMenu(false);
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [
    themeButton,
    menuButton,
    ...mobileMenu.querySelectorAll("a"),
  ].filter(Boolean);
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
window.matchMedia("(min-width: 801px)").addEventListener("change", (event) => {
  if (event.matches && document.body.classList.contains("menu-open"))
    setMenu(false, false);
});

// Filters preserve the current filter in the URL and work with browser Back / Forward.
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const cards = [...document.querySelectorAll(".project-card[data-category]")];
function setFilter(category, updateURL = false) {
  const current = filterButtons.some(
    (button) => button.dataset.filter === category,
  )
    ? category
    : "All work";
  let count = 0;
  for (const card of cards) {
    card.hidden = current !== "All work" && card.dataset.category !== current;
    if (!card.hidden) {
      count++;
      card.classList.add("is-visible");
    }
  }
  for (const button of filterButtons) {
    const selected = button.dataset.filter === current;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  }
  const counter = document.querySelector("[data-count]");
  if (counter) counter.textContent = String(count).padStart(2, "0");
  const status = document.querySelector("[data-filter-status]");
  if (status)
    status.textContent = `Showing ${count} ${current === "All work" ? "" : current + " "}project${count === 1 ? "" : "s"}.`;
  if (updateURL) {
    const url = new URL(location.href);
    if (current === "All work") url.searchParams.delete("category");
    else url.searchParams.set("category", current);
    history.pushState(null, "", url);
  }
}
if (filterButtons.length) {
  const initialCategory = new URL(location.href).searchParams.get("category");
  if (initialCategory) setFilter(initialCategory);
  filterButtons.forEach((button) =>
    button.addEventListener("click", () =>
      setFilter(button.dataset.filter, true),
    ),
  );
  window.addEventListener("popstate", () =>
    setFilter(new URL(location.href).searchParams.get("category")),
  );
}

let toastTimer;
function toast(message) {
  const element = document.querySelector(".toast");
  if (!element) return;
  clearTimeout(toastTimer);
  element.textContent = message;
  element.classList.add("is-visible");
  toastTimer = setTimeout(() => element.classList.remove("is-visible"), 3500);
}
document
  .querySelector("[data-copy-email]")
  ?.addEventListener("click", async (event) => {
    const email = event.currentTarget.dataset.copyEmail;
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      toast("Email address copied.");
    } catch {
      const emailLink =
        document.querySelector(".email-address") ||
        document.querySelector(".email-link");
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(emailLink);
      selection.removeAllRanges();
      selection.addRange(range);
      toast("Email selected. Press Ctrl+C or ⌘C to copy.");
    }
  });

// CSS cross-document transitions where available; graceful fade elsewhere.
document.addEventListener("click", (event) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    reduceMotion.matches
  )
    return;
  const anchor = event.target.closest("a[href]");
  if (
    !anchor ||
    anchor.hasAttribute("download") ||
    (anchor.target && anchor.target !== "_self")
  )
    return;
  const target = new URL(anchor.href, location.href);
  if (
    target.origin !== location.origin ||
    !["http:", "https:"].includes(target.protocol) ||
    target.pathname === location.pathname
  )
    return;
  if (
    typeof CSS !== "undefined" &&
    CSS.supports("view-transition-name", "root") &&
    "onpageswap" in window
  )
    return;
  event.preventDefault();
  document.body.classList.add("is-leaving");
  setTimeout(() => location.assign(target.href), 150);
});
window.addEventListener("pageshow", () =>
  document.body.classList.remove("is-leaving"),
);
