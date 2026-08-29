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
    "DATABASE_URL missing. Check .env.local in project root."
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/* =========================================================
   CONSTANTS
========================================================= */

const VEHICLE_NAME = "Maruti Suzuki e Vitara";

const VEHICLE_SLUG = "maruti-suzuki-e-vitara";

const SOURCE = "Cars24";

const SOURCE_URL =
  "https://www.cars24.com/";

const now = new Date();

/* =========================================================
   IMAGES
========================================================= */

const images = [
  {
    url: "https://static-cdn.cars24.com/prod/new-car-cms/Maruti-Suzuki/E-Vitara/2025/02/06/1a80f822-6f92-4a4d-b45b-15e379430b16-E-Vitara-_9_.jpg?w=910&dpr=2&optimize=low&format=auto&quality=50",
    alt: "Maruti Suzuki e Vitara exterior",
    role: "primary",
  },

  {
    url: "https://static-cdn.cars24.com/prod/new-car-cms/Maruti-Suzuki/E-Vitara/2025/02/06/8895c262-577c-4eb6-99c0-81a63dfd6c83-E-Vitara-_3_.jpg?w=400&dpr=2&optimize=low&format=auto&quality=50",
    alt: "Maruti Suzuki e Vitara exterior view",
    role: "gallery",
  },

  {
    url: "https://static-cdn.cars24.com/prod/vehicles/maruti-suzuki/e-vitara/e-vitara/26.04-cm-multi-information-display-KfcYZI7T2BmmPtwA.png?w=910&dpr=2&optimize=low&format=auto&quality=50",
    alt: "Maruti Suzuki e Vitara multi information display",
    role: "gallery",
  },

  {
    url: "https://static-cdn.cars24.com/prod/vehicles/maruti-suzuki/e-vitara/e-vitara/c4-ar-pk-e-vitara-2024-rear-seat-sliding-reclining-v-2-3-5Dq2fizchnlriz9O.png?w=910&dpr=2&optimize=low&format=auto&quality=50",
    alt: "Maruti Suzuki e Vitara rear seats",
    role: "gallery",
  },

  {
    url: "https://static-cdn.cars24.com/prod/vehicles/maruti-suzuki/e-vitara/e-vitara/interior-loader-cpGj64Szr3BSE7ks.png?w=400&dpr=2&optimize=low&format=auto&quality=50",
    alt: "Maruti Suzuki e Vitara interior",
    role: "gallery",
  },

  {
    url: "https://static-cdn.cars24.com/prod/vehicles/maruti-suzuki/e-vitara/e-vitara/ar-sn-maruti-e-vitara-regenerative-boost-v1-copy-Li4Bpo4Jtztnvw0P.png?w=910&dpr=2&optimize=low&format=auto&quality=50",
    alt: "Maruti Suzuki e Vitara regenerative boost",
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
    console.log(
      "🖼️ EVINSIGHTS - ADD MARUTI SUZUKI E VITARA IMAGES"
    );
    console.log("=================================================\n");

    await client.query("BEGIN");

    /* =====================================================
       1. FIND VEHICLE
    ===================================================== */

    console.log("🔎 Finding vehicle in database...");

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
Slug: ${VEHICLE_SLUG}
Name: ${VEHICLE_NAME}

Run this SQL in Neon to check the actual vehicle:
SELECT id, name, slug
FROM vehicles
WHERE LOWER(name) LIKE '%e-vitara%'
   OR LOWER(slug) LIKE '%e-vitara%';`
      );
    }

    const vehicle =
      vehicleResult.rows[0];

    const VEHICLE_ID = vehicle.id;

    console.log(
      `   ✅ Vehicle found`
    );

    console.log(
      `   ID   : ${vehicle.id}`
    );

    console.log(
      `   Name : ${vehicle.name}`
    );

    console.log(
      `   Slug : ${vehicle.slug}`
    );

    /* =====================================================
       2. CLEAN EXISTING MEDIA
    ===================================================== */

    console.log(
      "\n🧹 Cleaning existing e Vitara images..."
    );

    const deleteResult =
      await client.query(
        `
        DELETE FROM media
        WHERE vehicle_id = $1
        `,
        [VEHICLE_ID]
      );

    console.log(
      `   ✅ Removed ${deleteResult.rowCount} existing media records`
    );

    /* =====================================================
       3. INSERT MEDIA
    ===================================================== */

    console.log(
      "\n🖼️ Inserting images...\n"
    );

    for (
      let index = 0;
      index < images.length;
      index++
    ) {
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

            vehicleName:
              vehicle.name,

            vehicleSlug:
              vehicle.slug,
          }),
        ]
      );

      console.log(
        `   ✅ Image ${index + 1}/${images.length} inserted`
      );

      console.log(
        `      ${image.role}`
      );
    }

    /* =====================================================
       4. UPDATE VEHICLE PAYLOAD
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
      "   ✅ Primary image updated"
    );

    /* =====================================================
       5. VERIFY MEDIA
    ===================================================== */

    console.log(
      "\n🔎 Verifying inserted images..."
    );

    const mediaCheck =
      await client.query(
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

Expected:
${images.length}

Found:
${mediaCheck.rows.length}`
      );
    }

    console.log(
      `   ✅ ${mediaCheck.rows.length} media records verified`
    );

    /* =====================================================
       6. VERIFY PRIMARY IMAGE
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
        "Primary image was not correctly saved in vehicle payload."
      );
    }

    if (
      metadata.image !==
      images[0].url
    ) {
      throw new Error(
        "Primary image was not correctly saved in vehicle metadata."
      );
    }

    console.log(
      "   ✅ Vehicle primary image verified"
    );

    /* =====================================================
       7. COMMIT
    ===================================================== */

    await client.query("COMMIT");

    /* =====================================================
       8. FINAL OUTPUT
    ===================================================== */

    console.log(
      "\n================================================="
    );

    console.log(
      "🎉 MARUTI SUZUKI E VITARA IMAGES INSERTED"
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
      "\n📸 Inserted media:"
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

    console.error(
      "\nError:"
    );

    console.error(error);

    console.error(
      "\n⚠️ No partial e Vitara image data was saved."
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