import jwt from "jsonwebtoken";
import { SupabaseAuthError } from "../../../shared/errors.js";

// Supabase client authentication middleware
const supabaseAuthMiddleware = (req, res, next) => {
  try {
    // Get Supabase token from request headers
    const supabaseToken = req.headers.authorization?.split(" ")[1];
    // Throw SupabaseAuthError if no token is provided
    if (!supabaseToken) {
      throw SupabaseAuthError("Missing Supabase auth token");
    }
    // Verify token with Supabase secret from env variable
    jwt.verify(supabaseToken, process.env.VITE_SUPABASE_SECRET, (error) => {
      // Throw SupabaseAuthError if token is invalid
      if (error) {
        throw SupabaseAuthError("Invalid Supabase auth token");
      }
    });
    next();
  } catch (error) {
    next(error);
  }
};
export default supabaseAuthMiddleware;
