/**

* EVInsights Auto Importer
* Source Registry
*
* Central registry for all vehicle data source adapters.
*
* Responsibilities:
*
* * Register source adapters
* * Prevent duplicate registrations
* * Retrieve adapters by name
* * List enabled adapters
* * Sort adapters by priority
*
* IMPORTANT:
*
* This module does NOT:
* * fetch vehicle data
* * modify database data
* * execute imports automatically
*
* It only manages source adapter definitions.
  */

import {
isValidSourceAdapter
} from "./source-adapter.mjs";

/**

* Internal adapter storage.
*
* Map key:
*
* normalized adapter name
  */
  const adapters = new Map();

/**

* Normalizes an adapter name for registry lookup.
*
* Examples:
*
* "CarDekho" → "cardekho"
* "Official Toyota" → "official-toyota"
*
* @param {string} name
* @returns {string|null}
  */
  function normalizeAdapterKey(name) {
  if (
  typeof name !== "string" ||
  !name.trim()
  ) {
  return null;
  }

return name
.trim()
.toLowerCase()
.replace(/\s+/g, "-");
}

/**

* Registers a source adapter.
*
* @param {object} adapter
* @param {object} options
* @param {boolean} options.replace
*
* @returns {object}
  */
  export function registerSourceAdapter(
  adapter,
  options = {}
  ) {
  if (!isValidSourceAdapter(adapter)) {
  throw new Error(
  "Cannot register invalid source adapter."
  );
  }

const key =
normalizeAdapterKey(adapter.name);

if (!key) {
throw new Error(
"Source adapter must have a valid name."
);
}

const alreadyExists =
adapters.has(key);

/**

* Prevent accidental adapter replacement.
  */
  if (
  alreadyExists &&
  options.replace !== true
  ) {
  throw new Error(
  `Source adapter already registered: ${adapter.name}`
  );
  }

/**

* Store adapter.
  */
  adapters.set(
  key,
  adapter
  );

return adapter;
}

/**

* Unregisters a source adapter.
*
* This only removes the adapter
* from the in-memory registry.
*
* It does NOT:
*
* * delete source files
* * delete database records
* * modify vehicle data
*
* @param {string} name
*
* @returns {boolean}
  */
  export function unregisterSourceAdapter(
  name
  ) {
  const key =
  normalizeAdapterKey(name);

if (!key) {
return false;
}

return adapters.delete(key);
}

/**

* Retrieves a source adapter by name.
*
* @param {string} name
*
* @returns {object|null}
  */
  export function getSourceAdapter(
  name
  ) {
  const key =
  normalizeAdapterKey(name);

if (!key) {
return null;
}

return adapters.get(key) || null;
}

/**

* Checks whether a source adapter
* is already registered.
*
* @param {string} name
*
* @returns {boolean}
  */
  export function hasSourceAdapter(
  name
  ) {
  const key =
  normalizeAdapterKey(name);

if (!key) {
return false;
}

return adapters.has(key);
}

/**

* Returns all registered source adapters.
*
* @returns {object[]}
  */
  export function getAllSourceAdapters() {
  return Array.from(
  adapters.values()
  );
  }

/**

* Returns only enabled source adapters.
*
* @returns {object[]}
  */
  export function getEnabledSourceAdapters() {
  return getAllSourceAdapters()
  .filter(
  adapter =>
  adapter.enabled !== false
  );
  }

/**

* Returns enabled adapters sorted
* by priority.
*
* Higher priority runs first.
*
* Example:
*
* Official Source → 100
* Official Brochure → 90
* Press Release → 80
* Aggregator → 50
*
* @returns {object[]}
  */
  export function getPrioritizedSourceAdapters() {
  return getEnabledSourceAdapters()
  .sort(
  (a, b) =>
  (b.priority || 0) -
  (a.priority || 0)
  );
  }

/**

* Returns source adapters filtered by type.
*
* Example:
*
* getSourceAdaptersByType("official")
*
* @param {string} type
*
* @returns {object[]}
  */
  export function getSourceAdaptersByType(
  type
  ) {
  if (
  typeof type !== "string" ||
  !type.trim()
  ) {
  return [];
  }

return getAllSourceAdapters()
.filter(
adapter =>
adapter.type === type
);
}

/**

* Returns registry statistics.
*
* Useful for debugging
* and future admin dashboards.
*
* @returns {object}
  */
  export function getSourceRegistryStats() {
  const all =
  getAllSourceAdapters();

const enabled =
getEnabledSourceAdapters();

const disabled =
all.filter(
adapter =>
adapter.enabled === false
);

const types = {};

for (const adapter of all) {
if (!types[adapter.type]) {
types[adapter.type] = 0;
}

```
types[adapter.type]++;
```

}

return {
total: all.length,


enabled: enabled.length,

disabled: disabled.length,

types


};
}

/**

* Clears the entire source registry.
*
* IMPORTANT:
*
* This only clears adapters
* from memory.
*
* It does NOT:
*
* * delete files
* * delete database records
* * modify vehicle data
*
* Intended mainly for:
*
* * tests
* * development
*
* @returns {number}
  */
  export function clearSourceRegistry() {
  const count =
  adapters.size;

adapters.clear();

return count;
}

/**

* Returns a safe registry snapshot.
*
* Useful for debugging.
*
* @returns {object[]}
  */
  export function getSourceRegistrySnapshot() {
  return getAllSourceAdapters()
  .map(adapter => ({
  name: adapter.name,

  type: adapter.type,

  url: adapter.url || null,

  priority:
  adapter.priority || 0,

  enabled:
  adapter.enabled !== false
  }));
  }

/**

* Finds the highest-priority adapter
* for a specific source type.
*
* @param {string} type
*
* @returns {object|null}
  */
  export function getPrimarySourceAdapter(
  type
  ) {
  const matching =
  getSourceAdaptersByType(type)
  .filter(
  adapter =>
  adapter.enabled !== false
  )
  .sort(
  (a, b) =>
  (b.priority || 0) -
  (a.priority || 0)
  );

return matching[0] || null;
}
