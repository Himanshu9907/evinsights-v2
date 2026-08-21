/**
 * EVInsights — FAQ Data Contract
 */

export const FAQ_SCHEMA = {
  id: "string",

  entityType:
    "vehicle|variant|brand|article|charging|pricing|other",

  entityId: "string",

  question: "string",

  answer: "string",

  language: "string",

  order: "number",

  sourceIds: ["string"],

  ai: {
    generated: "boolean",
    model: "string|null",
    confidence: "number|null",
  },

  review: {
    status: "draft|approved|rejected",
    reviewedAt: "ISO-8601 datetime|null",
    reviewedBy: "string|null",
  },

  status: "active|inactive",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};