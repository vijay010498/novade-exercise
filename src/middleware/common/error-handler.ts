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
