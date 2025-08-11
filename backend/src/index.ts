import express from "express";
import cors from "cors";
import router from "./routes/index";
import mongoose from "mongoose";
import { MONGO_URL } from "./config";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);

async function startServer(): Promise<void> {
    try {
        if (!MONGO_URL) {
            console.error("MONGO_URL is not set. Create a .env file with MONGO_URL and JWT_PASSWORD.");
            process.exit(1);
        }

        await mongoose.connect("mongodb+srv://sws23sinha4217:FFbsOHUftEVNq0GZ@cluster0.f4xbcqv.mongodb.net/");
        console.log("MongoDB connected successfully.");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

startServer();