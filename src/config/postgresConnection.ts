import { Pool as post } from "pg";

/*const pool = new post({
  user: "postgres",
  password: "vijay",
  database: "novade",
  host: "localhost",
  port: 5432,
});*/
const pool = new post({
  user: "gmhvvwnssgumrp",
  password: "0f34e7ca297fc3ff3b1cf7ead7394cd52039eecf68b63694274ab5bd0c57e000",
  database: "dc5u74b93hrtd8",
  host: "ec2-34-193-113-223.compute-1.amazonaws.com",
  port: 5432,
});

export { pool as postgres };
