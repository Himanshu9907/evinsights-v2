/**
 * EVInsights — Performance Specification Contract
 */

export const PERFORMANCE_SCHEMA = {
  id: "string",

  variantId: "string",

  motor: {
    type: "string|null",
    configuration: "string|null",
    motorCount: "number|null",
  },

  power: {
    maximumKw: "number|null",
    maximumHp: "number|null",
  },

  torque: {
    maximumNm: "number|null",
  },

  acceleration: {
    zeroTo100KmhSeconds: "number|null",
    zeroTo60MphSeconds: "number|null",
  },

  topSpeed: {
    value: "number|null",
    unit: "km/h|mph",
  },

  drivetrain: "fwd|rwd|awd|4wd|other|null",

  driveModes: ["string"],

  regenerativeBraking: {
    available: "boolean|null",
    levels: "number|null",
  },

  sourceIds: ["string"],

  verifiedAt: "ISO-8601 datetime|null",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};