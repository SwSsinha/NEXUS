// src/models/Content.ts

import mongoose, { model, Schema } from "mongoose";

const ContentSchema = new Schema({
    title: { type: String, required: true }, // Title is now a required field
    link: { type: String, required: true },
    type: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    tags : {type: [String] , default : []}
});

export const ContentModel = model("Content", ContentSchema);
