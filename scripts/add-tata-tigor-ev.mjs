// import "dotenv/config";

// import pg from "pg";

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });


// import "dotenv/config";
// import pg from "pg";

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// import "dotenv/config";
// import pg from "pg";

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// import "dotenv/config";
// import pg from "pg";

// const { Pool } = pg;

// console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL);

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

import dotenv from "dotenv";
import pg from "pg";

dotenv.config({
  path: ".env.local",
});

const { Pool } = pg;

console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL missing. Check .env.local in project root."
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
/* =========================================================
   CONSTANTS
========================================================= */

const now = new Date();

const VEHICLE_ID = "tata-tigor-ev";
const BRAND_ID = "tata";
const MARKET_ID = "india";

const IMAGE_URL =
  "https://cdn-s3.autocarindia.com/Tata/Tigor-Ev/_DSC9461.JPG";

const SOURCE = "CarDekho";
const SOURCE_URL =
  "https://www.cardekho.com/tata/tigor-ev";

/* =========================================================
   VARIANTS
========================================================= */

const variants = [
  {
    id: "tata-tigor-ev-xe",
    name: "Tigor EV XE",
    price: 1249000,
    features: [
      "Dual Airbags",
      "Automatic Climate Control",
      "Front Power Windows",
      "Height Adjustable Driver's Seat",
      "Tilt Adjustable Steering Wheel",
      "Electrically Adjustable ORVMs",
      "ABS",
      "Parking Sensors",
    ],
  },

  {
    id: "tata-tigor-ev-xt",
    name: "Tigor EV XT",
    price: 1299000,
    features: [
      "7-Inch Touchscreen Infotainment",
      "Android Auto",
      "Apple CarPlay",
      "Remote Lock/Unlock",
      "All 4 Power Windows",
      "Automatic Climate Control",
      "Steering Mounted Controls",
      "Digital Instrument Cluster",
    ],
  },

  {
    id: "tata-tigor-ev-xz-plus",
    name: "Tigor EV XZ Plus",
    price: 1349000,
    features: [
      "Cruise Control",
      "Rain Sensing Wipers",
      "Electrically Foldable ORVMs",
      "Rear Parking Camera",
      "Keyless Entry",
      "Push Button Start",
      "7-Inch Touchscreen Infotainment",
      "Android Auto",
      "Apple CarPlay",
    ],
  },

  {
    id: "tata-tigor-ev-xz-plus-lux",
    name: "Tigor EV XZ Plus LUX",
    price: 1375000,
    features: [
      "Leatherette Upholstery",
      "Cruise Control",
      "Rain Sensing Wipers",
      "Electrically Foldable ORVMs",
      "Rear Parking Camera",
      "Keyless Entry",
      "Push Button Start",
      "7-Inch Touchscreen Infotainment",
      "Android Auto",
      "Apple CarPlay",
    ],
  },
];

/* =========================================================
   MAIN
========================================================= */

async function main() {
  const client = await pool.connect();

  try {
    console.log("=================================================");
    console.log("🚗 EVINSIGHTS - ADD TATA TIGOR EV");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. BRAND
    ===================================================== */

    console.log("🏷️ Upserting Tata brand...");

    await client.query(
      `
      INSERT INTO brands (
        id,
        name,
        slug,
        country,
        logo,
        payload,
        created_at,
        updated_at
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6::jsonb,
        $7,
        $7
      )
      ON CONFLICT (id)
      DO UPDATE SET
        name = EXCLUDED.name,
        slug = EXCLUDED.slug,
        country = EXCLUDED.country,
        payload = EXCLUDED.payload,
        updated_at = EXCLUDED.updated_at
      `,
      [
        BRAND_ID,
        "Tata Motors",
        "tata",
        "India",
        null,
        JSON.stringify({
          name: "Tata Motors",
          country: "India",
          slug: "tata",
        }),
        now,
      ]
    );

    console.log("   ✅ Tata brand ready");

    /* =====================================================
       2. MARKET
    ===================================================== */

    console.log("🌍 Upserting India market...");

    await client.query(
      `
      INSERT INTO markets (
        id,
        name,
        currency_code,
        payload
      )
      VALUES (
        $1,
        $2,
        $3,
        $4::jsonb
      )
      ON CONFLICT (id)
      DO UPDATE SET
        name = EXCLUDED.name,
        currency_code = EXCLUDED.currency_code,
        payload = EXCLUDED.payload
      `,
      [
        MARKET_ID,
        "India",
        "INR",
        JSON.stringify({
          country: "India",
          currency: "INR",
        }),
      ]
    );

    console.log("   ✅ India market ready");

    /* =====================================================
       3. CLEAN OLD TIGOR EV DATA
    ===================================================== */

    console.log("\n🧹 Cleaning existing Tata Tigor EV records...");

    await client.query(
      `
      DELETE FROM pricing
      WHERE variant_id IN (
        SELECT id
        FROM variants
        WHERE vehicle_id = $1
      )
      `,
      [VEHICLE_ID]
    );

    await client.query(
      `
      DELETE FROM variants
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID]
    );

    await client.query(
      `
      DELETE FROM specifications
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID]
    );

    await client.query(
      `
      DELETE FROM charging
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID]
    );

    await client.query(
      `
      DELETE FROM media
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID]
    );

    await client.query(
      `
      DELETE FROM vehicles
      WHERE id = $1
      `,
      [VEHICLE_ID]
    );

    console.log("   ✅ Existing Tata Tigor EV data cleaned");

    /* =====================================================
       4. CANONICAL VEHICLE DATA
    ===================================================== */

    console.log("\n🚗 Inserting Tata Tigor EV...");

    const vehiclePayload = {
      /* ---------------------------------------------------
         IDENTITY
      --------------------------------------------------- */

      name: "Tata Tigor EV",
      model: "Tigor EV",
      brand: "Tata Motors",
      brandId: BRAND_ID,

      /* ---------------------------------------------------
         SOURCE
      --------------------------------------------------- */

      source: SOURCE,
      sourceUrl: SOURCE_URL,

      /* ---------------------------------------------------
         BATTERY
      --------------------------------------------------- */

      batteryCapacity: 26,
      batteryCapacityKwh: 26,
      batteryKwh: 26,

      batteryCapacityUnit: "kWh",
      batteryType: "Lithium-ion",

      /* ---------------------------------------------------
         RANGE
      --------------------------------------------------- */

      range: 315,
      rangeKm: 315,
      araiRange: 315,
      wltpRange: null,

      rangeUnit: "km",

      /* ---------------------------------------------------
         MOTOR
      --------------------------------------------------- */

      motorPower: 55,
      motorPowerKw: 55,
      powerKw: 55,
      power: 55,

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous",

      maxPower: 73.75,
      maxPowerUnit: "bhp",

      maxTorque: 170,
      torque: 170,
      torqueNm: 170,
      torqueUnit: "Nm",

      /* ---------------------------------------------------
         DRIVETRAIN
      --------------------------------------------------- */

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "1-Speed",

      driveType: "FWD",
      drivetrain: "FWD",

      /* ---------------------------------------------------
         CHARGING
      --------------------------------------------------- */

      chargingPort: "CCS-II",

      /* ---------------------------------------------------
         SEATING
      --------------------------------------------------- */

      seats: 5,
      seatingCapacity: 5,

      /* ---------------------------------------------------
         DIMENSIONS
      --------------------------------------------------- */

      length: 3993,
      lengthMm: 3993,

      width: 1677,
      widthMm: 1677,

      height: null,
      heightMm: null,

      wheelbase: 2450,
      wheelbaseMm: 2450,

      groundClearance: null,
      groundClearanceMm: null,

      bootSpace: 316,
      bootCapacity: 316,
      bootCapacityLitres: 316,

      /* ---------------------------------------------------
         CLASSIFICATION
      --------------------------------------------------- */

      bodyType: "Sedan",
      fuelType: "Electric",

      /* ---------------------------------------------------
         PRICE
      --------------------------------------------------- */

      priceMin: 1249000,
      priceMax: 1375000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      /* ---------------------------------------------------
         RATING
      --------------------------------------------------- */

      rating: 4.1,
      reviewCount: 98,

      /* ---------------------------------------------------
         IMAGE
      --------------------------------------------------- */

      image: IMAGE_URL,
      imageUrl: IMAGE_URL,
    };

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
        payload,
        created_at,
        updated_at
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7::jsonb,
        $8::jsonb,
        $9::jsonb,
        $10::jsonb,
        $11::jsonb,
        $12::jsonb,
        $13,
        $14,
        $15::jsonb,
        $16,
        $16
      )
      `,
      [
        VEHICLE_ID,

        "Tata Tigor EV",

        "tata-tigor-ev",

        BRAND_ID,

        null,

        ["india"],

        JSON.stringify({
          bodyType: "Sedan",
          fuelType: "Electric",
          seatingCapacity: 5,
        }),

        JSON.stringify({
          status: "active",
          launched: true,
          available: true,
        }),

        JSON.stringify({
          title: "Tata Tigor EV",
          slug: "tata-tigor-ev",
          description:
            "Tata Tigor EV electric sedan with a 26 kWh battery, 315 km claimed range and practical urban-focused electric performance.",
        }),

        JSON.stringify({
          ...vehiclePayload,

          specs: {
            battery: 26,
            range: 315,
            power: 55,
            torque: 170,
          },
        }),

        JSON.stringify({
          source: SOURCE,
          sourceUrl: SOURCE_URL,
          verified: true,
        }),

        JSON.stringify({
          source: SOURCE,
          sourceUrl: SOURCE_URL,
          market: "India",
          image: IMAGE_URL,
          imageUrl: IMAGE_URL,
        }),

        4.1,

        98,

        JSON.stringify(vehiclePayload),

        now,
      ]
    );

    console.log("   ✅ Vehicle inserted");

    /* =====================================================
       5. VARIANTS + PRICING
    ===================================================== */

    console.log("\n📦 Inserting variants...");

    for (const variant of variants) {
      await client.query(
        `
        INSERT INTO variants (
          id,
          vehicle_id,
          name,
          slug,
          payload,
          created_at,
          updated_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5::jsonb,
          $6,
          $6
        )
        `,
        [
          variant.id,

          VEHICLE_ID,

          variant.name,

          variant.id,

          JSON.stringify({
            name: variant.name,

            batteryCapacity: 26,
            batteryCapacityKwh: 26,

            range: 315,
            rangeKm: 315,

            motorPower: 55,
            motorPowerKw: 55,

            maxPower: 73.75,

            maxTorque: 170,

            transmission: "Automatic",
            transmissionType: "Automatic",

            gearbox: "1-Speed",

            driveType: "FWD",
            drivetrain: "FWD",

            fuelType: "Electric",

            features: variant.features,
          }),

          now,
        ]
      );

      await client.query(
        `
        INSERT INTO pricing (
          id,
          variant_id,
          market_id,
          amount,
          currency_code,
          currency_symbol,
          payload,
          created_at,
          updated_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7::jsonb,
          $8,
          $8
        )
        `,
        [
          `pricing-${variant.id}-india`,

          variant.id,

          MARKET_ID,

          variant.price,

          "INR",

          "₹",

          JSON.stringify({
            price: variant.price,
            amount: variant.price,

            currency: "INR",
            currencyCode: "INR",
            currencySymbol: "₹",

            market: "India",

            source: SOURCE,
            sourceUrl: SOURCE_URL,
          }),

          now,
        ]
      );

      console.log(
        `   ✅ ${variant.name} → ₹${variant.price.toLocaleString(
          "en-IN"
        )}`
      );
    }

    /* =====================================================
       6. SPECIFICATIONS
       
       ONLY valid types:
       battery
       performance
       dimensions
       safety
       features
    ===================================================== */

    console.log("\n⚙️ Inserting specifications...");

    /* -----------------------------------------------------
       BATTERY
    ----------------------------------------------------- */

    const batteryData = {
      batteryCapacity: 26,
      batteryCapacityKwh: 26,
      batteryKwh: 26,

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-ion",

      range: 315,
      rangeKm: 315,
      rangeUnit: "km",

      chargingPort: "CCS-II",

      charging: {
        acCharging:
          "9H 24min | 3.3 kW (0-100%)",

        dcFastCharging:
          "59 min | 18 kW (10-80%)",

        chargingOptions: [
          "3.3 kW AC",
          "7.2 kW AC",
          "18 kW DC",
        ],

        fifteenAmpCharging:
          "9H 24min (10-100%)",
      },
    };

    /* -----------------------------------------------------
       PERFORMANCE
    ----------------------------------------------------- */

    const performanceData = {
      motorPower: 55,
      motorPowerKw: 55,
      powerKw: 55,

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous",

      maxPower: 73.75,
      maxPowerUnit: "bhp",

      maxTorque: 170,
      torque: 170,
      torqueNm: 170,

      torqueUnit: "Nm",

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "1-Speed",

      driveType: "FWD",
      drivetrain: "FWD",

      acceleration0To60: 5.7,
      acceleration0To60Unit: "seconds",

      regenerativeBraking: true,

      regenerativeBrakingLevels: 4,

      suspensionSteeringBrakes: {
        frontSuspension:
          "MacPherson Strut suspension",

        rearSuspension:
          "Rear twist beam",

        steeringType:
          "Electric",

        steeringColumn:
          "Tilt",

        turningRadius: 5.1,
        turningRadiusUnit: "m",

        frontBrakeType: "Disc",

        rearBrakeType: "Drum",
      },
    };

    /* -----------------------------------------------------
       DIMENSIONS
    ----------------------------------------------------- */

    const dimensionsData = {
      length: 3993,
      lengthMm: 3993,

      width: 1677,
      widthMm: 1677,

      height: null,
      heightMm: null,

      wheelbase: 2450,
      wheelbaseMm: 2450,

      bootSpace: 316,
      bootCapacity: 316,
      bootCapacityLitres: 316,

      seatingCapacity: 5,
      seats: 5,

      groundClearance: null,
      groundClearanceMm: null,

      exterior: {
        bodyType: "Sedan",

        ledHeadlamps: false,

        ledTaillights: false,

        fogLights: true,

        orvm:
          "Electrically Adjustable",

        tyreType:
          "Tubeless",

        additionalFeatures: [
          "EV-specific exterior styling",
          "Blue EV accents",
        ],
      },
    };

    /* -----------------------------------------------------
       SAFETY
    ----------------------------------------------------- */

    const safetyData = {
      airbags: 2,

      abs: true,

      brakeAssist: true,

      ebd: true,

      tpms: true,

      esc: false,

      rearParkingCamera: true,

      parkingSensors: true,

      globalNcapRating: 4,

      adas: {
        available: false,
      },
    };

    /* -----------------------------------------------------
       FEATURES
    ----------------------------------------------------- */

    const featuresData = {
      comfortConvenience: {
        automaticClimateControl: true,

        heightAdjustableDriverSeat: true,

        adjustableSteering:
          "Tilt Adjustable",

        cruiseControl: true,

        parkingSensors:
          "Rear",

        rearParkingCamera: true,

        keylessEntry: true,

        pushButtonStart: true,

        powerWindows:
          "All 4",

        electricallyAdjustableORVMs: true,

        electricallyFoldableORVMs: true,

        rainSensingWipers: true,
      },

      interior: {
        digitalInstrumentCluster: true,

        leatheretteUpholstery: true,

        automaticClimateControl: true,
      },

      entertainmentCommunication: {
        touchscreenSize:
          "7 inch",

        androidAuto: true,

        appleCarPlay: true,

        steeringMountedControls: true,

        harmanAudioSystem: true,

        speakers: 8,
      },

      advancedInternetFeatures: {
        connectedCarTechnology: true,

        remoteLockUnlock: true,

        remoteVehicleStatusCheck: true,

        vehicleTracking: true,

        remoteClimateControl: true,
      },
    };

    /* -----------------------------------------------------
       INSERT SPECIFICATION
    ----------------------------------------------------- */

    async function insertSpecification(
      type,
      data
    ) {
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
          $5::jsonb
        )
        `,
        [
          `spec-${VEHICLE_ID}-${type}`,

          VEHICLE_ID,

          type,

          JSON.stringify(data),

          JSON.stringify({
            source: SOURCE,
            sourceUrl: SOURCE_URL,
            type,
          }),
        ]
      );

      console.log(
        `   ✅ ${type} specification inserted`
      );
    }

    await insertSpecification(
      "battery",
      batteryData
    );

    await insertSpecification(
      "performance",
      performanceData
    );

    await insertSpecification(
      "dimensions",
      dimensionsData
    );

    await insertSpecification(
      "safety",
      safetyData
    );

    await insertSpecification(
      "features",
      featuresData
    );

    /* =====================================================
       7. CHARGING
    ===================================================== */

    console.log("\n🔋 Inserting charging data...");

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
        $4::jsonb
      )
      `,
      [
        `charging-${VEHICLE_ID}`,

        VEHICLE_ID,

        JSON.stringify({
          chargingPort: "CCS-II",

          chargingTime:
            "59 min | 18 kW DC (10-80%)",

          acChargingTime:
            "9H 24min | 3.3 kW (0-100%)",

          portableCharging:
            "15A Plug Point",

          chargingOptions: [
            "3.3 kW AC",
            "7.2 kW AC",
            "18 kW DC",
          ],

          fastCharging: true,

          acPowerKw: 7.2,

          dcPowerKw: 18,
        }),

        JSON.stringify({
          source: SOURCE,
          sourceUrl: SOURCE_URL,
        }),
      ]
    );

    console.log("   ✅ Charging data inserted");

    /* =====================================================
       8. MEDIA
    ===================================================== */

    console.log("\n🖼️ Inserting media...");

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
        $3,
        $4,
        $5,
        $6::jsonb
      )
      `,
      [
        `media-${VEHICLE_ID}-main`,

        VEHICLE_ID,

        "image",

        IMAGE_URL,

        "Tata Tigor EV front left side",

        JSON.stringify({
          source: SOURCE,
          sourceUrl: SOURCE_URL,
          role: "primary",
        }),
      ]
    );

    console.log("   ✅ Main image inserted");

    /* =====================================================
       9. VERIFY BEFORE COMMIT
    ===================================================== */

    console.log(
      "\n🔎 Verifying inserted Tata Tigor EV data..."
    );

    const vehicleCheck =
      await client.query(
        `
        SELECT
          id,
          name,
          slug,
          brand_id,
          rating,
          review_count,
          payload
        FROM vehicles
        WHERE id = $1
        `,
        [VEHICLE_ID]
      );

    const variantCheck =
      await client.query(
        `
        SELECT COUNT(*)::int AS count
        FROM variants
        WHERE vehicle_id = $1
        `,
        [VEHICLE_ID]
      );

    const specificationCheck =
      await client.query(
        `
        SELECT
          type,
          data
        FROM specifications
        WHERE vehicle_id = $1
        ORDER BY type
        `,
        [VEHICLE_ID]
      );

    const chargingCheck =
      await client.query(
        `
        SELECT
          id,
          data
        FROM charging
        WHERE vehicle_id = $1
        `,
        [VEHICLE_ID]
      );

    const mediaCheck =
      await client.query(
        `
        SELECT
          id,
          type,
          url
        FROM media
        WHERE vehicle_id = $1
        `,
        [VEHICLE_ID]
      );

    if (!vehicleCheck.rows.length) {
      throw new Error(
        "Verification failed: vehicle was not inserted."
      );
    }

    if (
      Number(
        variantCheck.rows[0]?.count || 0
      ) !== variants.length
    ) {
      throw new Error(
        `Verification failed: expected ${variants.length} variants.`
      );
    }

    const specificationTypes =
      specificationCheck.rows.map(
        (row) => row.type
      );

    const expectedTypes = [
      "battery",
      "performance",
      "dimensions",
      "safety",
      "features",
    ];

    for (const type of expectedTypes) {
      if (
        !specificationTypes.includes(type)
      ) {
        throw new Error(
          `Verification failed: missing ${type} specification.`
        );
      }
    }

    if (!chargingCheck.rows.length) {
      throw new Error(
        "Verification failed: charging data missing."
      );
    }

    if (!mediaCheck.rows.length) {
      throw new Error(
        "Verification failed: media data missing."
      );
    }

    const insertedPayload =
      vehicleCheck.rows[0].payload;

    console.log(
      "\n   Vehicle:",
      vehicleCheck.rows[0].name
    );

    console.log(
      "   Battery:",
      insertedPayload.batteryCapacity,
      "kWh"
    );

    console.log(
      "   Range:",
      insertedPayload.range,
      "km"
    );

    console.log(
      "   Power:",
      insertedPayload.motorPower,
      "kW"
    );

    console.log(
      "   Torque:",
      insertedPayload.maxTorque,
      "Nm"
    );

    console.log(
      "   Variants:",
      variantCheck.rows[0].count
    );

    console.log(
      "   Specifications:",
      specificationTypes.join(", ")
    );

    console.log(
      "   Charging:",
      chargingCheck.rows.length
    );

    console.log(
      "   Media:",
      mediaCheck.rows.length
    );

    /* =====================================================
       10. COMMIT
    ===================================================== */

    await client.query("COMMIT");

    console.log(
      "\n================================================="
    );

    console.log(
      "🎉 TATA TIGOR EV INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle        : Tata Tigor EV"
    );

    console.log(
      "Variants       :",
      variants.length
    );

    console.log(
      "Specifications : 5"
    );

    console.log(
      "Charging       : 1"
    );

    console.log(
      "Media          : 1"
    );

    console.log(
      "Battery        : 26 kWh"
    );

    console.log(
      "Range          : 315 km"
    );

    console.log(
      "Motor Power    : 55 kW"
    );

    console.log(
      "Max Power      : 73.75 bhp"
    );

    console.log(
      "Torque         : 170 Nm"
    );

    console.log(
      "Price range    : ₹12.49L - ₹13.75L"
    );

    console.log(
      "Rating         : 4.1 / 5"
    );

    console.log(
      "Reviews        : 98"
    );

    console.log(
      "\nSpecification types:"
    );

    console.log(
      "   ✅ battery"
    );

    console.log(
      "   ✅ performance"
    );

    console.log(
      "   ✅ dimensions"
    );

    console.log(
      "   ✅ safety"
    );

    console.log(
      "   ✅ features"
    );

    console.log(
      "\n✅ Database transaction committed."
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "\n❌ INSERT FAILED"
    );

    console.error(
      "Transaction rolled back."
    );

    console.error(error);

    console.error(
      "\n⚠️ No partial Tata Tigor EV data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
