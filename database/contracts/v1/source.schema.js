export const SOURCE_SCHEMA = {
  entityType: "source",

  id: "string",

  url: "string",
  canonicalUrl: "string|null",

  name: "string",

  type:
    "official|manufacturer|government|regulatory|verifiedNews|automotivePublication|community|unknown",

  trustLevel:
    "highest|medium|low|unknown",

  publisher: "string|null",

  market: "string|null",
  language: "string|null",

  lastFetchedAt: "ISO-8601 datetime|null",

  status:
    "active|inactive|blocked",

  metadata: {},

  createdAt: "ISO-8601 datetime",
  updatedAt: "ISO-8601 datetime"
};
