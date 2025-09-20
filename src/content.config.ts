import { defineCollection, z } from 'astro:content';

// ニュース記事用のコレクション定義
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  news: newsCollection,
};