export class SupabaseAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "SupabaseAuthError";
    this.status = 401;
  }
}

export class KrogerAuthError extends Error {
  constructor() {
    super();
    this.name = "KrogerAuthError";
    this.message = "Failed to retrieve Kroger API access token";
    this.status = 500;
  }
}

export class RequestError extends Error {
  constructor() {
    super();
    this.name = "RequestError";
    this.message = "Invalid request";
    this.status = 400;
  }
}

export class InternalServerError extends Error {
  constructor() {
    super();
    this.name = "InternalServerError";
    this.message = "An unknown server error has occurred";
    this.status = 500;
  }
}
