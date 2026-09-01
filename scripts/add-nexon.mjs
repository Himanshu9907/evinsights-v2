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

const VEHICLE_ID = "tata-nexon-ev";
const BRAND_ID = "tata";
const MARKET_ID = "india";

const IMAGE_URL =
  "https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV/13563/1779961723416/front-left-side-47.jpg";

const SOURCE = "CarDekho";

const SOURCE_URL =
  "https://www.cardekho.com/tata/nexon-ev";

/* =========================================================
   VARIANTS
========================================================= */

const variants = [
  {
    id: "tata-nexon-ev-creative-plus-mr",
    name: "Nexon EV Creative Plus MR",
    price: 1249000,
    battery: 30,
    range: 275,
    features: [
      "6 Airbags",
      "7-Inch Touchscreen Infotainment",
      "7-Inch Digital Driver's Display",
      "Automatic Climate Control",
      "Push Button Start",
      "All 4 Power Windows",
    ],
  },

  {
    id: "tata-nexon-ev-fearless-plus-mr",
    name: "Nexon EV Fearless Plus MR",
    price: 1379000,
    battery: 30,
    range: 275,
    features: [
      "10.25-Inch Touchscreen Infotainment",
      "10.25-Inch Digital Driver's Display",
      "Rear Parking Camera",
      "Power Adjustable And Foldable ORVMs",
      "Rear Wiper And Washer",
    ],
  },

  {
    id: "tata-nexon-ev-creative-45",
    name: "Nexon EV Creative 45",
    price: 1414000,
    battery: 45,
    range: 489,
    features: [
      "6 Airbags",
      "7-Inch Touchscreen Infotainment",
      "7-Inch Digital Driver's Display",
      "Automatic Climate Control",
      "Push Button Start",
      "All 4 Power Windows",
      "Electronic Parking Brake With Auto Hold",
    ],
  },

  {
    id: "tata-nexon-ev-fearless-45",
    name: "Nexon EV Fearless 45",
    price: 1514000,
    battery: 45,
    range: 489,
    features: [
      "10.25-Inch Touchscreen Infotainment",
      "10.25-Inch Digital Driver's Display",
      "Rear Parking Camera",
      "Power Adjustable And Foldable ORVMs",
      "Rear Wiper And Washer",
    ],
  },

  {
    id: "tata-nexon-ev-empowered-45",
    name: "Nexon EV Empowered 45",
    price: 1614000,
    battery: 45,
    range: 489,
    features: [
      "10.25-Inch Touchscreen Infotainment",
      "10.25-Inch Digital Driver's Display",
      "Rear Parking Camera",
      "Power Adjustable And Foldable ORVMs",
      "Rear Wiper And Washer",
    ],
  },

  {
    id: "tata-nexon-ev-empowered-plus-a-45",
    name: "Nexon EV Empowered Plus A 45",
    price: 1749000,
    battery: 45,
    range: 489,
    features: [
      "Panoramic Sunroof",
      "Level-1 ADAS",
      "Ventilated Front Seats",
      "V2L",
      "V2V",
      "JBL 9-Speaker System",
      "Rear Sunshades",
    ],
  },

  {
    id: "tata-nexon-ev-empowered-plus-a-45-dark",
    name: "Nexon EV Empowered Plus A 45 Dark",
    price: 1769000,
    battery: 45,
    range: 489,
    features: [
      "Panoramic Sunroof",
      "Level-1 ADAS",
      "Ventilated Front Seats",
      "V2L",
      "V2V",
      "JBL 9-Speaker System",
      "Rear Sunshades",
    ],
  },

  {
    id: "tata-nexon-ev-empowered-plus-a-45-red-dark",
    name: "Nexon EV Empowered Plus A 45 Red Dark",
    price: 1769000,
    battery: 45,
    range: 489,
    features: [
      "Panoramic Sunroof",
      "Level-1 ADAS",
      "Ventilated Front Seats",
      "V2L",
      "V2V",
      "JBL 9-Speaker System",
      "Rear Sunshades",
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
    console.log("🚗 EVINSIGHTS - ADD TATA NEXON EV");
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
       3. CLEAN OLD NEXON EV DATA
    ===================================================== */

    console.log("\n🧹 Cleaning existing Tata Nexon EV records...");

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

    console.log("   ✅ Existing Tata Nexon EV data cleaned");

    /* =====================================================
       4. CANONICAL VEHICLE DATA
    ===================================================== */

    console.log("\n🚗 Inserting Tata Nexon EV...");

    const vehiclePayload = {
      /* ---------------------------------------------------
         IDENTITY
      --------------------------------------------------- */

      name: "Tata Nexon EV",
      model: "Nexon EV",
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

      batteryCapacity: 45,
      batteryCapacityKwh: 45,
      batteryKwh: 45,

      batteryOptions: [
        30,
        45,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium Ion",

      batteryChemistry: "Lithium Ion",

      /* ---------------------------------------------------
         RANGE
      --------------------------------------------------- */

      range: 489,
      rangeKm: 489,

      batteryRange: 489,

      rangeOptions: [
        275,
        489,
      ],

      rangeUnit: "km",

      /* ---------------------------------------------------
         MOTOR
      --------------------------------------------------- */

      motorPower: 110,
      motorPowerKw: 110,

      powerKw: 110,
      power: 110,

      powerUnit: "kW",

      maxPowerBhp: 142,
      maxPower: "142 bhp",

      motorType:
        "Permanent magnet synchronous AC motor",

      maxTorque: 215,
      torque: 215,
      torqueNm: 215,

      torqueUnit: "Nm",

      /* ---------------------------------------------------
         PERFORMANCE
      --------------------------------------------------- */

      acceleration0100: 8.9,
      acceleration0100Unit: "s",

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

      chargerType:
        "7.2 kW AC Wall Box",

      chargingOptions: [
        "3.3 kW AC Wall Box",
        "7.2 kW AC Wall Box",
        "60 kW DC Fast Charger",
        "15A plug point",
      ],

      /* ---------------------------------------------------
         SEATING
      --------------------------------------------------- */

      seats: 5,
      seatingCapacity: 5,

      /* ---------------------------------------------------
         DIMENSIONS
      --------------------------------------------------- */

      length: 3995,
      lengthMm: 3995,

      width: 1802,
      widthMm: 1802,

      height: 1625,
      heightMm: 1625,

      wheelbase: 2498,
      wheelbaseMm: 2498,

      bootSpace: 350,
      bootCapacity: 350,
      bootCapacityLitres: 350,

      groundClearance: 190,
      groundClearanceMm: 190,

      turningRadius: 5.3,
      turningRadiusUnit: "m",

      /* ---------------------------------------------------
         CLASSIFICATION
      --------------------------------------------------- */

      bodyType: "SUV",
      fuelType: "Electric",

      emissionNormCompliance: "ZEV",

      /* ---------------------------------------------------
         PRICE
      --------------------------------------------------- */

      priceMin: 1249000,
      priceMax: 1769000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      /* ---------------------------------------------------
         RATING
      --------------------------------------------------- */

      rating: 4.5,
      reviewCount: 245,

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

        "Tata Nexon EV",

        "tata-nexon-ev",

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
          title: "Tata Nexon EV",
          slug: "tata-nexon-ev",
          description:
            "Tata Nexon EV electric SUV with 30 kWh and 45 kWh battery options, automatic transmission, FWD drivetrain and up to 489 km claimed range.",
        }),

        JSON.stringify({
          ...vehiclePayload,

          specs: {
            battery: 45,

            batteryOptions: [
              30,
              45,
            ],

            range: 489,

            rangeOptions: [
              275,
              489,
            ],

            power: 110,

            maxPowerBhp: 142,

            torque: 215,

            acceleration0100: 8.9,
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

        4.5,

        245,

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

            batteryCapacity:
              variant.battery,

            batteryCapacityKwh:
              variant.battery,

            range:
              variant.range,

            rangeKm:
              variant.range,

            motorPower: 110,

            motorPowerKw: 110,

            maxPowerBhp: 142,

            motorType:
              "Permanent magnet synchronous AC motor",

            maxTorque: 215,

            torqueNm: 215,

            transmission: "Automatic",

            transmissionType: "Automatic",

            gearbox: "1-Speed",

            driveType: "FWD",

            drivetrain: "FWD",

            fuelType: "Electric",

            chargingPort: "CCS-II",

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
      batteryCapacity: 45,

      batteryCapacityKwh: 45,

      batteryKwh: 45,

      batteryOptions: [
        30,
        45,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium Ion",

      batteryChemistry: "Lithium Ion",

      range: 489,

      rangeKm: 489,

      rangeOptions: [
        275,
        489,
      ],

      rangeUnit: "km",

      batteryWarranty:
        "8 Years or 160000 km",

      chargingPort: "CCS-II",

      chargerType:
        "7.2 kW AC Wall Box",

      charging: {
        acCharging:
          "7.2 kW - 10 to 100% - 6 hrs 36 mins",

        dcFastCharging:
          "60 kW - 10 to 100% - 40 mins",

        chargingTime:
          "6 hrs 36 mins - 7.2 kW AC",

        chargingTimeAC:
          "7.2 kW - 10 to 100% - 6 hrs 36 mins",

        chargingTimeDC:
          "60 kW - 10 to 100% - 40 mins",

        chargingTime15A:
          "10 to 100% - 17 hrs 36 mins",

        chargingOptions: [
          "3.3 kW AC Wall Box",
          "7.2 kW AC Wall Box",
          "60 kW DC Fast Charger",
          "15A plug point",
        ],

        fastCharging: true,

        fastChargingTime:
          "40 minutes (10-100%)",
      },
    };

    /* -----------------------------------------------------
       PERFORMANCE
    ----------------------------------------------------- */

    const performanceData = {
      motorPower: 110,

      motorPowerKw: 110,

      powerKw: 110,

      powerUnit: "kW",

      maxPowerBhp: 142,

      maxPower: "142 bhp",

      motorType:
        "Permanent magnet synchronous AC motor",

      maxTorque: 215,

      torque: 215,

      torqueNm: 215,

      torqueUnit: "Nm",

      acceleration0100: 8.9,

      acceleration0100Unit: "s",

      transmission: "Automatic",

      transmissionType: "Automatic",

      gearbox: "1-Speed",

      driveType: "FWD",

      drivetrain: "FWD",

      regenerativeBraking: true,

      regenerativeBrakingLevels: 4,

      chargingPort: "CCS-II",

      suspensionSteeringBrakes: {
        frontSuspension:
          "MacPherson Strut suspension",

        rearSuspension:
          "Rear twist beam",

        steeringType:
          "Electric",

        turningRadius: 5.3,

        turningRadiusUnit: "m",

        frontBrakeType:
          "Disc",

        rearBrakeType:
          "Disc",
      },
    };

    /* -----------------------------------------------------
       DIMENSIONS
    ----------------------------------------------------- */

    const dimensionsData = {
      length: 3995,

      lengthMm: 3995,

      width: 1802,

      widthMm: 1802,

      height: 1625,

      heightMm: 1625,

      wheelbase: 2498,

      wheelbaseMm: 2498,

      bootSpace: 350,

      bootCapacity: 350,

      bootCapacityLitres: 350,

      groundClearance: 190,

      groundClearanceMm: 190,

      seatingCapacity: 5,

      seats: 5,

      turningRadius: 5.3,

      turningRadiusUnit: "m",
    };

    /* -----------------------------------------------------
       SAFETY
    ----------------------------------------------------- */

    const safetyData = {
      airbags: 6,

      abs: true,

      brakeAssist: true,

      centralLocking: true,

      childSafetyLocks: true,

      driverAirbag: true,

      passengerAirbag: true,

      sideAirbag: true,

      sideAirbagRear: true,

      ebd: true,

      tractionControl: true,

      tpms: true,

      esc: true,

      electronicStabilityControl: true,

      rearCamera:
        "With Guidedlines",

      rearParkingCamera:
        "With Guidelines",

      parkingSensors:
        "Front & Rear",

      rearParkingSensors: true,

      isofix: true,

      hillAssist: true,

      hillDescentControl: true,

      engineImmobilizer: true,

      antiPinchPowerWindows:
        "Driver's Window",

      surroundViewCamera:
        "360 View Camera",

      bharatNcapSafetyRating:
        "5 Star",

      bharatNcapChildSafetyRating:
        "5 Star",
    };

    /* -----------------------------------------------------
       FEATURES
    ----------------------------------------------------- */

    const featuresData = {
      comfortConvenience: {
        bootOpening:
          "Electronic",

        powerSteering: true,

        airConditioner: true,

        heater: true,

        adjustableSteering:
          "Height only",

        heightAdjustableDriverSeat:
          true,

        ventilatedSeats: true,

        automaticClimateControl:
          true,

        airQualityControl: true,

        accessoryPowerOutlet: true,

        adjustableHeadrest: true,

        rearSeatCentreArmRest: true,

        rearACVents: true,

        cruiseControl: true,

        parkingSensors:
          "Front & Rear",

        foldableRearSeat:
          "60:40 Split",

        keylessEntry: true,

        engineStartStopButton: true,

        usbCharger:
          "Front & Rear",

        centralConsoleArmrest:
          "With Storage",

        driveModes: 3,

        driveModeTypes: [
          "Eco",
          "City",
          "Sport",
        ],

        powerWindows:
          "Front & Rear",

        voiceAssistedSunroof:
          true,

        vehicleToVehicleCharging:
          true,

        vehicleToLoadCharging:
          true,
      },

      interior: {
        gloveBox: true,

        ambientLight: true,

        additionalFeatures:
          "Rear parcel tray",

        digitalCluster: true,

        digitalClusterSize:
          "10.25 inch",

        upholstery:
          "Leatherette",
      },

      exterior: {
        adjustableHeadlamps: true,

        rainSensingWiper: true,

        rearWindowWiper: true,

        rearWindowWasher: true,

        rearWindowDefogger: true,

        wheelCovers: false,

        alloyWheels: true,

        rearSpoiler: true,

        outsideRearViewMirrorTurnIndicators:
          true,

        projectorHeadlamps: true,

        corneringFoglamps: true,

        roofRails: true,

        automaticHeadlamps: true,

        fogLights: "Front",

        antenna:
          "Shark Fin",

        sunroof:
          "Panoramic",

        outsideRearViewMirror:
          "Powered & Folding",

        tyreSize:
          "215/60 R16",

        tyreType:
          "Tubeless Radial",

        wheelSize:
          "16 Inch",

        LEDDRLs: true,

        LEDHeadlamps: true,

        LEDTaillights: true,

        LEDFogLamps: true,
      },

      entertainmentCommunication: {
        radio: true,

        wirelessPhoneCharging:
          true,

        bluetoothConnectivity:
          true,

        wiFiConnectivity:
          true,

        touchscreen: true,

        touchscreenSize:
          "12.29 inch",

        androidAuto: true,

        appleCarPlay: true,

        numberOfSpeakers: 4,

        usbPorts: true,

        tweeters: 4,

        subwoofer: 1,

        additionalFeatures:
          "Wireless Android Auto & Apple CarPlay",

        speakers:
          "Front & Rear",
      },

      adas: {
        level: 1,

        forwardCollisionWarning: true,

        automaticEmergencyBraking: true,

        trafficSignRecognition: true,

        laneDepartureWarning: true,

        laneKeepAssist: true,

        driverAttentionWarning: true,

        adaptiveHighBeamAssist: true,

        blindSpotMonitor: true,
      },

      advancedInternetFeatures: {
        inbuiltAssistant: true,

        navigationWithLiveTraffic:
          true,

        eCallICall: true,

        OTAUpdates: true,

        googleAlexaConnectivity:
          true,

        inCarRemoteControlApp: true,

        smartwatchApp: true,

        remoteACOnOff: true,

        remoteDoorLockUnlock: true,

        sosEmergencyAssistance:
          true,

        inbuiltApps: [
          "iRA.ev",
        ],
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
          chargingPort:
            "CCS-II",

          chargingTime:
            "60kW - 10 to 100% - 40 mins",

          acChargingTime:
            "7.2kW - 10 to 100% - 6 hrs 36 mins",

          dcCharging:
            "60kW - 10 to 100% - 40 mins",

          chargingTime15A:
            "10 to 100% - 17 hrs 36 mins",

          portableCharging:
            "15A plug point",

          chargingOptions: [
            "3.3 kW AC Wall Box",
            "7.2 kW AC Wall Box",
            "60 kW DC Fast Charger",
            "15A plug point",
          ],

          fastCharging: true,

          acPowerKw: 7.2,

          dcPowerKw: 60,

          chargingStandard:
            "CCS-II",

          chargerType:
            "7.2 kW AC Wall Box",
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

          "Tata Nexon EV front left side",

          JSON.stringify({
            source: SOURCE,
            sourceUrl: SOURCE_URL,
            role: "primary",
          }),
        ]
      );

      console.log("   ✅ Main image inserted");
    }

    /* =====================================================
       9. VERIFY
    ===================================================== */

    console.log(
      "\n🔎 Verifying inserted Tata Nexon EV data..."
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
      "   Max Power:",
      insertedPayload.maxPowerBhp,
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
      "🎉 TATA NEXON EV INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle        : Tata Nexon EV"
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
      "Battery        : 30 / 45 kWh"
    );

    console.log(
      "Range          : 275 / 489 km"
    );

    console.log(
      "Motor Power    : 110 kW"
    );

    console.log(
      "Max Power      : 142 bhp"
    );

    console.log(
      "Torque         : 215 Nm"
    );

    console.log(
      "0-100 km/h     : 8.9 sec"
    );

    console.log(
      "Price range    : ₹12.49L - ₹17.69L"
    );

    console.log(
      "Rating         : 4.5 / 5"
    );

    console.log(
      "Reviews        : 245"
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
      "\n⚠️ No partial Tata Nexon EV data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();