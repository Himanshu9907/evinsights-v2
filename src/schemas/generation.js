/**
 * EVInsights — Vehicle Generation Data Contract
 */

export const GENERATION_SCHEMA = {
  id: "string",

  vehicleId: "string",

  name: "string",

  generationNumber: "number|null",

  codeName: "string|null",

  type: "generation|facelift|refresh|special_edition",

  launchDate: "ISO-8601 datetime|null",

  endDate: "ISO-8601 datetime|null",

  predecessorId: "string|null",

  successorId: "string|null",

  changes: [
    {
      category:
        "design|battery|performance|technology|safety|charging|other",

      description: "string",

      sourceIds: ["string"],
    },
  ],

  status: "upcoming|active|discontinued",

  sourceIds: ["string"],

  verifiedAt: "ISO-8601 datetime|null",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};