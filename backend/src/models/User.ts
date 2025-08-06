import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

export const UserModel = model("User", UserSchema);
