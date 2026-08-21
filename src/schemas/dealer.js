/**
 * EVInsights — Dealer Data Contract
 *
 * Dealer identity and business information.
 * Customer personal data is NOT stored here.
 */

export const DEALER_SCHEMA = {
  id: "string",

  businessName: "string",

  legalName: "string|null",

  status: "active|inactive|suspended",

  brands: ["string"],

  locations: [
    {
      locationId: "string",

      address: "string|null",

      postalCode: "string|null",

      latitude: "number|null",

      longitude: "number|null",
    },
  ],

  contact: {
    phone: "string|null",

    email: "string|null",

    website: "string|null",
  },

  services: [
    "sales",
    "test_drive",
    "service",
    "finance",
    "insurance",
    "exchange",
  ],

  leadSettings: {
    acceptsLeads: "boolean",

    acceptedIntents: ["string"],

    maxLeadsPerDay: "number|null",
  },

  verification: {
    status: "verified|pending|rejected",

    verifiedAt: "ISO-8601 datetime|null",

    sourceIds: ["string"],
  },

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};