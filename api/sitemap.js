const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(process.cwd(), "public");

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function collectHtmlRoutes() {
  const routes = new Map([
    ["/", { priority: "1.0", changefreq: "weekly", alternates: true, file: "index.html" }],
    ["/es", { priority: "1.0", changefreq: "weekly", alternates: true, file: "es.html" }],
    ["/about.html", { priority: "0.8", changefreq: "monthly", alternates: false, file: "about.html" }]
  ]);

  if (fs.existsSync(PUBLIC_DIR)) {
    for (const fileName of fs.readdirSync(PUBLIC_DIR)) {
      if (!fileName.endsWith(".html") || fileName === "index.html" || fileName === "es.html") continue;
      const route = `/${fileName}`;
      if (!routes.has(route)) {
        routes.set(route, { priority: "0.6", changefreq: "monthly", alternates: false, file: fileName });
      }
    }
  }

  return [...routes.entries()];
}

function resolveSiteUrl(req) {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const proto = forwardedProto ? String(forwardedProto).split(",")[0].trim() : "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "cuestarter.com";
  return `${proto}://${String(host).trim()}`.replace(/\/+$/, "");
}

function generateSitemap(siteUrl) {
  const urlEntries = collectHtmlRoutes().map(([route, meta]) => {
    const filePath = path.join(PUBLIC_DIR, meta.file);
    const stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    const lastmod = stat ? `\n    <lastmod>${stat.mtime.toISOString()}</lastmod>` : "";
    const alternates = meta.alternates ? `
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/" />
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />` : "";
    return `  <url>
    <loc>${xmlEscape(`${siteUrl}${route}`)}</loc>${lastmod}
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>${alternates}
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;
}

module.exports = function sitemapHandler(req, res) {
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Content-Disposition", "inline");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  if (req.method === "HEAD") {
    res.statusCode = 200;
    res.end();
    return;
  }
  res.statusCode = 200;
  res.end(generateSitemap(resolveSiteUrl(req)));
};
