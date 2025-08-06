import express from "express";
import cors from "cors";
import mainRouter from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api", mainRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});