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
      })
      .withMessage("Author Must be valid"), //failing the case this message will be sent back along with the status code 422 .
    body("content") //same as for "author" field
      .isString()
      .trim()
      .isLength({
        min: 1,
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
          "INSERT INTO notes (added,author,content) VALUES ($1,$2,$3) RETURNING *",
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
