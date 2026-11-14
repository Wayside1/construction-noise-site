import { getCollection } from 'astro:content';
export async function publishedArticles() {
  const all = await getCollection('articles', (a) => a.data.status === 'published');
  return all.sort((a, b) => b.data.published_date.getTime() - a.data.published_date.getTime() || a.id.localeCompare(b.id));
}
export async function learningArticles() {
  const all = await getCollection('learning');
  return all.sort((a, b) => a.data.order - b.data.order);
}
export async function optionPages() {
  const all = await getCollection('options');
  return all.sort((a, b) => a.data.order - b.data.order);
}
