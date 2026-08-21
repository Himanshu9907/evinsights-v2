/**
 * EVInsights — Vehicle Data Contract
 *
 * Defines the identity-level structure of an EV model.
 *
 * Important:
 * Pricing, variants, specifications, media and sources
 * are stored separately and referenced by vehicleId.
 */

export const VEHICLE_SCHEMA = {
  id: "string",

  brandId: "string",

  generationId: "string|null",

  name: "string",

  slug: "string",

  vehicleType: "car|suv|sedan|hatchback|mpv|pickup|van|other",

  bodyType: "string|null",

  status: "active|discontinued|upcoming",

  launchDate: "ISO-8601 date|null",

  markets: ["string"],

  description: "string|null",

  primaryImage: {
    mediaId: "string|null",
  },

  sourceIds: ["string"],

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};