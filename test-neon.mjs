import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: ".env.local" });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
});

try {
  console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL);
  console.log("Testing database queries...\n");

  const vehicleResult = await pool.query(
    "SELECT COUNT(*) FROM vehicles"
  );

  console.log(
    "✅ Vehicles:",
    vehicleResult.rows[0].count
  );

  const brandResult = await pool.query(
    "SELECT COUNT(*) FROM brands"
  );

  console.log(
    "✅ Brands:",
    brandResult.rows[0].count
  );

  const contentResult = await pool.query(
    "SELECT COUNT(*) FROM content"
  );

  console.log(
    "✅ Content:",
    contentResult.rows[0].count
  );

  console.log("\n🎉 DATABASE QUERIES WORKING");
} catch (error) {
  console.error("\n❌ DATABASE QUERY FAILED");
  console.error(error);
} finally {
  await pool.end();
}