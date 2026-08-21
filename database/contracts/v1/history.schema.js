export const HISTORY_SCHEMA = {
  entityType: "history",

  id: "string",

  entityId: "string",
  targetEntityType: "string",

  action:
    "created|updated|published|superseded|archived",

  previousData: "object|null",
  newData: "object|null",

  sourceId: "string|null",

  createdAt: "ISO-8601 datetime"
};
