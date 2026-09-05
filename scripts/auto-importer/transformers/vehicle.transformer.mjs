/**
 * EVInsights Auto Importer
 * Generic Vehicle Transformer
 *
 * Converts normalized source data into CanonicalVehicle.
 *
 * This transformer is source-independent.
 *
 * Source-specific extractors should first convert their
 * data into the expected normalized input format.
 */

import {
  createCanonicalVehicle,
  createCanonicalVariant,
  createCanonicalPricing,
  createCanonicalMedia,
  createCanonicalSource
} from "../canonical-vehicle.mjs";

import {
  slugify,
  normalizeVehicleName,
  normalizeFuelType,
  normalizeBodyType,
  normalizeSeatingCapacity,
  normalizeTransmission,
  normalizeDrivetrain,
  normalizeBatteryCapacity,
  normalizeRangeKm,
  normalizePowerKw,
  normalizePowerBhp,
  normalizeTorqueNm,
  normalizeIndianPrice,
  normalizeUrl,
  normalizeVehicleStatus,
  normalizeSpecificationValue,
  uniqueArray,
  removeEmptyValues
} from "../normalize.mjs";


/**
 * Transforms generic raw vehicle data
 * into CanonicalVehicle.
 *
 * Expected input is source-independent.
 *
 * @param {object} raw
 * @param {object} context
 *
 * @returns {object}
 */
export async function transformVehicle(
  raw = {},
  context = {}
) {
  const vehicle =
    createCanonicalVehicle();


  /**
   * =====================================================
   * IDENTITY
   * =====================================================
   */

  const vehicleName =
    normalizeVehicleName(
      raw.name ||
      raw.vehicleName ||
      raw.model
    );

  const brandName =
    normalizeVehicleName(
      raw.brand ||
      raw.brandName
    );

  vehicle.identity.id =
    raw.id || null;

  vehicle.identity.name =
    vehicleName;

  vehicle.identity.model =
    normalizeVehicleName(
      raw.model || vehicleName
    );

//   vehicle.identity.slug =
//     raw.slug ||
//     slugify(
//       [
//         brandName,
//         vehicleName
//       ]
//         .filter(Boolean)
//         .join(" ")
//     );

const normalizedVehicleName =
  vehicleName?.toLowerCase() || "";

const normalizedBrandName =
  brandName?.toLowerCase() || "";

/**
 * Avoid duplicate brand names in slugs.
 *
 * Example:
 *
 * Brand: Toyota
 * Name: Toyota Urban Cruiser EBELLA
 *
 * Wrong:
 * toyota-toyota-urban-cruiser-ebella
 *
 * Correct:
 * toyota-urban-cruiser-ebella
 */
const slugBase =
  normalizedBrandName &&
  normalizedVehicleName.startsWith(
    `${normalizedBrandName} `
  )
    ? vehicleName
    : [
        brandName,
        vehicleName
      ]
        .filter(Boolean)
        .join(" ");

vehicle.identity.slug =
  raw.slug ||
  slugify(slugBase);

  vehicle.identity.brand.id =
    raw.brandId || null;

  vehicle.identity.brand.name =
    brandName;

  vehicle.identity.brand.slug =
    raw.brandSlug ||
    slugify(brandName);

  vehicle.identity.brand.country =
    raw.brandCountry || null;

  vehicle.identity.generationId =
    raw.generationId || null;


  /**
   * =====================================================
   * MARKET
   * =====================================================
   */

  if (Array.isArray(raw.markets)) {
    vehicle.market.ids =
      uniqueArray(raw.markets);
  }

  if (raw.market) {
    vehicle.market.primary = {
      ...vehicle.market.primary,
      ...raw.market
    };
  }


  /**
   * =====================================================
   * CLASSIFICATION
   * =====================================================
   */

  vehicle.classification.fuelType =
    normalizeFuelType(
      raw.fuelType ||
      raw.fuel ||
      "Electric"
    ) || "Electric";

  vehicle.classification.vehicleType =
    normalizeVehicleName(
      raw.vehicleType || "EV"
    );

  vehicle.classification.bodyType =
    normalizeBodyType(
      raw.bodyType
    );

  vehicle.classification.segment =
    normalizeVehicleName(
      raw.segment
    );

  vehicle.classification.seatingCapacity =
    normalizeSeatingCapacity(
      raw.seatingCapacity ||
      raw.seats
    );


  /**
   * =====================================================
   * STATUS
   * =====================================================
   */

  vehicle.status.value =
    normalizeVehicleStatus(
      raw.status
    );

  vehicle.status.launchDate =
    raw.launchDate || null;

  vehicle.status.availability =
    raw.availability || null;


  /**
   * =====================================================
   * PAGE / SEO
   * =====================================================
   */

  vehicle.page.title =
    raw.page?.title ||
    vehicleName ||
    null;

  vehicle.page.subtitle =
    raw.page?.subtitle ||
    null;

  vehicle.page.description =
    raw.description ||
    raw.page?.description ||
    null;

  vehicle.page.seoTitle =
    raw.page?.seoTitle ||
    null;

  vehicle.page.seoDescription =
    raw.page?.seoDescription ||
    null;


  /**
   * =====================================================
   * RATING
   * =====================================================
   */

  if (
    raw.rating !== undefined &&
    raw.rating !== null
  ) {
    vehicle.vehicle.rating =
      Number(raw.rating);
  }

  if (
    raw.reviewCount !== undefined &&
    raw.reviewCount !== null
  ) {
    vehicle.vehicle.reviewCount =
      Number(raw.reviewCount);
  }


  /**
   * =====================================================
   * KEY PAYLOAD
   * =====================================================
   */

  const batteryKwh =
    normalizeBatteryCapacity(
      raw.batteryCapacity ||
      raw.batteryCapacityKwh
    );

  const rangeKm =
    normalizeRangeKm(
      raw.range ||
      raw.rangeKm
    );

  const powerKw =
    normalizePowerKw(
      raw.powerKw
    );

  const powerBhp =
    normalizePowerBhp(
      raw.powerBhp ||
      raw.power
    );

  const torqueNm =
    normalizeTorqueNm(
      raw.torque ||
      raw.torqueNm
    );


  vehicle.payload = {
    ...vehicle.payload,

    name: vehicleName,

    model:
      vehicle.identity.model,

    brand: brandName,

    brandId:
      vehicle.identity.brand.id,

    fuelType:
      vehicle.classification.fuelType,

    bodyType:
      vehicle.classification.bodyType,

    status:
      vehicle.status.value,

    seatingCapacity:
      vehicle.classification.seatingCapacity,

    transmission:
      normalizeTransmission(
        raw.transmission
      ),

    drivetrain:
      normalizeDrivetrain(
        raw.drivetrain
      ),

    batteryCapacity:
      batteryKwh
        ? `${batteryKwh} kWh`
        : null,

    batteryCapacityKwh:
      batteryKwh,

    range:
      rangeKm
        ? `${rangeKm} km`
        : null,

    rangeKm,

    power:
      powerBhp
        ? `${powerBhp} bhp`
        : null,

    powerKw,

    powerBhp,

    torque:
      torqueNm
        ? `${torqueNm} Nm`
        : null,

    torqueNm,

    image:
      normalizeUrl(
        raw.image ||
        raw.imageUrl
      ),

    imageUrl:
      normalizeUrl(
        raw.imageUrl ||
        raw.image
      ),

    rating:
      vehicle.vehicle.rating,

    reviewCount:
      vehicle.vehicle.reviewCount
  };


  /**
   * =====================================================
   * PRICE
   *
   * Vehicle-level price is stored in payload
   * for quick display.
   *
   * Variant pricing is handled separately.
   * =====================================================
   */

  const priceMin =
    normalizeIndianPrice(
      raw.priceMin ||
      raw.startingPrice
    );

  const priceMax =
    normalizeIndianPrice(
      raw.priceMax ||
      raw.maxPrice
    );

  vehicle.payload.priceMin =
    priceMin;

  vehicle.payload.priceMax =
    priceMax;

  vehicle.payload.currency =
    raw.currency ||
    vehicle.market.primary.currencyCode;


  /**
   * =====================================================
   * VARIANTS
   * =====================================================
   */

  if (Array.isArray(raw.variants)) {
    vehicle.variants =
      raw.variants
        .map((rawVariant, index) =>
          transformVariant(
            rawVariant,
            vehicle,
            index
          )
        )
        .filter(Boolean);
  }


  /**
   * =====================================================
   * SPECIFICATIONS
   * =====================================================
   */

  vehicle.specifications.battery =
    transformSpecifications(
      raw.specifications?.battery ||
      raw.batterySpecifications
    );

  vehicle.specifications.performance =
    transformSpecifications(
      raw.specifications?.performance ||
      raw.performanceSpecifications
    );

  vehicle.specifications.dimensions =
    transformSpecifications(
      raw.specifications?.dimensions ||
      raw.dimensionSpecifications
    );

  vehicle.specifications.safety =
    transformSpecifications(
      raw.specifications?.safety ||
      raw.safetySpecifications
    );

  vehicle.specifications.features =
    transformSpecifications(
      raw.specifications?.features ||
      raw.featureSpecifications
    );


  /**
   * Add key battery data when available.
   */

  if (batteryKwh !== null) {
    vehicle.specifications.battery.capacityKwh =
      batteryKwh;
  }

  if (rangeKm !== null) {
    vehicle.specifications.battery.rangeKm =
      rangeKm;
  }

  if (powerKw !== null) {
    vehicle.specifications.performance.powerKw =
      powerKw;
  }

  if (powerBhp !== null) {
    vehicle.specifications.performance.powerBhp =
      powerBhp;
  }

  if (torqueNm !== null) {
    vehicle.specifications.performance.torqueNm =
      torqueNm;
  }


  /**
   * =====================================================
   * CHARGING
   * =====================================================
   */

  if (raw.charging) {
    vehicle.charging = {
      ...vehicle.charging,

      ...transformCharging(
        raw.charging
      )
    };
  }


  /**
   * =====================================================
   * MEDIA
   * =====================================================
   */

  vehicle.media =
    transformMedia(
      raw.media ||
      raw.images ||
      []
    );


  /**
   * Add main image automatically.
   */

  if (
    vehicle.payload.imageUrl &&
    vehicle.media.length === 0
  ) {
    vehicle.media.push(
      createCanonicalMedia({
        type: "image",

        url: vehicle.payload.imageUrl,

        alt:
          `${vehicleName} image`
      })
    );
  }


  /**
   * =====================================================
   * SOURCES
   * =====================================================
   */

  vehicle.sources =
    transformSources(
      raw.sources ||
      []
    );


  /**
   * =====================================================
   * RAW EXTRACTION DATA
   * =====================================================
   */

  vehicle.extracted =
    raw.extracted ||
    {};


  /**
   * =====================================================
   * VERIFICATION
   * =====================================================
   */

  if (raw.verification) {
    vehicle.verification = {
      ...vehicle.verification,

      ...raw.verification
    };
  }


  /**
   * =====================================================
   * METADATA
   * =====================================================
   */

  vehicle.metadata = {
    ...vehicle.metadata,

    importerVersion:
      "1.0",

    importStatus:
      raw.importStatus ||
      "draft",

    sourceType:
      raw.sourceType ||
      "manual",

    sourceName:
      raw.sourceName ||
      null,

    confidence:
      typeof raw.confidence === "number"
        ? raw.confidence
        : 0
  };


  /**
   * =====================================================
   * REMOVE EMPTY VALUES
   *
   * Final cleanup before returning.
   * =====================================================
   */

//   return removeEmptyValues(vehicle);
return vehicle;
}


/**
 * Transforms a single vehicle variant.
 */
function transformVariant(
  rawVariant = {},
  vehicle,
  index
) {
  const variantName =
    normalizeVehicleName(
      rawVariant.name ||
      rawVariant.variantName
    );

  if (!variantName) {
    return null;
  }

  const variant =
    createCanonicalVariant({
      id:
        rawVariant.id || null,

      name:
        variantName,

      slug:
        rawVariant.slug ||
        slugify(
          [
            vehicle.identity.slug,
            variantName
          ]
            .filter(Boolean)
            .join(" ")
        ),

      payload:
        removeEmptyValues({
          ...rawVariant.payload,

          transmission:
            normalizeTransmission(
              rawVariant.transmission
            ),

          batteryCapacityKwh:
            normalizeBatteryCapacity(
              rawVariant.batteryCapacity ||
              rawVariant.batteryCapacityKwh
            ),

          rangeKm:
            normalizeRangeKm(
              rawVariant.range ||
              rawVariant.rangeKm
            )
        })
    });


  /**
   * Variant pricing.
   */

  if (Array.isArray(rawVariant.pricing)) {
    variant.pricing =
      rawVariant.pricing
        .map(price =>
          transformPricing(price)
        )
        .filter(Boolean);
  } else {
    const amount =
      normalizeIndianPrice(
        rawVariant.price ||
        rawVariant.amount
      );

    if (amount !== null) {
      variant.pricing.push(
        createCanonicalPricing({
          amount,

          currencyCode:
            rawVariant.currencyCode ||
            vehicle.market.primary.currencyCode,

          currencySymbol:
            rawVariant.currencySymbol ||
            vehicle.market.primary.currencySymbol
        })
      );
    }
  }

  return variant;
}


/**
 * Transforms a pricing object.
 */
function transformPricing(rawPrice = {}) {
  const amount =
    normalizeIndianPrice(
      rawPrice.amount ||
      rawPrice.price
    );

  if (amount === null) {
    return null;
  }

  return createCanonicalPricing({
    id:
      rawPrice.id || null,

    marketId:
      rawPrice.marketId ||
      "india",

    amount,

    currencyCode:
      rawPrice.currencyCode ||
      "INR",

    currencySymbol:
      rawPrice.currencySymbol ||
      "₹",

    payload:
      rawPrice.payload || {}
  });
}


/**
 * Transforms generic specification object.
 */
function transformSpecifications(
  specifications = {}
) {
  if (
    !specifications ||
    typeof specifications !== "object" ||
    Array.isArray(specifications)
  ) {
    return {};
  }

  const result = {};

  for (
    const [key, value]
    of Object.entries(specifications)
  ) {
    const normalized =
      normalizeSpecificationValue(value);

    if (
      normalized !== null &&
      normalized !== undefined
    ) {
      result[key] = normalized;
    }
  }

  return result;
}


/**
 * Transforms charging information.
 */
function transformCharging(
  rawCharging = {}
) {
  return removeEmptyValues({
    chargingPort:
      rawCharging.chargingPort ||
      rawCharging.port ||
      null,

    portableCharger:
      rawCharging.portableCharger ??
      null,

    wallCharger:
      rawCharging.wallCharger ??
      null,

    ac: {
      supported:
        rawCharging.ac?.supported ??
        null,

      powerKw:
        normalizePowerKw(
          rawCharging.ac?.powerKw ||
          rawCharging.acPowerKw
        ),

      chargingTime:
        rawCharging.ac?.chargingTime ||
        rawCharging.acChargingTime ||
        null,

      connectorType:
        rawCharging.ac?.connectorType ||
        null
    },

    dc: {
      supported:
        rawCharging.dc?.supported ??
        null,

      powerKw:
        normalizePowerKw(
          rawCharging.dc?.powerKw ||
          rawCharging.dcPowerKw
        ),

      chargingTime:
        rawCharging.dc?.chargingTime ||
        rawCharging.dcChargingTime ||
        null,

      connectorType:
        rawCharging.dc?.connectorType ||
        null
    }
  });
}


/**
 * Transforms media array.
 */
function transformMedia(media = []) {
  if (!Array.isArray(media)) {
    return [];
  }

  const seenUrls = new Set();

  return media
    .map((item, index) => {
      const source =
        typeof item === "string"
          ? {
              url: item
            }
          : item;

      const url =
        normalizeUrl(source?.url);

      if (!url) {
        return null;
      }

      if (seenUrls.has(url)) {
        return null;
      }

      seenUrls.add(url);

      return createCanonicalMedia({
        id:
          source.id || null,

        type:
          source.type || "image",

        url,

        alt:
          source.alt ||
          null,

        payload: {
          ...source.payload,

          index
        }
      });
    })
    .filter(Boolean);
}


/**
 * Transforms source information.
 */
function transformSources(sources = []) {
  if (!Array.isArray(sources)) {
    return [];
  }

  return sources
    .map(source => {
      if (
        typeof source === "string"
      ) {
        return createCanonicalSource({
          name: "Unknown Source",

          url: normalizeUrl(source)
        });
      }

      if (
        !source ||
        typeof source !== "object"
      ) {
        return null;
      }

      return createCanonicalSource({
        name:
          source.name ||
          source.sourceName ||
          "Unknown Source",

        type:
          source.type ||
          "other",

        url:
          normalizeUrl(source.url),

        confidence:
          typeof source.confidence === "number"
            ? source.confidence
            : null
      });
    })
    .filter(Boolean);
}