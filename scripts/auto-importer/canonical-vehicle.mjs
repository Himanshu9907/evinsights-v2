/**
 * EVInsights Auto Importer
 * Canonical Vehicle Schema
 *
 * This module defines the source-independent vehicle format used by
 * the Auto Importer pipeline.
 *
 * Pipeline:
 * Source → Raw Data → CanonicalVehicle → Validation → Safe DB Sync
 *
 * IMPORTANT:
 * This module does not connect to the database.
 * This module does not modify existing data.
 */

export const CANONICAL_SCHEMA_VERSION = "1.0";


/**
 * Default market configuration.
 *
 * Auto Importer v1 is focused on the Indian EV market.
 */
export const DEFAULT_MARKET = Object.freeze({
  id: "india",
  name: "India",
  countryCode: "IN",
  currencyCode: "INR",
  currencySymbol: "₹"
});


/**
 * Supported specification categories.
 *
 * These must remain compatible with the existing
 * PostgreSQL specifications table.
 */
export const SPECIFICATION_TYPES = Object.freeze([
  "battery",
  "performance",
  "dimensions",
  "safety",
  "features"
]);


/**
 * Supported vehicle lifecycle statuses.
 */
export const VEHICLE_STATUSES = Object.freeze([
  "upcoming",
  "launched",
  "available",
  "discontinued",
  "unknown"
]);


/**
 * Supported import statuses.
 */
export const IMPORT_STATUSES = Object.freeze([
  "draft",
  "needs_review",
  "verified",
  "published",
  "failed"
]);


/**
 * Supported source types.
 */
export const SOURCE_TYPES = Object.freeze([
  "manual",
  "official",
  "official_brochure",
  "press_release",
  "aggregator",
  "review",
  "other"
]);


/**
 * Supported media types.
 */
export const MEDIA_TYPES = Object.freeze([
  "image",
  "video",
  "brochure",
  "document"
]);


/**
 * Creates an empty canonical vehicle object.
 *
 * Every extractor and normalizer should eventually produce
 * this exact structure.
 *
 * @returns {object}
 */
export function createCanonicalVehicle() {
  const now = new Date().toISOString();

  return {
    // =====================================================
    // SCHEMA
    // =====================================================

    schemaVersion: CANONICAL_SCHEMA_VERSION,


    // =====================================================
    // IDENTITY
    // =====================================================

    identity: {
      id: null,

      name: null,

      slug: null,

      model: null,

      brand: {
        id: null,

        name: null,

        slug: null,

        country: null
      },

      generationId: null
    },


    // =====================================================
    // MARKET
    // =====================================================

    market: {
      ids: [DEFAULT_MARKET.id],

      primary: {
        ...DEFAULT_MARKET
      }
    },


    // =====================================================
    // CLASSIFICATION
    // =====================================================

    classification: {
      fuelType: "Electric",

      vehicleType: "EV",

      bodyType: null,

      segment: null,

      seatingCapacity: null
    },


    // =====================================================
    // VEHICLE STATUS
    // =====================================================

    status: {
      value: "unknown",

      launchDate: null,

      availability: null
    },


    // =====================================================
    // PAGE DATA
    //
    // Compatible with vehicles.page JSON structure.
    // =====================================================

    page: {
      title: null,

      subtitle: null,

      description: null,

      seoTitle: null,

      seoDescription: null
    },


    // =====================================================
    // VEHICLE SUMMARY
    // =====================================================

    vehicle: {
      rating: null,

      reviewCount: 0
    },


    // =====================================================
    // RAW / EXTRACTED DATA
    //
    // Preserves normalized source extraction information.
    // =====================================================

    extracted: {},


    // =====================================================
    // VERIFICATION
    // =====================================================

    verification: {
      status: "unverified",

      verifiedAt: null,

      verifiedBy: null,

      notes: []
    },


    // =====================================================
    // METADATA
    // =====================================================

    metadata: {
      importerVersion: "1.0",

      importStatus: "draft",

      importMode: "safe-merge",

      existingRecordProtection: true,

      allowDelete: false,

      importedAt: now,

      updatedAt: now,

      lastSourceCheck: null,

      completeness: 0,

      confidence: 0
    },


    // =====================================================
    // CANONICAL PAYLOAD
    //
    // This becomes the main flexible data container used
    // for compatibility with the existing vehicle payload.
    // =====================================================

    payload: {
      name: null,

      model: null,

      brand: null,

      brandId: null,

      fuelType: "Electric",

      bodyType: null,

      status: null,

      seatingCapacity: null,

      transmission: null,

      drivetrain: null,

      priceMin: null,

      priceMax: null,

      currency: "INR",

      batteryCapacity: null,

      batteryCapacityKwh: null,

      range: null,

      rangeKm: null,

      power: null,

      powerKw: null,

      powerBhp: null,

      torque: null,

      torqueNm: null,

      image: null,

      imageUrl: null,

      rating: null,

      reviewCount: 0
    },


    // =====================================================
    // VARIANTS
    // =====================================================

    variants: [],


    // =====================================================
    // SPECIFICATIONS
    //
    // These map directly to specification types:
    //
    // battery
    // performance
    // dimensions
    // safety
    // features
    // =====================================================

    specifications: {
      battery: {},

      performance: {},

      dimensions: {},

      safety: {},

      features: {}
    },


    // =====================================================
    // CHARGING
    // =====================================================

    charging: {
      ac: {
        supported: null,

        powerKw: null,

        chargingTime: null,

        connectorType: null
      },

      dc: {
        supported: null,

        powerKw: null,

        chargingTime: null,

        connectorType: null
      },

      chargingPort: null,

      portableCharger: null,

      wallCharger: null
    },


    // =====================================================
    // MEDIA
    // =====================================================

    media: [],


    // =====================================================
    // SOURCES
    // =====================================================

    sources: []
  };
}


/**
 * Creates a canonical variant object.
 *
 * @param {object} overrides
 * @returns {object}
 */
export function createCanonicalVariant(overrides = {}) {
  return {
    id: null,

    name: null,

    slug: null,

    payload: {},

    pricing: [],

    ...overrides
  };
}


/**
 * Creates a canonical pricing object.
 *
 * @param {object} overrides
 * @returns {object}
 */
export function createCanonicalPricing(overrides = {}) {
  return {
    id: null,

    marketId: DEFAULT_MARKET.id,

    amount: null,

    currencyCode: DEFAULT_MARKET.currencyCode,

    currencySymbol: DEFAULT_MARKET.currencySymbol,

    payload: {},

    ...overrides
  };
}


/**
 * Creates a canonical media object.
 *
 * @param {object} overrides
 * @returns {object}
 */
export function createCanonicalMedia(overrides = {}) {
  return {
    id: null,

    type: "image",

    url: null,

    alt: null,

    payload: {},

    ...overrides
  };
}


/**
 * Creates a canonical source object.
 *
 * @param {object} overrides
 * @returns {object}
 */
export function createCanonicalSource(overrides = {}) {
  return {
    name: null,

    type: "other",

    url: null,

    accessedAt: new Date().toISOString(),

    confidence: null,

    ...overrides
  };
}


/**
 * Checks whether an object appears to be a CanonicalVehicle.
 *
 * This is intentionally lightweight.
 * Full validation will be handled by the validator module.
 *
 * @param {object} vehicle
 * @returns {boolean}
 */
export function isCanonicalVehicle(vehicle) {
  if (!vehicle || typeof vehicle !== "object") {
    return false;
  }

  return Boolean(
    vehicle.schemaVersion &&
    vehicle.identity &&
    vehicle.market &&
    vehicle.classification &&
    vehicle.payload &&
    vehicle.specifications &&
    vehicle.metadata
  );
}