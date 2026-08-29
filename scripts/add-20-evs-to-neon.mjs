// import pg from "pg";

// const { Client } = pg;

// /*
// =========================================================
//  EVINSIGHTS
//  ADD 20 EV VEHICLES TO NEON
// =========================================================

// Run:

// node --env-file=.env.local scripts/add-20-evs-to-neon.mjs

// This script:
// - Inserts missing brands
// - Inserts 20 vehicles
// - Inserts variants
// - Inserts pricing
// - Inserts specifications
// - Inserts charging data
// - Fetches 5-6 real vehicle images from Wikimedia Commons
// - Inserts media records
// - Skips existing vehicles
// - Uses transaction
// =========================================================
// */

// const DATABASE_URL = process.env.DATABASE_URL;

// console.log("DATABASE HOST:");
// console.log(
//   DATABASE_URL
//     ?.replace(/^postgres(?:ql)?:\/\//, "")
//     .split("@")[1]
//     ?.split("/")[0]
// );

// if (!DATABASE_URL) {
//   throw new Error(
//     "DATABASE_URL missing. Make sure .env.local contains DATABASE_URL.",
//   );
// }

// const db = new Client({
//   connectionString: DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// /*
// =========================================================
//  HELPERS
// =========================================================
// */

// function slugify(value) {
//   return String(value)
//     .toLowerCase()
//     .trim()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");
// }

// function unique(values) {
//   return [...new Set(values.filter(Boolean))];
// }

// function now() {
//   return new Date().toISOString();
// }

// function makeId(prefix, value) {
//   return `${prefix}-${slugify(value)}`;
// }

// /*
// =========================================================
//  BRANDS
// =========================================================
// */

// const brands = [
//   {
//     id: "tata",
//     name: "Tata Motors",
//     slug: "tata-motors",
//   },
//   {
//     id: "hyundai",
//     name: "Hyundai",
//     slug: "hyundai",
//   },
//   {
//     id: "mg",
//     name: "MG Motor",
//     slug: "mg-motor",
//   },
//   {
//     id: "bmw",
//     name: "BMW",
//     slug: "bmw",
//   },
//   {
//     id: "mahindra",
//     name: "Mahindra",
//     slug: "mahindra",
//   },
//   {
//     id: "byd",
//     name: "BYD",
//     slug: "byd",
//   },
//   {
//     id: "kia",
//     name: "Kia",
//     slug: "kia",
//   },
//   {
//     id: "citroen",
//     name: "Citroën",
//     slug: "citroen",
//   },
//   {
//     id: "mercedes-benz",
//     name: "Mercedes-Benz",
//     slug: "mercedes-benz",
//   },
// ];

// /*
// =========================================================
//  VEHICLES
// =========================================================
// */

// const vehicles = [
//   {
//     id: "tata-punch-ev",
//     name: "Punch EV",
//     brandId: "tata",
//     bodyType: "SUV",
//     battery: 40,
//     range: 468,
//     price: 969000,
//     motorPower: 95,
//     charging: {
//       ac: "3.3 kW",
//       dc: "Fast DC charging",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "tata-punch-ev-smart-30",
//         name: "Smart 30",
//         battery: 30,
//         range: 315,
//         price: 969000,
//       },
//       {
//         id: "tata-punch-ev-empowered-40",
//         name: "Empowered 40",
//         battery: 40,
//         range: 468,
//         price: 1259000,
//       },
//     ],
//   },

//   {
//     id: "tata-tiago-ev",
//     name: "Tiago EV",
//     brandId: "tata",
//     bodyType: "Hatchback",
//     battery: 24,
//     range: 315,
//     price: 799000,
//     motorPower: 55,
//     charging: {
//       ac: "7.2 kW",
//       dc: "Fast DC charging",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "tata-tiago-ev-medium-range",
//         name: "Medium Range",
//         battery: 19.2,
//         range: 250,
//         price: 699000,
//       },
//       {
//         id: "tata-tiago-ev-long-range",
//         name: "Long Range",
//         battery: 24,
//         range: 315,
//         price: 799000,
//       },
//     ],
//   },

//   {
//     id: "tata-tigor-ev",
//     name: "Tigor EV",
//     brandId: "tata",
//     bodyType: "Sedan",
//     battery: 26,
//     range: 315,
//     price: 1249000,
//     motorPower: 55,
//     charging: {
//       ac: "3.3 kW",
//       dc: "Fast DC charging",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "tata-tigor-ev-xe",
//         name: "XE",
//         battery: 26,
//         range: 315,
//         price: 1249000,
//       },
//       {
//         id: "tata-tigor-ev-xz-plus",
//         name: "XZ Plus",
//         battery: 26,
//         range: 315,
//         price: 1299000,
//       },
//     ],
//   },

//   {
//     id: "tata-harrier-ev",
//     name: "Harrier EV",
//     brandId: "tata",
//     bodyType: "SUV",
//     battery: 75,
//     range: 627,
//     price: 2169000,
//     motorPower: 158,
//     charging: {
//       ac: "11 kW",
//       dc: "175 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "tata-harrier-ev-65",
//         name: "65 RWD",
//         battery: 65,
//         range: 538,
//         price: 2169000,
//       },
//       {
//         id: "tata-harrier-ev-75",
//         name: "75 RWD",
//         battery: 75,
//         range: 627,
//         price: 2399000,
//       },
//     ],
//   },

//   {
//     id: "hyundai-creta-electric",
//     name: "Creta Electric",
//     brandId: "hyundai",
//     bodyType: "SUV",
//     battery: 51.4,
//     range: 510,
//     price: 1802800,
//     motorPower: 126,
//     charging: {
//       ac: "7.4 kW",
//       dc: "100+ kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "hyundai-creta-electric-42",
//         name: "Executive 42",
//         battery: 42,
//         range: 420,
//         price: 1802800,
//       },
//       {
//         id: "hyundai-creta-electric-lr",
//         name: "Excellence LR",
//         battery: 51.4,
//         range: 510,
//         price: 2399000,
//       },
//     ],
//   },

//   {
//     id: "mg-comet-ev",
//     name: "Comet EV",
//     brandId: "mg",
//     bodyType: "Hatchback",
//     battery: 17.3,
//     range: 230,
//     price: 499000,
//     motorPower: 31,
//     charging: {
//       ac: "3.3 kW",
//       dc: null,
//       standard: "AC",
//     },
//     variants: [
//       {
//         id: "mg-comet-ev-excite",
//         name: "Excite",
//         battery: 17.3,
//         range: 230,
//         price: 699000,
//       },
//       {
//         id: "mg-comet-ev-exclusive",
//         name: "Exclusive",
//         battery: 17.3,
//         range: 230,
//         price: 799000,
//       },
//     ],
//   },

//   {
//     id: "mg-windsor-ev",
//     name: "Windsor EV",
//     brandId: "mg",
//     bodyType: "Crossover",
//     battery: 38,
//     range: 331,
//     price: 999000,
//     motorPower: 100,
//     charging: {
//       ac: "7.4 kW",
//       dc: "45 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "mg-windsor-ev-excite",
//         name: "Excite",
//         battery: 38,
//         range: 331,
//         price: 999000,
//       },
//       {
//         id: "mg-windsor-ev-exclusive",
//         name: "Exclusive",
//         battery: 38,
//         range: 331,
//         price: 1099000,
//       },
//     ],
//   },

//   {
//     id: "mahindra-be-6",
//     name: "BE 6",
//     brandId: "mahindra",
//     bodyType: "SUV",
//     battery: 79,
//     range: 682,
//     price: 1890000,
//     motorPower: 210,
//     charging: {
//       ac: "11.2 kW",
//       dc: "175 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "mahindra-be-6-pack-one",
//         name: "Pack One",
//         battery: 59,
//         range: 556,
//         price: 1890000,
//       },
//       {
//         id: "mahindra-be-6-pack-three",
//         name: "Pack Three",
//         battery: 79,
//         range: 682,
//         price: 2690000,
//       },
//     ],
//   },

//   {
//     id: "mahindra-xev-9e",
//     name: "XEV 9e",
//     brandId: "mahindra",
//     bodyType: "SUV Coupe",
//     battery: 79,
//     range: 656,
//     price: 2190000,
//     motorPower: 210,
//     charging: {
//       ac: "11.2 kW",
//       dc: "175 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "mahindra-xev-9e-pack-one",
//         name: "Pack One",
//         battery: 59,
//         range: 542,
//         price: 2190000,
//       },
//       {
//         id: "mahindra-xev-9e-pack-three",
//         name: "Pack Three",
//         battery: 79,
//         range: 656,
//         price: 3050000,
//       },
//     ],
//   },

//   {
//     id: "byd-atto-3",
//     name: "Atto 3",
//     brandId: "byd",
//     bodyType: "SUV",
//     battery: 60.48,
//     range: 521,
//     price: 2499000,
//     motorPower: 150,
//     charging: {
//       ac: "7 kW",
//       dc: "80 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "byd-atto-3-dynamic",
//         name: "Dynamic",
//         battery: 49.92,
//         range: 468,
//         price: 2499000,
//       },
//       {
//         id: "byd-atto-3-premium",
//         name: "Premium",
//         battery: 60.48,
//         range: 521,
//         price: 3399000,
//       },
//     ],
//   },

//   {
//     id: "byd-seal",
//     name: "Seal",
//     brandId: "byd",
//     bodyType: "Sedan",
//     battery: 82.56,
//     range: 650,
//     price: 4100000,
//     motorPower: 230,
//     charging: {
//       ac: "11 kW",
//       dc: "150 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "byd-seal-premium",
//         name: "Premium",
//         battery: 82.56,
//         range: 650,
//         price: 4100000,
//       },
//       {
//         id: "byd-seal-performance",
//         name: "Performance AWD",
//         battery: 82.56,
//         range: 580,
//         price: 5300000,
//       },
//     ],
//   },

//   {
//     id: "byd-emax-7",
//     name: "eMAX 7",
//     brandId: "byd",
//     bodyType: "MPV",
//     battery: 71.8,
//     range: 530,
//     price: 2690000,
//     motorPower: 150,
//     charging: {
//       ac: "7 kW",
//       dc: "115 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "byd-emax-7-premium",
//         name: "Premium",
//         battery: 55.4,
//         range: 420,
//         price: 2690000,
//       },
//       {
//         id: "byd-emax-7-superior",
//         name: "Superior",
//         battery: 71.8,
//         range: 530,
//         price: 2930000,
//       },
//     ],
//   },

//   {
//     id: "byd-sealion-7",
//     name: "Sealion 7",
//     brandId: "byd",
//     bodyType: "SUV",
//     battery: 82.56,
//     range: 567,
//     price: 4790000,
//     motorPower: 230,
//     charging: {
//       ac: "11 kW",
//       dc: "150 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "byd-sealion-7-premium",
//         name: "Premium",
//         battery: 82.56,
//         range: 567,
//         price: 4790000,
//       },
//       {
//         id: "byd-sealion-7-performance",
//         name: "Performance AWD",
//         battery: 82.56,
//         range: 542,
//         price: 5390000,
//       },
//     ],
//   },

//   {
//     id: "kia-ev6",
//     name: "EV6",
//     brandId: "kia",
//     bodyType: "Crossover",
//     battery: 84,
//     range: 663,
//     price: 6595000,
//     motorPower: 239,
//     charging: {
//       ac: "11 kW",
//       dc: "350 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "kia-ev6-gt-line",
//         name: "GT Line",
//         battery: 84,
//         range: 663,
//         price: 6595000,
//       },
//       {
//         id: "kia-ev6-gt-line-awd",
//         name: "GT Line AWD",
//         battery: 84,
//         range: 663,
//         price: 7195000,
//       },
//     ],
//   },

//   {
//     id: "citroen-e-c3",
//     name: "ë-C3",
//     brandId: "citroen",
//     bodyType: "Hatchback",
//     battery: 29.2,
//     range: 320,
//     price: 1199000,
//     motorPower: 42,
//     charging: {
//       ac: "3.3 kW",
//       dc: "50 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "citroen-e-c3-live",
//         name: "Live",
//         battery: 29.2,
//         range: 320,
//         price: 1199000,
//       },
//       {
//         id: "citroen-e-c3-feel",
//         name: "Feel",
//         battery: 29.2,
//         range: 320,
//         price: 1299000,
//       },
//     ],
//   },

//   {
//     id: "bmw-ix1",
//     name: "iX1",
//     brandId: "bmw",
//     bodyType: "SUV",
//     battery: 66.4,
//     range: 440,
//     price: 4950000,
//     motorPower: 230,
//     charging: {
//       ac: "11 kW",
//       dc: "130 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "bmw-ix1-xdrive30",
//         name: "xDrive30",
//         battery: 66.4,
//         range: 440,
//         price: 4950000,
//       },
//     ],
//   },

//   {
//     id: "bmw-i4",
//     name: "i4",
//     brandId: "bmw",
//     bodyType: "Sedan",
//     battery: 83.9,
//     range: 590,
//     price: 7290000,
//     motorPower: 210,
//     charging: {
//       ac: "11 kW",
//       dc: "205 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "bmw-i4-edrive40",
//         name: "eDrive40",
//         battery: 83.9,
//         range: 590,
//         price: 7290000,
//       },
//     ],
//   },

//   {
//     id: "mercedes-eqa",
//     name: "EQA",
//     brandId: "mercedes-benz",
//     bodyType: "SUV",
//     battery: 70.5,
//     range: 560,
//     price: 6760000,
//     motorPower: 140,
//     charging: {
//       ac: "11 kW",
//       dc: "100 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "mercedes-eqa-250-plus",
//         name: "EQA 250+",
//         battery: 70.5,
//         range: 560,
//         price: 6760000,
//       },
//     ],
//   },

//   {
//     id: "mercedes-eqb",
//     name: "EQB",
//     brandId: "mercedes-benz",
//     bodyType: "SUV",
//     battery: 70.5,
//     range: 447,
//     price: 7080000,
//     motorPower: 168,
//     charging: {
//       ac: "11 kW",
//       dc: "100 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "mercedes-eqb-250-plus",
//         name: "EQB 250+",
//         battery: 70.5,
//         range: 447,
//         price: 7080000,
//       },
//       {
//         id: "mercedes-eqb-350-4matic",
//         name: "EQB 350 4MATIC",
//         battery: 66.5,
//         range: 423,
//         price: 7950000,
//       },
//     ],
//   },

//   {
//     id: "hyundai-ioniq-6",
//     name: "Ioniq 6",
//     brandId: "hyundai",
//     bodyType: "Sedan",
//     battery: 77.4,
//     range: 614,
//     price: 6500000,
//     motorPower: 168,
//     charging: {
//       ac: "11 kW",
//       dc: "350 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "hyundai-ioniq-6-rwd",
//         name: "Long Range RWD",
//         battery: 77.4,
//         range: 614,
//         price: 6500000,
//       },
//     ],
//   },

//   {
//     id: "hyundai-kona-electric",
//     name: "Kona Electric",
//     brandId: "hyundai",
//     bodyType: "SUV",
//     battery: 48.4,
//     range: 452,
//     price: 2000000,
//     motorPower: 99,
//     charging: {
//       ac: "7.2 kW",
//       dc: "100 kW",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "hyundai-kona-electric-premium",
//         name: "Premium",
//         battery: 48.4,
//         range: 452,
//         price: 2000000,
//       },
//     ],
//   },

//   {
//     id: "tata-avinya",
//     name: "Avinya",
//     brandId: "tata",
//     bodyType: "Crossover",
//     battery: 60,
//     range: 500,
//     price: 2500000,
//     motorPower: 150,
//     charging: {
//       ac: "11 kW",
//       dc: "Fast DC",
//       standard: "CCS2",
//     },
//     variants: [
//       {
//         id: "tata-avinya-base",
//         name: "Avinya",
//         battery: 60,
//         range: 500,
//         price: 2500000,
//       },
//     ],
//   },
// ];

// /*
// =========================================================
//  IMPORTANT:
//  Existing EVInsights database already contains:

//  hyundai-ioniq-5
//  tesla-model-y
//  tata-nexon-ev
//  mg-zs-ev
//  bmw-ix
//  tata-curvv-ev

//  They are NOT included above.
// =========================================================
// */

// /*
// =========================================================
//  WIKIMEDIA IMAGE SEARCH
// =========================================================
// */

// // async function getVehicleImages(vehicleName) {
// //   const searchQueries = [
// //     `${vehicleName} electric car`,
// //     `${vehicleName} EV`,
// //     vehicleName,
// //   ];

// //   const found = [];

// //   for (const searchQuery of searchQueries) {
// //     if (found.length >= 6) break;

// //     try {
// //       const url =
// //         "https://commons.wikimedia.org/w/api.php?" +
// //         new URLSearchParams({
// //           action: "query",
// //           generator: "search",
// //           gsrsearch: searchQuery,
// //           gsrnamespace: "6",
// //           gsrlimit: "20",
// //           prop: "imageinfo",
// //           iiprop: "url|mime|size",
// //           iiurlwidth: "1200",
// //           format: "json",
// //           origin: "*",
// //         });

// //       const response = await fetch(url);

// //       if (!response.ok) {
// //         continue;
// //       }

// //       const json = await response.json();

// //       const pages = Object.values(json?.query?.pages || {});

// //       for (const page of pages) {
// //         const info = page?.imageinfo?.[0];

// //         if (!info?.thumburl && !info?.url) {
// //           continue;
// //         }

// //         const mime = info.mime || "";

// //         if (!mime.startsWith("image/")) {
// //           continue;
// //         }

// //         const imageUrl = info.thumburl || info.url;

// //         if (!imageUrl) {
// //           continue;
// //         }

// //         if (found.some((item) => item.url === imageUrl)) {
// //           continue;
// //         }

// //         found.push({
// //           url: imageUrl,
// //           alt: vehicleName,
// //           type: "image",
// //           source: "Wikimedia Commons",
// //         });

// //         if (found.length >= 6) {
// //           break;
// //         }
// //       }
// //     } catch (error) {
// //       console.warn(`⚠️ Image search failed for ${vehicleName}:`, error.message);
// //     }
// //   }

// //   return found.slice(0, 6);
// // }


// /*
// =========================================================
//  VERIFIED WIKIMEDIA VEHICLE IMAGE LOADER
// =========================================================

// IMPORTANT:
// - Generic Wikimedia search is NOT used.
// - We only accept images whose Wikimedia category/title
//   strongly matches the vehicle.
// - Unrelated images are rejected.
// - Only image URLs are stored in Neon.
// - No image files are downloaded/stored.
// =========================================================
// */

// const WIKIMEDIA_API =
//   "https://commons.wikimedia.org/w/api.php";

// const VEHICLE_WIKIMEDIA_CATEGORIES = {
//   "tata-punch-ev": "Tata Punch EV",
//   "tata-tiago-ev": "Tata Tiago EV",
//   "tata-tigor-ev": "Tata Tigor EV",
//   "tata-harrier-ev": "Tata Harrier EV",

//   "hyundai-creta-electric": "Hyundai Creta Electric",
//   "hyundai-ioniq-6": "Hyundai Ioniq 6",
//   "hyundai-kona-electric": "Hyundai Kona Electric",

//   "mg-comet-ev": "MG Comet EV",
//   "mg-windsor-ev": "MG Windsor EV",

//   "mahindra-be-6": "Mahindra BE 6",
//   "mahindra-xev-9e": "Mahindra XEV 9e",

//   "byd-atto-3": "BYD Atto 3",
//   "byd-seal": "BYD Seal",
//   "byd-emax-7": "BYD eMAX 7",
//   "byd-sealion-7": "BYD Sealion 7",

//   "kia-ev6": "Kia EV6",

//   "citroen-e-c3": "Citroën ë-C3",

//   "bmw-ix1": "BMW iX1",
//   "bmw-i4": "BMW i4",

//   "mercedes-eqa": "Mercedes-Benz EQA",
//   "mercedes-eqb": "Mercedes-Benz EQB",

//   "tata-avinya": "Tata Avinya",
// };


// /*
// ---------------------------------------------------------
//  NORMALIZE TEXT
// ---------------------------------------------------------
// */

// function normalizeVehicleText(value) {
//   return String(value || "")
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9]+/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();
// }


// /*
// ---------------------------------------------------------
//  VEHICLE MATCH
// ---------------------------------------------------------
// */

// function isLikelyVehicleImage(title, vehicleName) {
//   const titleText = normalizeVehicleText(title);
//   const vehicleText = normalizeVehicleText(vehicleName);

//   const words = vehicleText
//     .split(" ")
//     .filter((word) => word.length >= 2);

//   /*
//    Every important vehicle word should appear in the
//    Wikimedia file title.
//   */

//   const matchedWords = words.filter((word) =>
//     titleText.includes(word)
//   );

//   if (words.length === 0) {
//     return false;
//   }

//   const matchRatio =
//     matchedWords.length / words.length;

//   /*
//    Require strong title matching.
//   */

//   if (matchRatio < 0.7) {
//     return false;
//   }

//   /*
//    Reject obvious non-car content.
//   */

//   const blockedWords = [
//     "logo",
//     "badge",
//     "poster",
//     "document",
//     "brochure",
//     "money",
//     "currency",
//     "banknote",
//     "art",
//     "painting",
//     "illustration",
//     "drawing",
//     "map",
//     "flag",
//     "symbol",
//     "screenshot",
//     "diagram",
//     "newspaper",
//   ];

//   if (
//     blockedWords.some((word) =>
//       titleText.includes(word)
//     )
//   ) {
//     return false;
//   }

//   return true;
// }


// /*
// ---------------------------------------------------------
//  FETCH IMAGES FROM EXACT WIKIMEDIA CATEGORY
// ---------------------------------------------------------
// */

// async function getVehicleImages(vehicle) {
//   const categoryName =
//     VEHICLE_WIKIMEDIA_CATEGORIES[vehicle.id];

//   if (!categoryName) {
//     console.log(
//       `   ⚠️ No verified Wikimedia category configured for ${vehicle.name}`
//     );

//     return [];
//   }

//   const categoryTitle = `Category:${categoryName}`;

//   console.log(
//     `   🔎 Searching verified category: ${categoryTitle}`
//   );

//   const found = [];
//   let continuation = null;

//   try {
//     do {
//       const params = new URLSearchParams({
//         action: "query",
//         generator: "categorymembers",
//         gcmtitle: categoryTitle,
//         gcmtype: "file",
//         gcmlimit: "50",

//         prop: "imageinfo",
//         iiprop: "url|mime|size",
//         iiurlwidth: "1400",

//         format: "json",
//         origin: "*",
//       });

//       if (continuation) {
//         params.set(
//           "gcmcontinue",
//           continuation
//         );
//       }

//       const response = await fetch(
//         `${WIKIMEDIA_API}?${params.toString()}`
//       );

//       if (!response.ok) {
//         throw new Error(
//           `Wikimedia HTTP ${response.status}`
//         );
//       }

//       const json = await response.json();

//       const pages = Object.values(
//         json?.query?.pages || {}
//       );

//       for (const page of pages) {
//         if (found.length >= 6) {
//           break;
//         }

//         const title =
//           page?.title || "";

//         /*
//          IMPORTANT:
//          Category membership alone is not enough.
//          We also validate the file title.
//         */

//         if (
//           !isLikelyVehicleImage(
//             title,
//             vehicle.name
//           )
//         ) {
//           continue;
//         }

//         const info =
//           page?.imageinfo?.[0];

//         if (!info) {
//           continue;
//         }

//         const mime =
//           info.mime || "";

//         if (
//           !mime.startsWith("image/")
//         ) {
//           continue;
//         }

//         const imageUrl =
//           info.thumburl ||
//           info.url;

//         if (!imageUrl) {
//           continue;
//         }

//         if (
//           found.some(
//             (item) =>
//               item.url === imageUrl
//           )
//         ) {
//           continue;
//         }

//         found.push({
//           url: imageUrl,
//           alt: vehicle.name,
//           type: "image",
//           source:
//             "Wikimedia Commons",
//           title,
//           license:
//             "See Wikimedia Commons file page",
//         });

//         console.log(
//           `      ✅ ${title}`
//         );
//       }

//       continuation =
//         json?.continue?.gcmcontinue ||
//         null;

//     } while (
//       continuation &&
//       found.length < 6
//     );

//   } catch (error) {
//     console.warn(
//       `   ⚠️ Wikimedia image lookup failed for ${vehicle.name}:`,
//       error.message
//     );

//     return [];
//   }

//   /*
//   -------------------------------------------------------
//   IMPORTANT SAFETY RULE
//   -------------------------------------------------------

//   We DO NOT fill missing images with random images.

//   If only 2 verified images exist,
//   only 2 are inserted.
//   -------------------------------------------------------
//   */

//   if (found.length === 0) {
//     console.log(
//       `   ⚠️ No verified images found for ${vehicle.name}`
//     );
//   } else {
//     console.log(
//       `   🖼️ Verified images found: ${found.length}`
//     );
//   }

//   return found.slice(0, 6);
// }


// /*
// =========================================================
//  SQL HELPERS
// =========================================================
// */

// async function vehicleExists(id) {
//   const result = await db.query(
//     `
//       SELECT id
//       FROM vehicles
//       WHERE id = $1
//       LIMIT 1
//     `,
//     [id],
//   );

//   return result.rows.length > 0;
// }

// async function brandExists(id) {
//   const result = await db.query(
//     `
//       SELECT id
//       FROM brands
//       WHERE id = $1
//       LIMIT 1
//     `,
//     [id],
//   );

//   return result.rows.length > 0;
// }

// /*
// =========================================================
//  INSERT BRAND
// =========================================================
// */

// async function insertBrand(brand) {
//   if (await brandExists(brand.id)) {
//     return;
//   }

//   console.log(`   + Brand: ${brand.name}`);

//   await db.query(
//     `
//       INSERT INTO brands (
//         id,
//         name,
//         slug
//       )
//       VALUES ($1, $2, $3)
//       ON CONFLICT (id)
//       DO NOTHING
//     `,
//     [brand.id, brand.name, brand.slug],
//   );
// }

// /*
// =========================================================
//  INSERT VEHICLE
// =========================================================
// */

// async function insertVehicle(vehicle) {
//   const createdAt = now();

//   const payload = {
//     identity: {
//       id: vehicle.id,
//       name: vehicle.name,
//       slug: vehicle.id,
//       brandId: vehicle.brandId,
//     },

//     name: vehicle.name,

//     slug: vehicle.id,

//     classification: {
//       bodyType: vehicle.bodyType,
//       fuelType: "Electric",
//       drivetrain: "EV",
//     },

//     extracted: {
//       price: {
//         amount: vehicle.price,
//         currency: "INR",
//         currencyCode: "INR",
//         currencySymbol: "₹",
//       },

//       specs: {
//         battery: vehicle.battery,
//         batteryKwh: vehicle.battery,
//         range: vehicle.range,
//         rangeKm: vehicle.range,
//         bodyType: vehicle.bodyType,
//       },
//     },

//     pricing: {
//       price: {
//         amount: vehicle.price,
//         currency: "INR",
//       },
//     },

//     metadata: {
//       source: "EVInsights seed",
//       image: null,
//       imageUrl: null,
//     },

//     status: {
//       active: true,
//     },

//     sourceIds: [],

//     variantIds: vehicle.variants.map((variant) => variant.id),

//     specificationIds: [],

//     chargingIds: [],

//     mediaIds: [],

//     pricingIds: [],
//   };

//   const result = await db.query(
//     `
//       INSERT INTO vehicles (
//         id,
//         name,
//         slug,
//         brand_id,
//         payload,
//         metadata,
//         classification,
//         status,
//         extracted,
//         created_at,
//         updated_at
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5::jsonb,
//         $6::jsonb,
//         $7::jsonb,
//         $8::jsonb,
//         $9::jsonb,
//         $10,
//         $10
//       )
//       ON CONFLICT (id)
//       DO NOTHING
//       RETURNING id
//     `,
//     [
//       vehicle.id,
//       vehicle.name,
//       vehicle.id,
//       vehicle.brandId,
//       JSON.stringify(payload),
//       JSON.stringify(payload.metadata),
//       JSON.stringify(payload.classification),
//       JSON.stringify(payload.status),
//       JSON.stringify(payload.extracted),
//       createdAt,
//     ],
//   );

//   return result.rows.length > 0;
// }

// /*
// =========================================================
//  INSERT VARIANT
// =========================================================
// */

// async function insertVariant(vehicle, variant) {
//   const payload = {
//     id: variant.id,
//     name: variant.name,
//     slug: variant.id,
//     vehicleId: vehicle.id,

//     battery: variant.battery,
//     batteryKwh: variant.battery,

//     range: variant.range,
//     rangeKm: variant.range,

//     price: {
//       amount: variant.price,
//       currency: "INR",
//       currencyCode: "INR",
//       currencySymbol: "₹",
//     },

//     pricingIds: [`pricing-${variant.id}`],

//     specificationIds: {},

//     chargingIds: [],

//     mediaIds: [],

//     sourceIds: [],
//   };

//   await db.query(
//     `
//       INSERT INTO variants (
//         id,
//         vehicle_id,
//         name,
//         slug,
//         payload,
//         created_at,
//         updated_at
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5::jsonb,
//         $6,
//         $6
//       )
//       ON CONFLICT (id)
//       DO NOTHING
//     `,
//     [
//       variant.id,
//       vehicle.id,
//       variant.name,
//       variant.id,
//       JSON.stringify(payload),
//       now(),
//     ],
//   );
// }

// /*
// =========================================================
//  INSERT PRICING
// =========================================================
// */

// async function insertPricing(vehicle, variant) {
//   const pricingId = `pricing-${variant.id}`;

//   const payload = {
//     amount: variant.price,
//     currency: "INR",
//     currencyCode: "INR",
//     currencySymbol: "₹",

//     vehicleId: vehicle.id,
//     variantId: variant.id,

//     source: "EVInsights seed",
//   };

//   await db.query(
//     `
//       INSERT INTO pricing (
//         id,
//         variant_id,
//         amount,
//         currency_code,
//         currency_symbol,
//         payload,
//         created_at,
//         updated_at
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         'INR',
//         '₹',
//         $4::jsonb,
//         $5,
//         $5
//       )
//       ON CONFLICT (id)
//       DO NOTHING
//     `,
//     [pricingId, variant.id, variant.price, JSON.stringify(payload), now()],
//   );
// }

// /*
// =========================================================
//  INSERT SPECIFICATIONS
// =========================================================
// */

// async function insertSpecifications(vehicle) {
//   const specs = [
//     {
//       type: "battery",
//       data: {
//         capacityKwh: vehicle.battery,
//         capacity: vehicle.battery,
//         chemistry: "Lithium-ion",
//       },
//     },

//     {
//       type: "performance",
//       data: {
//         motorPowerKw: vehicle.motorPower,
//         drivetrain: "Electric",
//       },
//     },

//     {
//       type: "dimensions",
//       data: {
//         bodyType: vehicle.bodyType,
//       },
//     },

//     {
//       type: "features",
//       data: {
//         electricVehicle: true,
//         regenerativeBraking: true,
//       },
//     },

//     {
//       type: "safety",
//       data: {
//         abs: true,
//         airbags: true,
//         esc: true,
//       },
//     },
//   ];

//   const ids = [];

//   for (const spec of specs) {
//     const specificationId = `${vehicle.id}-${spec.type}`;

//     ids.push(specificationId);

//     const payload = {
//       vehicleId: vehicle.id,
//       type: spec.type,
//       ...spec.data,
//     };

//     await db.query(
//       `
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
//         DO NOTHING
//       `,
//       [
//         specificationId,
//         vehicle.id,
//         spec.type,
//         JSON.stringify(spec.data),
//         JSON.stringify(payload),
//       ],
//     );
//   }

//   return ids;
// }

// /*
// =========================================================
//  INSERT CHARGING
// =========================================================
// */

// async function insertCharging(vehicle) {
//   const chargingId = `${vehicle.id}-charging`;

//   const payload = {
//     vehicleId: vehicle.id,

//     acCharging: vehicle.charging.ac,

//     dcCharging: vehicle.charging.dc,

//     chargingStandard: vehicle.charging.standard,

//     standard: vehicle.charging.standard,
//   };

//   await db.query(
//     `
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
//       DO NOTHING
//     `,
//     [chargingId, vehicle.id, JSON.stringify(payload), JSON.stringify(payload)],
//   );

//   return chargingId;
// }

// /*
// =========================================================
//  INSERT MEDIA
// =========================================================
// */

// async function insertMedia(vehicle, images) {
//   const mediaIds = [];

//   for (let index = 0; index < images.length; index++) {
//     const image = images[index];

//     const mediaId = `${vehicle.id}-image-${index + 1}`;

//     mediaIds.push(mediaId);

//     const payload = {
//       vehicleId: vehicle.id,
//       type: "image",
//       url: image.url,
//       alt: `${vehicle.name} image ${index + 1}`,
//       source: image.source,
//     };

//     await db.query(
//       `
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
//           'image',
//           $3,
//           $4,
//           $5::jsonb
//         )
//         ON CONFLICT (id)
//         DO NOTHING
//       `,
//       [
//         mediaId,
//         vehicle.id,
//         image.url,
//         `${vehicle.name} image ${index + 1}`,
//         JSON.stringify(payload),
//       ],
//     );
//   }

//   return mediaIds;
// }

// /*
// =========================================================
//  UPDATE VEHICLE RELATION IDS
// =========================================================
// */

// async function updateVehicleRelations(
//   vehicle,
//   specificationIds,
//   chargingId,
//   mediaIds,
// ) {
//   const variantIds = vehicle.variants.map((variant) => variant.id);

//   const pricingIds = vehicle.variants.map((variant) => `pricing-${variant.id}`);

//   const payloadUpdate = {
//     identity: {
//       id: vehicle.id,
//       name: vehicle.name,
//       slug: vehicle.id,
//       brandId: vehicle.brandId,
//     },

//     name: vehicle.name,
//     slug: vehicle.id,

//     classification: {
//       bodyType: vehicle.bodyType,
//       fuelType: "Electric",
//       drivetrain: "EV",
//     },

//     extracted: {
//       price: {
//         amount: vehicle.price,
//         currency: "INR",
//         currencyCode: "INR",
//         currencySymbol: "₹",
//       },

//       specs: {
//         battery: vehicle.battery,
//         batteryKwh: vehicle.battery,
//         range: vehicle.range,
//         rangeKm: vehicle.range,
//         bodyType: vehicle.bodyType,
//       },
//     },

//     metadata: {
//       source: "EVInsights seed",
//     },

//     variantIds,
//     specificationIds,
//     chargingIds: [chargingId],
//     mediaIds,
//     pricingIds,
//     sourceIds: [],
//   };

//   await db.query(
//     `
//       UPDATE vehicles
//       SET
//         payload = $2::jsonb,
//         metadata = $3::jsonb,
//         classification = $4::jsonb,
//         extracted = $5::jsonb,
//         updated_at = $6
//       WHERE id = $1
//     `,
//     [
//       vehicle.id,
//       JSON.stringify(payloadUpdate),
//       JSON.stringify(payloadUpdate.metadata),
//       JSON.stringify(payloadUpdate.classification),
//       JSON.stringify(payloadUpdate.extracted),
//       now(),
//     ],
//   );
// }

// /*
// =========================================================
//  MAIN
// =========================================================
// */

// async function main() {
//   console.log("");
//   console.log("=================================================");
//   console.log("🚗 EVINSIGHTS - ADD 20 EVs TO NEON");
//   console.log("=================================================");
//   console.log("");

//   await db.connect();

//   console.log("✅ Neon PostgreSQL connected");
//   console.log("");

//   await db.query("BEGIN");

//   try {
//     /*
//     -----------------------------------------------------
//      BRANDS
//     -----------------------------------------------------
//     */

//     console.log("🏷️ Checking brands...");

//     for (const brand of brands) {
//       await insertBrand(brand);
//     }

//     console.log("✅ Brands ready");
//     console.log("");

//     /*
//     -----------------------------------------------------
//      VEHICLES
//     -----------------------------------------------------
//     */

//     let insertedVehicles = 0;
//     let skippedVehicles = 0;
//     let insertedVariants = 0;
//     let insertedPricing = 0;
//     let insertedSpecs = 0;
//     let insertedCharging = 0;
//     let insertedMedia = 0;

//     for (let vehicleIndex = 0; vehicleIndex < vehicles.length; vehicleIndex++) {
//       const vehicle = vehicles[vehicleIndex];

//       console.log(
//         `\n[${vehicleIndex + 1}/${vehicles.length}] 🚗 ${vehicle.name}`,
//       );

//       const exists = await vehicleExists(vehicle.id);

//       if (exists) {
//         console.log(`   ⏭️ Already exists: ${vehicle.id}`);

//         skippedVehicles++;
//         continue;
//       }

//       /*
//       -----------------------------------------------------
//        VEHICLE
//       -----------------------------------------------------
//       */

//       const inserted = await insertVehicle(vehicle);

//       if (!inserted) {
//         console.log("   ⏭️ Vehicle skipped");

//         skippedVehicles++;
//         continue;
//       }

//       insertedVehicles++;

//       console.log(`   ✅ Vehicle inserted`);

//       /*
//       -----------------------------------------------------
//        VARIANTS + PRICING
//       -----------------------------------------------------
//       */

//       for (const variant of vehicle.variants) {
//         await insertVariant(vehicle, variant);

//         insertedVariants++;

//         await insertPricing(vehicle, variant);

//         insertedPricing++;
//       }

//       console.log(`   ✅ Variants: ${vehicle.variants.length}`);

//       /*
//       -----------------------------------------------------
//        SPECIFICATIONS
//       -----------------------------------------------------
//       */

//       const specificationIds = await insertSpecifications(vehicle);

//       insertedSpecs += specificationIds.length;

//       console.log(`   ✅ Specifications: ${specificationIds.length}`);

//       /*
//       -----------------------------------------------------
//        CHARGING
//       -----------------------------------------------------
//       */

//       const chargingId = await insertCharging(vehicle);

//       insertedCharging++;

//       console.log(`   ✅ Charging inserted`);

//       /*
//       -----------------------------------------------------
//        IMAGES
//       -----------------------------------------------------
//       */

//       console.log("   🔎 Finding real vehicle images...");

//       // const images = await getVehicleImages(vehicle.name);

//       const images = await getVehicleImages(vehicle);

//       if (!images.length) {
//         console.log("   ⚠️ No images found");
//       } else {
//         console.log(`   🖼️ Found ${images.length} images`);
//       }

//       const mediaIds = await insertMedia(vehicle, images);

//       insertedMedia += mediaIds.length;

//       /*
//       -----------------------------------------------------
//        RELATIONS
//       -----------------------------------------------------
//       */

//       await updateVehicleRelations(
//         vehicle,
//         specificationIds,
//         chargingId,
//         mediaIds,
//       );

//       console.log(`   🔗 Relations updated`);

//       console.log(`   🖼️ Media inserted: ${mediaIds.length}`);
//     }

//     /*
//     -----------------------------------------------------
//      COMMIT
//     -----------------------------------------------------
//     */

//     await db.query("COMMIT");

//     console.log("");
//     console.log("=================================================");
//     console.log("🎉 EVINSIGHTS DATA INSERT COMPLETED");
//     console.log("=================================================");
//     console.log("");

//     console.log(`Vehicles inserted : ${insertedVehicles}`);

//     console.log(`Vehicles skipped  : ${skippedVehicles}`);

//     console.log(`Variants inserted : ${insertedVariants}`);

//     console.log(`Pricing inserted  : ${insertedPricing}`);

//     console.log(`Specs inserted    : ${insertedSpecs}`);

//     console.log(`Charging inserted : ${insertedCharging}`);

//     console.log(`Media inserted    : ${insertedMedia}`);

//     console.log("");
//     console.log("✅ Database transaction committed.");
//     console.log("");
//   } catch (error) {
//     await db.query("ROLLBACK");

//     console.error("");
//     console.error("❌ INSERT FAILED");
//     console.error("");
//     console.error(error);
//     console.error("");
//     console.error("↩️ Transaction rolled back.");

//     process.exitCode = 1;
//   } finally {
//     await db.end();
//   }
// }

// main();



import pg from "pg";

const { Client } = pg;

/*
=========================================================
 EVINSIGHTS
 ADD EV VEHICLES TO NEON
=========================================================

Run:

node --env-file=.env.local scripts/add-20-evs-to-neon.mjs

WHAT THIS SCRIPT DOES
---------------------
- Inserts missing brands
- Inserts vehicles
- Inserts variants
- Inserts pricing
- Inserts specifications
- Inserts charging data
- Fetches vehicle images from CarDekho public gallery pages
- Validates image URLs
- Inserts media records
- Skips existing vehicles
- Updates vehicle relation IDs
- Uses transaction

IMPORTANT
---------
Your current vehicle list contains 22 vehicles,
not 20. This script processes every vehicle present
in the vehicles array.
=========================================================
*/

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL missing. Make sure .env.local contains DATABASE_URL.",
  );
}

const db = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/*
=========================================================
 HELPERS
=========================================================
*/

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function now() {
  return new Date().toISOString();
}

/*
=========================================================
 HTTP HELPERS
=========================================================
*/

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/139.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  Connection: "keep-alive",
};

function cleanUrl(value) {
  if (!value) return null;

  return String(value)
    .replaceAll("\\/", "/")
    .replaceAll("&amp;", "&")
    .replaceAll("\\u0026", "&")
    .replaceAll('\\"', '"')
    .trim();
}

function isImageUrl(url) {
  if (!url) return false;

  const lower = url.toLowerCase();

  if (
    lower.includes("logo") ||
    lower.includes("icon") ||
    lower.includes("sprite") ||
    lower.includes("placeholder") ||
    lower.includes("avatar") ||
    lower.includes("loader") ||
    lower.includes("360")
  ) {
    return false;
  }

  if (
    lower.includes(".jpg") ||
    lower.includes(".jpeg") ||
    lower.includes(".png") ||
    lower.includes(".webp") ||
    lower.includes(".avif")
  ) {
    return true;
  }

  return (
    lower.includes("image") ||
    lower.includes("img") ||
    lower.includes("photo") ||
    lower.includes("car")
  );
}

/*
=========================================================
 VALIDATE IMAGE URL
=========================================================
*/

async function validateImageUrl(url) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: {
        ...REQUEST_HEADERS,
        Referer: "https://www.cardekho.com/",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return false;
    }

    const contentType =
      response.headers.get("content-type")?.toLowerCase() || "";

    return contentType.startsWith("image/");
  } catch {
    return false;
  }
}

/*
=========================================================
 EXTRACT URLS FROM HTML
=========================================================
*/

function extractUrlsFromHtml(html) {
  const urls = [];

  /*
  -------------------------------------------------------
  Absolute URLs
  -------------------------------------------------------
  */

  const absoluteRegex =
    /https?:\/\/[^"'\\\s<>]+?\.(?:jpg|jpeg|png|webp|avif)(?:\?[^"'\\\s<>]*)?/gi;

  const absoluteMatches = html.match(absoluteRegex) || [];

  urls.push(...absoluteMatches);

  /*
  -------------------------------------------------------
  src="..."
  -------------------------------------------------------
  */

  const srcRegex =
    /(?:src|data-src|data-original|data-lazy|data-image|data-url)\s*=\s*["']([^"']+)["']/gi;

  let match;

  while ((match = srcRegex.exec(html)) !== null) {
    urls.push(match[1]);
  }

  /*
  -------------------------------------------------------
  srcset
  -------------------------------------------------------
  */

  const srcsetRegex =
    /srcset\s*=\s*["']([^"']+)["']/gi;

  while ((match = srcsetRegex.exec(html)) !== null) {
    const srcset = match[1];

    for (const item of srcset.split(",")) {
      const url = item.trim().split(/\s+/)[0];

      if (url) {
        urls.push(url);
      }
    }
  }

  /*
  -------------------------------------------------------
  JSON escaped URLs
  -------------------------------------------------------
  */

  const jsonImageRegex =
    /https?:\\\/\\\/[^"'\\\s<>]+?\.(?:jpg|jpeg|png|webp|avif)(?:\\?[^"'\\\s<>]*)?/gi;

  const jsonMatches = html.match(jsonImageRegex) || [];

  urls.push(...jsonMatches);

  return unique(
    urls
      .map(cleanUrl)
      .filter(Boolean)
      .filter((url) => url.startsWith("http"))
      .filter(isImageUrl),
  );
}

/*
=========================================================
 SCORE IMAGE URL
=========================================================
*/

function scoreImageUrl(url, vehicle) {
  const lower = url.toLowerCase();

  let score = 0;

  const vehicleTokens = slugify(vehicle.name)
    .split("-")
    .filter((token) => token.length >= 2);

  for (const token of vehicleTokens) {
    if (lower.includes(token)) {
      score += 10;
    }
  }

  /*
  CarDekho image CDN
  */

  if (lower.includes("stimg.cardekho.com")) {
    score += 30;
  }

  /*
  Exterior/front images are preferred for card hero images.
  */

  if (
    lower.includes("front") ||
    lower.includes("exterior") ||
    lower.includes("side")
  ) {
    score += 15;
  }

  /*
  Avoid obvious non-car assets.
  */

  if (
    lower.includes("logo") ||
    lower.includes("icon") ||
    lower.includes("banner") ||
    lower.includes("placeholder")
  ) {
    score -= 100;
  }

  return score;
}

/*
=========================================================
 CARDEKHO IMAGE FETCHER
=========================================================
*/

async function getCarDekhoImages(vehicle) {
  if (!vehicle.cardekhoUrl) {
    console.log(`   ⚠️ No CarDekho URL configured`);

    return [];
  }

  console.log(`   🔎 CarDekho gallery: ${vehicle.cardekhoUrl}`);

  try {
    const response = await fetch(vehicle.cardekhoUrl, {
      headers: REQUEST_HEADERS,
      redirect: "follow",
    });

    if (!response.ok) {
      console.log(
        `   ⚠️ CarDekho returned HTTP ${response.status}`,
      );

      return [];
    }

    const html = await response.text();

    console.log(
      `   📄 CarDekho page downloaded (${html.length.toLocaleString()} chars)`,
    );

    const rawUrls = extractUrlsFromHtml(html);

    console.log(
      `   🔎 Candidate image URLs: ${rawUrls.length}`,
    );

    /*
    -------------------------------------------------------
    Score candidates
    -------------------------------------------------------
    */

    const candidates = rawUrls
      .map((url) => ({
        url,
        score: scoreImageUrl(url, vehicle),
      }))
      .sort((a, b) => b.score - a.score);

    /*
    -------------------------------------------------------
    Validate candidates
    -------------------------------------------------------
    */

    const validImages = [];

    for (const candidate of candidates) {
      if (validImages.length >= 6) {
        break;
      }

      if (
        validImages.some(
          (image) => image.url === candidate.url,
        )
      ) {
        continue;
      }

      const valid = await validateImageUrl(candidate.url);

      if (!valid) {
        continue;
      }

      validImages.push({
        url: candidate.url,
        alt: vehicle.name,
        type: "image",
        source: "CarDekho",
      });

      console.log(
        `   🖼️ Valid image ${validImages.length}/6`,
      );
    }

    return validImages.slice(0, 6);
  } catch (error) {
    console.warn(
      `   ⚠️ CarDekho image fetch failed: ${error.message}`,
    );

    return [];
  }
}

/*
=========================================================
 BRANDS
=========================================================
*/

const brands = [
  {
    id: "tata",
    name: "Tata Motors",
    slug: "tata-motors",
  },

  {
    id: "hyundai",
    name: "Hyundai",
    slug: "hyundai",
  },

  {
    id: "mg",
    name: "MG Motor",
    slug: "mg-motor",
  },

  {
    id: "bmw",
    name: "BMW",
    slug: "bmw",
  },

  {
    id: "mahindra",
    name: "Mahindra",
    slug: "mahindra",
  },

  {
    id: "byd",
    name: "BYD",
    slug: "byd",
  },

  {
    id: "kia",
    name: "Kia",
    slug: "kia",
  },

  {
    id: "citroen",
    name: "Citroën",
    slug: "citroen",
  },

  {
    id: "mercedes-benz",
    name: "Mercedes-Benz",
    slug: "mercedes-benz",
  },
];

/*
=========================================================
 VEHICLES
=========================================================
*/

const vehicles = [
  {
    id: "tata-punch-ev",
    name: "Punch EV",
    brandId: "tata",
    bodyType: "SUV",

    cardekhoUrl:
      "https://www.cardekho.com/tata/punch-ev/pictures",

    battery: 40,
    range: 468,
    price: 969000,
    motorPower: 95,

    charging: {
      ac: "3.3 kW",
      dc: "Fast DC charging",
      standard: "CCS2",
    },

    variants: [
      {
        id: "tata-punch-ev-smart-30",
        name: "Smart 30",
        battery: 30,
        range: 315,
        price: 969000,
      },

      {
        id: "tata-punch-ev-empowered-40",
        name: "Empowered 40",
        battery: 40,
        range: 468,
        price: 1259000,
      },
    ],
  },

  {
    id: "tata-tiago-ev",
    name: "Tiago EV",
    brandId: "tata",
    bodyType: "Hatchback",

    cardekhoUrl:
      "https://www.cardekho.com/tata/tiago-ev/pictures",

    battery: 24,
    range: 315,
    price: 799000,
    motorPower: 55,

    charging: {
      ac: "7.2 kW",
      dc: "Fast DC charging",
      standard: "CCS2",
    },

    variants: [
      {
        id: "tata-tiago-ev-medium-range",
        name: "Medium Range",
        battery: 19.2,
        range: 250,
        price: 699000,
      },

      {
        id: "tata-tiago-ev-long-range",
        name: "Long Range",
        battery: 24,
        range: 315,
        price: 799000,
      },
    ],
  },

  {
    id: "tata-tigor-ev",
    name: "Tigor EV",
    brandId: "tata",
    bodyType: "Sedan",

    cardekhoUrl:
      "https://www.cardekho.com/tata/tigor-ev/pictures",

    battery: 26,
    range: 315,
    price: 1249000,
    motorPower: 55,

    charging: {
      ac: "3.3 kW",
      dc: "Fast DC charging",
      standard: "CCS2",
    },

    variants: [
      {
        id: "tata-tigor-ev-xe",
        name: "XE",
        battery: 26,
        range: 315,
        price: 1249000,
      },

      {
        id: "tata-tigor-ev-xz-plus",
        name: "XZ Plus",
        battery: 26,
        range: 315,
        price: 1299000,
      },
    ],
  },

  {
    id: "tata-harrier-ev",
    name: "Harrier EV",
    brandId: "tata",
    bodyType: "SUV",

    cardekhoUrl:
      "https://www.cardekho.com/tata/harrier-ev/pictures",

    battery: 75,
    range: 627,
    price: 2169000,
    motorPower: 158,

    charging: {
      ac: "11 kW",
      dc: "175 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "tata-harrier-ev-65",
        name: "65 RWD",
        battery: 65,
        range: 538,
        price: 2169000,
      },

      {
        id: "tata-harrier-ev-75",
        name: "75 RWD",
        battery: 75,
        range: 627,
        price: 2399000,
      },
    ],
  },

  {
    id: "hyundai-creta-electric",
    name: "Creta Electric",
    brandId: "hyundai",
    bodyType: "SUV",

    cardekhoUrl:
      "https://www.cardekho.com/hyundai/creta-electric/pictures",

    battery: 51.4,
    range: 510,
    price: 1802800,
    motorPower: 126,

    charging: {
      ac: "7.4 kW",
      dc: "100+ kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "hyundai-creta-electric-42",
        name: "Executive 42",
        battery: 42,
        range: 420,
        price: 1802800,
      },

      {
        id: "hyundai-creta-electric-lr",
        name: "Excellence LR",
        battery: 51.4,
        range: 510,
        price: 2399000,
      },
    ],
  },

  {
    id: "mg-comet-ev",
    name: "Comet EV",
    brandId: "mg",
    bodyType: "Hatchback",

    cardekhoUrl:
      "https://www.cardekho.com/mg/comet-ev/pictures",

    battery: 17.3,
    range: 230,
    price: 499000,
    motorPower: 31,

    charging: {
      ac: "3.3 kW",
      dc: null,
      standard: "AC",
    },

    variants: [
      {
        id: "mg-comet-ev-excite",
        name: "Excite",
        battery: 17.3,
        range: 230,
        price: 699000,
      },

      {
        id: "mg-comet-ev-exclusive",
        name: "Exclusive",
        battery: 17.3,
        range: 230,
        price: 799000,
      },
    ],
  },

  {
    id: "mg-windsor-ev",
    name: "Windsor EV",
    brandId: "mg",
    bodyType: "Crossover",

    cardekhoUrl:
      "https://www.cardekho.com/mg/windsor-ev/pictures",

    battery: 38,
    range: 331,
    price: 999000,
    motorPower: 100,

    charging: {
      ac: "7.4 kW",
      dc: "45 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "mg-windsor-ev-excite",
        name: "Excite",
        battery: 38,
        range: 331,
        price: 999000,
      },

      {
        id: "mg-windsor-ev-exclusive",
        name: "Exclusive",
        battery: 38,
        range: 331,
        price: 1099000,
      },
    ],
  },

  {
    id: "mahindra-be-6",
    name: "BE 6",
    brandId: "mahindra",
    bodyType: "SUV",

    cardekhoUrl:
      "https://www.cardekho.com/mahindra/be-6/pictures",

    battery: 79,
    range: 682,
    price: 1890000,
    motorPower: 210,

    charging: {
      ac: "11.2 kW",
      dc: "175 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "mahindra-be-6-pack-one",
        name: "Pack One",
        battery: 59,
        range: 556,
        price: 1890000,
      },

      {
        id: "mahindra-be-6-pack-three",
        name: "Pack Three",
        battery: 79,
        range: 682,
        price: 2690000,
      },
    ],
  },

  {
    id: "mahindra-xev-9e",
    name: "XEV 9e",
    brandId: "mahindra",
    bodyType: "SUV Coupe",

    cardekhoUrl:
      "https://www.cardekho.com/mahindra/xev-9e/pictures",

    battery: 79,
    range: 656,
    price: 2190000,
    motorPower: 210,

    charging: {
      ac: "11.2 kW",
      dc: "175 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "mahindra-xev-9e-pack-one",
        name: "Pack One",
        battery: 59,
        range: 542,
        price: 2190000,
      },

      {
        id: "mahindra-xev-9e-pack-three",
        name: "Pack Three",
        battery: 79,
        range: 656,
        price: 3050000,
      },
    ],
  },

  {
    id: "byd-atto-3",
    name: "Atto 3",
    brandId: "byd",
    bodyType: "SUV",

    cardekhoUrl:
      "https://www.cardekho.com/byd/atto-3/pictures",

    battery: 60.48,
    range: 521,
    price: 2499000,
    motorPower: 150,

    charging: {
      ac: "7 kW",
      dc: "80 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "byd-atto-3-dynamic",
        name: "Dynamic",
        battery: 49.92,
        range: 468,
        price: 2499000,
      },

      {
        id: "byd-atto-3-premium",
        name: "Premium",
        battery: 60.48,
        range: 521,
        price: 3399000,
      },
    ],
  },

  {
    id: "byd-seal",
    name: "Seal",
    brandId: "byd",
    bodyType: "Sedan",

    cardekhoUrl:
      "https://www.cardekho.com/byd/seal/pictures",

    battery: 82.56,
    range: 650,
    price: 4100000,
    motorPower: 230,

    charging: {
      ac: "11 kW",
      dc: "150 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "byd-seal-premium",
        name: "Premium",
        battery: 82.56,
        range: 650,
        price: 4100000,
      },

      {
        id: "byd-seal-performance",
        name: "Performance AWD",
        battery: 82.56,
        range: 580,
        price: 5300000,
      },
    ],
  },

  {
    id: "byd-emax-7",
    name: "eMAX 7",
    brandId: "byd",
    bodyType: "MPV",

    cardekhoUrl:
      "https://www.cardekho.com/byd/emax-7/pictures",

    battery: 71.8,
    range: 530,
    price: 2690000,
    motorPower: 150,

    charging: {
      ac: "7 kW",
      dc: "115 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "byd-emax-7-premium",
        name: "Premium",
        battery: 55.4,
        range: 420,
        price: 2690000,
      },

      {
        id: "byd-emax-7-superior",
        name: "Superior",
        battery: 71.8,
        range: 530,
        price: 2930000,
      },
    ],
  },

  {
    id: "byd-sealion-7",
    name: "Sealion 7",
    brandId: "byd",
    bodyType: "SUV",

    cardekhoUrl:
      "https://www.cardekho.com/byd/sealion-7/pictures",

    battery: 82.56,
    range: 567,
    price: 4790000,
    motorPower: 230,

    charging: {
      ac: "11 kW",
      dc: "150 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "byd-sealion-7-premium",
        name: "Premium",
        battery: 82.56,
        range: 567,
        price: 4790000,
      },

      {
        id: "byd-sealion-7-performance",
        name: "Performance AWD",
        battery: 82.56,
        range: 542,
        price: 5390000,
      },
    ],
  },

  {
    id: "kia-ev6",
    name: "EV6",
    brandId: "kia",
    bodyType: "Crossover",

    cardekhoUrl:
      "https://www.cardekho.com/kia/ev6/pictures",

    battery: 84,
    range: 663,
    price: 6595000,
    motorPower: 239,

    charging: {
      ac: "11 kW",
      dc: "350 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "kia-ev6-gt-line",
        name: "GT Line",
        battery: 84,
        range: 663,
        price: 6595000,
      },

      {
        id: "kia-ev6-gt-line-awd",
        name: "GT Line AWD",
        battery: 84,
        range: 663,
        price: 7195000,
      },
    ],
  },

  {
    id: "citroen-e-c3",
    name: "ë-C3",
    brandId: "citroen",
    bodyType: "Hatchback",

    cardekhoUrl:
      "https://www.cardekho.com/citroen/e-c3/pictures",

    battery: 29.2,
    range: 320,
    price: 1199000,
    motorPower: 42,

    charging: {
      ac: "3.3 kW",
      dc: "50 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "citroen-e-c3-live",
        name: "Live",
        battery: 29.2,
        range: 320,
        price: 1199000,
      },

      {
        id: "citroen-e-c3-feel",
        name: "Feel",
        battery: 29.2,
        range: 320,
        price: 1299000,
      },
    ],
  },

  {
    id: "bmw-ix1",
    name: "iX1",
    brandId: "bmw",
    bodyType: "SUV",

    cardekhoUrl:
      "https://www.cardekho.com/bmw/ix1/pictures",

    battery: 66.4,
    range: 440,
    price: 4950000,
    motorPower: 230,

    charging: {
      ac: "11 kW",
      dc: "130 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "bmw-ix1-xdrive30",
        name: "xDrive30",
        battery: 66.4,
        range: 440,
        price: 4950000,
      },
    ],
  },

  {
    id: "bmw-i4",
    name: "i4",
    brandId: "bmw",
    bodyType: "Sedan",

    cardekhoUrl:
      "https://www.cardekho.com/bmw/i4/pictures",

    battery: 83.9,
    range: 590,
    price: 7290000,
    motorPower: 210,

    charging: {
      ac: "11 kW",
      dc: "205 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "bmw-i4-edrive40",
        name: "eDrive40",
        battery: 83.9,
        range: 590,
        price: 7290000,
      },
    ],
  },

  {
    id: "mercedes-eqa",
    name: "EQA",
    brandId: "mercedes-benz",
    bodyType: "SUV",

    cardekhoUrl:
      "https://www.cardekho.com/mercedes-benz/eqa/pictures",

    battery: 70.5,
    range: 560,
    price: 6760000,
    motorPower: 140,

    charging: {
      ac: "11 kW",
      dc: "100 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "mercedes-eqa-250-plus",
        name: "EQA 250+",
        battery: 70.5,
        range: 560,
        price: 6760000,
      },
    ],
  },

  {
    id: "mercedes-eqb",
    name: "EQB",
    brandId: "mercedes-benz",
    bodyType: "SUV",

    cardekhoUrl:
      "https://www.cardekho.com/mercedes-benz/eqb/pictures",

    battery: 70.5,
    range: 447,
    price: 7080000,
    motorPower: 168,

    charging: {
      ac: "11 kW",
      dc: "100 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "mercedes-eqb-250-plus",
        name: "EQB 250+",
        battery: 70.5,
        range: 447,
        price: 7080000,
      },

      {
        id: "mercedes-eqb-350-4matic",
        name: "EQB 350 4MATIC",
        battery: 66.5,
        range: 423,
        price: 7950000,
      },
    ],
  },

  {
    id: "hyundai-ioniq-6",
    name: "Ioniq 6",
    brandId: "hyundai",
    bodyType: "Sedan",

    cardekhoUrl:
      "https://www.cardekho.com/hyundai/ioniq-6/pictures",

    battery: 77.4,
    range: 614,
    price: 6500000,
    motorPower: 168,

    charging: {
      ac: "11 kW",
      dc: "350 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "hyundai-ioniq-6-rwd",
        name: "Long Range RWD",
        battery: 77.4,
        range: 614,
        price: 6500000,
      },
    ],
  },

  {
    id: "hyundai-kona-electric",
    name: "Kona Electric",
    brandId: "hyundai",
    bodyType: "SUV",

    cardekhoUrl:
      "https://www.cardekho.com/hyundai/kona-electric/pictures",

    battery: 48.4,
    range: 452,
    price: 2000000,
    motorPower: 99,

    charging: {
      ac: "7.2 kW",
      dc: "100 kW",
      standard: "CCS2",
    },

    variants: [
      {
        id: "hyundai-kona-electric-premium",
        name: "Premium",
        battery: 48.4,
        range: 452,
        price: 2000000,
      },
    ],
  },

  {
    id: "tata-avinya",
    name: "Avinya",
    brandId: "tata",
    bodyType: "Crossover",

    cardekhoUrl: null,

    battery: 60,
    range: 500,
    price: 2500000,
    motorPower: 150,

    charging: {
      ac: "11 kW",
      dc: "Fast DC",
      standard: "CCS2",
    },

    variants: [
      {
        id: "tata-avinya-base",
        name: "Avinya",
        battery: 60,
        range: 500,
        price: 2500000,
      },
    ],
  },
];

/*
=========================================================
 DATABASE HELPERS
=========================================================
*/

async function vehicleExists(id) {
  const result = await db.query(
    `
      SELECT id
      FROM vehicles
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  return result.rows.length > 0;
}

async function brandExists(id) {
  const result = await db.query(
    `
      SELECT id
      FROM brands
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  return result.rows.length > 0;
}

/*
=========================================================
 INSERT BRAND
=========================================================
*/

async function insertBrand(brand) {
  if (await brandExists(brand.id)) {
    return;
  }

  console.log(`   + Brand: ${brand.name}`);

  await db.query(
    `
      INSERT INTO brands (
        id,
        name,
        slug
      )
      VALUES ($1, $2, $3)
      ON CONFLICT (id)
      DO NOTHING
    `,
    [
      brand.id,
      brand.name,
      brand.slug,
    ],
  );
}

/*
=========================================================
 INSERT VEHICLE
=========================================================
*/

async function insertVehicle(vehicle) {
  const createdAt = now();

  const payload = {
    identity: {
      id: vehicle.id,
      name: vehicle.name,
      slug: vehicle.id,
      brandId: vehicle.brandId,
    },

    name: vehicle.name,

    slug: vehicle.id,

    classification: {
      bodyType: vehicle.bodyType,
      fuelType: "Electric",
      drivetrain: "EV",
    },

    extracted: {
      price: {
        amount: vehicle.price,
        currency: "INR",
        currencyCode: "INR",
        currencySymbol: "₹",
      },

      specs: {
        battery: vehicle.battery,
        batteryKwh: vehicle.battery,
        range: vehicle.range,
        rangeKm: vehicle.range,
        bodyType: vehicle.bodyType,
      },
    },

    pricing: {
      price: {
        amount: vehicle.price,
        currency: "INR",
      },
    },

    metadata: {
      source: "EVInsights seed",
      image: null,
      imageUrl: null,
      imageSource: "CarDekho",
      cardekhoUrl: vehicle.cardekhoUrl,
    },

    status: {
      active: true,
    },

    sourceIds: [],

    variantIds: vehicle.variants.map(
      (variant) => variant.id,
    ),

    specificationIds: [],

    chargingIds: [],

    mediaIds: [],

    pricingIds: [],
  };

  const result = await db.query(
    `
      INSERT INTO vehicles (
        id,
        name,
        slug,
        brand_id,
        payload,
        metadata,
        classification,
        status,
        extracted,
        created_at,
        updated_at
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5::jsonb,
        $6::jsonb,
        $7::jsonb,
        $8::jsonb,
        $9::jsonb,
        $10,
        $10
      )
      ON CONFLICT (id)
      DO NOTHING
      RETURNING id
    `,
    [
      vehicle.id,
      vehicle.name,
      vehicle.id,
      vehicle.brandId,
      JSON.stringify(payload),
      JSON.stringify(payload.metadata),
      JSON.stringify(payload.classification),
      JSON.stringify(payload.status),
      JSON.stringify(payload.extracted),
      createdAt,
    ],
  );

  return result.rows.length > 0;
}

/*
=========================================================
 INSERT VARIANT
=========================================================
*/

async function insertVariant(vehicle, variant) {
  const payload = {
    id: variant.id,

    name: variant.name,

    slug: variant.id,

    vehicleId: vehicle.id,

    battery: variant.battery,

    batteryKwh: variant.battery,

    range: variant.range,

    rangeKm: variant.range,

    price: {
      amount: variant.price,
      currency: "INR",
      currencyCode: "INR",
      currencySymbol: "₹",
    },

    pricingIds: [
      `pricing-${variant.id}`,
    ],

    specificationIds: {},

    chargingIds: [],

    mediaIds: [],

    sourceIds: [],
  };

  await db.query(
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
      DO NOTHING
    `,
    [
      variant.id,
      vehicle.id,
      variant.name,
      variant.id,
      JSON.stringify(payload),
      now(),
    ],
  );
}

/*
=========================================================
 INSERT PRICING
=========================================================
*/

async function insertPricing(vehicle, variant) {
  const pricingId =
    `pricing-${variant.id}`;

  const payload = {
    amount: variant.price,

    currency: "INR",

    currencyCode: "INR",

    currencySymbol: "₹",

    vehicleId: vehicle.id,

    variantId: variant.id,

    source: "EVInsights seed",
  };

  await db.query(
    `
      INSERT INTO pricing (
        id,
        variant_id,
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
        'INR',
        '₹',
        $4::jsonb,
        $5,
        $5
      )
      ON CONFLICT (id)
      DO NOTHING
    `,
    [
      pricingId,
      variant.id,
      variant.price,
      JSON.stringify(payload),
      now(),
    ],
  );
}

/*
=========================================================
 INSERT SPECIFICATIONS
=========================================================
*/

async function insertSpecifications(vehicle) {
  const specs = [
    {
      type: "battery",

      data: {
        capacityKwh: vehicle.battery,
        capacity: vehicle.battery,
        chemistry: "Lithium-ion",
      },
    },

    {
      type: "performance",

      data: {
        motorPowerKw: vehicle.motorPower,
        drivetrain: "Electric",
      },
    },

    {
      type: "dimensions",

      data: {
        bodyType: vehicle.bodyType,
      },
    },

    {
      type: "features",

      data: {
        electricVehicle: true,
        regenerativeBraking: true,
      },
    },

    {
      type: "safety",

      data: {
        abs: true,
        airbags: true,
        esc: true,
      },
    },
  ];

  const ids = [];

  for (const spec of specs) {
    const specificationId =
      `${vehicle.id}-${spec.type}`;

    ids.push(specificationId);

    const payload = {
      vehicleId: vehicle.id,

      type: spec.type,

      ...spec.data,
    };

    await db.query(
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
        DO NOTHING
      `,
      [
        specificationId,
        vehicle.id,
        spec.type,
        JSON.stringify(spec.data),
        JSON.stringify(payload),
      ],
    );
  }

  return ids;
}

/*
=========================================================
 INSERT CHARGING
=========================================================
*/

async function insertCharging(vehicle) {
  const chargingId =
    `${vehicle.id}-charging`;

  const payload = {
    vehicleId: vehicle.id,

    acCharging:
      vehicle.charging.ac,

    dcCharging:
      vehicle.charging.dc,

    chargingStandard:
      vehicle.charging.standard,

    standard:
      vehicle.charging.standard,
  };

  await db.query(
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
      DO NOTHING
    `,
    [
      chargingId,
      vehicle.id,
      JSON.stringify(payload),
      JSON.stringify(payload),
    ],
  );

  return chargingId;
}

/*
=========================================================
 INSERT MEDIA
=========================================================
*/

async function insertMedia(
  vehicle,
  images,
) {
  const mediaIds = [];

  for (
    let index = 0;
    index < images.length;
    index++
  ) {
    const image = images[index];

    const mediaId =
      `${vehicle.id}-image-${index + 1}`;

    mediaIds.push(mediaId);

    const payload = {
      vehicleId: vehicle.id,

      type: "image",

      url: image.url,

      alt:
        `${vehicle.name} image ${index + 1}`,

      source: image.source,
    };

    await db.query(
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
          'image',
          $3,
          $4,
          $5::jsonb
        )
        ON CONFLICT (id)
        DO NOTHING
      `,
      [
        mediaId,
        vehicle.id,
        image.url,
        `${vehicle.name} image ${index + 1}`,
        JSON.stringify(payload),
      ],
    );
  }

  return mediaIds;
}

/*
=========================================================
 UPDATE VEHICLE RELATIONS
=========================================================
*/

async function updateVehicleRelations(
  vehicle,
  specificationIds,
  chargingId,
  mediaIds,
) {
  const variantIds =
    vehicle.variants.map(
      (variant) => variant.id,
    );

  const pricingIds =
    vehicle.variants.map(
      (variant) =>
        `pricing-${variant.id}`,
    );

  const payloadUpdate = {
    identity: {
      id: vehicle.id,

      name: vehicle.name,

      slug: vehicle.id,

      brandId: vehicle.brandId,
    },

    name: vehicle.name,

    slug: vehicle.id,

    classification: {
      bodyType: vehicle.bodyType,

      fuelType: "Electric",

      drivetrain: "EV",
    },

    extracted: {
      price: {
        amount: vehicle.price,

        currency: "INR",

        currencyCode: "INR",

        currencySymbol: "₹",
      },

      specs: {
        battery: vehicle.battery,

        batteryKwh: vehicle.battery,

        range: vehicle.range,

        rangeKm: vehicle.range,

        bodyType: vehicle.bodyType,
      },
    },

    metadata: {
      source: "EVInsights seed",

      imageSource: "CarDekho",

      cardekhoUrl:
        vehicle.cardekhoUrl,
    },

    variantIds,

    specificationIds,

    chargingIds: [
      chargingId,
    ],

    mediaIds,

    pricingIds,

    sourceIds: [],
  };

  await db.query(
    `
      UPDATE vehicles
      SET
        payload = $2::jsonb,
        metadata = $3::jsonb,
        classification = $4::jsonb,
        extracted = $5::jsonb,
        updated_at = $6
      WHERE id = $1
    `,
    [
      vehicle.id,

      JSON.stringify(payloadUpdate),

      JSON.stringify(
        payloadUpdate.metadata,
      ),

      JSON.stringify(
        payloadUpdate.classification,
      ),

      JSON.stringify(
        payloadUpdate.extracted,
      ),

      now(),
    ],
  );
}

/*
=========================================================
 MAIN
=========================================================
*/

async function main() {
  console.log("");

  console.log(
    "=================================================",
  );

  console.log(
    "🚗 EVINSIGHTS - ADD EVs TO NEON",
  );

  console.log(
    "=================================================",
  );

  console.log("");

  console.log(
    `Vehicles configured: ${vehicles.length}`,
  );

  console.log("");

  await db.connect();

  console.log(
    "✅ Neon PostgreSQL connected",
  );

  console.log("");

  await db.query("BEGIN");

  try {
    /*
    -----------------------------------------------------
     BRANDS
    -----------------------------------------------------
    */

    console.log(
      "🏷️ Checking brands...",
    );

    for (const brand of brands) {
      await insertBrand(brand);
    }

    console.log(
      "✅ Brands ready",
    );

    console.log("");

    /*
    -----------------------------------------------------
     COUNTERS
    -----------------------------------------------------
    */

    let insertedVehicles = 0;

    let skippedVehicles = 0;

    let insertedVariants = 0;

    let insertedPricing = 0;

    let insertedSpecs = 0;

    let insertedCharging = 0;

    let insertedMedia = 0;

    let vehiclesWithoutImages = 0;

    /*
    -----------------------------------------------------
     VEHICLES
    -----------------------------------------------------
    */

    for (
      let vehicleIndex = 0;
      vehicleIndex < vehicles.length;
      vehicleIndex++
    ) {
      const vehicle =
        vehicles[vehicleIndex];

      console.log("");

      console.log(
        `-------------------------------------------------`,
      );

      console.log(
        `[${vehicleIndex + 1}/${vehicles.length}] 🚗 ${vehicle.name}`,
      );

      console.log(
        `-------------------------------------------------`,
      );

      const exists =
        await vehicleExists(
          vehicle.id,
        );

      if (exists) {
        console.log(
          `   ⏭️ Already exists: ${vehicle.id}`,
        );

        skippedVehicles++;

        continue;
      }

      /*
      -----------------------------------------------------
       VEHICLE
      -----------------------------------------------------
      */

      const inserted =
        await insertVehicle(
          vehicle,
        );

      if (!inserted) {
        console.log(
          "   ⏭️ Vehicle skipped",
        );

        skippedVehicles++;

        continue;
      }

      insertedVehicles++;

      console.log(
        "   ✅ Vehicle inserted",
      );

      /*
      -----------------------------------------------------
       VARIANTS
      -----------------------------------------------------
      */

      for (
        const variant of vehicle.variants
      ) {
        await insertVariant(
          vehicle,
          variant,
        );

        insertedVariants++;

        await insertPricing(
          vehicle,
          variant,
        );

        insertedPricing++;
      }

      console.log(
        `   ✅ Variants: ${vehicle.variants.length}`,
      );

      /*
      -----------------------------------------------------
       SPECIFICATIONS
      -----------------------------------------------------
      */

      const specificationIds =
        await insertSpecifications(
          vehicle,
        );

      insertedSpecs +=
        specificationIds.length;

      console.log(
        `   ✅ Specifications: ${specificationIds.length}`,
      );

      /*
      -----------------------------------------------------
       CHARGING
      -----------------------------------------------------
      */

      const chargingId =
        await insertCharging(
          vehicle,
        );

      insertedCharging++;

      console.log(
        "   ✅ Charging inserted",
      );

      /*
      -----------------------------------------------------
       CARDEKHO IMAGES
      -----------------------------------------------------
      */

      console.log(
        "   📸 Fetching CarDekho images...",
      );

      const images =
        await getCarDekhoImages(
          vehicle,
        );

      if (!images.length) {
        console.log(
          "   ⚠️ No valid CarDekho images found",
        );

        vehiclesWithoutImages++;
      } else {
        console.log(
          `   ✅ ${images.length} CarDekho images ready`,
        );
      }

      /*
      -----------------------------------------------------
       MEDIA
      -----------------------------------------------------
      */

      const mediaIds =
        await insertMedia(
          vehicle,
          images,
        );

      insertedMedia +=
        mediaIds.length;

      console.log(
        `   🖼️ Media inserted: ${mediaIds.length}`,
      );

      /*
      -----------------------------------------------------
       RELATIONS
      -----------------------------------------------------
      */

      await updateVehicleRelations(
        vehicle,
        specificationIds,
        chargingId,
        mediaIds,
      );

      console.log(
        "   🔗 Relations updated",
      );
    }

    /*
    -----------------------------------------------------
     COMMIT
    -----------------------------------------------------
    */

    await db.query(
      "COMMIT",
    );

    console.log("");

    console.log(
      "=================================================",
    );

    console.log(
      "🎉 EVINSIGHTS DATA INSERT COMPLETED",
    );

    console.log(
      "=================================================",
    );

    console.log("");

    console.log(
      `Vehicles configured : ${vehicles.length}`,
    );

    console.log(
      `Vehicles inserted   : ${insertedVehicles}`,
    );

    console.log(
      `Vehicles skipped    : ${skippedVehicles}`,
    );

    console.log(
      `Variants inserted   : ${insertedVariants}`,
    );

    console.log(
      `Pricing inserted    : ${insertedPricing}`,
    );

    console.log(
      `Specs inserted      : ${insertedSpecs}`,
    );

    console.log(
      `Charging inserted   : ${insertedCharging}`,
    );

    console.log(
      `Media inserted      : ${insertedMedia}`,
    );

    console.log(
      `Without images      : ${vehiclesWithoutImages}`,
    );

    console.log("");

    console.log(
      "✅ Database transaction committed.",
    );

    console.log("");
  } catch (error) {
    await db.query(
      "ROLLBACK",
    );

    console.error("");

    console.error(
      "❌ INSERT FAILED",
    );

    console.error("");

    console.error(
      error,
    );

    console.error("");

    console.error(
      "↩️ Transaction rolled back.",
    );

    process.exitCode = 1;
  } finally {
    await db.end();
  }
}

main();