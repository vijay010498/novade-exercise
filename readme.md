# Novade Exercise Doc Vijayaraghavan

Created: May 19, 2021 8:30 AM
Created By: Vijayaraghavan S
Last Edited By: Vijayaraghavan S
Last Edited Time: May 19, 2021 2:28 PM
Stakeholders: Vijayaraghavan S
Status: completed
Type: Code Documentation

# Node API for Novade Notes Exercise

---

### Table of contents

### Description

---

This is a backend REST API written in [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) framework for storing and retrieving the notes (memo) in [Postgres](https://www.postgresql.org/) database, handled all the cases mentioned in the exercise and error handling using [middlewares]() and [custom error abstract class]().

### Prerequisites

---

- Locally installed Postgres database. **If you would like to test the cloud hosted API then you can [go here]() and skip this [prerequisities]() section and [installation section]().** No need to install Postgres Locally.
- [Node.js](https://nodejs.org/).
- [NPM](https://www.npmjs.com/) (Node Package Manager).

### Installation

---

1. Clone the code from [repo](https://github.com/vijay010498/novade-exercise).
2. Inside the project directory in terminal run the command **npm run install** to install the dependencies required to run the server.
3. Check the [configuration]().

### Starting the server

---

1. Make sure to complete the [Prerequisities]() and [Installation]() first.
2. Not Inside the project directory run the command **npm run dev** (or) **npm run start**  as in the [package.json]() file
3. Watch the terminal for the following message.

   ![https://github.com/vijay010498/novade-exercise/blob/master/files/server-start.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/server-start.JPG?raw=true)

   server started

### Tech Stack

---

- [TypeScript](https://www.typescriptlang.org/) - For Better error handling than javascript.
- [Node.js](https://nodejs.org/).
- [Express.js](https://nodejs.org/).
- [Postgress](https://www.postgresql.org/).
- [Heroku](https://www.heroku.com/) for hosting API and [cloud postgres](https://www.heroku.com/postgres)  -  Not given in the assignment but can be used for easy testing

### URLS

---

- [**LocalHost:**]()
    1. POST  : [http://localhost:5000/api/notes](http://localhost:5000/api/notes)
    2. GET ALL NOTES : [http://localhost:5000/api/notes](http://localhost:5000/api/notes)
    3. FILTER GET NOTES  : [http://localhost:5000/api/notes?author=vijay](http://localhost:5000/api/notes?author=vijay)
    4. GET one note with path paramater  : [http://localhost:5000/api/notes/:id](http://localhost:5000/api/notes/:id)
- [**Cloud:**]()
    1. POST  : [https://novade-solutions-exercise.herokuapp.com/api/notes](https://novade-solutions-exercise.herokuapp.com/api/notes)
    2. GET ALL NOTES : [https://novade-solutions-exercise.herokuapp.com/api/notes](https://novade-solutions-exercise.herokuapp.com/api/notes)
    3. FILTER GET NOTES  : [https://novade-solutions-exercise.herokuapp.com/api/notes?author=john](https://novade-solutions-exercise.herokuapp.com/api/notes?author=john)
    4. GET one note with path paramater  : [https://novade-solutions-exercise.herokuapp.com/api/notes/:id](https://novade-solutions-exercise.herokuapp.com/api/notes/:id)
- **Postman - Local** : [https://documenter.getpostman.com/view/13994938/TzRYe5HA](https://documenter.getpostman.com/view/13994938/TzRYe5HA)
- **Postman - Cloud**  : [https://documenter.getpostman.com/view/13994938/TzRYdQvb](https://documenter.getpostman.com/view/13994938/TzRYdQvb)

### Dependencies

---

```json
"devDependencies" : {
    "prettier": "^2.3.0" 
  },
  "dependencies": {
    "@types/express": "^4.17.11", 
    "@types/pg": "^7.14.11",
    "express": "^4.17.1",
    "express-async-errors": "^3.1.1",
    "express-validator": "^6.11.1",
    "pg": "^8.6.0", 
    "ts-node-dev": "^1.1.6", 
    "typescript": "^4.2.4"
  }
```

### Configuration

---

- Create a database in postgres. Note - It's not mandatory to create table, Since every time server starts table will get created it not exists.
- Update the Postgres configuration in this file [projectDirectory\src\config\postgresConnection.ts](https://github.com/vijay010498/novade-exercise/blob/master/src/config/postgresConnection.ts) as follows:

```tsx
const pool = new post({
  user: "", // postgres user name
  password: "", //postgres password for above user
  database: "", //database created in the above step
  host: "", //If running locally give "localhost" or accordingly
  port: 5432, // postgres port usually 5432
});
```

```tsx
const pool = new post({
  user: "postgres",
  password: "vijay",
  database: "novade",
  host: "localhost",
  port: 5432,
});
```

### [Package.json](https://github.com/vijay010498/novade-exercise/blob/master/package.json) Scripts

---

```json
"scripts": {
    "start": "ts-node-dev src/startServer.ts",
    "dev": "ts-node-dev src/startServer.ts",
    "auto-insert": "ts-node src/dBTableAutoInsert.ts"
  },
```

- start - **npm run start** used while hosting in cloud
- dev - **npm run  dev** used in the development .
- auto-insert - **npm run auto-insert** auto insert 1000 random records in the database

### Auto-insert script

---

- This script will **auto insert 1000 random records** using this [code file](https://github.com/vijay010498/novade-exercise/blob/master/src/dBTableAutoInsert.ts).

```tsx
/*
This file will create table if not exists and auto insert 1000 random records
 */
import { postgres } from "./config/postgresConnection";

const autoCreateTableInsert = async () => {
  try {
    //init database and create table schema
    await postgres.query(
      "CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, added VARCHAR(255) NULL,author VARCHAR(255) NOT NULL, content VARCHAR(255) NOT NULL)"
    );
    //auto insert 1000 records
    const authors = ["john", "jane", "pablo", "sara", "vijay"];
    const addedDates = [
      "2021-01-02",
      "2021-05-19",
      "2021-03-21",
      "2021-04-01",
      "2021-04-28",
    ];
    const notes = [
      "Get Food",
      "Buy Some Chocolates",
      "Get a pen",
      "Commit to github before 3 pm",
      "Test the new code ASAP",
      "Meeting with joy today",
    ];
    console.log("Auto Inserting 1000 records");
    for (let i = 0; i < 1000; i++) {
      const added = addedDates[Math.floor(Math.random() * addedDates.length)];
      const author = authors[Math.floor(Math.random() * authors.length)];
      const content = notes[Math.floor(Math.random() * notes.length)];
      await postgres.query(
        "INSERT INTO notes (added,author,content) VALUES ($1,$2,$3)",
        [added, author, content]
      );
    }
    console.log("Inserted 1000 records");
  } catch (err) {
    console.error("Error  Auto Inserting Data");
  }
};

autoCreateTableInsert();
```

![https://github.com/vijay010498/novade-exercise/blob/master/files/sql.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/sql.JPG?raw=true)

Auto insert record for testing large amount of data

![https://github.com/vijay010498/novade-exercise/blob/master/files/1000count.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/1000count.JPG?raw=true)

Each time code runs 1000 records will be inserted

### [Code](https://github.com/vijay010498/novade-exercise) Explanation -  In-depth detail given in every line of code.

---

1. [startServer.ts](https://github.com/vijay010498/novade-exercise/blob/master/src/startServer.ts)

   This file is the starting point to start the server including the port configuration and creating the postgres table if not exixts

    ```tsx
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
    ```

2. [app.ts](https://github.com/vijay010498/novade-exercise/blob/master/src/app.ts)

   This file holds all the different routes, universal error handlers, and all other setup

    ```tsx
    /*
    This file basically holds all the routes or endpoints in the server which is exported and used in index.ts file
     */

    import express, { json } from "express"; //express framework and json import

    import "express-async-errors"; //npm module used to write middleware in all the routes to validate the query,body and params check in the notesRoutes.ts file

    import { errorhandler, NotFoundError } from "./errors"; //customized and serialized errors to catch any error in the server infra which prevents the request hell(request doesn't know what happened when server crashes)

    //here we will import all the different routes in our server as of this exercise we have only one file
    import { notesRouter } from "./routes/notesRoutes";

    const app = express(); //express framework

    app.use(json()); //to access the req.body and communicate in the json format

    app.set("trust proxy", true); //This indicates the app is behind a front-facing proxy, and to use the X-Forwarded-* headers.Prevents the headers spoofing

    app.use(notesRouter); //making use of the route imported in the top

    app.use(errorhandler); //making use of the errorhandler imported top

    //this is to cache all the endpoints except the defined ones and sends 404 error
    app.all("*", (req, res) => {
      throw new NotFoundError();
    });

    export { app }; //named export to use in the index.js
    ```

3. [notesRoutes.ts](https://github.com/vijay010498/novade-exercise/blob/master/src/routes/notesRoutes.ts)

   This file contains all the routers or endpoints in our server which is exported and imported in [app.ts]()

    ```tsx
    /*
    This file contains all the express endpoints and validation middleware
     */

    import express, { Request, Response } from "express"; //express and Request and response to specifying the type format since this is typescript
    import { validateRequest } from "../middleware/common/validate-request"; //custom made validation to check the query, body and params and serialize the errors in common format
    import { body, param } from "express-validator"; //express-validator is a middleware to validate the request query , body, and params before processing the request
    const router = express.Router(); //init
    import { postgres } from "../config/postgresConnection"; //importing the postgres connection details to perform database operations
    import { BadRequestError } from "../errors"; // send serialized 400 error reduce number of typing same code

    /*
    This is a post route to create a note and save in the postgres database, express-validator middleware is used to validate the request body
     */
    router.post(
      "/api/notes",
      [
        body("author") // This is to check that "author" has to be string and must not be null and with minimum length of 1 ignoring the trailing spaces.
          .isString() // string check
          .trim() //ignoring trailing spaces
          .isLength({
            min: 1,
            max: 65535,
          })
          .withMessage("Author Must be valid"), //failing the case this message will be sent back along with the status code 422 .
        body("content") //same as for "author" field
          .isString()
          .trim()
          .isLength({
            min: 1,
            max: 65535,
          })
          .withMessage("Content Must be valid"),
        body("added") //since the added is optional this check will be done only when added it provided in the body.
          .optional()
          .isString()
          .trim()
          .isLength({
            min: 10,
            max: 10,
          })
          .withMessage("added must be valid if given in the format YYYY-MM-DD"),
      ],
      validateRequest, // this middleware will catch the above errors and send in the serialized format
      async (req: Request, res: Response) => {
        try {
          let { added, author, content } = req.body; //reading the request body
          if (added) {
            //if added provided this block will execute and added string will all be inserted
            await postgres.query(
              "INSERT INTO notes (added,author,content) VALUES ($1,$2,$3)",
              [added, author, content]
            );
          } else if (!added) {
            //no added and remaining two will be inserted marking added as null ad in the schema
            await postgres.query(
              "INSERT INTO notes (author,content) VALUES ($1,$2)",
              [author, content]
            );
          }
          res.status(201).send(); //sending the empty response with the status code 201
          return;
        } catch (err) {
          //any database error will get caught in this block and sent back
          console.error(err.message);
          throw new BadRequestError("Something went wrong, Please try again");
        }
      }
    );

    /*
    This is a get route and also supports filter (or) query by author name

     */
    router.get("/api/notes", async (req: Request, res: Response) => {
      //no validation is required using middleware
      try {
        const { author } = req.query; // getting the query parameter
        let notes;
        if (author) {
          // is author is true meaning filter is true filtering only the notes authored by the given author
          //filter
          notes = await postgres.query("SELECT * FROM notes WHERE author = $1 ", [
            author,
          ]);
        } else {
          //author is false meaning no filter so selecting all the notes
          notes = await postgres.query("SELECT * FROM notes");
        }
        res.status(200).send({
          notes: notes.rows, //sending array of notes with status 200 - Note : If no notes found, then empty array will be sent
        });
        return;
      } catch (err) {
        //any database error will get caught in this block and sent back
        console.error(err.message);
        throw new BadRequestError("Something went wrong, Please try again");
      }
    });

    /*
    This endpoint is to get a particular note using path params

     */
    router.get(
      "/api/notes/:id",
      [param("id").isNumeric().withMessage("Note Id can only be number")], //middleware to check that the id can only be number to prevent the abuse of the endpoint make sure to check in postman
      validateRequest, //same in the first endpoint above
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params; //getting the id given in the path parameter
          const note = await postgres.query("SELECT * FROM notes WHERE id = $1", [
            // getting or searching fot a particular post with post id
            id,
          ]);
          if (note.rows.length) {
            res.status(200).send({
              //if note found sending note as an object along with status 200.
              note: note.rows[0],
            });
          } else {
            res.status(404).send(); //if no note found sends 404 with empty response
          }
        } catch (err) {
          //any database error will get caught in this block and sent back
          console.error(err.message);
          throw new BadRequestError("Something went wrong, Please try again");
        }
      }
    );

    export { router as notesRouter };
    ```

## Middlewares

1. [error-handler.ts](https://github.com/vijay010498/novade-exercise/blob/master/src/middleware/common/error-handler.ts)

   This file is responsible to catch any unspecified errors to prevent request hell.

    ```tsx
    /*
    This file will catch any unspecified errors in the whole server and serialize and sends it - which is why this is imported in app.ts file 

     */

    import { Request, Response, NextFunction } from "express";
    import { CustomError } from "../../errors/custom-error";

    export const errorhandler = (
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
      }
      console.error(err);
      res.status(400).send({
        errors: [
          {
            message: "something went Wrong", //common message with status 400 for any unspecified error
          },
        ],
      });
    };
    ```

2. [validate-request.ts](https://github.com/vijay010498/novade-exercise/blob/master/src/middleware/common/validate-request.ts)

   This code helps to catch the errors specified in the middlewares in the [routes]() or [endpoints]().

    ```tsx
    /*
    This middleware is used to validate the validation criteria given in the routes using express-validator - check notesRoutes.ts for detailed explanation
     */

    import { Request, Response, NextFunction } from "express";
    import { validationResult } from "express-validator"; //used to serialize the errors
    import { RequestValidationError } from "../../errors/request-validation-error"; // to serialize and send multiple validation errors

    export const validateRequest = (
      req: Request, //normal request object
      res: Response, //normal response object
      next: NextFunction
    ) => {
      const errors = validationResult(req); //getting the errors based the validation given in the routes

      if (!errors.isEmpty()) {
        //if errors -  It will be serialized and sent along with the status code specified in RequestValidationError.ts file  - which is 422
        throw new RequestValidationError(errors.array());
      }
      next(); // no errors - next middleware will be called
    };
    ```

## Custom Error

1. **[custom-error.ts](https://github.com/vijay010498/novade-exercise/blob/master/src/errors/custom-error.ts)**

   An abstract class which can be extended by other classes to customize the error handling.This class itself extends in-built Error class

    ```tsx
    /*
    An abstract class which can be used by other custom errors to pass the message and get displayed - can be only done using type script not in javascript
     */

    export abstract class CustomError extends Error {
      abstract statusCode: number;

      constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
      }

      abstract serializeErrors(): { message: string; field?: string }[];
    }
    ```

2. [bad-request-error.ts](https://github.com/vijay010498/novade-exercise/blob/master/src/errors/bad-request-error.ts)

   One of the custom error class which extends [custom error class](). This has status code of 400.

    ```tsx
    /*
    One for the custom error for 400 not found used in app.js use the custom error abstract class
     */

    import { CustomError } from "./custom-error";

    export class BadRequestError extends CustomError {
      statusCode = 400;

      constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
      }
      serializeErrors() {
        return [{ message: this.message, status: this.statusCode }];
      }
    }
    ```

3. [not-found-error.ts](https://github.com/vijay010498/novade-exercise/blob/master/src/errors/not-found-error.ts)

   One of the custom error with status code 404 used in [app.ts]() to send when no endpoint found

    ```tsx
    /*
    One for the custom error for 404 not found used in app.js
     */

    import { CustomError } from "./custom-error";

    export class NotFoundError extends CustomError {
      statusCode = 404;

      constructor() {
        super("Route Not Found");
        Object.setPrototypeOf(this, NotFoundError.prototype);
      }
      serializeErrors() {
        return [{ message: "Not Found" }];
      }
    }
    ```

4. [request-validation-error.ts](https://github.com/vijay010498/novade-exercise/blob/master/src/errors/request-validation-error.ts)

   A custom error used to send validation failed error with the status **code 422** as given in the exercise used in [newRoutes.ts]() all endpoints.

    ```tsx
    /*
    One of the custom error which is used by validate-request.ts to serialize errors when validation failed with the status code of 422
     */

    import { ValidationError } from "express-validator";
    import { CustomError } from "./custom-error";

    export class RequestValidationError extends CustomError {
      statusCode = 422; //can be easily customized 422 - is mentioned in the exercise

      constructor(public errors: ValidationError[]) {
        super("Invalid request parameters");

        Object.setPrototypeOf(this, RequestValidationError.prototype);
      }

      serializeErrors() {
        // for every validation the errors will be displayed
        return this.errors.map((err) => {
          return { message: err.msg, field: err.param };
        });
      }
    }
    ```

### [Testing locally using Postman](https://documenter.getpostman.com/view/13994938/TzRYe5HA)

---

- Postman Documentation with request and response for local testing is [here](https://documenter.getpostman.com/view/13994938/TzRYe5HA)
    1. **Get All notes - [http://localhost:5000/api/notes](http://localhost:5000/api/notes)**

       **Request and response**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/dev-get-all-notes.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/dev-get-all-notes.JPG?raw=true)

       Response with status 200.

        ```json
        {
            "notes": [
                {
                    "id": 1,
                    "added": "2021-03-21",
                    "author": "john",
                    "content": "Buy Some Chocolates"
                },
                {
                    "id": 2,
                    "added": "2021-04-28",
                    "author": "jane",
                    "content": "Meeting with joy today"
                }
        		]
        }
        ```

    2. **Filter / query notes by name -** [http://localhost:5000/api/notes?author=vijay](http://localhost:5000/api/notes?author=vijay)

       **Request and Response:**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/dev-get-all-notes-filter.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/dev-get-all-notes-filter.JPG?raw=true)

       Response with status code 200

        ```json
        {
            "notes": [
                {
                    "id": 1,
                    "added": "2021-03-21",
                    "author": "john",
                    "content": "Buy Some Chocolates"
                },
                {
                    "id": 12,
                    "added": "2021-04-28",
                    "author": "john",
                    "content": "Get Food"
                }
        		]
        }
        ```

       **Given author not found case**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/dev-get-all-notes-filter-not-found.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/dev-get-all-notes-filter-not-found.JPG?raw=true)

       Response with status 404.

    3. **Get single Note by ID -** [http://localhost:5000/api/notes/:id](http://localhost:5000/api/notes/:id)

       **Request and response - found case**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/dev-get-one-note-found.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/dev-get-one-note-found.JPG?raw=true)

       Note found returned with status 200

       **Request and response  - Not found case**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/dev-get-one-note-not-found.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/dev-get-one-note-not-found.JPG?raw=true)

       returned empty body with status code 404

    4. **POST save a note  - [http://localhost:5000/api/notes](http://localhost:5000/api/notes)**

       **Request and reponse - validation success**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/dev-post-success.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/dev-post-success.JPG?raw=true)

       Validation success returned empty body with status code 201

       **Request and response - validation failed**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/dev-post-failed.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/dev-post-failed.JPG?raw=true)

       validation failed returned with **status 422**

### [Testing Live URL hosted in heroku No configuration needed](https://documenter.getpostman.com/view/13994938/TzRYdQvb)

---

- Postman Documentation with request and response for production is [here](https://documenter.getpostman.com/view/13994938/TzRYdQvb)
    1. **Get all notes - [URL](https://novade-solutions-exercise.herokuapp.com/api/notes)**

       **Request**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-all-notes-req.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-all-notes-req.JPG?raw=true)

       Getting all notes

       **Response**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-all-notes-res.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-all-notes-res.JPG?raw=true)

       Response with status 200

        ```json
        {
            "notes": [
                {
                    "id": 1,
                    "added": "2021-03-21",
                    "author": "john",
                    "content": "Buy Some Chocolates"
                },
                {
                    "id": 2,
                    "added": "2021-04-28",
                    "author": "jane",
                    "content": "Meeting with joy today"
                }
        		]
        }
        ```

    2. **Filter Notes by name - [URL](https://novade-solutions-exercise.herokuapp.com/api/notes?author=john)**

       **Request**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-notes-filter-req.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-notes-filter-req.JPG?raw=true)

       Get Notes with filter

       **Response**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-notes-filter-res.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-notes-filter-res.JPG?raw=true)

       Response with status 200

       **Not found case**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/not-found.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/not-found.JPG?raw=true)

       Authror with name maths not found returned empty body with status 404

        ```json
        {
            "notes": [
                {
                    "id": 1,
                    "added": "2021-03-21",
                    "author": "john",
                    "content": "Buy Some Chocolates"
                },
                {
                    "id": 12,
                    "added": "2021-04-28",
                    "author": "john",
                    "content": "Get Food"
                }
        		]
        }
        ```

    3. **Get Single Note by id - [URL](https://novade-solutions-exercise.herokuapp.com/api/notes/:id)**

       **Request**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-one-node-path-req.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-one-node-path-req.JPG?raw=true)

       Get single with id request

       **Response**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-one-node-path-res.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-one-node-path-res.JPG?raw=true)

       Note Found returned with status 200

        ```json
        {
            "note": {
                "id": 850,
                "added": "2021-05-19",
                "author": "pablo",
                "content": "Get Food"
            }
        }
        ```

       **Response  - Note Not found**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-one-node-path-res-not-found.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/prod-get-one-node-path-res-not-found.JPG?raw=true)

       Note Not found returned with status 404

    4. **Post Save Note - [URL](https://novade-solutions-exercise.herokuapp.com/api/notes)**

       **Request - Response with valid body**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/prod-post-node-valid-req.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/prod-post-node-valid-req.JPG?raw=true)

       Valid request so note create and returned empty body with status 201

       **Request - Response with invalid body**

       ![https://github.com/vijay010498/novade-exercise/blob/master/files/prod-post-node-in-valid-req.JPG?raw=true](https://github.com/vijay010498/novade-exercise/blob/master/files/prod-post-node-in-valid-req.JPG?raw=true)

       Not a valid body - So  status code 422 retuened with specifying the error object
