// import { query } from "../db.js";

// function normalizeVehicle(row) {
//   if (!row) return null;
//   return {
//     ...(row.payload || {}),
//     id: row.id,
//     name: row.name,
//     slug: row.slug,
//     brandId: row.brand_id,
//     generationId: row.generation_id,
//     markets: row.markets || [],
//     classification: row.classification || {},
//     status: row.status || {},
//     page: row.page || {},
//     extracted: row.extracted || {},
//     verification: row.verification || {},
//     metadata: row.metadata || {},
//     rating: row.rating == null ? null : Number(row.rating),
//     reviewCount: row.review_count || 0,
//   };
// }

// export async function getAllVehicles() {
//   const { rows } = await query(`SELECT * FROM vehicles ORDER BY name ASC`);
//   return rows.map(normalizeVehicle);
// }

// export async function getVehicleBySlug(slug) {
//   if (!slug) return null;
//   const { rows } = await query(`SELECT * FROM vehicles WHERE slug = $1 LIMIT 1`, [slug]);
//   return normalizeVehicle(rows[0]);
// }

// export async function getVehicleById(id) {
//   if (!id) return null;
//   const { rows } = await query(`SELECT * FROM vehicles WHERE id = $1 LIMIT 1`, [id]);
//   return normalizeVehicle(rows[0]);
// }


// import { query } from "../db.js";

// /* =========================================================
//    HELPERS
// ========================================================= */

// function safeObject(value) {
//   if (!value || typeof value !== "object" || Array.isArray(value)) {
//     return {};
//   }

//   return value;
// }

// function safeArray(value) {
//   return Array.isArray(value) ? value : [];
// }

// /* =========================================================
//    NORMALIZE VEHICLE
// ========================================================= */

// function normalizeVehicle(row) {
//   if (!row) return null;

//   const payload = safeObject(row.payload);

//   return {
//     ...payload,

//     id: row.id,
//     name: row.name,
//     slug: row.slug,

//     brandId: row.brand_id,
//     generationId: row.generation_id,

//     markets: safeArray(row.markets),

//     classification: safeObject(row.classification),
//     status: safeObject(row.status),
//     page: safeObject(row.page),
//     extracted: safeObject(row.extracted),
//     verification: safeObject(row.verification),
//     metadata: safeObject(row.metadata),

//     rating:
//       row.rating == null
//         ? null
//         : Number(row.rating),

//     reviewCount:
//       row.review_count == null
//         ? 0
//         : Number(row.review_count),

//     createdAt: row.created_at,
//     updatedAt: row.updated_at,
//   };
// }

// /* =========================================================
//    NORMALIZE VARIANT
// ========================================================= */

// function normalizeVariant(row) {
//   if (!row) return null;

//   const payload = safeObject(row.payload);

//   return {
//     ...payload,

//     id: row.id,
//     vehicleId: row.vehicle_id,
//     name: row.name,
//     slug: row.slug,

//     createdAt: row.created_at,
//     updatedAt: row.updated_at,
//   };
// }

// /* =========================================================
//    NORMALIZE PRICING
// ========================================================= */

// function normalizePricing(row) {
//   if (!row) return null;

//   const payload = safeObject(row.payload);

//   return {
//     ...payload,

//     id: row.id,
//     variantId: row.variant_id,
//     marketId: row.market_id,

//     amount:
//       row.amount == null
//         ? null
//         : Number(row.amount),

//     currencyCode: row.currency_code,
//     currencySymbol: row.currency_symbol,

//     createdAt: row.created_at,
//     updatedAt: row.updated_at,
//   };
// }

// /* =========================================================
//    NORMALIZE SPECIFICATION
// ========================================================= */

// function normalizeSpecification(row) {
//   if (!row) return null;

//   const data = safeObject(row.data);
//   const payload = safeObject(row.payload);

//   return {
//     ...payload,
//     ...data,

//     id: row.id,
//     vehicleId: row.vehicle_id,
//     type: row.type,
//   };
// }

// /* =========================================================
//    NORMALIZE CHARGING
// ========================================================= */

// function normalizeCharging(row) {
//   if (!row) return null;

//   const data = safeObject(row.data);
//   const payload = safeObject(row.payload);

//   return {
//     ...payload,
//     ...data,

//     id: row.id,
//     vehicleId: row.vehicle_id,
//   };
// }

// /* =========================================================
//    NORMALIZE MEDIA
// ========================================================= */

// function normalizeMedia(row) {
//   if (!row) return null;

//   const payload = safeObject(row.payload);

//   return {
//     ...payload,

//     id: row.id,
//     vehicleId: row.vehicle_id,
//     type: row.type,
//     url: row.url,
//     alt: row.alt,
//   };
// }

// /* =========================================================
//    BASIC VEHICLES
// ========================================================= */

// export async function getAllVehicles() {
//   const { rows } = await query(`
//     SELECT *
//     FROM vehicles
//     ORDER BY name ASC
//   `);

//   return rows.map(normalizeVehicle);
// }

// export async function getVehicleBySlug(slug) {
//   if (!slug) return null;

//   const { rows } = await query(
//     `
//       SELECT *
//       FROM vehicles
//       WHERE slug = $1
//       LIMIT 1
//     `,
//     [slug]
//   );

//   return normalizeVehicle(rows[0]);
// }

// export async function getVehicleById(id) {
//   if (!id) return null;

//   const { rows } = await query(
//     `
//       SELECT *
//       FROM vehicles
//       WHERE id = $1
//       LIMIT 1
//     `,
//     [id]
//   );

//   return normalizeVehicle(rows[0]);
// }

// /* =========================================================
//    COMPLETE VEHICLE DETAILS
// ========================================================= */

// export async function getVehicleDetailsBySlug(slug) {
//   if (!slug) return null;

//   /* -------------------------------------------------------
//      VEHICLE
//   ------------------------------------------------------- */

//   const vehicleResult = await query(
//     `
//       SELECT *
//       FROM vehicles
//       WHERE slug = $1
//       LIMIT 1
//     `,
//     [slug]
//   );

//   const vehicleRow = vehicleResult.rows[0];

//   if (!vehicleRow) {
//     return null;
//   }

//   const vehicle = normalizeVehicle(vehicleRow);

//   const vehicleId = vehicle.id;

//   /* -------------------------------------------------------
//      RELATED DATA
//   ------------------------------------------------------- */

//   const [
//     variantsResult,
//     specificationsResult,
//     chargingResult,
//     mediaResult,
//     pricingResult,
//   ] = await Promise.all([
//     query(
//       `
//         SELECT *
//         FROM variants
//         WHERE vehicle_id = $1
//         ORDER BY name ASC
//       `,
//       [vehicleId]
//     ),

//     query(
//       `
//         SELECT *
//         FROM specifications
//         WHERE vehicle_id = $1
//         ORDER BY type ASC
//       `,
//       [vehicleId]
//     ),

//     query(
//       `
//         SELECT *
//         FROM charging
//         WHERE vehicle_id = $1
//         ORDER BY id ASC
//       `,
//       [vehicleId]
//     ),

//     query(
//       `
//         SELECT *
//         FROM media
//         WHERE vehicle_id = $1
//         ORDER BY id ASC
//       `,
//       [vehicleId]
//     ),

//     query(
//       `
//         SELECT p.*
//         FROM pricing p
//         INNER JOIN variants v
//           ON v.id = p.variant_id
//         WHERE v.vehicle_id = $1
//         ORDER BY p.amount ASC
//       `,
//       [vehicleId]
//     ),
//   ]);

//   /* -------------------------------------------------------
//      NORMALIZE RELATED DATA
//   ------------------------------------------------------- */

//   const variants =
//     variantsResult.rows.map(normalizeVariant);

//   const specifications =
//     specificationsResult.rows.map(
//       normalizeSpecification
//     );

//   const charging =
//     chargingResult.rows.map(
//       normalizeCharging
//     );

//   const media =
//     mediaResult.rows.map(
//       normalizeMedia
//     );

//   const pricing =
//     pricingResult.rows.map(
//       normalizePricing
//     );

//   /* -------------------------------------------------------
//      GROUP SPECIFICATIONS BY TYPE
//   ------------------------------------------------------- */

//   const specificationMap = {};

//   for (const specification of specifications) {
//     if (!specification?.type) continue;

//     specificationMap[
//       specification.type
//     ] = specification;
//   }

//   /* -------------------------------------------------------
//      FIRST CHARGING RECORD
//   ------------------------------------------------------- */

//   const primaryCharging =
//     charging.length > 0
//       ? charging[0]
//       : null;

//   /* -------------------------------------------------------
//      MAIN IMAGE
//   ------------------------------------------------------- */

//   const imageMedia = media.filter(
//     (item) =>
//       item?.type === "image" &&
//       item?.url
//   );

//   const mainImage =
//     imageMedia[0]?.url ||
//     vehicle.metadata?.image ||
//     vehicle.metadata?.imageUrl ||
//     vehicle.image ||
//     vehicle.imageUrl ||
//     null;

//   const images = imageMedia
//     .map((item) => item.url)
//     .filter(Boolean);

//   /* -------------------------------------------------------
//      VARIANT + PRICING RELATION
//   ------------------------------------------------------- */

//   const variantsWithPricing =
//     variants.map((variant) => {
//       const variantPricing =
//         pricing.filter(
//           (price) =>
//             price.variantId === variant.id
//         );

//       const firstPrice =
//         variantPricing[0] || null;

//       return {
//         ...variant,

//         pricing: variantPricing,

//         price:
//           firstPrice?.amount ??
//           variant.price ??
//           variant.startingPrice ??
//           null,

//         currency:
//           firstPrice?.currencyCode ??
//           variant.currency ??
//           "INR",

//         currencySymbol:
//           firstPrice?.currencySymbol ??
//           variant.currencySymbol ??
//           "₹",
//       };
//     });

//   /* -------------------------------------------------------
//      RETURN COMPLETE VEHICLE
//   ------------------------------------------------------- */

//   return {
//     ...vehicle,

//     /* Brand relation */
//     brandId: vehicle.brandId,

//     /* Images */
//     image: mainImage,
//     images,

//     media,

//     /* Variants */
//     variants: variantsWithPricing,
//     variantIds: variantsWithPricing.map(
//       (variant) => variant.id
//     ),

//     /* Pricing */
//     pricing,

//     /* Specifications */
//     specifications: specificationMap,

//     specificationRecords:
//       specifications,

//     /* Charging */
//     charging: primaryCharging,
//     chargingRecords: charging,

//     /* Convenient IDs */
//     chargingIds: charging.map(
//       (item) => item.id
//     ),

//     specificationIds:
//       specifications.map(
//         (item) => item.id
//       ),

//     mediaIds:
//       media.map(
//         (item) => item.id
//       ),
//   };
// }

// /* =========================================================
//    COMPLETE VEHICLE BY ID
// ========================================================= */

// export async function getVehicleDetailsById(id) {
//   if (!id) return null;

//   const { rows } = await query(
//     `
//       SELECT slug
//       FROM vehicles
//       WHERE id = $1
//       LIMIT 1
//     `,
//     [id]
//   );

//   if (!rows[0]?.slug) {
//     return null;
//   }

//   return getVehicleDetailsBySlug(
//     rows[0].slug
//   );
// }


// import { query } from "../db.js";

// /* =========================================================
//    SAFE HELPERS
// ========================================================= */

// function safeObject(value) {
//   if (!value || typeof value !== "object" || Array.isArray(value)) {
//     return {};
//   }

//   return value;
// }

// function safeArray(value) {
//   return Array.isArray(value) ? value : [];
// }

// function toNumber(value) {
//   if (value === undefined || value === null || value === "") {
//     return null;
//   }

//   const number = Number(value);

//   return Number.isFinite(number) ? number : null;
// }

// /* =========================================================
//    NORMALIZE VEHICLE
// ========================================================= */

// function normalizeVehicle(row) {
//   if (!row) return null;

//   const payload = safeObject(row.payload);

//   return {
//     ...payload,

//     id: row.id,
//     name: row.name,
//     slug: row.slug,

//     brandId: row.brand_id,
//     brand_id: row.brand_id,

//     generationId: row.generation_id,

//     markets: safeArray(row.markets),

//     classification: safeObject(row.classification),
//     status: safeObject(row.status),
//     page: safeObject(row.page),
//     extracted: safeObject(row.extracted),
//     verification: safeObject(row.verification),
//     metadata: safeObject(row.metadata),

//     rating: toNumber(row.rating),

//     reviewCount:
//       row.review_count == null
//         ? 0
//         : Number(row.review_count),

//     createdAt: row.created_at,
//     updatedAt: row.updated_at,
//   };
// }

// /* =========================================================
//    NORMALIZE VARIANT
// ========================================================= */

// function normalizeVariant(row) {
//   if (!row) return null;

//   const payload = safeObject(row.payload);

//   return {
//     ...payload,

//     id: row.id,
//     vehicleId: row.vehicle_id,
//     vehicle_id: row.vehicle_id,

//     name: row.name,
//     slug: row.slug,

//     createdAt: row.created_at,
//     updatedAt: row.updated_at,
//   };
// }

// /* =========================================================
//    NORMALIZE PRICING
// ========================================================= */

// function normalizePricing(row) {
//   if (!row) return null;

//   const payload = safeObject(row.payload);

//   return {
//     ...payload,

//     id: row.id,

//     variantId: row.variant_id,
//     variant_id: row.variant_id,

//     marketId: row.market_id,
//     market_id: row.market_id,

//     amount: toNumber(row.amount),

//     currencyCode: row.currency_code,
//     currency_code: row.currency_code,

//     currencySymbol: row.currency_symbol,

//     createdAt: row.created_at,
//     updatedAt: row.updated_at,
//   };
// }

// /* =========================================================
//    NORMALIZE SPECIFICATION
// ========================================================= */

// function normalizeSpecification(row) {
//   if (!row) return null;

//   const data = safeObject(row.data);
//   const payload = safeObject(row.payload);

//   return {
//     ...payload,
//     ...data,

//     id: row.id,

//     vehicleId: row.vehicle_id,
//     vehicle_id: row.vehicle_id,

//     type: row.type,
//   };
// }

// /* =========================================================
//    NORMALIZE CHARGING
// ========================================================= */

// function normalizeCharging(row) {
//   if (!row) return null;

//   const data = safeObject(row.data);
//   const payload = safeObject(row.payload);

//   return {
//     ...payload,
//     ...data,

//     id: row.id,

//     vehicleId: row.vehicle_id,
//     vehicle_id: row.vehicle_id,
//   };
// }

// /* =========================================================
//    NORMALIZE MEDIA
// ========================================================= */

// function normalizeMedia(row) {
//   if (!row) return null;

//   const payload = safeObject(row.payload);

//   return {
//     ...payload,

//     id: row.id,

//     vehicleId: row.vehicle_id,
//     vehicle_id: row.vehicle_id,

//     type: row.type,

//     url:
//       row.url ||
//       payload.url ||
//       payload.image ||
//       payload.imageUrl ||
//       null,

//     alt:
//       row.alt ||
//       payload.alt ||
//       "",
//   };
// }

// /* =========================================================
//    BASIC VEHICLES
// ========================================================= */

// export async function getAllVehicles() {
//   const { rows } = await query(`
//     SELECT *
//     FROM vehicles
//     ORDER BY name ASC
//   `);

//   return rows.map(normalizeVehicle);
// }

// /* =========================================================
//    FIND VEHICLE BY SLUG
// ========================================================= */

// export async function getVehicleBySlug(slug) {
//   if (!slug) return null;

//   const { rows } = await query(
//     `
//       SELECT *
//       FROM vehicles
//       WHERE slug = $1
//       LIMIT 1
//     `,
//     [slug]
//   );

//   return normalizeVehicle(rows[0]);
// }

// /* =========================================================
//    FIND VEHICLE BY ID
// ========================================================= */

// export async function getVehicleById(id) {
//   if (!id) return null;

//   const { rows } = await query(
//     `
//       SELECT *
//       FROM vehicles
//       WHERE id = $1
//       LIMIT 1
//     `,
//     [id]
//   );

//   return normalizeVehicle(rows[0]);
// }

// /* =========================================================
//    COMPLETE VEHICLE DETAILS BY SLUG
// ========================================================= */

// export async function getVehicleDetailsBySlug(slug) {
//   if (!slug) return null;

//   /* -------------------------------------------------------
//      VEHICLE
//   ------------------------------------------------------- */

//   const vehicleResult = await query(
//     `
//       SELECT *
//       FROM vehicles
//       WHERE slug = $1
//       LIMIT 1
//     `,
//     [slug]
//   );

//   const vehicleRow = vehicleResult.rows[0];

//   if (!vehicleRow) {
//     return null;
//   }

//   const vehicle = normalizeVehicle(vehicleRow);

//   const vehicleId = vehicle.id;

//   /* -------------------------------------------------------
//      RELATED DATABASE DATA
//   ------------------------------------------------------- */

//   const [
//     variantsResult,
//     specificationsResult,
//     chargingResult,
//     mediaResult,
//     pricingResult,
//   ] = await Promise.all([
//     query(
//       `
//         SELECT *
//         FROM variants
//         WHERE vehicle_id = $1
//         ORDER BY name ASC
//       `,
//       [vehicleId]
//     ),

//     query(
//       `
//         SELECT *
//         FROM specifications
//         WHERE vehicle_id = $1
//         ORDER BY type ASC
//       `,
//       [vehicleId]
//     ),

//     query(
//       `
//         SELECT *
//         FROM charging
//         WHERE vehicle_id = $1
//         ORDER BY id ASC
//       `,
//       [vehicleId]
//     ),

//     query(
//       `
//         SELECT *
//         FROM media
//         WHERE vehicle_id = $1
//         ORDER BY id ASC
//       `,
//       [vehicleId]
//     ),

//     query(
//       `
//         SELECT p.*
//         FROM pricing p
//         INNER JOIN variants v
//           ON v.id = p.variant_id
//         WHERE v.vehicle_id = $1
//         ORDER BY p.amount ASC
//       `,
//       [vehicleId]
//     ),
//   ]);

//   /* -------------------------------------------------------
//      NORMALIZE
//   ------------------------------------------------------- */

//   const variants = variantsResult.rows
//     .map(normalizeVariant)
//     .filter(Boolean);

//   const specificationRecords = specificationsResult.rows
//     .map(normalizeSpecification)
//     .filter(Boolean);

//   const chargingRecords = chargingResult.rows
//     .map(normalizeCharging)
//     .filter(Boolean);

//   const media = mediaResult.rows
//     .map(normalizeMedia)
//     .filter(Boolean);

//   const pricing = pricingResult.rows
//     .map(normalizePricing)
//     .filter(Boolean);

//   /* -------------------------------------------------------
//      SPECIFICATION MAP
//   ------------------------------------------------------- */

//   const specificationMap = {};

//   for (const specification of specificationRecords) {
//     if (!specification?.type) continue;

//     specificationMap[specification.type] = specification;
//   }

//   /* -------------------------------------------------------
//      CHARGING
//   ------------------------------------------------------- */

//   const primaryCharging =
//     chargingRecords.length > 0
//       ? chargingRecords[0]
//       : null;

//   /* -------------------------------------------------------
//      IMAGES
//   ------------------------------------------------------- */

//   const imageMedia = media.filter((item) => {
//     const type = String(item?.type || "").toLowerCase();

//     return (
//       item?.url &&
//       (
//         type === "image" ||
//         type === "photo" ||
//         type === "gallery" ||
//         type === ""
//       )
//     );
//   });

//   const metadata = safeObject(vehicle.metadata);

//   const payload = safeObject(vehicle.payload);

//   const mainImage =
//     imageMedia[0]?.url ||

//     metadata.image ||
//     metadata.imageUrl ||
//     metadata.imageURL ||

//     payload.image ||
//     payload.imageUrl ||
//     payload.imageURL ||

//     vehicle.image ||
//     vehicle.imageUrl ||
//     vehicle.imageURL ||

//     null;

//   const images = [
//     ...imageMedia.map((item) => item.url),

//     ...(Array.isArray(metadata.images)
//       ? metadata.images
//       : []),

//     ...(Array.isArray(payload.images)
//       ? payload.images
//       : []),
//   ].filter(Boolean);

//   const uniqueImages = [
//     ...new Set(
//       mainImage
//         ? [mainImage, ...images]
//         : images
//     ),
//   ];

//   /* -------------------------------------------------------
//      VARIANT + PRICING
//   ------------------------------------------------------- */

//   const variantsWithPricing = variants.map((variant) => {
//     const variantPricing = pricing.filter(
//       (price) =>
//         price.variantId === variant.id
//     );

//     const firstPrice =
//       variantPricing[0] || null;

//     return {
//       ...variant,

//       pricing: variantPricing,

//       price:
//         firstPrice?.amount ??
//         variant.price ??
//         variant.startingPrice ??
//         variant.pricing?.price ??
//         null,

//       currency:
//         firstPrice?.currencyCode ??
//         variant.currency ??
//         variant.priceCurrency ??
//         "INR",

//       currencySymbol:
//         firstPrice?.currencySymbol ??
//         variant.currencySymbol ??
//         "₹",
//     };
//   });

//   /* -------------------------------------------------------
//      RETURN EVERYTHING
//   ------------------------------------------------------- */

//   return {
//     ...vehicle,

//     /* ---------------------------------
//        BRAND
//     --------------------------------- */

//     brandId: vehicle.brandId,

//     /* ---------------------------------
//        IMAGES
//     --------------------------------- */

//     image: mainImage,

//     images: uniqueImages,

//     media,

//     mediaIds: media.map(
//       (item) => item.id
//     ),

//     /* ---------------------------------
//        VARIANTS
//     --------------------------------- */

//     variants: variantsWithPricing,

//     variantIds: variantsWithPricing.map(
//       (variant) => variant.id
//     ),

//     /* ---------------------------------
//        PRICING
//     --------------------------------- */

//     pricing,

//     /* ---------------------------------
//        SPECIFICATIONS
//     --------------------------------- */

//     specifications:
//       specificationMap,

//     specificationRecords,

//     specificationIds:
//       specificationRecords.map(
//         (item) => item.id
//       ),

//     /* ---------------------------------
//        CHARGING
//     --------------------------------- */

//     charging:
//       primaryCharging,

//     chargingRecords,

//     chargingIds:
//       chargingRecords.map(
//         (item) => item.id
//       ),
//   };
// }

// /* =========================================================
//    COMPLETE VEHICLE BY ID
// ========================================================= */

// export async function getVehicleDetailsById(id) {
//   if (!id) return null;

//   const { rows } = await query(
//     `
//       SELECT slug
//       FROM vehicles
//       WHERE id = $1
//       LIMIT 1
//     `,
//     [id]
//   );

//   if (!rows[0]?.slug) {
//     return null;
//   }

//   return getVehicleDetailsBySlug(
//     rows[0].slug
//   );
// }


import { query } from "../db.js";

/* =========================================================
   SAFE HELPERS
========================================================= */

function safeObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value;
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

/* =========================================================
   NORMALIZE VEHICLE
========================================================= */

function normalizeVehicle(row) {
  if (!row) return null;

  const payload = safeObject(row.payload);

  const metadata = {
    ...safeObject(payload.metadata),
    ...safeObject(row.metadata),
  };

  const classification = {
    ...safeObject(payload.classification),
    ...safeObject(row.classification),
  };

  const status = {
    ...safeObject(payload.status),
    ...safeObject(row.status),
  };

  const page = {
    ...safeObject(payload.page),
    ...safeObject(row.page),
  };

  const extracted = {
    ...safeObject(payload.extracted),
    ...safeObject(row.extracted),
  };

  const verification = {
    ...safeObject(payload.verification),
    ...safeObject(row.verification),
  };

  return {
    ...payload,

    id: row.id,
    name:
      row.name ||
      payload.name ||
      payload.identity?.name ||
      payload.model ||
      "Electric Vehicle",

    slug:
      row.slug ||
      payload.slug ||
      payload.identity?.slug ||
      row.id,

    brandId:
      row.brand_id ||
      payload.brandId ||
      payload.brand_id ||
      payload.identity?.brandId ||
      null,

    generationId:
      row.generation_id ||
      payload.generationId ||
      payload.generation_id ||
      null,

    markets:
      safeArray(row.markets).length
        ? safeArray(row.markets)
        : safeArray(payload.markets),

    classification,
    status,
    page,
    extracted,
    verification,
    metadata,

    rating:
      row.rating == null
        ? toNumber(payload.rating)
        : toNumber(row.rating),

    reviewCount:
      row.review_count == null
        ? toNumber(payload.reviewCount) || 0
        : toNumber(row.review_count) || 0,

    createdAt:
      row.created_at ||
      payload.createdAt ||
      null,

    updatedAt:
      row.updated_at ||
      payload.updatedAt ||
      null,
  };
}

/* =========================================================
   NORMALIZE VARIANT
========================================================= */

function normalizeVariant(row) {
  if (!row) return null;

  const payload = safeObject(row.payload);

  return {
    ...payload,

    id: row.id,
    vehicleId: row.vehicle_id,
    name:
      row.name ||
      payload.name ||
      payload.model ||
      payload.title ||
      "Variant",

    slug:
      row.slug ||
      payload.slug ||
      row.id,

    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

/* =========================================================
   NORMALIZE PRICING
========================================================= */

function normalizePricing(row) {
  if (!row) return null;

  const payload = safeObject(row.payload);

  return {
    ...payload,

    id: row.id,
    variantId: row.variant_id,
    marketId: row.market_id,

    amount:
      row.amount == null
        ? toNumber(payload.amount)
        : toNumber(row.amount),

    currencyCode:
      row.currency_code ||
      payload.currencyCode ||
      payload.currency ||
      "INR",

    currencySymbol:
      row.currency_symbol ||
      payload.currencySymbol ||
      payload.symbol ||
      "₹",

    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

/* =========================================================
   NORMALIZE SPECIFICATION
========================================================= */

function normalizeSpecification(row) {
  if (!row) return null;

  const data = safeObject(row.data);
  const payload = safeObject(row.payload);

  return {
    ...payload,
    ...data,

    id: row.id,
    vehicleId: row.vehicle_id,
    type: row.type || data.type || payload.type || null,
  };
}

/* =========================================================
   NORMALIZE CHARGING
========================================================= */

function normalizeCharging(row) {
  if (!row) return null;

  const data = safeObject(row.data);
  const payload = safeObject(row.payload);

  return {
    ...payload,
    ...data,

    id: row.id,
    vehicleId: row.vehicle_id,
  };
}

/* =========================================================
   NORMALIZE MEDIA
========================================================= */

function normalizeMedia(row) {
  if (!row) return null;

  const payload = safeObject(row.payload);

  return {
    ...payload,

    id: row.id,
    vehicleId: row.vehicle_id,

    type:
      row.type ||
      payload.type ||
      "image",

    url:
      row.url ||
      payload.url ||
      payload.image ||
      payload.imageUrl ||
      null,

    alt:
      row.alt ||
      payload.alt ||
      null,
  };
}

/* =========================================================
   BASIC VEHICLES
========================================================= */

export async function getAllVehicles() {
  const vehicleResult = await query(`
    SELECT *
    FROM vehicles
    ORDER BY name ASC
  `);

  const vehicles = vehicleResult.rows.map(normalizeVehicle);

  if (!vehicles.length) {
    return [];
  }

  /* -------------------------------------------------------
     LOAD ALL MEDIA FOR VEHICLES
     
     Important:
     Cars page uses getAllVehicles().
     Therefore images must be attached here.
  ------------------------------------------------------- */

  const vehicleIds = vehicles
    .map((vehicle) => vehicle.id)
    .filter(Boolean);

  if (!vehicleIds.length) {
    return vehicles;
  }

  const mediaResult = await query(
    `
      SELECT *
      FROM media
      WHERE vehicle_id = ANY($1::text[])
      ORDER BY id ASC
    `,
    [vehicleIds]
  );

  const mediaMap = new Map();

  for (const row of mediaResult.rows) {
    const media = normalizeMedia(row);

    if (!media?.vehicleId) {
      continue;
    }

    if (!mediaMap.has(media.vehicleId)) {
      mediaMap.set(media.vehicleId, []);
    }

    mediaMap.get(media.vehicleId).push(media);
  }

  /* -------------------------------------------------------
     ATTACH IMAGES
  ------------------------------------------------------- */

  return vehicles.map((vehicle) => {
    const media = mediaMap.get(vehicle.id) || [];

    const imageMedia = media.filter(
      (item) =>
        item?.type === "image" &&
        item?.url
    );

    const metadataImage =
      vehicle.metadata?.image ||
      vehicle.metadata?.imageUrl ||
      vehicle.metadata?.imageURL ||
      null;

    const payloadImage =
      vehicle.payload?.image ||
      vehicle.payload?.imageUrl ||
      vehicle.payload?.imageURL ||
      null;

    const mainImage =
      imageMedia[0]?.url ||
      metadataImage ||
      payloadImage ||
      null;

    const images = [
      mainImage,
      ...imageMedia.map((item) => item.url),
    ].filter(Boolean);

    return {
      ...vehicle,

      image: mainImage,

      images: [
        ...new Set(images),
      ],

      media,
    };
  });
}

/* =========================================================
   VEHICLE BY SLUG
========================================================= */

export async function getVehicleBySlug(slug) {
  if (!slug) {
    return null;
  }

  const { rows } = await query(
    `
      SELECT *
      FROM vehicles
      WHERE slug = $1
      LIMIT 1
    `,
    [slug]
  );

  return normalizeVehicle(rows[0]);
}

/* =========================================================
   VEHICLE BY ID
========================================================= */

export async function getVehicleById(id) {
  if (!id) {
    return null;
  }

  const { rows } = await query(
    `
      SELECT *
      FROM vehicles
      WHERE id = $1
      LIMIT 1
    `,
    [id]
  );

  return normalizeVehicle(rows[0]);
}

/* =========================================================
   COMPLETE VEHICLE DETAILS BY SLUG
========================================================= */

export async function getVehicleDetailsBySlug(slug) {
  if (!slug) {
    return null;
  }

  /* -------------------------------------------------------
     VEHICLE
  ------------------------------------------------------- */

  const vehicleResult = await query(
    `
      SELECT *
      FROM vehicles
      WHERE slug = $1
      LIMIT 1
    `,
    [slug]
  );

  const vehicleRow = vehicleResult.rows[0];

  if (!vehicleRow) {
    return null;
  }

  const vehicle = normalizeVehicle(vehicleRow);

  const vehicleId = vehicle.id;

  /* -------------------------------------------------------
     RELATED DATA
  ------------------------------------------------------- */

  const [
    variantsResult,
    specificationsResult,
    chargingResult,
    mediaResult,
    pricingResult,
  ] = await Promise.all([
    query(
      `
        SELECT *
        FROM variants
        WHERE vehicle_id = $1
        ORDER BY name ASC
      `,
      [vehicleId]
    ),

    query(
      `
        SELECT *
        FROM specifications
        WHERE vehicle_id = $1
        ORDER BY type ASC
      `,
      [vehicleId]
    ),

    query(
      `
        SELECT *
        FROM charging
        WHERE vehicle_id = $1
        ORDER BY id ASC
      `,
      [vehicleId]
    ),

    query(
      `
        SELECT *
        FROM media
        WHERE vehicle_id = $1
        ORDER BY id ASC
      `,
      [vehicleId]
    ),

    query(
      `
        SELECT p.*
        FROM pricing p
        INNER JOIN variants v
          ON v.id = p.variant_id
        WHERE v.vehicle_id = $1
        ORDER BY p.amount ASC
      `,
      [vehicleId]
    ),
  ]);

  /* -------------------------------------------------------
     NORMALIZE
  ------------------------------------------------------- */

  const variants =
    variantsResult.rows.map(normalizeVariant);

  const specifications =
    specificationsResult.rows.map(
      normalizeSpecification
    );

  const charging =
    chargingResult.rows.map(
      normalizeCharging
    );

  const media =
    mediaResult.rows.map(
      normalizeMedia
    );

  const pricing =
    pricingResult.rows.map(
      normalizePricing
    );

  /* -------------------------------------------------------
     SPECIFICATION MAP
     
     Example:
     {
       battery: {...},
       performance: {...},
       dimensions: {...}
     }
  ------------------------------------------------------- */

  const specificationMap = {};

  for (const specification of specifications) {
    if (!specification?.type) {
      continue;
    }

    specificationMap[specification.type] =
      specification;
  }

  /* -------------------------------------------------------
     CHARGING
  ------------------------------------------------------- */

  const primaryCharging =
    charging.length > 0
      ? charging[0]
      : null;

  /* -------------------------------------------------------
     IMAGES
  ------------------------------------------------------- */

  const imageMedia = media.filter(
    (item) =>
      item?.type === "image" &&
      item?.url
  );

  const images = [
    ...new Set(
      imageMedia
        .map((item) => item.url)
        .filter(Boolean)
    ),
  ];

  const mainImage =
    images[0] ||
    vehicle.metadata?.image ||
    vehicle.metadata?.imageUrl ||
    vehicle.metadata?.imageURL ||
    vehicle.image ||
    vehicle.imageUrl ||
    null;

  /* -------------------------------------------------------
     VARIANTS + PRICING
  ------------------------------------------------------- */

  const variantsWithPricing =
    variants.map((variant) => {
      const variantPricing =
        pricing.filter(
          (price) =>
            price.variantId === variant.id
        );

      const firstPrice =
        variantPricing[0] || null;

      return {
        ...variant,

        pricing: variantPricing,

        price:
          firstPrice?.amount ??
          toNumber(variant.price) ??
          toNumber(variant.startingPrice) ??
          null,

        currency:
          firstPrice?.currencyCode ||
          variant.currency ||
          "INR",

        currencySymbol:
          firstPrice?.currencySymbol ||
          variant.currencySymbol ||
          "₹",
      };
    });

  /* -------------------------------------------------------
     CONVENIENT SPEC VALUES
     
     Keep these available both through specifications
     and direct fields.
  ------------------------------------------------------- */

  const firstSpecification =
    specifications[0] || {};

  /* -------------------------------------------------------
     RETURN COMPLETE VEHICLE
  ------------------------------------------------------- */

  return {
    ...vehicle,

    /* -----------------------------------------------------
       IMAGE DATA
    ----------------------------------------------------- */

    image: mainImage,

    images,

    media,

    mediaIds: media
      .map((item) => item.id)
      .filter(Boolean),

    /* -----------------------------------------------------
       VARIANTS
    ----------------------------------------------------- */

    variants: variantsWithPricing,

    variantIds:
      variantsWithPricing
        .map((variant) => variant.id)
        .filter(Boolean),

    /* -----------------------------------------------------
       PRICING
    ----------------------------------------------------- */

    pricing,

    /* -----------------------------------------------------
       SPECIFICATIONS
    ----------------------------------------------------- */

    specifications:
      specificationMap,

    specificationRecords:
      specifications,

    specificationIds:
      specifications
        .map((item) => item.id)
        .filter(Boolean),

    /* -----------------------------------------------------
       CHARGING
    ----------------------------------------------------- */

    charging:
      primaryCharging,

    chargingRecords:
      charging,

    chargingIds:
      charging
        .map((item) => item.id)
        .filter(Boolean),

    /* -----------------------------------------------------
       RAW RELATED DATA
    ----------------------------------------------------- */

    related: {
      variants: variantsWithPricing,
      specifications,
      charging,
      media,
      pricing,
    },

    /* -----------------------------------------------------
       EXTRA CONVENIENCE DATA
    ----------------------------------------------------- */

    primarySpecification:
      firstSpecification,
  };
}

/* =========================================================
   COMPLETE VEHICLE BY ID
========================================================= */

export async function getVehicleDetailsById(id) {
  if (!id) {
    return null;
  }

  const { rows } = await query(
    `
      SELECT slug
      FROM vehicles
      WHERE id = $1
      LIMIT 1
    `,
    [id]
  );

  const slug = rows[0]?.slug;

  if (!slug) {
    return null;
  }

  return getVehicleDetailsBySlug(slug);
}

