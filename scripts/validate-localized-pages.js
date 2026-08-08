"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { caseStudies, localeMeta } = require("./case-studies-data");

const projectRoot = path.resolve(__dirname, "..");
const siteOrigin = "https://nixonch.github.io";
const profilePages = [
  { relativePath: "index.html", url: `${siteOrigin}/`, nested: false },
  { relativePath: "en/index.html", url: `${siteOrigin}/en/`, nested: true },
  { relativePath: "de/index.html", url: `${siteOrigin}/de/`, nested: true },
  { relativePath: "es/index.html", url: `${siteOrigin}/es/`, nested: true },
  { relativePath: "fr/index.html", url: `${siteOrigin}/fr/`, nested: true },
  { relativePath: "uk/index.html", url: `${siteOrigin}/uk/`, nested: true },
  { relativePath: "ru/index.html", url: `${siteOrigin}/ru/`, nested: true }
];

function readRequiredFile(relativePath) {
  const filePath = path.join(projectRoot, relativePath);

  assert(fs.existsSync(filePath), `Required file is missing: ${relativePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function parseEmbeddedJsonLd(html, scriptId, relativePath) {
  const pattern = new RegExp(
    `<script id="${scriptId}" type="application\\/ld\\+json">([\\s\\S]*?)<\\/script>`
  );
  const match = html.match(pattern);

  assert(match, `${relativePath}: JSON-LD block #${scriptId} is missing`);

  try {
    JSON.parse(match[1]);
  } catch (error) {
    throw new Error(`${relativePath}: invalid JSON-LD: ${error.message}`);
  }
}

function validatePage(page, jsonLdId) {
  const html = readRequiredFile(page.relativePath);

  assert(
    html.includes(`<link rel="canonical" href="${page.url}" />`),
    `${page.relativePath}: canonical URL must be ${page.url}`
  );
  parseEmbeddedJsonLd(html, jsonLdId, page.relativePath);

  if (page.nested) {
    assert(
      !/(?:href|src)="(?:css|images|js)\//.test(html),
      `${page.relativePath}: nested page contains a broken relative asset path`
    );
  }
}

function getCaseStudyPage(caseStudy, language) {
  const locale = localeMeta[language];
  const content = caseStudy.locales[language];

  return {
    relativePath: path.join(
      locale.directory,
      locale.section,
      content.slug,
      "index.html"
    ),
    url: `${siteOrigin}/${locale.directory}/${locale.section}/${content.slug}/`,
    nested: true
  };
}

function validatePages() {
  const expectedUrls = [];

  for (const page of profilePages) {
    validatePage(page, "profile-structured-data");
    expectedUrls.push(page.url);
  }

  for (const caseStudy of caseStudies) {
    for (const language of Object.keys(caseStudy.locales)) {
      const page = getCaseStudyPage(caseStudy, language);
      validatePage(page, "article-structured-data");
      expectedUrls.push(page.url);
    }
  }

  return expectedUrls;
}

function validateSitemap(expectedUrls) {
  const sitemap = readRequiredFile("sitemap.xml");
  const sitemapUrls = Array.from(
    sitemap.matchAll(/<loc>([^<]+)<\/loc>/g),
    (match) => match[1]
  );

  assert.strictEqual(
    sitemapUrls.length,
    expectedUrls.length,
    "sitemap.xml contains an unexpected number of URLs"
  );
  assert.strictEqual(
    new Set(sitemapUrls).size,
    sitemapUrls.length,
    "sitemap.xml contains duplicate URLs"
  );

  for (const url of expectedUrls) {
    assert(sitemapUrls.includes(url), `sitemap.xml is missing ${url}`);
  }
}

const expectedUrls = validatePages();
validateSitemap(expectedUrls);

console.log(
  `Static page validation passed: ${expectedUrls.length} pages and sitemap.xml.`
);
