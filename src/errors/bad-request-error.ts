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
