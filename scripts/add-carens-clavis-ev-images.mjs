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

// const VEHICLE_ID = "kia-carens-clavis-ev";

// const SOURCE = "Cars24";

// const SOURCE_URL =
//   "https://www.cars24.com/";

// const now = new Date();

// /* =========================================================
//    KIA CARENS CLAVIS EV IMAGES
// ========================================================= */

// const images = [
//   {
//     id: "carens-clavis-left-side-view",
//     url: "https://static-cdn.cars24.com/prod/bikes/2025/07/22/Carens%20Clavis%20Left%20Side%20View-2d95ab4f-69a5-4145-949f-d729d1bb8e50.jpg?w=640&dpr=3&optimize=low&format=auto&quality=50",
//   },
//   {
//     id: "carens-clavis-right-diagonal-view",
//     url: "https://static-cdn.cars24.com/prod/bikes/2025/07/22/Carens%20Clavis%20Right%20Diagonal%20View-bbe7f51f-c984-4af6-a764-ebe216d11399.jpg?w=640&dpr=3&optimize=low&format=auto&quality=50",
//   },
//   {
//     id: "carens-clavis-rear-right-side-view",
//     url: "https://static-cdn.cars24.com/prod/bikes/2025/07/22/Carens%20Clavis%20Rear%20Right%20Side%20View-d4b5550a-8f3c-43fa-8986-fbb94c57915c.jpg?w=640&dpr=3&optimize=low&format=auto&quality=50",
//   },
//   {
//     id: "carens-clavis-left-side-view-2",
//     url: "https://static-cdn.cars24.com/prod/bikes/2025/07/22/Carens%20Clavis%20%20Left%20Side%20View-f54e17a5-4e48-4cfa-a318-abe2e911adc7.jpg?w=640&dpr=3&optimize=low&format=auto&quality=50",
//   },
//   {
//     id: "carens-clavis-dashboard-view",
//     url: "https://static-cdn.cars24.com/prod/bikes/2025/07/22/Carens%20Clavis%20Dashboard%20View-6e3cd573-e0cb-4d4c-9d3c-0de3af054c96.jpg?w=640&dpr=3&optimize=low&format=auto&quality=50",
//   },
//   {
//     id: "carens-clavis-all-seats-top-view",
//     url: "https://static-cdn.cars24.com/prod/bikes/2025/07/22/Carens%20Clavis%20All%20Seats%20Top%20View-3d9f2db3-7864-4237-8196-b8b9c2989b1f.jpg?w=640&dpr=3&optimize=low&format=auto&quality=50",
//   },
//   {
//     id: "carens-clavis-all-airbags",
//     url: "https://static-cdn.cars24.com/prod/bikes/2025/07/22/Carens%20Clavis%20%20All%20Airbags-c02b80ba-3793-46f5-bce8-e0969e01c7e0.jpg?w=640&dpr=3&optimize=low&format=auto&quality=50",
//   },
// ];

// /* =========================================================
//    MAIN
// ========================================================= */

// async function main() {
//   const client = await pool.connect();

//   try {
//     console.log("=================================================");
//     console.log("🖼️ EVINSIGHTS - ADD KIA CARENS CLAVIS EV IMAGES");
//     console.log("=================================================\n");

//     await client.query("BEGIN");

//     /* =====================================================
//        1. VERIFY VEHICLE
//     ===================================================== */

//     console.log("🚗 Checking Kia Carens Clavis EV...");

//     const vehicleCheck = await client.query(
//       `
//       SELECT
//         id,
//         name
//       FROM vehicles
//       WHERE id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     if (!vehicleCheck.rows.length) {
//       throw new Error(
//         `Vehicle '${VEHICLE_ID}' not found in vehicles table.`
//       );
//     }

//     console.log(
//       `   ✅ Vehicle found: ${vehicleCheck.rows[0].name}`
//     );

//     /* =====================================================
//        2. CLEAN EXISTING MEDIA
//     ===================================================== */

//     console.log(
//       "\n🧹 Removing existing Kia Carens Clavis EV media..."
//     );

//     await client.query(
//       `
//       DELETE FROM media
//       WHERE vehicle_id = $1
//       `,
//       [VEHICLE_ID]
//     );

//     console.log("   ✅ Existing media cleaned");

//     /* =====================================================
//        3. INSERT IMAGES
//     ===================================================== */

//     console.log(
//       "\n🖼️ Inserting Kia Carens Clavis EV images...\n"
//     );

//     for (let index = 0; index < images.length; index++) {
//       const image = images[index];

//       const mediaId =
//         `media-${VEHICLE_ID}-${index + 1}`;

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
//           mediaId,
//           VEHICLE_ID,
//           "image",
//           image.url,
//           `Kia Carens Clavis EV image ${index + 1}`,
//           JSON.stringify({
//             source: SOURCE,
//             sourceUrl: SOURCE_URL,

//             role:
//               index === 0
//                 ? "primary"
//                 : "gallery",

//             position: index + 1,

//             originalId: image.id,
//           }),
//         ]
//       );

//       console.log(
//         `   ✅ Image ${index + 1}/${images.length} inserted`
//       );
//     }

//     /* =====================================================
//        4. UPDATE VEHICLE PRIMARY IMAGE
//     ===================================================== */

//     console.log(
//       "\n🔗 Updating Kia Carens Clavis EV primary image..."
//     );

//     await client.query(
//       `
//       UPDATE vehicles
//       SET
//         payload = jsonb_set(
//           jsonb_set(
//             COALESCE(payload, '{}'::jsonb),
//             '{image}',
//             to_jsonb($2::text),
//             true
//           ),
//           '{imageUrl}',
//           to_jsonb($2::text),
//           true
//         ),

//         metadata = jsonb_set(
//           jsonb_set(
//             COALESCE(metadata, '{}'::jsonb),
//             '{image}',
//             to_jsonb($2::text),
//             true
//           ),
//           '{imageUrl}',
//           to_jsonb($2::text),
//           true
//         ),

//         updated_at = $3

//       WHERE id = $1
//       `,
//       [
//         VEHICLE_ID,
//         images[0].url,
//         now,
//       ]
//     );

//     console.log(
//       "   ✅ Primary image linked"
//     );

//     /* =====================================================
//        5. VERIFY
//     ===================================================== */

//     console.log(
//       "\n🔎 Verifying Kia Carens Clavis EV media..."
//     );

//     const mediaCheck = await client.query(
//       `
//       SELECT
//         id,
//         vehicle_id,
//         type,
//         url,
//         alt,
//         payload
//       FROM media
//       WHERE vehicle_id = $1
//       ORDER BY id
//       `,
//       [VEHICLE_ID]
//     );

//     if (
//       mediaCheck.rows.length !==
//       images.length
//     ) {
//       throw new Error(
//         `Verification failed: expected ${images.length} images but found ${mediaCheck.rows.length}.`
//       );
//     }

//     console.log(
//       `   ✅ ${mediaCheck.rows.length} images verified`
//     );

//     /* =====================================================
//        6. COMMIT
//     ===================================================== */

//     await client.query("COMMIT");

//     console.log(
//       "\n================================================="
//     );

//     console.log(
//       "🎉 KIA CARENS CLAVIS EV IMAGE INSERT COMPLETED"
//     );

//     console.log(
//       "================================================="
//     );

//     console.log(
//       "Vehicle :",
//       vehicleCheck.rows[0].name
//     );

//     console.log(
//       "Images  :",
//       mediaCheck.rows.length
//     );

//     console.log(
//       "Primary :",
//       images[0].url
//     );

//     console.log("\nMedia IDs:");

//     mediaCheck.rows.forEach(
//       (row, index) => {
//         console.log(
//           `   ${index + 1}. ${row.id}`
//         );
//       }
//     );

//     console.log(
//       "\n✅ Database transaction committed."
//     );

//   } catch (error) {
//     await client.query("ROLLBACK");

//     console.error(
//       "\n❌ IMAGE INSERT FAILED"
//     );

//     console.error(
//       "Transaction rolled back."
//     );

//     console.error(error);

//     console.error(
//       "\n⚠️ No partial Kia Carens Clavis EV image data was saved."
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

const VEHICLE_ID = "mg-comet-ev";

const SOURCE = "Spinny";

const SOURCE_URL = "https://www.spinny.com/";

const now = new Date();

/* =========================================================
   MG COMET EV IMAGES
========================================================= */

const images = [
  {
    id: "91a02857009b4d5cbac05b184ab59aee",
    url: "https://mda.spinny.com/sp-file-system/public/2026-04-01/91a02857009b4d5cbac05b184ab59aee/raw/file.png",
  },
  {
    id: "b3edcf97692b40b2813c33304ffaa383",
    url: "https://mda.spinny.com/sp-file-system/public/2026-04-01/b3edcf97692b40b2813c33304ffaa383/raw/file.jpg",
  },
  {
    id: "2c4482d46e304a4eba160755f78202b1",
    url: "https://mda.spinny.com/sp-file-system/public/2026-04-01/2c4482d46e304a4eba160755f78202b1/raw/file.jpg",
  },
  {
    id: "036373e863624056bd6936e0f16fa1be",
    url: "https://mda.spinny.com/sp-file-system/public/2026-04-01/036373e863624056bd6936e0f16fa1be/raw/file.jpg",
  },
  {
    id: "9a1c44c278a04450a8faae8ff8d7d140",
    url: "https://mda.spinny.com/sp-file-system/public/2026-04-01/9a1c44c278a04450a8faae8ff8d7d140/raw/file.jpg",
  },
  {
    id: "b3edcf97692b40b2813c33304ffaa383-duplicate",
    url: "https://mda.spinny.com/sp-file-system/public/2026-04-01/b3edcf97692b40b2813c33304ffaa383/raw/file.jpg",
  },
];

/* =========================================================
   MAIN
========================================================= */

async function main() {
  const client = await pool.connect();

  try {
    console.log("=================================================");
    console.log("🖼️ EVINSIGHTS - ADD MG COMET EV IMAGES");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. VERIFY VEHICLE
    ===================================================== */

    console.log("🚗 Checking MG Comet EV...");

    const vehicleCheck = await client.query(
      `
      SELECT
        id,
        name
      FROM vehicles
      WHERE id = $1
      `,
      [VEHICLE_ID]
    );

    if (!vehicleCheck.rows.length) {
      throw new Error(
        `Vehicle '${VEHICLE_ID}' not found in vehicles table.`
      );
    }

    console.log(
      `   ✅ Vehicle found: ${vehicleCheck.rows[0].name}`
    );

    /* =====================================================
       2. CLEAN EXISTING MEDIA
    ===================================================== */

    console.log(
      "\n🧹 Removing existing MG Comet EV media..."
    );

    await client.query(
      `
      DELETE FROM media
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID]
    );

    console.log("   ✅ Existing media cleaned");

    /* =====================================================
       3. INSERT IMAGES
    ===================================================== */

    console.log(
      "\n🖼️ Inserting MG Comet EV images...\n"
    );

    for (let index = 0; index < images.length; index++) {
      const image = images[index];

      const mediaId =
        `media-${VEHICLE_ID}-${index + 1}`;

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
          mediaId,
          VEHICLE_ID,
          "image",
          image.url,
          `MG Comet EV image ${index + 1}`,
          JSON.stringify({
            source: SOURCE,
            sourceUrl: SOURCE_URL,

            role:
              index === 0
                ? "primary"
                : "gallery",

            position: index + 1,

            originalId: image.id,
          }),
        ]
      );

      console.log(
        `   ✅ Image ${index + 1}/${images.length} inserted`
      );
    }

    /* =====================================================
       4. UPDATE VEHICLE PRIMARY IMAGE
    ===================================================== */

    console.log(
      "\n🔗 Updating MG Comet EV primary image..."
    );

    await client.query(
      `
      UPDATE vehicles
      SET
        payload = jsonb_set(
          jsonb_set(
            COALESCE(payload, '{}'::jsonb),
            '{image}',
            to_jsonb($2::text),
            true
          ),
          '{imageUrl}',
          to_jsonb($2::text),
          true
        ),

        metadata = jsonb_set(
          jsonb_set(
            COALESCE(metadata, '{}'::jsonb),
            '{image}',
            to_jsonb($2::text),
            true
          ),
          '{imageUrl}',
          to_jsonb($2::text),
          true
        ),

        updated_at = $3

      WHERE id = $1
      `,
      [
        VEHICLE_ID,
        images[0].url,
        now,
      ]
    );

    console.log(
      "   ✅ Primary image linked"
    );

    /* =====================================================
       5. VERIFY
    ===================================================== */

    console.log(
      "\n🔎 Verifying MG Comet EV media..."
    );

    const mediaCheck = await client.query(
      `
      SELECT
        id,
        vehicle_id,
        type,
        url,
        alt,
        payload
      FROM media
      WHERE vehicle_id = $1
      ORDER BY id
      `,
      [VEHICLE_ID]
    );

    if (
      mediaCheck.rows.length !==
      images.length
    ) {
      throw new Error(
        `Verification failed: expected ${images.length} images but found ${mediaCheck.rows.length}.`
      );
    }

    console.log(
      `   ✅ ${mediaCheck.rows.length} images verified`
    );

    /* =====================================================
       6. COMMIT
    ===================================================== */

    await client.query("COMMIT");

    console.log(
      "\n================================================="
    );

    console.log(
      "🎉 MG COMET EV IMAGE INSERT COMPLETED"
    );

    console.log(
      "================================================="
    );

    console.log(
      "Vehicle :",
      vehicleCheck.rows[0].name
    );

    console.log(
      "Images  :",
      mediaCheck.rows.length
    );

    console.log(
      "Primary :",
      images[0].url
    );

    console.log("\nMedia IDs:");

    mediaCheck.rows.forEach(
      (row, index) => {
        console.log(
          `   ${index + 1}. ${row.id}`
        );
      }
    );

    console.log(
      "\n✅ Database transaction committed."
    );

  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "\n❌ IMAGE INSERT FAILED"
    );

    console.error(
      "Transaction rolled back."
    );

    console.error(error);

    console.error(
      "\n⚠️ No partial MG Comet EV image data was saved."
    );

    process.exitCode = 1;

  } finally {
    client.release();
    await pool.end();
  }
}

main();