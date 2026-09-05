// import dotenv from "dotenv";
// import pg from "pg";

// dotenv.config({
//   path: ".env.local",
// });

// const { Pool } = pg;

// console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL);

// if (!process.env.DATABASE_URL) {
//   throw new Error(
//     "DATABASE_URL missing. Check .env.local in project root."
//   );
// }

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// /* =========================================================
//    CONSTANTS
// ========================================================= */

// const now = new Date();

// const VEHICLE_ID = "tata-tiago-ev";
// const BRAND_ID = "tata";
// const MARKET_ID = "india";

// const IMAGE_URL =
//   "https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago-EV/13563/1779961723416/front-left-side-47.jpg";

// const SOURCE = "CarDekho";

// const SOURCE_URL =
//   "https://www.cardekho.com/tata/tiago-ev";

// /* =========================================================
//    VARIANTS
// ========================================================= */

// const variants = [
//   {
//     id: "tata-tiago-ev-smart-19-medium-range",
//     name: "Tiago EV Smart 19 Medium Range",
//     price: 699000,
//     battery: 19,
//     range: 250,
//     features: [
//       "6 Airbags",
//       "Digital Driver's Display",
//       "Automatic Climate Control",
//       "TPMS",
//       "Central Locking",
//     ],
//   },

//   {
//     id: "tata-tiago-ev-pure-plus-19-medium-range",
//     name: "Tiago EV Pure Plus 19 Medium Range",
//     price: 849000,
//     battery: 19,
//     range: 250,
//     features: [
//       "6 Airbags",
//       "Digital Driver's Display",
//       "Automatic Climate Control",
//       "TPMS",
//       "Central Locking",
//       "8-Inch Touchscreen Infotainment",
//       "Wireless Android Auto",
//       "Wireless Apple CarPlay",
//       "Steering Mounted Audio Controls",
//       "Electrically Adjustable ORVMs",
//       "All 4 Power Windows",
//       "Rear Parking Camera",
//     ],
//   },

//   {
//     id: "tata-tiago-ev-pure-plus-24-long-range",
//     name: "Tiago EV Pure Plus 24 Long Range",
//     price: 949000,
//     battery: 24,
//     range: 285,
//     features: [
//       "6 Airbags",
//       "Digital Driver's Display",
//       "Automatic Climate Control",
//       "TPMS",
//       "Central Locking",
//       "8-Inch Touchscreen Infotainment",
//       "Wireless Android Auto",
//       "Wireless Apple CarPlay",
//       "Steering Mounted Audio Controls",
//       "Electrically Adjustable ORVMs",
//       "All 4 Power Windows",
//       "Rear Parking Camera",
//     ],
//   },

//   {
//     id: "tata-tiago-ev-creative-plus-24-long-range",
//     name: "Tiago EV Creative Plus 24 Long Range",
//     price: 999000,
//     battery: 24,
//     range: 285,
//     features: [
//       "6 Airbags",
//       "Digital Driver's Display",
//       "Automatic Climate Control",
//       "TPMS",
//       "Central Locking",
//       "360-Degree Camera",
//       "ESP",
//       "10.25-Inch Touchscreen Infotainment",
//       "Cruise Control",
//       "Push Button Start",
//       "Wireless Android Auto",
//       "Wireless Apple CarPlay",
//       "Steering Mounted Audio Controls",
//       "Electrically Adjustable ORVMs",
//       "All 4 Power Windows",
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
//     console.log("🚗 EVINSIGHTS - ADD TATA TIAGO EV");
//     console.log("=================================================\n");

//     await client.query("BEGIN");

//     /* =====================================================
//        1. BRAND
//     ===================================================== */

//     console.log("🏷️ Upserting Tata brand...");

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
//         "Tata Motors",
//         "tata",
//         "India",
//         null,
//         JSON.stringify({
//           name: "Tata Motors",
//           country: "India",
//           slug: "tata",
//         }),
//         now,
//       ]
//     );

//     console.log("   ✅ Tata brand ready");

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
//        3. CLEAN OLD TIAGO EV DATA
//     ===================================================== */

//     console.log("\n🧹 Cleaning existing Tata Tiago EV records...");

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

//     console.log("   ✅ Existing Tata Tiago EV data cleaned");

//     /* =====================================================
//        4. CANONICAL VEHICLE DATA
//     ===================================================== */

//     console.log("\n🚗 Inserting Tata Tiago EV...");

//     const vehiclePayload = {
//       /* ---------------------------------------------------
//          IDENTITY
//       --------------------------------------------------- */

//       name: "Tata Tiago EV",
//       model: "Tiago EV",
//       brand: "Tata Motors",
//       brandId: BRAND_ID,

//       /* ---------------------------------------------------
//          SOURCE
//       --------------------------------------------------- */

//       source: SOURCE,
//       sourceUrl: SOURCE_URL,

//       /* ---------------------------------------------------
//          BATTERY
//       --------------------------------------------------- */

//       batteryCapacity: 24,
//       batteryCapacityKwh: 24,
//       batteryKwh: 24,

//       batteryOptions: [
//         19,
//         24,
//       ],

//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium-ion",

//       batteryChemistry: "Lithium-ion",

//       /* ---------------------------------------------------
//          RANGE
//       --------------------------------------------------- */

//       range: 285,
//       rangeKm: 285,

//       batteryRange: 285,

//       rangeOptions: [
//         250,
//         285,
//       ],

//       rangeUnit: "km",

//       /* ---------------------------------------------------
//          MOTOR
//       --------------------------------------------------- */

//       motorPower: 73.75,
//       motorPowerKw: 73.75,

//       powerKw: 73.75,
//       power: 73.75,

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous Motor",

//       maxTorque: 114,
//       torque: 114,
//       torqueNm: 114,

//       torqueUnit: "Nm",

//       /* ---------------------------------------------------
//          DRIVETRAIN
//       --------------------------------------------------- */

//       transmission: "Automatic",
//       transmissionType: "Automatic",

//       gearbox: "1-Speed",

//       driveType: "FWD",
//       drivetrain: "FWD",

//       /* ---------------------------------------------------
//          CHARGING
//       --------------------------------------------------- */

//       chargingPort: "CCS-II",

//       chargerType:
//         "CCS2 (DC)/Type 2 (AC)",

//       /* ---------------------------------------------------
//          SEATING
//       --------------------------------------------------- */

//       seats: 5,
//       seatingCapacity: 5,

//       /* ---------------------------------------------------
//          DIMENSIONS
//       --------------------------------------------------- */

//       length: 3825,
//       lengthMm: 3825,

//       width: 1684,
//       widthMm: 1684,

//       height: 1562,
//       heightMm: 1562,

//       wheelbase: 2400,
//       wheelbaseMm: 2400,

//       bootSpace: 240,
//       bootCapacity: 240,
//       bootCapacityLitres: 240,

//       turningRadius: 5.1,
//       turningRadiusUnit: "m",

//       /* ---------------------------------------------------
//          CLASSIFICATION
//       --------------------------------------------------- */

//       bodyType: "Hatchback",
//       fuelType: "Electric",

//       emissionNormCompliance: "ZEV",

//       /* ---------------------------------------------------
//          PRICE
//       --------------------------------------------------- */

//       priceMin: 699000,
//       priceMax: 999000,

//       currency: "INR",
//       currencyCode: "INR",
//       currencySymbol: "₹",

//       /* ---------------------------------------------------
//          RATING
//       --------------------------------------------------- */

//       rating: 4.6,
//       reviewCount: 14,

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

//         "Tata Tiago EV",

//         "tata-tiago-ev",

//         BRAND_ID,

//         null,

//         /* IMPORTANT:
//            markets column is TEXT[]
//         */
//         ["india"],

//         JSON.stringify({
//           bodyType: "Hatchback",
//           fuelType: "Electric",
//           seatingCapacity: 5,
//         }),

//         JSON.stringify({
//           status: "active",
//           launched: true,
//           available: true,
//         }),

//         JSON.stringify({
//           title: "Tata Tiago EV",
//           slug: "tata-tiago-ev",
//           description:
//             "Tata Tiago EV electric hatchback with 19 kWh and 24 kWh battery options, automatic transmission, FWD drivetrain and up to 285 km range.",
//         }),

//         JSON.stringify({
//           ...vehiclePayload,

//           specs: {
//             battery: 24,

//             batteryOptions: [
//               19,
//               24,
//             ],

//             range: 285,

//             rangeOptions: [
//               250,
//               285,
//             ],

//             power: 73.75,

//             torque: 114,
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

//         4.6,

//         14,

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

//             batteryCapacity:
//               variant.battery,

//             batteryCapacityKwh:
//               variant.battery,

//             range:
//               variant.range,

//             rangeKm:
//               variant.range,

//             motorPower: 73.75,

//             motorPowerKw: 73.75,

//             motorType:
//               "Permanent Magnet Synchronous Motor",

//             maxTorque: 114,

//             torqueNm: 114,

//             transmission: "Automatic",

//             transmissionType: "Automatic",

//             gearbox: "1-Speed",

//             driveType: "FWD",

//             drivetrain: "FWD",

//             fuelType: "Electric",

//             chargingPort: "CCS-II",

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
//       batteryCapacity: 24,

//       batteryCapacityKwh: 24,

//       batteryKwh: 24,

//       batteryOptions: [
//         19,
//         24,
//       ],

//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium-ion",

//       batteryChemistry: "Lithium-ion",

//       range: 285,

//       rangeKm: 285,

//       rangeOptions: [
//         250,
//         285,
//       ],

//       rangeUnit: "km",

//       chargingPort: "CCS-II",

//       chargerType:
//         "CCS2 (DC)/Type 2 (AC)",

//       batteryWarranty: "15 Years",

//       charging: {
//         acCharging:
//           "3.5 hours | 7.2 kW AC (10-100%)",

//         dcFastCharging:
//           "35 minutes | 30 kW DC (10-80%)",

//         chargingTime:
//           "3.5H-7.2 kW (10-100%)",

//         chargingTimeAC:
//           "3.5H-7.2 kW (10-100%)",

//         chargingTimeDC:
//           "35 Min-30kW (10%-80%)",

//         chargingTime15A:
//           "8.7H (10-100%)",

//         chargingOptions: [
//           "7.2 kW AC",
//           "30 kW DC",
//           "15 A Plug Point",
//         ],

//         fastCharging: true,

//         fastChargingTime:
//           "35 minutes (10-80%)",
//       },
//     };

//     /* -----------------------------------------------------
//        PERFORMANCE
//     ----------------------------------------------------- */

//     const performanceData = {
//       motorPower: 73.75,

//       motorPowerKw: 73.75,

//       powerKw: 73.75,

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous Motor",

//       maxTorque: 114,

//       torque: 114,

//       torqueNm: 114,

//       torqueUnit: "Nm",

//       transmission: "Automatic",

//       transmissionType: "Automatic",

//       gearbox: "1-Speed",

//       driveType: "FWD",

//       drivetrain: "FWD",

//       regenerativeBraking: true,

//       regenerativeBrakingLevels: 4,

//       chargingPort: "CCS-II",

//       suspensionSteeringBrakes: {
//         frontSuspension:
//           "MacPherson Strut suspension",

//         rearSuspension:
//           "Rear twist beam",

//         shockAbsorbersType:
//           "Hydraulic Shock Absorbers",

//         steeringType:
//           "Electric",

//         steeringColumn:
//           "Tilt",

//         steeringGearType:
//           "Rack & Pinion",

//         turningRadius: 5.1,

//         turningRadiusUnit: "m",

//         frontBrakeType:
//           "Disc",

//         rearBrakeType:
//           "Drum",
//       },
//     };

//     /* -----------------------------------------------------
//        DIMENSIONS
//     ----------------------------------------------------- */

//     const dimensionsData = {
//       length: 3825,

//       lengthMm: 3825,

//       width: 1684,

//       widthMm: 1684,

//       height: 1562,

//       heightMm: 1562,

//       wheelbase: 2400,

//       wheelbaseMm: 2400,

//       bootSpace: 240,

//       bootCapacity: 240,

//       bootCapacityLitres: 240,

//       seatingCapacity: 5,

//       seats: 5,

//       turningRadius: 5.1,

//       turningRadiusUnit: "m",
//     };

//     /* -----------------------------------------------------
//        SAFETY
//     ----------------------------------------------------- */

//     const safetyData = {
//       airbags: 6,

//       abs: true,

//       brakeAssist: true,

//       ebd: true,

//       tractionControl: true,

//       esc: true,

//       electronicStabilityControl: true,

//       tpms: true,

//       rearParkingCamera:
//         "With Guidelines",

//       rearCamera:
//         "With Guidedlines",

//       parkingSensors: true,

//       rearParkingSensors: true,

//       isofix: true,

//       hillAssist: true,

//       centralLocking: true,

//       childSafetyLocks: true,

//       antiTheftDevice: true,

//       driverAirbag: true,

//       passengerAirbag: true,

//       sideAirbag: true,

//       sideAirbagRear: true,

//       surroundViewCamera: "360 View Camera",
//     };

//     /* -----------------------------------------------------
//        FEATURES
//     ----------------------------------------------------- */

//     const featuresData = {
//       comfortConvenience: {
//         bootOpening:
//           "Electronic",

//         powerSteering: true,

//         airConditioner: true,

//         heater: true,

//         adjustableSteering:
//           "Height only",

//         heightAdjustableDriverSeat: true,

//         automaticClimateControl: true,

//         airQualityControl: true,

//         accessoryPowerOutlet: true,

//         adjustableHeadrest: true,

//         rearACVents: true,

//         cruiseControl: true,

//         parkingSensors:
//           "Rear",

//         realTimeVehicleTracking: true,

//         keylessEntry: true,

//         engineStartStopButton: true,

//         usbCharger:
//           "Front",

//         centralConsoleArmrest:
//           "With Storage",

//         driveModes: 2,

//         followMeHomeHeadlamps: true,

//         driveModeTypes: [
//           "City",
//           "Sport",
//         ],

//         powerWindows:
//           "Front & Rear",
//       },

//       interior: {
//         gloveBox: true,

//         digitalCluster: true,

//         upholstery:
//           "Fabric",
//       },

//       exterior: {
//         adjustableHeadlamps: true,

//         rainSensingWiper: true,

//         rearWindowWiper: true,

//         rearWindowWasher: true,

//         rearWindowDefogger: true,

//         wheelCovers: true,

//         alloyWheels: true,

//         rearSpoiler: true,

//         outsideRearViewMirrorTurnIndicators:
//           true,

//         projectorHeadlamps: true,

//         automaticHeadlamps: true,

//         antenna:
//           "Shark Fin",

//         outsideRearViewMirror:
//           "Powered & Folding",

//         tyreSize:
//           "175/65R14",

//         tyreType:
//           "Radial Tubeless",

//         wheelSize:
//           "14 Inch",

//         LEDDRLs: true,

//         LEDHeadlamps: true,
//       },

//       entertainmentCommunication: {
//         radio: true,

//         bluetoothConnectivity: true,

//         touchscreen: true,

//         touchscreenSize:
//           "10.25 inch",

//         androidAuto: true,

//         appleCarPlay: true,

//         numberOfSpeakers: 4,

//         usbPorts: true,

//         additionalFeatures:
//           "Wireless Android Auto & Apple Carplay",

//         speakers:
//           "Front & Rear",
//       },

//       adas: {
//         adaptiveHighBeamAssist: false,

//         blindSpotMonitor: false,
//       },

//       advancedInternetFeatures: {
//         liveLocation: true,

//         remoteVehicleStatusCheck: true,

//         inbuiltAssistant: true,

//         OTAUpdates: true,

//         overSpeedingAlert: true,

//         inCarRemoteControlApp: true,

//         smartwatchApp: true,

//         valetMode: true,

//         remoteACOnOff: true,

//         remoteDoorLockUnlock: true,

//         geoFenceAlert: true,
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
//           chargingPort:
//             "CCS-II",

//           chargingTime:
//             "3.5H-7.2 kW (10-100%)",

//           acChargingTime:
//             "3.5H-7.2 kW (10-100%)",

//           dcCharging:
//             "35 Min-30kW (10%-80%)",

//           chargingTime15A:
//             "8.7H (10-100%)",

//           portableCharging:
//             "15 A Plug Point",

//           chargingOptions: [
//             "7.2 kW AC",
//             "30 kW DC",
//             "15 A Plug Point",
//           ],

//           fastCharging: true,

//           acPowerKw: 7.2,

//           dcPowerKw: 30,

//           chargingStandard:
//             "CCS-II",

//           chargerType:
//             "CCS2 (DC)/Type 2 (AC)",
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

//     if (IMAGE_URL) {
//       await client.query(
//         `
//         INSERT INTO media (
//           id,
//           vehicle_id,
//           type,
//           url,
//           alt,
//           payload
//         )
//         VALUES (
//           $1,
//           $2,
//           $3,
//           $4,
//           $5,
//           $6::jsonb
//         )
//         `,
//         [
//           `media-${VEHICLE_ID}-main`,

//           VEHICLE_ID,

//           "image",

//           IMAGE_URL,

//           "Tata Tiago EV front left side",

//           JSON.stringify({
//             source: SOURCE,
//             sourceUrl: SOURCE_URL,
//             role: "primary",
//           }),
//         ]
//       );

//       console.log("   ✅ Main image inserted");
//     }

//     /* =====================================================
//        9. VERIFY
//     ===================================================== */

//     console.log(
//       "\n🔎 Verifying inserted Tata Tiago EV data..."
//     );

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
//       "   Battery options:",
//       insertedPayload.batteryOptions.join(
//         " / "
//       ),
//       "kWh"
//     );

//     console.log(
//       "   Range:",
//       insertedPayload.range,
//       "km"
//     );

//     console.log(
//       "   Motor Power:",
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
//       "🎉 TATA TIAGO EV INSERT COMPLETED"
//     );

//     console.log(
//       "================================================="
//     );

//     console.log(
//       "Vehicle        : Tata Tiago EV"
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
//       "Media          :",
//       mediaCheck.rows.length
//     );

//     console.log(
//       "Battery        : 19 / 24 kWh"
//     );

//     console.log(
//       "Range          : 250 / 285 km"
//     );

//     console.log(
//       "Motor Power    : 73.75 kW"
//     );

//     console.log(
//       "Torque         : 114 Nm"
//     );

//     console.log(
//       "Price range    : ₹6.99L - ₹9.99L"
//     );

//     console.log(
//       "Rating         : 4.6 / 5"
//     );

//     console.log(
//       "Reviews        : 14"
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
//       "\n⚠️ No partial Tata Tiago EV data was saved."
//     );

//     process.exitCode = 1;
//   } finally {
//     client.release();
//     await pool.end();
//   }
// }

// main();


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

const VEHICLE_ID = "toyota-urban-cruiser-ebella";
const BRAND_ID = "toyota";
const MARKET_ID = "india";

const IMAGE_URL =
  "https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Urban-Cruiser-EBELLA/13266/1780117257375/front-left-side-47.jpg";

const SOURCE = "CarDekho";

const SOURCE_URL =
  "https://www.cardekho.com/toyota/urban-cruiser-ebella";

/* =========================================================
   VARIANTS
========================================================= */

const variants = [
  {
    id: "toyota-urban-cruiser-ebella-e3",
    name: "Toyota Urban Cruiser EBELLA E3",
    price: 2360000,
    battery: 61,
    range: 543,
    features: [
      "10.1-Inch Touchscreen Infotainment",
      "10.25-Inch Digital Driver's Display",
      "JBL Sound System",
      "Fixed Glass Roof",
      "Panoramic Sunroof",
      "Ventilated Front Seats",
      "7 Airbags",
      "360-Degree Camera",
      "Wireless Phone Charger",
      "Powered Driver's Seat",
      "Automatic Climate Control",
      "Front & Rear Parking Sensors",
      "Keyless Entry",
      "Engine Start Stop Button",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "Level-2 ADAS",
      "Lane Departure Warning",
      "Lane Keep Assist",
      "Driver Attention Warning",
      "Adaptive Cruise Control",
      "Adaptive High Beam Assist",
      "Rear Cross Traffic Alert",
      "Blind Spot Monitor",
      "Remote Vehicle Status Check",
      "Remote Door Lock/Unlock",
      "Remote AC On/Off",
      "Live Location",
      "SOS Button",
      "Geo-fence Alert",
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
    console.log("🚗 EVINSIGHTS - ADD TOYOTA URBAN CRUISER EBELLA");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. BRAND
    ===================================================== */

    console.log("🏷️ Upserting Toyota brand...");

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
        "Toyota",
        "toyota",
        "Japan",
        null,
        JSON.stringify({
          name: "Toyota",
          country: "Japan",
          slug: "toyota",
        }),
        now,
      ]
    );

    console.log("   ✅ Toyota brand ready");

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
       3. CLEAN OLD TOYOTA URBAN CRUISER EBELLA DATA
    ===================================================== */

    console.log(
      "\n🧹 Cleaning existing Toyota Urban Cruiser EBELLA records..."
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
      "   ✅ Existing Toyota Urban Cruiser EBELLA data cleaned"
    );

    /* =====================================================
       4. CANONICAL VEHICLE DATA
    ===================================================== */

    console.log("\n🚗 Inserting Toyota Urban Cruiser EBELLA...");

    const vehiclePayload = {
      /* ---------------------------------------------------
         IDENTITY
      --------------------------------------------------- */

      name: "Toyota Urban Cruiser EBELLA",
      model: "Urban Cruiser EBELLA",
      variant: null,
      brand: "Toyota",
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

      batteryOptions: [
        61,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-Ion",

      batteryChemistry: null,

      batteryWarranty: "8 Years",

      /* ---------------------------------------------------
         RANGE
      --------------------------------------------------- */

      range: 543,
      rangeKm: 543,

      batteryRange: 543,

      rangeOptions: [
        543,
      ],

      rangeUnit: "km",

      /* ---------------------------------------------------
         MOTOR
      --------------------------------------------------- */

      motorPower: null,
      motorPowerKw: null,

      powerKw: null,
      power: 171.65,

      powerUnit: "bhp",

      motorType:
        "Permanent Magnet Synchronous",

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

      driveType: "FWD",
      drivetrain: "FWD",

      /* ---------------------------------------------------
         CHARGING
      --------------------------------------------------- */

      chargingPort: "CCS-II",

      chargerType: null,

      fastCharging: true,

      /* ---------------------------------------------------
         SEATING
      --------------------------------------------------- */

      seats: 5,
      seatingCapacity: 5,

      /* ---------------------------------------------------
         DIMENSIONS
      --------------------------------------------------- */

      length: 4285,
      lengthMm: 4285,

      width: 1800,
      widthMm: 1800,

      height: 1640,
      heightMm: 1640,

      wheelbase: 2700,
      wheelbaseMm: 2700,

      kerbWeight: 1815,
      kerbWeightKg: 1815,

      grossWeight: 2250,
      grossWeightKg: 2250,

      bootSpace: null,
      bootCapacity: null,
      bootCapacityLitres: null,

      turningRadius: 5.2,
      turningRadiusUnit: "m",

      /* ---------------------------------------------------
         CLASSIFICATION
      --------------------------------------------------- */

      bodyType: "SUV",
      fuelType: "Electric",

      emissionNormCompliance: "BS VI 2.0",

      /* ---------------------------------------------------
         PRICE
      --------------------------------------------------- */

      priceMin: 2360000,
      priceMax: 2360000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      /* ---------------------------------------------------
         RATING
      --------------------------------------------------- */

      rating: 4.3,
      reviewCount: 1,

      /* ---------------------------------------------------
         AVAILABILITY
      --------------------------------------------------- */

      availableInIndia: true,

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

        "Toyota Urban Cruiser EBELLA",

        "toyota-urban-cruiser-ebella",

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
          title: "Toyota Urban Cruiser EBELLA",
          slug: "toyota-urban-cruiser-ebella",
          description:
            "Toyota Urban Cruiser EBELLA electric SUV with a 61 kWh battery, 543 km range, front-wheel drive and automatic transmission.",
        }),

        JSON.stringify({
          ...vehiclePayload,

          specs: {
            battery: 61,

            batteryOptions: [
              61,
            ],

            range: 543,

            rangeOptions: [
              543,
            ],

            power: 171.65,

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

        4.3,

        1,

        JSON.stringify(vehiclePayload),

        now,
      ]
    );

    console.log("   ✅ Toyota Urban Cruiser EBELLA inserted");

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

            motorPower: null,

            motorPowerKw: null,

            motorType:
              "Permanent Magnet Synchronous",

            maxPower: 171.65,

            maxTorque: 193,

            torqueNm: 193,

            transmission: "Automatic",

            transmissionType: "Automatic",

            gearbox: "Single Speed",

            driveType: "FWD",

            drivetrain: "FWD",

            fuelType: "Electric",

            chargingPort: "CCS-II",

            features: variant.features,
          }),

          now,
        ]
      );

      if (variant.price !== null) {
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
      } else {
        console.log(
          `   ℹ️ ${variant.name} → Price unavailable`
        );
      }

      console.log(
        `   ✅ ${variant.name} variant inserted`
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
      batteryCapacity: 61,

      batteryCapacityKwh: 61,

      batteryKwh: 61,

      batteryOptions: [
        61,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-Ion",

      batteryChemistry: null,

      batteryWarranty: "8 Years",

      range: 543,

      rangeKm: 543,

      rangeOptions: [
        543,
      ],

      rangeUnit: "km",

      chargingPort: "CCS-II",

      chargerType: null,

      charging: {
        acCharging: null,

        dcFastCharging: null,

        chargingOptions: [],

        fastCharging: true,

        fastChargingTime: null,
      },
    };

    /* -----------------------------------------------------
       PERFORMANCE
    ----------------------------------------------------- */

    const performanceData = {
      motorPower: null,

      motorPowerKw: null,

      powerKw: null,

      powerUnit: "bhp",

      motorType:
        "Permanent Magnet Synchronous",

      maxPower: 171.65,

      maxTorque: 193,

      torque: 193,

      torqueNm: 193,

      torqueUnit: "Nm",

      transmission: "Automatic",

      transmissionType: "Automatic",

      gearbox: "Single Speed",

      driveType: "FWD",

      drivetrain: "FWD",

      regenerativeBraking: true,

      chargingPort: "CCS-II",

      suspensionSteeringBrakes: {
        frontSuspension:
          "MacPherson Strut suspension",

        rearSuspension:
          "Multi-link suspension",

        steeringType:
          "Electric",

        steeringColumn:
          "Tilt & Telescopic",

        steeringGearType:
          "Rack and pinion",

        turningRadius: 5.2,

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
      length: 4285,

      lengthMm: 4285,

      width: 1800,

      widthMm: 1800,

      height: 1640,

      heightMm: 1640,

      wheelbase: 2700,

      wheelbaseMm: 2700,

      kerbWeight: 1815,

      kerbWeightKg: 1815,

      grossWeight: 2250,

      grossWeightKg: 2250,

      bootSpace: null,

      bootCapacity: null,

      bootCapacityLitres: null,

      seatingCapacity: 5,

      seats: 5,

      turningRadius: 5.2,

      turningRadiusUnit: "m",
    };

    /* -----------------------------------------------------
       SAFETY
    ----------------------------------------------------- */

    const safetyData = {
      airbags: 7,

      abs: true,

      brakeAssist: null,

      ebd: true,

      tractionControl: null,

      esc: true,

      electronicStabilityControl: true,

      tpms: true,

      rearParkingCamera:
        "360 View Camera",

      rearCamera:
        "360 View Camera",

      parkingSensors: true,

      frontParkingSensors: true,

      rearParkingSensors: true,

      isofix: true,

      hillAssist: true,

      centralLocking: true,

      childSafetyLocks: true,

      antiTheftAlarm: true,

      antiTheftDevice: true,

      engineImmobilizer: true,

      driverAirbag: true,

      passengerAirbag: true,

      sideAirbag: true,

      sideAirbagRear: true,

      surroundViewCamera:
        "360 View Camera",

      automaticEmergencyBraking: null,

      forwardCollisionWarning: null,

      blindSpotMonitoring: true,

      laneDepartureAvoidance: null,

      rearCollisionWarning: null,

      dayNightRearViewMirror: true,
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

        automaticClimateControl: true,

        adjustableSteering:
          "Height & Reach",

        heightAdjustableDriverSeat: true,

        ventilatedSeats: true,

        electricAdjustableSeats:
          "Front",

        accessoryPowerOutlet: true,

        rearSeatHeadrest:
          "Adjustable",

        adjustableHeadrest: true,

        rearSeatCentreArmRest: true,

        rearACVents: true,

        lumbarSupport: null,

        cruiseControl: null,

        parkingSensors:
          "Front & Rear",

        keylessEntry: true,

        engineStartStopButton: true,

        usbCharger:
          "Front & Rear",

        centralConsoleArmrest:
          "With Storage",

        gloveBoxLight: true,

        followMeHomeHeadlamps: true,

        powerWindows:
          "Front & Rear",

        cupHolders:
          "Front Only",

        foldableRearSeat:
          "40:20:40 Split",

        vehicleToVehicleCharging: null,

        vehicleToLoadCharging: null,
      },

      interior: {
        leatherWrappedSteeringWheel: true,

        gloveBox: true,

        lighting:
          "Ambient light, Footwell Lamp",

        digitalCluster: true,

        digitalClusterSize:
          "4",

        upholstery:
          "Leatherette",
      },

      exterior: {
        adjustableHeadlamps: true,

        rainSensingWiper: true,

        rearWindowWiper: true,

        rearWindowWasher: true,

        rearWindowDefogger: true,

        wheelCovers: true,

        alloyWheels: true,

        rearSpoiler: true,

        outsideRearViewMirrorTurnIndicators:
          true,

        antenna:
          "Shark Fin",

        sunroof:
          "Panoramic",

        heatedOutsideRearViewMirror:
          null,

        outsideRearViewMirror:
          "Powered & Folding",

        tyreSize:
          "225/55/R18",

        tyreType:
          "Radial & Tubeless",

        LEDDRLs: true,

        LEDHeadlamps: true,

        LEDTaillights: true,
      },

      entertainmentCommunication: {
        radio: true,

        wirelessPhoneCharging: true,

        bluetoothConnectivity: true,

        touchscreen: true,

        touchscreenSize:
          "10.1 inch",

        androidAuto: true,

        appleCarPlay: true,

        numberOfSpeakers: 4,

        usbPorts: true,

        tweeters: 2,

        subwoofer: 1,

        additionalFeatures:
          "Wireless Android Auto & Apple CarPlay",

        speakers:
          "Front & Rear",
      },

      adas: {
        forwardCollisionWarning: null,

        blindSpotCollisionAvoidanceAssist:
          null,

        laneDepartureWarning: true,

        laneKeepAssist: true,

        driverAttentionWarning: true,

        adaptiveCruiseControl: true,

        leadingVehicleDepartureAlert:
          null,

        adaptiveHighBeamAssist: true,

        rearCrossTrafficAlert: true,

        rearCrossTrafficCollisionAvoidanceAssist:
          null,

        blindSpotMonitor: true,
      },

      advancedInternetFeatures: {
        liveLocation: true,

        remoteVehicleStatusCheck: true,

        OTAUpdates: null,

        eCallICall: true,

        SOSButton: true,

        overSpeedingAlert: true,

        inCarRemoteControlApp: true,

        smartwatchApp: true,

        remoteACOnOff: true,

        remoteDoorLockUnlock: true,

        SOSEmergencyAssistance: true,

        geoFenceAlert: true,

        inbuiltApps:
          "Siri",
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

          chargingTime: null,

          acChargingTime: null,

          dcCharging: null,

          portableCharging: null,

          chargingOptions: [],

          fastCharging: true,

          chargingStandard:
            "CCS-II",

          chargerType: null,

          supercharging: false,
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

          "Toyota Urban Cruiser EBELLA",

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
      "\n🔎 Verifying inserted Toyota Urban Cruiser EBELLA data..."
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
      "   Motor Power:",
      insertedPayload.motorPower ?? "Not provided",
      insertedPayload.motorPower
        ? "kW"
        : ""
    );

    console.log(
      "   Max Power:",
      insertedPayload.power,
      "bhp"
    );

    console.log(
      "   Torque:",
      insertedPayload.maxTorque,
      "Nm"
    );

    console.log(
      "   Drivetrain:",
      insertedPayload.drivetrain
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

    console.log(
      "   Rating:",
      vehicleCheck.rows[0].rating
    );

    console.log(
      "   Reviews:",
      vehicleCheck.rows[0].review_count
    );

    /* =====================================================
       10. COMMIT
    ===================================================== */

    await client.query("COMMIT");

    console.log(
      "\n================================================="
    );

    console.log(
      "🎉 TOYOTA URBAN CRUISER EBELLA INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle        : Toyota Urban Cruiser EBELLA"
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
      "Battery        : 61 kWh"
    );

    console.log(
      "Range          : 543 km"
    );

    console.log(
      "Motor Power    : Not provided in source"
    );

    console.log(
      "Max Power      : 171.65 bhp"
    );

    console.log(
      "Torque         : 193 Nm"
    );

    console.log(
      "Drivetrain     : FWD"
    );

    console.log(
      "Price          : ₹23,60,000"
    );

    console.log(
      "Rating         : 4.3"
    );

    console.log(
      "Reviews        : 1"
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
      "\n⚠️ No partial Toyota Urban Cruiser EBELLA data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();

