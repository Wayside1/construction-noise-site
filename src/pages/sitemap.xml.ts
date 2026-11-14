import type { APIRoute } from 'astro';
import { publishedArticles, learningArticles, optionPages } from '../data/content';
import { SITE } from '../data/site';
const STATIC = ['/', '/ComplaintGuide', '/ContractorGuide', '/LearningCentre', '/options', '/piling-noise', '/news', '/MachineNoise', '/NoiseCalculator', '/FAQ', '/GetAssistance', '/about', '/contact'];
export const GET: APIRoute = async () => {
  const arts = await publishedArticles();
  const lib = await learningArticles();
  const opts = await optionPages();
  const latest = arts[0]?.data.updated_date ?? arts[0]?.data.published_date;
  const urls = [
    ...STATIC.map((p) => ({ loc: SITE.url + p, lastmod: latest })),
    ...arts.map((a) => ({ loc: `${SITE.url}/articles/${a.id}`, lastmod: a.data.updated_date ?? a.data.published_date })),
    ...opts.map((o) => ({ loc: `${SITE.url}/options/${o.id}` })),
    ...lib.map((a) => ({ loc: `${SITE.url}/learning-centre/${a.id}` })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u: any) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
