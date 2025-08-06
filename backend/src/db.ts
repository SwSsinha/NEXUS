import mongoose from "mongoose";
mongoose.connect("").then(() => console.log("MongoDB connected successfully."))
.catch(err => console.error("MongoDB connection error:", err));






