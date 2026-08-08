"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { caseStudies, localeMeta } = require("./case-studies-data");

const projectRoot = path.resolve(__dirname, "..");
const sourceHtmlPath = path.join(projectRoot, "index.html");
const sourceI18nPath = path.join(projectRoot, "js", "i18n.js");
const siteOrigin = "https://nixonch.github.io";

const languagePages = [
  { language: "en", directory: "en" },
  { language: "de", directory: "de" },
  { language: "es", directory: "es" },
  { language: "fr", directory: "fr" },
  { language: "uk", directory: "uk" },
  { language: "ru", directory: "ru" }
];

function extractObject(source, variableName, endMarker) {
  const assignment = `var ${variableName} = `;
  const start = source.indexOf(assignment);
  const end = source.indexOf(endMarker, start);

  if (start === -1 || end === -1) {
    throw new Error(`Cannot extract ${variableName} from js/i18n.js`);
  }

  const literal = source
    .slice(start + assignment.length, end)
    .trim()
    .replace(/;$/, "");

  return vm.runInNewContext(`(${literal})`, Object.create(null));
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceTranslatedContent(html, dictionary) {
  return Object.keys(dictionary).reduce((localizedHtml, key) => {
    if (key === "meta_title" || key === "meta_description" || key === "language_selector") {
      return localizedHtml;
    }

    const escapedKey = escapeRegExp(key);
    const pattern = new RegExp(
      `(<([a-z][a-z0-9-]*)\\b[^>]*\\bdata-i18n="${escapedKey}"[^>]*>)[\\s\\S]*?(<\\/\\2>)`,
      "gi"
    );

    return localizedHtml.replace(pattern, `$1${escapeHtml(dictionary[key])}$3`);
  }, html);
}

function replaceStructuredData(html, pageUrl, language, dictionary) {
  const pattern = /(<script id="profile-structured-data" type="application\/ld\+json">)([\s\S]*?)(<\/script>)/;
  const match = html.match(pattern);

  if (!match) {
    throw new Error("Profile structured data block not found in index.html");
  }

  const structuredData = JSON.parse(match[2]);
  structuredData["@id"] = `${pageUrl}#profile`;
  structuredData.url = pageUrl;
  structuredData.inLanguage = language;
  structuredData.mainEntity.jobTitle = dictionary.header_role;
  structuredData.mainEntity.description = dictionary.meta_description;

  const serialized = JSON.stringify(structuredData, null, 2)
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");

  return html.replace(pattern, `$1\n${serialized}\n    $3`);
}

function replaceCaseStudyLinks(html, localizedCaseStudyLinks) {
  return Object.keys(localizedCaseStudyLinks).reduce((localizedHtml, key) => {
    const escapedKey = escapeRegExp(key);
    const pattern = new RegExp(
      `(<a href=")[^"]+("[^>]*\\bdata-case-study="${escapedKey}")`,
      "g"
    );

    return localizedHtml.replace(pattern, `$1${localizedCaseStudyLinks[key]}$2`);
  }, html);
}

const caseStudyTechnologyPatterns = {
  legacy: /CakePHP/,
  nmvs: /securPharm-?\/NMVS/,
  wwks2: /WWKS2/
};

function insertCaseStudyTechnologyLinks(html, localizedCaseStudyLinks) {
  return Object.keys(caseStudyTechnologyPatterns).reduce((localizedHtml, key) => {
    const escapedKey = escapeRegExp(key);
    const itemPattern = new RegExp(
      `(<li\\b[^>]*\\bdata-case-study-technology="${escapedKey}"[^>]*>)([\\s\\S]*?)(<\\/li>)`,
      "g"
    );

    return localizedHtml.replace(itemPattern, (match, openingTag, content, closingTag) => {
      const linkedContent = content.replace(
        caseStudyTechnologyPatterns[key],
        (technology) => `<a href="${escapeAttribute(localizedCaseStudyLinks[key])}" data-case-study="${key}">${technology}</a>`
      );

      return `${openingTag}${linkedContent}${closingTag}`;
    });
  }, html);
}

function localizePage(template, translations, universityLinks, caseStudyLinks, page) {
  const dictionary = translations[page.language];
  const pageUrl = `${siteOrigin}/${page.directory}/`;
  const localizedUniversityLinks = universityLinks[page.language] || universityLinks.default;
  const localizedCaseStudyLinks = caseStudyLinks[page.language] || caseStudyLinks.en;
  let html = template;

  html = html.replace(/<html lang="[^"]+">/, `<html lang="${page.language}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(dictionary.meta_title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${dictionary.meta_description.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]+" \/>/,
    `<link rel="canonical" href="${pageUrl}" />`
  );
  html = replaceTranslatedContent(html, dictionary);
  html = html.replace(
    /(<a href=")[^"]+(" target="_blank" data-i18n="faculty_name" data-faculty-link>)/,
    `$1${localizedUniversityLinks.facultyUrl}$2`
  );
  html = html.replace(
    /(<a href=")[^"]+(" target="_blank" data-university-link>)[\s\S]*?(<\/a>)/,
    `$1${localizedUniversityLinks.universityUrl}$2${escapeHtml(localizedUniversityLinks.universityLabel)}$3`
  );
  html = insertCaseStudyTechnologyLinks(html, localizedCaseStudyLinks);
  html = replaceCaseStudyLinks(html, localizedCaseStudyLinks);
  html = replaceStructuredData(html, pageUrl, page.language, dictionary);

  html = html
    .replace(/href="css\//g, 'href="../css/')
    .replace(/href="images\//g, 'href="../images/')
    .replace(/src="images\//g, 'src="../images/')
    .replace(/src="js\//g, 'src="../js/');

  return html;
}

function getCaseStudyPath(caseStudy, language) {
  const locale = localeMeta[language];
  const content = caseStudy.locales[language];

  return `/${locale.directory}/${locale.section}/${content.slug}/`;
}

function getCaseStudyUrl(caseStudy, language) {
  return `${siteOrigin}${getCaseStudyPath(caseStudy, language)}`;
}

function renderAlternateLinks(caseStudy) {
  const links = Object.keys(caseStudy.locales).map((language) => (
    `    <link rel="alternate" hreflang="${language}" href="${getCaseStudyUrl(caseStudy, language)}" />`
  ));

  links.push(
    `    <link rel="alternate" hreflang="x-default" href="${getCaseStudyUrl(caseStudy, "en")}" />`
  );

  return links.join("\n");
}

function renderCaseStudyPage(caseStudy, language) {
  const locale = localeMeta[language];
  const content = caseStudy.locales[language];
  const technologies = [
    ...caseStudy.technologies,
    ...(content.additionalTechnologies || [])
  ];
  const pageUrl = getCaseStudyUrl(caseStudy, language);
  const title = `${content.title} — Nick Mitin`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: content.title,
    description: content.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    inLanguage: language,
    datePublished: "2026-07-30",
    dateModified: "2026-08-08",
    author: {
      "@type": "Person",
      "@id": `${siteOrigin}/#person`,
      name: "Nick Mitin",
      url: `${siteOrigin}/`
    },
    about: technologies
  };
  const sections = content.sections.map((section) => {
    const paragraphs = section.paragraphs
      .map((paragraph) => `          <p>${escapeHtml(paragraph)}</p>`)
      .join("\n");

    return `        <section class="case-study-section">
          <h2>${escapeHtml(section.heading)}</h2>
${paragraphs}
        </section>`;
  }).join("\n");
  const tags = technologies
    .map((technology) => `            <li>${escapeHtml(technology)}</li>`)
    .join("\n");
  const related = caseStudies
    .filter((relatedCaseStudy) => relatedCaseStudy.id !== caseStudy.id)
    .map((relatedCaseStudy) => (
      `            <li><a href="${getCaseStudyPath(relatedCaseStudy, language)}">${escapeHtml(relatedCaseStudy.locales[language].title)}</a></li>`
    ))
    .join("\n");
  const serializedStructuredData = JSON.stringify(structuredData, null, 2)
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="${language}">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeAttribute(content.description)}" />
    <meta name="author" content="Nick Mitin" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${pageUrl}" />
${renderAlternateLinks(caseStudy)}
    <script id="article-structured-data" type="application/ld+json">
${serializedStructuredData}
    </script>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Muli:300,400" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="/css/base.css" />
    <link rel="stylesheet" href="/css/case-study.css" />
    <link rel="shortcut icon" href="/images/mn.ico">
  </head>
  <body>
    <script>
      const hasSameOriginReferrer =
        document.referrer !== "" &&
        new URL(document.referrer).origin === window.location.origin;
      const isExternalReferrer =
        document.referrer !== "" && !hasSameOriginReferrer;
      const canGoBackWithinSite =
        window.history.length > 1 &&
        !isExternalReferrer &&
        ((window.navigation && window.navigation.canGoBack) || hasSameOriginReferrer);
      const previousPageUrl =
        window.navigation && window.navigation.canGoBack
          ? window.navigation.entries()[window.navigation.currentEntry.index - 1].url || document.referrer
          : canGoBackWithinSite
            ? document.referrer
            : "";
      const isPreviousPageCaseStudy =
        canGoBackWithinSite &&
        typeof previousPageUrl === "string" &&
        previousPageUrl !== "" &&
        new URL(previousPageUrl).pathname.startsWith("/${locale.directory}/${locale.section}/");
    </script>
    <main class="case-study-shell">
      <a class="case-study-back" href="/" onclick="if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && canGoBackWithinSite) { event.preventDefault(); window.history.back(); }">↩ ${escapeHtml(locale.backLabel)}</a>
      <header class="case-study-header">
        <p class="case-study-label">${escapeHtml(locale.label)}</p>
        <h1>${escapeHtml(content.title)}</h1>
        <p class="case-study-lead">${escapeHtml(content.description)}</p>
      </header>
      <article class="case-study-article">
${sections}
        <section class="case-study-section">
          <h2>${escapeHtml(locale.technologiesLabel)}</h2>
          <ul class="case-study-tags">
${tags}
          </ul>
        </section>
        <section class="case-study-section case-study-related-section">
          <h2>${escapeHtml(locale.relatedLabel)}</h2>
          <ul class="case-study-related">
${related}
          </ul>
        </section>
      </article>
    </main>
    <script>
      const caseStudyBackLink = document.querySelector(".case-study-back");

      if (isPreviousPageCaseStudy) {
        caseStudyBackLink.textContent = ${JSON.stringify(`↩ ${locale.previousPageLabel}`)};
      } else if (!canGoBackWithinSite) {
        caseStudyBackLink.textContent = ${JSON.stringify(`↩ ${locale.cvLinkLabel}`)};
      }
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DTEFEE6838"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-DTEFEE6838');
    </script>
  </body>
</html>
`;
}

function renderSitemapAlternates(alternates) {
  return alternates.map((alternate) => (
    `    <xhtml:link rel="alternate" hreflang="${alternate.language}" href="${alternate.url}" />`
  )).join("\n");
}

function renderSitemapEntry(url, alternates) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>2026-08-08</lastmod>
${renderSitemapAlternates(alternates)}
  </url>`;
}

function generateSitemap() {
  const profileAlternates = [
    ...languagePages.map((page) => ({
      language: page.language,
      url: `${siteOrigin}/${page.directory}/`
    })),
    { language: "x-default", url: `${siteOrigin}/` }
  ];
  const entries = [
    renderSitemapEntry(`${siteOrigin}/`, profileAlternates),
    ...languagePages.map((page) => (
      renderSitemapEntry(`${siteOrigin}/${page.directory}/`, profileAlternates)
    ))
  ];

  for (const caseStudy of caseStudies) {
    const caseAlternates = [
      ...Object.keys(caseStudy.locales).map((language) => ({
        language,
        url: getCaseStudyUrl(caseStudy, language)
      })),
      { language: "x-default", url: getCaseStudyUrl(caseStudy, "en") }
    ];

    for (const language of Object.keys(caseStudy.locales)) {
      entries.push(renderSitemapEntry(getCaseStudyUrl(caseStudy, language), caseAlternates));
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
}

const template = fs.readFileSync(sourceHtmlPath, "utf8");
const i18nSource = fs.readFileSync(sourceI18nPath, "utf8").replace(/\r\n?/g, "\n");
const translations = extractObject(i18nSource, "translations", "\n\n  var caseStudyLinks");
const caseStudyLinks = extractObject(i18nSource, "caseStudyLinks", "\n\n  var caseStudyTechnologyPatterns");
const universityLinks = extractObject(i18nSource, "universityLinks", "\n\n  function normalizeLanguage");

for (const page of languagePages) {
  const outputDirectory = path.join(projectRoot, page.directory);
  const outputPath = path.join(outputDirectory, "index.html");
  const localizedHtml = localizePage(template, translations, universityLinks, caseStudyLinks, page);

  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(outputPath, localizedHtml, "utf8");
}

for (const caseStudy of caseStudies) {
  for (const language of Object.keys(caseStudy.locales)) {
    const locale = localeMeta[language];
    const content = caseStudy.locales[language];
    const outputDirectory = path.join(
      projectRoot,
      locale.directory,
      locale.section,
      content.slug
    );
    const outputPath = path.join(outputDirectory, "index.html");

    fs.mkdirSync(outputDirectory, { recursive: true });
    fs.writeFileSync(outputPath, renderCaseStudyPage(caseStudy, language), "utf8");
  }
}

fs.writeFileSync(path.join(projectRoot, "sitemap.xml"), generateSitemap(), "utf8");

console.log(
  `Generated ${languagePages.length} localized profile pages and ${caseStudies.length * 3} case-study pages.`
);
