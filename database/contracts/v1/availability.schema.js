export const AVAILABILITY_SCHEMA = {
  entityType: "availability",

  id: "string",

  vehicleId: "string",

  market: "string",

  status:
    "upcoming|available|discontinued",

  launchDate: "ISO-8601 date|null",
  discontinuationDate: "ISO-8601 date|null",

  sourceIds: ["string"],

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
