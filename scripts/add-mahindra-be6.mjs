// // scripts/add-mahindra-be6.mjs

// import pg from "pg";

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// /* =========================================================
//    CONSTANTS
// ========================================================= */

// const now = new Date();

// const VEHICLE_ID = "mahindra-be-6";
// const BRAND_ID = "mahindra";
// const MARKET_ID = "india";

// const IMAGE_URL =
//   "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/BE-6/13803/1786781975236/front-left-side-47.jpg?tr=w-230";

// const SOURCE = "CarDekho";
// const SOURCE_URL =
//   "https://www.cardekho.com/mahindra/be-6";

// /* =========================================================
//    VARIANTS
// ========================================================= */

// const variants = [
//   {
//     id: "mahindra-be-6-sporteq-one-59kwh",
//     name: "BE 6 SPORTEQ One 59kWh",
//     price: 1945000,
//     features: [
//       "6 Airbags",
//       "ESP",
//       "12.3-Inch Touchscreen Infotainment",
//       "12.3-Inch Digital Driver's Display",
//       "6-Speaker Audio System",
//       "Wireless Android Auto & Apple CarPlay",
//       "Automatic Climate Control",
//       "Rear Parking Camera",
//       "Cruise Control",
//       "Electronic Parking Brake",
//     ],
//   },

//   {
//     id: "mahindra-be-6-sporteq-two-59kwh",
//     name: "BE 6 SPORTEQ Two 59kWh",
//     price: 2095000,
//     features: [
//       "12.3-Inch Co-Driver Entertainment Screen",
//       "16-Speaker Harman Kardon Sound System",
//       "Dual-Zone Automatic Climate Control",
//       "540-Degree Camera",
//       "Wireless Phone Charger",
//       "Front Parking Sensors",
//     ],
//   },

//   {
//     id: "mahindra-be-6-sporteq-three-59kwh",
//     name: "BE 6 SPORTEQ Three 59kWh",
//     price: 2195000,
//     features: [
//       "Panoramic Glassroof",
//       "6-Way Powered Driver's Seat",
//       "Ventilated Front Seats",
//       "16-Speaker Harman Kardon Sound System",
//       "540-Degree Camera",
//     ],
//   },

//   {
//     id: "mahindra-be-6-sporteq-three-70kwh",
//     name: "BE 6 SPORTEQ Three 70kWh",
//     price: 2295000,
//     features: [
//       "Panoramic Glassroof",
//       "6-Way Powered Driver's Seat",
//       "Ventilated Front Seats",
//       "16-Speaker Harman Kardon Sound System",
//       "540-Degree Camera",
//     ],
//   },

//   {
//     id: "mahindra-be-6-sporteq-three-plus-70kwh",
//     name: "BE 6 SPORTEQ Three Plus 70kWh",
//     price: 2395000,
//     features: [
//       "Ambient Lighting",
//       "Powered Tailgate",
//       "Level-2 ADAS",
//       "Keyless Entry",
//       "Dual Front Wireless Phone Chargers",
//     ],
//   },

//   {
//     id: "mahindra-be-6-fe-79kwh",
//     name: "BE 6 FE 79kWh",
//     price: 2445000,
//     features: [
//       "Panoramic Glassroof",
//       "6-Way Powered Driver's Seat",
//       "Ventilated Front Seats",
//       "16-Speaker Harman Kardon Sound System",
//       "540-Degree Camera",
//       "Adaptive Dampers",
//     ],
//   },

//   {
//     id: "mahindra-be-6-sporteq-three-plus-79kwh",
//     name: "BE 6 SPORTEQ Three Plus 79kWh",
//     price: 2495000,
//     features: [],
//   },

//   {
//     id: "mahindra-be-6-fe-four-79kwh",
//     name: "BE 6 FE Four 79kWh",
//     price: 2695000,
//     features: [
//       "AR Head-Up Display",
//       "Adaptive Dampers",
//       "Auto Park Assist",
//       "Knee Airbag",
//       "Level-2 Plus ADAS",
//     ],
//   },

//   {
//     id: "mahindra-be-6-sporteq-four-79kwh",
//     name: "BE 6 SPORTEQ Four 79kWh",
//     price: 2695000,
//     features: [
//       "AR Head-Up Display",
//       "Adaptive Dampers",
//       "Auto Park Assist",
//       "Knee Airbag",
//       "Level-2 Plus ADAS",
//     ],
//   },

//   {
//     id: "mahindra-be-6-sporteq-launch-edition-79kwh",
//     name: "BE 6 SPORTEQ Launch Edition 79kWh",
//     price: 2695000,
//     features: [
//       "AR Head-Up Display",
//       "Adaptive Dampers",
//       "Auto Park Assist",
//       "Knee Airbag",
//       "Level-2 Plus ADAS",
//     ],
//   },
// ];

// /* =========================================================
//    MAIN
// ========================================================= */

// async function main() {
//   const client = await pool.connect();

//   try {
//     console.log("=================================================");
//     console.log("🚗 EVINSIGHTS - ADD MAHINDRA BE 6");
//     console.log("=================================================\n");

//     await client.query("BEGIN");

//     /* =====================================================
//        1. BRAND
//     ===================================================== */

//     console.log("🏷️ Upserting Mahindra brand...");

//     await client.query(
//       `
//       INSERT INTO brands (
//         id,
//         name,
//         slug,
//         country,
//         logo,
//         payload,
//         created_at,
//         updated_at
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5,
//         $6::jsonb,
//         $7,
//         $7
//       )
//       ON CONFLICT (id)
//       DO UPDATE SET
//         name = EXCLUDED.name,
//         slug = EXCLUDED.slug,
//         country = EXCLUDED.country,
//         payload = EXCLUDED.payload,
//         updated_at = EXCLUDED.updated_at
//       `,
//       [
//         BRAND_ID,
//         "Mahindra",
//         "mahindra",
//         "India",
//         null,
//         JSON.stringify({
//           name: "Mahindra",
//           country: "India",
//           slug: "mahindra",
//         }),
//         now,
//       ]
//     );

//     console.log("   ✅ Mahindra brand ready");

//     /* =====================================================
//        2. MARKET
//     ===================================================== */

//     console.log("🌍 Upserting India market...");

//     await client.query(
//       `
//       INSERT INTO markets (
//         id,
//         name,
//         currency_code,
//         payload
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4::jsonb
//       )
//       ON CONFLICT (id)
//       DO UPDATE SET
//         name = EXCLUDED.name,
//         currency_code = EXCLUDED.currency_code,
//         payload = EXCLUDED.payload
//       `,
//       [
//         MARKET_ID,
//         "India",
//         "INR",
//         JSON.stringify({
//           country: "India",
//           currency: "INR",
//         }),
//       ]
//     );

//     console.log("   ✅ India market ready");

//     /* =====================================================
//        3. CLEAN OLD BE 6 DATA
//     ===================================================== */

//     console.log("\n🧹 Cleaning existing BE 6 records...");

//     await client.query(
//       `
//       DELETE FROM pricing
//       WHERE variant_id IN (
//         SELECT id
//         FROM variants
//         WHERE vehicle_id = $1
//       )
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM variants
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM specifications
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM charging
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM media
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM vehicles
//       WHERE id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     console.log("   ✅ Existing BE 6 data cleaned");

//     /* =====================================================
//        4. CANONICAL VEHICLE DATA
       
//        IMPORTANT:
//        Numeric values are stored as numbers.
//        Units are stored separately.
//     ===================================================== */

//     console.log("\n🚗 Inserting Mahindra BE 6...");

//     const vehiclePayload = {
//       /* ---------------------------------------------------
//          IDENTITY
//       --------------------------------------------------- */

//       name: "Mahindra BE 6",
//       model: "BE 6",
//       brand: "Mahindra",
//       brandId: BRAND_ID,

//       /* ---------------------------------------------------
//          SOURCE
//       --------------------------------------------------- */

//       source: SOURCE,
//       sourceUrl: SOURCE_URL,

//       /* ---------------------------------------------------
//          BATTERY
//       --------------------------------------------------- */

//       batteryCapacity: 79,
//       batteryCapacityKwh: 79,
//       batteryKwh: 79,

//       batteryCapacityUnit: "kWh",
//       batteryType: "Lithium-ion",

//       /* ---------------------------------------------------
//          RANGE
//       --------------------------------------------------- */

//       range: 683,
//       rangeKm: 683,
//       araiRange: 683,
//       wltpRange: null,

//       rangeUnit: "km",

//       /* ---------------------------------------------------
//          MOTOR
//       --------------------------------------------------- */

//       motorPower: 210,
//       motorPowerKw: 210,
//       powerKw: 210,
//       power: 210,

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous",

//       maxPower: 282,
//       maxPowerUnit: "bhp",

//       maxTorque: 380,
//       torque: 380,
//       torqueNm: 380,
//       torqueUnit: "Nm",

//       /* ---------------------------------------------------
//          DRIVETRAIN
//       --------------------------------------------------- */

//       transmission: "Automatic",
//       transmissionType: "Automatic",

//       gearbox: "Single Speed",

//       driveType: "RWD",
//       drivetrain: "RWD",

//       /* ---------------------------------------------------
//          CHARGING
//       --------------------------------------------------- */

//       chargingPort: "CCS-II",

//       /* ---------------------------------------------------
//          SEATING
//       --------------------------------------------------- */

//       seats: 5,
//       seatingCapacity: 5,

//       /* ---------------------------------------------------
//          DIMENSIONS
//       --------------------------------------------------- */

//       length: 4371,
//       lengthMm: 4371,

//       width: 1907,
//       widthMm: 1907,

//       height: 1627,
//       heightMm: 1627,

//       wheelbase: 2775,
//       wheelbaseMm: 2775,

//       groundClearance: 207,
//       groundClearanceMm: 207,

//       bootSpace: 455,
//       bootCapacity: 455,
//       bootCapacityLitres: 455,

//       /* ---------------------------------------------------
//          CLASSIFICATION
//       --------------------------------------------------- */

//       bodyType: "SUV",
//       fuelType: "Electric",

//       /* ---------------------------------------------------
//          PRICE
//       --------------------------------------------------- */

//       priceMin: 1945000,
//       priceMax: 2695000,

//       currency: "INR",
//       currencyCode: "INR",
//       currencySymbol: "₹",

//       /* ---------------------------------------------------
//          RATING
//       --------------------------------------------------- */

//       rating: 4.8,
//       reviewCount: 523,

//       /* ---------------------------------------------------
//          IMAGE
//       --------------------------------------------------- */

//       image: IMAGE_URL,
//       imageUrl: IMAGE_URL,
//     };

//     await client.query(
//       `
//       INSERT INTO vehicles (
//         id,
//         name,
//         slug,
//         brand_id,
//         generation_id,
//         markets,
//         classification,
//         status,
//         page,
//         extracted,
//         verification,
//         metadata,
//         rating,
//         review_count,
//         payload,
//         created_at,
//         updated_at
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5,
//         $6,
//         $7::jsonb,
//         $8::jsonb,
//         $9::jsonb,
//         $10::jsonb,
//         $11::jsonb,
//         $12::jsonb,
//         $13,
//         $14,
//         $15::jsonb,
//         $16,
//         $16
//       )
//       `,
//       [
//         VEHICLE_ID,

//         "Mahindra BE 6",

//         "mahindra-be-6",

//         BRAND_ID,

//         null,

//         ["india"],

//         JSON.stringify({
//           bodyType: "SUV",
//           fuelType: "Electric",
//           seatingCapacity: 5,
//         }),

//         JSON.stringify({
//           status: "active",
//           launched: true,
//           available: true,
//         }),

//         JSON.stringify({
//           title: "Mahindra BE 6",
//           slug: "mahindra-be-6",
//           description:
//             "Mahindra BE 6 electric SUV with advanced electric powertrain, long claimed range and modern technology.",
//         }),

//         JSON.stringify({
//           ...vehiclePayload,
//           specs: {
//             battery: 79,
//             range: 683,
//             power: 210,
//             torque: 380,
//           },
//         }),

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//           verified: true,
//         }),

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//           market: "India",
//           image: IMAGE_URL,
//           imageUrl: IMAGE_URL,
//         }),

//         4.8,

//         523,

//         JSON.stringify(vehiclePayload),

//         now,
//       ]
//     );

//     console.log("   ✅ Vehicle inserted");

//     /* =====================================================
//        5. VARIANTS + PRICING
//     ===================================================== */

//     console.log("\n📦 Inserting variants...");

//     for (const variant of variants) {
//       await client.query(
//         `
//         INSERT INTO variants (
//           id,
//           vehicle_id,
//           name,
//           slug,
//           payload,
//           created_at,
//           updated_at
//         )
//         VALUES (
//           $1,
//           $2,
//           $3,
//           $4,
//           $5::jsonb,
//           $6,
//           $6
//         )
//         `,
//         [
//           variant.id,

//           VEHICLE_ID,

//           variant.name,

//           variant.id,

//           JSON.stringify({
//             name: variant.name,
//             transmission: "Automatic",
//             transmissionType: "Automatic",
//             driveType: "RWD",
//             drivetrain: "RWD",
//             fuelType: "Electric",
//             features: variant.features,
//           }),

//           now,
//         ]
//       );

//       await client.query(
//         `
//         INSERT INTO pricing (
//           id,
//           variant_id,
//           market_id,
//           amount,
//           currency_code,
//           currency_symbol,
//           payload,
//           created_at,
//           updated_at
//         )
//         VALUES (
//           $1,
//           $2,
//           $3,
//           $4,
//           $5,
//           $6,
//           $7::jsonb,
//           $8,
//           $8
//         )
//         `,
//         [
//           `pricing-${variant.id}-india`,

//           variant.id,

//           MARKET_ID,

//           variant.price,

//           "INR",

//           "₹",

//           JSON.stringify({
//             price: variant.price,
//             amount: variant.price,
//             currency: "INR",
//             currencyCode: "INR",
//             currencySymbol: "₹",
//             market: "India",
//             source: SOURCE,
//             sourceUrl: SOURCE_URL,
//           }),

//           now,
//         ]
//       );

//       console.log(
//         `   ✅ ${variant.name} → ₹${variant.price.toLocaleString(
//           "en-IN"
//         )}`
//       );
//     }

//     /* =====================================================
//        6. SPECIFICATIONS
       
//        ONLY valid types:
//        battery
//        performance
//        dimensions
//        safety
//        features
//     ===================================================== */

//     console.log("\n⚙️ Inserting specifications...");

//     /* -----------------------------------------------------
//        BATTERY
//     ----------------------------------------------------- */

//     const batteryData = {
//       batteryCapacity: 79,
//       batteryCapacityKwh: 79,
//       batteryKwh: 79,
//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium-ion",

//       range: 683,
//       rangeKm: 683,
//       rangeUnit: "km",

//       chargingPort: "CCS-II",

//       charging: {
//         chargingTime:
//           "8 / 11.7 h (11.2 kW / 7.2 kW Charger)",

//         portableCharger:
//           "13A up to 3.2 kW",

//         wallCharger:
//           "7.2 kW / 11.2 kW",
//       },
//     };

//     /* -----------------------------------------------------
//        PERFORMANCE
//     ----------------------------------------------------- */

//     const performanceData = {
//       motorPower: 210,
//       motorPowerKw: 210,
//       powerKw: 210,
//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous",

//       maxPower: 282,
//       maxPowerUnit: "bhp",

//       maxTorque: 380,
//       torque: 380,
//       torqueNm: 380,
//       torqueUnit: "Nm",

//       transmission: "Automatic",
//       transmissionType: "Automatic",

//       gearbox: "Single Speed",

//       driveType: "RWD",
//       drivetrain: "RWD",

//       suspensionSteeringBrakes: {
//         frontSuspension:
//           "MacPherson Strut suspension",

//         rearSuspension:
//           "Multi-link suspension",

//         shockAbsorbers:
//           "FDD & MTV-CL tech",

//         steeringType: "Electric",

//         steeringColumn:
//           "Tilt & Telescopic",

//         turningRadius: 5,
//         turningRadiusUnit: "m",

//         frontBrakeType: "Disc",

//         rearBrakeType: "Disc",
//       },
//     };

//     /* -----------------------------------------------------
//        DIMENSIONS
//     ----------------------------------------------------- */

//     const dimensionsData = {
//       length: 4371,
//       lengthMm: 4371,

//       width: 1907,
//       widthMm: 1907,

//       height: 1627,
//       heightMm: 1627,

//       wheelbase: 2775,
//       wheelbaseMm: 2775,

//       bootSpace: 455,
//       bootCapacity: 455,
//       bootCapacityLitres: 455,

//       seatingCapacity: 5,
//       seats: 5,

//       groundClearance: 207,
//       groundClearanceMm: 207,

//       groundClearanceUnladen: 207,

//       exterior: {
//         fogLights: "Front",
//         orvm: "Powered & Folding",

//         tyreType: "Radial Tubeless",

//         wheelSize: 20,
//         wheelSizeUnit: "inch",

//         ledDRLs: true,
//         ledHeadlamps: true,
//         ledTaillights: true,
//         ledFogLamps: true,

//         additionalFeatures: [
//           "Frunk volume 45 litres",
//           "Infinity Roof - Fixed Glass Panoramic Sunroof with LED pattern",
//         ],
//       },
//     };

//     /* -----------------------------------------------------
//        SAFETY
//     ----------------------------------------------------- */

//     const safetyData = {
//       airbags: 7,

//       abs: true,

//       brakeAssist: true,

//       ebd: true,

//       tpms: true,

//       esc: true,

//       hud: true,

//       adas: {
//         automaticEmergencyBraking: true,
//         trafficSignRecognition: true,
//         laneDepartureWarning: true,
//         laneKeepAssist: true,
//         adaptiveCruiseControl: true,
//         autonomousParking: "Full",
//       },
//     };

//     /* -----------------------------------------------------
//        FEATURES
//     ----------------------------------------------------- */

//     const featuresData = {
//       comfortConvenience: {
//         bootOpening: "Hands-Free",

//         adjustableSteering:
//           "Height & Reach",

//         heightAdjustableDriverSeat: true,

//         ventilatedSeats: "Front Only",

//         electricAdjustableSeats:
//           "Driver Seat Only",

//         automaticClimateControl: true,

//         rearSeatCentreArmRest: true,

//         rearACVents: true,

//         cruiseControl: true,

//         parkingSensors: "Front & Rear",

//         foldableRearSeat:
//           "60:40 Split",

//         keylessEntry: true,

//         engineStartStopButton: true,

//         usbCharger: "Front & Rear",

//         driveModes: 6,

//         driveModeTypes: [
//           "Default",
//           "Range",
//           "Everyday",
//           "Race",
//           "Custom",
//           "Snow",
//         ],
//       },

//       interior: {
//         lighting: "Ambient light",

//         additionalFeatures: [
//           "Parcel Shelf",
//           "Dual Super HD Screens",
//         ],

//         digitalCluster: true,
//       },

//       entertainmentCommunication: {
//         touchscreenSize: "12.3 inch",

//         androidAuto: "Wireless",

//         appleCarPlay: "Wireless",

//         speakers: 16,

//         inbuiltApps: "Me4U App",

//         speakersPosition:
//           "Front & Rear",

//         dolbyAtmos: true,
//       },

//       advancedInternetFeatures: {
//         liveLocation: true,

//         remoteVehicleStatusCheck: true,

//         otaUpdates: true,

//         googleAlexaConnectivity: true,

//         overspeedingAlert: true,

//         remoteControlApp: true,

//         valetMode: true,

//         remoteAC: true,

//         remoteDoorLockUnlock: true,

//         sosEmergencyAssistance: true,
//       },
//     };

//     /* -----------------------------------------------------
//        INSERT SPECIFICATION
//     ----------------------------------------------------- */

//     async function insertSpecification(
//       type,
//       data
//     ) {
//       await client.query(
//         `
//         INSERT INTO specifications (
//           id,
//           vehicle_id,
//           type,
//           data,
//           payload
//         )
//         VALUES (
//           $1,
//           $2,
//           $3,
//           $4::jsonb,
//           $5::jsonb
//         )
//         `,
//         [
//           `spec-${VEHICLE_ID}-${type}`,

//           VEHICLE_ID,

//           type,

//           JSON.stringify(data),

//           JSON.stringify({
//             source: SOURCE,
//             sourceUrl: SOURCE_URL,
//             type,
//           }),
//         ]
//       );

//       console.log(
//         `   ✅ ${type} specification inserted`
//       );
//     }

//     await insertSpecification(
//       "battery",
//       batteryData
//     );

//     await insertSpecification(
//       "performance",
//       performanceData
//     );

//     await insertSpecification(
//       "dimensions",
//       dimensionsData
//     );

//     await insertSpecification(
//       "safety",
//       safetyData
//     );

//     await insertSpecification(
//       "features",
//       featuresData
//     );

//     /* =====================================================
//        7. CHARGING
//     ===================================================== */

//     console.log("\n🔋 Inserting charging data...");

//     await client.query(
//       `
//       INSERT INTO charging (
//         id,
//         vehicle_id,
//         data,
//         payload
//       )
//       VALUES (
//         $1,
//         $2,
//         $3::jsonb,
//         $4::jsonb
//       )
//       `,
//       [
//         `charging-${VEHICLE_ID}`,

//         VEHICLE_ID,

//         JSON.stringify({
//           chargingPort: "CCS-II",

//           chargingTime:
//             "8 / 11.7 h (11.2 kW / 7.2 kW Charger)",

//           portableCharger:
//             "13A up to 3.2 kW",

//           wallCharger:
//             "7.2 kW / 11.2 kW",

//           fastCharging: true,

//           acPowerKw: 11.2,

//           dcPowerKw: null,
//         }),

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//         }),
//       ]
//     );

//     console.log("   ✅ Charging data inserted");

//     /* =====================================================
//        8. MEDIA
//     ===================================================== */

//     console.log("\n🖼️ Inserting media...");

//     await client.query(
//       `
//       INSERT INTO media (
//         id,
//         vehicle_id,
//         type,
//         url,
//         alt,
//         payload
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5,
//         $6::jsonb
//       )
//       `,
//       [
//         `media-${VEHICLE_ID}-main`,

//         VEHICLE_ID,

//         "image",

//         IMAGE_URL,

//         "Mahindra BE 6 front left side",

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//           role: "primary",
//         }),
//       ]
//     );

//     console.log("   ✅ Main image inserted");

//     /* =====================================================
//        9. VERIFY BEFORE COMMIT
//     ===================================================== */

//     console.log("\n🔎 Verifying inserted BE 6 data...");

//     const vehicleCheck =
//       await client.query(
//         `
//         SELECT
//           id,
//           name,
//           slug,
//           brand_id,
//           rating,
//           review_count,
//           payload
//         FROM vehicles
//         WHERE id = $1
//         `,
//         [VEHICLE_ID]
//       );

//     const variantCheck =
//       await client.query(
//         `
//         SELECT COUNT(*)::int AS count
//         FROM variants
//         WHERE vehicle_id = $1
//         `,
//         [VEHICLE_ID]
//       );

//     const specificationCheck =
//       await client.query(
//         `
//         SELECT
//           type,
//           data
//         FROM specifications
//         WHERE vehicle_id = $1
//         ORDER BY type
//         `,
//         [VEHICLE_ID]
//       );

//     const chargingCheck =
//       await client.query(
//         `
//         SELECT
//           id,
//           data
//         FROM charging
//         WHERE vehicle_id = $1
//         `,
//         [VEHICLE_ID]
//       );

//     const mediaCheck =
//       await client.query(
//         `
//         SELECT
//           id,
//           type,
//           url
//         FROM media
//         WHERE vehicle_id = $1
//         `,
//         [VEHICLE_ID]
//       );

//     if (!vehicleCheck.rows.length) {
//       throw new Error(
//         "Verification failed: vehicle was not inserted."
//       );
//     }

//     if (
//       Number(
//         variantCheck.rows[0]?.count || 0
//       ) !== variants.length
//     ) {
//       throw new Error(
//         `Verification failed: expected ${variants.length} variants.`
//       );
//     }

//     const specificationTypes =
//       specificationCheck.rows.map(
//         (row) => row.type
//       );

//     const expectedTypes = [
//       "battery",
//       "performance",
//       "dimensions",
//       "safety",
//       "features",
//     ];

//     for (const type of expectedTypes) {
//       if (
//         !specificationTypes.includes(type)
//       ) {
//         throw new Error(
//           `Verification failed: missing ${type} specification.`
//         );
//       }
//     }

//     if (!chargingCheck.rows.length) {
//       throw new Error(
//         "Verification failed: charging data missing."
//       );
//     }

//     if (!mediaCheck.rows.length) {
//       throw new Error(
//         "Verification failed: media data missing."
//       );
//     }

//     const insertedPayload =
//       vehicleCheck.rows[0].payload;

//     console.log(
//       "\n   Vehicle:",
//       vehicleCheck.rows[0].name
//     );

//     console.log(
//       "   Battery:",
//       insertedPayload.batteryCapacity,
//       "kWh"
//     );

//     console.log(
//       "   Range:",
//       insertedPayload.range,
//       "km"
//     );

//     console.log(
//       "   Power:",
//       insertedPayload.motorPower,
//       "kW"
//     );

//     console.log(
//       "   Torque:",
//       insertedPayload.maxTorque,
//       "Nm"
//     );

//     console.log(
//       "   Variants:",
//       variantCheck.rows[0].count
//     );

//     console.log(
//       "   Specifications:",
//       specificationTypes.join(", ")
//     );

//     console.log(
//       "   Charging:",
//       chargingCheck.rows.length
//     );

//     console.log(
//       "   Media:",
//       mediaCheck.rows.length
//     );

//     /* =====================================================
//        10. COMMIT
//     ===================================================== */

//     await client.query("COMMIT");

//     console.log(
//       "\n================================================="
//     );

//     console.log(
//       "🎉 MAHINDRA BE 6 INSERT COMPLETED"
//     );

//     console.log(
//       "================================================="
//     );

//     console.log(
//       "Vehicle        : Mahindra BE 6"
//     );

//     console.log(
//       "Variants       :",
//       variants.length
//     );

//     console.log(
//       "Specifications : 5"
//     );

//     console.log(
//       "Charging       : 1"
//     );

//     console.log(
//       "Media          : 1"
//     );

//     console.log(
//       "Battery        : 79 kWh"
//     );

//     console.log(
//       "Range          : 683 km"
//     );

//     console.log(
//       "Motor Power    : 210 kW"
//     );

//     console.log(
//       "Torque         : 380 Nm"
//     );

//     console.log(
//       "Price range    : ₹19.45L - ₹26.95L"
//     );

//     console.log(
//       "Rating         : 4.8 / 5"
//     );

//     console.log(
//       "Reviews        : 523"
//     );

//     console.log(
//       "\nSpecification types:"
//     );

//     console.log(
//       "   ✅ battery"
//     );

//     console.log(
//       "   ✅ performance"
//     );

//     console.log(
//       "   ✅ dimensions"
//     );

//     console.log(
//       "   ✅ safety"
//     );

//     console.log(
//       "   ✅ features"
//     );

//     console.log(
//       "\n✅ Database transaction committed."
//     );
//   } catch (error) {
//     await client.query("ROLLBACK");

//     console.error(
//       "\n❌ INSERT FAILED"
//     );

//     console.error(
//       "Transaction rolled back."
//     );

//     console.error(error);

//     console.error(
//       "\n⚠️ No partial BE 6 data was saved."
//     );

//     process.exitCode = 1;
//   } finally {
//     client.release();
//     await pool.end();
//   }
// }

// main();


// scripts/add-byd-sealion-7.mjs

// import dotenv from "dotenv";
// import pg from "pg";

// dotenv.config({
//   path: ".env.local",
// });

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// /* =========================================================
//    CONSTANTS
// ========================================================= */

// const now = new Date();

// const VEHICLE_ID = "byd-sealion-7";
// const BRAND_ID = "byd";
// const MARKET_ID = "india";

// const IMAGE_URL =
//   "https://stimg.cardekho.com/images/carexteriorimages/630x420/BYD/Sealion-7/11814/1747996977985/front-left-side-47.jpg?tr=w-230";

// const SOURCE = "CarDekho";

// const SOURCE_URL =
//   "https://www.cardekho.com/byd/sealion-7";

// /* =========================================================
//    VARIANTS
// ========================================================= */

// const variants = [
//   {
//     id: "byd-sealion-7-dynamic",
//     name: "BYD Sealion 7 Dynamic",
//     price: 4190000,
//     features: [
//       "82.56 kWh Blade Battery",
//       "542 km Claimed Range",
//       "Single Electric Motor",
//       "Rear Wheel Drive",
//       "Automatic Transmission",
//       "15.6-Inch Touchscreen",
//       "11 Airbags",
//       "ADAS",
//     ],
//   },
//   {
//     id: "byd-sealion-7-premium",
//     name: "BYD Sealion 7 Premium",
//     price: 4990000,
//     features: [
//       "82.56 kWh Blade Battery",
//       "542 km Claimed Range",
//       "Dual Electric Motors",
//       "All Wheel Drive",
//       "Automatic Transmission",
//       "15.6-Inch Touchscreen",
//       "12-Speaker Audio System",
//       "Ventilated Front Seats",
//       "ADAS",
//     ],
//   },
//   {
//     id: "byd-sealion-7-premium-anniversary",
//     name: "BYD Sealion 7 Premium Anniversary",
//     price: 4990000,
//     features: [
//       "82.56 kWh Blade Battery",
//       "542 km Claimed Range",
//       "Dual Electric Motors",
//       "All Wheel Drive",
//       "Automatic Transmission",
//       "15.6-Inch Touchscreen",
//       "12-Speaker Audio System",
//       "Ventilated Front Seats",
//       "ADAS",
//     ],
//   },
//   {
//     id: "byd-sealion-7-performance",
//     name: "BYD Sealion 7 Performance",
//     price: 5590000,
//     features: [
//       "82.56 kWh Blade Battery",
//       "502 km Claimed Range",
//       "Dual Electric Motors",
//       "All Wheel Drive",
//       "523 bhp Power",
//       "690 Nm Torque",
//       "0-100 km/h in 4.5 Seconds",
//       "15.6-Inch Touchscreen",
//       "ADAS",
//     ],
//   },
//   {
//     id: "byd-sealion-7-performance-anniversary",
//     name: "BYD Sealion 7 Performance Anniversary",
//     price: 5590000,
//     features: [
//       "82.56 kWh Blade Battery",
//       "502 km Claimed Range",
//       "Dual Electric Motors",
//       "All Wheel Drive",
//       "523 bhp Power",
//       "690 Nm Torque",
//       "0-100 km/h in 4.5 Seconds",
//       "15.6-Inch Touchscreen",
//       "ADAS",
//     ],
//   },
// ];

// /* =========================================================
//    MAIN
// ========================================================= */

// async function main() {
//   const client = await pool.connect();

//   try {
//     console.log("=================================================");
//     console.log("🚗 EVINSIGHTS - ADD BYD SEALION 7");
//     console.log("=================================================\n");

//     await client.query("BEGIN");

//     /* =====================================================
//        1. BRAND
//     ===================================================== */

//     console.log("🏷️ Upserting BYD brand...");

//     await client.query(
//       `
//       INSERT INTO brands (
//         id,
//         name,
//         slug,
//         country,
//         logo,
//         payload,
//         created_at,
//         updated_at
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5,
//         $6::jsonb,
//         $7,
//         $7
//       )
//       ON CONFLICT (id)
//       DO UPDATE SET
//         name = EXCLUDED.name,
//         slug = EXCLUDED.slug,
//         country = EXCLUDED.country,
//         payload = EXCLUDED.payload,
//         updated_at = EXCLUDED.updated_at
//       `,
//       [
//         BRAND_ID,
//         "BYD",
//         "byd",
//         "China",
//         null,
//         JSON.stringify({
//           name: "BYD",
//           country: "China",
//           slug: "byd",
//         }),
//         now,
//       ]
//     );

//     console.log("   ✅ BYD brand ready");

//     /* =====================================================
//        2. MARKET
//     ===================================================== */

//     console.log("🌍 Upserting India market...");

//     await client.query(
//       `
//       INSERT INTO markets (
//         id,
//         name,
//         currency_code,
//         payload
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4::jsonb
//       )
//       ON CONFLICT (id)
//       DO UPDATE SET
//         name = EXCLUDED.name,
//         currency_code = EXCLUDED.currency_code,
//         payload = EXCLUDED.payload
//       `,
//       [
//         MARKET_ID,
//         "India",
//         "INR",
//         JSON.stringify({
//           country: "India",
//           currency: "INR",
//         }),
//       ]
//     );

//     console.log("   ✅ India market ready");

//     /* =====================================================
//        3. CLEAN OLD BYD SEALION 7 DATA
//     ===================================================== */

//     console.log("\n🧹 Cleaning existing BYD Sealion 7 records...");

//     await client.query(
//       `
//       DELETE FROM pricing
//       WHERE variant_id IN (
//         SELECT id
//         FROM variants
//         WHERE vehicle_id = $1
//       )
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM variants
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM specifications
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM charging
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM media
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM vehicles
//       WHERE id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     console.log("   ✅ Existing BYD Sealion 7 data cleaned");

//     /* =====================================================
//        4. CANONICAL VEHICLE DATA
//     ===================================================== */

//     console.log("\n🚗 Inserting BYD Sealion 7...");

//     const vehiclePayload = {
//       /* ---------------------------------------------------
//          IDENTITY
//       --------------------------------------------------- */

//       name: "BYD Sealion 7",
//       model: "Sealion 7",
//       brand: "BYD",
//       brandId: BRAND_ID,

//       /* ---------------------------------------------------
//          SOURCE
//       --------------------------------------------------- */

//       source: SOURCE,
//       sourceUrl: SOURCE_URL,

//       /* ---------------------------------------------------
//          BATTERY
//       --------------------------------------------------- */

//       batteryCapacity: 82.56,
//       batteryCapacityKwh: 82.56,
//       batteryKwh: 82.56,

//       batteryCapacityUnit: "kWh",
//       batteryType: "Blade Battery",

//       /* ---------------------------------------------------
//          RANGE
//       --------------------------------------------------- */

//       range: 542,
//       rangeKm: 542,
//       araiRange: 542,
//       wltpRange: null,

//       rangeUnit: "km",

//       /* ---------------------------------------------------
//          MOTOR
//       --------------------------------------------------- */

//       motorPower: 390,
//       motorPowerKw: 390,
//       powerKw: 390,
//       power: 390,

//       powerUnit: "kW",

//       motorType: "Permanent Magnet Synchronous",

//       maxPower: 523,
//       maxPowerUnit: "bhp",

//       maxTorque: 690,
//       torque: 690,
//       torqueNm: 690,
//       torqueUnit: "Nm",

//       /* ---------------------------------------------------
//          DRIVETRAIN
//       --------------------------------------------------- */

//       transmission: "Automatic",
//       transmissionType: "Automatic",

//       gearbox: "Single Speed",

//       driveType: "AWD",
//       drivetrain: "AWD",

//       motorCount: 2,

//       /* ---------------------------------------------------
//          CHARGING
//       --------------------------------------------------- */

//       chargingPort: "CCS-II",

//       dcChargingTime: "24 minutes",
//       dcChargingFrom: "10%",
//       dcChargingTo: "80%",
//       dcChargingPowerKw: 230,

//       acChargingPowerKw: 11,

//       /* ---------------------------------------------------
//          PERFORMANCE
//       --------------------------------------------------- */

//       zeroToHundred: 4.5,
//       zeroToHundredUnit: "seconds",

//       /* ---------------------------------------------------
//          SEATING
//       --------------------------------------------------- */

//       seats: 5,
//       seatingCapacity: 5,

//       /* ---------------------------------------------------
//          DIMENSIONS
//       --------------------------------------------------- */

//       length: 4830,
//       lengthMm: 4830,

//       width: 1925,
//       widthMm: 1925,

//       height: 1620,
//       heightMm: 1620,

//       wheelbase: 2930,
//       wheelbaseMm: 2930,

//       groundClearance: 163,
//       groundClearanceMm: 163,

//       bootSpace: 500,
//       bootCapacity: 500,
//       bootCapacityLitres: 500,

//       frunkCapacity: 58,
//       frunkCapacityLitres: 58,

//       kerbWeight: 2340,
//       grossWeight: 2750,

//       /* ---------------------------------------------------
//          CLASSIFICATION
//       --------------------------------------------------- */

//       bodyType: "SUV",
//       fuelType: "Electric",

//       /* ---------------------------------------------------
//          PRICE
//       --------------------------------------------------- */

//       priceMin: 4190000,
//       priceMax: 5590000,

//       currency: "INR",
//       currencyCode: "INR",
//       currencySymbol: "₹",

//       /* ---------------------------------------------------
//          RATING
//       --------------------------------------------------- */

//       rating: 4.7,
//       reviewCount: 10,

//       /* ---------------------------------------------------
//          IMAGE
//       --------------------------------------------------- */

//       image: IMAGE_URL,
//       imageUrl: IMAGE_URL,
//     };

//     await client.query(
//       `
//       INSERT INTO vehicles (
//         id,
//         name,
//         slug,
//         brand_id,
//         generation_id,
//         markets,
//         classification,
//         status,
//         page,
//         extracted,
//         verification,
//         metadata,
//         rating,
//         review_count,
//         payload,
//         created_at,
//         updated_at
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5,
//         $6,
//         $7::jsonb,
//         $8::jsonb,
//         $9::jsonb,
//         $10::jsonb,
//         $11::jsonb,
//         $12::jsonb,
//         $13,
//         $14,
//         $15::jsonb,
//         $16,
//         $16
//       )
//       `,
//       [
//         VEHICLE_ID,

//         "BYD Sealion 7",

//         "byd-sealion-7",

//         BRAND_ID,

//         null,

//         ["india"],

//         JSON.stringify({
//           bodyType: "SUV",
//           fuelType: "Electric",
//           seatingCapacity: 5,
//         }),

//         JSON.stringify({
//           status: "active",
//           launched: true,
//           available: true,
//         }),

//         JSON.stringify({
//           title: "BYD Sealion 7",
//           slug: "byd-sealion-7",
//           description:
//             "BYD Sealion 7 electric SUV with a large Blade Battery, all-wheel-drive powertrain and advanced safety technology.",
//         }),

//         JSON.stringify({
//           ...vehiclePayload,
//           specs: {
//             battery: 82.56,
//             range: 542,
//             power: 390,
//             torque: 690,
//           },
//         }),

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//           verified: true,
//         }),

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//           market: "India",
//           image: IMAGE_URL,
//           imageUrl: IMAGE_URL,
//         }),

//         4.7,

//         10,

//         JSON.stringify(vehiclePayload),

//         now,
//       ]
//     );

//     console.log("   ✅ Vehicle inserted");

//     /* =====================================================
//        5. VARIANTS + PRICING
//     ===================================================== */

//     console.log("\n📦 Inserting variants...");

//     for (const variant of variants) {
//       await client.query(
//         `
//         INSERT INTO variants (
//           id,
//           vehicle_id,
//           name,
//           slug,
//           payload,
//           created_at,
//           updated_at
//         )
//         VALUES (
//           $1,
//           $2,
//           $3,
//           $4,
//           $5::jsonb,
//           $6,
//           $6
//         )
//         `,
//         [
//           variant.id,

//           VEHICLE_ID,

//           variant.name,

//           variant.id,

//           JSON.stringify({
//             name: variant.name,
//             transmission: "Automatic",
//             transmissionType: "Automatic",
//             driveType: "AWD",
//             drivetrain: "AWD",
//             fuelType: "Electric",
//             features: variant.features,
//           }),

//           now,
//         ]
//       );

//       await client.query(
//         `
//         INSERT INTO pricing (
//           id,
//           variant_id,
//           market_id,
//           amount,
//           currency_code,
//           currency_symbol,
//           payload,
//           created_at,
//           updated_at
//         )
//         VALUES (
//           $1,
//           $2,
//           $3,
//           $4,
//           $5,
//           $6,
//           $7::jsonb,
//           $8,
//           $8
//         )
//         `,
//         [
//           `pricing-${variant.id}-india`,

//           variant.id,

//           MARKET_ID,

//           variant.price,

//           "INR",

//           "₹",

//           JSON.stringify({
//             price: variant.price,
//             amount: variant.price,
//             currency: "INR",
//             currencyCode: "INR",
//             currencySymbol: "₹",
//             market: "India",
//             source: SOURCE,
//             sourceUrl: SOURCE_URL,
//           }),

//           now,
//         ]
//       );

//       console.log(
//         `   ✅ ${variant.name} → ₹${variant.price.toLocaleString(
//           "en-IN"
//         )}`
//       );
//     }

//     /* =====================================================
//        6. SPECIFICATIONS
//     ===================================================== */

//     console.log("\n⚙️ Inserting specifications...");

//     /* -----------------------------------------------------
//        BATTERY
//     ----------------------------------------------------- */

//     const batteryData = {
//       batteryCapacity: 82.56,
//       batteryCapacityKwh: 82.56,
//       batteryKwh: 82.56,
//       batteryCapacityUnit: "kWh",

//       batteryType: "Blade Battery",

//       range: 542,
//       rangeKm: 542,
//       rangeUnit: "km",

//       chargingPort: "CCS-II",

//       charging: {
//         dcChargingTime: "24 minutes",
//         dcChargingFrom: "10%",
//         dcChargingTo: "80%",
//         dcChargingPowerKw: 230,
//         acChargingPowerKw: 11,
//         chargingOptions: [7.2, 11, 150],
//       },
//     };

//     /* -----------------------------------------------------
//        PERFORMANCE
//     ----------------------------------------------------- */

//     const performanceData = {
//       motorPower: 390,
//       motorPowerKw: 390,
//       powerKw: 390,
//       powerUnit: "kW",

//       motorType: "Permanent Magnet Synchronous",

//       maxPower: 523,
//       maxPowerUnit: "bhp",

//       maxTorque: 690,
//       torque: 690,
//       torqueNm: 690,
//       torqueUnit: "Nm",

//       transmission: "Automatic",
//       transmissionType: "Automatic",

//       gearbox: "Single Speed",

//       driveType: "AWD",
//       drivetrain: "AWD",

//       motorCount: 2,

//       zeroToHundred: 4.5,
//       zeroToHundredUnit: "seconds",

//       suspensionSteeringBrakes: {
//         frontSuspension: "Double Wishbone",
//         rearSuspension: "Multi-link",

//         shockAbsorbers: "FSD",

//         steeringType: "Electric",

//         turningRadius: 5.85,
//         turningRadiusUnit: "m",

//         frontBrakeType: "Ventilated Disc",
//         rearBrakeType: "Ventilated Disc",
//       },
//     };

//     /* -----------------------------------------------------
//        DIMENSIONS
//     ----------------------------------------------------- */

//     const dimensionsData = {
//       length: 4830,
//       lengthMm: 4830,

//       width: 1925,
//       widthMm: 1925,

//       height: 1620,
//       heightMm: 1620,

//       wheelbase: 2930,
//       wheelbaseMm: 2930,

//       bootSpace: 500,
//       bootCapacity: 500,
//       bootCapacityLitres: 500,

//       frunkCapacity: 58,
//       frunkCapacityLitres: 58,

//       seatingCapacity: 5,
//       seats: 5,

//       groundClearance: 163,
//       groundClearanceMm: 163,

//       kerbWeight: 2340,
//       grossWeight: 2750,

//       exterior: {
//         rearFogLights: true,
//         orvm: "Heated, Powered and Folding",

//         tyreSize: "245/45 R20",
//         tyreType: "Radial Tubeless",

//         wheelSize: 20,
//         wheelSizeUnit: "inch",

//         ledDRLs: true,
//         ledHeadlamps: true,
//         ledTaillights: true,

//         additionalFeatures: [
//           "Frunk volume 58 litres",
//           "Panoramic Glass Roof",
//           "Powered Tailgate",
//         ],
//       },
//     };

//     /* -----------------------------------------------------
//        SAFETY
//     ----------------------------------------------------- */

//     const safetyData = {
//       airbags: 11,

//       abs: true,
//       brakeAssist: true,
//       ebd: true,
//       tpms: true,
//       esc: true,

//       rearCamera: true,
//       rearCameraGuidelines: true,

//       isofix: true,

//       euroNcapRating: 5,

//       adas: {
//         automaticEmergencyBraking: true,
//         trafficSignRecognition: true,
//         laneDepartureWarning: true,
//         laneKeepAssist: true,
//         adaptiveCruiseControl: true,
//         autonomousParking: true,
//       },
//     };

//     /* -----------------------------------------------------
//        FEATURES
//     ----------------------------------------------------- */

//     const featuresData = {
//       comfortConvenience: {
//         bootOpening: "Hands-Free",

//         adjustableSteering: "Height and Reach",

//         ventilatedSeats: "Front",

//         heatedSeats: "Front",

//         electricAdjustableSeats: "Front",

//         automaticClimateControl: true,

//         rearACVents: true,

//         cruiseControl: true,

//         parkingSensors: "Front and Rear",

//         foldableRearSeat: "60:40 Split",

//         powerWindows: "Front and Rear",

//         soundproofGlass: "Double-Glazed",

//         frontParkingSensors: true,
//         rearParkingSensors: true,
//       },

//       interior: {
//         metalDoorSill: true,

//         digitalCluster: true,
//         digitalClusterSize: "10.25 inch",

//         upholstery: "Leather",
//       },

//       entertainmentCommunication: {
//         touchscreenSize: "15.6 inch",

//         androidAuto: true,
//         appleCarPlay: true,

//         speakers: 12,

//         speakersPosition: "Front and Rear",
//       },
//     };

//     /* -----------------------------------------------------
//        INSERT SPECIFICATION
//     ----------------------------------------------------- */

//     async function insertSpecification(type, data) {
//       await client.query(
//         `
//         INSERT INTO specifications (
//           id,
//           vehicle_id,
//           type,
//           data,
//           payload
//         )
//         VALUES (
//           $1,
//           $2,
//           $3,
//           $4::jsonb,
//           $5::jsonb
//         )
//         `,
//         [
//           `spec-${VEHICLE_ID}-${type}`,

//           VEHICLE_ID,

//           type,

//           JSON.stringify(data),

//           JSON.stringify({
//             source: SOURCE,
//             sourceUrl: SOURCE_URL,
//             type,
//           }),
//         ]
//       );

//       console.log(`   ✅ ${type} specification inserted`);
//     }

//     await insertSpecification("battery", batteryData);

//     await insertSpecification("performance", performanceData);

//     await insertSpecification("dimensions", dimensionsData);

//     await insertSpecification("safety", safetyData);

//     await insertSpecification("features", featuresData);

//     /* =====================================================
//        7. CHARGING
//     ===================================================== */

//     console.log("\n🔋 Inserting charging data...");

//     await client.query(
//       `
//       INSERT INTO charging (
//         id,
//         vehicle_id,
//         data,
//         payload
//       )
//       VALUES (
//         $1,
//         $2,
//         $3::jsonb,
//         $4::jsonb
//       )
//       `,
//       [
//         `charging-${VEHICLE_ID}`,

//         VEHICLE_ID,

//         JSON.stringify({
//           chargingPort: "CCS-II",

//           chargingTime: "24 minutes from 10% to 80%",

//           dcChargingFrom: "10%",
//           dcChargingTo: "80%",

//           dcPowerKw: 230,

//           acPowerKw: 11,

//           chargingOptions: [7.2, 11, 150],

//           fastCharging: true,
//         }),

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//         }),
//       ]
//     );

//     console.log("   ✅ Charging data inserted");

//     /* =====================================================
//        8. MEDIA
//     ===================================================== */

//     console.log("\n🖼️ Inserting media...");

//     await client.query(
//       `
//       INSERT INTO media (
//         id,
//         vehicle_id,
//         type,
//         url,
//         alt,
//         payload
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5,
//         $6::jsonb
//       )
//       `,
//       [
//         `media-${VEHICLE_ID}-main`,

//         VEHICLE_ID,

//         "image",

//         IMAGE_URL,

//         "BYD Sealion 7 front left side",

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//           role: "primary",
//         }),
//       ]
//     );

//     console.log("   ✅ Main image inserted");

//     /* =====================================================
//        9. VERIFY BEFORE COMMIT
//     ===================================================== */

//     console.log("\n🔎 Verifying inserted BYD Sealion 7 data...");

//     const vehicleCheck = await client.query(
//       `
//       SELECT
//         id,
//         name,
//         slug,
//         brand_id,
//         rating,
//         review_count,
//         payload
//       FROM vehicles
//       WHERE id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     const variantCheck = await client.query(
//       `
//       SELECT COUNT(*)::int AS count
//       FROM variants
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     const specificationCheck = await client.query(
//       `
//       SELECT
//         type,
//         data
//       FROM specifications
//       WHERE vehicle_id = $1
//       ORDER BY type
//       `,
//       [VEHICLE_ID]
//     );

//     const chargingCheck = await client.query(
//       `
//       SELECT
//         id,
//         data
//       FROM charging
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     const mediaCheck = await client.query(
//       `
//       SELECT
//         id,
//         type,
//         url
//       FROM media
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     if (!vehicleCheck.rows.length) {
//       throw new Error(
//         "Verification failed: vehicle was not inserted."
//       );
//     }

//     if (
//       Number(
//         variantCheck.rows[0]?.count || 0
//       ) !== variants.length
//     ) {
//       throw new Error(
//         `Verification failed: expected ${variants.length} variants.`
//       );
//     }

//     const specificationTypes =
//       specificationCheck.rows.map(
//         (row) => row.type
//       );

//     const expectedTypes = [
//       "battery",
//       "performance",
//       "dimensions",
//       "safety",
//       "features",
//     ];

//     for (const type of expectedTypes) {
//       if (!specificationTypes.includes(type)) {
//         throw new Error(
//           `Verification failed: missing ${type} specification.`
//         );
//       }
//     }

//     if (!chargingCheck.rows.length) {
//       throw new Error(
//         "Verification failed: charging data missing."
//       );
//     }

//     if (!mediaCheck.rows.length) {
//       throw new Error(
//         "Verification failed: media data missing."
//       );
//     }

//     const insertedPayload =
//       vehicleCheck.rows[0].payload;

//     console.log(
//       "\n   Vehicle:",
//       vehicleCheck.rows[0].name
//     );

//     console.log(
//       "   Battery:",
//       insertedPayload.batteryCapacity,
//       "kWh"
//     );

//     console.log(
//       "   Range:",
//       insertedPayload.range,
//       "km"
//     );

//     console.log(
//       "   Power:",
//       insertedPayload.motorPower,
//       "kW"
//     );

//     console.log(
//       "   Torque:",
//       insertedPayload.maxTorque,
//       "Nm"
//     );

//     console.log(
//       "   Variants:",
//       variantCheck.rows[0].count
//     );

//     console.log(
//       "   Specifications:",
//       specificationTypes.join(", ")
//     );

//     console.log(
//       "   Charging:",
//       chargingCheck.rows.length
//     );

//     console.log(
//       "   Media:",
//       mediaCheck.rows.length
//     );

//     /* =====================================================
//        10. COMMIT
//     ===================================================== */

//     await client.query("COMMIT");

//     console.log(
//       "\n================================================="
//     );

//     console.log(
//       "🎉 BYD SEALION 7 INSERT COMPLETED"
//     );

//     console.log(
//       "================================================="
//     );

//     console.log(
//       "Vehicle        : BYD Sealion 7"
//     );

//     console.log(
//       "Variants       :",
//       variants.length
//     );

//     console.log(
//       "Specifications : 5"
//     );

//     console.log(
//       "Charging       : 1"
//     );

//     console.log(
//       "Media          : 1"
//     );

//     console.log(
//       "Battery        : 82.56 kWh"
//     );

//     console.log(
//       "Range          : 542 km"
//     );

//     console.log(
//       "Motor Power    : 390 kW"
//     );

//     console.log(
//       "Torque         : 690 Nm"
//     );

//     console.log(
//       "Price range    : ₹41.90L - ₹55.90L"
//     );

//     console.log(
//       "Rating         : 4.7 / 5"
//     );

//     console.log(
//       "Reviews        : 10"
//     );

//     console.log(
//       "\nSpecification types:"
//     );

//     console.log(
//       "   ✅ battery"
//     );

//     console.log(
//       "   ✅ performance"
//     );

//     console.log(
//       "   ✅ dimensions"
//     );

//     console.log(
//       "   ✅ safety"
//     );

//     console.log(
//       "   ✅ features"
//     );

//     console.log(
//       "\n✅ Database transaction committed."
//     );
//   } catch (error) {
//     await client.query("ROLLBACK");

//     console.error(
//       "\n❌ INSERT FAILED"
//     );

//     console.error(
//       "Transaction rolled back."
//     );

//     console.error(error);

//     console.error(
//       "\n⚠️ No partial BYD Sealion 7 data was saved."
//     );

//     process.exitCode = 1;
//   } finally {
//     client.release();
//     await pool.end();
//   }
// }

// main();


// scripts/add-byd-sealion-6.mjs

// import dotenv from "dotenv";
// import pg from "pg";

// dotenv.config({
//   path: ".env.local",
// });

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// /* =========================================================
//    CONSTANTS
// ========================================================= */

// const now = new Date();

// const VEHICLE_ID = "byd-sealion-6";
// const BRAND_ID = "byd";
// const MARKET_ID = "india";

// const IMAGE_URL =
//   "https://stimg.cardekho.com/images/carexteriorimages/630x420/BYD/Sealion-6/12371/1770363315968/front-left-side-47.jpg?tr=w-230";

// const SOURCE = "CarDekho";

// const SOURCE_URL = "https://www.cardekho.com/byd/sealion-6";

// /* =========================================================
//    VARIANTS
// ========================================================= */

// const variants = [
//   {
//     id: "byd-sealion-6-awd",
//     name: "BYD Sealion 6 AWD",
//     price: null,
//     seatingCapacity: 5,
//     features: [
//       "Electric Powertrain",
//       "Automatic Transmission",
//       "All Wheel Drive",
//       "179 kmph Top Speed",
//       "5.9 Seconds 0-100 kmph",
//       "MacPherson Strut Front Suspension",
//       "Multi-Link Rear Suspension",
//       "235/50 R19 Tyres",
//       "Tubeless Radial Tyres",
//       "5-Seater SUV",
//     ],
//   },
// ];

// /* =========================================================
//    MAIN
// ========================================================= */

// async function main() {
//   const client = await pool.connect();

//   try {
//     console.log("=================================================");
//     console.log("🚗 EVINSIGHTS - ADD BYD SEALION 6");
//     console.log("=================================================\n");

//     await client.query("BEGIN");

//     /* =====================================================
//        1. BRAND
//     ===================================================== */

//     console.log("🏷️ Upserting BYD brand...");

//     await client.query(
//       `
//       INSERT INTO brands (
//         id,
//         name,
//         slug,
//         country,
//         logo,
//         payload,
//         created_at,
//         updated_at
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5,
//         $6::jsonb,
//         $7,
//         $7
//       )
//       ON CONFLICT (id)
//       DO UPDATE SET
//         name = EXCLUDED.name,
//         slug = EXCLUDED.slug,
//         country = EXCLUDED.country,
//         logo = EXCLUDED.logo,
//         payload = EXCLUDED.payload,
//         updated_at = EXCLUDED.updated_at
//       `,
//       [
//         BRAND_ID,
//         "BYD",
//         "byd",
//         "China",
//         null,
//         JSON.stringify({
//           name: "BYD",
//           slug: "byd",
//           country: "China",
//         }),
//         now,
//       ]
//     );

//     console.log("   ✅ BYD brand ready");

//     /* =====================================================
//        2. MARKET
//     ===================================================== */

//     console.log("🌍 Upserting India market...");

//     await client.query(
//       `
//       INSERT INTO markets (
//         id,
//         name,
//         currency_code,
//         payload
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4::jsonb
//       )
//       ON CONFLICT (id)
//       DO UPDATE SET
//         name = EXCLUDED.name,
//         currency_code = EXCLUDED.currency_code,
//         payload = EXCLUDED.payload
//       `,
//       [
//         MARKET_ID,
//         "India",
//         "INR",
//         JSON.stringify({
//           country: "India",
//           currency: "INR",
//         }),
//       ]
//     );

//     console.log("   ✅ India market ready");

//     /* =====================================================
//        3. CLEAN OLD BYD SEALION 6 DATA
//     ===================================================== */

//     console.log("\n🧹 Cleaning existing BYD Sealion 6 records...");

//     await client.query(
//       `
//       DELETE FROM pricing
//       WHERE variant_id IN (
//         SELECT id
//         FROM variants
//         WHERE vehicle_id = $1
//       )
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM variants
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM specifications
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM charging
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM media
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     await client.query(
//       `
//       DELETE FROM vehicles
//       WHERE id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     console.log("   ✅ Existing BYD Sealion 6 data cleaned");

//     /* =====================================================
//        4. VEHICLE DATA
//     ===================================================== */

//     console.log("\n🚗 Inserting BYD Sealion 6...");

//     const vehiclePayload = {
//       name: "BYD Sealion 6",
//       model: "Sealion 6",
//       brand: "BYD",
//       brandId: BRAND_ID,

//       source: SOURCE,
//       sourceUrl: SOURCE_URL,

//       batteryCapacity: null,
//       batteryCapacityKwh: null,
//       batteryKwh: null,
//       batteryCapacityUnit: "kWh",
//       batteryType: null,

//       range: null,
//       rangeKm: null,
//       araiRange: null,
//       wltpRange: null,
//       rangeUnit: "km",

//       motorPower: null,
//       motorPowerKw: null,
//       powerKw: null,
//       power: null,
//       powerUnit: "kW",

//       motorType: "Electric Motor",

//       maxPower: null,
//       maxPowerUnit: "bhp",

//       maxTorque: null,
//       torque: null,
//       torqueNm: null,
//       torqueUnit: "Nm",

//       motorCount: null,

//       transmission: "Automatic",
//       transmissionType: "Automatic",
//       gearbox: null,

//       driveType: "AWD",
//       drivetrain: "AWD",

//       chargingPort: null,

//       acChargingTime: null,
//       acChargingPowerKw: null,

//       dcChargingTime: null,
//       dcChargingFrom: null,
//       dcChargingTo: null,
//       dcChargingPowerKw: null,

//       zeroToHundred: 5.9,
//       zeroToHundredUnit: "seconds",

//       topSpeed: 179,
//       topSpeedUnit: "kmph",

//       seats: 5,
//       seatingCapacity: 5,

//       length: 4775,
//       lengthMm: 4775,

//       width: 1890,
//       widthMm: 1890,

//       height: 1670,
//       heightMm: 1670,

//       wheelbase: 2765,
//       wheelbaseMm: 2765,

//       bootSpace: 425,
//       bootCapacity: 425,
//       bootCapacityLitres: 425,

//       bootSpaceRearSeatFolding: null,
//       bootSpaceRearSeatFoldingLitres: null,

//       groundClearance: null,
//       groundClearanceMm: null,

//       kerbWeight: 2100,
//       grossWeight: 2510,

//       frontTread: 1630,
//       frontTreadMm: 1630,

//       rearTread: 1630,
//       rearTreadMm: 1630,

//       turningRadius: 6,
//       turningRadiusMetres: 6,

//       bodyType: "SUV",
//       fuelType: "Electric",
//       emissionNorm: "ZEV",

//       priceMin: null,
//       priceMax: null,

//       currency: "INR",
//       currencyCode: "INR",
//       currencySymbol: "₹",

//       rating: null,
//       reviewCount: 1,

//       image: IMAGE_URL,
//       imageUrl: IMAGE_URL,
//     };

//     await client.query(
//       `
//       INSERT INTO vehicles (
//         id,
//         name,
//         slug,
//         brand_id,
//         generation_id,
//         markets,
//         classification,
//         status,
//         page,
//         extracted,
//         verification,
//         metadata,
//         rating,
//         review_count,
//         payload,
//         created_at,
//         updated_at
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5,
//         $6,
//         $7::jsonb,
//         $8::jsonb,
//         $9::jsonb,
//         $10::jsonb,
//         $11::jsonb,
//         $12::jsonb,
//         $13,
//         $14,
//         $15::jsonb,
//         $16,
//         $16
//       )
//       ON CONFLICT (id)
//       DO UPDATE SET
//         name = EXCLUDED.name,
//         slug = EXCLUDED.slug,
//         brand_id = EXCLUDED.brand_id,
//         markets = EXCLUDED.markets,
//         classification = EXCLUDED.classification,
//         status = EXCLUDED.status,
//         page = EXCLUDED.page,
//         extracted = EXCLUDED.extracted,
//         verification = EXCLUDED.verification,
//         metadata = EXCLUDED.metadata,
//         rating = EXCLUDED.rating,
//         review_count = EXCLUDED.review_count,
//         payload = EXCLUDED.payload,
//         updated_at = EXCLUDED.updated_at
//       `,
//       [
//         VEHICLE_ID,
//         "BYD Sealion 6",
//         "byd-sealion-6",
//         BRAND_ID,
//         null,
//         ["india"],

//         JSON.stringify({
//           bodyType: "SUV",
//           fuelType: "Electric",
//           seatingCapacity: 5,
//           driveType: "AWD",
//           transmission: "Automatic",
//         }),

//         JSON.stringify({
//           status: "pre-launch",
//           launched: false,
//           available: false,
//           priceStatus: "Price To Be Announced",
//         }),

//         JSON.stringify({
//           title: "BYD Sealion 6",
//           slug: "byd-sealion-6",
//           description:
//             "BYD Sealion 6 electric SUV with automatic transmission, all-wheel drive, 5-seat capacity, 179 kmph top speed and 5.9 seconds 0-100 kmph acceleration.",
//         }),

//         JSON.stringify({
//           ...vehiclePayload,
//           specs: {
//             length: 4775,
//             width: 1890,
//             height: 1670,
//             wheelbase: 2765,
//             bootSpace: 425,
//             seatingCapacity: 5,
//             topSpeed: 179,
//             acceleration0To100: 5.9,
//             kerbWeight: 2100,
//             grossWeight: 2510,
//           },
//         }),

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//           verified: true,
//         }),

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//           market: "India",
//           image: IMAGE_URL,
//           imageUrl: IMAGE_URL,
//           price: "Price To Be Announced",
//         }),

//         null,
//         1,
//         JSON.stringify(vehiclePayload),
//         now,
//       ]
//     );

//     console.log("   ✅ BYD Sealion 6 vehicle inserted");

//     /* =====================================================
//        5. VARIANTS AND PRICING
//     ===================================================== */

//     console.log("\n📦 Inserting variants...");

//     for (const variant of variants) {
//       await client.query(
//         `
//         INSERT INTO variants (
//           id,
//           vehicle_id,
//           name,
//           slug,
//           payload,
//           created_at,
//           updated_at
//         )
//         VALUES (
//           $1,
//           $2,
//           $3,
//           $4,
//           $5::jsonb,
//           $6,
//           $6
//         )
//         ON CONFLICT (id)
//         DO UPDATE SET
//           vehicle_id = EXCLUDED.vehicle_id,
//           name = EXCLUDED.name,
//           slug = EXCLUDED.slug,
//           payload = EXCLUDED.payload,
//           updated_at = EXCLUDED.updated_at
//         `,
//         [
//           variant.id,
//           VEHICLE_ID,
//           variant.name,
//           variant.id,

//           JSON.stringify({
//             name: variant.name,
//             seatingCapacity: variant.seatingCapacity,
//             transmission: "Automatic",
//             transmissionType: "Automatic",
//             driveType: "AWD",
//             drivetrain: "AWD",
//             fuelType: "Electric",
//             price: null,
//             priceLabel: "Price To Be Announced",
//             features: variant.features,
//           }),

//           now,
//         ]
//       );

//       await client.query(
//         `
//         INSERT INTO pricing (
//           id,
//           variant_id,
//           market_id,
//           amount,
//           currency_code,
//           currency_symbol,
//           payload,
//           created_at,
//           updated_at
//         )
//         VALUES (
//           $1,
//           $2,
//           $3,
//           $4,
//           $5,
//           $6,
//           $7::jsonb,
//           $8,
//           $8
//         )
//         ON CONFLICT (id)
//         DO UPDATE SET
//           variant_id = EXCLUDED.variant_id,
//           market_id = EXCLUDED.market_id,
//           amount = EXCLUDED.amount,
//           currency_code = EXCLUDED.currency_code,
//           currency_symbol = EXCLUDED.currency_symbol,
//           payload = EXCLUDED.payload,
//           updated_at = EXCLUDED.updated_at
//         `,
//         [
//           `pricing-${variant.id}-india`,
//           variant.id,
//           MARKET_ID,
//           null,
//           "INR",
//           "₹",

//           JSON.stringify({
//             price: null,
//             amount: null,
//             priceLabel: "Price To Be Announced",
//             currency: "INR",
//             currencyCode: "INR",
//             currencySymbol: "₹",
//             market: "India",
//             source: SOURCE,
//             sourceUrl: SOURCE_URL,
//           }),

//           now,
//         ]
//       );

//       console.log(`   ✅ ${variant.name} → Price To Be Announced`);
//     }

//     /* =====================================================
//        6. SPECIFICATIONS
//     ===================================================== */

//     console.log("\n⚙️ Inserting specifications...");

//     const batteryData = {
//       batteryCapacity: null,
//       batteryCapacityKwh: null,
//       batteryKwh: null,
//       batteryCapacityUnit: "kWh",

//       batteryType: null,

//       range: null,
//       rangeKm: null,
//       rangeUnit: "km",

//       chargingPort: null,

//       charging: {
//         fastCharging: null,
//         acChargingTime: null,
//         acChargingPowerKw: null,
//         dcChargingTime: null,
//         dcChargingPowerKw: null,
//       },
//     };

//     const performanceData = {
//       motorPower: null,
//       motorPowerKw: null,
//       powerKw: null,
//       powerUnit: "kW",

//       motorType: "Electric Motor",

//       maxPower: null,
//       maxPowerUnit: "bhp",

//       maxTorque: null,
//       torque: null,
//       torqueNm: null,
//       torqueUnit: "Nm",

//       motorCount: null,

//       transmission: "Automatic",
//       transmissionType: "Automatic",

//       gearbox: null,

//       driveType: "AWD",
//       drivetrain: "AWD",

//       topSpeed: 179,
//       topSpeedUnit: "kmph",

//       zeroToHundred: 5.9,
//       zeroToHundredUnit: "seconds",

//       regenerativeBraking: null,

//       suspensionSteeringBrakes: {
//         frontSuspension: "MacPherson Strut suspension",
//         rearSuspension: "Multi-link suspension",

//         steeringType: null,

//         frontBrakeType: null,
//         rearBrakeType: null,

//         turningRadius: 6,
//         turningRadiusUnit: "metres",
//       },
//     };

//     const dimensionsData = {
//       length: 4775,
//       lengthMm: 4775,

//       width: 1890,
//       widthMm: 1890,

//       height: 1670,
//       heightMm: 1670,

//       wheelbase: 2765,
//       wheelbaseMm: 2765,

//       frontTread: 1630,
//       frontTreadMm: 1630,

//       rearTread: 1630,
//       rearTreadMm: 1630,

//       bootSpace: 425,
//       bootCapacity: 425,
//       bootCapacityLitres: 425,

//       bootSpaceRearSeatFolding: null,
//       bootSpaceRearSeatFoldingLitres: null,

//       groundClearance: null,
//       groundClearanceMm: null,

//       seatingCapacity: 5,
//       seats: 5,

//       kerbWeight: 2100,
//       grossWeight: 2510,
//     };

//     const safetyData = {
//       airbags: null,

//       abs: null,
//       ebd: null,
//       tractionControl: null,
//       esc: null,
//       tpms: null,

//       isofix: null,
//       hillAssist: null,
//       hillDescentControl: null,

//       rearCamera: null,
//       camera360: null,

//       antiPinchPowerWindows: null,

//       adas: {
//         forwardCollisionWarning: null,
//         automaticEmergencyBraking: null,
//         trafficSignRecognition: null,
//         blindSpotCollisionAvoidanceAssist: null,
//         laneDepartureWarning: null,
//         laneKeepAssist: null,
//         laneDeparturePreventionAssist: null,
//         driverAttentionWarning: null,
//         adaptiveCruiseControl: null,
//         adaptiveHighBeamAssist: null,
//         rearCrossTrafficAlert: null,
//         rearCrossTrafficCollisionAvoidance: null,
//         blindSpotMonitor: null,
//       },
//     };

//     const featuresData = {
//       comfortConvenience: {
//         bootOpening: null,
//         electricAdjustableSeats: null,
//         automaticClimateControl: null,
//         rearACVents: null,
//         cruiseControl: null,
//         parkingSensors: null,
//         foldableRearSeat: null,
//         usbCharger: null,
//         keylessEntry: null,
//         engineStartStopButton: null,
//         powerSteering: null,
//         powerWindows: null,
//         airQualityControl: null,
//         rearSeatHeadrest: null,
//         adjustableHeadrest: null,
//         centralConsoleArmrest: null,
//         followMeHomeHeadlamps: null,
//       },

//       interior: {
//         digitalCluster: null,
//         digitalClusterSize: null,
//         upholstery: null,
//         gloveBox: null,
//       },

//       exterior: {
//         panoramicSunroof: null,
//         outsideRearViewMirror: null,
//         antenna: null,
//         tyreSize: "235/50 R19",
//         tyreType: "Tubeless, Radial",
//         ledDRLs: null,
//         ledHeadlamps: null,
//         ledTaillights: null,
//         alloyWheels: null,
//       },

//       entertainmentCommunication: {
//         touchscreen: null,
//         touchscreenSize: null,
//         androidAuto: null,
//         appleCarPlay: null,
//         speakers: null,
//         speakersPosition: null,
//         wirelessPhoneCharging: null,
//         bluetoothConnectivity: null,
//         usbPorts: null,
//       },

//       advancedInternetFeatures: {
//         remoteBootOpen: null,
//       },
//     };

//     async function insertSpecification(type, data) {
//       await client.query(
//         `
//         INSERT INTO specifications (
//           id,
//           vehicle_id,
//           type,
//           data,
//           payload
//         )
//         VALUES (
//           $1,
//           $2,
//           $3,
//           $4::jsonb,
//           $5::jsonb
//         )
//         ON CONFLICT (id)
//         DO UPDATE SET
//           vehicle_id = EXCLUDED.vehicle_id,
//           type = EXCLUDED.type,
//           data = EXCLUDED.data,
//           payload = EXCLUDED.payload
//         `,
//         [
//           `spec-${VEHICLE_ID}-${type}`,
//           VEHICLE_ID,
//           type,
//           JSON.stringify(data),

//           JSON.stringify({
//             source: SOURCE,
//             sourceUrl: SOURCE_URL,
//             type,
//           }),
//         ]
//       );

//       console.log(`   ✅ ${type} specification inserted`);
//     }

//     await insertSpecification("battery", batteryData);
//     await insertSpecification("performance", performanceData);
//     await insertSpecification("dimensions", dimensionsData);
//     await insertSpecification("safety", safetyData);
//     await insertSpecification("features", featuresData);

//     /* =====================================================
//        7. CHARGING
//     ===================================================== */

//     console.log("\n🔋 Inserting charging data...");

//     await client.query(
//       `
//       INSERT INTO charging (
//         id,
//         vehicle_id,
//         data,
//         payload
//       )
//       VALUES (
//         $1,
//         $2,
//         $3::jsonb,
//         $4::jsonb
//       )
//       ON CONFLICT (id)
//       DO UPDATE SET
//         vehicle_id = EXCLUDED.vehicle_id,
//         data = EXCLUDED.data,
//         payload = EXCLUDED.payload
//       `,
//       [
//         `charging-${VEHICLE_ID}`,
//         VEHICLE_ID,

//         JSON.stringify({
//           chargingPort: null,
//           fastCharging: null,
//           acChargingTime: null,
//           acChargingPowerKw: null,
//           dcChargingTime: null,
//           dcChargingPowerKw: null,
//           chargingInformation: "Not specified by source",
//         }),

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//         }),
//       ]
//     );

//     console.log("   ✅ Charging data inserted");

//     /* =====================================================
//        8. MEDIA
//     ===================================================== */

//     console.log("\n🖼️ Inserting media...");

//     await client.query(
//       `
//       INSERT INTO media (
//         id,
//         vehicle_id,
//         type,
//         url,
//         alt,
//         payload
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5,
//         $6::jsonb
//       )
//       ON CONFLICT (id)
//       DO UPDATE SET
//         vehicle_id = EXCLUDED.vehicle_id,
//         type = EXCLUDED.type,
//         url = EXCLUDED.url,
//         alt = EXCLUDED.alt,
//         payload = EXCLUDED.payload
//       `,
//       [
//         `media-${VEHICLE_ID}-main`,
//         VEHICLE_ID,
//         "image",
//         IMAGE_URL,
//         "BYD Sealion 6 front left side",

//         JSON.stringify({
//           source: SOURCE,
//           sourceUrl: SOURCE_URL,
//           role: "primary",
//         }),
//       ]
//     );

//     console.log("   ✅ Main image inserted");

//     /* =====================================================
//        9. VERIFY
//     ===================================================== */

//     console.log("\n🔎 Verifying inserted BYD Sealion 6 data...");

//     const vehicleCheck = await client.query(
//       `
//       SELECT
//         id,
//         name,
//         slug,
//         brand_id,
//         rating,
//         review_count,
//         payload
//       FROM vehicles
//       WHERE id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     const variantCheck = await client.query(
//       `
//       SELECT COUNT(*)::int AS count
//       FROM variants
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     const specificationCheck = await client.query(
//       `
//       SELECT type, data
//       FROM specifications
//       WHERE vehicle_id = $1
//       ORDER BY type
//       `,
//       [VEHICLE_ID]
//     );

//     const chargingCheck = await client.query(
//       `
//       SELECT id, data
//       FROM charging
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     const mediaCheck = await client.query(
//       `
//       SELECT id, type, url
//       FROM media
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     if (!vehicleCheck.rows.length) {
//       throw new Error(
//         "Verification failed: BYD Sealion 6 was not inserted."
//       );
//     }

//     if (
//       Number(variantCheck.rows[0]?.count || 0) !== variants.length
//     ) {
//       throw new Error(
//         `Verification failed: expected ${variants.length} variants.`
//       );
//     }

//     const specificationTypes = specificationCheck.rows.map(
//       (row) => row.type
//     );

//     const expectedTypes = [
//       "battery",
//       "performance",
//       "dimensions",
//       "safety",
//       "features",
//     ];

//     for (const type of expectedTypes) {
//       if (!specificationTypes.includes(type)) {
//         throw new Error(
//           `Verification failed: missing ${type} specification.`
//         );
//       }
//     }

//     if (!chargingCheck.rows.length) {
//       throw new Error(
//         "Verification failed: charging data missing."
//       );
//     }

//     if (!mediaCheck.rows.length) {
//       throw new Error(
//         "Verification failed: media data missing."
//       );
//     }

//     const insertedPayload = vehicleCheck.rows[0].payload;

//     console.log("\n   Vehicle:", vehicleCheck.rows[0].name);

//     console.log(
//       "   Battery:",
//       insertedPayload.batteryCapacity ?? "Not specified",
//       "kWh"
//     );

//     console.log(
//       "   Range:",
//       insertedPayload.range ?? "Not specified",
//       "km"
//     );

//     console.log(
//       "   Power:",
//       insertedPayload.motorPower ?? "Not specified",
//       "kW"
//     );

//     console.log(
//       "   Max Power:",
//       insertedPayload.maxPower ?? "Not specified",
//       "bhp"
//     );

//     console.log(
//       "   Torque:",
//       insertedPayload.maxTorque ?? "Not specified",
//       "Nm"
//     );

//     console.log(
//       "   Top Speed:",
//       insertedPayload.topSpeed,
//       "kmph"
//     );

//     console.log(
//       "   Acceleration:",
//       insertedPayload.zeroToHundred,
//       "seconds"
//     );

//     console.log(
//       "   Variants:",
//       variantCheck.rows[0].count
//     );

//     console.log(
//       "   Specifications:",
//       specificationTypes.join(", ")
//     );

//     console.log(
//       "   Charging:",
//       chargingCheck.rows.length
//     );

//     console.log(
//       "   Media:",
//       mediaCheck.rows.length
//     );

//     /* =====================================================
//        10. COMMIT
//     ===================================================== */

//     await client.query("COMMIT");

//     console.log("\n=================================================");
//     console.log("🎉 BYD SEALION 6 INSERT COMPLETED");
//     console.log("=================================================");

//     console.log("Vehicle        : BYD Sealion 6");
//     console.log("Variants       :", variants.length);
//     console.log("Specifications : 5");
//     console.log("Charging       : 1");
//     console.log("Media          : 1");
//     console.log("Battery        : Not specified");
//     console.log("Range          : Not specified");
//     console.log("Top Speed      : 179 kmph");
//     console.log("Acceleration   : 5.9 seconds");
//     console.log("Price          : To Be Announced");
//     console.log("Reviews        : 1");

//     console.log("\nSpecification types:");
//     console.log("   ✅ battery");
//     console.log("   ✅ performance");
//     console.log("   ✅ dimensions");
//     console.log("   ✅ safety");
//     console.log("   ✅ features");

//     console.log("\n✅ Database transaction committed.");
//   } catch (error) {
//     await client.query("ROLLBACK");

//     console.error("\n❌ INSERT FAILED");
//     console.error("Transaction rolled back.");
//     console.error(error);

//     console.error(
//       "\n⚠️ No partial BYD Sealion 6 data was saved."
//     );

//     process.exitCode = 1;
//   } finally {
//     client.release();
//     await pool.end();
//   }
// }

// main();


// scripts/add-vinfast-vf7.mjs

import dotenv from "dotenv";
import pg from "pg";

dotenv.config({
  path: ".env.local",
});

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/* =========================================================
   CONSTANTS
========================================================= */

const now = new Date();

const VEHICLE_ID = "vinfast-vf7";
const BRAND_ID = "vinfast";
const MARKET_ID = "india";

const IMAGE_URL =
  "https://stimg.cardekho.com/images/carexteriorimages/630x420/VinFast/VF7/12938/1768890477947/front-left-side-47.jpg?tr=w-230";

const SOURCE = "CarDekho";

const SOURCE_URL = "https://www.cardekho.com/vinfast/vf7";

/* =========================================================
   VARIANTS
========================================================= */

const variants = [
  {
    id: "vinfast-vf7-earth",
    name: "VF7 Earth",
    price: 2299000,
    seatingCapacity: 5,
    features: [
      "12.9-Inch Touchscreen Infotainment",
      "6-Way Power Adjustable Driver's Seat",
      "Ventilated Front Seats",
      "Dual-Zone Climate Control",
      "Head-Up Display",
      "7 Airbags",
      "ESP",
    ],
  },
  {
    id: "vinfast-vf7-wind",
    name: "VF7 Wind",
    price: 2589000,
    seatingCapacity: 5,
    features: [
      "Level-2 ADAS",
      "Wireless Phone Charger",
      "Powered Tailgate",
      "8-Way Power Adjustable Driver's Seat",
      "8-Speaker Sound System",
      "12.9-Inch Touchscreen Infotainment",
      "Ventilated Front Seats",
      "Dual-Zone Climate Control",
      "Head-Up Display",
      "7 Airbags",
      "ESP",
    ],
  },
  {
    id: "vinfast-vf7-wind-infinity",
    name: "VF7 Wind Infinity",
    price: 2639000,
    seatingCapacity: 5,
    features: [
      "Panoramic Glass Roof",
      "Level-2 ADAS",
      "Wireless Phone Charger",
      "Powered Tailgate",
      "8-Way Power Adjustable Driver's Seat",
      "8-Speaker Sound System",
      "12.9-Inch Touchscreen Infotainment",
      "Ventilated Front Seats",
      "Dual-Zone Climate Control",
      "Head-Up Display",
      "7 Airbags",
      "ESP",
    ],
  },
  {
    id: "vinfast-vf7-sky",
    name: "VF7 Sky",
    price: 2749000,
    seatingCapacity: 5,
    features: [
      "Level-2 ADAS",
      "Wireless Phone Charger",
      "Powered Tailgate",
      "8-Way Power Adjustable Driver's Seat",
      "8-Speaker Sound System",
      "12.9-Inch Touchscreen Infotainment",
      "Ventilated Front Seats",
      "Dual-Zone Climate Control",
      "Head-Up Display",
      "7 Airbags",
      "ESP",
    ],
  },
  {
    id: "vinfast-vf7-sky-infinity",
    name: "VF7 Sky Infinity",
    price: 2809000,
    seatingCapacity: 5,
    features: [
      "Panoramic Glass Roof",
      "Level-2 ADAS",
      "Wireless Phone Charger",
      "Powered Tailgate",
      "8-Way Power Adjustable Driver's Seat",
      "8-Speaker Sound System",
      "12.9-Inch Touchscreen Infotainment",
      "Ventilated Front Seats",
      "Dual-Zone Climate Control",
      "Head-Up Display",
      "7 Airbags",
      "ESP",
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
    console.log("🚗 EVINSIGHTS - ADD VINFAST VF7");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. BRAND
    ===================================================== */

    console.log("🏷️ Upserting VinFast brand...");

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
        logo = EXCLUDED.logo,
        payload = EXCLUDED.payload,
        updated_at = EXCLUDED.updated_at
      `,
      [
        BRAND_ID,
        "VinFast",
        "vinfast",
        "Vietnam",
        null,
        JSON.stringify({
          name: "VinFast",
          slug: "vinfast",
          country: "Vietnam",
        }),
        now,
      ],
    );

    console.log("   ✅ VinFast brand ready");

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
      ],
    );

    console.log("   ✅ India market ready");

    /* =====================================================
       3. CLEAN OLD VINFAST VF7 DATA
    ===================================================== */

    console.log("\n🧹 Cleaning existing VinFast VF7 records...");

    await client.query(
      `
      DELETE FROM pricing
      WHERE variant_id IN (
        SELECT id
        FROM variants
        WHERE vehicle_id = $1
      )
      `,
      [VEHICLE_ID],
    );

    await client.query(
      `
      DELETE FROM variants
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID],
    );

    await client.query(
      `
      DELETE FROM specifications
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID],
    );

    await client.query(
      `
      DELETE FROM charging
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID],
    );

    await client.query(
      `
      DELETE FROM media
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID],
    );

    await client.query(
      `
      DELETE FROM vehicles
      WHERE id = $1
      `,
      [VEHICLE_ID],
    );

    console.log("   ✅ Existing VinFast VF7 data cleaned");

    /* =====================================================
       4. VEHICLE DATA
    ===================================================== */

    console.log("\n🚗 Inserting VinFast VF7...");

    const vehiclePayload = {
      name: "VinFast VF7",
      model: "VF7",
      brand: "VinFast",
      brandId: BRAND_ID,

      source: SOURCE,
      sourceUrl: SOURCE_URL,

      batteryCapacity: 70,
      batteryCapacityKwh: 70,
      batteryKwh: 70,
      batteryCapacityUnit: "kWh",
      batteryType: "Lithium-ion",

      range: 510,
      rangeKm: 510,
      araiRange: null,
      wltpRange: null,
      rangeUnit: "km",

      motorPower: 260,
      motorPowerKw: 260,
      powerKw: 260,
      power: 260,
      powerUnit: "kW",

      motorType: "Permanent Magnet Synchronous",

      maxPower: 348.66,
      maxPowerUnit: "bhp",

      maxTorque: 500,
      torque: 500,
      torqueNm: 500,
      torqueUnit: "Nm",

      motorCount: 1,

      transmission: "Automatic",
      transmissionType: "Automatic",
      gearbox: "Automatic 1 Gear",

      driveType: "AWD",
      drivetrain: "AWD",

      chargingPort: "CCS-II",

      acChargingTime: null,
      acChargingPowerKw: null,

      dcChargingTime: "25 Min (10-70%)",
      dcChargingFrom: 10,
      dcChargingTo: 70,
      dcChargingPowerKw: null,

      zeroToHundred: null,
      zeroToHundredUnit: "seconds",

      topSpeed: null,
      topSpeedUnit: "kmph",

      seats: 5,
      seatingCapacity: 5,

      length: 4550,
      lengthMm: 4550,

      width: 1893,
      widthMm: 1893,

      height: 1596,
      heightMm: 1596,

      wheelbase: 2840,
      wheelbaseMm: 2840,

      bootSpace: 537,
      bootCapacity: 537,
      bootCapacityLitres: 537,

      bootSpaceRearSeatFolding: null,
      bootSpaceRearSeatFoldingLitres: null,

      groundClearance: null,
      groundClearanceMm: null,

      kerbWeight: null,
      grossWeight: null,

      frontTread: null,
      frontTreadMm: null,

      rearTread: null,
      rearTreadMm: null,

      turningRadius: null,
      turningRadiusMetres: null,

      bodyType: "SUV",
      fuelType: "Electric",
      emissionNorm: null,

      priceMin: 2299000,
      priceMax: 2809000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      rating: 4.4,
      reviewCount: 10,

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
        updated_at = EXCLUDED.updated_at
      `,
      [
        VEHICLE_ID,
        "VinFast VF7",
        "vinfast-vf7",
        BRAND_ID,
        null,
        ["india"],

        JSON.stringify({
          bodyType: "SUV",
          fuelType: "Electric",
          seatingCapacity: 5,
          driveType: "AWD",
          transmission: "Automatic",
          motorCount: 1,
        }),

        JSON.stringify({
          status: "available",
          launched: true,
          available: true,
          priceStatus: "announced",
        }),

        JSON.stringify({
          title: "VinFast VF7 Specifications",
          slug: "vinfast-vf7",
          description:
            "VinFast VF7 electric SUV with a 70 kWh battery, 510 km range, automatic transmission, AWD drivetrain and seating capacity for five passengers.",
        }),

        JSON.stringify({
          ...vehiclePayload,
          specs: {
            batteryCapacity: 70,
            range: 510,
            motorPower: 260,
            maxPower: 348.66,
            maxTorque: 500,
            length: 4550,
            width: 1893,
            height: 1596,
            wheelbase: 2840,
            bootSpace: 537,
            seatingCapacity: 5,
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
          price: "Rs. 22.99 - 28.09 Lakh",
          priceMin: 2299000,
          priceMax: 2809000,
        }),

        4.4,
        10,

        JSON.stringify(vehiclePayload),
        now,
      ],
    );

    console.log("   ✅ VinFast VF7 vehicle inserted");

    /* =====================================================
       5. VARIANTS AND PRICING
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
        ON CONFLICT (id)
        DO UPDATE SET
          vehicle_id = EXCLUDED.vehicle_id,
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          payload = EXCLUDED.payload,
          updated_at = EXCLUDED.updated_at
        `,
        [
          variant.id,
          VEHICLE_ID,
          variant.name,
          variant.id,

          JSON.stringify({
            name: variant.name,
            seatingCapacity: variant.seatingCapacity,
            transmission: "Automatic",
            transmissionType: "Automatic",
            driveType: "AWD",
            drivetrain: "AWD",
            fuelType: "Electric",
            batteryCapacity: 70,
            batteryCapacityUnit: "kWh",
            range: 510,
            rangeUnit: "km",
            maxPower: 348.66,
            maxPowerUnit: "bhp",
            maxTorque: 500,
            torqueUnit: "Nm",
            price: variant.price,
            priceLabel: `Rs. ${variant.price.toLocaleString("en-IN")}`,
            features: variant.features,
          }),

          now,
        ],
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
        ON CONFLICT (id)
        DO UPDATE SET
          variant_id = EXCLUDED.variant_id,
          market_id = EXCLUDED.market_id,
          amount = EXCLUDED.amount,
          currency_code = EXCLUDED.currency_code,
          currency_symbol = EXCLUDED.currency_symbol,
          payload = EXCLUDED.payload,
          updated_at = EXCLUDED.updated_at
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
            priceLabel: `Rs. ${variant.price.toLocaleString("en-IN")}`,
            currency: "INR",
            currencyCode: "INR",
            currencySymbol: "₹",
            market: "India",
            source: SOURCE,
            sourceUrl: SOURCE_URL,
          }),

          now,
        ],
      );

      console.log(
        `   ✅ ${variant.name} → ₹${variant.price.toLocaleString("en-IN")}`,
      );
    }

    /* =====================================================
       6. SPECIFICATIONS
    ===================================================== */

    console.log("\n⚙️ Inserting specifications...");

    const batteryData = {
      batteryCapacity: 70,
      batteryCapacityKwh: 70,
      batteryKwh: 70,
      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-ion",

      range: 510,
      rangeKm: 510,
      rangeUnit: "km",

      motorPower: 260,
      motorPowerKw: 260,
      powerKw: 260,
      powerUnit: "kW",

      motorType: "Permanent Magnet Synchronous",

      maxPower: 348.66,
      maxPowerUnit: "bhp",

      maxTorque: 500,
      torque: 500,
      torqueNm: 500,
      torqueUnit: "Nm",

      chargingPort: "CCS-II",

      charging: {
        fastCharging: true,
        acChargingTime: null,
        acChargingPowerKw: null,
        dcChargingTime: "25 Min (10-70%)",
        dcChargingPowerKw: null,
      },

      transmission: "Automatic",
      transmissionType: "Automatic",
      gearbox: "Automatic 1 Gear",
      driveType: "AWD",
      drivetrain: "AWD",
    };

    const performanceData = {
      motorPower: 260,
      motorPowerKw: 260,
      powerKw: 260,
      powerUnit: "kW",

      motorType: "Permanent Magnet Synchronous",

      maxPower: 348.66,
      maxPowerUnit: "bhp",

      maxTorque: 500,
      torque: 500,
      torqueNm: 500,
      torqueUnit: "Nm",

      motorCount: 1,

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "Automatic 1 Gear",

      driveType: "AWD",
      drivetrain: "AWD",

      topSpeed: null,
      topSpeedUnit: "kmph",

      zeroToHundred: null,
      zeroToHundredUnit: "seconds",

      regenerativeBraking: null,

      suspensionSteeringBrakes: {
        frontSuspension: "MacPherson Strut suspension",
        rearSuspension: "Rear twist beam",

        steeringType: "Electric",
        steeringColumn: "Tilt & Telescopic",
        steeringGearType: "Rack & Pinion",

        frontBrakeType: "Disc",
        rearBrakeType: "Disc",

        turningRadius: null,
        turningRadiusUnit: "metres",
      },
    };

    const dimensionsData = {
      length: 4550,
      lengthMm: 4550,

      width: 1893,
      widthMm: 1893,

      height: 1596,
      heightMm: 1596,

      wheelbase: 2840,
      wheelbaseMm: 2840,

      frontTread: null,
      frontTreadMm: null,

      rearTread: null,
      rearTreadMm: null,

      bootSpace: 537,
      bootCapacity: 537,
      bootCapacityLitres: 537,

      bootSpaceRearSeatFolding: null,
      bootSpaceRearSeatFoldingLitres: null,

      groundClearance: null,
      groundClearanceMm: null,

      seatingCapacity: 5,
      seats: 5,

      kerbWeight: null,
      grossWeight: null,
    };

    const safetyData = {
      airbags: 7,
      numberOfAirbags: 7,

      abs: true,
      brakeAssist: true,
      ebd: true,
      tractionControl: true,
      esc: true,
      tpms: true,

      centralLocking: true,
      childSafetyLocks: true,
      antiTheftAlarm: true,
      engineImmobilizer: true,

      driverAirbag: true,
      passengerAirbag: true,
      sideAirbag: true,

      isofix: true,
      hillAssist: true,
      hillDescentControl: true,

      rearCamera: "With Guidedlines",
      camera360: true,

      antiPinchPowerWindows: "All Windows",

      headsUpDisplay: true,

      bharatNcapSafetyRating: "5 Star",
      bharatNcapChildSafetyRating: "5 Star",

      adas: {
        forwardCollisionWarning: null,
        automaticEmergencyBraking: null,
        trafficSignRecognition: null,
        blindSpotCollisionAvoidanceAssist: null,
        laneDepartureWarning: null,
        laneKeepAssist: null,
        laneDeparturePreventionAssist: null,
        driverAttentionWarning: null,
        adaptiveCruiseControl: null,
        adaptiveHighBeamAssist: null,
        rearCrossTrafficAlert: null,
        rearCrossTrafficCollisionAvoidance: null,
        blindSpotMonitor: null,
        autonomousParking: "Semi",
      },
    };

    const featuresData = {
      comfortConvenience: {
        bootOpening: "Electronic",
        powerSteering: true,
        airConditioner: true,
        heater: true,
        adjustableSteering: "Powered Adjustment",
        heightAdjustableDriverSeat: true,
        ventilatedSeats: true,
        electricAdjustableSeats: "Front",
        automaticClimateControl: true,
        airQualityControl: true,
        rearSeatHeadrest: "Integrated",
        adjustableHeadrest: true,
        rearSeatCentreArmRest: true,
        heightAdjustableFrontSeatBelts: true,
        rearACVents: true,
        activeNoiseCancellation: true,
        cruiseControl: true,
        parkingSensors: true,
        realTimeVehicleTracking: true,
        foldableRearSeat: "60:40 Split",
        keylessEntry: true,
        engineStartStopButton: true,
        voiceCommands: true,
        usbCharger: "Front & Rear",
        centralConsoleArmrest: true,
        gearShiftIndicator: true,
        driveModes: 3,
        driveModeTypes: [
          "Normal",
          "Eco",
          "Sport",
        ],
        gloveBoxLight: true,
        followMeHomeHeadlamps: true,
        powerWindows: "Front & Rear",
        cupHolders: "Front & Rear",
      },

      interior: {
        leatherWrappedSteeringWheel: true,
        leatherWrappedGearShiftSelector: true,
        gloveBox: true,
        digitalCluster: "Semi",
        upholstery: "Leather",
      },

      exterior: {
        adjustableHeadlamps: true,
        headlampWashers: true,
        rainSensingWiper: true,
        rearWindowWiper: true,
        rearWindowWasher: true,
        rearWindowDefogger: true,
        wheelCovers: true,
        alloyWheels: true,
        tintedGlass: true,
        rearSpoiler: true,
        outsideRearViewMirrorTurnIndicators: true,
        projectorHeadlamps: true,
        automaticHeadlamps: true,
        fogLights: "Front",
        antenna: "Shark Fin",
        sunroof: "Panoramic",
        heatedOutsideRearViewMirror: true,
        outsideRearViewMirror: "Powered, Powered & Folding",
        tyreType: "Radial Tubeless",
        wheelSize: "19 Inch",
        ledDRLs: true,
        ledHeadlamps: true,
        ledTaillights: true,
        ledFogLamps: true,
      },

      entertainmentCommunication: {
        touchscreen: true,
        touchscreenSize: "12.9 inch",
        androidAuto: true,
        appleCarPlay: true,
        wirelessAndroidAuto: true,
        wirelessAppleCarPlay: true,
        wirelessPhoneCharging: true,
        bluetoothConnectivity: true,
        wiFiConnectivity: true,
        speakers: 8,
        numberOfSpeakers: 8,
        speakersPosition: "Front & Rear",
        usbPorts: "Type-A: 2, Type-C: 1",
        additionalFeatures: "Wireless Android Auto & Apple CarPlay",
      },

      advancedInternetFeatures: {
        liveLocation: true,
        liveWeather: null,
        otaUpdates: true,
        crashNotification: null,
        sosButton: null,
        remoteBootOpen: true,
      },
    };

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
        ON CONFLICT (id)
        DO UPDATE SET
          vehicle_id = EXCLUDED.vehicle_id,
          type = EXCLUDED.type,
          data = EXCLUDED.data,
          payload = EXCLUDED.payload
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
        ],
      );

      console.log(`   ✅ ${type} specification inserted`);
    }

    await insertSpecification("battery", batteryData);
    await insertSpecification("performance", performanceData);
    await insertSpecification("dimensions", dimensionsData);
    await insertSpecification("safety", safetyData);
    await insertSpecification("features", featuresData);

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
      ON CONFLICT (id)
      DO UPDATE SET
        vehicle_id = EXCLUDED.vehicle_id,
        data = EXCLUDED.data,
        payload = EXCLUDED.payload
      `,
      [
        `charging-${VEHICLE_ID}`,
        VEHICLE_ID,

        JSON.stringify({
          chargingPort: "CCS-II",
          fastCharging: true,
          acChargingTime: null,
          acChargingPowerKw: null,
          dcChargingTime: "25 Min (10-70%)",
          dcChargingPowerKw: null,
          batteryCapacity: 70,
          batteryCapacityUnit: "kWh",
        }),

        JSON.stringify({
          source: SOURCE,
          sourceUrl: SOURCE_URL,
        }),
      ],
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
      ON CONFLICT (id)
      DO UPDATE SET
        vehicle_id = EXCLUDED.vehicle_id,
        type = EXCLUDED.type,
        url = EXCLUDED.url,
        alt = EXCLUDED.alt,
        payload = EXCLUDED.payload
      `,
      [
        `media-${VEHICLE_ID}-main`,
        VEHICLE_ID,
        "image",
        IMAGE_URL,
        "VinFast VF7 front left side",

        JSON.stringify({
          source: SOURCE,
          sourceUrl: SOURCE_URL,
          role: "primary",
        }),
      ],
    );

    console.log("   ✅ Main image inserted");

    /* =====================================================
       9. VERIFY
    ===================================================== */

    console.log("\n🔎 Verifying inserted VinFast VF7 data...");

    const vehicleCheck = await client.query(
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
      [VEHICLE_ID],
    );

    const variantCheck = await client.query(
      `
      SELECT COUNT(*)::int AS count
      FROM variants
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID],
    );

    const specificationCheck = await client.query(
      `
      SELECT type, data
      FROM specifications
      WHERE vehicle_id = $1
      ORDER BY type
      `,
      [VEHICLE_ID],
    );

    const chargingCheck = await client.query(
      `
      SELECT id, data
      FROM charging
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID],
    );

    const mediaCheck = await client.query(
      `
      SELECT id, type, url
      FROM media
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID],
    );

    if (!vehicleCheck.rows.length) {
      throw new Error(
        "Verification failed: VinFast VF7 was not inserted.",
      );
    }

    if (
      Number(variantCheck.rows[0]?.count || 0) !== variants.length
    ) {
      throw new Error(
        `Verification failed: expected ${variants.length} variants.`,
      );
    }

    const specificationTypes = specificationCheck.rows.map(
      (row) => row.type,
    );

    const expectedTypes = [
      "battery",
      "performance",
      "dimensions",
      "safety",
      "features",
    ];

    for (const type of expectedTypes) {
      if (!specificationTypes.includes(type)) {
        throw new Error(
          `Verification failed: missing ${type} specification.`,
        );
      }
    }

    if (!chargingCheck.rows.length) {
      throw new Error(
        "Verification failed: charging data missing.",
      );
    }

    if (!mediaCheck.rows.length) {
      throw new Error(
        "Verification failed: media data missing.",
      );
    }

    const insertedPayload = vehicleCheck.rows[0].payload;

    console.log("\n   Vehicle:", vehicleCheck.rows[0].name);

    console.log(
      "   Battery:",
      insertedPayload.batteryCapacity ?? "Not specified",
      "kWh",
    );

    console.log(
      "   Range:",
      insertedPayload.range ?? "Not specified",
      "km",
    );

    console.log(
      "   Power:",
      insertedPayload.motorPower ?? "Not specified",
      "kW",
    );

    console.log(
      "   Max Power:",
      insertedPayload.maxPower ?? "Not specified",
      "bhp",
    );

    console.log(
      "   Torque:",
      insertedPayload.maxTorque ?? "Not specified",
      "Nm",
    );

    console.log(
      "   Top Speed:",
      insertedPayload.topSpeed ?? "Not specified",
      "kmph",
    );

    console.log(
      "   Acceleration:",
      insertedPayload.zeroToHundred ?? "Not specified",
      "seconds",
    );

    console.log(
      "   Variants:",
      variantCheck.rows[0].count,
    );

    console.log(
      "   Specifications:",
      specificationTypes.join(", "),
    );

    console.log(
      "   Charging:",
      chargingCheck.rows.length,
    );

    console.log(
      "   Media:",
      mediaCheck.rows.length,
    );

    /* =====================================================
       10. COMMIT
    ===================================================== */

    await client.query("COMMIT");

    console.log("\n=================================================");
    console.log("🎉 VINFAST VF7 INSERT COMPLETED");
    console.log("=================================================");

    console.log("Vehicle        : VinFast VF7");
    console.log("Variants       :", variants.length);
    console.log("Specifications : 5");
    console.log("Charging       : 1");
    console.log("Media          : 1");
    console.log("Battery        : 70 kWh");
    console.log("Range          : 510 km");
    console.log("Top Speed      : Not specified");
    console.log("Acceleration   : Not specified");
    console.log("Price          : ₹22.99 - ₹28.09 Lakh");
    console.log("Reviews        : 10");
    console.log("Rating         : 4.4");

    console.log("\nSpecification types:");
    console.log("   ✅ battery");
    console.log("   ✅ performance");
    console.log("   ✅ dimensions");
    console.log("   ✅ safety");
    console.log("   ✅ features");

    console.log("\n✅ Database transaction committed.");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("\n❌ INSERT FAILED");
    console.error("Transaction rolled back.");
    console.error(error);

    console.error(
      "\n⚠️ No partial VinFast VF7 data was saved.",
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();