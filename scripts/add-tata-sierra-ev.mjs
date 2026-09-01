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

// const VEHICLE_ID = "tata-sierra-ev";
// const BRAND_ID = "tata";
// const MARKET_ID = "india";

// const SOURCE = "CarDekho";

// const SOURCE_URL =
//   "https://www.cardekho.com/tata/sierra-ev";

// const IMAGE_URL =
//   "https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Sierra-EV/13644/1750240551078/front-left-side-47.jpg";

// /* =========================================================
//    VARIANTS
// ========================================================= */

// const variants = [
//   {
//     id: "tata-sierra-ev-smart",
//     name: "Tata Sierra EV Smart",
//     price: 2100000,
//     battery: 65,
//     range: 489,
//     features: [
//       "6 Airbags",
//       "ABS with EBD",
//       "Electronic Stability Control",
//       "TPMS",
//       "Rear Parking Camera",
//       "Automatic Climate Control",
//       "Digital Driver Display",
//       "Connected Car Technology",
//     ],
//   },

//   {
//     id: "tata-sierra-ev-pure",
//     name: "Tata Sierra EV Pure",
//     price: 2300000,
//     battery: 65,
//     range: 489,
//     features: [
//       "6 Airbags",
//       "ABS with EBD",
//       "Electronic Stability Control",
//       "TPMS",
//       "Rear Parking Camera",
//       "Automatic Climate Control",
//       "Digital Driver Display",
//       "Connected Car Technology",
//       "Touchscreen Infotainment",
//       "Wireless Android Auto",
//       "Wireless Apple CarPlay",
//       "Cruise Control",
//     ],
//   },

//   {
//     id: "tata-sierra-ev-adventure",
//     name: "Tata Sierra EV Adventure",
//     price: 2500000,
//     battery: 65,
//     range: 489,
//     features: [
//       "6 Airbags",
//       "ABS with EBD",
//       "Electronic Stability Control",
//       "TPMS",
//       "360 Degree Camera",
//       "Automatic Climate Control",
//       "Digital Driver Display",
//       "Connected Car Technology",
//       "Large Touchscreen Infotainment",
//       "Wireless Android Auto",
//       "Wireless Apple CarPlay",
//       "Cruise Control",
//       "Panoramic Sunroof",
//       "Alloy Wheels",
//     ],
//   },

//   {
//     id: "tata-sierra-ev-adventure-plus",
//     name: "Tata Sierra EV Adventure Plus",
//     price: 2700000,
//     battery: 65,
//     range: 489,
//     features: [
//       "6 Airbags",
//       "ABS with EBD",
//       "Electronic Stability Control",
//       "TPMS",
//       "360 Degree Camera",
//       "Automatic Climate Control",
//       "Digital Driver Display",
//       "Connected Car Technology",
//       "Large Touchscreen Infotainment",
//       "Wireless Android Auto",
//       "Wireless Apple CarPlay",
//       "Cruise Control",
//       "Panoramic Sunroof",
//       "Alloy Wheels",
//       "Ventilated Front Seats",
//       "ADAS",
//       "Adaptive Cruise Control",
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
//     console.log("🚙 EVINSIGHTS - ADD TATA SIERRA EV");
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
//        3. CLEAN EXISTING SIERRA EV DATA
//     ===================================================== */

//     console.log("\n🧹 Cleaning existing Tata Sierra EV data...");

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

//     console.log("   ✅ Existing Sierra EV data cleaned");

//     /* =====================================================
//        4. VEHICLE DATA
//     ===================================================== */

//     console.log("\n🚙 Inserting Tata Sierra EV...");

//     const vehiclePayload = {
//       name: "Tata Sierra EV",
//       model: "Sierra EV",
//       brand: "Tata Motors",
//       brandId: BRAND_ID,

//       source: SOURCE,
//       sourceUrl: SOURCE_URL,

//       batteryCapacity: 65,
//       batteryCapacityKwh: 65,
//       batteryKwh: 65,

//       batteryOptions: [
//         65,
//       ],

//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium-ion",
//       batteryChemistry: "Lithium-ion",

//       range: 489,
//       rangeKm: 489,
//       batteryRange: 489,

//       rangeOptions: [
//         489,
//       ],

//       rangeUnit: "km",

//       motorPower: 160,
//       motorPowerKw: 160,

//       powerKw: 160,
//       power: 160,

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous Motor",

//       maxTorque: 300,
//       torque: 300,
//       torqueNm: 300,

//       torqueUnit: "Nm",

//       transmission: "Automatic",
//       transmissionType: "Automatic",

//       gearbox: "1-Speed",

//       driveType: "FWD",
//       drivetrain: "FWD",

//       chargingPort: "CCS-II",

//       chargerType:
//         "CCS2 (DC)/Type 2 (AC)",

//       seats: 5,
//       seatingCapacity: 5,

//       bodyType: "SUV",
//       fuelType: "Electric",

//       length: 4300,
//       lengthMm: 4300,

//       width: 1830,
//       widthMm: 1830,

//       height: 1650,
//       heightMm: 1650,

//       wheelbase: 2700,
//       wheelbaseMm: 2700,

//       bootSpace: 622,
//       bootCapacity: 622,
//       bootCapacityLitres: 622,

//       turningRadius: 5.5,
//       turningRadiusUnit: "m",

//       priceMin: 2100000,
//       priceMax: 2700000,

//       currency: "INR",
//       currencyCode: "INR",
//       currencySymbol: "₹",

//       rating: 4.5,
//       reviewCount: 0,

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

//         "Tata Sierra EV",

//         "tata-sierra-ev",

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
//           launched: false,
//           available: true,
//         }),

//         JSON.stringify({
//           title: "Tata Sierra EV",
//           slug: "tata-sierra-ev",

//           description:
//             "Tata Sierra EV electric SUV with a 65 kWh battery, automatic transmission, electric drivetrain and approximately 489 km range.",
//         }),

//         JSON.stringify({
//           ...vehiclePayload,

//           specs: {
//             battery: 65,
//             batteryOptions: [65],

//             range: 489,
//             rangeOptions: [489],

//             power: 160,

//             torque: 300,
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

//         4.5,

//         0,

//         JSON.stringify(vehiclePayload),

//         now,
//       ]
//     );

//     console.log("   ✅ Tata Sierra EV inserted");

//     /* =====================================================
//        5. VARIANTS + PRICING
//     ===================================================== */

//     console.log("\n📦 Inserting Sierra EV variants...");

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

//             batteryKwh:
//               variant.battery,

//             range:
//               variant.range,

//             rangeKm:
//               variant.range,

//             motorPower: 160,

//             motorPowerKw: 160,

//             motorType:
//               "Permanent Magnet Synchronous Motor",

//             maxTorque: 300,

//             torqueNm: 300,

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
//        6. BATTERY SPECIFICATION
//     ===================================================== */

//     console.log("\n⚙️ Inserting specifications...");

//     const batteryData = {
//       batteryCapacity: 65,

//       batteryCapacityKwh: 65,

//       batteryKwh: 65,

//       batteryOptions: [
//         65,
//       ],

//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium-ion",

//       batteryChemistry: "Lithium-ion",

//       range: 489,

//       rangeKm: 489,

//       rangeOptions: [
//         489,
//       ],

//       rangeUnit: "km",

//       chargingPort: "CCS-II",

//       chargerType:
//         "CCS2 (DC)/Type 2 (AC)",

//       charging: {
//         fastCharging: true,

//         chargingOptions: [
//           "7.2 kW AC",
//           "DC Fast Charging",
//         ],
//       },
//     };

//     /* =====================================================
//        7. PERFORMANCE
//     ===================================================== */

//     const performanceData = {
//       motorPower: 160,

//       motorPowerKw: 160,

//       powerKw: 160,

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous Motor",

//       maxTorque: 300,

//       torque: 300,

//       torqueNm: 300,

//       torqueUnit: "Nm",

//       transmission: "Automatic",

//       transmissionType: "Automatic",

//       gearbox: "1-Speed",

//       driveType: "FWD",

//       drivetrain: "FWD",

//       regenerativeBraking: true,

//       chargingPort: "CCS-II",

//       suspensionSteeringBrakes: {
//         frontSuspension:
//           "MacPherson Strut",

//         rearSuspension:
//           "Multi-link",

//         steeringType:
//           "Electric",

//         turningRadius:
//           5.5,

//         turningRadiusUnit:
//           "m",

//         frontBrakeType:
//           "Disc",

//         rearBrakeType:
//           "Disc",
//       },
//     };

//     /* =====================================================
//        8. DIMENSIONS
//     ===================================================== */

//     const dimensionsData = {
//       length: 4300,
//       lengthMm: 4300,

//       width: 1830,
//       widthMm: 1830,

//       height: 1650,
//       heightMm: 1650,

//       wheelbase: 2700,
//       wheelbaseMm: 2700,

//       bootSpace: 622,

//       bootCapacity: 622,

//       bootCapacityLitres:
//         622,

//       seatingCapacity: 5,

//       seats: 5,

//       turningRadius: 5.5,

//       turningRadiusUnit: "m",
//     };

//     /* =====================================================
//        9. SAFETY
//     ===================================================== */

//     const safetyData = {
//       airbags: 6,

//       abs: true,

//       brakeAssist: true,

//       ebd: true,

//       tractionControl: true,

//       esc: true,

//       electronicStabilityControl:
//         true,

//       tpms: true,

//       rearParkingCamera:
//         "With Guidelines",

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

//       curtainAirbags: true,

//       surroundViewCamera:
//         "360 Degree Camera",

//       adas: true,

//       adaptiveCruiseControl: true,
//     };

//     /* =====================================================
//        10. FEATURES
//     ===================================================== */

//     const featuresData = {
//       comfortConvenience: {
//         powerSteering: true,

//         airConditioner: true,

//         heater: true,

//         automaticClimateControl:
//           true,

//         rearACVents: true,

//         cruiseControl: true,

//         keylessEntry: true,

//         engineStartStopButton:
//           true,

//         powerWindows:
//           "Front & Rear",

//         realTimeVehicleTracking:
//           true,

//         connectedCarTechnology:
//           true,

//         driveModes: true,

//         panoramicSunroof: true,
//       },

//       interior: {
//         digitalCluster: true,

//         premiumUpholstery: true,

//         ambientLighting: true,

//         digitalInstrumentCluster:
//           true,
//       },

//       exterior: {
//         alloyWheels: true,

//         LEDHeadlamps: true,

//         LEDDRLs: true,

//         automaticHeadlamps:
//           true,

//         rainSensingWiper:
//           true,

//         rearWindowWiper:
//           true,

//         rearSpoiler:
//           true,

//         electricallyAdjustableORVM:
//           true,
//       },

//       entertainmentCommunication: {
//         bluetoothConnectivity:
//           true,

//         touchscreen:
//           true,

//         androidAuto:
//           true,

//         appleCarPlay:
//           true,

//         wirelessAndroidAuto:
//           true,

//         wirelessAppleCarPlay:
//           true,

//         USBPorts:
//           true,

//         premiumAudio:
//           true,
//       },

//       adas: {
//         adaptiveCruiseControl:
//           true,

//         laneKeepAssist:
//           true,

//         laneDepartureWarning:
//           true,

//         blindSpotMonitor:
//           true,

//         forwardCollisionWarning:
//           true,

//         autonomousEmergencyBraking:
//           true,
//       },

//       advancedInternetFeatures: {
//         liveLocation:
//           true,

//         remoteVehicleStatusCheck:
//           true,

//         OTAUpdates:
//           true,

//         remoteACOnOff:
//           true,

//         remoteDoorLockUnlock:
//           true,

//         geoFenceAlert:
//           true,
//       },
//     };

//     /* =====================================================
//        INSERT SPECIFICATION
//     ===================================================== */

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
//        11. CHARGING
//     ===================================================== */

//     console.log(
//       "\n🔋 Inserting charging data..."
//     );

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

//           fastCharging:
//             true,

//           chargingStandard:
//             "CCS-II",

//           chargerType:
//             "CCS2 (DC)/Type 2 (AC)",

//           chargingOptions: [
//             "7.2 kW AC",
//             "DC Fast Charging",
//           ],

//           acPowerKw: 7.2,

//           portableCharging:
//             "15 A Plug Point",
//         }),

//         JSON.stringify({
//           source: SOURCE,

//           sourceUrl: SOURCE_URL,
//         }),
//       ]
//     );

//     console.log(
//       "   ✅ Charging data inserted"
//     );

//     /* =====================================================
//        12. MEDIA
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

//         "Tata Sierra EV front left side",

//         JSON.stringify({
//           source: SOURCE,

//           sourceUrl: SOURCE_URL,

//           role: "primary",
//         }),
//       ]
//     );

//     console.log(
//       "   ✅ Main image inserted"
//     );

//     /* =====================================================
//        13. VERIFY
//     ===================================================== */

//     console.log(
//       "\n🔎 Verifying Tata Sierra EV..."
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
//         SELECT type
//         FROM specifications
//         WHERE vehicle_id = $1
//         ORDER BY type
//         `,
//         [VEHICLE_ID]
//       );

//     const chargingCheck =
//       await client.query(
//         `
//         SELECT id
//         FROM charging
//         WHERE vehicle_id = $1
//         `,
//         [VEHICLE_ID]
//       );

//     const mediaCheck =
//       await client.query(
//         `
//         SELECT id
//         FROM media
//         WHERE vehicle_id = $1
//         `,
//         [VEHICLE_ID]
//       );

//     if (!vehicleCheck.rows.length) {
//       throw new Error(
//         "Verification failed: vehicle missing."
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
//           `Verification failed: missing ${type}.`
//         );
//       }
//     }

//     if (!chargingCheck.rows.length) {
//       throw new Error(
//         "Verification failed: charging missing."
//       );
//     }

//     if (!mediaCheck.rows.length) {
//       throw new Error(
//         "Verification failed: media missing."
//       );
//     }

//     const payload =
//       vehicleCheck.rows[0].payload;

//     console.log("\n   Vehicle:");
//     console.log(
//       "   ",
//       vehicleCheck.rows[0].name
//     );

//     console.log(
//       "   Battery:",
//       payload.batteryCapacity,
//       "kWh"
//     );

//     console.log(
//       "   Range:",
//       payload.range,
//       "km"
//     );

//     console.log(
//       "   Power:",
//       payload.motorPower,
//       "kW"
//     );

//     console.log(
//       "   Torque:",
//       payload.maxTorque,
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
//        14. COMMIT
//     ===================================================== */

//     await client.query("COMMIT");

//     console.log(
//       "\n================================================="
//     );

//     console.log(
//       "🎉 TATA SIERRA EV INSERT COMPLETED"
//     );

//     console.log(
//       "================================================="
//     );

//     console.log(
//       "Vehicle        : Tata Sierra EV"
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
//       "Battery        : 65 kWh"
//     );

//     console.log(
//       "Range          : 489 km"
//     );

//     console.log(
//       "Motor Power    : 160 kW"
//     );

//     console.log(
//       "Torque         : 300 Nm"
//     );

//     console.log(
//       "Price range    : ₹21L - ₹27L"
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
//       "\n❌ SIERRA EV INSERT FAILED"
//     );

//     console.error(
//       "Transaction rolled back."
//     );

//     console.error(error);

//     console.error(
//       "\n⚠️ No partial Sierra EV data was saved."
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

const VEHICLE_ID = "tata-harrier-ev";
const BRAND_ID = "tata";
const MARKET_ID = "india";

const SOURCE = "CarDekho";

const SOURCE_URL =
  "https://www.cardekho.com/tata/harrier-ev";

const IMAGE_URL =
  "https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier-EV/12037/1750239508311/front-left-side-47.jpg";

/* =========================================================
   VARIANTS
========================================================= */

const variants = [
  {
    id: "tata-harrier-ev-adventure-65",
    name: "Tata Harrier EV Adventure 65",
    price: 2169000,
    battery: 65,
    range: 538,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "Rear Parking Camera",
      "Parking Sensors",
      "Automatic Climate Control",
      "Digital Instrument Cluster",
      "Connected Car Technology",
      "Cruise Control",
      "LED Headlamps",
      "LED DRLs",
      "Touchscreen Infotainment",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
    ],
  },

  {
    id: "tata-harrier-ev-adventure-65-acfc",
    name: "Tata Harrier EV Adventure 65 ACFC",
    price: 2218000,
    battery: 65,
    range: 538,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "Rear Parking Camera",
      "Parking Sensors",
      "Automatic Climate Control",
      "Digital Instrument Cluster",
      "Connected Car Technology",
      "Cruise Control",
      "LED Headlamps",
      "LED DRLs",
      "Touchscreen Infotainment",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "7.2 kW AC Fast Charger",
    ],
  },

  {
    id: "tata-harrier-ev-adventure-s-65",
    name: "Tata Harrier EV Adventure S 65",
    price: 2219000,
    battery: 65,
    range: 538,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "Rear Parking Camera",
      "Parking Sensors",
      "Automatic Climate Control",
      "Digital Instrument Cluster",
      "Connected Car Technology",
      "Cruise Control",
      "Panoramic Sunroof",
      "LED Headlamps",
      "LED DRLs",
      "Touchscreen Infotainment",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
    ],
  },

  {
    id: "tata-harrier-ev-adventure-s-65-acfc",
    name: "Tata Harrier EV Adventure S 65 ACFC",
    price: 2268000,
    battery: 65,
    range: 538,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "Rear Parking Camera",
      "Parking Sensors",
      "Automatic Climate Control",
      "Digital Instrument Cluster",
      "Connected Car Technology",
      "Cruise Control",
      "Panoramic Sunroof",
      "LED Headlamps",
      "LED DRLs",
      "Touchscreen Infotainment",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "7.2 kW AC Fast Charger",
    ],
  },

  {
    id: "tata-harrier-ev-fearless-plus-65",
    name: "Tata Harrier EV Fearless Plus 65",
    price: 2419000,
    battery: 65,
    range: 538,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "Parking Sensors",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "Powered Driver Seat",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Digital Instrument Cluster",
      "Connected Car Technology",
      "JBL Audio System",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
    ],
  },

  {
    id: "tata-harrier-ev-fearless-plus-65-acfc",
    name: "Tata Harrier EV Fearless Plus 65 ACFC",
    price: 2468000,
    battery: 65,
    range: 538,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "Parking Sensors",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "Powered Driver Seat",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Digital Instrument Cluster",
      "Connected Car Technology",
      "JBL Audio System",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "7.2 kW AC Fast Charger",
    ],
  },

  {
    id: "tata-harrier-ev-fearless-plus-75",
    name: "Tata Harrier EV Fearless Plus 75",
    price: 2568000,
    battery: 75,
    range: 627,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "Parking Sensors",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "Powered Driver Seat",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Digital Instrument Cluster",
      "Connected Car Technology",
      "JBL Audio System",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
    ],
  },

  {
    id: "tata-harrier-ev-fearless-plus-75-acfc",
    name: "Tata Harrier EV Fearless Plus 75 ACFC",
    price: 2617000,
    battery: 75,
    range: 627,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "Parking Sensors",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "Powered Driver Seat",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Digital Instrument Cluster",
      "Connected Car Technology",
      "JBL Audio System",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "7.2 kW AC Fast Charger",
    ],
  },

  {
    id: "tata-harrier-ev-fearless-plus-qwd-75",
    name: "Tata Harrier EV Fearless Plus QWD 75",
    price: 2919000,
    battery: 75,
    range: 622,
    powerKw: 291,
    driveType: "QWD",
    torque: 504,
    features: [
      "Dual Motor",
      "Quad Wheel Drive",
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "Parking Sensors",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "Powered Driver Seat",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Digital Instrument Cluster",
      "Connected Car Technology",
      "JBL 10 Speaker Audio System",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "All Wheel Drive",
      "Off Road Mode",
    ],
  },

  {
    id: "tata-harrier-ev-fearless-plus-qwd-75-acfc",
    name: "Tata Harrier EV Fearless Plus QWD 75 ACFC",
    price: 2968000,
    battery: 75,
    range: 622,
    powerKw: 291,
    driveType: "QWD",
    torque: 504,
    features: [
      "Dual Motor",
      "Quad Wheel Drive",
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "Parking Sensors",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "Powered Driver Seat",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Digital Instrument Cluster",
      "Connected Car Technology",
      "JBL 10 Speaker Audio System",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "All Wheel Drive",
      "Off Road Mode",
      "7.2 kW AC Fast Charger",
    ],
  },

  {
    id: "tata-harrier-ev-empowered-75",
    name: "Tata Harrier EV Empowered 75",
    price: 3036000,
    battery: 75,
    range: 627,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "6 Way Powered Driver Seat",
      "4 Way Powered Co-driver Seat",
      "Driver Seat Memory",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Ambient Lighting",
      "JBL Audio System",
      "Connected Car Technology",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
    ],
  },

  {
    id: "tata-harrier-ev-empowered-75-acfc",
    name: "Tata Harrier EV Empowered 75 ACFC",
    price: 3085000,
    battery: 75,
    range: 627,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "6 Way Powered Driver Seat",
      "4 Way Powered Co-driver Seat",
      "Driver Seat Memory",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Ambient Lighting",
      "JBL Audio System",
      "Connected Car Technology",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "7.2 kW AC Fast Charger",
    ],
  },

  {
    id: "tata-harrier-ev-empowered-75-stealth",
    name: "Tata Harrier EV Empowered 75 Stealth",
    price: 3118000,
    battery: 75,
    range: 627,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "Stealth Edition",
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "6 Way Powered Driver Seat",
      "4 Way Powered Co-driver Seat",
      "Driver Seat Memory",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Ambient Lighting",
      "JBL Audio System",
      "Connected Car Technology",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
    ],
  },

  {
    id: "tata-harrier-ev-empowered-75-stealth-acfc",
    name: "Tata Harrier EV Empowered 75 Stealth ACFC",
    price: 3167000,
    battery: 75,
    range: 627,
    powerKw: 175,
    driveType: "RWD",
    features: [
      "Stealth Edition",
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "6 Way Powered Driver Seat",
      "4 Way Powered Co-driver Seat",
      "Driver Seat Memory",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Ambient Lighting",
      "JBL Audio System",
      "Connected Car Technology",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "7.2 kW AC Fast Charger",
    ],
  },

  {
    id: "tata-harrier-ev-empowered-qwd-75",
    name: "Tata Harrier EV Empowered QWD 75",
    price: 3199000,
    battery: 75,
    range: 622,
    powerKw: 291,
    driveType: "QWD",
    torque: 504,
    features: [
      "Dual Motor",
      "Quad Wheel Drive",
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "6 Way Powered Driver Seat",
      "4 Way Powered Co-driver Seat",
      "Driver Seat Memory",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Ambient Lighting",
      "JBL 10 Speaker Audio System",
      "Connected Car Technology",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "All Wheel Drive",
      "Off Road Mode",
    ],
  },

  {
    id: "tata-harrier-ev-empowered-qwd-75-acfc",
    name: "Tata Harrier EV Empowered QWD 75 ACFC",
    price: 3248000,
    battery: 75,
    range: 622,
    powerKw: 291,
    driveType: "QWD",
    torque: 504,
    features: [
      "Dual Motor",
      "Quad Wheel Drive",
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "6 Way Powered Driver Seat",
      "4 Way Powered Co-driver Seat",
      "Driver Seat Memory",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Ambient Lighting",
      "JBL 10 Speaker Audio System",
      "Connected Car Technology",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "All Wheel Drive",
      "Off Road Mode",
      "7.2 kW AC Fast Charger",
    ],
  },

  {
    id: "tata-harrier-ev-empowered-qwd-75-stealth",
    name: "Tata Harrier EV Empowered QWD 75 Stealth",
    price: 3281000,
    battery: 75,
    range: 622,
    powerKw: 291,
    driveType: "QWD",
    torque: 504,
    features: [
      "Stealth Edition",
      "Dual Motor",
      "Quad Wheel Drive",
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "6 Way Powered Driver Seat",
      "4 Way Powered Co-driver Seat",
      "Driver Seat Memory",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Ambient Lighting",
      "JBL 10 Speaker Audio System",
      "Connected Car Technology",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "All Wheel Drive",
      "Off Road Mode",
    ],
  },

  {
    id: "tata-harrier-ev-empowered-qwd-75-stealth-acfc",
    name: "Tata Harrier EV Empowered QWD 75 Stealth ACFC",
    price: 3330000,
    battery: 75,
    range: 622,
    powerKw: 291,
    driveType: "QWD",
    torque: 504,
    features: [
      "Stealth Edition",
      "Dual Motor",
      "Quad Wheel Drive",
      "6 Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "TPMS",
      "360 Degree Camera",
      "ADAS",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Autonomous Emergency Braking",
      "Ventilated Front Seats",
      "6 Way Powered Driver Seat",
      "4 Way Powered Co-driver Seat",
      "Driver Seat Memory",
      "Dual Zone Automatic Climate Control",
      "Panoramic Sunroof",
      "Ambient Lighting",
      "JBL 10 Speaker Audio System",
      "Connected Car Technology",
      "Wireless Android Auto",
      "Wireless Apple CarPlay",
      "All Wheel Drive",
      "Off Road Mode",
      "7.2 kW AC Fast Charger",
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
    console.log("🚙 EVINSIGHTS - ADD TATA HARRIER EV");
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
       3. CLEAN EXISTING HARRIER EV DATA
    ===================================================== */

    console.log("\n🧹 Cleaning existing Tata Harrier EV data...");

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

    console.log("   ✅ Existing Harrier EV data cleaned");

    /* =====================================================
       4. VEHICLE DATA
    ===================================================== */

    console.log("\n🚙 Inserting Tata Harrier EV...");

    const vehiclePayload = {
      name: "Tata Harrier EV",
      model: "Harrier EV",
      brand: "Tata Motors",
      brandId: BRAND_ID,

      source: SOURCE,
      sourceUrl: SOURCE_URL,

      batteryCapacity: 75,
      batteryCapacityKwh: 75,
      batteryKwh: 75,

      batteryOptions: [65, 75],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-ion",
      batteryChemistry: "Lithium-ion",

      range: 627,
      rangeKm: 627,
      batteryRange: 627,

      rangeOptions: [
        538,
        627,
        622,
      ],

      rangeUnit: "km",

      motorPower: 175,
      motorPowerKw: 175,

      powerKw: 175,
      power: 175,

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous Motor",

      maxTorque: 315,
      torque: 315,
      torqueNm: 315,

      torqueUnit: "Nm",

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "Single Speed",

      driveType: "RWD",
      drivetrain: "RWD",

      chargingPort: "CCS-II",

      chargerType:
        "CCS2 (DC)/Type 2 (AC)",

      seats: 5,
      seatingCapacity: 5,

      bodyType: "SUV",
      fuelType: "Electric",

      length: 4607,
      lengthMm: 4607,

      width: 2132,
      widthMm: 2132,

      height: 1740,
      heightMm: 1740,

      wheelbase: 2741,
      wheelbaseMm: 2741,

      bootSpace: 502,
      bootCapacity: 502,
      bootCapacityLitres: 502,

      frunk: 67,
      frunkCapacityLitres: 67,

      turningRadius: 5.75,
      turningRadiusUnit: "m",

      priceMin: 2169000,
      priceMax: 3043000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      rating: 4.8,
      reviewCount: 74,

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

        "Tata Harrier EV",

        "tata-harrier-ev",

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
          title: "Tata Harrier EV",
          slug: "tata-harrier-ev",

          description:
            "Tata Harrier EV is a premium electric SUV available with 65 kWh and 75 kWh battery options, RWD and QWD drivetrains, and up to 627 km MIDC range.",
        }),

        JSON.stringify({
          ...vehiclePayload,

          specs: {
            battery: 75,
            batteryOptions: [65, 75],

            range: 627,
            rangeOptions: [
              538,
              627,
              622,
            ],

            power: 175,

            torque: 315,
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

        74,

        JSON.stringify(vehiclePayload),

        now,
      ]
    );

    console.log("   ✅ Tata Harrier EV inserted");

    /* =====================================================
       5. VARIANTS + PRICING
    ===================================================== */

    console.log("\n📦 Inserting Harrier EV variants...");

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

            batteryKwh:
              variant.battery,

            range:
              variant.range,

            rangeKm:
              variant.range,

            motorPower:
              variant.powerKw,

            motorPowerKw:
              variant.powerKw,

            motorType:
              "Permanent Magnet Synchronous Motor",

            maxTorque:
              variant.torque || 315,

            torqueNm:
              variant.torque || 315,

            transmission:
              "Automatic",

            transmissionType:
              "Automatic",

            gearbox:
              "Single Speed",

            driveType:
              variant.driveType,

            drivetrain:
              variant.driveType,

            fuelType:
              "Electric",

            chargingPort:
              "CCS-II",

            features:
              variant.features,
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
            price:
              variant.price,

            amount:
              variant.price,

            currency:
              "INR",

            currencyCode:
              "INR",

            currencySymbol:
              "₹",

            market:
              "India",

            source:
              SOURCE,

            sourceUrl:
              SOURCE_URL,
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
       6. BATTERY SPECIFICATION
    ===================================================== */

    console.log(
      "\n⚡ Inserting battery specification..."
    );

    const batteryData = {
      batteryCapacity: 75,

      batteryCapacityKwh: 75,

      batteryKwh: 75,

      batteryOptions: [
        65,
        75,
      ],

      batteryCapacityUnit:
        "kWh",

      batteryType:
        "Lithium-ion",

      batteryChemistry:
        "Lithium-ion",

      range: 627,

      rangeKm: 627,

      rangeOptions: [
        538,
        627,
        622,
      ],

      rangeUnit:
        "km",

      chargingPort:
        "CCS-II",

      chargerType:
        "CCS2 (DC)/Type 2 (AC)",

      charging: {
        fastCharging: true,

        chargingOptions: [
          "7.2 kW AC",
          "DC Fast Charging",
        ],
      },
    };

    /* =====================================================
       7. PERFORMANCE
    ===================================================== */

    const performanceData = {
      motorPower: 175,

      motorPowerKw: 175,

      powerKw: 175,

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous Motor",

      maxTorque: 315,

      torque: 315,

      torqueNm: 315,

      torqueUnit: "Nm",

      qwdPowerKw: 291,

      qwdPowerPs: 396,

      qwdTorqueNm: 504,

      transmission:
        "Automatic",

      transmissionType:
        "Automatic",

      gearbox:
        "Single Speed",

      driveType:
        "RWD / QWD",

      drivetrain:
        "RWD / QWD",

      regenerativeBraking:
        true,

      regenerativeBrakingModes:
        4,

      chargingPort:
        "CCS-II",

      suspensionSteeringBrakes: {
        frontSuspension:
          "Independent Front Suspension with McPherson Strut and Stabilizer Bar",

        rearSuspension:
          "Independent Rear Suspension",

        steeringType:
          "Electrically Power Assisted",

        turningRadius:
          5.75,

        turningRadiusUnit:
          "m",

        frontBrakeType:
          "Disc",

        rearBrakeType:
          "Disc",
      },
    };

    /* =====================================================
       8. DIMENSIONS
    ===================================================== */

    const dimensionsData = {
      length: 4607,
      lengthMm: 4607,

      width: 2132,
      widthMm: 2132,

      height: 1740,
      heightMm: 1740,

      wheelbase: 2741,
      wheelbaseMm: 2741,

      bootSpace: 502,

      bootCapacity: 502,

      bootCapacityLitres:
        502,

      frunk:
        67,

      frunkCapacityLitres:
        67,

      seatingCapacity:
        5,

      seats:
        5,

      turningRadius:
        5.75,

      turningRadiusUnit:
        "m",

      waterWadingCapacity:
        600,
    };

    /* =====================================================
       9. SAFETY
    ===================================================== */

    const safetyData = {
      bharatNCAP:
        "5 Star",

      airbags:
        6,

      abs:
        true,

      brakeAssist:
        true,

      ebd:
        true,

      tractionControl:
        true,

      esc:
        true,

      electronicStabilityControl:
        true,

      tpms:
        true,

      rearParkingCamera:
        "With Guidelines",

      parkingSensors:
        true,

      rearParkingSensors:
        true,

      isofix:
        true,

      hillAssist:
        true,

      centralLocking:
        true,

      childSafetyLocks:
        true,

      antiTheftDevice:
        true,

      driverAirbag:
        true,

      passengerAirbag:
        true,

      sideAirbag:
        true,

      curtainAirbags:
        true,

      surroundViewCamera:
        "360 Degree Camera",

      adas:
        true,

      adaptiveCruiseControl:
        true,

      laneKeepAssist:
        true,

      laneDepartureWarning:
        true,

      blindSpotMonitor:
        true,

      forwardCollisionWarning:
        true,

      autonomousEmergencyBraking:
        true,
    };

    /* =====================================================
       10. FEATURES
    ===================================================== */

    const featuresData = {
      comfortConvenience: {
        powerSteering:
          true,

        airConditioner:
          true,

        heater:
          true,

        automaticClimateControl:
          true,

        dualZoneClimateControl:
          true,

        rearACVents:
          true,

        cruiseControl:
          true,

        adaptiveCruiseControl:
          true,

        keylessEntry:
          true,

        engineStartStopButton:
          true,

        powerWindows:
          "Front & Rear",

        connectedCarTechnology:
          true,

        driveModes:
          true,

        panoramicSunroof:
          true,

        ventilatedFrontSeats:
          true,

        poweredDriverSeat:
          true,
      },

      interior: {
        digitalCluster:
          true,

        digitalInstrumentCluster:
          true,

        premiumUpholstery:
          true,

        ambientLighting:
          true,

        poweredSeats:
          true,
      },

      exterior: {
        alloyWheels:
          true,

        LEDHeadlamps:
          true,

        LEDDRLs:
          true,

        automaticHeadlamps:
          true,

        rainSensingWiper:
          true,

        rearWindowWiper:
          true,

        rearSpoiler:
          true,

        electricallyAdjustableORVM:
          true,
      },

      entertainmentCommunication: {
        bluetoothConnectivity:
          true,

        touchscreen:
          true,

        androidAuto:
          true,

        appleCarPlay:
          true,

        wirelessAndroidAuto:
          true,

        wirelessAppleCarPlay:
          true,

        USBPorts:
          true,

        premiumAudio:
          true,

        JBLAudio:
          true,
      },

      adas: {
        adaptiveCruiseControl:
          true,

        laneKeepAssist:
          true,

        laneDepartureWarning:
          true,

        blindSpotMonitor:
          true,

        forwardCollisionWarning:
          true,

        autonomousEmergencyBraking:
          true,

        trafficSignRecognition:
          true,
      },

      advancedInternetFeatures: {
        liveLocation:
          true,

        remoteVehicleStatusCheck:
          true,

        OTAUpdates:
          true,

        remoteACOnOff:
          true,

        remoteDoorLockUnlock:
          true,

        geoFenceAlert:
          true,
      },
    };

    /* =====================================================
       INSERT SPECIFICATION
    ===================================================== */

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
            source:
              SOURCE,

            sourceUrl:
              SOURCE_URL,

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
       11. CHARGING
    ===================================================== */

    console.log(
      "\n🔋 Inserting charging data..."
    );

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

          fastCharging:
            true,

          chargingStandard:
            "CCS-II",

          chargerType:
            "CCS2 (DC)/Type 2 (AC)",

          chargingOptions: [
            "7.2 kW AC",
            "DC Fast Charging",
          ],

          acPowerKw:
            7.2,

          chargingTime:
            "20-80% approximately 25 minutes",

          portableCharging:
            "15 A Plug Point",
        }),

        JSON.stringify({
          source:
            SOURCE,

          sourceUrl:
            SOURCE_URL,
        }),
      ]
    );

    console.log(
      "   ✅ Charging data inserted"
    );

    /* =====================================================
       12. MEDIA
    ===================================================== */

    console.log(
      "\n🖼️ Inserting media..."
    );

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

        "Tata Harrier EV front left side",

        JSON.stringify({
          source:
            SOURCE,

          sourceUrl:
            SOURCE_URL,

          role:
            "primary",
        }),
      ]
    );

    console.log(
      "   ✅ Main image inserted"
    );

    /* =====================================================
       13. VERIFY
    ===================================================== */

    console.log(
      "\n🔎 Verifying Tata Harrier EV..."
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

    const pricingCheck =
      await client.query(
        `
        SELECT COUNT(*)::int AS count
        FROM pricing
        WHERE variant_id IN (
          SELECT id
          FROM variants
          WHERE vehicle_id = $1
        )
        `,
        [VEHICLE_ID]
      );

    const specificationCheck =
      await client.query(
        `
        SELECT type
        FROM specifications
        WHERE vehicle_id = $1
        ORDER BY type
        `,
        [VEHICLE_ID]
      );

    const chargingCheck =
      await client.query(
        `
        SELECT id
        FROM charging
        WHERE vehicle_id = $1
        `,
        [VEHICLE_ID]
      );

    const mediaCheck =
      await client.query(
        `
        SELECT id
        FROM media
        WHERE vehicle_id = $1
        `,
        [VEHICLE_ID]
      );

    if (!vehicleCheck.rows.length) {
      throw new Error(
        "Verification failed: vehicle missing."
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

    if (
      Number(
        pricingCheck.rows[0]?.count || 0
      ) !== variants.length
    ) {
      throw new Error(
        `Verification failed: expected ${variants.length} pricing records.`
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
          `Verification failed: missing ${type}.`
        );
      }
    }

    if (!chargingCheck.rows.length) {
      throw new Error(
        "Verification failed: charging missing."
      );
    }

    if (!mediaCheck.rows.length) {
      throw new Error(
        "Verification failed: media missing."
      );
    }

    const payload =
      vehicleCheck.rows[0].payload;

    console.log("\n   Vehicle:");
    console.log(
      "   ",
      vehicleCheck.rows[0].name
    );

    console.log(
      "   Battery:",
      payload.batteryCapacity,
      "kWh"
    );

    console.log(
      "   Battery options:",
      payload.batteryOptions.join(", "),
      "kWh"
    );

    console.log(
      "   Range:",
      payload.range,
      "km"
    );

    console.log(
      "   Range options:",
      payload.rangeOptions.join(", "),
      "km"
    );

    console.log(
      "   Power:",
      payload.motorPower,
      "kW"
    );

    console.log(
      "   Torque:",
      payload.maxTorque,
      "Nm"
    );

    console.log(
      "   Variants:",
      variantCheck.rows[0].count
    );

    console.log(
      "   Pricing:",
      pricingCheck.rows[0].count
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
       14. COMMIT
    ===================================================== */

    await client.query("COMMIT");

    console.log(
      "\n================================================="
    );

    console.log(
      "🎉 TATA HARRIER EV INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle        : Tata Harrier EV"
    );

    console.log(
      "Variants       :",
      variants.length
    );

    console.log(
      "Pricing        :",
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
      "Battery        : 65 / 75 kWh"
    );

    console.log(
      "Range          : 538 / 627 / 622 km"
    );

    console.log(
      "RWD Power      : 175 kW"
    );

    console.log(
      "QWD Power      : 291 kW"
    );

    console.log(
      "QWD Torque     : 504 Nm"
    );

    console.log(
      "Price range    : ₹21.69L - ₹33.30L"
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
      "\n❌ HARRIER EV INSERT FAILED"
    );

    console.error(
      "Transaction rolled back."
    );

    console.error(error);

    console.error(
      "\n⚠️ No partial Harrier EV data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();