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
