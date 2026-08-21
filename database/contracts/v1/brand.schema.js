export const BRAND_SCHEMA = {
  entityType: "brand",

  id: "string",
  name: "string",
  slug: "string",

  country: "string|null",
  website: "string|null",
  logoMediaId: "string|null",

  markets: ["string"],

  status: "active|inactive",

  sourceIds: ["string"],

  verification: {
    status: "pending|approved|rejected",
    lastVerifiedAt: "ISO-8601 datetime|null"
  },

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
