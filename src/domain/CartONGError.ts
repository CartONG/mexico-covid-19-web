import { CustomError } from 'ts-custom-error';

export class CartONGError extends CustomError {
  cause(error: Error): CartONGError {
    if (this.stack && error.stack) {
      this.stack += `\nCaused by: ${error.stack}`;
    }
    return this;
  }
}
