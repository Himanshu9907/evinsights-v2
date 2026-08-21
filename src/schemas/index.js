/**
 * EVInsights — Index Data Contract
 *
 * Lightweight lookup records for fast searching/filtering.
 * Indexes should not contain the complete vehicle data.
 */

export const INDEX_SCHEMA = {
  id: "string",

  indexType:
    "vehicle|brand|variant|location|pricing|search|other",

  entityId: "string",

  keys: {
    name: "string|null",
    slug: "string|null",
    brandId: "string|null",
    marketId: "string|null",
    locationId: "string|null",
    status: "string|null",
  },

  searchableText: "string|null",

  sortValues: {
    name: "string|null",
    price: "number|null",
    range: "number|null",
    launchDate: "ISO-8601 datetime|null",
  },

  updatedAt: "ISO-8601 datetime",
};