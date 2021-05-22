/*
This file is responsible for starting the
server and do all the scaffolding work.
and create notes table if not exists
*/

//update on 22/05/21 - implemented multi cluster to achieve 0% downtime

import { app } from "./app"; //importing app.ts file which contains all the routes for all the server endpoints
import { postgres } from "./config/postgresConnection"; //postgres server connection details
import cluster from 'cluster'; // cluster module to make use of multiple cpu's in the sever --- added on 22/05/21
import os from  'os'; // os module used to get number of cpu's in the server --- added on 22/05/21
const numCpu = os.cpus().length; // number of cpu's --- added on 22/05/21
//function to start the server
const startServer = async () => {

  if(cluster.isMaster){  //first time when the sever start's will be master which will not process any request, act as a master --- added on 22/05/21
    for(let i = 0 ;i  <numCpu;i++){
      cluster.fork() // creating the clusters to number of cpu's --- added on 22/05/21
    }

    //if the cluster dies then, then this event will catch and recreate the cluster again --- added on 22/05/21
    cluster.on("exit", (worker, code, signal)=>{
      console.log(`worker ${worker.process.pid} died`);
      cluster.fork();
      console.log('Died thread started');
    })
  }else {
    const PORT = process.env.PORT || 5000; //process.env.PORT will be available when server is deployed in cloud, otherwise 5000 for local development
    await app.listen(PORT, () => {
      console.log(`server with process id ${process.pid} started on 5000, server has total ${numCpu} cpu's`); //message printed on console to know that the server has started
    });
  }
  try {
    await postgres.query(
      "CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, added VARCHAR(255) NULL,author VARCHAR(255) NOT NULL, content VARCHAR(255) NOT NULL)"
    );
  } catch (err) {
    console.error("Error auto creating table");
  }
};

startServer(); //function call to start the server
