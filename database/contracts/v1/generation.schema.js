export const GENERATION_SCHEMA = {
  entityType: "generation",

  id: "string",
  vehicleId: "string",

  name: "string",
  generationNumber: "number|null",

  startYear: "number|null",
  endYear: "number|null",

  markets: ["string"],

  status:
    "active|discontinued|upcoming",

  sourceIds: ["string"],

  verification: {
    status: "pending|approved|rejected",
    lastVerifiedAt: "ISO-8601 datetime|null"
  },

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
