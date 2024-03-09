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
