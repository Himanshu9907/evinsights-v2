export const PRICING_SCHEMA = {
  entityType: "pricing",

  id: "string",

  vehicleId: "string",
  variantId: "string|null",

  market: "string",

  amount: "number|null",
  currency: "string|null",

  priceType:
    "starting|exShowroom|onRoad|msrp|other",

  validFrom: "ISO-8601 date|null",
  validUntil: "ISO-8601 date|null",

  sourceIds: ["string"],
  evidenceIds: ["string"],

  status: "active|expired|superseded",

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
