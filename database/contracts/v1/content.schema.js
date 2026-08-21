export const CONTENT_SCHEMA = {
  entityType: "content",

  id: "string",

  vehicleId: "string|null",

  type:
    "review|news|guide|comparison",

  title: "string",
  slug: "string",

  excerpt: "string|null",
  content: "string",

  seo: {
    title: "string|null",
    description: "string|null",
    keywords: ["string"]
  },

  mediaIds: ["string"],
  sourceIds: ["string"],

  status:
    "draft|published|archived",

  publishedAt: "ISO-8601 datetime|null",

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
