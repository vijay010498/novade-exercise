import express, { Request, Response } from "express";
const router = express.Router();

router.get("/api/test", async (req: Request, res: Response) => {
  res.send("TEST SUCCESS");
  return;
});

export { router as notesRouter };
