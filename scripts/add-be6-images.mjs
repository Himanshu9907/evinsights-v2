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

const VEHICLE_ID = "mahindra-be-6";

const SOURCE = "Spinny";

const SOURCE_URL =
  "https://www.spinny.com/";

const now = new Date();

/* =========================================================
   MAHINDRA BE 6 IMAGES
========================================================= */

const images = [
  {
    id: "c6e7fb069b6143bbadc9873cbcf14296",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-19/c6e7fb069b6143bbadc9873cbcf14296/raw/file.jpg",
    alt: "Mahindra BE 6",
    role: "gallery",
  },
  {
    id: "07fa2f767262482ea2bb1f0e6ab512e0",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-19/07fa2f767262482ea2bb1f0e6ab512e0/raw/file.jpg",
    alt: "Mahindra BE 6",
    role: "gallery",
  },
  {
    id: "962874500c844ef9b571a83283177be2",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-19/962874500c844ef9b571a83283177be2/raw/file.jpg",
    alt: "Mahindra BE 6",
    role: "gallery",
  },
  {
    id: "28bfc5450ff443d3936cf2a465c0a687",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-19/28bfc5450ff443d3936cf2a465c0a687/raw/file.jpg",
    alt: "Mahindra BE 6",
    role: "gallery",
  },
  {
    id: "af75925114644eaa8338666ea0964523",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-19/af75925114644eaa8338666ea0964523/raw/file.jpg",
    alt: "Mahindra BE 6",
    role: "gallery",
  },
  {
    id: "7b7fe34fe50d4594a86851c0d42505c9",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-19/7b7fe34fe50d4594a86851c0d42505c9/raw/file.jpg",
    alt: "Mahindra BE 6",
    role: "gallery",
  },
  {
    id: "d517211fcd3f4801aaf126adea3d4be9",
    url: "https://mda.spinny.com/sp-file-system/public/2026-03-19/d517211fcd3f4801aaf126adea3d4be9/raw/file.jpg",
    alt: "Mahindra BE 6",
    role: "gallery",
  },
];

/* =========================================================
   MAIN
========================================================= */

async function main() {
  const client = await pool.connect();

  try {
    console.log("=================================================");
    console.log("🖼️ EVINSIGHTS - ADD MAHINDRA BE 6 IMAGES");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. VERIFY VEHICLE
    ===================================================== */

    console.log("🚗 Checking Mahindra BE 6...");

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
       2. REMOVE OLD MEDIA
    ===================================================== */

    console.log("\n🧹 Removing existing BE 6 media...");

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

    console.log("\n🖼️ Inserting BE 6 images...\n");

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
          image.alt,
          JSON.stringify({
            source: SOURCE,
            sourceUrl: SOURCE_URL,
            role:
              index === 0
                ? "primary"
                : image.role,
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
       4. UPDATE VEHICLE PAYLOAD IMAGE
    ===================================================== */

    console.log(
      "\n🔗 Updating vehicle primary image..."
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
      "   ✅ Primary image linked to vehicle"
    );

    /* =====================================================
       5. VERIFY
    ===================================================== */

    console.log(
      "\n🔎 Verifying inserted BE 6 media..."
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
      "🎉 MAHINDRA BE 6 IMAGE INSERT COMPLETED"
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

    console.log(
      "\nMedia IDs:"
    );

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
      "\n⚠️ No partial Mahindra BE 6 image data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();