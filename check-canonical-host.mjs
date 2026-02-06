import fs from "node:fs"
import path from "node:path"

const repoRoot = path.resolve(process.cwd())

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8")
}

function walk(dir, exts) {
  const out = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue
      out.push(...walk(fullPath, exts))
      continue
    }
    if (exts.has(path.extname(entry.name))) out.push(fullPath)
  }
  return out
}

function fail(message) {
  process.stderr.write(`${message}\n`)
  process.exitCode = 1
}

const textFiles = walk(repoRoot, new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"]))

const wwwHost = ["www", "pictureconvert", "com"].join(".")
const httpApex = ["http://", ["pictureconvert", "com"].join(".")].join("")

const wwwHits = []
for (const filePath of textFiles) {
  if (path.basename(filePath) === "check-canonical-host.mjs") continue
  const text = readText(filePath)
  if (!text.includes(wwwHost)) continue
  const rel = path.relative(repoRoot, filePath).replaceAll("\\", "/")
  const lines = text.split(/\r?\n/)
  lines.forEach((line, idx) => {
    if (line.includes(wwwHost)) {
      wwwHits.push({ rel, line: idx + 1, text: line.trim() })
    }
  })
}

if (wwwHits.length > 0) {
  fail("Disallowed www host references found:")
  for (const hit of wwwHits) {
    fail(`- ${hit.rel}:${hit.line} ${hit.text}`)
  }
}

const httpHits = []
for (const filePath of textFiles) {
  if (path.basename(filePath) === "check-canonical-host.mjs") continue
  const text = readText(filePath)
  if (!text.includes(httpApex)) continue
  const rel = path.relative(repoRoot, filePath).replaceAll("\\", "/")
  const lines = text.split(/\r?\n/)
  lines.forEach((line, idx) => {
    if (line.includes(httpApex)) {
      httpHits.push({ rel, line: idx + 1, text: line.trim() })
    }
  })
}

if (httpHits.length > 0) {
  fail("Disallowed http apex references found:")
  for (const hit of httpHits) {
    fail(`- ${hit.rel}:${hit.line} ${hit.text}`)
  }
}

const layoutPath = path.join(repoRoot, "app", "layout.tsx")
const layoutText = readText(layoutPath)
if (!/metadataBase:\s*new URL\(['"]https:\/\/pictureconvert\.com['"]\)/.test(layoutText)) {
  fail("app/layout.tsx must set metadataBase to https://pictureconvert.com")
}

const seoUtilsPath = path.join(repoRoot, "lib", "seo-utils.ts")
const seoUtilsText = readText(seoUtilsPath)
if (/https?:\/\/(www\.)?pictureconvert\.com/.test(seoUtilsText)) {
  fail("lib/seo-utils.ts should not hardcode pictureconvert.com; use relative URLs and metadataBase instead")
}

const sitemapPath = path.join(repoRoot, "app", "sitemap.ts")
const sitemapText = readText(sitemapPath)
if (!/const baseUrl = ['"]https:\/\/pictureconvert\.com['"]/.test(sitemapText)) {
  fail("app/sitemap.ts must use baseUrl https://pictureconvert.com")
}

const robotsPath = path.join(repoRoot, "app", "robots.ts")
const robotsText = readText(robotsPath)
if (!/const baseUrl = ['"]https:\/\/pictureconvert\.com['"]/.test(robotsText)) {
  fail("app/robots.ts must use baseUrl https://pictureconvert.com")
}

if (process.exitCode === 1) process.exit(1)

process.stdout.write(`OK\n`)
