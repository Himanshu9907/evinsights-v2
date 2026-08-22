import pg from "pg";

const { Client } = pg;

const local = new Client({
  connectionString: process.env.LOCAL_DATABASE_URL,
});

const neon = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const VEHICLE_ID = "tata-curvv-ev";

async function insertRows(client, table, rows) {
  if (!rows.length) {
    console.log(`⚪ ${table}: nothing to copy`);
    return;
  }

  for (const row of rows) {
    const columns = Object.keys(row);
    const values = Object.values(row);

    const placeholders = values.map((_, i) => `$${i + 1}`);

    const sql = `
      INSERT INTO ${table}
      (${columns.map((c) => `"${c}"`).join(", ")})
      VALUES (${placeholders.join(", ")})
      ON CONFLICT DO NOTHING
    `;

    await client.query(sql, values);
  }

  console.log(`✅ ${table}: ${rows.length} row(s) processed`);
}

async function main() {
  console.log("🔌 Connecting to databases...");

  await local.connect();
  await neon.connect();

  console.log("✅ Local PostgreSQL connected");
  console.log("✅ Neon PostgreSQL connected");

  await neon.query("BEGIN");

  try {
    // --------------------------------------------------
    // VEHICLE
    // --------------------------------------------------

    const vehicleResult = await local.query(
      `SELECT * FROM vehicles WHERE id = $1`,
      [VEHICLE_ID]
    );

    if (!vehicleResult.rows.length) {
      throw new Error("Curvv EV not found in local PostgreSQL");
    }

    await insertRows(neon, "vehicles", vehicleResult.rows);

    // --------------------------------------------------
    // VARIANTS
    // --------------------------------------------------

    const variantResult = await local.query(
      `
      SELECT *
      FROM variants
      WHERE vehicle_id = $1
      ORDER BY id
      `,
      [VEHICLE_ID]
    );

    await insertRows(neon, "variants", variantResult.rows);

    const variantIds = variantResult.rows.map((row) => row.id);

    // --------------------------------------------------
    // PRICING
    // --------------------------------------------------

    if (variantIds.length) {
      const pricingResult = await local.query(
        `
        SELECT *
        FROM pricing
        WHERE variant_id = ANY($1::text[])
        ORDER BY id
        `,
        [variantIds]
      );

      await insertRows(neon, "pricing", pricingResult.rows);
    }

    // --------------------------------------------------
    // SPECIFICATIONS
    // --------------------------------------------------

    const specificationsResult = await local.query(
      `
      SELECT *
      FROM specifications
      WHERE vehicle_id = $1
      ORDER BY id
      `,
      [VEHICLE_ID]
    );

    await insertRows(
      neon,
      "specifications",
      specificationsResult.rows
    );

    // --------------------------------------------------
    // CHARGING
    // --------------------------------------------------

    const chargingResult = await local.query(
      `
      SELECT *
      FROM charging
      WHERE vehicle_id = $1
      ORDER BY id
      `,
      [VEHICLE_ID]
    );

    await insertRows(
      neon,
      "charging",
      chargingResult.rows
    );

    // --------------------------------------------------
    // MEDIA
    // --------------------------------------------------

    const mediaResult = await local.query(
      `
      SELECT *
      FROM media
      WHERE vehicle_id = $1
      ORDER BY id
      `,
      [VEHICLE_ID]
    );

    await insertRows(
      neon,
      "media",
      mediaResult.rows
    );

    await neon.query("COMMIT");

    console.log("");
    console.log("🎉 CURVV EV MIGRATION COMPLETED");
    console.log("Vehicle:", VEHICLE_ID);
  } catch (error) {
    await neon.query("ROLLBACK");

    console.error("");
    console.error("❌ MIGRATION FAILED");
    console.error(error);

    process.exitCode = 1;
  } finally {
    await local.end();
    await neon.end();
  }
}

main();