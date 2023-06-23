export class SupabaseAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "SupabaseAuthError";
  }
}

export class KrogerAuthError extends Error {
  constructor() {
    super();
    this.name = "KrogerAuthError";
    this.message = "Failed to retrieve Kroger API access token";
  }
}

export class RequestError extends Error {
  constructor() {
    super();
    this.name = "RequestError";
    this.message = "Invalid request";
  }
}
