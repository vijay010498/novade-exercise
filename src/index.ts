/*
This file is responsible for starting the
server and do all the scaffolding work.

*/

import { app } from "./app"; //importing app.ts file which contains all the routes for all the server endpoints

//function to start the server
const startServer = async () => {
  const PORT = process.env.PORT || 5000; //process.env.PORT will be available when server is deployed in cloud, otherwise 5000 for local development
  app.listen(PORT, () => {
    console.error(`Server started on port ${PORT}`); //message printed on console to know that the server has started
  });
};

startServer(); //function call to start the server
