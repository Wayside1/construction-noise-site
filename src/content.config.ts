import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// News & Guides articles. One Markdown file per article in src/content/articles/.
// The file name (without .md) is the URL slug: /articles/<slug>
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['news-and-solutions', 'guides', 'product-focus']),
    status: z.enum(['draft', 'published']).default('published'),
    author: z.string().default('Caleb Shaw, Hushtec Ltd'),
    published_date: z.coerce.date(),
    updated_date: z.coerce.date().optional(),
    summary: z.string(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    hero_image_url: z.string().nullable().optional(),
    hero_image_alt: z.string().optional(),
    key_takeaways: z.array(z.string()).default([]),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.string().optional().nullable() })).default([]),
    tags: z.array(z.string()).default([]),
    source_blog_url: z.string().nullable().optional(),
  }),
});

// Learning Centre explainers: /learning-centre/<slug>
const learning = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learning' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    readTime: z.string(),
    order: z.number().default(99),
  }),
});

// Explore the options: one page per noise-control option, /options/<slug>
const options = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/options' }),
  schema: z.object({
    title: z.string(),
    menu_label: z.string(),
    order: z.number(),
    card_text: z.string(),
    meta_title: z.string(),
    meta_description: z.string(),
    summary: z.string(),
    hero_image_url: z.string().optional(),
    hero_image_alt: z.string().optional(),
    hero_caption: z.string().optional(),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    related: z.array(z.object({ title: z.string(), href: z.string() })).default([]),
  }),
});

export const collections = { articles, learning, options };
