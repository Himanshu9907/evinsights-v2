/**
 * EVInsights — Media Data Contract
 *
 * Images/files are stored externally.
 * Database stores metadata and references only.
 */

export const MEDIA_SCHEMA = {
  id: "string",

  entityType:
    "brand|vehicle|variant|article|dealer|location|other",

  entityId: "string",

  type: "image|video|document",

  role:
    "logo|primary|gallery|interior|exterior|charging|brochure|other",

  original: {
    url: "string|null",
    fileName: "string|null",
  },

  storage: {
    provider: "cloudinary|other",
    publicId: "string|null",
    secureUrl: "string|null",
  },

  dimensions: {
    width: "number|null",
    height: "number|null",
  },

  format: "string|null",

  fileSizeBytes: "number|null",

  altText: "string|null",

  sourceId: "string|null",

  verification: {
    status: "verified|unverified|rejected",
    verifiedAt: "ISO-8601 datetime|null",
  },

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};