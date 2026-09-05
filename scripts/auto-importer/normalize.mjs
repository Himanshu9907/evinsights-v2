/**
 * EVInsights Auto Importer
 * Data Normalization Utilities
 *
 * Raw Source Data
 *      ↓
 * Clean / Typed Values
 *      ↓
 * CanonicalVehicle
 *
 * IMPORTANT:
 * This module never connects to or modifies the database.
 */


/**
 * Returns null for empty/invalid values.
 */
export function normalizeNull(value) {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (
      trimmed === "" ||
      trimmed.toLowerCase() === "n/a" ||
      trimmed.toLowerCase() === "na" ||
      trimmed.toLowerCase() === "null" ||
      trimmed.toLowerCase() === "undefined" ||
      trimmed.toLowerCase() === "-"
    ) {
      return null;
    }

    return trimmed;
  }

  return value;
}


/**
 * Converts a value into a number.
 *
 * Examples:
 * "61.1" → 61.1
 * "543 km" → 543
 * "₹21.99 Lakh" → 21.99 (use normalizePrice for currency)
 */
export function normalizeNumber(value) {
  value = normalizeNull(value);

  if (value === null) {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const match = String(value)
    .replace(/,/g, "")
    .match(/-?\d+(\.\d+)?/);

  if (!match) {
    return null;
  }

  const number = Number(match[0]);

  return Number.isFinite(number) ? number : null;
}


/**
 * Normalizes text for comparisons.
 *
 * Example:
 * " Toyota   Urban Cruiser "
 * → "toyota urban cruiser"
 */
export function normalizeComparableText(value) {
  value = normalizeNull(value);

  if (value === null) {
    return null;
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}


/**
 * Creates a URL-safe slug.
 *
 * Example:
 * Toyota Urban Cruiser EBELLA
 *
 * →
 *
 * toyota-urban-cruiser-ebella
 */
export function slugify(value) {
  value = normalizeNull(value);

  if (!value) {
    return null;
  }

  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}


/**
 * Normalizes vehicle name spacing.
 */
export function normalizeVehicleName(value) {
  value = normalizeNull(value);

  if (!value) {
    return null;
  }

  return String(value)
    .trim()
    .replace(/\s+/g, " ");
}


/**
 * Converts common yes/no values into boolean.
 */
export function normalizeBoolean(value) {
  value = normalizeNull(value);

  if (value === null) {
    return null;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    if (value === 1) return true;
    if (value === 0) return false;
  }

  const normalized = String(value).trim().toLowerCase();

  const trueValues = [
    "yes",
    "true",
    "available",
    "standard",
    "included",
    "1"
  ];

  const falseValues = [
    "no",
    "false",
    "not available",
    "not available",
    "optional",
    "0"
  ];

  if (trueValues.includes(normalized)) {
    return true;
  }

  if (falseValues.includes(normalized)) {
    return false;
  }

  return null;
}


/**
 * Normalizes battery capacity into kWh.
 *
 * Examples:
 * "61.1 kWh" → 61.1
 * "49 kWh" → 49
 */
export function normalizeBatteryCapacity(value) {
  const number = normalizeNumber(value);

  if (number === null || number <= 0) {
    return null;
  }

  return number;
}


/**
 * Normalizes range into kilometers.
 *
 * Examples:
 * "543 km" → 543
 * "500 KM" → 500
 */
export function normalizeRangeKm(value) {
  const number = normalizeNumber(value);

  if (number === null || number <= 0) {
    return null;
  }

  return Math.round(number);
}


/**
 * Normalizes power into kW.
 */
export function normalizePowerKw(value) {
  const number = normalizeNumber(value);

  if (number === null || number < 0) {
    return null;
  }

  return number;
}


/**
 * Normalizes power into BHP.
 */
export function normalizePowerBhp(value) {
  const number = normalizeNumber(value);

  if (number === null || number < 0) {
    return null;
  }

  return number;
}


/**
 * Converts kW to BHP.
 */
export function kwToBhp(kw) {
  if (typeof kw !== "number" || !Number.isFinite(kw)) {
    return null;
  }

  return Number((kw * 1.34102).toFixed(2));
}


/**
 * Converts BHP to kW.
 */
export function bhpToKw(bhp) {
  if (typeof bhp !== "number" || !Number.isFinite(bhp)) {
    return null;
  }

  return Number((bhp / 1.34102).toFixed(2));
}


/**
 * Normalizes torque into Nm.
 *
 * Example:
 * "215 Nm" → 215
 */
export function normalizeTorqueNm(value) {
  const number = normalizeNumber(value);

  if (number === null || number < 0) {
    return null;
  }

  return number;
}


/**
 * Converts Indian price formats into rupees.
 *
 * Examples:
 *
 * ₹21.99 Lakh → 2199000
 * ₹1.25 Crore → 12500000
 * ₹21,99,000 → 2199000
 * 2199000 → 2199000
 */
export function normalizeIndianPrice(value) {
  value = normalizeNull(value);

  if (value === null) {
    return null;
  }

  if (typeof value === "number") {
    return Math.round(value);
  }

  const text = String(value)
    .replace(/₹/g, "")
    .replace(/,/g, "")
    .trim()
    .toLowerCase();

  const numberMatch = text.match(/\d+(\.\d+)?/);

  if (!numberMatch) {
    return null;
  }

  const number = Number(numberMatch[0]);

  if (!Number.isFinite(number)) {
    return null;
  }

  if (text.includes("crore") || text.includes("cr")) {
    return Math.round(number * 10000000);
  }

  if (text.includes("lakh") || text.includes("lac")) {
    return Math.round(number * 100000);
  }

  return Math.round(number);
}


/**
 * Normalizes seating capacity.
 *
 * "5 Seater" → 5
 */
export function normalizeSeatingCapacity(value) {
  const number = normalizeNumber(value);

  if (number === null || number <= 0) {
    return null;
  }

  return Math.round(number);
}


/**
 * Normalizes dimensions into millimeters.
 */
export function normalizeMm(value) {
  const number = normalizeNumber(value);

  if (number === null || number <= 0) {
    return null;
  }

  return Math.round(number);
}


/**
 * Normalizes weight into kilograms.
 */
export function normalizeKg(value) {
  const number = normalizeNumber(value);

  if (number === null || number <= 0) {
    return null;
  }

  return Math.round(number);
}


/**
 * Normalizes litres.
 */
export function normalizeLitres(value) {
  const number = normalizeNumber(value);

  if (number === null || number < 0) {
    return null;
  }

  return number;
}


/**
 * Normalizes vehicle status.
 */
export function normalizeVehicleStatus(value) {
  value = normalizeComparableText(value);

  if (!value) {
    return "unknown";
  }

  if (
    value.includes("upcoming") ||
    value.includes("expected")
  ) {
    return "upcoming";
  }

  if (
    value.includes("launched") ||
    value.includes("launch")
  ) {
    return "launched";
  }

  if (
    value.includes("available") ||
    value.includes("on sale")
  ) {
    return "available";
  }

  if (
    value.includes("discontinued")
  ) {
    return "discontinued";
  }

  return "unknown";
}


/**
 * Normalizes fuel type.
 */
export function normalizeFuelType(value) {
  value = normalizeComparableText(value);

  if (!value) {
    return null;
  }

  if (
    value.includes("electric") ||
    value === "ev"
  ) {
    return "Electric";
  }

  if (value.includes("hybrid")) {
    return "Hybrid";
  }

  if (value.includes("petrol") || value.includes("gasoline")) {
    return "Petrol";
  }

  if (value.includes("diesel")) {
    return "Diesel";
  }

  return normalizeVehicleName(value);
}


/**
 * Normalizes transmission.
 */
export function normalizeTransmission(value) {
  value = normalizeComparableText(value);

  if (!value) {
    return null;
  }

  if (
    value.includes("automatic") ||
    value.includes("single speed")
  ) {
    return "Automatic";
  }

  if (value.includes("manual")) {
    return "Manual";
  }

  return normalizeVehicleName(value);
}


/**
 * Normalizes drivetrain.
 */
export function normalizeDrivetrain(value) {
  value = normalizeComparableText(value);

  if (!value) {
    return null;
  }

  const map = {
    "fwd": "FWD",
    "front wheel drive": "FWD",

    "rwd": "RWD",
    "rear wheel drive": "RWD",

    "awd": "AWD",
    "all wheel drive": "AWD",

    "4wd": "4WD",
    "four wheel drive": "4WD"
  };

  return map[value] || normalizeVehicleName(value);
}


/**
 * Normalizes body type.
 */
export function normalizeBodyType(value) {
  value = normalizeComparableText(value);

  if (!value) {
    return null;
  }

  const bodyTypes = {
    suv: "SUV",
    "compact suv": "SUV",
    "midsize suv": "SUV",

    sedan: "Sedan",

    hatchback: "Hatchback",

    coupe: "Coupe",

    mpv: "MPV",

    muv: "MUV",

    crossover: "Crossover",

    pickup: "Pickup"
  };

  return bodyTypes[value] || normalizeVehicleName(value);
}


/**
 * Normalizes an image URL.
 *
 * Rejects obvious invalid values.
 */
export function normalizeUrl(value) {
  value = normalizeNull(value);

  if (!value) {
    return null;
  }

  try {
    const url = new URL(String(value));

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}


/**
 * Removes duplicate items from an array.
 */
export function uniqueArray(values = []) {
  if (!Array.isArray(values)) {
    return [];
  }

  return [
    ...new Set(
      values
        .map(normalizeNull)
        .filter(Boolean)
    )
  ];
}


/**
 * Normalizes a generic specification value.
 *
 * Preserves strings when numeric conversion is not appropriate.
 */
export function normalizeSpecificationValue(value) {
  value = normalizeNull(value);

  if (value === null) {
    return null;
  }

  if (typeof value === "string") {
    return value.replace(/\s+/g, " ").trim();
  }

  return value;
}


/**
 * Removes null and undefined values recursively.
 *
 * IMPORTANT:
 * false and 0 are preserved.
 */
export function removeEmptyValues(value) {
  if (Array.isArray(value)) {
    return value
      .map(removeEmptyValues)
      .filter(
        item =>
          item !== null &&
          item !== undefined
      );
  }

  if (
    value &&
    typeof value === "object" &&
    !(value instanceof Date)
  ) {
    const result = {};

    for (const [key, child] of Object.entries(value)) {
      const cleaned = removeEmptyValues(child);

      if (
        cleaned !== null &&
        cleaned !== undefined &&
        !(
          typeof cleaned === "object" &&
          !Array.isArray(cleaned) &&
          Object.keys(cleaned).length === 0
        )
      ) {
        result[key] = cleaned;
      }
    }

    return result;
  }

  return value;
}