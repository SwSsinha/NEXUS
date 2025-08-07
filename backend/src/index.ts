import express from "express";
import cors from "cors";
import router from "./routes/index";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MONGO_URL } from "./config";
mongoose.connect("mongodb+srv://sws23sinha4217:f1zNGStsWp46wBHT@cluster0.f4xbcqv.mongodb.net/").then(() => console.log("MongoDB connected successfully."))
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});