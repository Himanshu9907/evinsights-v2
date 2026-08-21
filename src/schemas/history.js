/**
 * EVInsights — Data History Contract
 *
 * Immutable audit trail for important data changes.
 */

export const HISTORY_SCHEMA = {
  id: "string",

  entityType:
    "vehicle|variant|pricing|brand|location|specification|media|source|article|other",

  entityId: "string",

  action:
    "created|updated|deleted|restored|verified|rejected|published",

  field: "string|null",

  previousValue: "unknown|null",

  newValue: "unknown|null",

  reason: "string|null",

  sourceIds: ["string"],


  changedBy: {
    type: "system|ai|user|admin",
    id: "string|null",
  },

  createdAt: "ISO-8601 datetime",
};