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

const VEHICLE_ID = "tesla-model-y";
const BRAND_ID = "tesla";
const MARKET_ID = "india";

const IMAGE_URL = null;

const SOURCE = "CarDekho";
const SOURCE_URL =
  "https://www.cardekho.com/tesla/model-y";

/* =========================================================
   VARIANTS
========================================================= */

const variants = [
  {
    id: "tesla-model-y-premium-rwd",
    name: "Model Y Premium RWD",
    price: 5089000,
    features: [
      "16-Inch Touchscreen Infotainment",
      "9-Speaker Sound System",
      "500 km Claimed Range",
      "Panoramic Glass Roof",
      "Automatic Transmission",
    ],
  },

  {
    id: "tesla-model-y-l-premium-awd",
    name: "Model Y L Premium AWD",
    price: 6199000,
    features: [
      "19-Speaker Sound System",
      "Dual Motor AWD",
      "6-Seater",
      "16-Inch Touchscreen Infotainment",
      "Panoramic Glass Roof",
      "Automatic Transmission",
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
    console.log("🚗 EVINSIGHTS - ADD TESLA MODEL Y");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. BRAND
    ===================================================== */

    console.log("🏷️ Upserting Tesla brand...");

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
        "Tesla",
        "tesla",
        "United States",
        null,
        JSON.stringify({
          name: "Tesla",
          country: "United States",
          slug: "tesla",
        }),
        now,
      ]
    );

    console.log("   ✅ Tesla brand ready");

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
       3. CLEAN OLD TESLA MODEL Y DATA
    ===================================================== */

    console.log(
      "\n🧹 Cleaning existing Tesla Model Y records..."
    );

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

    console.log(
      "   ✅ Existing Tesla Model Y data cleaned"
    );

    /* =====================================================
       4. CANONICAL VEHICLE DATA
    ===================================================== */

    console.log("\n🚗 Inserting Tesla Model Y...");

    const vehiclePayload = {
      /* ---------------------------------------------------
         IDENTITY
      --------------------------------------------------- */

      name: "Tesla Model Y",
      model: "Model Y",
      brand: "Tesla",
      brandId: BRAND_ID,

      /* ---------------------------------------------------
         SOURCE
      --------------------------------------------------- */

      source: SOURCE,
      sourceUrl: SOURCE_URL,

      /* ---------------------------------------------------
         BATTERY
      --------------------------------------------------- */

      batteryCapacity: 82,
      batteryCapacityKwh: 82,
      batteryKwh: 82,

      batteryOptions: [
        82,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: null,

      batteryChemistry: null,

      /* ---------------------------------------------------
         RANGE
      --------------------------------------------------- */

      range: 681,
      rangeKm: 681,

      rangeOptions: [
        681,
      ],

      claimedRange: 681,

      rangeUnit: "km",

      /* ---------------------------------------------------
         MOTOR
      --------------------------------------------------- */

      motorPower: null,
      motorPowerKw: null,

      powerKw: null,
      power: null,

      powerOptionsKw: [],

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous",

      maxPower: null,
      maxPowerUnit: "bhp",

      maxPowerOptions: [],

      maxTorque: null,
      torque: null,
      torqueNm: null,

      torqueUnit: "Nm",

      /* ---------------------------------------------------
         DRIVETRAIN
      --------------------------------------------------- */

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "Single Speed",

      driveType: "AWD",
      drivetrain: "AWD",

      /* ---------------------------------------------------
         CHARGING
      --------------------------------------------------- */

      chargingPort: "CCS-II",

      /* ---------------------------------------------------
         SEATING
      --------------------------------------------------- */

      seats: [5, 6],
      seatingCapacity: [5, 6],

      /* ---------------------------------------------------
         DIMENSIONS
      --------------------------------------------------- */

      length: 4969,
      lengthMm: 4969,

      width: 2129,
      widthMm: 2129,

      height: 1668,
      heightMm: 1668,

      wheelbase: 3040,
      wheelbaseMm: 3040,

      groundClearance: 169,
      groundClearanceMm: 169,

      bootSpace: 420,
      bootCapacity: 420,
      bootCapacityLitres: 420,

      turningRadius: 6.25,
      turningRadiusUnit: "m",

      kerbWeight: 2088,
      kerbWeightKg: 2088,

      /* ---------------------------------------------------
         PERFORMANCE
      --------------------------------------------------- */

      topSpeed: 201,
      topSpeedUnit: "km/h",

      acceleration0To100: 5,
      acceleration0To100Unit: "seconds",

      /* ---------------------------------------------------
         CLASSIFICATION
      --------------------------------------------------- */

      bodyType: "SUV",
      fuelType: "Electric",

      /* ---------------------------------------------------
         PRICE
      --------------------------------------------------- */

      priceMin: 5089000,
      priceMax: 6199000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      /* ---------------------------------------------------
         RATING
      --------------------------------------------------- */

      rating: 4.6,
      reviewCount: 21,

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

        "Tesla Model Y",

        "tesla-model-y",

        BRAND_ID,

        null,

        ["india"],

        JSON.stringify({
          bodyType: "SUV",
          fuelType: "Electric",
          seatingCapacity: [5, 6],
        }),

        JSON.stringify({
          status: "active",
          launched: true,
          available: true,
        }),

        JSON.stringify({
          title: "Tesla Model Y",
          slug: "tesla-model-y",
          description:
            "Tesla Model Y electric SUV with 82 kWh battery, up to 681 km claimed range, CCS-II charging, AWD drivetrain and automatic transmission.",
        }),

        JSON.stringify({
          ...vehiclePayload,

          specs: {
            battery: 82,

            batteryOptions: [
              82,
            ],

            range: 681,

            rangeOptions: [
              681,
            ],

            power: null,

            powerOptions: [],

            torque: null,
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

        4.6,

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
      const isAWD =
        variant.id.includes("-awd");

      const battery = 82;

      const range = 681;

      const driveType =
        isAWD ? "AWD" : null;

      const drivetrain =
        isAWD ? "AWD" : null;

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

            batteryCapacity: battery,
            batteryCapacityKwh: battery,

            range: range,
            rangeKm: range,

            motorPower: null,
            motorPowerKw: null,

            maxPower: null,
            maxPowerUnit: "bhp",

            maxTorque: null,

            transmission: "Automatic",
            transmissionType: "Automatic",

            gearbox: "Single Speed",

            driveType: driveType,
            drivetrain: drivetrain,

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
    ===================================================== */

    console.log("\n⚙️ Inserting specifications...");

    /* -----------------------------------------------------
       BATTERY
    ----------------------------------------------------- */

    const batteryData = {
      batteryCapacity: 82,
      batteryCapacityKwh: 82,
      batteryKwh: 82,

      batteryOptions: [
        82,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: null,

      batteryChemistry: null,

      range: 681,
      rangeKm: 681,

      rangeOptions: [
        681,
      ],

      claimedRange: 681,

      rangeUnit: "km",

      chargingPort: "CCS-II",

      charging: {
        dcFastCharging:
          "250 kW Max",

        dcChargingPowerKw: 250,

        fastCharging: true,

        fastChargingTime:
          "288 km in 15 minutes",

        chargingOptions: [
          "250 kW Max DC",
        ],
      },
    };

    /* -----------------------------------------------------
       PERFORMANCE
    ----------------------------------------------------- */

    const performanceData = {
      motorPower: null,

      motorPowerKw: null,

      powerOptionsKw: [],

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous",

      maxPower: null,
      maxPowerUnit: "bhp",

      maxPowerOptions: [],

      maxTorque: null,

      torque: null,

      torqueNm: null,

      torqueUnit: "Nm",

      transmission: "Automatic",

      transmissionType: "Automatic",

      gearbox: "Single Speed",

      driveType: "AWD",

      drivetrain: "AWD",

      topSpeed: 201,

      topSpeedUnit: "km/h",

      acceleration0To100: 5,

      acceleration0To100Unit: "seconds",

      regenerativeBraking: null,

      driveModes: [],

      suspensionSteeringBrakes: {
        frontSuspension: null,

        rearSuspension: null,

        steeringType: "Electric",

        steeringColumn: null,

        turningRadius: 6.25,

        turningRadiusUnit: "m",

        frontBrakeType: "Disc",

        rearBrakeType: "Disc",
      },
    };

    /* -----------------------------------------------------
       DIMENSIONS
    ----------------------------------------------------- */

    const dimensionsData = {
      length: 4969,
      lengthMm: 4969,

      width: 2129,
      widthMm: 2129,

      height: 1668,
      heightMm: 1668,

      wheelbase: 3040,
      wheelbaseMm: 3040,

      bootSpace: 420,
      bootCapacity: 420,
      bootCapacityLitres: 420,

      bootSpaceRearSeatFolding: 2539,

      seatingCapacity: [5, 6],
      seats: [5, 6],

      groundClearance: 169,
      groundClearanceMm: 169,

      groundClearanceLaden: 122,
      groundClearanceUnladen: 169,

      kerbWeight: 2088,
      kerbWeightKg: 2088,

      turningRadius: 6.25,
      turningRadiusUnit: "m",

      exterior: {
        bodyType: "SUV",

        LEDHeadlamps: true,

        LEDTaillights: true,

        DRLs: true,

        fogLights: null,

        autoHeadlamps: null,

        rainSensingWipers: null,

        electricallyAdjustableORVMs: null,

        electricallyFoldableORVMs: null,

        alloyWheels: null,

        tyreType: null,

        additionalFeatures: [
          "Panoramic Glass Roof",
        ],
      },
    };

    /* -----------------------------------------------------
       SAFETY
    ----------------------------------------------------- */

    const safetyData = {
      airbags: 9,

      abs: null,

      brakeAssist: null,

      ebd: null,

      esc: null,

      electronicStabilityControl: null,

      hillHoldAssist: null,

      hillDescentControl: null,

      tpms: true,

      electronicParkingBrake: null,

      autoHold: null,

      rearParkingCamera: true,

      parkingSensors: true,

      frontParkingSensors: null,

      rearParkingSensors: true,

      surroundViewCamera:
        "360-Degree",

      bharatNcapRating: null,

      bharatNcapAdultProtection: null,

      bharatNcapChildProtection: null,

      isofix: true,

      highBeamAssist: null,

      blindSpotMonitor: true,

      adas: {
        available: true,

        level: null,

        features: [
          "Forward Collision Warning",
          "Automatic Emergency Braking",
          "Blind Spot Collision Avoidance Assist",
          "Lane Departure Prevention",
          "Adaptive Cruise Control",
          "Adaptive High Beam Assist",
          "Blind Spot Monitor",
        ],
      },

      driverMonitoringSystem: null,

      secure360: null,

      brakeByWire: null,

      autoParkAssist: null,
    };

    /* -----------------------------------------------------
       FEATURES
    ----------------------------------------------------- */

    const featuresData = {
      comfortConvenience: {
        automaticClimateControl: true,

        dualZoneClimateControl: null,

        cruiseControl: true,

        adaptiveCruiseControl: true,

        poweredDriverSeat: true,

        driverSeatMemory: null,

        electricallyAdjustableORVMs: null,

        electricallyFoldableORVMs: null,

        pushButtonStart: null,

        keylessEntry: true,

        powerWindows: "Front & Rear",

        electronicParkingBrake: null,

        autoHold: null,

        ambientLighting: null,

        sunroof: true,

        poweredTailgate: null,

        ventilatedFrontSeats: null,

        wirelessPhoneCharger: true,
      },

      interior: {
        digitalInstrumentCluster: true,

        leatheretteUpholstery: null,

        automaticClimateControl: true,

        premiumCabin: true,

        illuminatedSteeringWheel: null,

        driverAndOccupantMonitoring: null,
      },

      entertainmentCommunication: {
        touchscreenSize:
          "16 inch",

        touchscreenSizeLower:
          "16 inch",

        driverDisplaySize: null,

        androidAuto: null,

        appleCarPlay: null,

        wirelessAndroidAuto: null,

        wirelessAppleCarPlay: null,

        speakers: 18,

        wirelessCharging: true,

        usbCharging: null,

        bluetooth: true,

        wifi: null,

        subwoofer: 1,

        rearTouchscreen: true,

        rearTouchscreenSize:
          "8 inch",
      },

      advancedInternetFeatures: {
        connectedCarTechnology: true,

        remoteLockUnlock: true,

        remoteVehicleStatusCheck: true,

        vehicleTracking: true,

        remoteClimateControl: true,

        OTAUpdates: null,

        liveVehicleView: null,

        driverMonitoringSystem: null,

        digitalKey: null,

        chargeScheduler: null,

        userProfiles: null,

        smartwatchConnectivity: null,

        voiceCommands: null,

        voiceCommandLanguages: null,

        blindSpotMonitor: true,

        remoteBootOpen: true,
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
            "250 kW Max",

          acChargingTime: null,

          acCharging7_2Kw: null,

          acCharging40: null,

          dcCharging:
            "250 kW Max",

          portableCharging:
            null,

          chargingOptions: [
            "250 kW Max DC",
          ],

          fastCharging: true,

          acPowerKw: null,

          acPowerOptionsKw: [],

          dcPowerKw: 250,

          chargingStandard:
            "CCS-II",
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

    if (IMAGE_URL) {
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

          "Tesla Model Y front left side",

          JSON.stringify({
            source: SOURCE,
            sourceUrl: SOURCE_URL,
            role: "primary",
          }),
        ]
      );

      console.log("   ✅ Main image inserted");
    } else {
      console.log(
        "   ⚠️ Main image skipped - direct image URL not verified"
      );
    }

    /* =====================================================
       9. VERIFY BEFORE COMMIT
    ===================================================== */

    console.log(
      "\n🔎 Verifying inserted Tesla Model Y data..."
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
      "   Battery options:",
      insertedPayload.batteryOptions.join(
        " / "
      ),
      "kWh"
    );

    console.log(
      "   Range:",
      insertedPayload.range,
      "km"
    );

    console.log(
      "   Range options:",
      insertedPayload.rangeOptions.join(
        " / "
      ),
      "km"
    );

    console.log(
      "   Motor Power:",
      insertedPayload.motorPower ?? "N/A",
      "kW"
    );

    console.log(
      "   Torque:",
      insertedPayload.maxTorque ?? "N/A",
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
      "🎉 TESLA MODEL Y INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle        : Tesla Model Y"
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
      "Media          :",
      mediaCheck.rows.length
    );

    console.log(
      "Battery        : 82 kWh"
    );

    console.log(
      "Range          : 681 km"
    );

    console.log(
      "Motor Power    : N/A"
    );

    console.log(
      "Max Power      : N/A"
    );

    console.log(
      "Torque         : N/A"
    );

    console.log(
      "Price range    : ₹50.89L - ₹61.99L"
    );

    console.log(
      "Rating         : 4.6 / 5"
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
      "\n⚠️ No partial Tesla Model Y data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();