/**
 * EVInsights — Review Data Contract
 */

export const REVIEW_SCHEMA = {
  id: "string",

  entityType: "vehicle|variant|brand",

  entityId: "string",

  type: "user|editorial",

  author: {
    userId: "string|null",
    name: "string|null",
  },

  title: "string|null",

  content: "string",

  rating: {
    overall: "number|null",
    performance: "number|null",
    comfort: "number|null",
    range: "number|null",
    charging: "number|null",
    value: "number|null",
  },

  ownership: {
    durationMonths: "number|null",
    distanceKm: "number|null",
  },

  pros: ["string"],

  cons: ["string"],

  mediaIds: ["string"],

  sourceIds: ["string"],

  moderation: {
    status: "pending|approved|rejected|flagged",
    reason: "string|null",
    reviewedBy: "string|null",
    reviewedAt: "ISO-8601 datetime|null",
  },

  verifiedOwner: "boolean|null",

  status: "active|hidden|deleted",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};