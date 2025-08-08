import express from "express";
import cors from "cors";
import router from "./routes/index";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MONGO_URL } from "./config";

// Load environment variables first
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected successfully."))
    .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});