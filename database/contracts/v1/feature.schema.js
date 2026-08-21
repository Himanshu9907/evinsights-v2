export const FEATURE_SCHEMA = {
  entityType: "feature",

  id: "string",

  vehicleId: "string",
  variantId: "string|null",

  category:
    "safety|comfort|technology|interior|exterior|adas|infotainment|other",

  name: "string",
  value: "string|boolean|number|null",

  sourceIds: ["string"],
  evidenceIds: ["string"],

  status: "active|removed",

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
