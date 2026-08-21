/**
 * EVInsights — Charging Data Contract
 */

export const CHARGING_SCHEMA = {
  id: "string",

  variantId: "string",

  acCharging: {
    supported: "boolean|null",
    maximumPowerKw: "number|null",
    chargingTimeHours: "number|null",
    connectorType: "string|null",
  },

  dcFastCharging: {
    supported: "boolean|null",
    maximumPowerKw: "number|null",
    chargingTimeMinutes: "number|null",
    connectorType: "string|null",

    chargingCurve: [
      {
        batteryPercent: "number",
        powerKw: "number",
      },
    ],
  },

  chargingStandards: ["string"],

  vehicleToLoad: {
    supported: "boolean|null",
    maximumPowerKw: "number|null",
  },

  vehicleToHome: {
    supported: "boolean|null",
  },

  vehicleToGrid: {
    supported: "boolean|null",
  },

  portableCharger: {
    included: "boolean|null",
    powerKw: "number|null",
  },

  chargingNetwork: {
    providerIds: ["string"],
  },

  sourceIds: ["string"],

  verifiedAt: "ISO-8601 datetime|null",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};