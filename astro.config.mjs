import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://construction-noise.co.uk',
  // Keep existing Base44 URLs exactly (e.g. /ComplaintGuide, /articles/slug) with no trailing slash
  trailingSlash: 'never',
  build: { format: 'file' },
});
