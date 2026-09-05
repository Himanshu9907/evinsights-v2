/**
 * EVInsights Auto Importer
 * Import Preview Module
 *
 * This module displays a safe preview of a CanonicalVehicle
 * before any database operation is performed.
 *
 * IMPORTANT:
 * - No database connection
 * - No INSERT
 * - No UPDATE
 * - No DELETE
 */

import {
  calculateCompleteness,
  validateCanonicalVehicle
} from "./validate.mjs";


const DIVIDER =
  "============================================================";


/**
 * Safely returns a display value.
 */
function display(value, fallback = "N/A") {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return fallback;
  }

  return String(value);
}


/**
 * Formats a number using Indian locale.
 */
function formatIndianNumber(value) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return null;
  }

  return new Intl.NumberFormat("en-IN").format(value);
}


/**
 * Formats INR price.
 */
function formatPrice(amount, currencySymbol = "₹") {
  if (
    typeof amount !== "number" ||
    !Number.isFinite(amount)
  ) {
    return "N/A";
  }

  return `${currencySymbol}${formatIndianNumber(amount)}`;
}


/**
 * Returns battery information.
 */
function getBattery(vehicle) {
  return (
    vehicle.payload?.batteryCapacityKwh ??
    vehicle.specifications?.battery?.capacityKwh ??
    vehicle.specifications?.battery?.batteryCapacity ??
    null
  );
}


/**
 * Returns range information.
 */
function getRange(vehicle) {
  return (
    vehicle.payload?.rangeKm ??
    vehicle.specifications?.battery?.rangeKm ??
    vehicle.specifications?.performance?.rangeKm ??
    null
  );
}


/**
 * Extracts minimum and maximum price
 * from all variants.
 */
function getPriceRange(vehicle) {
  const prices = [];

  if (!Array.isArray(vehicle.variants)) {
    return {
      min: null,
      max: null,
      currencySymbol:
        vehicle.market?.primary?.currencySymbol || "₹"
    };
  }

  for (const variant of vehicle.variants) {
    if (!Array.isArray(variant.pricing)) {
      continue;
    }

    for (const pricing of variant.pricing) {
      if (
        typeof pricing.amount === "number" &&
        Number.isFinite(pricing.amount)
      ) {
        prices.push(pricing.amount);
      }
    }
  }

  const currencySymbol =
    vehicle.market?.primary?.currencySymbol || "₹";

  if (prices.length === 0) {
    return {
      min: null,
      max: null,
      currencySymbol
    };
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    currencySymbol
  };
}


/**
 * Formats price range.
 */
function formatPriceRange(vehicle) {
  const {
    min,
    max,
    currencySymbol
  } = getPriceRange(vehicle);

  if (min === null) {
    return "N/A";
  }

  if (min === max) {
    return formatPrice(min, currencySymbol);
  }

  return `${formatPrice(min, currencySymbol)} - ${formatPrice(
    max,
    currencySymbol
  )}`;
}


/**
 * Prints a labeled row.
 */
function printRow(label, value) {
  console.log(
    `${label.padEnd(24, " ")} ${display(value)}`
  );
}


/**
 * Prints validation errors.
 */
function printErrors(errors = []) {
  if (!errors.length) {
    console.log("None");
    return;
  }

  errors.forEach((error, index) => {
    console.log(
      `  ${index + 1}. [${error.field}] ${error.message}`
    );
  });
}


/**
 * Prints validation warnings.
 */
function printWarnings(warnings = []) {
  if (!warnings.length) {
    console.log("None");
    return;
  }

  warnings.forEach((warning, index) => {
    console.log(
      `  ${index + 1}. [${warning.field}] ${warning.message}`
    );
  });
}


/**
 * Creates a structured preview object.
 *
 * Useful for:
 * - terminal output
 * - JSON logs
 * - future admin dashboard
 */
export function createImportPreview(vehicle, validation = null) {
  const result =
    validation || validateCanonicalVehicle(vehicle);

  const completeness =
    calculateCompleteness(vehicle);

  const priceRange =
    getPriceRange(vehicle);

  return {
    vehicle: {
      id: vehicle.identity?.id || null,

      name: vehicle.identity?.name || null,

      slug: vehicle.identity?.slug || null,

      brand: vehicle.identity?.brand?.name || null
    },

    status:
      vehicle.status?.value || "unknown",

    classification: {
      fuelType:
        vehicle.classification?.fuelType || null,

      vehicleType:
        vehicle.classification?.vehicleType || null,

      bodyType:
        vehicle.classification?.bodyType || null,

      seatingCapacity:
        vehicle.classification?.seatingCapacity || null
    },

    specifications: {
      batteryKwh: getBattery(vehicle),

      rangeKm: getRange(vehicle)
    },

    variants: {
      count: Array.isArray(vehicle.variants)
        ? vehicle.variants.length
        : 0
    },

    pricing: {
      min: priceRange.min,

      max: priceRange.max,

      currencySymbol:
        priceRange.currencySymbol
    },

    media: {
      count: Array.isArray(vehicle.media)
        ? vehicle.media.length
        : 0
    },

    sources: {
      count: Array.isArray(vehicle.sources)
        ? vehicle.sources.length
        : 0
    },

    completeness,

    validation: {
      valid: result.valid,

      errorCount: result.errors.length,

      warningCount: result.warnings.length,

      errors: result.errors,

      warnings: result.warnings
    },

    database: {
      mode:
        vehicle.metadata?.importMode ||
        "safe-merge",

      existingRecordProtection:
        vehicle.metadata?.existingRecordProtection === true,

      deleteAllowed:
        vehicle.metadata?.allowDelete === true,

      dryRun: true
    }
  };
}


/**
 * Prints the complete import preview
 * to the terminal.
 */
export function printImportPreview(
  vehicle,
  validation = null
) {
  const preview =
    createImportPreview(vehicle, validation);

  console.log("\n");

  console.log(DIVIDER);
  console.log("                    AUTO IMPORT PREVIEW");
  console.log(DIVIDER);

  console.log("\nVEHICLE");
  console.log("------------------------------------------------------------");

  printRow(
    "Name:",
    preview.vehicle.name
  );

  printRow(
    "Slug:",
    preview.vehicle.slug
  );

  printRow(
    "Brand:",
    preview.vehicle.brand
  );

  printRow(
    "Vehicle ID:",
    preview.vehicle.id
  );


  console.log("\nCLASSIFICATION");
  console.log("------------------------------------------------------------");

  printRow(
    "Fuel Type:",
    preview.classification.fuelType
  );

  printRow(
    "Vehicle Type:",
    preview.classification.vehicleType
  );

  printRow(
    "Body Type:",
    preview.classification.bodyType
  );

  printRow(
    "Seating:",
    preview.classification.seatingCapacity
      ? `${preview.classification.seatingCapacity} Seater`
      : "N/A"
  );


  console.log("\nSTATUS");
  console.log("------------------------------------------------------------");

  printRow(
    "Vehicle Status:",
    preview.status
  );


  console.log("\nKEY SPECIFICATIONS");
  console.log("------------------------------------------------------------");

  printRow(
    "Battery:",
    preview.specifications.batteryKwh
      ? `${preview.specifications.batteryKwh} kWh`
      : "N/A"
  );

  printRow(
    "Range:",
    preview.specifications.rangeKm
      ? `${preview.specifications.rangeKm} km`
      : "N/A"
  );


  console.log("\nVARIANTS & PRICING");
  console.log("------------------------------------------------------------");

  printRow(
    "Variants:",
    preview.variants.count
  );

  printRow(
    "Price Range:",
    formatPriceRange(vehicle)
  );


  console.log("\nIMPORT DATA");
  console.log("------------------------------------------------------------");

  printRow(
    "Media Items:",
    preview.media.count
  );

  printRow(
    "Sources:",
    preview.sources.count
  );

  printRow(
    "Completeness:",
    `${preview.completeness}%`
  );


  console.log("\nVALIDATION");
  console.log("------------------------------------------------------------");

  printRow(
    "Status:",
    preview.validation.valid
      ? "PASS"
      : "FAIL"
  );

  printRow(
    "Errors:",
    preview.validation.errorCount
  );

  printRow(
    "Warnings:",
    preview.validation.warningCount
  );


  if (preview.validation.errors.length > 0) {
    console.log("\nVALIDATION ERRORS:");
    printErrors(preview.validation.errors);
  }


  if (preview.validation.warnings.length > 0) {
    console.log("\nVALIDATION WARNINGS:");
    printWarnings(preview.validation.warnings);
  }


  console.log("\nDATABASE SAFETY");
  console.log("------------------------------------------------------------");

  printRow(
    "Mode:",
    preview.database.mode
  );

  printRow(
    "Existing Data:",
    preview.database.existingRecordProtection
      ? "PROTECTED"
      : "NOT PROTECTED"
  );

  printRow(
    "DELETE Operations:",
    preview.database.deleteAllowed
      ? "ENABLED"
      : "DISABLED"
  );

  printRow(
    "Database Action:",
    preview.database.dryRun
      ? "DRY RUN ONLY"
      : "DATABASE WRITE ENABLED"
  );


  console.log("\n");

  console.log(DIVIDER);

  if (preview.validation.valid) {
    console.log(
      "RESULT: VEHICLE PASSED VALIDATION"
    );
  } else {
    console.log(
      "RESULT: VEHICLE FAILED VALIDATION"
    );
  }

  console.log(DIVIDER);

  console.log("\n");

  return preview;
}


/**
 * Prints a compact one-line preview.
 *
 * Useful when importing multiple vehicles.
 */
export function printCompactPreview(
  vehicle,
  validation = null
) {
  const preview =
    createImportPreview(vehicle, validation);

  const status =
    preview.validation.valid
      ? "PASS"
      : "FAIL";

  console.log(
    [
      `[${status}]`,
      preview.vehicle.name || "Unknown Vehicle",
      `| Brand: ${preview.vehicle.brand || "N/A"}`,
      `| Variants: ${preview.variants.count}`,
      `| Completeness: ${preview.completeness}%`
    ].join(" ")
  );

  return preview;
}


/**
 * Returns true when vehicle is safe to continue
 * to the next pipeline stage.
 *
 * Note:
 * This does NOT authorize database writes.
 * It only checks preview-stage readiness.
 */
export function canContinueImport(
  vehicle,
  validation = null
) {
  const result =
    validation || validateCanonicalVehicle(vehicle);

  if (!result.valid) {
    return false;
  }

  if (vehicle.metadata?.allowDelete === true) {
    return false;
  }

  if (
    vehicle.metadata?.existingRecordProtection !== true
  ) {
    return false;
  }

  return true;
}