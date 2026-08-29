import pg from "pg";

const { Client } = pg;

/*
=========================================================
 EVINSIGHTS
 REPAIR VEHICLE GALLERY IMAGES
=========================================================

WHAT THIS SCRIPT DOES:

1. Reads existing vehicles from Neon
2. Opens CarDekho gallery pages
3. Extracts CarDekho image URLs
4. Filters obvious non-car/UI images
5. Keeps 5-6 images per vehicle
6. Deletes OLD media records for that vehicle
7. Inserts NEW media records
8. Updates vehicles.payload.mediaIds
9. DOES NOT recreate vehicles
10. DOES NOT touch variants/pricing/specifications/charging

RUN:

node --env-file=.env.local scripts/repair-cardekho-images.mjs

=========================================================
*/

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL missing. Check .env.local"
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
 CONFIG
=========================================================
*/

const IMAGES_PER_VEHICLE = 6;

const REQUEST_TIMEOUT = 15000;

/*
=========================================================
 CARDEKHO GALLERY URLS
=========================================================

These are explicit mappings so we don't depend on
guessing the URL from the vehicle name.
*/

const cardekhoPages = {
  "tata-punch-ev":
    "https://www.cardekho.com/tata/punch-ev/pictures",

  "tata-tiago-ev":
    "https://www.cardekho.com/tata/tiago-ev/pictures",

  "tata-tigor-ev":
    "https://www.cardekho.com/tata/tigor-ev/pictures",

  "tata-harrier-ev":
    "https://www.cardekho.com/tata/harrier-ev/pictures",

  "hyundai-creta-electric":
    "https://www.cardekho.com/hyundai/creta-electric/pictures",

  "mg-comet-ev":
    "https://www.cardekho.com/mg/comet-ev/pictures",

  "mg-windsor-ev":
    "https://www.cardekho.com/mg/windsor-ev/pictures",

  "mahindra-be-6":
    "https://www.cardekho.com/mahindra/be-6/pictures",

  "mahindra-xev-9e":
    "https://www.cardekho.com/mahindra/xev-9e/pictures",

  "byd-atto-3":
    "https://www.cardekho.com/byd/atto-3/pictures",

  "byd-seal":
    "https://www.cardekho.com/byd/seal/pictures",

  "byd-emax-7":
    "https://www.cardekho.com/byd/emax-7/pictures",

  "byd-sealion-7":
    "https://www.cardekho.com/byd/sealion-7/pictures",

  "kia-ev6":
    "https://www.cardekho.com/kia/ev6/pictures",

  "citroen-e-c3":
    "https://www.cardekho.com/citroen/e-c3/pictures",

  "bmw-ix1":
    "https://www.cardekho.com/bmw/ix1/pictures",

  "bmw-i4":
    "https://www.cardekho.com/bmw/i4/pictures",

  "mercedes-eqa":
    "https://www.cardekho.com/mercedes-benz/eqa/pictures",

  "mercedes-eqb":
    "https://www.cardekho.com/mercedes-benz/eqb/pictures",

  "hyundai-ioniq-6":
    "https://www.cardekho.com/hyundai/ioniq-6/pictures",

  "hyundai-kona-electric":
    "https://www.cardekho.com/hyundai/kona-electric/pictures",

  "tata-avinya":
    "https://www.cardekho.com/tata/avinya/pictures",
};

/*
=========================================================
 VEHICLE NAME FALLBACKS
=========================================================
*/

const vehicleSearchNames = {
  "tata-punch-ev": "Tata Punch EV",

  "tata-tiago-ev": "Tata Tiago EV",

  "tata-tigor-ev": "Tata Tigor EV",

  "tata-harrier-ev": "Tata Harrier EV",

  "hyundai-creta-electric": "Hyundai Creta Electric",

  "mg-comet-ev": "MG Comet EV",

  "mg-windsor-ev": "MG Windsor EV",

  "mahindra-be-6": "Mahindra BE 6",

  "mahindra-xev-9e": "Mahindra XEV 9e",

  "byd-atto-3": "BYD Atto 3",

  "byd-seal": "BYD Seal",

  "byd-emax-7": "BYD eMAX 7",

  "byd-sealion-7": "BYD Sealion 7",

  "kia-ev6": "Kia EV6",

  "citroen-e-c3": "Citroen e-C3",

  "bmw-ix1": "BMW iX1",

  "bmw-i4": "BMW i4",

  "mercedes-eqa": "Mercedes-Benz EQA",

  "mercedes-eqb": "Mercedes-Benz EQB",

  "hyundai-ioniq-6": "Hyundai Ioniq 6",

  "hyundai-kona-electric": "Hyundai Kona Electric",

  "tata-avinya": "Tata Avinya",
};

/*
=========================================================
 HELPERS
=========================================================
*/

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function cleanUrl(value) {
  if (!value) return null;

  let url = String(value).trim();

  url = url
    .replaceAll("\\/", "/")
    .replaceAll("\\u002F", "/")
    .replaceAll("&amp;", "&")
    .replace(/^["']/, "")
    .replace(/["']$/, "");

  if (!url.startsWith("http")) {
    return null;
  }

  return url;
}

function isCarDekhoImage(url) {
  if (!url) return false;

  const lower = url.toLowerCase();

  /*
   * Only accept CarDekho / CarDekho CDN images.
   */

  const allowedHost =
    lower.includes("cardekho.com") ||
    lower.includes("cardekho.net") ||
    lower.includes("stimg.cardekho.com");

  if (!allowedHost) {
    return false;
  }

  /*
   * Reject obvious UI/icons/logos.
   */

  const blocked = [
    "logo",
    "icon",
    "sprite",
    "placeholder",
    "favicon",
    "loader",
    "avatar",
    "review",
    "emi",
    "arrow",
    "search",
    "facebook",
    "twitter",
    "youtube",
    "whatsapp",
    "play-button",
    "360",
  ];

  if (
    blocked.some((word) =>
      lower.includes(word)
    )
  ) {
    return false;
  }

  /*
   * CarDekho image URLs don't always end with .jpg,
   * therefore don't require an extension.
   */

  return true;
}

function normalizeImageUrl(url) {
  if (!url) return null;

  let cleaned = cleanUrl(url);

  if (!cleaned) return null;

  /*
   * Remove HTML query noise where possible.
   *
   * Keep image resizing parameters if present because
   * those may be required by CarDekho CDN.
   */

  return cleaned;
}

function extractUrlsFromHtml(html) {
  const urls = [];

  /*
   * Standard absolute URLs
   */

  const absoluteUrlRegex =
    /https?:\/\/[^"'<>\\\s]+/gi;

  const matches =
    html.match(absoluteUrlRegex) || [];

  urls.push(...matches);

  /*
   * JSON escaped URLs
   */

  const escapedRegex =
    /https?:\\\/\\\/[^"'<>\\\s]+/gi;

  const escaped =
    html.match(escapedRegex) || [];

  urls.push(
    ...escaped.map((url) =>
      url.replaceAll("\\/", "/")
    )
  );

  return urls;
}

/*
=========================================================
 FETCH PAGE
=========================================================
*/

async function fetchPage(url) {
  const controller =
    new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/139 Safari/537.36",

        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",

        "Accept-Language":
          "en-US,en;q=0.9",

        Referer:
          "https://www.google.com/",
      },

      signal: controller.signal,

      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

/*
=========================================================
 IMAGE URL VALIDATION
=========================================================

We don't download/store the image.

We only make a small request to verify that the
URL actually points to an image.
*/

async function validateImageUrl(url) {
  const controller =
    new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/139 Safari/537.36",

        Range: "bytes=0-100",
      },

      signal: controller.signal,

      redirect: "follow",
    });

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    const contentLength =
      response.headers.get(
        "content-length"
      );

    /*
     * Abort response body so we don't download
     * the complete image.
     */

    try {
      await response.body?.cancel();
    } catch {}

    return (
      response.ok &&
      contentType
        .toLowerCase()
        .startsWith("image/")
    );
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

/*
=========================================================
 EXTRACT CARDEKHO IMAGES
=========================================================
*/

async function getCarDekhoImages(
  vehicleId,
  vehicleName
) {
  const pageUrl =
    cardekhoPages[vehicleId];

  if (!pageUrl) {
    console.log(
      `   ⚠️ No CarDekho mapping for ${vehicleName}`
    );

    return [];
  }

  console.log(
    `   🌐 CarDekho: ${pageUrl}`
  );

  let html;

  try {
    html =
      await fetchPage(pageUrl);
  } catch (error) {
    console.log(
      `   ❌ CarDekho page failed: ${error.message}`
    );

    return [];
  }

  const rawUrls =
    extractUrlsFromHtml(html);

  const candidates = [];

  for (const rawUrl of rawUrls) {
    const url =
      normalizeImageUrl(rawUrl);

    if (!url) continue;

    if (!isCarDekhoImage(url)) {
      continue;
    }

    if (
      candidates.includes(url)
    ) {
      continue;
    }

    candidates.push(url);
  }

  console.log(
    `   🔎 Candidate CarDekho images: ${candidates.length}`
  );

  /*
   * Validate candidates one by one.
   *
   * Limit validation so the script doesn't hammer
   * the website.
   */

  const valid = [];

  for (
    const candidate of candidates.slice(
      0,
      40
    )
  ) {
    if (
      valid.length >=
      IMAGES_PER_VEHICLE
    ) {
      break;
    }

    const ok =
      await validateImageUrl(
        candidate
      );

    if (!ok) {
      continue;
    }

    valid.push({
      url: candidate,
      alt: `${vehicleName} image ${valid.length + 1}`,
      type: "image",
      source: "CarDekho",
      sourcePage: pageUrl,
    });

    console.log(
      `      ✓ Image ${valid.length}/${IMAGES_PER_VEHICLE}`
    );

    await sleep(150);
  }

  return valid.slice(
    0,
    IMAGES_PER_VEHICLE
  );
}

/*
=========================================================
 GET VEHICLES
=========================================================
*/

async function getVehicles() {
  const result =
    await db.query(`
      SELECT
        id,
        name,
        slug,
        payload
      FROM vehicles
      ORDER BY name ASC
    `);

  return result.rows;
}

/*
=========================================================
 DELETE OLD MEDIA
=========================================================
*/

async function deleteOldMedia(
  vehicleId
) {
  const result =
    await db.query(
      `
        DELETE FROM media
        WHERE vehicle_id = $1
        RETURNING id
      `,
      [vehicleId]
    );

  return result.rows.length;
}

/*
=========================================================
 INSERT NEW MEDIA
=========================================================
*/

async function insertMedia(
  vehicle,
  images
) {
  const mediaIds = [];

  for (
    let index = 0;
    index < images.length;
    index++
  ) {
    const image =
      images[index];

    const mediaId =
      `${vehicle.id}-cardekho-image-${index + 1}`;

    const payload = {
      id: mediaId,

      vehicleId:
        vehicle.id,

      type: "image",

      url: image.url,

      alt:
        image.alt ||
        `${vehicle.name} image ${index + 1}`,

      source: "CarDekho",

      sourcePage:
        image.sourcePage || null,
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
        DO UPDATE SET
          url = EXCLUDED.url,
          alt = EXCLUDED.alt,
          payload = EXCLUDED.payload
      `,
      [
        mediaId,

        vehicle.id,

        image.url,

        image.alt,

        JSON.stringify(payload),
      ]
    );

    mediaIds.push(mediaId);
  }

  return mediaIds;
}

/*
=========================================================
 UPDATE VEHICLE PAYLOAD
=========================================================
*/

async function updateVehiclePayload(
  vehicle,
  mediaIds,
  images
) {
  let payload = {};

  try {
    if (
      vehicle.payload &&
      typeof vehicle.payload ===
        "object"
    ) {
      payload =
        vehicle.payload;
    } else if (
      typeof vehicle.payload ===
      "string"
    ) {
      payload =
        JSON.parse(
          vehicle.payload
        );
    }
  } catch {
    payload = {};
  }

  const metadata =
    payload.metadata || {};

  const updatedPayload = {
    ...payload,

    metadata: {
      ...metadata,

      image:
        images[0]?.url ||
        metadata.image ||
        null,

      imageUrl:
        images[0]?.url ||
        metadata.imageUrl ||
        null,

      gallerySource:
        "CarDekho",
    },

    mediaIds,
  };

  await db.query(
    `
      UPDATE vehicles
      SET
        payload = $2::jsonb,
        metadata = $3::jsonb,
        updated_at = NOW()
      WHERE id = $1
    `,
    [
      vehicle.id,

      JSON.stringify(
        updatedPayload
      ),

      JSON.stringify(
        updatedPayload.metadata
      ),
    ]
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
    "================================================="
  );
  console.log(
    "🚗 EVINSIGHTS - REPAIR CARDEKHO GALLERIES"
  );
  console.log(
    "================================================="
  );
  console.log("");

  await db.connect();

  console.log(
    "✅ Neon PostgreSQL connected"
  );

  console.log("");

  const vehicles =
    await getVehicles();

  console.log(
    `🚗 Vehicles found in Neon: ${vehicles.length}`
  );

  console.log("");

  let processed = 0;
  let repaired = 0;
  let skipped = 0;
  let failed = 0;
  let totalImages = 0;

  for (
    let index = 0;
    index < vehicles.length;
    index++
  ) {
    const vehicle =
      vehicles[index];

    console.log("");
    console.log(
      "-------------------------------------------------"
    );

    console.log(
      `[${index + 1}/${vehicles.length}] 🚗 ${vehicle.name}`
    );

    console.log(
      "-------------------------------------------------"
    );

    processed++;

    const vehicleName =
      vehicleSearchNames[
        vehicle.id
      ] ||
      vehicle.name;

    try {
      /*
       * IMPORTANT:
       * Existing vehicle is NOT skipped.
       */

      const images =
        await getCarDekhoImages(
          vehicle.id,
          vehicleName
        );

      if (
        images.length <
        5
      ) {
        console.log(
          `   ⚠️ Only ${images.length} valid images found`
        );

        /*
         * DON'T delete existing gallery if
         * we couldn't find enough replacement
         * images.
         */

        skipped++;

        continue;
      }

      console.log(
        `   ✅ ${images.length} genuine CarDekho image URLs found`
      );

      await db.query(
        "BEGIN"
      );

      try {
        /*
         * Delete old/wrong images.
         */

        const deleted =
          await deleteOldMedia(
            vehicle.id
          );

        console.log(
          `   🗑️ Old media deleted: ${deleted}`
        );

        /*
         * Insert new images.
         */

        const mediaIds =
          await insertMedia(
            vehicle,
            images
          );

        console.log(
          `   🖼️ New media inserted: ${mediaIds.length}`
        );

        /*
         * Update vehicle payload.
         */

        await updateVehiclePayload(
          vehicle,
          mediaIds,
          images
        );

        console.log(
          "   🔗 Vehicle mediaIds updated"
        );

        await db.query(
          "COMMIT"
        );

        repaired++;

        totalImages +=
          mediaIds.length;

        console.log(
          "   ✅ Gallery repaired successfully"
        );
      } catch (error) {
        await db.query(
          "ROLLBACK"
        );

        throw error;
      }

      /*
       * Small delay between vehicles.
       */

      await sleep(500);
    } catch (error) {
      failed++;

      console.error(
        `   ❌ Failed: ${error.message}`
      );
    }
  }

  console.log("");
  console.log(
    "================================================="
  );
  console.log(
    "🎉 IMAGE REPAIR COMPLETED"
  );
  console.log(
    "================================================="
  );
  console.log("");

  console.log(
    `Vehicles processed : ${processed}`
  );

  console.log(
    `Galleries repaired : ${repaired}`
  );

  console.log(
    `Galleries skipped  : ${skipped}`
  );

  console.log(
    `Failed             : ${failed}`
  );

  console.log(
    `Images inserted    : ${totalImages}`
  );

  console.log("");

  console.log(
    "✅ Existing vehicle data was NOT recreated."
  );

  console.log(
    "✅ Only vehicle gallery/media was repaired."
  );

  console.log("");
}

/*
=========================================================
 RUN
=========================================================
*/

main()
  .catch((error) => {
    console.error("");
    console.error(
      "❌ FATAL ERROR"
    );
    console.error("");
    console.error(error);
    console.error("");

    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await db.end();
    } catch {}
  });