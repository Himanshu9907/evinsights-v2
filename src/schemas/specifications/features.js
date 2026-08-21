/**
 * EVInsights — Safety Specification Contract
 */

export const SAFETY_SCHEMA = {
  id: "string",

  variantId: "string",

  rating: {
    organization: "NCAP|IIHS|NHTSA|ASEAN_NCAP|other|null",
    score: "number|null",
    stars: "number|null",
    adultProtection: "number|null",
    childProtection: "number|null",
    vulnerableRoadUsers: "number|null",
    safetyAssist: "number|null",
    year: "number|null",
  },

  airbags: {
    count: "number|null",
    driver: "boolean|null",
    passenger: "boolean|null",
    side: "boolean|null",
    curtain: "boolean|null",
    knee: "boolean|null",
  },

  driverAssistance: {
    adas: "boolean|null",
    level: "number|null",
    adaptiveCruiseControl: "boolean|null",
    laneKeepAssist: "boolean|null",
    laneDepartureWarning: "boolean|null",
    autonomousEmergencyBraking: "boolean|null",
    blindSpotMonitoring: "boolean|null",
    rearCrossTrafficAlert: "boolean|null",
    trafficSignRecognition: "boolean|null",
  },

  activeSafety: {
    abs: "boolean|null",
    esc: "boolean|null",
    tractionControl: "boolean|null",
    hillStartAssist: "boolean|null",
    tyrePressureMonitoring: "boolean|null",
  },

  parkingSafety: {
    rearCamera: "boolean|null",
    surroundViewCamera: "boolean|null",
    frontParkingSensors: "boolean|null",
    rearParkingSensors: "boolean|null",
  },

  sourceIds: ["string"],

  verifiedAt: "ISO-8601 datetime|null",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};