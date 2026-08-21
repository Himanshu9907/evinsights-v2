/**
 * EVInsights — Content Data Contract
 *
 * AI-generated and human-edited content.
 * Every important factual claim should remain traceable to sources.
 */

export const CONTENT_SCHEMA = {
  id: "string",

  type:
    "article|news|review|comparison|guide|faq|other",

  title: "string",

  slug: "string",

  excerpt: "string|null",

  content: "string",

  language: "string",

  locale: "string|null",

  author: {
    type: "ai|human",
    id: "string|null",
    name: "string|null",
  },

  relatedEntities: {
    vehicleIds: ["string"],
    brandIds: ["string"],
    variantIds: ["string"],
    locationIds: ["string"],
  },

  mediaIds: ["string"],

  sources: {
    sourceIds: ["string"],
    citationRequired: "boolean",
  },

  ai: {
    generated: "boolean",
    provider: "string|null",
    model: "string|null",
    promptVersion: "string|null",
    confidence: "number|null",
  },

  review: {
    status: "draft|review|approved|rejected",
    reviewedBy: "string|null",
    reviewedAt: "ISO-8601 datetime|null",
  },

  seo: {
    metaTitle: "string|null",
    metaDescription: "string|null",
    keywords: ["string"],
  },

  publishedAt: "ISO-8601 datetime|null",

  status: "draft|scheduled|published|archived",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};