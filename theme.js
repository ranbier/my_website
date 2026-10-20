// Apply the saved choice or system appearance before the first styled paint.
(() => {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  try {
    const saved = localStorage.getItem("dmdnot-theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch {
    // System appearance still works when persistent storage is unavailable.
  }
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#F7F8F8" : "#0B0E11");
})();
