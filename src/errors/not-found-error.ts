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
