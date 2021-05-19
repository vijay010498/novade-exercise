/*
This file is responsible for starting the
server and do all the scaffolding work.
and create notes table if not exists
*/

import { app } from "./app"; //importing app.ts file which contains all the routes for all the server endpoints
import { postgres } from "./config/postgresConnection"; //postgres server connection details
//function to start the server
const startServer = async () => {
  const PORT = process.env.PORT || 5000; //process.env.PORT will be available when server is deployed in cloud, otherwise 5000 for local development
  await app.listen(PORT, () => {
    console.error(`Server started on port ${PORT}`); //message printed on console to know that the server has started
  });
  try {
    await postgres.query(
      "CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, added VARCHAR(255) NULL,author VARCHAR(255) NOT NULL, content VARCHAR(255) NOT NULL)"
    );
  } catch (err) {
    console.error("Error auto creating table");
  }
};

startServer(); //function call to start the server
