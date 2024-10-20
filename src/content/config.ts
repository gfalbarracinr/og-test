import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    summary: z.string().max(130),
    date: z.date(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    backgroundImage: z.string(),
    isDevPost: z.boolean().optional().default(false),
  }),
});

const partnerCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    url: z.string(),
    short_description: z.string(),
  }),
});

const teamCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    social: z.record(
      z.string(),
      z.string(),
    ).optional(),
    image: z.string(),
    order: z.number(),
    advisor: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
  partner: partnerCollection,
  team: teamCollection,
};
