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

const VEHICLE_ID = "mahindra-xev-9e";
const BRAND_ID = "mahindra";
const MARKET_ID = "india";

const IMAGE_URL = null;

const SOURCE = "CarDekho";
const SOURCE_URL =
  "https://www.cardekho.com/mahindra/xev-9e";

/* =========================================================
   VARIANTS
========================================================= */

const variants = [
  {
    id: "mahindra-xev-9e-pack-one-59",
    name: "XEV 9e Pack One 59",
    price: 2190000,
    features: [
      "12.3-Inch Touchscreen Infotainment",
      "12.3-Inch Digital Driver Display",
      "12.3-Inch Co-Driver Entertainment Display",
      "Automatic Climate Control",
      "Cruise Control",
      "6 Airbags",
      "ESP",
      "Rear View Camera",
      "Panoramic Glass Roof",
      "LED Headlamps",
      "LED Tail Lamps",
      "Front and Rear Parking Sensors",
      "TPMS",
      "Electronic Parking Brake",
      "Brake-by-Wire Technology",
    ],
  },

  {
    id: "mahindra-xev-9e-pack-two-59",
    name: "XEV 9e Pack Two 59",
    price: 2490000,
    features: [
      "12.3-Inch Touchscreen Infotainment",
      "12.3-Inch Digital Driver Display",
      "12.3-Inch Co-Driver Entertainment Display",
      "16-Speaker Harman Kardon Audio",
      "Dolby Atmos",
      "Fixed Glass Infinity Roof",
      "Leatherette Upholstery",
      "Adaptive Cruise Control",
      "Level 2 ADAS",
      "6 Airbags",
      "360-Degree Camera",
      "Front and Rear Parking Sensors",
      "TPMS",
      "Driver Seat Memory",
      "Cornering Headlamps",
      "Connected Car Technology",
      "OTA Updates",
    ],
  },

  {
    id: "mahindra-xev-9e-pack-two-79",
    name: "XEV 9e Pack Two 79",
    price: 2650000,
    features: [
      "12.3-Inch Touchscreen Infotainment",
      "12.3-Inch Digital Driver Display",
      "12.3-Inch Co-Driver Entertainment Display",
      "16-Speaker Harman Kardon Audio",
      "Dolby Atmos",
      "Fixed Glass Infinity Roof",
      "Leatherette Upholstery",
      "Adaptive Cruise Control",
      "Level 2 ADAS",
      "6 Airbags",
      "360-Degree Camera",
      "Front and Rear Parking Sensors",
      "TPMS",
      "Driver Seat Memory",
      "Cornering Headlamps",
      "Connected Car Technology",
      "OTA Updates",
    ],
  },

  {
    id: "mahindra-xev-9e-pack-three-select-59",
    name: "XEV 9e Pack Three Select 59",
    price: 2790000,
    features: [
      "12.3-Inch Touchscreen Infotainment",
      "12.3-Inch Digital Driver Display",
      "12.3-Inch Co-Driver Entertainment Display",
      "16-Speaker Harman Kardon Audio",
      "Dolby Atmos",
      "Infinity Roof",
      "Leatherette Upholstery",
      "VisionX AR Head-Up Display",
      "Level 2+ ADAS",
      "7 Airbags",
      "360-Degree Camera",
      "Secure360",
      "Driver and Occupant Monitoring System",
      "AutoPark Assist",
      "Electric Tailgate",
      "Powered Driver Seat with Memory",
      "Ambient Lighting",
      "Connected Car Technology",
      "OTA Updates",
    ],
  },

  {
    id: "mahindra-xev-9e-cineluxe-79",
    name: "XEV 9e Cineluxe",
    price: 2935000,
    features: [
      "12.3-Inch Touchscreen Infotainment",
      "12.3-Inch Digital Driver Display",
      "12.3-Inch Co-Driver Entertainment Display",
      "Wide Cinemascope Triple Screen",
      "16-Speaker Harman Kardon Audio",
      "Dolby Atmos",
      "Infinity Roof",
      "Leatherette Upholstery",
      "VisionX AR Head-Up Display",
      "Level 2+ ADAS",
      "7 Airbags",
      "360-Degree Camera",
      "Secure360",
      "Driver and Occupant Monitoring System",
      "AutoPark Assist",
      "Powered Driver Seat with Memory",
      "Ambient Lighting",
      "Connected Car Technology",
      "OTA Updates",
    ],
  },

  {
    id: "mahindra-xev-9e-pack-three-79",
    name: "XEV 9e Pack Three 79",
    price: 3050000,
    features: [
      "12.3-Inch Touchscreen Infotainment",
      "12.3-Inch Digital Driver Display",
      "12.3-Inch Co-Driver Entertainment Display",
      "Wide Cinemascope Triple Screen",
      "16-Speaker Harman Kardon Audio",
      "Dolby Atmos",
      "Infinity Roof",
      "Leatherette Upholstery",
      "VisionX AR Head-Up Display",
      "Level 2+ ADAS",
      "7 Airbags",
      "360-Degree Camera",
      "Secure360",
      "Driver and Occupant Monitoring System",
      "AutoPark Assist",
      "Powered Driver Seat with Memory",
      "Driver Seat Memory",
      "Ambient Lighting",
      "LiveYourMood",
      "Multi-Drive Modes",
      "Connected Car Technology",
      "OTA Updates",
      "5G Connectivity",
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
    console.log("🚗 EVINSIGHTS - ADD MAHINDRA XEV 9e");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. BRAND
    ===================================================== */

    console.log("🏷️ Upserting Mahindra brand...");

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
        "Mahindra",
        "mahindra",
        "India",
        null,
        JSON.stringify({
          name: "Mahindra",
          country: "India",
          slug: "mahindra",
        }),
        now,
      ]
    );

    console.log("   ✅ Mahindra brand ready");

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
       3. CLEAN OLD XEV 9e DATA
    ===================================================== */

    console.log("\n🧹 Cleaning existing Mahindra XEV 9e records...");

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

    console.log("   ✅ Existing Mahindra XEV 9e data cleaned");

    /* =====================================================
       4. CANONICAL VEHICLE DATA
    ===================================================== */

    console.log("\n🚗 Inserting Mahindra XEV 9e...");

    const vehiclePayload = {
      /* ---------------------------------------------------
         IDENTITY
      --------------------------------------------------- */

      name: "Mahindra XEV 9e",
      model: "XEV 9e",
      brand: "Mahindra",
      brandId: BRAND_ID,

      /* ---------------------------------------------------
         SOURCE
      --------------------------------------------------- */

      source: SOURCE,
      sourceUrl: SOURCE_URL,

      /* ---------------------------------------------------
         BATTERY
      --------------------------------------------------- */

      batteryCapacity: 59,
      batteryCapacityKwh: 59,
      batteryKwh: 59,

      batteryOptions: [
        59,
        79,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium Iron Phosphate (LFP)",

      batteryChemistry: "LFP",

      /* ---------------------------------------------------
         RANGE
      --------------------------------------------------- */

      range: 542,
      rangeKm: 542,

      araiRange: 542,
      midcRange: 542,

      rangeOptions: [
        542,
        656,
      ],

      wltpRange: 533,

      rangeUnit: "km",

      /* ---------------------------------------------------
         MOTOR
      --------------------------------------------------- */

      motorPower: 170,
      motorPowerKw: 170,

      powerKw: 170,
      power: 170,

      powerOptionsKw: [
        170,
        210,
      ],

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous Motor",

      maxPower: 231,
      maxPowerUnit: "bhp",

      maxPowerOptions: [
        231,
        286,
      ],

      maxTorque: 380,
      torque: 380,
      torqueNm: 380,

      torqueUnit: "Nm",

      /* ---------------------------------------------------
         DRIVETRAIN
      --------------------------------------------------- */

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "Single-Speed",

      driveType: "RWD",
      drivetrain: "RWD",

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

      length: 4789,
      lengthMm: 4789,

      width: 1907,
      widthMm: 1907,

      height: 1694,
      heightMm: 1694,

      wheelbase: 2775,
      wheelbaseMm: 2775,

      groundClearance: 207,
      groundClearanceMm: 207,

      batteryGroundClearance: 218,
      batteryGroundClearanceMm: 218,

      bootSpace: 663,
      bootCapacity: 663,
      bootCapacityLitres: 663,

      frunkSpace: 150,
      frunkCapacity: 150,
      frunkCapacityLitres: 150,

      turningCircleDiameter: 10,
      turningCircleDiameterUnit: "m",

      /* ---------------------------------------------------
         CLASSIFICATION
      --------------------------------------------------- */

      bodyType: "SUV Coupe",
      fuelType: "Electric",

      /* ---------------------------------------------------
         PRICE
      --------------------------------------------------- */

      priceMin: 2190000,
      priceMax: 3050000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      /* ---------------------------------------------------
         RATING
      --------------------------------------------------- */

      rating: 4.8,
      reviewCount: 123,

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

        "Mahindra XEV 9e",

        "mahindra-xev-9e",

        BRAND_ID,

        null,

        ["india"],

        JSON.stringify({
          bodyType: "SUV Coupe",
          fuelType: "Electric",
          seatingCapacity: 5,
        }),

        JSON.stringify({
          status: "active",
          launched: true,
          available: true,
        }),

        JSON.stringify({
          title: "Mahindra XEV 9e",
          slug: "mahindra-xev-9e",
          description:
            "Mahindra XEV 9e electric SUV coupe with 59 kWh and 79 kWh battery options, up to 656 km MIDC claimed range and rear-wheel drive electric performance.",
        }),

        JSON.stringify({
          ...vehiclePayload,

          specs: {
            battery: 59,
            batteryOptions: [
              59,
              79,
            ],

            range: 542,
            rangeOptions: [
              542,
              656,
            ],

            power: 170,
            powerOptions: [
              170,
              210,
            ],

            torque: 380,
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

        4.8,

        123,

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
      const is79 =
        variant.id.includes("79");

      const battery =
        is79 ? 79 : 59;

      const range =
        is79 ? 656 : 542;

      const motorPower =
        is79 ? 210 : 170;

      const maxPower =
        is79 ? 286 : 231;

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

            motorPower: motorPower,
            motorPowerKw: motorPower,

            maxPower: maxPower,
            maxPowerUnit: "bhp",

            maxTorque: 380,

            transmission: "Automatic",
            transmissionType: "Automatic",

            gearbox: "Single-Speed",

            driveType: "RWD",
            drivetrain: "RWD",

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
      batteryCapacity: 59,
      batteryCapacityKwh: 59,
      batteryKwh: 59,

      batteryOptions: [
        59,
        79,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium Iron Phosphate (LFP)",

      batteryChemistry: "LFP",

      range: 542,
      rangeKm: 542,

      rangeOptions: [
        542,
        656,
      ],

      rangeUnit: "km",

      chargingPort: "CCS-II",

      charging: {
        acCharging: "8H 42min | 7.2 kW (0-100%)",

        acCharging11Kw:
          "Approx. 6 hours | 11.2 kW (0-100%)",

        dcFastCharging:
          "20 min | 140 kW DC (20-80%)",

        dcFastCharging79:
          "20 min | 175 kW DC (20-80%)",

        chargingOptions: [
          "7.2 kW AC",
          "11.2 kW AC",
          "140 kW DC",
          "175 kW DC",
        ],

        fastCharging: true,

        fastChargingTime:
          "20 minutes (20-80%)",
      },
    };

    /* -----------------------------------------------------
       PERFORMANCE
    ----------------------------------------------------- */

    const performanceData = {
      motorPower: 170,
      motorPowerKw: 170,

      powerOptionsKw: [
        170,
        210,
      ],

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous Motor",

      maxPower: 231,
      maxPowerUnit: "bhp",

      maxPowerOptions: [
        231,
        286,
      ],

      maxTorque: 380,
      torque: 380,
      torqueNm: 380,

      torqueUnit: "Nm",

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "Single-Speed",

      driveType: "RWD",
      drivetrain: "RWD",

      acceleration0To100: 6.8,
      acceleration0To100Unit: "seconds",

      acceleration0To10059:
        6.8,

      acceleration0To10079:
        6.8,

      regenerativeBraking: true,

      regenerativeBrakingLevels: [
        "L0",
        "L1",
        "L2",
        "L3",
        "Auto",
      ],

      singlePedalDrive: true,

      driveModes: [
        "Default",
        "Range",
        "Everyday",
        "Race",
        "Snow",
      ],

      suspensionSteeringBrakes: {
        frontSuspension:
          "McPherson Strut I-Link independent suspension with stabiliser bar",

        rearSuspension:
          "Multi-Link 5-Link independent suspension with stabiliser bar",

        steeringType:
          "Electric Power Steering with Variable Gear Ratio",

        steeringColumn:
          "Tilt",

        turningCircleDiameter: 10,

        turningCircleDiameterUnit: "m",

        frontBrakeType:
          "Disc",

        rearBrakeType:
          "Disc",

        brakeTechnology:
          "Brake-by-Wire",
      },
    };

    /* -----------------------------------------------------
       DIMENSIONS
    ----------------------------------------------------- */

    const dimensionsData = {
      length: 4789,
      lengthMm: 4789,

      width: 1907,
      widthMm: 1907,

      height: 1694,
      heightMm: 1694,

      wheelbase: 2775,
      wheelbaseMm: 2775,

      bootSpace: 663,
      bootCapacity: 663,
      bootCapacityLitres: 663,

      frunkSpace: 150,
      frunkCapacity: 150,
      frunkCapacityLitres: 150,

      seatingCapacity: 5,
      seats: 5,

      groundClearance: 207,
      groundClearanceMm: 207,

      batteryGroundClearance: 218,
      batteryGroundClearanceMm: 218,

      turningCircleDiameter: 10,
      turningCircleDiameterUnit: "m",

      exterior: {
        bodyType: "SUV Coupe",

        ledHeadlamps: true,

        ledTaillights: true,

        fogLights: true,

        drls: true,

        sequentialTurnIndicators: true,

        illuminatedMahindraLogo: true,

        orvm:
          "Electrically Adjustable and Foldable",

        tyreType:
          "Tubeless",

        additionalFeatures: [
          "Coupe SUV styling",
          "Connected LED DRLs",
          "Infinity Roof",
          "Flush Door Handles",
          "Premium Exterior Cladding",
        ],
      },
    };

    /* -----------------------------------------------------
       SAFETY
    ----------------------------------------------------- */

    const safetyData = {
      airbags: 6,

      airbagsTopVariant: 7,

      abs: true,

      brakeAssist: true,

      ebd: true,

      esc: true,

      tpms: true,

      electronicParkingBrake: true,

      rearParkingCamera: true,

      parkingSensors: true,

      frontParkingSensors: true,

      rearParkingSensors: true,

      surroundViewCamera: "360-Degree",

      bharatNcapRating: 5,

      globalNcapRating: null,

      bharatNcapAdultProtection: "32/32",

      bharatNcapChildProtection: "45/49",

      adas: {
        available: true,

        level: "Level 2+",

        radars: 5,

        visionCamera: 1,

        features: [
          "Adaptive Cruise Control",
          "Lane Keep Assist",
          "Lane Centering",
          "Automatic Emergency Braking",
          "Forward Collision Warning",
          "Blind Spot Detection",
          "Cross Traffic Alert",
          "Emergency Steering Assist",
          "Driver Initiated Auto Lane Change",
        ],
      },

      driverMonitoringSystem: true,

      secure360: true,

      brakeByWire: true,

      intelligentElectronicBrakeBooster: true,

      autoParkAssist: true,
    };

    /* -----------------------------------------------------
       FEATURES
    ----------------------------------------------------- */

    const featuresData = {
      comfortConvenience: {
        automaticClimateControl: true,

        dualZoneClimateControl: true,

        cruiseControl: true,

        adaptiveCruiseControl: true,

        poweredDriverSeat: true,

        driverSeatMemory: true,

        electricallyAdjustableORVMs: true,

        electricallyFoldableORVMs: true,

        pushButtonStart: true,

        keylessEntry: true,

        powerWindows: "All 4",

        electronicParkingBrake: true,

        ambientLighting: true,

        panoramicGlassRoof: true,

        infinityRoof: true,

        poweredTailgate: true,

      },

      interior: {
        digitalInstrumentCluster: true,

        leatheretteUpholstery: true,

        automaticClimateControl: true,

        premiumCabin: true,

        illuminatedDashboard: true,

        driverAndOccupantMonitoring: true,
      },

      entertainmentCommunication: {
        touchscreenSize:
          "12.3 inch",

        driverDisplaySize:
          "12.3 inch",

        coDriverDisplaySize:
          "12.3 inch",

        wideCinemascope:
          "110.08 cm",

        androidAuto: true,

        appleCarPlay: true,

        wirelessAndroidAuto: true,

        wirelessAppleCarPlay: true,

        harmanKardonAudioSystem: true,

        dolbyAtmos: true,

        speakers: 16,

        wirelessCharging: true,

        usbCharging: true,

        bluetooth: true,

        wifi: true,

        fiveGConnectivity: true,
      },

      advancedInternetFeatures: {
        connectedCarTechnology: true,

        remoteLockUnlock: true,

        remoteVehicleStatusCheck: true,

        vehicleTracking: true,

        remoteClimateControl: true,

        OTAUpdates: true,

        secure360: true,

        liveVehicleView: true,

        driverMonitoringSystem: true,

        digitalKey: true,

        chargeScheduler: true,

        userProfiles: true,

        MAIA: true,

        SnapdragonCockpit: true,

        VisionXARHUD: true,

        AutoPark: true,

        LiveYourMood: true,
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
            "20 min | DC Fast Charging (20-80%)",

          acChargingTime:
            "Approx. 8H 42min | 7.2 kW AC",

          acCharging11Kw:
            "Approx. 6 hours | 11.2 kW AC",

          dcCharging59:
            "20 min | 140 kW DC (20-80%)",

          dcCharging79:
            "20 min | 175 kW DC (20-80%)",

          portableCharging:
            "AC Charging",

          chargingOptions: [
            "7.2 kW AC",
            "11.2 kW AC",
            "140 kW DC",
            "175 kW DC",
          ],

          fastCharging: true,

          acPowerKw: 7.2,

          acPowerOptionsKw: [
            7.2,
            11.2,
          ],

          dcPowerKw: 140,

          dcPower79Kw: 175,

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

          "Mahindra XEV 9e front left side",

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
      "\n🔎 Verifying inserted Mahindra XEV 9e data..."
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
      "🎉 MAHINDRA XEV 9e INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle        : Mahindra XEV 9e"
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
      "Battery        : 59 / 79 kWh"
    );

    console.log(
      "Range          : 542 / 656 km"
    );

    console.log(
      "Motor Power    : 170 / 210 kW"
    );

    console.log(
      "Max Power      : 231 / 286 bhp"
    );

    console.log(
      "Torque         : 380 Nm"
    );

    console.log(
      "Price range    : ₹21.90L - ₹30.50L"
    );

    console.log(
      "Rating         : 4.8 / 5"
    );

    console.log(
      "Reviews        : 123"
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
      "\n⚠️ No partial Mahindra XEV 9e data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();