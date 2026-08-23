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

