// export const VEHICLE_SCHEMA = {
//   entityType: "vehicle",

//   id: "string",
//   brandId: "string",
//   generationId: "string|null",

//   name: "string",
//   slug: "string",

//   vehicleType:
//     "car|suv|sedan|hatchback|mpv|pickup|van|other",

//   bodyType: "string|null",

//   status:
//     "active|discontinued|upcoming",

//   launchDate: "ISO-8601 date|null",

//   markets: ["string"],

//   description: "string|null",

//   primaryImage: {
//     mediaId: "string|null"
//   },

//   variantIds: ["string"],

//   specificationIds: ["string"],
//   chargingIds: ["string"],
//   pricingIds: ["string"],
//   featureIds: ["string"],
//   availabilityIds: ["string"],
//   mediaIds: ["string"],
//   contentIds: ["string"],

//   sourceIds: ["string"],

//   verification: {
//     status: "pending|approved|rejected",
//     lastVerifiedAt: "ISO-8601 datetime|null"
//   },

//   createdAt: "ISO-8601 datetime",
//   updatedAt: "ISO-8601 datetime"
// };


export const VEHICLE_SCHEMA = {
  entityType: "vehicle",

  id: "string",

  type: "vehicle",

  identity: {
    name: "string",
    slug: "string",
    brandId: "string",
    generationId: "string|null",
  },

  classification: {
    bodyType: "string|null",
    segment: "string|null",
    vehicleType: "electric|hybrid|fuel|other",
  },

  status: {
    availability:
      "active|inactive|unknown",

    lifecycle:
      "current|upcoming|discontinued|unknown",
  },

  markets: ["string"],

  variantIds: ["string"],

  specificationIds: {
    battery: ["string"],
    performance: ["string"],
    dimensions: ["string"],
    safety: ["string"],
    features: ["string"],
  },

  chargingIds: ["string"],

  pricingIds: ["string"],

  mediaIds: ["string"],

  sourceIds: ["string"],

  contentIds: ["string"],

  metadata: {
    featured: "boolean",
    searchable: "boolean",
  },

  verification: {
    status:
      "pending|approved|rejected",

    lastVerifiedAt:
      "ISO-8601 datetime|null",
  },

  createdAt:
    "ISO-8601 datetime",

  updatedAt:
    "ISO-8601 datetime",
};