// backend/src/config.ts

// Use the values from process.env, with a fallback if they are not set.
export const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://sws23sinha4217:f1zNGStsWp46wBHT@cluster0.f4xbcqv.mongodb.net/";
export const JWT_PASSWORD = process.env.JWT_PASSWORD || "123456";