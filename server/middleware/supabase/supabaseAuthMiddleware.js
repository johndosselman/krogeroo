import jwt from "jsonwebtoken";

const supabaseAuthMiddleware = (req, res, next) => {
  console.log("validating supabase token");
  const supabaseToken = req.headers.authorization?.split(" ")[1];
  if (!supabaseToken) {
    next(new Error("Missing Supabase auth token"));
  }

  jwt.verify(supabaseToken, process.env.VITE_SUPABASE_SECRET, (error) => {
    if (error) {
      next(new Error("Invalid supabase auth token"));
    }
  });
  next();
};
export default supabaseAuthMiddleware;
