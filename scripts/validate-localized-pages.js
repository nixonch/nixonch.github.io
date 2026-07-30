"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { caseStudies, localeMeta } = require("./case-studies-data");

const projectRoot = path.resolve(__dirname, "..");
const siteOrigin = "https://nixonch.github.io";
const pageDefinitions = [
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

  assert(start !== -1 && end !== -1, `Cannot extract ${variableName} from js/i18n.js`);

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

const i18nSource = fs.readFileSync(path.join(projectRoot, "js", "i18n.js"), "utf8");
const translations = extractObject(i18nSource, "translations", "\n\n  var caseStudyLinks");
const caseStudyLinks = extractObject(i18nSource, "caseStudyLinks", "\n\n  var universityLinks");

function extractJsonLd(html) {
  const match = html.match(
    /<script id="profile-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/
  );

  assert(match, "Profile structured data block is missing");
  return JSON.parse(match[1]);
}

function validateGeneratedPages() {
  for (const page of pageDefinitions) {
    const pageUrl = `${siteOrigin}/${page.directory}/`;
    const htmlPath = path.join(projectRoot, page.directory, "index.html");
    const html = fs.readFileSync(htmlPath, "utf8");
    const structuredData = extractJsonLd(html);
    const dictionary = translations[page.language];

    assert(html.includes(`<html lang="${page.language}">`), `${page.directory}: incorrect html language`);
    assert(
      html.includes(`<title>${escapeHtml(dictionary.meta_title)}</title>`),
      `${page.directory}: title is not localized`
    );
    assert(
      html.includes(
        `<meta name="description" content="${dictionary.meta_description
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")}" />`
      ),
      `${page.directory}: description is not localized`
    );
    assert(
      html.includes(
        `data-i18n="summary_heading">${escapeHtml(dictionary.summary_heading)}</h3>`
      ),
      `${page.directory}: visible profile content is not statically localized`
    );
    assert(
      html.includes(`<link rel="canonical" href="${pageUrl}" />`),
      `${page.directory}: incorrect canonical URL`
    );
    assert.strictEqual(
      (html.match(/<link rel="alternate" hreflang=/g) || []).length,
      7,
      `${page.directory}: incomplete hreflang set`
    );
    assert(
      !/(?:href|src)="(?:css|images|js)\//.test(html),
      `${page.directory}: nested page contains a broken relative asset URL`
    );
    assert(
      html.includes('src="../js/i18n.js?v=20260730-8"'),
      `${page.directory}: localized page does not load the shared language script`
    );
    assert.strictEqual(structuredData.url, pageUrl, `${page.directory}: incorrect JSON-LD URL`);
    assert.strictEqual(
      structuredData.inLanguage,
      page.language,
      `${page.directory}: incorrect JSON-LD language`
    );
    assert.strictEqual(
      structuredData.mainEntity["@id"],
      `${siteOrigin}/#person`,
      `${page.directory}: localized page must identify the same person`
    );

    const expectedCaseStudyLinks = caseStudyLinks[page.language] || caseStudyLinks.en;
    for (const caseStudyKey of Object.keys(expectedCaseStudyLinks)) {
      assert(
        html.includes(
          `href="${expectedCaseStudyLinks[caseStudyKey]}" data-case-study="${caseStudyKey}"`
        ),
        `${page.directory}: case-study link ${caseStudyKey} is not localized`
      );
    }

    if (page.language === "es") {
      assert(
        html.includes("securPharm/NMVS") &&
          html.includes("SEVeM") &&
          html.includes("transferible"),
        "es: German production experience and its transferability to SEVeM must be explicit"
      );
    }
  }
}

function getCaseStudyUrl(caseStudy, language) {
  const locale = localeMeta[language];
  const content = caseStudy.locales[language];

  return `${siteOrigin}/${locale.directory}/${locale.section}/${content.slug}/`;
}

function validateCaseStudyPages() {
  for (const caseStudy of caseStudies) {
    for (const language of Object.keys(caseStudy.locales)) {
      const locale = localeMeta[language];
      const content = caseStudy.locales[language];
      const pageUrl = getCaseStudyUrl(caseStudy, language);
      const htmlPath = path.join(
        projectRoot,
        locale.directory,
        locale.section,
        content.slug,
        "index.html"
      );
      const html = fs.readFileSync(htmlPath, "utf8");
      const structuredDataMatch = html.match(
        /<script id="article-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/
      );

      assert(structuredDataMatch, `${pageUrl}: Article structured data is missing`);
      const structuredData = JSON.parse(structuredDataMatch[1]);

      assert(html.includes(`<html lang="${language}">`), `${pageUrl}: incorrect html language`);
      assert(
        html.includes(`<title>${escapeHtml(content.title)} — Nick Mitin</title>`),
        `${pageUrl}: incorrect title`
      );
      assert(
        html.includes(`<link rel="canonical" href="${pageUrl}" />`),
        `${pageUrl}: incorrect canonical URL`
      );
      assert.strictEqual(
        (html.match(/<link rel="alternate" hreflang=/g) || []).length,
        4,
        `${pageUrl}: incomplete hreflang set`
      );
      assert(
        html.includes(`href="/">&larr; ${escapeHtml(locale.backLabel)}</a>`),
        `${pageUrl}: root CV backlink is missing`
      );
      assert.strictEqual(structuredData["@type"], "Article", `${pageUrl}: incorrect JSON-LD type`);
      assert.strictEqual(structuredData.url, pageUrl, `${pageUrl}: incorrect JSON-LD URL`);
      assert.strictEqual(
        structuredData.author["@id"],
        `${siteOrigin}/#person`,
        `${pageUrl}: article author is not connected to the profile`
      );

      if (caseStudy.id === "nmvs" && language === "es") {
        assert(
          html.includes("experiencia productiva") &&
            html.includes("securPharm/NMVS en Alemania") &&
            html.includes("SEVeM") &&
            html.includes("puede adaptarse al entorno español"),
          `${pageUrl}: German NMVS experience and SEVeM transferability are not explicit`
        );
      }
    }
  }
}

function validateDiscoveryFiles() {
  const sitemap = fs.readFileSync(path.join(projectRoot, "sitemap.xml"), "utf8");
  const robots = fs.readFileSync(path.join(projectRoot, "robots.txt"), "utf8");
  const profileUrls = [
    `${siteOrigin}/`,
    ...pageDefinitions.map((page) => `${siteOrigin}/${page.directory}/`)
  ];
  const caseStudyUrls = caseStudies.flatMap((caseStudy) => (
    Object.keys(caseStudy.locales).map((language) => getCaseStudyUrl(caseStudy, language))
  ));
  const expectedUrls = [...profileUrls, ...caseStudyUrls];

  for (const url of expectedUrls) {
    assert(sitemap.includes(`<loc>${url}</loc>`), `sitemap.xml is missing ${url}`);
  }

  assert.strictEqual(
    (sitemap.match(/<loc>/g) || []).length,
    expectedUrls.length,
    "sitemap.xml contains an unexpected number of canonical URLs"
  );
  assert.strictEqual(
    (sitemap.match(/<xhtml:link rel="alternate"/g) || []).length,
    profileUrls.length * 7 + caseStudyUrls.length * 4,
    "sitemap.xml contains incomplete language alternate sets"
  );
  assert(!sitemap.includes("/ua/"), "sitemap.xml still contains the obsolete /ua/ route");
  assert(
    robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`),
    "robots.txt does not advertise sitemap.xml"
  );
}

function createRuntime(pathname, initialCookie, browserLanguages) {
  const buttons = ["en", "de", "es", "fr", "uk", "ru"].map((language) => {
    const listeners = Object.create(null);

    return {
      language,
      listeners,
      classList: { toggle() {} },
      getAttribute(name) {
        return name === "data-language" ? this.language : "";
      },
      setAttribute() {},
      addEventListener(eventName, listener) {
        listeners[eventName] = listener;
      }
    };
  });
  const htmlElement = {
    lang: "en",
    classList: { remove() {} }
  };
  const caseStudyAnchors = ["wwks2", "nmvs", "legacy"].map((caseStudyKey) => ({
    caseStudyKey,
    href: "",
    getAttribute(name) {
      return name === "data-case-study" ? this.caseStudyKey : "";
    },
    setAttribute(name, value) {
      if (name === "href") {
        this.href = value;
      }
    }
  }));
  let cookieValue = initialCookie;

  const document = {
    documentElement: htmlElement,
    title: "",
    querySelector() {
      return null;
    },
    querySelectorAll(selector) {
      if (selector === "[data-language]") {
        return buttons;
      }

      if (selector === "[data-case-study]") {
        return caseStudyAnchors;
      }

      return [];
    }
  };

  Object.defineProperty(document, "cookie", {
    get() {
      return cookieValue;
    },
    set(value) {
      cookieValue = value;
    }
  });

  const window = {
    location: {
      pathname,
      protocol: "https:"
    }
  };
  const context = {
    document,
    navigator: {
      languages: browserLanguages,
      language: browserLanguages[0] || "en"
    },
    window
  };

  vm.runInNewContext(
    fs.readFileSync(path.join(projectRoot, "js", "i18n.js"), "utf8"),
    context
  );

  return {
    buttons,
    caseStudyAnchors,
    document,
    getCookie: () => cookieValue,
    pathname: window.location.pathname
  };
}

function validateLanguageBehavior() {
  const forcedGerman = createRuntime("/de/", "resume_language=ru", ["es-ES"]);

  assert.strictEqual(forcedGerman.document.documentElement.lang, "de");
  assert(forcedGerman.getCookie().startsWith("resume_language=de"));
  assert.strictEqual(
    forcedGerman.caseStudyAnchors.find((anchor) => anchor.caseStudyKey === "wwks2").href,
    caseStudyLinks.de.wwks2
  );

  const englishButton = forcedGerman.buttons.find((button) => button.language === "en");
  englishButton.listeners.click.call(englishButton);
  assert.strictEqual(forcedGerman.document.documentElement.lang, "en");
  assert(forcedGerman.getCookie().startsWith("resume_language=en"));
  assert.strictEqual(
    forcedGerman.caseStudyAnchors.find((anchor) => anchor.caseStudyKey === "wwks2").href,
    caseStudyLinks.en.wwks2
  );
  assert.strictEqual(forcedGerman.pathname, "/de/", "language click changed the current URL");

  const forcedUkrainian = createRuntime("/uk/", "resume_language=de", ["de-DE"]);
  assert.strictEqual(forcedUkrainian.document.documentElement.lang, "uk");
  assert(forcedUkrainian.getCookie().startsWith("resume_language=uk"));

  const forcedFrenchIndex = createRuntime("/fr/index.html", "resume_language=ru", ["ru-RU"]);
  assert.strictEqual(forcedFrenchIndex.document.documentElement.lang, "fr");

  const cookieDrivenRoot = createRuntime("/", "resume_language=ru", ["de-DE"]);
  assert.strictEqual(cookieDrivenRoot.document.documentElement.lang, "ru");
}

validateGeneratedPages();
validateCaseStudyPages();
validateDiscoveryFiles();
validateLanguageBehavior();

console.log("Localized page validation passed.");
