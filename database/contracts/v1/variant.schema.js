export const VARIANT_SCHEMA = {
  entityType: "variant",

  id: "string",

  vehicleId: "string",
  generationId: "string|null",

  name: "string",
  slug: "string",

  market: "string|null",

  status:
    "active|discontinued|upcoming",

  specificationId: "string|null",
  chargingId: "string|null",

  pricingIds: ["string"],
  featureIds: ["string"],

  sourceIds: ["string"],

  verification: {
    status: "pending|approved|rejected",
    lastVerifiedAt: "ISO-8601 datetime|null"
  },

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
