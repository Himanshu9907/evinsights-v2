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

const VEHICLE_ID = "maruti-e-vitara";
const BRAND_ID = "maruti-suzuki";
const MARKET_ID = "india";

const IMAGE_URL =
  "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/e-Vitara/13326/1771560398854/front-left-side-47.jpg";

const SOURCE = "CarDekho";

const SOURCE_URL =
  "https://www.cardekho.com/maruti/e-vitara";

/* =========================================================
   VARIANTS
========================================================= */

const variants = [
  {
    id: "maruti-e-vitara-delta",
    name: "e Vitara Delta",
    price: 1619000,
    features: [
      "10.1-inch Touchscreen Infotainment",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "10.25-inch Digital Driver Display",
      "Automatic Climate Control",
      "Push Button Start Stop",
      "7 Airbags",
      "ESP",
    ],
  },

  {
    id: "maruti-e-vitara-zeta",
    name: "e Vitara Zeta",
    price: 1794000,
    features: [
      "Wireless Phone Charger",
      "Rear Parking Camera",
      "10.1-inch Touchscreen Infotainment",
      "10.25-inch Digital Driver Display",
      "Automatic Climate Control",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "7 Airbags",
    ],
  },

  {
    id: "maruti-e-vitara-alpha",
    name: "e Vitara Alpha",
    price: 1999000,
    features: [
      "360-Degree Camera",
      "Glass Roof",
      "Ventilated Front Seats",
      "Infinity Premium Sound System",
      "Level-2 ADAS",
      "10-Way Power Adjustable Driver Seat",
      "Wireless Phone Charger",
      "Rear Parking Camera",
    ],
  },

  {
    id: "maruti-e-vitara-alpha-dual-tone",
    name: "e Vitara Alpha Dual Tone",
    price: 2021000,
    features: [
      "360-Degree Camera",
      "Glass Roof",
      "Ventilated Front Seats",
      "Infinity Premium Sound System",
      "Level-2 ADAS",
      "10-Way Power Adjustable Driver Seat",
      "Wireless Phone Charger",
      "Dual Tone Exterior",
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
    console.log("🚗 EVINSIGHTS - ADD MARUTI SUZUKI E VITARA");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. BRAND
    ===================================================== */

    console.log("🏷️ Upserting Maruti Suzuki brand...");

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
        "Maruti Suzuki",
        "maruti-suzuki",
        "India",
        null,
        JSON.stringify({
          name: "Maruti Suzuki",
          country: "India",
          slug: "maruti-suzuki",
        }),
        now,
      ]
    );

    console.log("   ✅ Maruti Suzuki brand ready");

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
       3. CLEAN OLD E VITARA DATA
    ===================================================== */

    console.log("\n🧹 Cleaning existing Maruti Suzuki e Vitara records...");

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

    console.log("   ✅ Existing Maruti Suzuki e Vitara data cleaned");

    /* =====================================================
       4. CANONICAL VEHICLE DATA
    ===================================================== */

    console.log("\n🚗 Inserting Maruti Suzuki e Vitara...");

    const vehiclePayload = {
      /* ---------------------------------------------------
         IDENTITY
      --------------------------------------------------- */

      name: "Maruti Suzuki e Vitara",
      model: "e Vitara",
      brand: "Maruti Suzuki",
      brandId: BRAND_ID,

      /* ---------------------------------------------------
         SOURCE
      --------------------------------------------------- */

      source: SOURCE,
      sourceUrl: SOURCE_URL,

      /* ---------------------------------------------------
         BATTERY
      --------------------------------------------------- */

      batteryCapacity: 61,
      batteryCapacityKwh: 61,
      batteryKwh: 61,

      batteryCapacityUnit: "kWh",
      batteryType: "Lithium-ion",

      /* ---------------------------------------------------
         RANGE
      --------------------------------------------------- */

      range: 543,
      rangeKm: 543,
      claimedRange: 543,
      araiRange: 543,
      wltpRange: null,

      rangeUnit: "km",

      /* ---------------------------------------------------
         MOTOR
      --------------------------------------------------- */

      motorPower: 128,
      motorPowerKw: 128,
      powerKw: 128,

      power: 128,
      powerUnit: "kW",

      motorType:
        "3 Phase AC Permanent Magnet Synchronous",

      maxPower: 172,
      maxPowerUnit: "bhp",

      maxTorque: 193,
      torque: 193,
      torqueNm: 193,

      torqueUnit: "Nm",

      /* ---------------------------------------------------
         DRIVETRAIN
      --------------------------------------------------- */

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "Single Speed",

      driveType: "2WD",
      drivetrain: "2WD",

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

      length: 4275,
      lengthMm: 4275,

      width: 1800,
      widthMm: 1800,

      height: 1640,
      heightMm: 1640,

      wheelbase: 2700,
      wheelbaseMm: 2700,

      groundClearance: 185,
      groundClearanceMm: 185,

      bootSpace: 310,
      bootCapacity: 310,
      bootCapacityLitres: 310,

      /* ---------------------------------------------------
         WEIGHT
      --------------------------------------------------- */

      kerbWeight: 1815,
      grossWeight: 2250,

      /* ---------------------------------------------------
         CLASSIFICATION
      --------------------------------------------------- */

      bodyType: "SUV",
      fuelType: "Electric",

      /* ---------------------------------------------------
         PRICE
      --------------------------------------------------- */

      priceMin: 1619000,
      priceMax: 2021000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      /* ---------------------------------------------------
         RATING
      --------------------------------------------------- */

      rating: 4.7,
      reviewCount: 21,

      /* ---------------------------------------------------
         IMAGE
      --------------------------------------------------- */

      image: IMAGE_URL,
      imageUrl: IMAGE_URL,
    };

    /* =====================================================
       INSERT VEHICLE
    ===================================================== */

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

        "Maruti Suzuki e Vitara",

        "maruti-e-vitara",

        BRAND_ID,

        null,

        ["india"],

        JSON.stringify({
          bodyType: "SUV",
          fuelType: "Electric",
          seatingCapacity: 5,
        }),

        JSON.stringify({
          status: "active",
          launched: true,
          available: true,
        }),

        JSON.stringify({
          title: "Maruti Suzuki e Vitara",
          slug: "maruti-e-vitara",
          description:
            "Maruti Suzuki e Vitara electric SUV with a 61 kWh battery, 543 km claimed range and 128 kW electric motor.",
        }),

        JSON.stringify({
          ...vehiclePayload,

          specs: {
            battery: 61,
            range: 543,
            power: 128,
            torque: 193,
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

        4.7,

        21,

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

            batteryCapacity: 61,
            batteryCapacityKwh: 61,

            range: 543,
            rangeKm: 543,

            motorPower: 128,
            motorPowerKw: 128,

            maxPower: 172,
            maxTorque: 193,

            transmission: "Automatic",
            transmissionType: "Automatic",

            gearbox: "Single Speed",

            driveType: "2WD",
            drivetrain: "2WD",

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
      batteryCapacity: 61,
      batteryCapacityKwh: 61,
      batteryKwh: 61,

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-ion",

      range: 543,
      rangeKm: 543,
      rangeUnit: "km",

      chargingPort: "CCS-II",

      charging: {
        acCharging:
          "9.0 H | 7.4 kW AC (10-100%)",

        dcFastCharging:
          "45 Min | 50 kW DC (10-80%)",

        chargingOptions: [
          "7.4 kW AC",
          "50 kW DC",
        ],

        fifteenAmpCharging:
          "15A charging supported",
      },
    };

    /* -----------------------------------------------------
       PERFORMANCE
    ----------------------------------------------------- */

    const performanceData = {
      motorPower: 128,
      motorPowerKw: 128,
      powerKw: 128,

      powerUnit: "kW",

      motorType:
        "3 Phase AC Permanent Magnet Synchronous",

      maxPower: 172,
      maxPowerUnit: "bhp",

      maxTorque: 193,
      torque: 193,
      torqueNm: 193,

      torqueUnit: "Nm",

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "Single Speed",

      driveType: "2WD",
      drivetrain: "2WD",

      regenerativeBraking: true,

      regenerativeBrakingLevels: null,

      suspensionSteeringBrakes: {
        frontSuspension:
          "MacPherson Strut suspension",

        rearSuspension:
          "Multi-link suspension",

        steeringType:
          "Electric",

        steeringColumn:
          "Tilt & Telescopic",

        turningRadius: 5.2,
        turningRadiusUnit: "m",

        frontBrakeType: "Disc",

        rearBrakeType: "Disc",
      },
    };

    /* -----------------------------------------------------
       DIMENSIONS
    ----------------------------------------------------- */

    const dimensionsData = {
      length: 4275,
      lengthMm: 4275,

      width: 1800,
      widthMm: 1800,

      height: 1640,
      heightMm: 1640,

      wheelbase: 2700,
      wheelbaseMm: 2700,

      bootSpace: 310,
      bootCapacity: 310,
      bootCapacityLitres: 310,

      seatingCapacity: 5,
      seats: 5,

      groundClearance: 185,
      groundClearanceMm: 185,

      kerbWeight: 1815,
      grossWeight: 2250,

      exterior: {
        bodyType: "SUV",

        ledHeadlamps: true,

        ledTaillights: true,

        fogLights: true,

        orvm:
          "Powered & Folding",

        tyreSize:
          "225/55 R18",

        tyreType:
          "Tubeless Radial",

        additionalFeatures: [
          "Shark Fin Antenna",
          "Sunroof with Fixed Glass",
          "LED DRLs",
          "LED Headlamps",
          "LED Taillights",
        ],
      },
    };

    /* -----------------------------------------------------
       SAFETY
    ----------------------------------------------------- */

    const safetyData = {
      airbags: 7,

      abs: true,

      brakeAssist: true,

      ebd: true,

      tpms: true,

      esc: true,

      tractionControl: true,

      rearParkingCamera: true,

      parkingSensors: true,

      hillAssist: true,

      isofix: true,

      rearCameraGuidelines: true,

      electronicStabilityControl: true,

      globalNcapRating: 5,

      globalNcapChildRating: 5,

      bharatNcapRating: 5,

      bharatNcapChildRating: 5,

      adas: {
        available: true,

        level: 2,

        features: [
          "Forward Collision Warning",
          "Automatic Emergency Braking",
          "Lane Keep Assist",
          "Lane Departure Prevention Assist",
          "Adaptive Cruise Control",
          "Adaptive High Beam Assist",
          "Rear Cross Traffic Alert",
          "Blind Spot Monitor",
        ],

        availability: {
          delta: false,
          zeta: false,
          alpha: true,
          alphaDualTone: true,
        },
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
          "Height & Reach",

        ventilatedSeats: true,

        electricAdjustableSeats: true,

        cruiseControl: true,

        parkingSensors:
          "Front & Rear",

        rearParkingCamera: true,

        keylessEntry: true,

        pushButtonStart: true,

        powerWindows:
          "Front & Rear",

        electricallyAdjustableORVMs: true,

        electricallyFoldableORVMs: true,

        rearACVents: true,

        driveModes: 3,

        driveModeTypes: [
          "ECO",
          "NORMAL",
          "SPORTS",
        ],

        cupHolders:
          "Front & Rear",

        usbCharger:
          "Front & Rear",

        centralConsoleArmrest:
          "With Storage",

        followMeHomeHeadlamps: true,
      },

      interior: {
        digitalInstrumentCluster: true,

        digitalClusterSize:
          "10.25 inch",

        leatherWrappedSteeringWheel: true,

        leatherUpholstery: true,

        ambientLighting: true,

        footwellLamp: true,

        parcelTray: true,
      },

      entertainmentCommunication: {
        touchscreenSize:
          "10.1 inch",

        androidAuto: true,

        appleCarPlay: true,

        wirelessAndroidAuto: true,

        wirelessAppleCarPlay: true,

        wirelessPhoneCharging: true,

        bluetoothConnectivity: true,

        speakers: 8,

        tweeters: 4,

        subwoofer: 1,

        premiumAudioSystem:
          "Infinity Premium Sound System",

        speakersPosition:
          "Front & Rear",
      },

      exterior: {
        sharkFinAntenna: true,

        automaticHeadlamps: true,

        rainSensingWiper: true,

        rearWindowWiper: true,

        rearWindowWasher: true,

        rearWindowDefogger: true,

        alloyWheels: true,

        rearSpoiler: true,

        projectorHeadlamps: true,

        ledDRLs: true,

        ledHeadlamps: true,

        ledTaillights: true,

        ledFogLamps: true,

        sunroof:
          "Fixed Glass",

        tyreSize:
          "225/55 R18",
      },

      advancedInternetFeatures: {
        connectedCarTechnology: true,

        liveLocation: true,

        remoteImmobiliser: true,

        remoteVehicleStatusCheck: true,

        eCallAndICall: true,

        googleAlexaConnectivity: true,

        sosButton: true,

        overspeedingAlert: true,

        towAwayAlert: true,

        remoteACOnOff: true,

        remoteDoorLockUnlock: true,

        sosEmergencyAssistance: true,

        geoFenceAlert: true,

        inbuiltApps: [
          "Suzuki Navigation App",
        ],
      },
    };

    /* -----------------------------------------------------
       INSERT SPECIFICATION
    ----------------------------------------------------- */

    async function insertSpecification(type, data) {
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
            "45 Min | 50 kW DC (10-80%)",

          acChargingTime:
            "9.0 H | 7.4 kW AC (10-100%)",

          portableCharging:
            "15A Plug Point",

          chargingOptions: [
            "7.4 kW AC",
            "50 kW DC",
          ],

          fastCharging: true,

          acPowerKw: 7.4,

          dcPowerKw: 50,

          acChargingRange:
            "10-100%",

          dcChargingRange:
            "10-80%",
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

        "Maruti Suzuki e Vitara front left side",

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
      "\n🔎 Verifying inserted Maruti Suzuki e Vitara data..."
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
      "   Max Power:",
      insertedPayload.maxPower,
      "bhp"
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
      "🎉 MARUTI SUZUKI E VITARA INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle        : Maruti Suzuki e Vitara"
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
      "Battery        : 61 kWh"
    );

    console.log(
      "Range          : 543 km"
    );

    console.log(
      "Motor Power    : 128 kW"
    );

    console.log(
      "Max Power      : 172 bhp"
    );

    console.log(
      "Torque         : 193 Nm"
    );

    console.log(
      "Price range    : ₹16.19L - ₹20.21L"
    );

    console.log(
      "Rating         : 4.7 / 5"
    );

    console.log(
      "Reviews        : 21"
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
      "\nVariants:"
    );

    console.log(
      "   ✅ e Vitara Delta"
    );

    console.log(
      "   ✅ e Vitara Zeta"
    );

    console.log(
      "   ✅ e Vitara Alpha"
    );

    console.log(
      "   ✅ e Vitara Alpha Dual Tone"
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
      "\n⚠️ No partial Maruti Suzuki e Vitara data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();