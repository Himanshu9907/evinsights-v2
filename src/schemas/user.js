/**
 * EVInsights — User Data Contract
 *
 * User identity is kept separate from pricing and vehicle data.
 */

export const USER_SCHEMA = {
  id: "string",

  name: "string|null",

  phone: {
    countryCode: "string|null",
    number: "string|null",
    verified: "boolean",
  },

  email: {
    address: "string|null",
    verified: "boolean",
  },

  locationId: "string|null",

  preferences: {
    interestedVehicleIds: ["string"],
    preferredBudget: {
      min: "number|null",
      max: "number|null",
      currency: "string|null",
    },
  },

  status: "active|blocked|deleted",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};