export const MEDIA_SCHEMA = {
  entityType: "media",

  id: "string",

  type:
    "image|video|document|gallery",

  url: "string",

  provider:
    "cloudinary|official|other",

  publicId: "string|null",

  vehicleId: "string|null",
  variantId: "string|null",

  role:
    "primary|gallery|thumbnail|logo|other",

  alt: "string|null",

  sourceId: "string|null",

  status:
    "active|archived",

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
