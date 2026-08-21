export const SPECIFICATION_SCHEMA = {
  entityType: "specification",

  id: "string",

  vehicleId: "string",
  variantId: "string|null",

  battery: {
    capacityKwh: "number|null",
    chemistry: "string|null",
    voltage: "number|null"
  },

  performance: {
    powerKw: "number|null",
    powerHp: "number|null",
    torqueNm: "number|null",
    topSpeedKmh: "number|null",
    zeroToHundredSec: "number|null"
  },

  dimensions: {
    lengthMm: "number|null",
    widthMm: "number|null",
    heightMm: "number|null",
    wheelbaseMm: "number|null",
    groundClearanceMm: "number|null"
  },

  safety: {
    rating: "number|string|null",
    ratingAgency: "string|null"
  },

  sourceIds: ["string"],
  evidenceIds: ["string"],

  status: "active|superseded",

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
