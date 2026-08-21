export const EVIDENCE_SCHEMA = {
  entityType: "evidence",

  id: "string",

  sourceId: "string",

  entityId: "string",
  entityTypeRef: "string",

  field: "string",

  value: "string|number|boolean|null",

  sourceText: "string",

  extractedBy:
    "rule|ai|manual",

  confidence: "number|null",

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
