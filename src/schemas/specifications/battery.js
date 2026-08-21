/**
 * EVInsights — Battery Specification Contract
 */

export const BATTERY_SCHEMA = {
  id: "string",

  variantId: "string",

  capacity: {
    grossKwh: "number|null",
    usableKwh: "number|null",
  },

  chemistry: "string|null",

  architecture: "string|null",

  voltage: "number|null",

  batteryType: "string|null",

  thermalManagement: "string|null",

  claimedRange: {
    value: "number|null",
    unit: "km|mi",
    testCycle: "WLTP|EPA|NEDC|CLTC|ARAI|other|null",
  },

  realWorldRange: {
    value: "number|null",
    unit: "km|mi",
  },

  degradation: {
    warrantyYears: "number|null",
    warrantyKm: "number|null",
    minimumCapacityPercent: "number|null",
  },

  sourceIds: ["string"],

  verifiedAt: "ISO-8601 datetime|null",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};