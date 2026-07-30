# nixonch.github.io
My CV:
https://nixonch.github.io/

## Localized static pages

`index.html` and `js/i18n.js` are the source for the localized CV pages. Case-study
content is maintained in `scripts/case-studies-data.js`.

After changing CV content, translations, language routes, or case studies, regenerate
and validate the committed static pages:

```powershell
node scripts/generate-localized-pages.js
node scripts/validate-localized-pages.js
```
