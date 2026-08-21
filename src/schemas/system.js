/**
 * EVInsights — System Data Contract
 *
 * Global application/system configuration.
 * Business data should not be stored here.
 */

export const SYSTEM_SCHEMA = {
  id: "string",

  key: "string",

  value: "unknown",

  type: "string",

  environment: "development|staging|production",

  description: "string|null",

  editable: "boolean",

  sensitive: "boolean",

  version: "number",

  updatedBy: {
    type: "system|admin",
    id: "string|null",
  },

  createdAt: "ISO-8601 datetime",

  updatedAt: "ISO-8601 datetime",
};