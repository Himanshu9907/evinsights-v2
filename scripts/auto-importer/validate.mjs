/**
 * EVInsights Auto Importer
 * Canonical Vehicle Validator
 *
 * IMPORTANT:
 * This module does not modify the database.
 *
 * It only validates CanonicalVehicle objects before
 * they are allowed to enter the preview or database layer.
 */

import {
  CANONICAL_SCHEMA_VERSION,
  SPECIFICATION_TYPES,
  VEHICLE_STATUSES,
  IMPORT_STATUSES,
  SOURCE_TYPES,
  MEDIA_TYPES,
  isCanonicalVehicle
} from "./canonical-vehicle.mjs";


/**
 * Creates a validation result object.
 */
function createValidationResult() {
  return {
    valid: true,

    errors: [],

    warnings: [],

    info: [],

    stats: {
      errors: 0,
      warnings: 0
    }
  };
}


/**
 * Adds an error.
 */
function addError(result, field, message, value = null) {
  result.valid = false;

  result.errors.push({
    field,
    message,
    value
  });

  result.stats.errors += 1;
}


/**
 * Adds a warning.
 */
function addWarning(result, field, message, value = null) {
  result.warnings.push({
    field,
    message,
    value
  });

  result.stats.warnings += 1;
}


/**
 * Adds informational validation output.
 */
function addInfo(result, field, message, value = null) {
  result.info.push({
    field,
    message,
    value
  });
}


/**
 * Checks whether a value is a valid non-empty string.
 */
function isNonEmptyString(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}


/**
 * Validates a slug.
 */
function isValidSlug(value) {
  if (!isNonEmptyString(value)) {
    return false;
  }

  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}


/**
 * Validates a URL.
 */
function isValidUrl(value) {
  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}


/**
 * Validates CanonicalVehicle identity.
 */
function validateIdentity(vehicle, result) {
  const identity = vehicle.identity || {};

  if (!isNonEmptyString(identity.name)) {
    addError(
      result,
      "identity.name",
      "Vehicle name is required."
    );
  }

  if (!isValidSlug(identity.slug)) {
    addError(
      result,
      "identity.slug",
      "Vehicle slug is required and must be URL-safe.",
      identity.slug
    );
  }

  if (!identity.brand || !isNonEmptyString(identity.brand.name)) {
    addError(
      result,
      "identity.brand.name",
      "Brand name is required."
    );
  }

  if (
    identity.brand &&
    identity.brand.slug &&
    !isValidSlug(identity.brand.slug)
  ) {
    addWarning(
      result,
      "identity.brand.slug",
      "Brand slug is not valid.",
      identity.brand.slug
    );
  }

  if (
    identity.name &&
    identity.slug &&
    !identity.slug.includes(
      identity.name
        .toLowerCase()
        .split(" ")[0]
    )
  ) {
    addWarning(
      result,
      "identity.slug",
      "Slug may not correspond to vehicle name."
    );
  }
}


/**
 * Validates market data.
 */
function validateMarket(vehicle, result) {
  const market = vehicle.market || {};

  if (!Array.isArray(market.ids) || market.ids.length === 0) {
    addError(
      result,
      "market.ids",
      "At least one market is required."
    );
  }

  if (!market.primary) {
    addError(
      result,
      "market.primary",
      "Primary market is required."
    );

    return;
  }

  if (!isNonEmptyString(market.primary.id)) {
    addError(
      result,
      "market.primary.id",
      "Primary market ID is required."
    );
  }

  if (!isNonEmptyString(market.primary.currencyCode)) {
    addWarning(
      result,
      "market.primary.currencyCode",
      "Currency code is missing."
    );
  }
}


/**
 * Validates classification.
 */
function validateClassification(vehicle, result) {
  const classification = vehicle.classification || {};

  if (!isNonEmptyString(classification.fuelType)) {
    addError(
      result,
      "classification.fuelType",
      "Fuel type is required."
    );
  }

  if (
    classification.fuelType &&
    classification.fuelType.toLowerCase() !== "electric"
  ) {
    addWarning(
      result,
      "classification.fuelType",
      "Auto Importer is currently configured primarily for EVs.",
      classification.fuelType
    );
  }

  if (!isNonEmptyString(classification.vehicleType)) {
    addWarning(
      result,
      "classification.vehicleType",
      "Vehicle type is missing."
    );
  }

  if (!isNonEmptyString(classification.bodyType)) {
    addWarning(
      result,
      "classification.bodyType",
      "Body type is missing."
    );
  }
}


/**
 * Validates vehicle status.
 */
function validateStatus(vehicle, result) {
  const status = vehicle.status || {};

  if (!status.value) {
    addWarning(
      result,
      "status.value",
      "Vehicle status is missing."
    );

    return;
  }

  if (!VEHICLE_STATUSES.includes(status.value)) {
    addWarning(
      result,
      "status.value",
      "Unknown vehicle status.",
      status.value
    );
  }
}


/**
 * Validates metadata and importer safety rules.
 */
function validateMetadata(vehicle, result) {
  const metadata = vehicle.metadata || {};

  if (
    metadata.importStatus &&
    !IMPORT_STATUSES.includes(metadata.importStatus)
  ) {
    addWarning(
      result,
      "metadata.importStatus",
      "Unknown import status.",
      metadata.importStatus
    );
  }

  /**
   * Critical safety validation.
   */
  if (metadata.allowDelete === true) {
    addError(
      result,
      "metadata.allowDelete",
      "DELETE operations are forbidden in Auto Importer."
    );
  }

  if (metadata.existingRecordProtection !== true) {
    addError(
      result,
      "metadata.existingRecordProtection",
      "Existing record protection must remain enabled."
    );
  }

  if (
    metadata.importMode &&
    metadata.importMode !== "safe-merge"
  ) {
    addWarning(
      result,
      "metadata.importMode",
      "Recommended import mode is safe-merge.",
      metadata.importMode
    );
  }
}


/**
 * Validates variants.
 */
function validateVariants(vehicle, result) {
  const variants = vehicle.variants;

  if (!Array.isArray(variants)) {
    addError(
      result,
      "variants",
      "Variants must be an array."
    );

    return;
  }

  const seenSlugs = new Set();
  const seenNames = new Set();

  variants.forEach((variant, index) => {
    const path = `variants[${index}]`;

    if (!variant || typeof variant !== "object") {
      addError(
        result,
        path,
        "Variant must be an object."
      );

      return;
    }

    if (!isNonEmptyString(variant.name)) {
      addWarning(
        result,
        `${path}.name`,
        "Variant name is missing."
      );
    }

    if (
      variant.slug &&
      !isValidSlug(variant.slug)
    ) {
      addWarning(
        result,
        `${path}.slug`,
        "Variant slug is invalid.",
        variant.slug
      );
    }

    if (variant.slug) {
      if (seenSlugs.has(variant.slug)) {
        addError(
          result,
          `${path}.slug`,
          "Duplicate variant slug detected.",
          variant.slug
        );
      }

      seenSlugs.add(variant.slug);
    }

    if (variant.name) {
      const normalizedName = variant.name
        .trim()
        .toLowerCase();

      if (seenNames.has(normalizedName)) {
        addError(
          result,
          `${path}.name`,
          "Duplicate variant name detected.",
          variant.name
        );
      }

      seenNames.add(normalizedName);
    }

    validateVariantPricing(
      variant,
      index,
      result
    );
  });
}


/**
 * Validates variant pricing.
 */
function validateVariantPricing(
  variant,
  index,
  result
) {
  if (!variant.pricing) {
    return;
  }

  if (!Array.isArray(variant.pricing)) {
    addError(
      result,
      `variants[${index}].pricing`,
      "Variant pricing must be an array."
    );

    return;
  }

  variant.pricing.forEach(
    (price, priceIndex) => {
      const path =
        `variants[${index}].pricing[${priceIndex}]`;

      if (
        price.amount !== null &&
        price.amount !== undefined
      ) {
        if (
          typeof price.amount !== "number" ||
          !Number.isFinite(price.amount) ||
          price.amount < 0
        ) {
          addError(
            result,
            `${path}.amount`,
            "Price amount must be a valid positive number.",
            price.amount
          );
        }
      }

      if (
        price.currencyCode &&
        !/^[A-Z]{3}$/.test(price.currencyCode)
      ) {
        addWarning(
          result,
          `${path}.currencyCode`,
          "Currency code should use ISO 3-letter format.",
          price.currencyCode
        );
      }
    }
  );
}


/**
 * Validates specifications.
 */
function validateSpecifications(vehicle, result) {
  const specifications = vehicle.specifications;

  if (
    !specifications ||
    typeof specifications !== "object"
  ) {
    addError(
      result,
      "specifications",
      "Specifications object is required."
    );

    return;
  }

  for (const type of SPECIFICATION_TYPES) {
    if (!(type in specifications)) {
      addWarning(
        result,
        `specifications.${type}`,
        `Specification category "${type}" is missing.`
      );

      continue;
    }

    const value = specifications[type];

    if (
      value !== null &&
      typeof value !== "object"
    ) {
      addError(
        result,
        `specifications.${type}`,
        "Specification category must be an object."
      );
    }
  }
}


/**
 * Validates charging data.
 */
function validateCharging(vehicle, result) {
  const charging = vehicle.charging;

  if (
    !charging ||
    typeof charging !== "object"
  ) {
    addWarning(
      result,
      "charging",
      "Charging information is missing."
    );

    return;
  }

  if (
    charging.ac &&
    charging.ac.powerKw !== null &&
    charging.ac.powerKw !== undefined &&
    (
      typeof charging.ac.powerKw !== "number" ||
      charging.ac.powerKw < 0
    )
  ) {
    addError(
      result,
      "charging.ac.powerKw",
      "AC charging power must be a valid positive number."
    );
  }

  if (
    charging.dc &&
    charging.dc.powerKw !== null &&
    charging.dc.powerKw !== undefined &&
    (
      typeof charging.dc.powerKw !== "number" ||
      charging.dc.powerKw < 0
    )
  ) {
    addError(
      result,
      "charging.dc.powerKw",
      "DC charging power must be a valid positive number."
    );
  }
}


/**
 * Validates media.
 */
function validateMedia(vehicle, result) {
  if (!Array.isArray(vehicle.media)) {
    addError(
      result,
      "media",
      "Media must be an array."
    );

    return;
  }

  vehicle.media.forEach((media, index) => {
    const path = `media[${index}]`;

    if (!MEDIA_TYPES.includes(media.type)) {
      addWarning(
        result,
        `${path}.type`,
        "Unknown media type.",
        media.type
      );
    }

    if (media.url && !isValidUrl(media.url)) {
      addError(
        result,
        `${path}.url`,
        "Invalid media URL.",
        media.url
      );
    }
  });
}


/**
 * Validates sources.
 */
function validateSources(vehicle, result) {
  if (!Array.isArray(vehicle.sources)) {
    addError(
      result,
      "sources",
      "Sources must be an array."
    );

    return;
  }

  if (vehicle.sources.length === 0) {
    addWarning(
      result,
      "sources",
      "No source information available."
    );

    return;
  }

  vehicle.sources.forEach((source, index) => {
    const path = `sources[${index}]`;

    if (!isNonEmptyString(source.name)) {
      addWarning(
        result,
        `${path}.name`,
        "Source name is missing."
      );
    }

    if (
      source.type &&
      !SOURCE_TYPES.includes(source.type)
    ) {
      addWarning(
        result,
        `${path}.type`,
        "Unknown source type.",
        source.type
      );
    }

    if (
      source.url &&
      !isValidUrl(source.url)
    ) {
      addError(
        result,
        `${path}.url`,
        "Invalid source URL.",
        source.url
      );
    }
  });
}


/**
 * Calculates data completeness.
 *
 * This does not mutate the vehicle.
 */
export function calculateCompleteness(vehicle) {
  const fields = [
    vehicle.identity?.name,
    vehicle.identity?.slug,
    vehicle.identity?.brand?.name,

    vehicle.classification?.fuelType,
    vehicle.classification?.bodyType,

    vehicle.payload?.batteryCapacityKwh,
    vehicle.payload?.rangeKm,

    vehicle.specifications?.battery,
    vehicle.specifications?.performance,

    vehicle.market?.primary?.currencyCode
  ];

  let score = 0;

  for (const field of fields) {
    if (field === null || field === undefined) {
      continue;
    }

    if (
      typeof field === "string" &&
      field.trim() === ""
    ) {
      continue;
    }

    if (
      typeof field === "object" &&
      !Array.isArray(field) &&
      Object.keys(field).length === 0
    ) {
      continue;
    }

    score += 1;
  }

  return Math.round(
    (score / fields.length) * 100
  );
}


/**
 * Main CanonicalVehicle validation function.
 *
 * @param {object} vehicle
 * @returns {{
 *   valid: boolean,
 *   errors: Array,
 *   warnings: Array,
 *   info: Array,
 *   stats: object
 * }}
 */
export function validateCanonicalVehicle(vehicle) {
  const result = createValidationResult();

  /**
   * Basic structure check.
   */
  if (!isCanonicalVehicle(vehicle)) {
    addError(
      result,
      "root",
      "Object is not a valid CanonicalVehicle structure."
    );

    return result;
  }


  /**
   * Schema version check.
   */
  if (
    vehicle.schemaVersion !==
    CANONICAL_SCHEMA_VERSION
  ) {
    addError(
      result,
      "schemaVersion",
      `Unsupported schema version: ${vehicle.schemaVersion}`
    );
  }


  /**
   * Run section validators.
   */
  validateIdentity(vehicle, result);

  validateMarket(vehicle, result);

  validateClassification(vehicle, result);

  validateStatus(vehicle, result);

  validateMetadata(vehicle, result);

  validateVariants(vehicle, result);

  validateSpecifications(vehicle, result);

  validateCharging(vehicle, result);

  validateMedia(vehicle, result);

  validateSources(vehicle, result);


  /**
   * Calculate completeness.
   */
  const completeness =
    calculateCompleteness(vehicle);

  addInfo(
    result,
    "metadata.completeness",
    `Calculated completeness: ${completeness}%`,
    completeness
  );


  return result;
}


/**
 * Throws an error when validation fails.
 *
 * Useful for strict import pipelines.
 */
export function assertValidCanonicalVehicle(vehicle) {
  const result =
    validateCanonicalVehicle(vehicle);

  if (!result.valid) {
    const messages = result.errors
      .map(
        error =>
          `[${error.field}] ${error.message}`
      )
      .join("\n");

    throw new Error(
      `CanonicalVehicle validation failed:\n${messages}`
    );
  }

  return result;
}