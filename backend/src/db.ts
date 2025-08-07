import mongoose from "mongoose";
import { MONGO_URL } from "./config";
mongoose.connect(`${MONGO_URL}`).then(() => console.log("MongoDB connected successfully."))
.catch(err => console.error("MongoDB connection error:", err));






