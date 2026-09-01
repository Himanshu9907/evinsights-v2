// import pg from 'pg';

// const { Pool } = pg;

// let pool;

// function getPool() {
//   if (!process.env.DATABASE_URL) {
//     throw new Error('DATABASE_URL is required. Copy .env.example to .env.local and configure PostgreSQL.');
//   }
//   if (!pool) {
//     const ssl = /sslmode=require|neon|supabase/i.test(process.env.DATABASE_URL)
//       ? { rejectUnauthorized: false }
//       : undefined;
//     pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl, max: 10, idleTimeoutMillis: 30000 });
//   }
//   return pool;
// }

// export async function query(text, params = []) {
//   return getPool().query(text, params);
// }

// export async function withTransaction(fn) {
//   const client = await getPool().connect();
//   try {
//     await client.query('BEGIN');
//     const result = await fn(client);
//     await client.query('COMMIT');
//     return result;
//   } catch (error) {
//     await client.query('ROLLBACK');
//     throw error;
//   } finally {
//     client.release();
//   }
// }


import pg from "pg";

const { Pool } = pg;

const globalForPg = globalThis;

function createPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is required. Copy .env.example to .env.local and configure PostgreSQL."
    );
  }

  return new Pool({
    connectionString: process.env.DATABASE_URL,

    ssl: {
      rejectUnauthorized: false,
    },

    max: 10,

    idleTimeoutMillis: 30000,

    connectionTimeoutMillis: 15000,

    keepAlive: true,

    keepAliveInitialDelayMillis: 10000,
  });
}

const pool =
  globalForPg.__evinsights_pg_pool ||
  createPool();

if (process.env.NODE_ENV !== "production") {
  globalForPg.__evinsights_pg_pool = pool;
}

pool.on("error", (error) => {
  console.error(
    "❌ PostgreSQL pool error:",
    error
  );
});

export async function query(text, params = []) {
  return pool.query(text, params);
}

export async function withTransaction(fn) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await fn(client);

    await client.query("COMMIT");

    return result;
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error(
        "❌ Transaction rollback failed:",
        rollbackError
      );
    }

    throw error;
  } finally {
    client.release();
  }
}