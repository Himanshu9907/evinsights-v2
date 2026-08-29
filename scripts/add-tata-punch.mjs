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

const VEHICLE_ID = "tata-punch-ev";
const BRAND_ID = "tata";
const MARKET_ID = "india";

const IMAGE_URL = null;

const SOURCE = "CarDekho";
const SOURCE_URL =
  "https://www.cardekho.com/tata/punch-ev";

/* =========================================================
   VARIANTS
========================================================= */

const variants = [
  {
    id: "tata-punch-ev-smart-30",
    name: "Punch EV Smart 30",
    price: 969000,
    features: [
      "6 Airbags",
      "Electronic Stability Control",
      "Hill Hold Assist",
      "ABS with EBD",
      "ISOFIX Child Seat Anchors",
      "Rear Parking Sensors",
      "Automatic Climate Control",
      "Front Power Windows",
      "Height Adjustable Driver Seat",
      "TPMS",
      "CCS-II Charging",
    ],
  },

  {
    id: "tata-punch-ev-smart-plus-30",
    name: "Punch EV Smart Plus 30",
    price: 1029000,
    features: [
      "6 Airbags",
      "Electronic Stability Control",
      "Hill Hold Assist",
      "ABS with EBD",
      "ISOFIX Child Seat Anchors",
      "Rear Parking Sensors",
      "Automatic Climate Control",
      "8-Inch Touchscreen Infotainment",
      "Android Auto",
      "Apple CarPlay",
      "Remote Lock / Unlock",
      "Steering Mounted Audio Controls",
      "All 4 Power Windows",
      "TPMS",
      "CCS-II Charging",
    ],
  },

  {
    id: "tata-punch-ev-smart-plus-40",
    name: "Punch EV Smart Plus 40",
    price: 1099000,
    features: [
      "6 Airbags",
      "Electronic Stability Control",
      "Hill Hold Assist",
      "ABS with EBD",
      "ISOFIX Child Seat Anchors",
      "Rear Parking Sensors",
      "Automatic Climate Control",
      "8-Inch Touchscreen Infotainment",
      "Android Auto",
      "Apple CarPlay",
      "Remote Lock / Unlock",
      "Steering Mounted Audio Controls",
      "All 4 Power Windows",
      "Electronic Parking Brake",
      "Auto Hold",
      "TPMS",
      "CCS-II Charging",
    ],
  },

  {
    id: "tata-punch-ev-adventure-40",
    name: "Punch EV Adventure 40",
    price: 1174000,
    features: [
      "6 Airbags",
      "Electronic Stability Control",
      "Hill Hold Assist",
      "Hill Descent Control",
      "ABS with EBD",
      "ISOFIX Child Seat Anchors",
      "Rear Parking Sensors",
      "Automatic Climate Control",
      "Push Button Start",
      "Cruise Control",
      "Electrically Adjustable ORVMs",
      "Keyless Entry",
      "TPMS",
      "Electronic Parking Brake",
      "Auto Hold",
      "CCS-II Charging",
    ],
  },

  {
    id: "tata-punch-ev-empowered-40",
    name: "Punch EV Empowered 40",
    price: 1249000,
    features: [
      "6 Airbags",
      "Electronic Stability Control",
      "Hill Hold Assist",
      "Hill Descent Control",
      "ABS with EBD",
      "ISOFIX Child Seat Anchors",
      "360-Degree Camera",
      "Blind Spot Monitor",
      "Front Parking Sensors",
      "Rear Parking Sensors",
      "10.25-Inch Touchscreen Infotainment",
      "10.25-Inch Digital Driver Display",
      "Cruise Control",
      "Automatic Climate Control",
      "16-Inch Alloy Wheels",
      "Auto Folding ORVMs",
      "Rain Sensing Wipers",
      "Electronic Parking Brake",
      "Auto Hold",
      "TPMS",
      "CCS-II Charging",
    ],
  },

  {
    id: "tata-punch-ev-empowered-plus-s-40",
    name: "Punch EV Empowered Plus S 40",
    price: 1279000,
    features: [
      "6 Airbags",
      "Electronic Stability Control",
      "Hill Hold Assist",
      "Hill Descent Control",
      "ABS with EBD",
      "ISOFIX Child Seat Anchors",
      "360-Degree Camera",
      "Blind Spot Monitor",
      "Front Parking Sensors",
      "Rear Parking Sensors",
      "10.25-Inch Touchscreen Infotainment",
      "10.25-Inch Digital Driver Display",
      "Cruise Control",
      "Automatic Climate Control",
      "16-Inch Alloy Wheels",
      "Auto Folding ORVMs",
      "Rain Sensing Wipers",
      "Electronic Parking Brake",
      "Auto Hold",
      "Wireless Phone Charger",
      "Ventilated Front Seats",
      "Electric Sunroof",
      "Leatherette Upholstery",
      "Auto Dimming IRVM",
      "TPMS",
      "CCS-II Charging",
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
    console.log("🚗 EVINSIGHTS - ADD TATA PUNCH EV");
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
       3. CLEAN OLD TATA PUNCH EV DATA
    ===================================================== */

    console.log("\n🧹 Cleaning existing Tata Punch EV records...");

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

    console.log("   ✅ Existing Tata Punch EV data cleaned");

    /* =====================================================
       4. CANONICAL VEHICLE DATA
    ===================================================== */

    console.log("\n🚗 Inserting Tata Punch EV...");

    const vehiclePayload = {
      /* ---------------------------------------------------
         IDENTITY
      --------------------------------------------------- */

      name: "Tata Punch EV",
      model: "Punch EV",
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

      batteryCapacity: 30,
      batteryCapacityKwh: 30,
      batteryKwh: 30,

      batteryOptions: [
        30,
        40,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-ion",

      batteryChemistry: "Lithium-ion",

      /* ---------------------------------------------------
         RANGE
      --------------------------------------------------- */

      range: 275,
      rangeKm: 275,

      araiRange: 275,
      midcRange: 275,

      rangeOptions: [
        275,
        350,
        468,
      ],

      claimedRange30: 365,
      claimedRange30Max: 375,

      claimedRange40: 468,

      rangeUnit: "km",

      /* ---------------------------------------------------
         MOTOR
      --------------------------------------------------- */

      motorPower: 65,
      motorPowerKw: 65,

      powerKw: 65,
      power: 65,

      powerOptionsKw: [
        65,
        95,
      ],

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous Motor",

      maxPower: 87,
      maxPowerUnit: "bhp",

      maxPowerOptions: [
        87,
        127,
      ],

      maxTorque: 154,
      torque: 154,
      torqueNm: 154,

      torqueUnit: "Nm",

      /* ---------------------------------------------------
         DRIVETRAIN
      --------------------------------------------------- */

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "Single-Speed",

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

      length: 3880,
      lengthMm: 3880,

      width: 1742,
      widthMm: 1742,

      height: 1622,
      heightMm: 1622,

      wheelbase: 2445,
      wheelbaseMm: 2445,

      groundClearance: 195,
      groundClearanceMm: 195,

      bootSpace: 366,
      bootCapacity: 366,
      bootCapacityLitres: 366,

      turningRadius: 5,
      turningRadiusUnit: "m",

      /* ---------------------------------------------------
         CLASSIFICATION
      --------------------------------------------------- */

      bodyType: "SUV",
      fuelType: "Electric",

      /* ---------------------------------------------------
         PRICE
      --------------------------------------------------- */

      priceMin: 969000,
      priceMax: 1279000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      /* ---------------------------------------------------
         RATING
      --------------------------------------------------- */

      rating: 4.8,
      reviewCount: 43,

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

        "Tata Punch EV",

        "tata-punch-ev",

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
          title: "Tata Punch EV",
          slug: "tata-punch-ev",
          description:
            "Tata Punch EV electric SUV with 30 kWh and 40 kWh battery options, FWD electric motor, up to 468 km claimed MIDC range and 5-star Bharat NCAP safety rating.",
        }),

        JSON.stringify({
          ...vehiclePayload,

          specs: {
            battery: 30,

            batteryOptions: [
              30,
              40,
            ],

            range: 275,

            rangeOptions: [
              275,
              350,
              468,
            ],

            power: 65,

            powerOptions: [
              65,
              95,
            ],

            torque: 154,
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

        43,

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
      const is40 =
        variant.id.includes("-40");

      const battery =
        is40 ? 40 : 30;

      const range =
        is40 ? 468 : 375;

      const motorPower =
        is40 ? 95 : 65;

      const maxPower =
        is40 ? 127 : 87;

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

            maxTorque: 154,

            transmission: "Automatic",
            transmissionType: "Automatic",

            gearbox: "Single-Speed",

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
    ===================================================== */

    console.log("\n⚙️ Inserting specifications...");

    /* -----------------------------------------------------
       BATTERY
    ----------------------------------------------------- */

    const batteryData = {
      batteryCapacity: 30,
      batteryCapacityKwh: 30,
      batteryKwh: 30,

      batteryOptions: [
        30,
        40,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-ion",

      batteryChemistry: "Lithium-ion",

      range: 275,
      rangeKm: 275,

      rangeOptions: [
        275,
        350,
        468,
      ],

      claimedRange30: 365,
      claimedRange30Max: 375,

      claimedRange40: 468,

      rangeUnit: "km",

      chargingPort: "CCS-II",

      charging: {
        acCharging:
          "11.9 hours | 3.3 kW AC (10-100%)",

        acCharging7_2Kw:
          "4.5 hours | 7.2 kW AC (10-100%)",

        acCharging40:
          "5.3 hours | 7.2 kW AC (10-100%)",

        dcFastCharging:
          "26 minutes | 65 kW DC (20-80%)",

        chargingOptions: [
          "3.3 kW AC",
          "7.2 kW AC",
          "65 kW DC",
        ],

        fastCharging: true,

        fastChargingTime:
          "26 minutes (20-80%)",
      },
    };

    /* -----------------------------------------------------
       PERFORMANCE
    ----------------------------------------------------- */

    const performanceData = {
      motorPower: 65,
      motorPowerKw: 65,

      powerOptionsKw: [
        65,
        95,
      ],

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous Motor",

      maxPower: 87,
      maxPowerUnit: "bhp",

      maxPowerOptions: [
        87,
        127,
      ],

      maxTorque: 154,

      torque: 154,

      torqueNm: 154,

      torqueUnit: "Nm",

      transmission: "Automatic",

      transmissionType: "Automatic",

      gearbox: "Single-Speed",

      driveType: "FWD",

      drivetrain: "FWD",

      acceleration0To100: 13.5,

      acceleration0To100Unit: "seconds",

      acceleration0To10030: 13.5,

      acceleration0To10040: 9.0,

      regenerativeBraking: true,

      regenerativeBrakingLevels: [
        1,
        2,
        3,
        4,
      ],

      driveModes: [
        "City",
        "Sport",
        "Eco",
      ],

      suspensionSteeringBrakes: {
        frontSuspension:
          "MacPherson Strut Suspension",

        rearSuspension:
          "Rear Twist Beam",

        steeringType:
          "Electric Power Steering",

        steeringColumn:
          "Tilt",

        turningRadius: 5,

        turningRadiusUnit: "m",

        frontBrakeType:
          "Disc",

        rearBrakeType:
          "Drum",
      },
    };

    /* -----------------------------------------------------
       DIMENSIONS
    ----------------------------------------------------- */

    const dimensionsData = {
      length: 3880,
      lengthMm: 3880,

      width: 1742,
      widthMm: 1742,

      height: 1622,
      heightMm: 1622,

      wheelbase: 2445,
      wheelbaseMm: 2445,

      bootSpace: 366,
      bootCapacity: 366,
      bootCapacityLitres: 366,

      seatingCapacity: 5,
      seats: 5,

      groundClearance: 195,
      groundClearanceMm: 195,

      turningRadius: 5,
      turningRadiusUnit: "m",

      exterior: {
        bodyType: "SUV",

        LEDHeadlamps: true,

        LEDTaillights: true,

        DRLs: true,

        fogLights: true,

        autoHeadlamps: true,

        rainSensingWipers: true,

        electricallyAdjustableORVMs: true,

        electricallyFoldableORVMs: true,

        alloyWheels: true,

        tyreType: "Tubeless",

        additionalFeatures: [
          "Compact SUV Styling",
          "LED DRLs",
          "Flush Door Handles",
          "Roof Rails",
          "EV-Specific Exterior Design",
        ],
      },
    };

    /* -----------------------------------------------------
       SAFETY
    ----------------------------------------------------- */

    const safetyData = {
      airbags: 6,

      abs: true,

      brakeAssist: true,

      ebd: true,

      esc: true,

      electronicStabilityControl: true,

      hillHoldAssist: true,

      hillDescentControl: true,

      tpms: true,

      electronicParkingBrake: true,

      autoHold: true,

      rearParkingCamera: true,

      parkingSensors: true,

      frontParkingSensors: true,

      rearParkingSensors: true,

      surroundViewCamera:
        "360-Degree",

      bharatNcapRating: 5,

      bharatNcapAdultProtection:
        "31.09/32",

      bharatNcapChildProtection:
        "45/49",

      isofix: true,

      highBeamAssist: true,

      blindSpotMonitor: true,

      adas: {
        available: false,

        level: null,

        features: [],
      },

      driverMonitoringSystem: false,

      secure360: false,

      brakeByWire: false,

      autoParkAssist: false,
    };

    /* -----------------------------------------------------
       FEATURES
    ----------------------------------------------------- */

    const featuresData = {
      comfortConvenience: {
        automaticClimateControl: true,

        dualZoneClimateControl: false,

        cruiseControl: true,

        adaptiveCruiseControl: false,

        poweredDriverSeat: false,

        driverSeatMemory: false,

        electricallyAdjustableORVMs: true,

        electricallyFoldableORVMs: true,

        pushButtonStart: true,

        keylessEntry: true,

        powerWindows: "All 4",

        electronicParkingBrake: true,

        autoHold: true,

        ambientLighting: true,

        sunroof: true,

        poweredTailgate: false,

        ventilatedFrontSeats: true,

        wirelessPhoneCharger: true,
      },

      interior: {
        digitalInstrumentCluster: true,

        leatheretteUpholstery: true,

        automaticClimateControl: true,

        premiumCabin: true,

        illuminatedSteeringWheel: true,

        driverAndOccupantMonitoring: false,
      },

      entertainmentCommunication: {
        touchscreenSize:
          "10.25 inch",

        touchscreenSizeLower:
          "8 inch",

        driverDisplaySize:
          "10.25 inch",

        androidAuto: true,

        appleCarPlay: true,

        wirelessAndroidAuto: true,

        wirelessAppleCarPlay: true,

        speakers: 4,

        wirelessCharging: true,

        usbCharging: true,

        bluetooth: true,

        wifi: true,
      },

      advancedInternetFeatures: {
        connectedCarTechnology: true,

        remoteLockUnlock: true,

        remoteVehicleStatusCheck: true,

        vehicleTracking: true,

        remoteClimateControl: true,

        OTAUpdates: true,

        liveVehicleView: false,

        driverMonitoringSystem: false,

        digitalKey: false,

        chargeScheduler: true,

        userProfiles: true,

        smartwatchConnectivity: true,

        voiceCommands: true,

        voiceCommandLanguages: 6,

        blindSpotMonitor: true,
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
            "26 min | DC Fast Charging (20-80%)",

          acChargingTime:
            "11.9 hours | 3.3 kW AC (10-100%)",

          acCharging7_2Kw:
            "4.5 hours | 7.2 kW AC (10-100%)",

          acCharging40:
            "5.3 hours | 7.2 kW AC (10-100%)",

          dcCharging:
            "26 min | 65 kW DC (20-80%)",

          portableCharging:
            "AC Charging",

          chargingOptions: [
            "3.3 kW AC",
            "7.2 kW AC",
            "65 kW DC",
          ],

          fastCharging: true,

          acPowerKw: 7.2,

          acPowerOptionsKw: [
            3.3,
            7.2,
          ],

          dcPowerKw: 65,

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

          "Tata Punch EV front left side",

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
      "\n🔎 Verifying inserted Tata Punch EV data..."
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
      "🎉 TATA PUNCH EV INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle        : Tata Punch EV"
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
      "Battery        : 30 / 40 kWh"
    );

    console.log(
      "Range          : 365-375 / 468 km claimed"
    );

    console.log(
      "Motor Power    : 65 / 95 kW"
    );

    console.log(
      "Max Power      : 87 / 127 bhp"
    );

    console.log(
      "Torque         : 154 Nm"
    );

    console.log(
      "Price range    : ₹9.69L - ₹12.79L"
    );

    console.log(
      "Rating         : 4.8 / 5"
    );

    console.log(
      "Reviews        : 43"
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
      "\n⚠️ No partial Tata Punch EV data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();