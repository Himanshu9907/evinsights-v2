/**
 * EVInsights — Brand Data Contract
 *
 * This file defines the structure expected for every brand record.
 * Actual brand data lives in:
 *
 * database/brands/records/
 */

export const BRAND_SCHEMA = {
  id: "string",
  name: "string",
  slug: "string",

  type: "automotive_manufacturer",

  headquarters: {
    countryCode: "string",
  },

  markets: ["string"],

  website: "string|null",

  logo: {
    url: "string|null",
    cloudinaryPublicId: "string|null",
  },

  status: "active|inactive",

  sources: [
    {
      sourceId: "string",
    },
  ],

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime",
};