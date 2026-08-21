/**
 * EVInsights — Location Data Contract
 *
 * Global geographic hierarchy:
 *
 * Country
 *   ↓
 * Region / State / Province
 *   ↓
 * City
 *
 * Pricing and market data will reference these IDs.
 */

export const LOCATION_SCHEMA = {
  id: "string",

  type: "country|region|state|province|city",

  name: "string",

  slug: "string",

  countryCode: "string",

  parentId: "string|null",

  timezone: "string|null",

  currency: "string|null",

  currencySymbol: "string|null",

  status: "active|inactive",

  sourceIds: ["string"],

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};