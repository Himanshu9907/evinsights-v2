import dotenv from "dotenv";
import pg from "pg";

dotenv.config({
  path: ".env.local",
});

const { Pool } = pg;

console.log(
  "DATABASE_URL loaded:",
  !!process.env.DATABASE_URL
);

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL missing. Check .env.local"
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/* =========================================================
   VEHICLE
========================================================= */

const VEHICLE_NAME = "Tata Punch EV";
const VEHICLE_SLUG = "tata-punch-ev";

const SOURCE = "Spinny";
const SOURCE_URL = "https://www.spinny.com/";

/* =========================================================
   IMAGES
========================================================= */

const images = [
  {
    url: "https://mda.spinny.com/sp-file-system/public/2026-06-07/6d9368b9703d49e3bb1e98a486c5f375/raw/file.jpg",
    alt: "Tata Punch EV exterior",
    role: "primary",
  },

  {
    url: "https://mda.spinny.com/sp-file-system/public/2026-06-07/cc9f56de62044e0bb674fb19b14bc3d8/raw/file.jpg",
    alt: "Tata Punch EV exterior view",
    role: "gallery",
  },

  {
    url: "https://mda.spinny.com/sp-file-system/public/2026-06-07/c39429865d444c3f8b5366b9fc82a3f9/raw/file.jpg",
    alt: "Tata Punch EV side view",
    role: "gallery",
  },

  {
    url: "https://mda.spinny.com/sp-file-system/public/2026-06-07/97758b5c768c4ae79ac898f782027e00/raw/file.jpg",
    alt: "Tata Punch EV rear view",
    role: "gallery",
  },

  {
    url: "https://mda.spinny.com/sp-file-system/public/2026-06-07/670b668266634580b9d9242e7a5293de/raw/file.jpg",
    alt: "Tata Punch EV interior",
    role: "gallery",
  },

  {
    url: "https://mda.spinny.com/sp-file-system/public/2026-06-07/611a5c62f4074a1e813f8b1a3308dd11/raw/file.jpg",
    alt: "Tata Punch EV dashboard",
    role: "gallery",
  },

  {
    url: "https://mda.spinny.com/sp-file-system/public/2026-06-07/3d4fdc816a544e9ea0e093fdfb4b4bcb/raw/file.jpg",
    alt: "Tata Punch EV interior view",
    role: "gallery",
  },

  {
    url: "https://mda.spinny.com/sp-file-system/public/2026-06-07/f0f09409bea34c1c8b57e17f8d643a08/raw/file.jpg",
    alt: "Tata Punch EV exterior detail",
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
    console.log("🖼️ EVINSIGHTS - ADD TATA PUNCH EV IMAGES");
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. FIND VEHICLE
    ===================================================== */

    console.log("🔎 Finding Tata Punch EV...");

    const vehicleResult = await client.query(
      `
      SELECT
        id,
        name,
        slug
      FROM vehicles
      WHERE
        LOWER(slug) = LOWER($1)
        OR LOWER(name) = LOWER($2)
        OR LOWER(name) LIKE '%punch%ev%'
        OR LOWER(slug) LIKE '%punch%ev%'
      LIMIT 1
      `,
      [
        VEHICLE_SLUG,
        VEHICLE_NAME,
      ]
    );

    if (!vehicleResult.rows.length) {
      throw new Error(
        `Vehicle not found.

Searched:
Name: ${VEHICLE_NAME}
Slug: ${VEHICLE_SLUG}

Run this SQL in Neon:

SELECT id, name, slug
FROM vehicles
WHERE LOWER(name) LIKE '%punch%'
   OR LOWER(slug) LIKE '%punch%';`
      );
    }

    const vehicle = vehicleResult.rows[0];

    const VEHICLE_ID = vehicle.id;

    console.log("   ✅ Vehicle found");
    console.log(`   ID   : ${vehicle.id}`);
    console.log(`   Name : ${vehicle.name}`);
    console.log(`   Slug : ${vehicle.slug}`);

    /* =====================================================
       2. REMOVE OLD MEDIA
    ===================================================== */

    console.log(
      "\n🧹 Removing existing Tata Punch EV media..."
    );

    const deleteResult = await client.query(
      `
      DELETE FROM media
      WHERE vehicle_id = $1
      `,
      [VEHICLE_ID]
    );

    console.log(
      `   ✅ Removed ${deleteResult.rowCount} old media records`
    );

    /* =====================================================
       3. INSERT IMAGES
    ===================================================== */

    console.log("\n🖼️ Inserting images...\n");

    for (let index = 0; index < images.length; index++) {
      const image = images[index];

      const mediaId =
        `media-${VEHICLE_ID}-image-${index + 1}`;

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
            role: image.role,
            position: index + 1,
            vehicleName: vehicle.name,
            vehicleSlug: vehicle.slug,
          }),
        ]
      );

      console.log(
        `   ✅ Image ${index + 1}/${images.length} inserted`
      );
    }

    /* =====================================================
       4. UPDATE PRIMARY IMAGE
    ===================================================== */

    console.log(
      "\n🔗 Updating Tata Punch EV primary image..."
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
        new Date(),
      ]
    );

    console.log(
      "   ✅ Primary image updated"
    );

    /* =====================================================
       5. VERIFY MEDIA
    ===================================================== */

    console.log(
      "\n🔎 Verifying inserted images..."
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
        `Verification failed.

Expected: ${images.length}
Found: ${mediaCheck.rows.length}`
      );
    }

    console.log(
      `   ✅ ${mediaCheck.rows.length} media records verified`
    );

    /* =====================================================
       6. VERIFY VEHICLE
    ===================================================== */

    const updatedVehicle =
      await client.query(
        `
        SELECT
          id,
          name,
          slug,
          payload,
          metadata
        FROM vehicles
        WHERE id = $1
        `,
        [VEHICLE_ID]
      );

    if (!updatedVehicle.rows.length) {
      throw new Error(
        "Vehicle verification failed."
      );
    }

    const updated =
      updatedVehicle.rows[0];

    const payload =
      updated.payload || {};

    const metadata =
      updated.metadata || {};

    if (
      payload.image !==
      images[0].url
    ) {
      throw new Error(
        "Primary image missing from payload."
      );
    }

    if (
      metadata.image !==
      images[0].url
    ) {
      throw new Error(
        "Primary image missing from metadata."
      );
    }

    console.log(
      "   ✅ Primary image verified"
    );

    /* =====================================================
       7. COMMIT
    ===================================================== */

    await client.query("COMMIT");

    /* =====================================================
       8. FINAL
    ===================================================== */

    console.log(
      "\n================================================="
    );

    console.log(
      "🎉 TATA PUNCH EV IMAGES INSERTED SUCCESSFULLY"
    );

    console.log(
      "================================================="
    );

    console.log(
      `Vehicle : ${updated.name}`
    );

    console.log(
      `ID      : ${updated.id}`
    );

    console.log(
      `Slug    : ${updated.slug}`
    );

    console.log(
      `Images  : ${mediaCheck.rows.length}`
    );

    console.log(
      `Primary : Image 1`
    );

    console.log(
      "\n📸 Media records:"
    );

    mediaCheck.rows.forEach(
      (row, index) => {
        console.log(
          `   ${index + 1}. ${row.id}`
        );
      }
    );

    console.log(
      "\n================================================="
    );

    console.log(
      "✅ Database transaction committed."
    );

    console.log(
      "=================================================\n"
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "\n❌ IMAGE INSERT FAILED"
    );

    console.error(
      "Transaction rolled back."
    );

    console.error("\nError:");
    console.error(error);

    console.error(
      "\n⚠️ No partial Tata Punch EV image data was saved."
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

/* =========================================================
   RUN
========================================================= */

main();