/**
 * EVInsights — Variant Data Contract
 *
 * A vehicle can have multiple variants.
 * Variant-level pricing and specifications are handled separately.
 */

export const VARIANT_SCHEMA = {
  id: "string",

  vehicleId: "string",

  name: "string",

  slug: "string",

  code: "string|null",

  status: "active|discontinued|upcoming",

  batteryPackId: "string|null",

  motorConfigurationId: "string|null",

  drivetrain: "fwd|rwd|awd|4wd|other|null",

  markets: ["string"],

  sourceIds: ["string"],

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};