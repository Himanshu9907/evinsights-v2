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

const VEHICLE_ID = "mahindra-xev-9e";

const SOURCE = "Spinny";

const SOURCE_URL =
  "https://www.spinny.com/";

const now = new Date();

/* =========================================================
   MAHINDRA XEV 9e IMAGES
========================================================= */

const images = [
  {
    id: "bbd37a8695704b6e9cdd2c041aa76844",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-20/bbd37a8695704b6e9cdd2c041aa76844/raw/file.jpg",
  },
  {
    id: "0a8fa220727b4fde86842b214d5c4be7",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-20/0a8fa220727b4fde86842b214d5c4be7/raw/file.jpg",
  },
  {
    id: "58ff3a27b6424d99bb6d9bb2884740e7",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-20/58ff3a27b6424d99bb6d9bb2884740e7/raw/file.jpg",
  },
  {
    id: "99de473f1e7345fbb6236d057556021c",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-20/99de473f1e7345fbb6236d057556021c/raw/file.jpg",
  },
  {
    id: "9a9e70c5a7a347f9bcf560bfe86ceba4",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-20/9a9e70c5a7a347f9bcf560bfe86ceba4/raw/file.jpg",
  },
  {
    id: "4df7e4b03b58454f8da48691f5fd83a6",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-20/4df7e4b03b58454f8da48691f5fd83a6/raw/file.jpg",
  },
];

/* =========================================================
   MAIN
========================================================= */

async function main() {
  const client = await pool.connect();

  try {
    console.log("=================================================");
    console.log("🖼️ EVINSIGHTS - ADD MAHINDRA XEV 9e IMAGES");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. VERIFY VEHICLE
    ===================================================== */

    console.log("🚗 Checking Mahindra XEV 9e...");

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
      "\n🧹 Removing existing XEV 9e media..."
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
      "\n🖼️ Inserting XEV 9e images...\n"
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
          `Mahindra XEV 9e image ${index + 1}`,
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
      "\n🔗 Updating XEV 9e primary image..."
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
      "\n🔎 Verifying XEV 9e media..."
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
      "🎉 MAHINDRA XEV 9e IMAGE INSERT COMPLETED"
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
      "\n⚠️ No partial Mahindra XEV 9e image data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();