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

// const VEHICLE_ID = "tata-curvv-ev";
// const BRAND_ID = "tata";
// const MARKET_ID = "india";

// const IMAGE_URL = null;

// const SOURCE = "CarDekho";
// const SOURCE_URL =
//   "https://www.cardekho.com/tata/curvv-ev";

// /* =========================================================
//    VARIANTS
// ========================================================= */

// const variants = [
//   {
//     id: "tata-curvv-ev-accomplished-x-55",
//     name: "Tata Curvv EV Accomplished X 55",
//     price: 1699000,
//     features: [
//       "6 Airbags",
//       "Electronic Stability Control",
//       "Hill Hold Assist",
//       "ABS with EBD",
//       "ISOFIX Child Seat Anchors",
//       "Rear Parking Sensors",
//       "360-Degree Camera",
//       "Cruise Control",
//       "Automatic Climate Control",
//       "10.25-Inch Touchscreen Infotainment",
//       "10.25-Inch Digital Driver Display",
//       "Android Auto",
//       "Apple CarPlay",
//       "All 4 Power Windows",
//       "Electronic Parking Brake",
//       "Auto Hold",
//       "TPMS",
//       "CCS-II Charging",
//     ],
//   },

//   {
//     id: "tata-curvv-ev-empowered-x-55",
//     name: "Tata Curvv EV Empowered X 55",
//     price: 1919000,
//     features: [
//       "6 Airbags",
//       "Electronic Stability Control",
//       "Hill Hold Assist",
//       "Hill Descent Control",
//       "ABS with EBD",
//       "ISOFIX Child Seat Anchors",
//       "360-Degree Camera",
//       "Blind Spot Monitor",
//       "Front Parking Sensors",
//       "Rear Parking Sensors",
//       "10.25-Inch Touchscreen Infotainment",
//       "10.25-Inch Digital Driver Display",
//       "Android Auto",
//       "Apple CarPlay",
//       "Cruise Control",
//       "Automatic Climate Control",
//       "16-Inch Alloy Wheels",
//       "Auto Folding ORVMs",
//       "Rain Sensing Wipers",
//       "Electronic Parking Brake",
//       "Auto Hold",
//       "Wireless Phone Charger",
//       "Ventilated Front Seats",
//       "TPMS",
//       "CCS-II Charging",
//     ],
//   },

//   {
//     id: "tata-curvv-ev-empowered-x-55-dark",
//     name: "Tata Curvv EV Empowered X 55 Dark",
//     price: 1949000,
//     features: [
//       "6 Airbags",
//       "Electronic Stability Control",
//       "Hill Hold Assist",
//       "Hill Descent Control",
//       "ABS with EBD",
//       "ISOFIX Child Seat Anchors",
//       "360-Degree Camera",
//       "Blind Spot Monitor",
//       "Front Parking Sensors",
//       "Rear Parking Sensors",
//       "10.25-Inch Touchscreen Infotainment",
//       "10.25-Inch Digital Driver Display",
//       "Android Auto",
//       "Apple CarPlay",
//       "Cruise Control",
//       "Automatic Climate Control",
//       "16-Inch Alloy Wheels",
//       "Auto Folding ORVMs",
//       "Rain Sensing Wipers",
//       "Electronic Parking Brake",
//       "Auto Hold",
//       "Wireless Phone Charger",
//       "Ventilated Front Seats",
//       "Panoramic Sunroof",
//       "Leatherette Upholstery",
//       "TPMS",
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
//     console.log("🚗 EVINSIGHTS - ADD TATA CURVV EV");
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
//        3. CLEAN OLD TATA CURVV EV DATA
//     ===================================================== */

//     console.log(
//       "\n🧹 Cleaning existing Tata Curvv EV records..."
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
//       "   ✅ Existing Tata Curvv EV data cleaned"
//     );

//     /* =====================================================
//        4. CANONICAL VEHICLE DATA
//     ===================================================== */

//     console.log("\n🚙 Inserting Tata Curvv EV...");

//     const vehiclePayload = {
//       /* ---------------------------------------------------
//          IDENTITY
//       --------------------------------------------------- */

//       name: "Tata Curvv EV",
//       model: "Curvv EV",
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

//       batteryCapacity: 55,
//       batteryCapacityKwh: 55,
//       batteryKwh: 55,

//       batteryOptions: [
//         45,
//         55,
//       ],

//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium-ion",

//       batteryChemistry: "Lithium-ion",

//       /* ---------------------------------------------------
//          RANGE
//       --------------------------------------------------- */

//       range: 502,
//       rangeKm: 502,

//       araiRange: 502,
//       midcRange: 502,

//       rangeOptions: [
//         502,
//         585,
//       ],

//       claimedRange45: 502,
//       claimedRange55: 585,

//       rangeUnit: "km",

//       /* ---------------------------------------------------
//          MOTOR
//       --------------------------------------------------- */

//       motorPower: 123,
//       motorPowerKw: 123,

//       powerKw: 123,
//       power: 123,

//       powerOptionsKw: [
//         110,
//         123,
//       ],

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous Motor",

//       maxPower: 167,
//       maxPowerUnit: "bhp",

//       maxPowerOptions: [
//         150,
//         167,
//       ],

//       maxTorque: 215,
//       torque: 215,
//       torqueNm: 215,

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

//       length: 4310,
//       lengthMm: 4310,

//       width: 1810,
//       widthMm: 1810,

//       height: 1637,
//       heightMm: 1637,

//       wheelbase: 2560,
//       wheelbaseMm: 2560,

//       groundClearance: 190,
//       groundClearanceMm: 190,

//       bootSpace: 500,
//       bootCapacity: 500,
//       bootCapacityLitres: 500,

//       turningRadius: 5.3,
//       turningRadiusUnit: "m",

//       /* ---------------------------------------------------
//          CLASSIFICATION
//       --------------------------------------------------- */

//       bodyType: "SUV Coupe",
//       fuelType: "Electric",

//       /* ---------------------------------------------------
//          PRICE
//       --------------------------------------------------- */

//       priceMin: 1699000,
//       priceMax: 1949000,

//       currency: "INR",
//       currencyCode: "INR",
//       currencySymbol: "₹",

//       /* ---------------------------------------------------
//          RATING
//       --------------------------------------------------- */

//       rating: 4.7,
//       reviewCount: 38,

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

//         "Tata Curvv EV",

//         "tata-curvv-ev",

//         BRAND_ID,

//         null,

//         ["india"],

//         JSON.stringify({
//           bodyType: "SUV Coupe",
//           fuelType: "Electric",
//           seatingCapacity: 5,
//         }),

//         JSON.stringify({
//           status: "active",
//           launched: true,
//           available: true,
//         }),

//         JSON.stringify({
//           title: "Tata Curvv EV",
//           slug: "tata-curvv-ev",
//           description:
//             "Tata Curvv EV electric SUV coupe with 45 kWh and 55 kWh battery options, FWD electric motor and claimed range of up to 585 km.",
//         }),

//         JSON.stringify({
//           ...vehiclePayload,

//           specs: {
//             battery: 55,

//             batteryOptions: [
//               45,
//               55,
//             ],

//             range: 502,

//             rangeOptions: [
//               502,
//               585,
//             ],

//             power: 123,

//             powerOptions: [
//               110,
//               123,
//             ],

//             torque: 215,
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

//         38,

//         JSON.stringify(vehiclePayload),

//         now,
//       ]
//     );

//     console.log("   ✅ Tata Curvv EV inserted");

//     /* =====================================================
//        5. VARIANTS + PRICING
//     ===================================================== */

//     console.log("\n📦 Inserting Curvv EV variants...");

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

//             batteryCapacity: 55,
//             batteryCapacityKwh: 55,

//             range: 585,
//             rangeKm: 585,

//             motorPower: 123,
//             motorPowerKw: 123,

//             maxPower: 167,
//             maxPowerUnit: "bhp",

//             maxTorque: 215,

//             transmission: "Automatic",
//             transmissionType: "Automatic",

//             gearbox: "Single-Speed",

//             driveType: "FWD",
//             drivetrain: "FWD",

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
//       batteryCapacity: 55,

//       batteryCapacityKwh: 55,

//       batteryKwh: 55,

//       batteryOptions: [
//         45,
//         55,
//       ],

//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium-ion",

//       batteryChemistry: "Lithium-ion",

//       range: 502,

//       rangeKm: 502,

//       rangeOptions: [
//         502,
//         585,
//       ],

//       claimedRange45: 502,

//       claimedRange55: 585,

//       rangeUnit: "km",

//       chargingPort: "CCS-II",

//       charging: {
//         acCharging:
//           "7.2 kW AC Charging",

//         dcFastCharging:
//           "Fast DC Charging",

//         chargingOptions: [
//           "7.2 kW AC",
//           "70 kW DC",
//         ],

//         fastCharging: true,

//         fastChargingTime:
//           "Fast DC charging",
//       },
//     };

//     /* -----------------------------------------------------
//        PERFORMANCE
//     ----------------------------------------------------- */

//     const performanceData = {
//       motorPower: 123,

//       motorPowerKw: 123,

//       powerOptionsKw: [
//         110,
//         123,
//       ],

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous Motor",

//       maxPower: 167,

//       maxPowerUnit: "bhp",

//       maxPowerOptions: [
//         150,
//         167,
//       ],

//       maxTorque: 215,

//       torque: 215,

//       torqueNm: 215,

//       torqueUnit: "Nm",

//       transmission: "Automatic",

//       transmissionType: "Automatic",

//       gearbox: "Single-Speed",

//       driveType: "FWD",

//       drivetrain: "FWD",

//       acceleration0To100: 8.6,

//       acceleration0To100Unit: "seconds",

//       regenerativeBraking: true,

//       regenerativeBrakingLevels: [
//         1,
//         2,
//         3,
//         4,
//       ],

//       driveModes: [
//         "City",
//         "Sport",
//         "Eco",
//       ],

//       suspensionSteeringBrakes: {
//         frontSuspension:
//           "Independent Front Suspension",

//         rearSuspension:
//           "Rear Suspension",

//         steeringType:
//           "Electric Power Steering",

//         steeringColumn: "Tilt",

//         turningRadius: 5.3,

//         turningRadiusUnit: "m",

//         frontBrakeType: "Disc",

//         rearBrakeType: "Disc",
//       },
//     };

//     /* -----------------------------------------------------
//        DIMENSIONS
//     ----------------------------------------------------- */

//     const dimensionsData = {
//       length: 4310,

//       lengthMm: 4310,

//       width: 1810,

//       widthMm: 1810,

//       height: 1637,

//       heightMm: 1637,

//       wheelbase: 2560,

//       wheelbaseMm: 2560,

//       bootSpace: 500,

//       bootCapacity: 500,

//       bootCapacityLitres: 500,

//       seatingCapacity: 5,

//       seats: 5,

//       groundClearance: 190,

//       groundClearanceMm: 190,

//       turningRadius: 5.3,

//       turningRadiusUnit: "m",

//       exterior: {
//         bodyType: "SUV Coupe",

//         LEDHeadlamps: true,

//         LEDTaillights: true,

//         DRLs: true,

//         fogLights: true,

//         autoHeadlamps: true,

//         rainSensingWipers: true,

//         electricallyAdjustableORVMs: true,

//         electricallyFoldableORVMs: true,

//         alloyWheels: true,

//         tyreType: "Tubeless",

//         additionalFeatures: [
//           "SUV Coupe Styling",
//           "LED DRLs",
//           "Flush Door Handles",
//           "Roof Rails",
//           "EV-Specific Exterior Design",
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

//       rearParkingSensors: true,

//       surroundViewCamera: "360-Degree",

//       isofix: true,

//       highBeamAssist: true,

//       blindSpotMonitor: true,

//       adas: {
//         available: true,

//         level: 2,

//         features: [
//           "Lane Departure Warning",
//           "Forward Collision Warning",
//           "Autonomous Emergency Braking",
//           "Adaptive Cruise Control",
//         ],
//       },

//       driverMonitoringSystem: false,

//       secure360: false,

//       brakeByWire: false,

//       autoParkAssist: false,
//     };

//     /* -----------------------------------------------------
//        FEATURES
//     ----------------------------------------------------- */

//     const featuresData = {
//       comfortConvenience: {
//         automaticClimateControl: true,

//         dualZoneClimateControl: true,

//         cruiseControl: true,

//         adaptiveCruiseControl: true,

//         poweredDriverSeat: true,

//         driverSeatMemory: true,

//         electricallyAdjustableORVMs: true,

//         electricallyFoldableORVMs: true,

//         pushButtonStart: true,

//         keylessEntry: true,

//         powerWindows: "All 4",

//         electronicParkingBrake: true,

//         autoHold: true,

//         ambientLighting: true,

//         sunroof: true,

//         panoramicSunroof: true,

//         poweredTailgate: false,

//         ventilatedFrontSeats: true,

//         wirelessPhoneCharger: true,
//       },

//       interior: {
//         digitalInstrumentCluster: true,

//         leatheretteUpholstery: true,

//         automaticClimateControl: true,

//         premiumCabin: true,

//         illuminatedSteeringWheel: false,

//         driverAndOccupantMonitoring: false,
//       },

//       entertainmentCommunication: {
//         touchscreenSize:
//           "12.3 inch",

//         touchscreenSizeLower:
//           "10.25 inch",

//         driverDisplaySize:
//           "10.25 inch",

//         androidAuto: true,

//         appleCarPlay: true,

//         wirelessAndroidAuto: true,

//         wirelessAppleCarPlay: true,

//         speakers: 9,

//         wirelessCharging: true,

//         usbCharging: true,

//         bluetooth: true,

//         wifi: true,
//       },

//       advancedInternetFeatures: {
//         connectedCarTechnology: true,

//         remoteLockUnlock: true,

//         remoteVehicleStatusCheck: true,

//         vehicleTracking: true,

//         remoteClimateControl: true,

//         OTAUpdates: true,

//         liveVehicleView: false,

//         driverMonitoringSystem: false,

//         digitalKey: false,

//         chargeScheduler: true,

//         userProfiles: true,

//         smartwatchConnectivity: true,

//         voiceCommands: true,

//         voiceCommandLanguages: 6,

//         blindSpotMonitor: true,
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

//     /*
//      * IMPORTANT:
//      * Only use specification types allowed by
//      * specifications_type_check.
//      *
//      * Do NOT use "comfort".
//      */

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

//     /*
//      * Only insert "features" if your database
//      * constraint allows it.
//      *
//      * Since your Punch EV script expects "features",
//      * we use it here as well.
//      */

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
//             "Fast DC Charging",

//           acChargingTime:
//             "7.2 kW AC Charging",

//           dcCharging:
//             "Fast DC Charging",

//           portableCharging:
//             "AC Charging",

//           chargingOptions: [
//             "7.2 kW AC",
//             "70 kW DC",
//           ],

//           fastCharging: true,

//           acPowerKw: 7.2,

//           acPowerOptionsKw: [
//             7.2,
//           ],

//           dcPowerKw: 70,

//           chargingStandard:
//             "CCS-II",
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

//           "Tata Curvv EV front left side",

//           JSON.stringify({
//             source: SOURCE,
//             sourceUrl: SOURCE_URL,
//             role: "primary",
//           }),
//         ]
//       );

//       console.log(
//         "   ✅ Main image inserted"
//       );
//     } else {
//       console.log(
//         "   ⚠️ Main image skipped - direct image URL not verified"
//       );
//     }

//     /* =====================================================
//        9. VERIFY BEFORE COMMIT
//     ===================================================== */

//     console.log(
//       "\n🔎 Verifying inserted Tata Curvv EV data..."
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
//       "🎉 TATA CURVV EV INSERT COMPLETED"
//     );

//     console.log(
//       "================================================="
//     );

//     console.log(
//       "Vehicle        : Tata Curvv EV"
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
//       "Battery        : 45 / 55 kWh"
//     );

//     console.log(
//       "Range          : 502 / 585 km claimed"
//     );

//     console.log(
//       "Motor Power    : 110 / 123 kW"
//     );

//     console.log(
//       "Max Power      : 150 / 167 bhp"
//     );

//     console.log(
//       "Torque         : 215 Nm"
//     );

//     console.log(
//       "Price range    : ₹16.99L - ₹19.49L"
//     );

//     console.log(
//       "Rating         : 4.7 / 5"
//     );

//     console.log(
//       "Reviews        : 38"
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
//       "\n❌ CURVV EV INSERT FAILED"
//     );

//     console.error(
//       "Transaction rolled back."
//     );

//     console.error(error);

//     console.error(
//       "\n⚠️ No partial Tata Curvv EV data was saved."
//     );

//     process.exitCode = 1;

//   } finally {
//     client.release();
//     await pool.end();
//   }
// }

// main();


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

// const VEHICLE_ID = "tata-xpres-t-ev";
// const BRAND_ID = "tata";
// const MARKET_ID = "india";

// const IMAGE_URL =
//   "https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Xpres-EV/13284/1769161813552/front-left-side-47.jpg?tr=w-230";

// const SOURCE = "CarDekho";

// const SOURCE_URL =
//   "https://www.cardekho.com/tata/xpres-t-ev";

// /* =========================================================
//    VARIANTS
// ========================================================= */

// /*
//   CarDekho source supplied for this vehicle does not provide
//   a variant-wise price list.

//   Therefore we keep one canonical vehicle variant using the
//   displayed Xpres T EV price: ₹13.04 Lakh.
// */

// const variants = [
//   {
//     id: "tata-xpres-t-ev",
//     name: "Tata Xpres T EV",
//     price: 1304000,

//     features: [
//       "Power Steering",
//       "Anti-lock Braking System (ABS)",
//       "Air Conditioner",
//       "Driver Airbag",
//       "Passenger Airbag",
//       "Automatic Climate Control",
//       "Rear Parking Sensors",
//       "Automatic Transmission",
//       "Front & Rear Power Windows",
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
//     console.log("🚗 EVINSIGHTS - ADD TATA XPRES T EV");
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
//        3. CLEAN OLD TATA XPRES T EV DATA
//     ===================================================== */

//     console.log(
//       "\n🧹 Cleaning existing Tata Xpres T EV records..."
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
//       "   ✅ Existing Tata Xpres T EV data cleaned"
//     );

//     /* =====================================================
//        4. CANONICAL VEHICLE DATA
//     ===================================================== */

//     console.log("\n🚗 Inserting Tata Xpres T EV...");

//     const vehiclePayload = {
//       /* ---------------------------------------------------
//          IDENTITY
//       --------------------------------------------------- */

//       name: "Tata Xpres T EV",
//       model: "Xpres T EV",
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

//       batteryCapacity: 32,
//       batteryCapacityKwh: 32,
//       batteryKwh: 32,

//       batteryOptions: [
//         32,
//       ],

//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium ion",
//       batteryChemistry: "Lithium ion",

//       /* ---------------------------------------------------
//          RANGE
//       --------------------------------------------------- */

//       range: 391,
//       rangeKm: 391,

//       araiRange: 391,
//       midcRange: 391,

//       rangeOptions: [
//         391,
//       ],

//       rangeUnit: "km",

//       /* ---------------------------------------------------
//          MOTOR
//       --------------------------------------------------- */

//       motorPower: 30,
//       motorPowerKw: 30,

//       powerKw: 30,
//       power: 30,

//       powerOptionsKw: [
//         30,
//       ],

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous",

//       maxPower: 35.79,
//       maxPowerUnit: "bhp",

//       maxPowerOptions: [
//         35.79,
//       ],

//       maxPowerRpm: 5000,

//       maxTorque: 114,
//       torque: 114,
//       torqueNm: 114,

//       torqueUnit: "Nm",

//       /* ---------------------------------------------------
//          DRIVETRAIN
//       --------------------------------------------------- */

//       transmission: "Automatic",
//       transmissionType: "Automatic",

//       gearbox: "Single Speed, Automatic",

//       driveType: "FWD",
//       drivetrain: "FWD",

//       /* ---------------------------------------------------
//          FUEL
//       --------------------------------------------------- */

//       fuelType: "Electric",
//       emissionNormCompliance: "ZEV",

//       /* ---------------------------------------------------
//          PERFORMANCE
//       --------------------------------------------------- */

//       topSpeed: 80,
//       topSpeedUnit: "kmph",

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

//       length: 3993,
//       lengthMm: 3993,

//       width: 1677,
//       widthMm: 1677,

//       height: 1529,
//       heightMm: 1529,

//       wheelbase: 2450,
//       wheelbaseMm: 2450,

//       groundClearance: 170,
//       groundClearanceMm: 170,

//       bootSpace: 293,
//       bootCapacity: 293,
//       bootCapacityLitres: 293,

//       grossWeight: 1620,
//       grossWeightKg: 1620,

//       turningRadius: 5.1,
//       turningRadiusUnit: "m",

//       /* ---------------------------------------------------
//          CLASSIFICATION
//       --------------------------------------------------- */

//       bodyType: "Sedan",

//       /* ---------------------------------------------------
//          PRICE
//       --------------------------------------------------- */

//       priceMin: 1304000,
//       priceMax: 1304000,

//       currency: "INR",
//       currencyCode: "INR",
//       currencySymbol: "₹",

//       /* ---------------------------------------------------
//          RATING
//       --------------------------------------------------- */

//       rating: 4.8,
//       reviewCount: 4,

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

//         "Tata Xpres T EV",

//         "tata-xpres-t-ev",

//         BRAND_ID,

//         null,

//         ["india"],

//         JSON.stringify({
//           bodyType: "Sedan",
//           fuelType: "Electric",
//           seatingCapacity: 5,
//         }),

//         JSON.stringify({
//           status: "active",
//           launched: true,
//           available: true,
//         }),

//         JSON.stringify({
//           title: "Tata Xpres T EV",
//           slug: "tata-xpres-t-ev",
//           description:
//             "Tata Xpres T EV electric sedan with a 32 kWh battery, 30 kW electric motor, 391 km claimed range and FWD automatic transmission.",
//         }),

//         JSON.stringify({
//           ...vehiclePayload,

//           specs: {
//             battery: 32,
//             batteryOptions: [
//               32,
//             ],

//             range: 391,
//             rangeOptions: [
//               391,
//             ],

//             power: 30,
//             powerOptions: [
//               30,
//             ],

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

//         4.8,

//         4,

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

//             batteryCapacity: 32,
//             batteryCapacityKwh: 32,

//             range: 391,
//             rangeKm: 391,

//             motorPower: 30,
//             motorPowerKw: 30,

//             maxPower: 35.79,
//             maxPowerUnit: "bhp",

//             maxTorque: 114,

//             transmission: "Automatic",
//             transmissionType: "Automatic",

//             gearbox: "Single Speed, Automatic",

//             driveType: "FWD",
//             drivetrain: "FWD",

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
//       batteryCapacity: 32,
//       batteryCapacityKwh: 32,
//       batteryKwh: 32,

//       batteryOptions: [
//         32,
//       ],

//       batteryCapacityUnit: "kWh",

//       batteryType: "Lithium ion",
//       batteryChemistry: "Lithium ion",

//       range: 391,
//       rangeKm: 391,

//       rangeOptions: [
//         391,
//       ],

//       rangeUnit: "km",

//       chargingPort: "CCS-II",

//       charging: {
//         acCharging:
//           "4.6 h (11.2kW / 7.2 kW Charger)",

//         acChargingTime:
//           "4.6 h (11.2kW / 7.2 kW Charger)",

//         dcFastCharging:
//           "30 Min with 50 kW / 358A Charger Input",

//         dcCharging:
//           "30 Min with 50 kW / 358A Charger Input",

//         chargingOptions: [
//           "11.2 kW / 7.2 kW AC",
//           "50 kW DC",
//         ],

//         fastCharging: true,

//         fastChargingTime:
//           "30 minutes with 50 kW / 358A Charger Input",
//       },
//     };

//     /* -----------------------------------------------------
//        PERFORMANCE
//     ----------------------------------------------------- */

//     const performanceData = {
//       motorPower: 30,
//       motorPowerKw: 30,

//       powerOptionsKw: [
//         30,
//       ],

//       powerUnit: "kW",

//       motorType:
//         "Permanent Magnet Synchronous",

//       maxPower: 35.79,
//       maxPowerUnit: "bhp",

//       maxPowerOptions: [
//         35.79,
//       ],

//       maxPowerRpm: 5000,

//       maxTorque: 114,

//       torque: 114,

//       torqueNm: 114,

//       torqueUnit: "Nm",

//       transmission: "Automatic",

//       transmissionType: "Automatic",

//       gearbox: "Single Speed, Automatic",

//       driveType: "FWD",

//       drivetrain: "FWD",

//       topSpeed: 80,

//       topSpeedUnit: "kmph",

//       regenerativeBraking: null,

//       regenerativeBrakingLevels: [],

//       driveModes: [
//         "DRIVE",
//         "SPORT",
//       ],

//       suspensionSteeringBrakes: {
//         frontSuspension:
//           "MacPherson Strut suspension",

//         rearSuspension:
//           "Rear twist beam",

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
//       length: 3993,
//       lengthMm: 3993,

//       width: 1677,
//       widthMm: 1677,

//       height: 1529,
//       heightMm: 1529,

//       wheelbase: 2450,
//       wheelbaseMm: 2450,

//       bootSpace: 293,
//       bootCapacity: 293,
//       bootCapacityLitres: 293,

//       seatingCapacity: 5,
//       seats: 5,

//       groundClearance: 170,
//       groundClearanceMm: 170,

//       grossWeight: 1620,
//       grossWeightKg: 1620,

//       turningRadius: 5.1,
//       turningRadiusUnit: "m",

//       exterior: {
//         bodyType: "Sedan",

//         LEDTaillights: true,

//         outsideRearViewMirror:
//           "Manual",

//         tyreSize:
//           "R14 175/65 86T",

//         tyreType:
//           "Tubeless, Radial",

//         wheelSize:
//           "14 Inch",

//         additionalFeatures: [
//           "LED Taillights",
//         ],
//       },
//     };

//     /* -----------------------------------------------------
//        SAFETY
//     ----------------------------------------------------- */

//     const safetyData = {
//       airbags: 2,

//       abs: true,

//       brakeAssist: null,

//       ebd: true,

//       esc: null,

//       electronicStabilityControl: null,

//       hillHoldAssist: null,

//       hillDescentControl: null,

//       tpms: null,

//       electronicParkingBrake: null,

//       autoHold: null,

//       rearParkingCamera: null,

//       parkingSensors: true,

//       frontParkingSensors: null,

//       rearParkingSensors: true,

//       surroundViewCamera: null,

//       bharatNcapRating: null,

//       bharatNcapAdultProtection: null,

//       bharatNcapChildProtection: null,

//       isofix: null,

//       highBeamAssist: null,

//       blindSpotMonitor: null,

//       adas: {
//         available: false,
//         level: null,
//         features: [],
//       },

//       driverMonitoringSystem: false,

//       secure360: false,

//       brakeByWire: false,

//       autoParkAssist: false,
//     };

//     /* -----------------------------------------------------
//        FEATURES
//     ----------------------------------------------------- */

//     const featuresData = {
//       comfortConvenience: {
//         powerSteering: true,

//         airConditioner: true,

//         heater: true,

//         automaticClimateControl: true,

//         adjustableSteering:
//           "Height only",

//         accessoryPowerOutlet: true,

//         adjustableHeadrest: true,

//         parkingSensors: "Rear",

//         gearShiftIndicator: true,

//         driveModes: 2,

//         driveModeTypes: [
//           "DRIVE",
//           "SPORT",
//         ],

//         powerWindows:
//           "Front & Rear",

//         cupHolders:
//           "Front Only",

//         bootOpening:
//           "Manual",

//         cruiseControl: null,

//         adaptiveCruiseControl: false,

//         poweredDriverSeat: false,

//         driverSeatMemory: false,

//         keylessEntry: null,

//         pushButtonStart: null,

//         electronicParkingBrake: null,

//         autoHold: null,

//         ambientLighting: null,

//         sunroof: null,

//         ventilatedFrontSeats: false,

//         wirelessPhoneCharger: false,
//       },

//       interior: {
//         gloveBox: true,

//         digitalInstrumentCluster: true,

//         digitalClusterSize: "3.5",

//         premiumCabin: null,

//         leatheretteUpholstery: null,
//       },

//       entertainmentCommunication: {
//         touchscreenSize: null,

//         driverDisplaySize: null,

//         androidAuto: null,

//         appleCarPlay: null,

//         wirelessAndroidAuto: null,

//         wirelessAppleCarPlay: null,

//         speakers: null,

//         wirelessCharging: false,

//         usbCharging: null,

//         bluetooth: null,

//         wifi: null,

//         radio: true,
//       },

//       advancedInternetFeatures: {
//         connectedCarTechnology: null,

//         remoteLockUnlock: null,

//         remoteVehicleStatusCheck: null,

//         vehicleTracking: null,

//         remoteClimateControl: null,

//         OTAUpdates: null,

//         liveVehicleView: false,

//         driverMonitoringSystem: false,

//         digitalKey: false,

//         chargeScheduler: null,

//         userProfiles: null,

//         smartwatchConnectivity: null,

//         voiceCommands: null,

//         blindSpotMonitor: false,
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
//             "4.6 h (11.2kW / 7.2 kW Charger)",

//           acChargingTime:
//             "4.6 h (11.2kW / 7.2 kW Charger)",

//           dcCharging:
//             "30 Min with 50 kW / 358A Charger Input",

//           dcChargingTime:
//             "30 Min with 50 kW / 358A Charger Input",

//           chargingOptions: [
//             "11.2 kW / 7.2 kW AC",
//             "50 kW DC",
//           ],

//           fastCharging: true,

//           fastChargingTime:
//             "30 minutes with 50 kW / 358A Charger Input",

//           acPowerKw: 7.2,

//           acPowerOptionsKw: [
//             7.2,
//             11.2,
//           ],

//           dcPowerKw: 50,

//           chargingStandard:
//             "CCS-II",
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

//           "Tata Xpres T EV front left side",

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
//       "\n🔎 Verifying inserted Tata Xpres T EV data..."
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
//       "   Max Power:",
//       insertedPayload.maxPower,
//       "bhp"
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
//       "🎉 TATA XPRES T EV INSERT COMPLETED"
//     );

//     console.log(
//       "================================================="
//     );

//     console.log(
//       "Vehicle        : Tata Xpres T EV"
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
//       "Battery        : 32 kWh"
//     );

//     console.log(
//       "Range          : 391 km"
//     );

//     console.log(
//       "Motor Power    : 30 kW"
//     );

//     console.log(
//       "Max Power      : 35.79 bhp @ 5000 rpm"
//     );

//     console.log(
//       "Torque         : 114 Nm"
//     );

//     console.log(
//       "Price          : ₹13.04 Lakh"
//     );

//     console.log(
//       "Rating         : 4.8 / 5"
//     );

//     console.log(
//       "Reviews        : 4"
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
//       "\n❌ XPRES T EV INSERT FAILED"
//     );

//     console.error(
//       "Transaction rolled back."
//     );

//     console.error(error);

//     console.error(
//       "\n⚠️ No partial Tata Xpres T EV data was saved."
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

const VEHICLE_ID = "kia-ev9";
const BRAND_ID = "kia";
const MARKET_ID = "india";

const IMAGE_URL =
  "https://stimg.cardekho.com/images/carexteriorimages/630x420/Kia/EV9/9560/1755866894528/front-left-side-47.jpg";

const SOURCE = "CarDekho";
const SOURCE_URL = "https://www.cardekho.com/kia/ev9/specs";

/* =========================================================
   VARIANTS
========================================================= */

/*
  CarDekho source provided in the input does not expose
  individual EV9 variant names or variant-wise pricing.

  Therefore this represents the published Kia EV9 configuration
  as one canonical database variant rather than inventing
  variant names.
*/

const variants = [
  {
    id: "kia-ev9-standard",
    name: "Kia EV9",
    price: 13000000,
    batteryCapacity: 99.8,
    range: 561,
    motorPower: 283,
    maxPower: 379,
    seats: 6,
  },
];

/* =========================================================
   MAIN
========================================================= */

async function main() {
  const client = await pool.connect();

  try {
    console.log("=================================================");
    console.log("🚗 EVINSIGHTS - ADD KIA EV9");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. BRAND
    ===================================================== */

    console.log("🏷️ Upserting Kia brand...");

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
        "Kia",
        "kia",
        "South Korea",
        null,
        JSON.stringify({
          name: "Kia",
          country: "South Korea",
          slug: "kia",
        }),
        now,
      ]
    );

    console.log("   ✅ Kia brand ready");

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
       3. CLEAN OLD DATA
    ===================================================== */

    console.log("\n🧹 Cleaning existing Kia EV9 records...");

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

    console.log("   ✅ Existing Kia EV9 data cleaned");

    /* =====================================================
       4. CANONICAL VEHICLE DATA
    ===================================================== */

    console.log("\n🚙 Inserting Kia EV9...");

    const vehiclePayload = {
      /* ---------------------------------------------------
         IDENTITY
      --------------------------------------------------- */

      name: "Kia EV9",
      model: "EV9",
      brand: "Kia",
      brandId: BRAND_ID,

      /* ---------------------------------------------------
         SOURCE
      --------------------------------------------------- */

      source: SOURCE,
      sourceUrl: SOURCE_URL,

      /* ---------------------------------------------------
         BATTERY
      --------------------------------------------------- */

      batteryCapacity: 99.8,
      batteryCapacityKwh: 99.8,
      batteryKwh: 99.8,

      batteryOptions: [99.8],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-ion",
      batteryChemistry: "Lithium-ion",

      /* ---------------------------------------------------
         RANGE
      --------------------------------------------------- */

      range: 561,
      rangeKm: 561,

      araiRange: 561,
      midcRange: 561,

      rangeOptions: [561],

      rangeUnit: "km",

      /* ---------------------------------------------------
         MOTOR
      --------------------------------------------------- */

      motorPower: 283,
      motorPowerKw: 283,

      powerKw: 283,
      power: 283,

      powerOptionsKw: [283],

      powerUnit: "kW",

      motorType: "Permanent Magnet Synchronous",

      maxPower: 379,
      maxPowerUnit: "bhp",

      maxPowerOptions: [379],

      maxTorque: 700,
      torque: 700,
      torqueNm: 700,

      torqueUnit: "Nm",

      /* ---------------------------------------------------
         DRIVETRAIN
      --------------------------------------------------- */

      transmission: "Automatic",
      transmissionType: "Automatic",

      gearbox: "1-Speed",

      driveType: "AWD",
      drivetrain: "AWD",

      /* ---------------------------------------------------
         CHARGING
      --------------------------------------------------- */

      chargingPort: "CCS-II",

      chargingTime: "24Min-(10-80%)-350kW",

      /* ---------------------------------------------------
         SEATING
      --------------------------------------------------- */

      seats: 6,
      seatingCapacity: 6,

      seatingOptions: [6],

      /* ---------------------------------------------------
         DIMENSIONS
      --------------------------------------------------- */

      length: 5015,
      lengthMm: 5015,

      width: 1980,
      widthMm: 1980,

      height: 1780,
      heightMm: 1780,

      wheelbase: 3100,
      wheelbaseMm: 3100,

      groundClearance: 198,
      groundClearanceMm: 198,

      bootSpace: 333,
      bootCapacity: 333,
      bootCapacityLitres: 333,

      reportedBootSpace: 239,
      reportedBootCapacityLitres: 239,

      /* ---------------------------------------------------
         CLASSIFICATION
      --------------------------------------------------- */

      bodyType: "SUV",
      fuelType: "Electric",

      /* ---------------------------------------------------
         PRICE
      --------------------------------------------------- */

      priceMin: 13000000,
      priceMax: 13000000,

      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",

      /* ---------------------------------------------------
         RATING
      --------------------------------------------------- */

      rating: 4.9,
      reviewCount: 12,

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

        "Kia EV9",

        "kia-ev9",

        BRAND_ID,

        null,

        ["india"],

        JSON.stringify({
          bodyType: "SUV",
          fuelType: "Electric",
          seatingCapacity: 6,
        }),

        JSON.stringify({
          status: "active",
          launched: true,
          available: true,
        }),

        JSON.stringify({
          title: "Kia EV9",
          slug: "kia-ev9",
          description:
            "Kia EV9 electric SUV with a 99.8 kWh battery, 561 km claimed range, 379 bhp maximum power, 700 Nm torque and AWD.",
        }),

        JSON.stringify({
          ...vehiclePayload,

          specs: {
            battery: 99.8,
            batteryOptions: [99.8],

            range: 561,
            rangeOptions: [561],

            power: 283,
            powerOptions: [283],

            maxPower: 379,

            torque: 700,
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

        4.9,

        12,

        JSON.stringify(vehiclePayload),

        now,
      ]
    );

    console.log("   ✅ Kia EV9 inserted");

    /* =====================================================
       5. VARIANTS + PRICING
    ===================================================== */

    console.log("\n📦 Inserting Kia EV9 variant...");

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

            batteryCapacity: variant.batteryCapacity,
            batteryCapacityKwh: variant.batteryCapacity,

            range: variant.range,
            rangeKm: variant.range,

            motorPower: variant.motorPower,
            motorPowerKw: variant.motorPower,

            maxPower: variant.maxPower,
            maxPowerUnit: "bhp",

            maxTorque: 700,

            transmission: "Automatic",
            transmissionType: "Automatic",

            gearbox: "1-Speed",

            driveType: "AWD",
            drivetrain: "AWD",

            fuelType: "Electric",

            seatingCapacity: variant.seats,

            features: [
              "Power Steering",
              "Anti-lock Braking System (ABS)",
              "Air Conditioner",
              "Driver Airbag",
              "Passenger Airbag",
              "Automatic Climate Control",
              "Alloy Wheels",
              "Multi-function Steering Wheel",
              "Engine Start Stop Button",
              "Hands-Free Boot Opening",
              "Ventilated Seats",
              "Electric Adjustable Front Seats",
              "Cruise Control",
              "Front & Rear Parking Sensors",
              "Keyless Entry",
              "Heated Front & Rear Seats",
              "Dual Sunroof",
              "12.3-Inch Touchscreen",
              "12.3-Inch Digital Cluster",
              "Wireless Android Auto",
              "Wireless Apple CarPlay",
              "14 Speakers",
              "Meridian Premium Sound System",
              "Wireless Phone Charging",
              "360 View Camera",
              "Head-Up Display",
              "ISO-FIX Child Seat Mounts",
              "TPMS",
              "Electronic Stability Control",
            ],
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

            batteryCapacity: variant.batteryCapacity,
            range: variant.range,
            motorPowerKw: variant.motorPower,
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
      batteryCapacity: 99.8,

      batteryCapacityKwh: 99.8,

      batteryKwh: 99.8,

      batteryOptions: [99.8],

      batteryCapacityUnit: "kWh",

      batteryType: "Lithium-ion",

      batteryChemistry: "Lithium-ion",

      range: 561,

      rangeKm: 561,

      rangeOptions: [561],

      rangeUnit: "km",

      chargingPort: "CCS-II",

      charging: {
        dcFastCharging:
          "24Min-(10-80%)-350kW",

        fastCharging: true,

        fastChargingTime:
          "24Min-(10-80%)-350kW",

        chargingOptions: [
          "350 kW DC",
        ],
      },
    };

    /* -----------------------------------------------------
       PERFORMANCE
    ----------------------------------------------------- */

    const performanceData = {
      motorPower: 283,

      motorPowerKw: 283,

      powerOptionsKw: [283],

      powerUnit: "kW",

      motorType:
        "Permanent Magnet Synchronous",

      maxPower: 379,

      maxPowerUnit: "bhp",

      maxPowerOptions: [379],

      maxTorque: 700,

      torque: 700,

      torqueNm: 700,

      torqueUnit: "Nm",

      transmission: "Automatic",

      transmissionType: "Automatic",

      gearbox: "1-Speed",

      driveType: "AWD",

      drivetrain: "AWD",

      regenerativeBraking: true,

      regenerativeBrakingLevels: 4,

      suspensionSteeringBrakes: {
        frontSuspension:
          "MacPherson Strut suspension",

        rearSuspension:
          "Multi-link suspension",

        steeringType: "Electric",

        steeringColumn:
          "Tilt & Telescopic",

        steeringGearType:
          "Rack & Pinion",

        frontBrakeType: "Disc",

        rearBrakeType: "Disc",
      },
    };

    /* -----------------------------------------------------
       DIMENSIONS
    ----------------------------------------------------- */

    const dimensionsData = {
      length: 5015,

      lengthMm: 5015,

      width: 1980,

      widthMm: 1980,

      height: 1780,

      heightMm: 1780,

      wheelbase: 3100,

      wheelbaseMm: 3100,

      seatingCapacity: 6,

      seatingOptions: [6],

      bootSpace: 333,

      bootCapacityLitres: 333,

      reportedBootSpace: 239,

      reportedBootCapacityLitres: 239,

      groundClearance: 198,

      groundClearanceMm: 198,

      exterior: {
        bodyType: "SUV",

        alloyWheels: true,

        rearSpoiler: true,

        roofRails: true,

        projectorHeadlamps: true,

        automaticHeadlamps: true,

        rainSensingWiper: true,

        rearWindowWiper: true,

        rearWindowDefogger: true,

        heatedOutsideRearViewMirror: true,

        electricallyPoweredORVM: true,

        fogLights: "Rear",

        antenna: "Shark Fin",

        sunroof: "Dual Sunroof",

        tyreSize: "275/50 R20",

        tyreType: "Tubeless Radial",

        LEDDRLs: true,

        LEDHeadlamps: true,

        LEDTaillights: true,

        LEDFogLamps: true,
      },
    };

    /* -----------------------------------------------------
       SAFETY
    ----------------------------------------------------- */

    const safetyData = {
      airbags: 10,

      abs: true,

      brakeAssist: true,

      ebd: true,

      esc: true,

      electronicStabilityControl: true,

      tractionControl: true,

      tpms: true,

      rearCamera: true,

      parkingSensors: true,

      frontParkingSensors: true,

      rearParkingSensors: true,

      surroundViewCamera: "360 View",

      isofix: true,

      hillAssist: true,

      hillDescentControl: true,

      electronicParkingBrake: true,

      centralLocking: true,

      childSafetyLocks: true,

      antiTheftAlarm: true,

      engineImmobilizer: true,

      hud: true,

      antiPinchPowerWindows:
        "Driver and Passenger",

      rearCameraGuidelines: true,

      adas: {
        available: true,

        features: [
          "Forward Collision Warning",
          "Automatic Emergency Braking",
          "Oncoming Lane Mitigation",
          "Speed Assist System",
          "Blind Spot Collision Avoidance Assist",
          "Lane Departure Warning",
          "Lane Keep Assist",
          "Lane Departure Prevention Assist",
          "Driver Attention Warning",
          "Adaptive Cruise Control",
          "Adaptive High Beam Assist",
          "Rear Cross Traffic Alert",
          "Rear Cross Traffic Collision-Avoidance Assist",
          "Blind Spot Monitor",
        ],
      },
    };

    /* -----------------------------------------------------
       FEATURES
    ----------------------------------------------------- */

    const featuresData = {
      comfortConvenience: {
        handsFreeBootOpening: true,

        powerSteering: true,

        automaticClimateControl: true,

        heater: true,

        adjustableSteering:
          "Height & Reach",

        heightAdjustableDriverSeat: true,

        ventilatedSeats: true,

        electricAdjustableSeats:
          "Front",

        airQualityControl: true,

        rearSeatHeadrest: "Adjustable",

        adjustableHeadrest: true,

        rearSeatCentreArmRest: true,

        rearACVents: true,

        cruiseControl: true,

        parkingSensors:
          "Front & Rear",

        realTimeVehicleTracking: true,

        foldableRearSeat:
          "3rd Row 50:50 Split",

        keylessEntry: true,

        engineStartStopButton: true,

        usbCharger:
          "Front & Rear",

        centralConsoleArmrest:
          "With Storage",

        gloveBoxLight: true,

        followMeHomeHeadlamps: true,

        vehicleToVehicleCharging: true,

        vehicleToLoadCharging: true,

        driveModeTypes: [
          "ECO",
          "NORMAL",
          "SPORT",
        ],

        powerWindows:
          "Front & Rear",

        cupHolders: "Front Only",

        heatedSeats:
          "Front & Rear",
      },

      interior: {
        leatherWrappedSteeringWheel: true,

        gloveBox: true,

        lighting: "Ambient light",

        digitalCluster: true,

        digitalClusterSize: "12.3",

        upholstery: "Leatherette",

        ambientLightColourNumbers: 64,
      },

      entertainmentCommunication: {
        radio: true,

        wirelessPhoneCharging: true,

        bluetoothConnectivity: true,

        touchscreen: true,

        touchscreenSize: "12.3 inch",

        androidAuto: true,

        appleCarPlay: true,

        noOfSpeakers: 14,

        speakers: "Front & Rear",

        additionalFeatures:
          "Wireless Android Auto and Apple CarPlay, Meridian Premium Sound System with 14 Speakers",
      },

      advancedInternetFeatures: {
        /*
          The provided source contains these feature names,
          but does not provide values for them.
          Therefore no unsupported values are added here.
        */

        availableFields: [
          "Live Location",
          "Digital Car Key",
          "Navigation with Live Traffic",
          "Live Weather",
          "E-Call & I-Call",
          "Over the Air (OTA) Updates",
          "SOS Button",
          "RSA",
          "Remote Door Lock/Unlock",
          "SOS / Emergency Assistance",
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
            "24Min-(10-80%)-350kW",

          dcCharging:
            "24Min-(10-80%)-350kW",

          chargingOptions: [
            "350 kW DC",
          ],

          fastCharging: true,

          dcPowerKw: 350,

          chargingStandard: "CCS-II",
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

          "Kia EV9 front left side",

          JSON.stringify({
            source: SOURCE,
            sourceUrl: SOURCE_URL,
            role: "primary",
          }),
        ]
      );

      console.log(
        "   ✅ Main image inserted"
      );
    } else {
      console.log(
        "   ⚠️ Main image skipped"
      );
    }

    /* =====================================================
       9. VERIFY BEFORE COMMIT
    ===================================================== */

    console.log(
      "\n🔎 Verifying inserted Kia EV9 data..."
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
      "   Drivetrain:",
      insertedPayload.driveType
    );

    console.log(
      "   Seats:",
      insertedPayload.seats
    );

    console.log(
      "   Length:",
      insertedPayload.length,
      "mm"
    );

    console.log(
      "   Width:",
      insertedPayload.width,
      "mm"
    );

    console.log(
      "   Height:",
      insertedPayload.height,
      "mm"
    );

    console.log(
      "   Wheelbase:",
      insertedPayload.wheelbase,
      "mm"
    );

    console.log(
      "   Boot Space:",
      insertedPayload.bootSpace,
      "Litres"
    );

    console.log(
      "   Ground Clearance:",
      insertedPayload.groundClearance,
      "mm"
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
      "🎉 KIA EV9 INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle        : Kia EV9"
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
      "Battery        : 99.8 kWh"
    );

    console.log(
      "Range          : 561 km claimed"
    );

    console.log(
      "Motor Power    : 283 kW"
    );

    console.log(
      "Max Power      : 379 bhp"
    );

    console.log(
      "Torque         : 700 Nm"
    );

    console.log(
      "Drivetrain     : AWD"
    );

    console.log(
      "Seats          : 6"
    );

    console.log(
      "Price          : ₹1.30 Cr"
    );

    console.log(
      "Rating         : 4.9 / 5"
    );

    console.log(
      "Reviews        : 12"
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
      "\n❌ KIA EV9 INSERT FAILED"
    );

    console.error(
      "Transaction rolled back."
    );

    console.error(error);

    console.error(
      "\n⚠️ No partial Kia EV9 data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();

