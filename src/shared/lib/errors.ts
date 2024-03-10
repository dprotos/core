export class AuthorizationError extends Error {
  constructor(message = "Authorization error") {
    super(message);
  }
}

export class NeedAuthError extends Error {
  constructor(message = "Need authentication") {
    super(message);
  }
}

export class BadRequest extends Error {
  constructor(message = "Bad request") {
    super(message);
  }
}
