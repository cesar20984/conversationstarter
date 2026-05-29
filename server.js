const http = require("http");
const fs = require("fs");
const path = require("path");

loadEnv(path.join(__dirname, ".env"));

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, "public");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon"
};
const ROUTE_MAP = {
  "/": "/index.html",
  "/es": "/es.html",
  "/politica-de-privacidad": "/politica-de-privacidad.html",
  "/aviso-legal": "/aviso-legal.html",
  "/politica-de-cookies": "/politica-de-cookies.html",
  "/terminos-y-condiciones": "/terminos-y-condiciones.html"
};

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(body);
}

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
    ["/about.html", { priority: "0.8", changefreq: "monthly", alternates: false, file: "about.html" }],
    ["/politica-de-privacidad", { priority: "0.7", changefreq: "monthly", alternates: false, file: "politica-de-privacidad.html" }],
    ["/aviso-legal", { priority: "0.7", changefreq: "monthly", alternates: false, file: "aviso-legal.html" }],
    ["/politica-de-cookies", { priority: "0.7", changefreq: "monthly", alternates: false, file: "politica-de-cookies.html" }],
    ["/terminos-y-condiciones", { priority: "0.7", changefreq: "monthly", alternates: false, file: "terminos-y-condiciones.html" }]
  ]);

  const reserved = new Set([
    "index.html",
    "es.html",
    "politica-de-privacidad.html",
    "aviso-legal.html",
    "politica-de-cookies.html",
    "terminos-y-condiciones.html"
  ]);

  for (const fileName of fs.readdirSync(PUBLIC_DIR)) {
    if (!fileName.endsWith(".html") || reserved.has(fileName)) continue;
    const route = `/${fileName}`;
    if (!routes.has(route)) {
      routes.set(route, { priority: "0.6", changefreq: "monthly", alternates: false, file: fileName });
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

function sendXml(res, body, method = "GET") {
  res.writeHead(200, {
    "content-type": "text/xml; charset=utf-8",
    "content-disposition": "inline",
    "x-content-type-options": "nosniff",
    "cache-control": "no-store"
  });
  if (method === "HEAD") {
    res.end();
    return;
  }
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 120_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function compactText(value, limit = 1600) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function extractJson(text) {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(trimmed.slice(start, end + 1));
    throw new Error("Model did not return JSON");
  }
}

async function generateWithOpenAI(state) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const language = state.language === "es" ? "Spanish" : "English";
  const mode = state.mode === "guided" ? "guided instruction" : "direct line";
  const action = state.action || "start";
  const targetMode = state.targetMode === "guided" ? "guided instruction" : state.targetMode === "direct" ? "direct line" : "";

  const instructions = [
    "You are CueStarter.com, a fast mobile conversation coach for one-handed use.",
    "Return only valid compact JSON. No markdown. No extra text.",
    "Create one coherent conversation move and only related next controls.",
    "Do not create disconnected alternatives. Every option must continue from the current line or chosen topic.",
    "If action is starter_pack, create 6 diverse conversation starters across different everyday themes. They must not repeat the same motif, hobby, activity, or object.",
    "If action is quick_line, create only one immediately usable starter on a fresh theme.",
    "If action is transform, rewrite currentLine into targetMode while preserving the exact social intent.",
    "If action is wild_pivot, ignore current topic and create a totally new conversation starter from a different theme.",
    "Avoid overusing dancing, pets, travel, movies, work, or food unless the user selected that topic.",
    "Respect the selected language exactly.",
    "If mode is direct, primary must be exact words the user can say out loud.",
    "If mode is guided, primary must be a clear instruction such as 'Ask them...'.",
    "Tone must strongly affect wording and social risk.",
    "Use action: start opens; deepen asks a more specific follow-up; related stays nearby; soften lowers pressure; pivot changes topic gracefully; topic starts the requested topic; wild_pivot changes to an unrelated theme.",
    "If action is controls, keep primary exactly equal to currentLine and generate only intent, actions, and topicOptions for that line.",
    "Keep primary short enough for a phone screen.",
    "Action labels must be 1 to 3 short words. Put explanation only in hint.",
    "Topic options must be short concrete nouns or compact themes.",
    "Do not mention that you are an AI.",
    "Schema: {\"primary\":\"...\",\"intent\":\"...\",\"starters\":[{\"line\":\"...\",\"topic\":\"...\",\"intent\":\"...\"}],\"actions\":[{\"id\":\"deepen\",\"label\":\"...\",\"hint\":\"...\"},{\"id\":\"related\",\"label\":\"...\",\"hint\":\"...\"},{\"id\":\"soften\",\"label\":\"...\",\"hint\":\"...\"},{\"id\":\"pivot\",\"label\":\"...\",\"hint\":\"...\"}],\"topicOptions\":[\"...\",\"...\",\"...\",\"...\"],\"microContext\":\"12 words max state summary\"}"
  ].join(" ");

  const compactState = {
    language,
    mode,
    targetMode,
    action,
    conversationType: state.conversationType,
    tone: state.tone,
    topic: state.topic,
    intention: state.intention,
    energy: state.energy,
    requestedTopic: compactText(state.requestedTopic, 80),
    currentLine: compactText(state.currentLine, 260),
    lastLine: compactText(state.lastLine, 220),
    microContext: compactText(state.microContext, 240),
    recent: Array.isArray(state.recent) ? state.recent.slice(-6).map(item => compactText(item, 180)) : []
  };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "authorization": `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions,
      input: `Generate the next CueStarter options for this compressed state: ${JSON.stringify(compactState)}`
    })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`OpenAI request failed: ${response.status} ${detail.slice(0, 300)}`);
  }

  const data = await response.json();
  const outputText = data.output_text || (data.output || [])
    .flatMap(item => item.content || [])
    .filter(part => part.type === "output_text" || part.text)
    .map(part => part.text || "")
    .join("");

  const parsed = extractJson(outputText);
  const primary = action === "controls" && compactState.currentLine
    ? compactState.currentLine
    : compactText(parsed.primary, 220);
  return {
    primary,
    intent: compactText(parsed.intent, 120),
    starters: Array.isArray(parsed.starters) ? parsed.starters.slice(0, 6).map(item => ({
      line: compactText(item.line, 220),
      topic: compactText(item.topic, 48),
      intent: compactText(item.intent, 100)
    })).filter(item => item.line) : [],
    actions: Array.isArray(parsed.actions) ? parsed.actions.slice(0, 4).map(item => ({
      id: compactText(item.id, 24),
      label: compactText(item.label, 40),
      hint: compactText(item.hint, 100)
    })) : [],
    topicOptions: Array.isArray(parsed.topicOptions) ? parsed.topicOptions.slice(0, 4).map(x => compactText(x, 48)) : [],
    microContext: compactText(parsed.microContext, 180),
    source: "openai"
  };
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const mappedPath = ROUTE_MAP[url.pathname] || url.pathname;
  const rawPath = decodeURIComponent(mappedPath);
  const safePath = path.normalize(rawPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, {
      "content-type": MIME[ext] || "application/octet-stream",
      "cache-control": "no-store"
    });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/api/status") {
    sendJson(res, 200, {
      aiAvailable: Boolean(process.env.OPENAI_API_KEY),
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini"
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/next") {
    try {
      const raw = await readBody(req);
      const state = JSON.parse(raw || "{}");
      const generated = await generateWithOpenAI(state);
      if (!generated) {
        sendJson(res, 200, { source: "local", message: "OPENAI_API_KEY is not configured." });
        return;
      }
      sendJson(res, 200, generated);
    } catch (error) {
      sendJson(res, 500, { error: error.message || "Generation failed" });
    }
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    if (req.url === "/en" || req.url.startsWith("/en?")) {
      res.writeHead(308, { location: "/" });
      res.end();
      return;
    }
    if (req.url === "/sitemap.xml" || req.url.startsWith("/sitemap.xml?")) {
      sendXml(res, generateSitemap(resolveSiteUrl(req)), req.method);
      return;
    }
    if (req.method === "HEAD") {
      res.writeHead(200, { "cache-control": "no-store" });
      res.end();
      return;
    }
    serveStatic(req, res);
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(PORT, () => {
  console.log(`CueStarter running at http://localhost:${PORT}`);
});
