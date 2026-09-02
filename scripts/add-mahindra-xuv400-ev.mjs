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

// const VEHICLE_ID = "mahindra-xuv400-ev";
// const BRAND_ID = "mahindra";
// const MARKET_ID = "india";

// const IMAGE_URL = null;

// const SOURCE = "CarDekho";
// const SOURCE_URL =
//   "https://www.cardekho.com/mahindra/xuv400-ev";

// /* =========================================================
//    VARIANTS
// ========================================================= */

// const variants = [
//   {
//     id: "mahindra-xuv400-ev-ec-pro-34-5",
//     name: "XUV400 EV EC Pro 34.5 kWh",
//     price: 1549000,
//     battery: 34.5,
//     range: 375,
//     charger: "3.3 kW AC",
//     features: [
//       "6 Airbags",
//       "Electronic Stability Control",
//       "ABS with EBD",
//       "Hill Hold Assist",
//       "Hill Descent Control",
//       "ISOFIX Child Seat Anchors",
//       "Rear Parking Sensors",
//       "Rear Parking Camera",
//       "Tyre Pressure Monitoring System",
//       "Automatic Climate Control",
//       "Cruise Control",
//       "Drive Modes",
//       "Single Pedal Driving",
//       "CCS-II Charging",
//     ],
//   },

//   {
//     id: "mahindra-xuv400-ev-el-pro-34-5",
//     name: "XUV400 EV EL Pro 34.5 kWh",
//     price: 1674000,
//     battery: 34.5,
//     range: 375,
//     charger: "7.2 kW AC",
//     features: [
//       "6 Airbags",
//       "Electronic Stability Control",
//       "ABS with EBD",
//       "Hill Hold Assist",
//       "Hill Descent Control",
//       "ISOFIX Child Seat Anchors",
//       "Rear Parking Sensors",
//       "Rear Parking Camera",
//       "Front Parking Sensors",
//       "10.25-Inch Touchscreen Infotainment",
//       "10.25-Inch Digital Driver Display",
//       "Wireless Android Auto",
//       "Wireless Apple CarPlay",
//       "Dual-Zone Automatic Climate Control",
//       "Rear AC Vents",
//       "Cruise Control",
//       "Wireless Phone Charger",
//       "CCS-II Charging",
//     ],
//   },

//   {
//     id: "mahindra-xuv400-ev-el-pro-dt-34-5",
//     name: "XUV400 EV EL Pro DT 34.5 kWh",
//     price: 1694000,
//     battery: 34.5,
//     range: 375,
//     charger: "7.2 kW AC",
//     features: [
//       "6 Airbags",
//       "Electronic Stability Control",
//       "ABS with EBD",
//       "Hill Hold Assist",
//       "Hill Descent Control",
//       "ISOFIX Child Seat Anchors",
//       "Rear Parking Sensors",
//       "Rear Parking Camera",
//       "Front Parking Sensors",
//       "10.25-Inch Touchscreen Infotainment",
//       "10.25-Inch Digital Driver Display",
//       "Wireless Android Auto",
//       "Wireless Apple CarPlay",
//       "Dual-Zone Automatic Climate Control",
//       "Rear AC Vents",
//       "Cruise Control",
//       "Wireless Phone Charger",
//       "Dual-Tone Exterior",
//       "CCS-II Charging",
//     ],
//   },

//   {
//     id: "mahindra-xuv400-ev-el-pro-39-4",
//     name: "XUV400 EV EL Pro 39.4 kWh",
//     price: 1749000,
//     battery: 39.4,
//     range: 456,
//     charger: "7.2 kW AC",
//     features: [
//       "6 Airbags",
//       "Electronic Stability Control",
//       "ABS with EBD",
//       "Hill Hold Assist",
//       "Hill Descent Control",
//       "ISOFIX Child Seat Anchors",
//       "Rear Parking Sensors",
//       "Rear Parking Camera",
//       "Front Parking Sensors",
//       "10.25-Inch Touchscreen Infotainment",
//       "10.25-Inch Digital Driver Display",
//       "Wireless Android Auto",
//       "Wireless Apple CarPlay",
//       "Dual-Zone Automatic Climate Control",
//       "Rear AC Vents",
//       "Cruise Control",
//       "Wireless Phone Charger",
//       "Panoramic Sunroof",
//       "CCS-II Charging",
//     ],
//   },

//   {
//     id: "mahindra-xuv400-ev-el-pro-dt-39-4",
//     name: "XUV400 EV EL Pro DT 39.4 kWh",
//     price: 1769000,
//     battery: 39.4,
//     range: 456,
//     charger: "7.2 kW AC",
//     features: [
//       "6 Airbags",
//       "Electronic Stability Control",
//       "ABS with EBD",
//       "Hill Hold Assist",
//       "Hill Descent Control",
//       "ISOFIX Child Seat Anchors",
//       "Rear Parking Sensors",
//       "Rear Parking Camera",
//       "Front Parking Sensors",
//       "10.25-Inch Touchscreen Infotainment",
//       "10.25-Inch Digital Driver Display",
//       "Wireless Android Auto",
//       "Wireless Apple CarPlay",
//       "Dual-Zone Automatic Climate Control",
//       "Rear AC Vents",
//       "Cruise Control",
//       "Wireless Phone Charger",
//       "Panoramic Sunroof",
//       "Dual-Tone Exterior",
//       "CCS-II Charging",
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
//     console.log("🚗 EVINSIGHTS - ADD MAHINDRA XUV400 EV");
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
//        3. CLEAN OLD XUV400 EV DATA
//     ===================================================== */

//     console.log(
//       "\n🧹 Cleaning existing Mahindra XUV400 EV records..."
//     );

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

//     console.log(
//       "   ✅ Existing Mahindra XUV400 EV data cleaned"
//     );

//     /* =====================================================
//        4. CANONICAL VEHICLE DATA
//     ===================================================== */

//     console.log("\n🚗 Inserting Mahindra XUV400 EV...");

//     const vehiclePayload = {
//       /* ---------------------------------------------------
//          IDENTITY
//       --------------------------------------------------- */

//       name: "Mahindra XUV400 EV",
//       model: "XUV400 EV",
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

//       batteryCapacity: 34.5,
//       batteryCapacityKwh: 34.5,
//       batteryKwh: 34.5,

//       batteryOptions: [
//         34.5,
//         39.4,
//       ],

//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium-ion",

//       batteryChemistry: "Lithium-ion",

//       /* ---------------------------------------------------
//          RANGE
//       --------------------------------------------------- */

//       range: 375,
//       rangeKm: 375,

//       araiRange: 375,
//       midcRange: 375,

//       rangeOptions: [
//         375,
//         456,
//       ],

//       rangeUnit: "km",

//       /* ---------------------------------------------------
//          MOTOR
//       --------------------------------------------------- */

//       motorPower: 110,
//       motorPowerKw: 110,

//       powerKw: 110,
//       power: 110,

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous Motor",

//       maxPower: 150,
//       maxPowerUnit: "PS",

//       maxPowerBhp: 148,
//       maxPowerBhpUnit: "bhp",

//       maxTorque: 310,
//       torque: 310,
//       torqueNm: 310,

//       torqueUnit: "Nm",

//       /* ---------------------------------------------------
//          DRIVETRAIN
//       --------------------------------------------------- */

//       transmission: "Automatic",
//       transmissionType: "Automatic",

//       gearbox: "Single-Speed",

//       driveType: "FWD",
//       drivetrain: "FWD",

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

//       length: 4200,
//       lengthMm: 4200,

//       width: 1821,
//       widthMm: 1821,

//       height: 1634,
//       heightMm: 1634,

//       wheelbase: 2600,
//       wheelbaseMm: 2600,

//       groundClearance: 200,
//       groundClearanceMm: 200,

//       bootSpace: 378,
//       bootCapacity: 378,
//       bootCapacityLitres: 378,

//       turningRadius: 5.3,
//       turningRadiusUnit: "m",

//       /* ---------------------------------------------------
//          CLASSIFICATION
//       --------------------------------------------------- */

//       bodyType: "SUV",
//       fuelType: "Electric",

//       /* ---------------------------------------------------
//          PRICE
//       --------------------------------------------------- */

//       priceMin: 1549000,
//       priceMax: 1769000,

//       currency: "INR",
//       currencyCode: "INR",
//       currencySymbol: "₹",

//       /* ---------------------------------------------------
//          RATING
//       --------------------------------------------------- */

//       rating: 4.5,
//       reviewCount: 269,

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

//         "Mahindra XUV400 EV",

//         "mahindra-xuv400-ev",

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
//           title: "Mahindra XUV400 EV",
//           slug: "mahindra-xuv400-ev",
//           description:
//             "Mahindra XUV400 EV electric SUV with 34.5 kWh and 39.4 kWh battery options, FWD electric powertrain and up to 456 km claimed MIDC range.",
//         }),

//         JSON.stringify({
//           ...vehiclePayload,

//           specs: {
//             battery: 34.5,

//             batteryOptions: [
//               34.5,
//               39.4,
//             ],

//             range: 375,

//             rangeOptions: [
//               375,
//               456,
//             ],

//             power: 110,

//             torque: 310,
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

//         269,

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
//       const motorPower = 110;

//       const maxPower = 150;

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

//             batteryCapacity: variant.battery,

//             batteryCapacityKwh:
//               variant.battery,

//             range: variant.range,

//             rangeKm: variant.range,

//             motorPower: motorPower,

//             motorPowerKw: motorPower,

//             maxPower: maxPower,

//             maxPowerUnit: "PS",

//             maxPowerBhp: 148,

//             maxTorque: 310,

//             torque: 310,

//             torqueNm: 310,

//             transmission: "Automatic",

//             transmissionType: "Automatic",

//             gearbox: "Single-Speed",

//             driveType: "FWD",

//             drivetrain: "FWD",

//             fuelType: "Electric",

//             charger: variant.charger,

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
//       batteryCapacity: 34.5,

//       batteryCapacityKwh: 34.5,

//       batteryKwh: 34.5,

//       batteryOptions: [
//         34.5,
//         39.4,
//       ],

//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium-ion",

//       batteryChemistry: "Lithium-ion",

//       range: 375,

//       rangeKm: 375,

//       rangeOptions: [
//         375,
//         456,
//       ],

//       rangeUnit: "km",

//       chargingPort: "CCS-II",

//       charging: {
//         acCharging:
//           "3.3 kW AC / 7.2 kW AC",

//         acCharging34_5:
//           "6 hours 30 minutes | 7.2 kW AC",

//         dcFastCharging:
//           "50 minutes up to 80%",

//         fastCharging: true,

//         chargingOptions: [
//           "3.3 kW AC",
//           "7.2 kW AC",
//           "DC Fast Charging",
//         ],

//         chargingStandard: "CCS-II",

//         batteryIPRating: "IP67",

//         liquidCooledBattery: true,
//       },
//     };

//     /* -----------------------------------------------------
//        PERFORMANCE
//     ----------------------------------------------------- */

//     const performanceData = {
//       motorPower: 110,

//       motorPowerKw: 110,

//       powerKw: 110,

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous Motor",

//       maxPower: 150,

//       maxPowerUnit: "PS",

//       maxPowerBhp: 148,

//       maxPowerBhpUnit: "bhp",

//       maxTorque: 310,

//       torque: 310,

//       torqueNm: 310,

//       torqueUnit: "Nm",

//       transmission: "Automatic",

//       transmissionType: "Automatic",

//       gearbox: "Single-Speed",

//       driveType: "FWD",

//       drivetrain: "FWD",

//       acceleration0To100: 8.3,

//       acceleration0To100Unit: "seconds",

//       regenerativeBraking: true,

//       driveModes: [
//         "Fun",
//         "Fast",
//         "Fearless",
//       ],

//       singlePedalDrive: true,

//       livelyMode: true,

//       suspensionSteeringBrakes: {
//         frontSuspension:
//           "MacPherson Strut",

//         rearSuspension:
//           "Twist Beam",

//         steeringType:
//           "Electric Power Steering",

//         frontBrakeType:
//           "Disc",

//         rearBrakeType:
//           "Disc",
//       },
//     };

//     /* -----------------------------------------------------
//        DIMENSIONS
//     ----------------------------------------------------- */

//     const dimensionsData = {
//       length: 4200,

//       lengthMm: 4200,

//       width: 1821,

//       widthMm: 1821,

//       height: 1634,

//       heightMm: 1634,

//       wheelbase: 2600,

//       wheelbaseMm: 2600,

//       bootSpace: 378,

//       bootCapacity: 378,

//       bootCapacityLitres: 378,

//       seatingCapacity: 5,

//       seats: 5,

//       groundClearance: 200,

//       groundClearanceMm: 200,

//       turningRadius: 5.3,

//       turningRadiusUnit: "m",

//       exterior: {
//         bodyType: "SUV",

//         projectorHeadlamps: true,

//         LEDDRLs: true,

//         LEDTaillights: true,

//         fogLights: true,

//         electricallyAdjustableORVMs: true,

//         electricallyFoldableORVMs: true,

//         alloyWheels: true,

//         tyreType: "Tubeless",

//         additionalFeatures: [
//           "Electric SUV Design",
//           "Roof Rails",
//           "Flush Door Handles",
//           "Projector Headlamps",
//         ],
//       },
//     };

//     /* -----------------------------------------------------
//        SAFETY
//     ----------------------------------------------------- */

//     const safetyData = {
//       airbags: 6,

//       abs: true,

//       brakeAssist: true,

//       ebd: true,

//       esc: true,

//       electronicStabilityControl: true,

//       hillHoldAssist: true,

//       hillDescentControl: true,

//       tpms: true,

//       electronicParkingBrake: true,

//       autoHold: true,

//       rearParkingCamera: true,

//       parkingSensors: true,

//       frontParkingSensors: true,

//       isofix: true,

//       discBrakesAllRound: true,

//       batteryIPRating: "IP67",

//       adas: {
//         available: false,

//         level: null,

//         features: [],
//       },
//     };

//     /* -----------------------------------------------------
//        FEATURES
//     ----------------------------------------------------- */

//     const featuresData = {
//       comfortConvenience: {
//         automaticClimateControl: true,

//         dualZoneClimateControl: true,

//         cruiseControl: true,

//         adaptiveCruiseControl: false,

//         poweredDriverSeat: true,

//         driverSeatMemory: false,

//         electricallyAdjustableORVMs: true,

//         electricallyFoldableORVMs: true,

//         pushButtonStart: true,

//         keylessEntry: true,

//         powerWindows: "All 4",

//         electronicParkingBrake: true,

//         autoHold: true,

//         rearACVents: true,

//         wirelessPhoneCharger: true,

//         driveModes: [
//           "Fun",
//           "Fast",
//           "Fearless",
//         ],

//         singlePedalDrive: true,
//       },

//       interior: {
//         digitalInstrumentCluster: true,

//         leatheretteUpholstery: true,

//         automaticClimateControl: true,

//         premiumCabin: true,

//         rearSeatBackrestRecline: true,
//       },

//       entertainmentCommunication: {
//         touchscreenSize:
//           "10.25 inch",

//         driverDisplaySize:
//           "10.25 inch",

//         androidAuto: true,

//         appleCarPlay: true,

//         wirelessAndroidAuto: true,

//         wirelessAppleCarPlay: true,

//         speakers: 4,

//         wirelessCharging: true,

//         usbCharging: true,

//         bluetooth: true,

//         connectedCarTechnology: true,
//       },

//       advancedInternetFeatures: {
//         connectedCarTechnology: true,

//         remoteLockUnlock: true,

//         remoteVehicleStatusCheck: true,

//         vehicleTracking: true,

//         remoteClimateControl: true,

//         OTAUpdates: true,

//         AdrenoxConnectedCar: true,

//         voiceCommands: true,

//         over50ConnectedFeatures: true,
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
//             "50 minutes up to 80% with DC fast charger",

//           acCharging:
//             "3.3 kW / 7.2 kW AC",

//           acCharging7_2Kw:
//             "6 hours 30 minutes",

//           dcCharging:
//             "Up to 80% in approximately 50 minutes",

//           chargingOptions: [
//             "3.3 kW AC",
//             "7.2 kW AC",
//             "DC Fast Charging",
//           ],

//           fastCharging: true,

//           acPowerKw: 7.2,

//           dcPowerKw: null,

//           chargingStandard: "CCS-II",

//           batteryIPRating: "IP67",
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

//           "Mahindra XUV400 EV front left side",

//           JSON.stringify({
//             source: SOURCE,

//             sourceUrl: SOURCE_URL,

//             role: "primary",
//           }),
//         ]
//       );

//       console.log("   ✅ Main image inserted");
//     } else {
//       console.log(
//         "   ⚠️ Main image skipped - direct image URL not verified"
//       );
//     }

//     /* =====================================================
//        9. VERIFY BEFORE COMMIT
//     ===================================================== */

//     console.log(
//       "\n🔎 Verifying inserted Mahindra XUV400 EV data..."
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
//       "   Range options:",
//       insertedPayload.rangeOptions.join(
//         " / "
//       ),
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
//       "🎉 MAHINDRA XUV400 EV INSERT COMPLETED"
//     );

//     console.log(
//       "================================================="
//     );

//     console.log(
//       "Vehicle        : Mahindra XUV400 EV"
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
//       "Battery        : 34.5 / 39.4 kWh"
//     );

//     console.log(
//       "Range          : 375 / 456 km claimed"
//     );

//     console.log(
//       "Motor Power    : 110 kW"
//     );

//     console.log(
//       "Max Power      : 150 PS / 148 bhp"
//     );

//     console.log(
//       "Torque         : 310 Nm"
//     );

//     console.log(
//       "Price range    : ₹15.49L - ₹17.69L"
//     );

//     console.log(
//       "Rating         : 4.5 / 5"
//     );

//     console.log(
//       "Reviews        : 269"
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
//       "\n⚠️ No partial Mahindra XUV400 EV data was saved."
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

const VEHICLE_ID = "mg-m9";
const BRAND_ID = "mg-motor-india";
const MARKET_ID = "india";

const IMAGE_URL = null;

const SOURCE = "CarDekho";

const SOURCE_URL = "https://www.cardekho.com/mg/m9";

/* =========================================================
   VARIANTS
========================================================= */

const variants = [
  {
    id: "mg-m9-presidential-limo",
    name: "Presidential Limo",
    price: 7994800,

    battery: 90,
    range: 548,

    maxPower: 242,
    maxTorque: 350,

    charger: "11 kW AC | 160 kW DC",

    features: [
      "7 Airbags",
      "Level 2 ADAS",
      "Adaptive Cruise Control",
      "Forward Collision Warning",
      "Automatic Emergency Braking",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Blind Spot Detection",
      "Rear Cross Traffic Alert",
      "360-Degree Camera",
      "Front & Rear Parking Sensors",
      "Panoramic Sunroof",
      "Dual Sunroof",
      "Electric Sliding Rear Doors",
      "Powered Tailgate",
      "Presidential Second-Row Seats",
      "Second-Row Heating",
      "Second-Row Ventilation",
      "Second-Row Massage",
      "Powered Front Seats",
      "Wireless Apple CarPlay",
      "Wireless Android Auto",
      "13-Speaker JBL Sound System",
      "64-Colour Ambient Lighting",
      "12.3-Inch Touchscreen Infotainment",
      "7-Inch Digital Instrument Cluster",
      "V2L",
      "V2V",
      "220V Power Outlet",
      "Connected Car Technology",
    ],
  },

  {
    id: "mg-m9-couture-edition",
    name: "Couture Edition",
    price: 8494000,

    battery: 90,
    range: 548,

    maxPower: 242,
    maxTorque: 350,

    charger: "11 kW AC | 160 kW DC",

    features: [
      "7 Airbags",
      "Level 2 ADAS",
      "Adaptive Cruise Control",
      "Forward Collision Warning",
      "Automatic Emergency Braking",
      "Lane Keep Assist",
      "Lane Departure Warning",
      "Blind Spot Detection",
      "Rear Cross Traffic Alert",
      "360-Degree Camera",
      "Front & Rear Parking Sensors",
      "Panoramic Sunroof",
      "Dual Sunroof",
      "Electric Sliding Rear Doors",
      "Powered Tailgate",
      "Presidential Second-Row Seats",
      "Second-Row Heating",
      "Second-Row Ventilation",
      "Second-Row Massage",
      "Powered Front Seats",
      "Wireless Apple CarPlay",
      "Wireless Android Auto",
      "13-Speaker JBL Sound System",
      "64-Colour Ambient Lighting",
      "12.3-Inch Touchscreen Infotainment",
      "7-Inch Digital Instrument Cluster",
      "V2L",
      "V2V",
      "220V Power Outlet",
      "Connected Car Technology",
      "Couture Edition Exclusive Exterior Design",
      "Serpent Infinity Design Motif",
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
    console.log("🚗 EVINSIGHTS - ADD MG M9");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. BRAND
    ===================================================== */

    console.log("🏷️ Upserting MG Motor India brand...");

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
        "MG Motor India",
        "mg-motor-india",
        "India",
        null,
        JSON.stringify({
          name: "MG Motor India",
          country: "India",
          slug: "mg-motor-india",
        }),
        now,
      ]
    );

    console.log("   ✅ MG Motor India brand ready");

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
       3. CLEAN OLD MG M9 DATA
    ===================================================== */

    console.log("\n🧹 Cleaning existing MG M9 records...");

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

    console.log("   ✅ Existing MG M9 data cleaned");

    /* =====================================================
       4. CANONICAL VEHICLE DATA
    ===================================================== */

    console.log("\n🚗 Inserting MG M9...");

    const vehiclePayload = {
      /* ---------------------------------------------------
         IDENTITY
      --------------------------------------------------- */

      name: "MG M9",
      model: "M9",
      brand: "MG Motor India",
      brandId: BRAND_ID,

      /* ---------------------------------------------------
         SOURCE
      --------------------------------------------------- */

      source: SOURCE,
      sourceUrl: SOURCE_URL,

      /* ---------------------------------------------------
         BATTERY
      --------------------------------------------------- */

      batteryCapacity: 90,
      batteryCapacityKwh: 90,
      batteryKwh: 90,

      batteryOptions: [
        90,
      ],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-ion",
      batteryChemistry: "NMC",
      batteryIPRating: null,

      /* ---------------------------------------------------
         RANGE
      --------------------------------------------------- */

      range: 548,
      rangeKm: 548,

      araiRange: 548,
      midcRange: null,

      rangeOptions: [
        548,
      ],

      rangeUnit: "km",

      /* ---------------------------------------------------
         MOTOR
      --------------------------------------------------- */

      motorPower: 180,
      motorPowerKw: 180,

      powerKw: 180,

      power: 242,
      powerUnit: "bhp",

      motorType: "Permanent Magnet Synchronous Motor",

      maxPower: 242,
      maxPowerUnit: "bhp",

      maxPowerBhp: 242,
      maxPowerBhpUnit: "bhp",

      maxTorque: 350,
      torque: 350,
      torqueNm: 350,

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

      fastCharging: true,
      dcFastCharging: true,

      /* ---------------------------------------------------
         SEATING
      --------------------------------------------------- */

      seats: 7,
      seatingCapacity: 7,

      /* ---------------------------------------------------
         DIMENSIONS
      --------------------------------------------------- */

      length: 5200,
      lengthMm: 5200,

      width: 2000,
      widthMm: 2000,

      height: 1800,
      heightMm: 1800,

      wheelbase: 3200,
      wheelbaseMm: 3200,

      groundClearance: 150,
      groundClearanceMm: 150,

      bootSpace: 945,
      bootCapacity: 945,
      bootCapacityLitres: 945,

      turningRadius: null,
      turningRadiusUnit: "m",

      /* ---------------------------------------------------
         CLASSIFICATION
      --------------------------------------------------- */

      bodyType: "MPV",
      fuelType: "Electric",

      /* ---------------------------------------------------
         PRICE
      --------------------------------------------------- */

      priceMin: 7994800,
      priceMax: 8494000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      /* ---------------------------------------------------
         RATING
      --------------------------------------------------- */

      rating: 4.7,
      reviewCount: 19,

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

        "MG M9",

        "mg-m9",

        BRAND_ID,

        null,

        ["india"],

        JSON.stringify({
          bodyType: "MPV",
          fuelType: "Electric",
          seatingCapacity: 7,
        }),

        JSON.stringify({
          status: "active",
          launched: true,
          available: true,
        }),

        JSON.stringify({
          title: "MG M9",
          slug: "mg-m9",
          description:
            "MG M9 is a premium electric MPV with a 90 kWh NMC battery, 548 km claimed range, 242 bhp maximum power and 350 Nm torque.",
        }),

        JSON.stringify({
          ...vehiclePayload,

          specs: {
            battery: 90,
            batteryOptions: [
              90,
            ],

            range: 548,

            rangeOptions: [
              548,
            ],

            power: 242,

            torque: 350,

            seatingCapacity: 7,
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

        19,

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
      const motorPower = 180;
      const maxPower = 242;

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

            motorPower:
              motorPower,

            motorPowerKw:
              motorPower,

            maxPower:
              maxPower,

            maxPowerUnit:
              "bhp",

            maxPowerBhp:
              242,

            maxPowerBhpUnit:
              "bhp",

            maxTorque:
              350,

            torque:
              350,

            torqueNm:
              350,

            torqueUnit:
              "Nm",

            transmission:
              "Automatic",

            transmissionType:
              "Automatic",

            gearbox:
              "Single Speed",

            driveType:
              "FWD",

            drivetrain:
              "FWD",

            fuelType:
              "Electric",

            charger:
              variant.charger,

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
       6. SPECIFICATIONS
    ===================================================== */

    console.log("\n⚙️ Inserting specifications...");

    /* -----------------------------------------------------
       BATTERY
    ----------------------------------------------------- */

    const batteryData = {
      batteryCapacity: 90,

      batteryCapacityKwh: 90,

      batteryKwh: 90,

      batteryOptions: [
        90,
      ],

      batteryCapacityUnit:
        "kWh",

      batteryType:
        "Lithium-ion",

      batteryChemistry:
        "NMC",

      batteryIPRating:
        null,

      range: 548,

      rangeKm: 548,

      rangeOptions: [
        548,
      ],

      rangeUnit:
        "km",

      chargingPort:
        "CCS-II",

      charging: {
        acCharging:
          "11 kW",

        acChargingTime:
          "10 Hours 11 kW (10-100%)",

        dcCharging:
          "160 kW",

        dcChargingTime:
          "90 Min 160 kW (10-100%)",

        chargingOptions: [
          "11 kW AC",
          "160 kW DC",
        ],

        fastCharging:
          true,

        chargingStandard:
          "CCS-II",

        batteryIPRating:
          null,

        liquidCooledBattery:
          null,
      },

      batteryWarranty:
        null,
    };

    /* -----------------------------------------------------
       PERFORMANCE
    ----------------------------------------------------- */

    const performanceData = {
      motorPower:
        180,

      motorPowerKw:
        180,

      powerKw:
        180,

      power:
        242,

      powerUnit:
        "bhp",

      motorType:
        "Permanent Magnet Synchronous Motor",

      maxPower:
        242,

      maxPowerUnit:
        "bhp",

      maxPowerBhp:
        242,

      maxPowerBhpUnit:
        "bhp",

      maxTorque:
        350,

      torque:
        350,

      torqueNm:
        350,

      torqueUnit:
        "Nm",

      transmission:
        "Automatic",

      transmissionType:
        "Automatic",

      gearbox:
        "Single Speed",

      driveType:
        "FWD",

      drivetrain:
        "FWD",

      regenerativeBraking:
        true,

      regenerativeBrakingLevels:
        null,

      driveModes:
        3,

      driveModeTypes: [
        "ECO",
        "CITY",
        "SPORT",
      ],

      singlePedalDrive:
        null,

      creepMode:
        null,

      acceleration0100:
        null,

      topSpeed:
        180,

      topSpeedUnit:
        "kmph",

      emissionNormCompliance:
        "ZEV",

      suspensionSteeringBrakes: {
        frontSuspension:
          "Independent MacPherson Strut",

        rearSuspension:
          "Independent Multi-link",

        steeringType:
          "Electric",

        steeringColumn:
          "Tilt and Telescopic",

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
      length:
        5200,

      lengthMm:
        5200,

      width:
        2000,

      widthMm:
        2000,

      height:
        1800,

      heightMm:
        1800,

      wheelbase:
        3200,

      wheelbaseMm:
        3200,

      bootSpace:
        945,

      bootCapacity:
        945,

      bootCapacityLitres:
        945,

      seatingCapacity:
        7,

      seats:
        7,

      groundClearance:
        150,

      groundClearanceMm:
        150,

      turningRadius:
        null,

      turningRadiusUnit:
        "m",

      exterior: {
        bodyType:
          "MPV",

        adjustableHeadlamps:
          true,

        automaticHeadlamps:
          true,

        outsideRearViewMirror:
          "Powered & Folding",

        alloyWheels:
          true,

        alloyWheelSize:
          "19 inch",

        LEDDRLs:
          true,

        LEDHeadlamps:
          true,

        LEDTaillights:
          true,

        tyreSize:
          "235/55 R19",

        tyreType:
          "Tubeless, Radial",

        sharkFinAntenna:
          true,

        panoramicSunroof:
          true,

        dualSunroof:
          true,

        electricSlidingDoors:
          true,

        poweredTailgate:
          true,
      },
    };

    /* -----------------------------------------------------
       SAFETY
    ----------------------------------------------------- */

    const safetyData = {
      airbags:
        7,

      abs:
        true,

      brakeAssist:
        true,

      centralLocking:
        true,

      childSafetyLocks:
        true,

      antiTheftAlarm:
        true,

      driverAirbag:
        true,

      passengerAirbag:
        true,

      sideAirbag:
        true,

      sideAirbagRear:
        true,

      ebd:
        true,

      esc:
        true,

      electronicStabilityControl:
        true,

      tpms:
        true,

      engineImmobilizer:
        true,

      rearParkingCamera:
        true,

      parkingSensors:
        true,

      rearParkingSensors:
        true,

      frontParkingSensors:
        true,

      antiTheftDevice:
        true,

      antiPinchPowerWindows:
        true,

      isofix:
        true,

      hillDescentControl:
        null,

      hillAssist:
        true,

      camera360:
        true,

      discBrakesAllRound:
        true,

      globalNcapSafetyRating:
        null,

      euroNcapSafetyRating:
        "5 Star",

      adas: {
        available:
          true,

        level:
          2,

        features: [
          "Forward Collision Warning",
          "Automatic Emergency Braking",
          "Lane Departure Warning",
          "Lane Keep Assist",
          "Adaptive Cruise Control",
          "Blind Spot Detection",
          "Rear Cross Traffic Alert",
          "High Beam Assist",
          "Traffic Sign Recognition",
        ],
      },
    };

    /* -----------------------------------------------------
       FEATURES
    ----------------------------------------------------- */

    const featuresData = {
      comfortConvenience: {
        bootOpening:
          "Powered",

        powerSteering:
          true,

        airConditioner:
          true,

        heater:
          true,

        heightAdjustableDriverSeat:
          true,

        electricAdjustableSeats:
          "Front & Rear",

        automaticClimateControl:
          true,

        airQualityControl:
          true,

        accessoryPowerOutlet:
          true,

        adjustableHeadrest:
          true,

        rearSeatCentreArmRest:
          true,

        rearACVents:
          true,

        lumbarSupport:
          true,

        cruiseControl:
          true,

        adaptiveCruiseControl:
          true,

        parkingSensors:
          "Front & Rear",

        realTimeVehicleTracking:
          true,

        foldableRearSeat:
          true,

        keylessEntry:
          true,

        engineStartStopButton:
          true,

        usbCharger:
          "Front & Rear",

        driveModes:
          3,

        driveModeTypes: [
          "ECO",
          "CITY",
          "SPORT",
        ],

        followMeHomeHeadlamps:
          true,

        ventilatedSeats:
          true,

        heatedSeats:
          true,

        massageSeats:
          true,

        wirelessPhoneCharger:
          true,

        electricSlidingDoors:
          true,

        poweredTailgate:
          true,

        poweredOttomanSeats:
          true,
      },

      interior: {
        leatherWrappedSteeringWheel:
          true,

        gloveBox:
          true,

        additionalFeatures:
          "Premium Leather & Suede Interior",

        digitalCluster:
          true,

        digitalClusterSize:
          7,

        upholstery:
          "Leather & Suede",

        ambientLighting:
          true,

        ambientLightingColours:
          64,
      },

      entertainmentCommunication: {
        radio:
          true,

        wirelessPhoneCharging:
          true,

        bluetoothConnectivity:
          true,

        wifiConnectivity:
          true,

        touchscreen:
          true,

        touchscreenSize:
          "12.3 inch",

        androidAuto:
          true,

        appleCarPlay:
          true,

        speakers:
          13,

        usbPorts:
          true,

        rearEntertainmentSystem:
          true,

        additionalFeatures:
          "13 JBL Speakers Including Subwoofer & Amplifier",

        speakerPlacement:
          "Front & Rear",
      },

      advancedInternetFeatures: {
        connectedCarTechnology:
          true,

        liveLocation:
          true,

        engineStartAlarm:
          true,

        remoteVehicleStatusCheck:
          true,

        digitalCarKey:
          null,

        navigationWithLiveTraffic:
          true,

        OTAUpdates:
          true,

        overspeedingAlert:
          true,

        remoteACOnOff:
          true,

        remoteDoorLockUnlock:
          true,

        geoFenceAlert:
          true,

        vehicleToLoad:
          true,

        vehicleToVehicle:
          true,

        powerOutlet220V:
          true,
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
       7. CHARGING
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

          chargingTime:
            "90 Min with 160 kW DC (10-100%)",

          acCharging:
            "11 kW",

          acChargingTime:
            "10 Hours 11 kW (10-100%)",

          dcCharging:
            "160 kW",

          dcChargingTime:
            "90 Min 160 kW (10-100%)",

          chargingOptions: [
            "11 kW AC",
            "160 kW DC",
          ],

          fastCharging:
            true,

          fastChargingPowerKw:
            160,

          acPowerKw:
            11,

          dcPowerKw:
            160,

          chargingStandard:
            "CCS-II",

          batteryIPRating:
            null,

          dcFastChargingSupported:
            true,

          chargerType:
            "11 kW AC Charger",

          chargingTime11kW:
            "10 Hours (10-100%)",

          chargingTime160kW:
            "90 Min (10-100%)",
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

          "MG M9 front view",

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
    } else {
      console.log(
        "   ⚠️ Main image skipped - direct image URL not provided"
      );
    }

    /* =====================================================
       9. VERIFY BEFORE COMMIT
    ===================================================== */

    console.log(
      "\n🔎 Verifying inserted MG M9 data..."
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
      "   Range:",
      insertedPayload.range,
      "km"
    );

    console.log(
      "   Motor Power:",
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
      "   Seats:",
      insertedPayload.seats
    );

    console.log(
      "   Boot Space:",
      insertedPayload.bootSpace,
      "Litres"
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
      "🎉 MG M9 INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle        : MG M9"
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
      "Battery        : 90 kWh"
    );

    console.log(
      "Range          : 548 km claimed"
    );

    console.log(
      "Motor Power    : 180 kW"
    );

    console.log(
      "Max Power      : 242 bhp"
    );

    console.log(
      "Torque         : 350 Nm"
    );

    console.log(
      "Price range    : ₹79.95L - ₹84.94L"
    );

    console.log(
      "Rating         : 4.7 / 5"
    );

    console.log(
      "Reviews        : 19"
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
      "\n⚠️ No partial MG M9 data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();

    await pool.end();
  }
}

main();