# construction-noise.co.uk

The honest, independent guide to construction noise. Supported by Hushtec.

Static site built with Astro, hosted on Cloudflare Pages.

- **Articles:** `src/content/articles/<slug>.md` → `/articles/<slug>`. Add a file, push, and it publishes. Set `status: draft` to hold one back.
- **Library explainers:** `src/content/learning/<slug>.md` → `/learning-centre/<slug>`.
- **Pages:** `src/pages/` (URLs kept identical to the old Base44 site, e.g. `/ComplaintGuide`).
- **Forms:** post to the `construction-noise-forms` Cloudflare Worker (`worker/forms.js`), which stores submissions in KV and emails calebshaw@live.com once Email Routing is set up.
- **Build:** `npm install && npm run build` → `dist/`. Cloudflare Pages: build command `npm run build`, output directory `dist`.
- **Images:** stored in `public/images/` (WebP), referenced as `/images/<name>.webp`.
