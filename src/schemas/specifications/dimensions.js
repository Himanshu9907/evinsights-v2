/**
 * EVInsights — Dimensions & Weight Specification Contract
 */

export const DIMENSIONS_SCHEMA = {
  id: "string",

  variantId: "string",

  dimensions: {
    lengthMm: "number|null",
    widthMm: "number|null",
    heightMm: "number|null",
    wheelbaseMm: "number|null",
  },

  groundClearance: {
    valueMm: "number|null",
    laden: "boolean|null",
  },

  weight: {
    kerbKg: "number|null",
    grossVehicleWeightKg: "number|null",
  },

  capacity: {
    seating: "number|null",
    doors: "number|null",

    bootSpaceLitres: {
      standard: "number|null",
      maximum: "number|null",
    },

    frunkLitres: "number|null",
  },

  wheels: {
    frontTyre: "string|null",
    rearTyre: "string|null",
    wheelSizeInches: "number|null",
  },

  sourceIds: ["string"],

  verifiedAt: "ISO-8601 datetime|null",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};