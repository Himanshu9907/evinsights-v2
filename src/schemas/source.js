/**
 * EVInsights — Source Data Contract
 *
 * Every important factual data point should be traceable
 * to one or more sources.
 *
 * Source priority:
 * official manufacturer
 * official brochure
 * government
 * trusted secondary source
 * web discovery
 */

export const SOURCE_SCHEMA = {
  id: "string",

  type:
    "official_website|official_brochure|government|trusted_source|news|web_discovery|other",

  title: "string",

  url: "string|null",

  publisher: "string",

  countryCode: "string|null",

  language: "string|null",

  publishedAt: "ISO-8601 datetime|null",

  accessedAt: "ISO-8601 datetime",

  document: {
    fileName: "string|null",
    mediaId: "string|null",
    page: "number|null",
  },

  reliability: "official|high|medium|low",

  verification: {
    status: "verified|partially_verified|unverified|rejected",
    verifiedAt: "ISO-8601 datetime|null",
    verifiedBy: "system|ai|human|null",
  },

  contentHash: "string|null",

  notes: "string|null",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};