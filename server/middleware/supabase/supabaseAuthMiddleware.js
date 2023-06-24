import jwt from "jsonwebtoken";
import { SupabaseAuthError } from "../../../shared/errors.js";

const supabaseAuthMiddleware = (req, res, next) => {
  try {
    const supabaseToken = req.headers.authorization?.split(" ")[1];
    if (!supabaseToken) {
      throw SupabaseAuthError("Missing Supabase auth token");
    }

    jwt.verify(supabaseToken, process.env.VITE_SUPABASE_SECRET, (error) => {
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
