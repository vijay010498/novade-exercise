import express, { Request, Response } from "express";
import { validateRequest } from "../middleware/common/validate-request";
import { body } from "express-validator";
const router = express.Router();
import { postgres } from "../config/postgresConnection";

router.get("/api/test", async (req: Request, res: Response) => {
  res.send("TEST SUCCESS");
  return;
});

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
      const { added, author, content } = req.body;
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
    }
  }
);

export { router as notesRouter };
