// /**
//  * EVInsights Auto Importer
//  * Sources Entry Point
//  */

// export {
//   SOURCE_TYPES,
//   createSourceResult,
//   isValidSourceResult,
//   createSourceError,
//   createSourceWarning
// } from "./source.interface.mjs";


// export {
//   createManualSource,
//   loadManualSource
// } from "./manual.source.mjs";


/**
 * EVInsights Auto Importer
 * Source Registry
 *
 * Central registry for all available source adapters.
 *
 * The registry is responsible for:
 *
 * - Registering source adapters
 * - Finding adapters by name
 * - Finding adapters by type
 * - Listing enabled adapters
 * - Selecting adapters safely
 *
 * It does NOT:
 *
 * - Fetch vehicle data automatically
 * - Transform vehicle data
 * - Validate CanonicalVehicle
 * - Access the database
 */

import {
  isValidSourceAdapter
} from "./source.interface.mjs";

import manualSource from "./manual.source.mjs";


/**
 * Internal source registry.
 */
const sourceRegistry = new Map();


/**
 * Registers a source adapter.
 *
 * @param {object} adapter
 *
 * @returns {object}
 */
export function registerSource(adapter) {
  if (!isValidSourceAdapter(adapter)) {
    throw new Error(
      "Cannot register invalid source adapter."
    );
  }

  const key =
    normalizeSourceKey(adapter.name);

  if (!key) {
    throw new Error(
      "Cannot register source adapter without a valid name."
    );
  }

  sourceRegistry.set(
    key,
    adapter
  );

  return adapter;
}


/**
 * Removes a source adapter from registry.
 *
 * This only removes it from runtime memory.
 *
 * It does NOT delete:
 *
 * - database records
 * - source files
 * - vehicle data
 *
 * @param {string} name
 *
 * @returns {boolean}
 */
export function unregisterSource(name) {
  const key =
    normalizeSourceKey(name);

  if (!key) {
    return false;
  }

  return sourceRegistry.delete(key);
}


/**
 * Gets a source adapter by name.
 *
 * @param {string} name
 *
 * @returns {object|null}
 */
export function getSource(name) {
  const key =
    normalizeSourceKey(name);

  if (!key) {
    return null;
  }

  return sourceRegistry.get(key) || null;
}


/**
 * Gets all registered source adapters.
 *
 * @param {object} options
 *
 * @returns {object[]}
 */
export function getSources(options = {}) {
  let sources =
    Array.from(
      sourceRegistry.values()
    );

  /**
   * Filter enabled sources.
   */
  if (options.enabledOnly === true) {
    sources =
      sources.filter(
        source =>
          source.enabled !== false
      );
  }

  /**
   * Filter by source type.
   */
  if (options.type) {
    sources =
      sources.filter(
        source =>
          source.type === options.type
      );
  }

  /**
   * Sort by priority.
   *
   * Highest priority first.
   */
  return sources.sort(
    (a, b) =>
      (b.priority || 0) -
      (a.priority || 0)
  );
}


/**
 * Gets the highest priority source
 * for a specific source type.
 *
 * @param {string} type
 *
 * @returns {object|null}
 */
export function getPreferredSource(type) {
  const sources =
    getSources({
      type,
      enabledOnly: true
    });

  return sources[0] || null;
}


/**
 * Checks whether a source exists.
 *
 * @param {string} name
 *
 * @returns {boolean}
 */
export function hasSource(name) {
  return Boolean(
    getSource(name)
  );
}


/**
 * Returns lightweight source registry information.
 *
 * Useful for debugging and previews.
 */
export function getSourceRegistrySummary() {
  const sources =
    getSources();

  return {
    total: sources.length,

    enabled:
      sources.filter(
        source =>
          source.enabled !== false
      ).length,

    disabled:
      sources.filter(
        source =>
          source.enabled === false
      ).length,

    sources:
      sources.map(source => ({
        name: source.name,

        type: source.type,

        priority: source.priority || 0,

        enabled:
          source.enabled !== false
      }))
  };
}


/**
 * Clears the runtime registry.
 *
 * IMPORTANT:
 *
 * This only clears adapters from memory.
 *
 * It does NOT:
 *
 * - delete source files
 * - delete database data
 * - delete vehicle records
 *
 * Primarily useful for testing.
 */
export function clearSourceRegistry() {
  sourceRegistry.clear();
}


/**
 * Normalizes source registry keys.
 */
function normalizeSourceKey(name) {
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
 * =========================================================
 * DEFAULT SOURCE REGISTRATION
 * =========================================================
 *
 * Register built-in adapters here.
 *
 * Future adapters can include:
 *
 * - Toyota Official Source
 * - Tata Official Source
 * - Mahindra Official Source
 * - CarDekho Source
 * - Official Brochure Source
 * - Press Release Source
 */


/**
 * Manual source is always available.
 */
registerSource(
  manualSource
);


/**
 * Default export provides direct registry utilities.
 */
const sources = {
  register: registerSource,

  unregister: unregisterSource,

  get: getSource,

  getAll: getSources,

  getPreferred: getPreferredSource,

  has: hasSource,

  summary: getSourceRegistrySummary,

  clear: clearSourceRegistry
};


export default sources;