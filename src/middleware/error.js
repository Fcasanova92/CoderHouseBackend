// utils/errors.js

export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class BadRequest extends CustomError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class NotFound extends CustomError {
  constructor(message = 'Resource Not Found') {
    super(message, 404);
  }
}

export class Unauthorized extends CustomError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class InternalServerError extends CustomError {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
  }
}
