/*
This file is responsible for starting the
server and do all the scaffolding work.

*/

import { app } from "./app"; //importing app.ts file which contains all the routes for all the server endpoints
import { postgres } from "./config/postgresConnection";
//function to start the server
const startServer = async () => {
  const PORT = process.env.PORT || 5000; //process.env.PORT will be available when server is deployed in cloud, otherwise 5000 for local development
  app.listen(PORT, () => {
    console.error(`Server started on port ${PORT}`); //message printed on console to know that the server has started
  });
  console.log("Auto Inserting");
  for (let i = 0; i < 100; i++) {
    const added = "2021-05-19";
    const author = "vijay";
    const content = `This is ${i} Note}`;
    await postgres.query(
      "INSERT INTO notes (added,author,content) VALUES ($1,$2,$3) RETURNING *",
      [added, author, content]
    );
  }
  console.log("Inserted 100 records");
};

startServer(); //function call to start the server
