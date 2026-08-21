/**
 * EVInsights — Consent Data Contract
 *
 * Stores user consent separately from user identity.
 */

export const CONSENT_SCHEMA = {
  id: "string",

  userId: "string",

  purpose:
    "pricing_request|dealer_contact|marketing|analytics|communication|other",

  granted: "boolean",

  method:
    "checkbox|otp|form|explicit_action|other",

  scope: {
    sharePhone: "boolean",
    shareEmail: "boolean",
    shareLocation: "boolean",
    shareVehicleInterest: "boolean",
  },

  recipient: {
    type: "dealer|evinsights|partner|other",
    recipientId: "string|null",
  },

  ipAddress: "string|null",

  userAgent: "string|null",

  grantedAt: "ISO-8601 datetime|null",

  revokedAt: "ISO-8601 datetime|null",

  version: "string",

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};