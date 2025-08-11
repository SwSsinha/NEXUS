// backend/src/config.ts
import dotenv from "dotenv";

// Ensure environment variables are loaded before reading them anywhere else
dotenv.config();

// Explicit env configuration.
// - MONGO_URL: required at runtime; keep a sensible dev fallback that can be overridden via env.
// - JWT_PASSWORD: provide a dev fallback to avoid compile-time issues; override in production via env.
export const MONGO_URL: string =
  process.env.MONGO_URL ||
  "mongodb+srv://sws23sinha4217:FFbsOHUftEVNq0GZ@cluster0.f4xbcqv.mongodb.net/";
export const JWT_PASSWORD: string = process.env.JWT_PASSWORD || "dev_jwt_secret";