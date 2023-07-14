// Supabase authentication error occurs when client credentials are missing or invalid
export class SupabaseAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "SupabaseAuthError";
    // 401 Unauthorized
    this.status = 401;
  }
}

// Kroger authentication error occurs when server fails to retrieve Kroger API access token
export class KrogerAuthError extends Error {
  constructor() {
    super();
    this.name = "KrogerAuthError";
    this.message = "Failed to retrieve Kroger API access token";
    // 500 Internal server error
    this.status = 500;
  }
}

// Request error occurs when the request to the Kroger API endpoint fails
// NOTE: Consider changing this error
export class RequestError extends Error {
  constructor() {
    super();
    this.name = "RequestError";
    this.message = "Invalid request";
    // 400 Bad request
    this.status = 400;
  }
}

// General server error
export class InternalServerError extends Error {
  constructor() {
    super();
    this.name = "InternalServerError";
    this.message = "An unknown server error has occurred";
    // 500 internal server error
    this.status = 500;
  }
}
