import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "vijay",
  database: "novade",
  host: "localhost",
  port: 5432,
});

export { pool as postgres };
