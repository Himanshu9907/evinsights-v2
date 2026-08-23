
import pg from "pg";

const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is missing.");
}

const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/*
=========================================================
WIKIMEDIA COMMONS IMAGE HELPER
=========================================================
*/

function commons(fileName) {
  return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(
    fileName
  )}?width=1600`;
}

/*
=========================================================
10 NEW VEHICLES
=========================================================
*/

const vehicles = [
  {
    id: "bmw-i4",
    name: "i4",
    brandId: "bmw",
    marketId: "DE",
    currency: "EUR",
    symbol: "€",
    price: 56900,

    bodyType: "Fastback",
    segment: "Electric Executive Fastback",

    battery: 83.9,
    range: 590,
    power: 250,
    torque: 430,
    acceleration: 5.7,
    topSpeed: 190,

    drive: "RWD",
    charging: 205,
    chargingTime: 31,

    description:
      "A premium electric fastback combining strong range, rear-wheel drive dynamics and BMW's fifth-generation eDrive technology.",

    headings: [
      "Long-range electric fastback",
      "83.9 kWh battery",
      "205 kW DC charging",
      "BMW curved display",
      "Rear-wheel drive",
      "Advanced driver assistance",
    ],

    variants: [
      ["eDrive35", 49900],
      ["eDrive40", 56900],
      ["xDrive40", 62900],
    ],

    images: [
      "2021 BMW i4 eDrive 40 M Sport.jpg",
      "2022 BMW i4 eDrive40 M Sport AMT.jpg",
      "2022 BMW i4 M50 (29361).jpg",
      "2022 BMW i4 M50 (35166).jpg",
      "2023 BMW i4 35 M Sport.jpg",
    ],
  },

  {
    id: "bmw-i5",
    name: "i5",
    brandId: "bmw",
    marketId: "DE",
    currency: "EUR",
    symbol: "€",
    price: 72900,

    bodyType: "Sedan",
    segment: "Electric Executive Sedan",

    battery: 84,
    range: 582,
    power: 250,
    torque: 430,
    acceleration: 6.0,
    topSpeed: 193,

    drive: "RWD",
    charging: 205,
    chargingTime: 30,

    description:
      "BMW's executive electric sedan offering a refined cabin, long WLTP range and strong DC charging performance.",

    headings: [
      "Executive electric sedan",
      "Up to 582 km WLTP range",
      "250 kW electric drive",
      "Curved display cockpit",
      "Rear-wheel drive",
      "Advanced BMW driver assistance",
    ],

    variants: [
      ["eDrive40", 72900],
      ["xDrive40", 79900],
      ["M60 xDrive", 99900],
    ],

    images: [
      "2023 BMW i5 1.jpg",
      "2023 BMW i5 2.jpg",
      "2023 BMW i5.jpg",
      "BMW G60 i5 in BMW Museum.jpg",
      "BMW i5 (G60) China (2).jpg",
    ],
  },

  {
    id: "bmw-ix1",
    name: "iX1",
    brandId: "bmw",
    marketId: "DE",
    currency: "EUR",
    symbol: "€",
    price: 55900,

    bodyType: "SUV",
    segment: "Electric Compact SUV",

    battery: 64.7,
    range: 438,
    power: 230,
    torque: 494,
    acceleration: 5.6,
    topSpeed: 180,

    drive: "AWD",
    charging: 130,
    chargingTime: 29,

    description:
      "A compact premium electric SUV offering all-wheel drive, practical dimensions and strong everyday performance.",

    headings: [
      "Compact premium electric SUV",
      "xDrive all-wheel drive",
      "64.7 kWh battery",
      "130 kW DC charging",
      "BMW curved display",
      "Connected driving technology",
    ],

    variants: [
      ["eDrive20", 49900],
      ["eDrive30", 53900],
      ["xDrive30", 55900],
    ],

    images: [
      "0 BMW iX1 1.jpg",
      "2022 BMW iX1 (81478).jpg",
      "2022 BMW iX1 (93837).jpg",
      "2022 BMW iX1.jpg",
      "2023 BMW iX1 U11 front view.png",
    ],
  },

  {
    id: "hyundai-ioniq-6",
    name: "Ioniq 6",
    brandId: "hyundai",
    marketId: "DE",
    currency: "EUR",
    symbol: "€",
    price: 54900,

    bodyType: "Sedan",
    segment: "Electric Sedan",

    battery: 77.4,
    range: 614,
    power: 168,
    torque: 350,
    acceleration: 7.4,
    topSpeed: 185,

    drive: "RWD",
    charging: 235,
    chargingTime: 18,

    description:
      "A highly aerodynamic electric sedan built around Hyundai's 800V E-GMP platform.",

    headings: [
      "800V ultra-fast charging",
      "Up to 614 km WLTP range",
      "Highly aerodynamic body",
      "77.4 kWh battery",
      "Vehicle-to-load capability",
      "Long-distance comfort",
    ],

    variants: [
      ["Standard Range RWD", 49900],
      ["Long Range RWD", 54900],
      ["Long Range AWD", 59900],
    ],

    images: [
      "2023 Hyundai Ioniq 6.jpg",
      "2023 Hyundai ioniq 6.jpg",
      "2024 Hyundai Ioniq 6.jpg",
      "2025 Hyundai Ioniq 6 au salon auto Lanaudière 2025.jpg",
      "Hyundai Ioniq 6 1X7A7258.jpg",
    ],
  },

  {
    id: "hyundai-kona-electric",
    name: "Kona Electric",
    brandId: "hyundai",
    marketId: "DE",
    currency: "EUR",
    symbol: "€",
    price: 42900,

    bodyType: "SUV",
    segment: "Electric Compact SUV",

    battery: 65.4,
    range: 514,
    power: 160,
    torque: 255,
    acceleration: 8.1,
    topSpeed: 172,

    drive: "FWD",
    charging: 101,
    chargingTime: 41,

    description:
      "A compact electric SUV focused on efficient range, practical dimensions and everyday usability.",

    headings: [
      "Compact electric SUV",
      "Up to 514 km WLTP range",
      "65.4 kWh battery",
      "Connected infotainment",
      "Advanced safety systems",
      "Practical urban footprint",
    ],

    variants: [
      ["Standard Range", 38900],
      ["Long Range", 42900],
      ["Long Range Ultimate", 46900],
    ],

    images: [
      "2023 Hyundai Kona Electric (53207327692).jpg",
      "2023 Hyundai Kona Electric.jpg",
      "Hyundai Kona Electric (SX2) 1X7A1554.jpg",
      "Hyundai Kona Electric SX2 EV Abyss Black Pearl (1).jpg",
      "Hyundai Kona Electric Inspiration SX2 EV Meta Blue Pearl (1).jpg",
    ],
  },

  {
    id: "hyundai-ioniq-5-n",
    name: "Ioniq 5 N",
    brandId: "hyundai",
    marketId: "DE",
    currency: "EUR",
    symbol: "€",
    price: 74900,

    bodyType: "Crossover",
    segment: "Electric Performance Crossover",

    battery: 84,
    range: 448,
    power: 448,
    torque: 740,
    acceleration: 3.4,
    topSpeed: 260,

    drive: "AWD",
    charging: 235,
    chargingTime: 18,

    description:
      "A high-performance electric crossover combining dual-motor all-wheel drive with Hyundai N performance technology.",

    headings: [
      "High-performance electric crossover",
      "Dual-motor AWD",
      "84 kWh battery",
      "N performance driving modes",
      "800V ultra-fast charging",
      "Track-focused thermal management",
    ],

    variants: [
      ["Ioniq 5 N", 74900],
      ["Ioniq 5 N Performance", 79900],
    ],

    images: [
      "2024 Hyundai ioniq 5 N.jpg",
      "25 Hyundai Ioniq 5 N.jpg",
      "Hyundai Ioniq 5 N (2024) (53625588921).jpg",
      "Hyundai Ioniq 5 N (2024) (53626028180).jpg",
      "Hyundai IONIQ 5 N (NE) front.jpg",
    ],
  },

  {
    id: "mg4-ev",
    name: "MG4 EV",
    brandId: "mg",
    marketId: "GB",
    currency: "GBP",
    symbol: "£",
    price: 31995,

    bodyType: "Hatchback",
    segment: "Electric Hatchback",

    battery: 64,
    range: 450,
    power: 150,
    torque: 250,
    acceleration: 7.9,
    topSpeed: 160,

    drive: "RWD",
    charging: 135,
    chargingTime: 35,

    description:
      "A compact rear-wheel-drive electric hatchback offering a strong balance of range, performance and practicality.",

    headings: [
      "Rear-wheel-drive electric hatchback",
      "64 kWh battery",
      "Up to 450 km WLTP range",
      "Fast DC charging",
      "Five-seat practicality",
      "Driver assistance technology",
    ],

    variants: [
      ["SE Standard Range", 26995],
      ["SE Long Range", 31995],
      ["Trophy Extended Range", 34995],
    ],

    images: [
      "2022 MG 4 Electric X.jpg",
      "2022 MG 4 SE.jpg",
      "2023 MG 4 Trophy Extended Range.jpg",
      "2023 MG 4 Trophy Long Range in Holborn Blue (Front).jpg",
      "2023 MG 4 Trophy Long Range in Holborn Blue (Interior).jpg",
    ],
  },

  {
    id: "mg5-ev",
    name: "MG5 EV",
    brandId: "mg",
    marketId: "GB",
    currency: "GBP",
    symbol: "£",
    price: 30995,

    bodyType: "Estate",
    segment: "Electric Estate",

    battery: 61.1,
    range: 400,
    power: 130,
    torque: 280,
    acceleration: 8.3,
    topSpeed: 185,

    drive: "FWD",
    charging: 87,
    chargingTime: 40,

    description:
      "A practical electric estate designed around family usability, cargo space and efficient long-distance driving.",

    headings: [
      "Practical electric estate",
      "Family-focused interior",
      "Large luggage capacity",
      "61.1 kWh battery",
      "DC fast charging",
      "Comfort-focused driving",
    ],

    variants: [
      ["SE", 28995],
      ["Trophy", 30995],
      ["Long Range", 32995],
    ],

    images: [
      "(SGP-Singapore) Strides Taxi SHB1289Y 2024-03-24.jpg",
      "(SGP-Singapore) Strides Taxi SHB1716G 2024-03-02.jpg",
      "(SGP-Singapore) Strides Taxi SHB1917T 2024-04-19.jpg",
      "(SGP-Singapore) Strides Taxi SHB5757L 2024-03-17.jpg",
      "(SGP-Singapore) Strides-Premier MG5 EV SHB736E 2026-01-20.jpg",
    ],
  },

  {
    id: "tesla-model-3",
    name: "Model 3",
    brandId: "tesla",
    marketId: "US",
    currency: "USD",
    symbol: "$",
    price: 42990,

    bodyType: "Sedan",
    segment: "Electric Sedan",

    battery: 79,
    range: 629,
    power: 366,
    torque: 493,
    acceleration: 4.4,
    topSpeed: 201,

    drive: "AWD",
    charging: 250,
    chargingTime: 27,

    description:
      "Tesla's compact electric sedan combining long range, software-driven features and rapid Supercharging.",

    headings: [
      "Long-range electric sedan",
      "Tesla Supercharging",
      "Over-the-air software updates",
      "Minimalist interior",
      "Advanced driver assistance",
      "High-efficiency electric drivetrain",
    ],

    variants: [
      ["Rear-Wheel Drive", 38990],
      ["Long Range AWD", 42990],
      ["Performance", 54990],
    ],

    images: [
      "0 Tesla Model 3 0.jpg",
      "0 Tesla Model 3 1.jpg",
      "0 Tesla Model 3 2.jpg",
      "0 Tesla Model 3 3.jpg",
      "2023 Tesla Model 3 Highland Long Range AWD.jpg",
    ],
  },

  {
    id: "tesla-model-x",
    name: "Model X",
    brandId: "tesla",
    marketId: "US",
    currency: "USD",
    symbol: "$",
    price: 89990,

    bodyType: "SUV",
    segment: "Electric Luxury SUV",

    battery: 100,
    range: 576,
    power: 493,
    torque: 713,
    acceleration: 3.9,
    topSpeed: 250,

    drive: "AWD",
    charging: 250,
    chargingTime: 30,

    description:
      "A large electric SUV known for its spacious cabin, high performance and distinctive Falcon Wing doors.",

    headings: [
      "Large electric luxury SUV",
      "All-wheel drive",
      "Seven-seat capability",
      "Falcon Wing doors",
      "High-speed Supercharging",
      "Advanced driver assistance",
    ],

    variants: [
      ["Model X", 89990],
      ["Model X Long Range", 99990],
      ["Model X Plaid", 109990],
    ],

    images: [
      "2018 Tesla Model X 75D.jpg",
      "2023 Tesla Model X Plaid.jpg",
      "2024 Tesla Model X.jpg",
      "23 Tesla Model X Plaid.jpg",
      "Tesla Model X Plaid Shadow Grey 01.jpg",
    ],
  },
];

/*
=========================================================
HELPERS
=========================================================
*/

function now() {
  return new Date().toISOString();
}

function makePayload(vehicle) {
  return {
    id: vehicle.id,
    name: vehicle.name,
    slug: vehicle.id,
    brandId: vehicle.brandId,

    markets: [vehicle.marketId],

    classification: {
      vehicleType: "BEV",
      bodyType: vehicle.bodyType,
      segment: vehicle.segment,
    },

    status: {
      lifecycle: "current",
    },

    page: {
      description: vehicle.description,
      headings: vehicle.headings,
    },

    extracted: {
      price: {
        amount: vehicle.price,
        currency: vehicle.currency,
      },

      specs: {
        battery: vehicle.battery,
        range: vehicle.range,
        power: vehicle.power,
        torque: vehicle.torque,
        acceleration: vehicle.acceleration,
        topSpeed: vehicle.topSpeed,
      },
    },

    verification: {
      status: "approved",
      lastVerifiedAt: now(),
    },

    metadata: {
      featured: false,
      image: commons(vehicle.images[0]),
      images: vehicle.images.map(commons),
      gallerySource: "Wikimedia Commons",
    },

    sourceIds: [],

    pricingIds: vehicle.variants.map(
      (_, index) => `${vehicle.id}-v${index + 1}-price`
    ),

    variantIds: vehicle.variants.map(
      (_, index) => `${vehicle.id}-v${index + 1}`
    ),

    chargingIds: [`${vehicle.id}-charging`],

    mediaIds: vehicle.images.map(
      (_, index) => `${vehicle.id}-media-${index + 1}`
    ),

    specificationIds: {
      battery: [`${vehicle.id}-battery`],
      performance: [`${vehicle.id}-performance`],
      dimensions: [`${vehicle.id}-dimensions`],
      safety: [`${vehicle.id}-safety`],
      features: [`${vehicle.id}-features`],
    },

    rating: 4.5,
    reviewCount: 0,

    createdAt: now(),
    updatedAt: now(),
  };
}

/*
=========================================================
INSERT VEHICLE
=========================================================
*/

async function insertVehicle(vehicle) {
  const payload = makePayload(vehicle);

  await client.query(
    `
      INSERT INTO vehicles (
        id,
        name,
        slug,
        brand_id,
        generation_id,
        markets,
        classification,
        status,
        page,
        extracted,
        verification,
        metadata,
        rating,
        review_count,
        payload
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        NULL,
        $5,
        $6::jsonb,
        $7::jsonb,
        $8::jsonb,
        $9::jsonb,
        $10::jsonb,
        $11::jsonb,
        $12,
        $13,
        $14::jsonb
      )

      ON CONFLICT (id)
      DO UPDATE SET
        name = EXCLUDED.name,
        slug = EXCLUDED.slug,
        brand_id = EXCLUDED.brand_id,
        markets = EXCLUDED.markets,
        classification = EXCLUDED.classification,
        status = EXCLUDED.status,
        page = EXCLUDED.page,
        extracted = EXCLUDED.extracted,
        verification = EXCLUDED.verification,
        metadata = EXCLUDED.metadata,
        rating = EXCLUDED.rating,
        review_count = EXCLUDED.review_count,
        payload = EXCLUDED.payload,
        updated_at = NOW()
    `,
    [
      vehicle.id,
      vehicle.name,
      vehicle.id,
      vehicle.brandId,
      [vehicle.marketId],
      payload.classification,
      payload.status,
      payload.page,
      payload.extracted,
      payload.verification,
      payload.metadata,
      payload.rating,
      payload.reviewCount,
      payload,
    ]
  );
}

/*
=========================================================
INSERT VARIANTS + PRICING
=========================================================
*/

async function insertVariants(vehicle) {
  for (let i = 0; i < vehicle.variants.length; i++) {
    const [variantName, amount] = vehicle.variants[i];

    const variantId = `${vehicle.id}-v${i + 1}`;

    const pricingId = `${variantId}-price`;

    const variantPayload = {
      id: variantId,
      vehicleId: vehicle.id,
      name: variantName,
      slug: `${vehicle.id}-${variantName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`,

      pricingIds: [pricingId],

      specificationIds: {
        battery: [`${vehicle.id}-battery`],
        performance: [`${vehicle.id}-performance`],
        dimensions: [`${vehicle.id}-dimensions`],
        safety: [`${vehicle.id}-safety`],
        features: [`${vehicle.id}-features`],
      },

      chargingIds: [`${vehicle.id}-charging`],

      sourceIds: [],
    };

    await client.query(
      `
        INSERT INTO variants (
          id,
          vehicle_id,
          name,
          slug,
          payload
        )
        VALUES ($1,$2,$3,$4,$5::jsonb)

        ON CONFLICT (id)
        DO UPDATE SET
          vehicle_id = EXCLUDED.vehicle_id,
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          payload = EXCLUDED.payload
      `,
      [
        variantId,
        vehicle.id,
        variantName,
        variantPayload.slug,
        variantPayload,
      ]
    );

    const pricingPayload = {
      id: pricingId,
      entity: {
        type: "variant",
        id: variantId,
      },
      variantId,
      marketId: vehicle.marketId,
      amount,
      currencyCode: vehicle.currency,
      currencySymbol: vehicle.symbol,
      price: {
        amount,
      },
    };

    await client.query(
      `
        INSERT INTO pricing (
          id,
          variant_id,
          market_id,
          amount,
          currency_code,
          currency_symbol,
          payload
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb)

        ON CONFLICT (id)
        DO UPDATE SET
          variant_id = EXCLUDED.variant_id,
          market_id = EXCLUDED.market_id,
          amount = EXCLUDED.amount,
          currency_code = EXCLUDED.currency_code,
          currency_symbol = EXCLUDED.currency_symbol,
          payload = EXCLUDED.payload
      `,
      [
        pricingId,
        variantId,
        vehicle.marketId,
        amount,
        vehicle.currency,
        vehicle.symbol,
        pricingPayload,
      ]
    );
  }
}

/*
=========================================================
INSERT SPECIFICATIONS
=========================================================
*/

async function insertSpecifications(vehicle) {
  const records = [
    {
      type: "battery",
      data: {
        id: `${vehicle.id}-battery`,
        vehicleId: vehicle.id,
        battery: {
          capacityKwh: vehicle.battery,
          chemistry: "Lithium-ion",
        },
        warranty: {
          durationYears: 8,
        },
      },
    },

    {
      type: "performance",
      data: {
        id: `${vehicle.id}-performance`,
        vehicleId: vehicle.id,
        motor: {
          powerKw: vehicle.power,
          torqueNm: vehicle.torque,
          driveType: vehicle.drive,
          layout: "Electric motor",
        },
        accelerationSeconds: vehicle.acceleration,
        topSpeedKmh: vehicle.topSpeed,
      },
    },

    {
      type: "dimensions",
      data: {
        id: `${vehicle.id}-dimensions`,
        vehicleId: vehicle.id,
        dimensions: {
          seatingCapacity: 5,
        },
      },
    },

    {
      type: "safety",
      data: {
        id: `${vehicle.id}-safety`,
        vehicleId: vehicle.id,
        airbags: {
          count: 6,
        },
        driverAssistance: {
          adas: true,
          level: "Level 2 capable",
        },
        braking: {
          esc: true,
        },
      },
    },

    {
      type: "features",
      data: {
        id: `${vehicle.id}-features`,
        vehicleId: vehicle.id,
        features: vehicle.headings,
      },
    },
  ];

  for (const record of records) {
    await client.query(
      `
        INSERT INTO specifications (
          id,
          vehicle_id,
          type,
          data,
          payload
        )
        VALUES (
          $1,
          $2,
          $3,
          $4::jsonb,
          $4::jsonb
        )

        ON CONFLICT (id)
        DO UPDATE SET
          vehicle_id = EXCLUDED.vehicle_id,
          type = EXCLUDED.type,
          data = EXCLUDED.data,
          payload = EXCLUDED.payload
      `,
      [
        record.data.id,
        vehicle.id,
        record.type,
        record.data,
      ]
    );
  }
}

/*
=========================================================
INSERT CHARGING
=========================================================
*/

async function insertCharging(vehicle) {
  const id = `${vehicle.id}-charging`;

  const data = {
    id,
    vehicleId: vehicle.id,
    type: "Combined charging",
    acPowerKw: 11,
    dcPowerKw: vehicle.charging,
    timeMinutes: vehicle.chargingTime,
    connector: "CCS2",
  };

  await client.query(
    `
      INSERT INTO charging (
        id,
        vehicle_id,
        data,
        payload
      )
      VALUES (
        $1,
        $2,
        $3::jsonb,
        $3::jsonb
      )

      ON CONFLICT (id)
      DO UPDATE SET
        vehicle_id = EXCLUDED.vehicle_id,
        data = EXCLUDED.data,
        payload = EXCLUDED.payload
    `,
    [
      id,
      vehicle.id,
      data,
    ]
  );
}

/*
=========================================================
INSERT GALLERY MEDIA
=========================================================
*/

async function insertMedia(vehicle) {
  for (let i = 0; i < vehicle.images.length; i++) {
    const mediaId = `${vehicle.id}-media-${i + 1}`;

    const url = commons(vehicle.images[i]);

    const data = {
      id: mediaId,
      entity: {
        type: "vehicle",
        id: vehicle.id,
      },
      vehicleId: vehicle.id,
      type: "image",
      url,
      alt: `${vehicle.name} electric vehicle gallery image ${i + 1}`,
      gallery: true,
      source: "Wikimedia Commons",
    };

    await client.query(
      `
        INSERT INTO media (
          id,
          vehicle_id,
          type,
          url,
          alt,
          payload
        )
        VALUES (
          $1,
          $2,
          'image',
          $3,
          $4,
          $5::jsonb
        )

        ON CONFLICT (id)
        DO UPDATE SET
          vehicle_id = EXCLUDED.vehicle_id,
          type = EXCLUDED.type,
          url = EXCLUDED.url,
          alt = EXCLUDED.alt,
          payload = EXCLUDED.payload
      `,
      [
        mediaId,
        vehicle.id,
        url,
        `${vehicle.name} electric vehicle gallery image ${i + 1}`,
        data,
      ]
    );
  }
}

/*
=========================================================
MAIN
=========================================================
*/

async function main() {
  console.log("🔌 Connecting to Neon PostgreSQL...");

  await client.connect();

  console.log("✅ Neon PostgreSQL connected");
  console.log(`🚗 Preparing ${vehicles.length} vehicles...\n`);

  await client.query("BEGIN");

  try {
    for (const vehicle of vehicles) {
      console.log(`➡️ ${vehicle.name} (${vehicle.id})`);

      await insertVehicle(vehicle);
      await insertVariants(vehicle);
      await insertSpecifications(vehicle);
      await insertCharging(vehicle);
      await insertMedia(vehicle);

      console.log(
        `   ✅ vehicle + 3 variants + pricing + 5 specs + charging + ${vehicle.images.length} gallery images`
      );
    }

    await client.query("COMMIT");

    console.log("\n========================================");
    console.log("🎉 10 EV MIGRATION COMPLETED");
    console.log("========================================");

    const result = await client.query(`
      SELECT id, name, slug, brand_id
      FROM vehicles
      ORDER BY created_at DESC
      LIMIT 15
    `);

    console.table(result.rows);

    const count = await client.query(`
      SELECT COUNT(*)::int AS total
      FROM vehicles
    `);

    console.log(`\n🚗 TOTAL VEHICLES IN NEON: ${count.rows[0].total}`);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("\n❌ MIGRATION FAILED");
    console.error(error);

    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();