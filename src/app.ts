import express from "express";
import "express-async-errors";
import { json } from "express";
import { errorhandler, NotFoundError } from "./errors";

import { notesRouter } from "./routes/notesRoutes";

const app = express();
app.use(json());
app.set("trust proxy", true);
app.use(notesRouter);
app.use(errorhandler);
app.all("*", (req, res) => {
  throw new NotFoundError();
});

export { app };
