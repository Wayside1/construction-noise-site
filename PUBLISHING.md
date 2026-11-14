# Publishing an article to construction-noise.co.uk

The site is a static Astro site. Pushing to `main` on GitHub (Wayside1/construction-noise-site) makes Cloudflare Pages rebuild and publish it automatically, usually within 2–3 minutes.

## 1. Get the repo

1. Call `mcp__claude-code-remote__add_repo` with owner `Wayside1`, repo `construction-noise-site`, access `push`.
2. Clone exactly as that tool's result says (normally `git clone --depth 1 https://github.com/Wayside1/construction-noise-site /home/claude/construction-noise-site`).

## 2. See what already exists

- Articles: `src/content/articles/<slug>.md`. The file name (without `.md`) is the slug and the URL: `/articles/<slug>`.
- To list existing articles with their titles, categories, tags, source blog URLs and hero images, read the front matter of each file, e.g.
  `grep -H -E '^(title|category|status|published_date|source_blog_url|hero_image_url|tags):' src/content/articles/*.md`
- Never reuse a slug. Never edit or delete another article unless the task says to.

## 3. Write the article file

Create `src/content/articles/<slug>.md` (slug: lowercase, hyphenated, unique). YAML front matter, then the body in Markdown:

```yaml
---
title: "Question-style title"
category: news-and-solutions        # or: guides | product-focus
status: published                   # or: draft (held back, not shown anywhere)
published_date: 2026-11-16          # today, YYYY-MM-DD
author: "Caleb Shaw, Hushtec Ltd"
meta_title: "≤ 60 characters"
meta_description: "≤ 155 characters"
summary: "2–3 sentence self-contained answer."
hero_image_url: "/images/pile-shroud-live.webp"   # optional, see list below
hero_image_alt: "Describe the photo"              # required if hero_image_url is set
key_takeaways:
  - "Fact one"
  - "Fact two"
faqs:
  - question: "Question?"
    answer: "40–80 word answer."
sources:
  - { title: "Page title", url: "https://..." }
tags: ["tag one", "tag two"]
source_blog_url: "https://www.hushtecsolutions.com/uk/blog/..."   # Wednesday rewrites only
---

Body in Markdown. Use ## and ### headings, tables, lists.
```

Rules:
- Quote every string value with double quotes; escape any `"` inside as `\"`. Dates are unquoted `YYYY-MM-DD`.
- Internal links are root-relative: `/articles/<slug>`, `/ComplaintGuide`, `/ContractorGuide`, `/MachineNoise`, `/NoiseCalculator`, `/LearningCentre`, `/FAQ`, `/GetAssistance`, `/contact`. There is NO `/NoiseLog` page (use `/articles/how-to-record-construction-noise-evidence` instead).
- Any article that involves piling should link to the piling noise hub, `/piling-noise`. Noise-control option pages live at `/options/<slug>` (acoustic-barriers-up-to-2m, acoustic-barriers-up-to-8m, transparent-acoustic-barriers, rock-breaker-shrouds, pile-rig-shrouds); link to the relevant one when an article discusses that option.
- Learning Centre explainers live at `/learning-centre/<slug>` (see `src/content/learning/`).

### Photos available (real Hushtec photos, never use stock or AI images)

| File | Shows | Good for |
|---|---|---|
| `/images/barrier-roadside.webp` | Long roadside run of temporary barrier, operative checking a joint | Barriers, roadworks, boundary screening |
| `/images/pile-shroud-live.webp` | Piling rig with acoustic shroud on a live site | Piling, foundations |
| `/images/pile-shroud-yard.webp` | Pile rig shroud close-up in a plant yard | Pile rig shrouds |
| `/images/rig-in-enclosure.webp` | Piling rig working inside a stacked barrier enclosure | Screening at source |
| `/images/enclosure-freestanding.webp` | Free-standing three-sided barrier enclosure (render) | Enclosures, generators, fixed plant, BESS, data centres |
| `/images/rock-breaker-shroud.webp` | Rock breaker with acoustic shroud | Breakers, demolition |

To embed one in the body: `![descriptive alt text](/images/<file>.webp)`.

## 4. Check it builds

```bash
cd /home/claude/construction-noise-site
npm ci
npm run build
```

The build validates every article's front matter. If it fails, fix the file and build again. Never push a failing build.

## 5. Publish

```bash
git add src/content/articles/<slug>.md
git -c user.name="Caleb Shaw" -c user.email="calebshaw@live.com" commit -m "Article: <title>"
git -c push.negotiate=true push origin main
```

If the push is rejected because `main` moved on, run `git pull --rebase origin main` and push again.

## 6. Confirm it's live

Wait about 3 minutes, then WebFetch `https://construction-noise.co.uk/articles/<slug>`. If that still shows the old Base44 site or a 404, try `https://construction-noise-site.pages.dev/articles/<slug>` (the Cloudflare Pages address, always up to date).

## Taking an article down

Edit its file on GitHub (`https://github.com/Wayside1/construction-noise-site/edit/main/src/content/articles/<slug>.md`), change `status: published` to `status: draft`, and commit. The site rebuilds without it.
