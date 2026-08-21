/**
 * EVInsights — Article Data Contract
 */

export const ARTICLE_SCHEMA = {
  id: "string",

  contentId: "string",

  category:
    "news|review|comparison|buying_guide|technology|charging|ownership|other",

  headline: "string",

  slug: "string",

  summary: "string|null",

  readingTimeMinutes: "number|null",

  featured: "boolean",

  relatedVehicleIds: ["string"],

  relatedBrandIds: ["string"],

  relatedArticleIds: ["string"],

  mediaIds: ["string"],

  sourceIds: ["string"],

  seo: {
    canonicalUrl: "string|null",
    metaTitle: "string|null",
    metaDescription: "string|null",
  },

  status: "draft|review|published|archived",

  publishedAt: "ISO-8601 datetime|null",

  updatedAt: "ISO-8601 datetime",

  createdAt: "ISO-8601 datetime",
};