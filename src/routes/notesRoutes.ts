import express, { Request, Response } from "express";
import { validateRequest } from "../middleware/common/validate-request";
import { body, param } from "express-validator";
const router = express.Router();
import { postgres } from "../config/postgresConnection";
import { BadRequestError } from "../errors";

//post notes
router.post(
  "/api/notes",
  [
    body("author")
      .isString()
      .trim()
      .isLength({
        min: 1,
      })
      .withMessage("Author Must be valid"),
    body("content")
      .isString()
      .trim()
      .isLength({
        min: 1,
      })
      .withMessage("Content Must be valid"),
    body("added")
      .optional()
      .isString()
      .trim()
      .isLength({
        min: 10,
        max: 10,
      })
      .withMessage("added must be valid if given in the format YYYY-MM-DD"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      let { added, author, content } = req.body;
      if (added) {
        await postgres.query(
          "INSERT INTO notes (added,author,content) VALUES ($1,$2,$3) RETURNING *",
          [added, author, content]
        );
      } else if (!added) {
        await postgres.query(
          "INSERT INTO notes (author,content) VALUES ($1,$2)",
          [author, content]
        );
      }
      res.status(201).send();
      return;
    } catch (err) {
      console.error(err.message);
      throw new BadRequestError("Something went wrong, Please try again");
    }
  }
);

//get all notes
router.get("/api/notes", async (req: Request, res: Response) => {
  try {
    const { author } = req.query;
    let notes;
    if (author) {
      //filter
      notes = await postgres.query("SELECT * FROM notes WHERE author = $1 ", [
        author,
      ]);
    } else {
      notes = await postgres.query("SELECT * FROM notes");
    }
    res.status(200).send({
      notes: notes.rows,
    });
    return;
  } catch (err) {
    console.error(err.message);
    throw new BadRequestError("Something went wrong, Please try again");
  }
});

//path paramater
router.get(
  "/api/notes/:id",
  [param("id").isNumeric().withMessage("Note Id can only be number")],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log(id);
      const note = await postgres.query("SELECT * FROM notes WHERE id = $1", [
        id,
      ]);
      if (note.rows.length) {
        res.send({
          note: note.rows[0],
        });
      } else {
        res.status(404).send();
      }
    } catch (err) {
      console.error(err.message);
      throw new BadRequestError("Something went wrong, Please try again");
    }
  }
);

export { router as notesRouter };
