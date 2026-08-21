export const VERIFICATION_SCHEMA = {
  entityType: "verification",

  id: "string",

  entityId: "string",
  targetEntityType: "string",

  status:
    "pending|approved|rejected",

  sourceIds: ["string"],

  verifiedBy:
    "human|editorial",

  verifiedAt: "ISO-8601 datetime|null",

  reason: "string|null",

  issues: ["string"],

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
