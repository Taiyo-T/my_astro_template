import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    featuredImage: z.string().optional(),
  }),
});

export const collections = {
  news: newsCollection,
};