export const CHARGING_SCHEMA = {
  entityType: "charging",

  id: "string",

  vehicleId: "string",
  variantId: "string|null",

  ac: {
    powerKw: "number|null",
    chargingTimeMin: "number|null"
  },

  dc: {
    powerKw: "number|null",
    chargingTimeMin: "number|null"
  },

  fastCharging: "boolean|null",

  sourceIds: ["string"],
  evidenceIds: ["string"],

  status: "active|superseded",

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
