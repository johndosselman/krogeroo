import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import getKrogerToken from "./kroger/getKrogerToken.js";

dotenv.config();
const app = express();
const port = 3000;

//let krogerToken = await getKrogerToken();

const validateSupabaseToken = (req, res, next) => {
  const supabaseToken = req.headers.authorization?.split(" ")[1];
  if (!supabaseToken) {
    return res.status(401).json({ error: "Missing Supabase token" });
  }

  jwt.verify(
    supabaseToken,
    process.env.VITE_SUPABASE_SECRET,
    (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: "Invalid Supabase token" });
      }
      req.user = decoded;
      next();
    }
  );
};

app.use(
  cors({
    allowedHeaders: "Authorization",
  })
);

app.use(validateSupabaseToken);

app.get("/hello", (req, res) => {
  res.send({ message: "Hello" });
});

app.get("/kroger/token", async (req, res) => {
  const token = await getKrogerToken();
  res.send(token);
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
