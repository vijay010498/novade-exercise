import { Pool as post } from "pg";

const pool = new post({
  user: "postgres",
  password: "vijay",
  database: "novade",
  host: "localhost",
  port: 5432,
});

export { pool as postgres };
