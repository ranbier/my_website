import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { watch } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const port = Number(process.env.PORT || 3000);
function build() {
  return (
    spawnSync(process.execPath, [join(root, "scripts/build.mjs")], {
      cwd: root,
      stdio: "inherit",
    }).status === 0
  );
}
if (!build()) process.exit(1);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};
const legacy =
  /^\/(systems|navigation|perception|infrastructure|troubleshooting|insights|philosophy)\.html$/;
const server = createServer(async (request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
  } catch {
    response.writeHead(400).end();
    return;
  }
  if (legacy.test(pathname)) {
    response.writeHead(301, { Location: "/projects.html" }).end();
    return;
  }
  if (pathname.endsWith("/")) pathname += "index.html";
  const path = resolve(dist, `.${pathname}`);
  if (!path.startsWith(dist + sep)) {
    response.writeHead(403).end();
    return;
  }
  try {
    if (!(await stat(path)).isFile()) throw new Error("Not a file");
    const content = await readFile(path);
    response.writeHead(200, {
      "Content-Type": mime[extname(path)] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(await readFile(join(dist, "404.html")));
  }
});
server.listen(port, "0.0.0.0", () =>
  console.log(`Local: http://localhost:${port}`),
);
if (!process.argv.includes("--preview")) {
  let timer;
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(build, 150);
  };
  for (const path of ["src", "assets"])
    watch(join(root, path), { recursive: true }, schedule);
  for (const path of ["index.html", "styles.css", "app.js", "theme.js"])
    watch(join(root, path), schedule);
}
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () => server.close(() => process.exit(0)));
