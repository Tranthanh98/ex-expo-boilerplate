import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
// import * as authSchema from "./schema/auth-schema";
// import * as schema from "./schema/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, {
  schema: {
    // ...schema,
    // ...authSchema,
  },
});

export async function connectDatabase() {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

export async function closeDatabase() {
  await pool.end();
}
