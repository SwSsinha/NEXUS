// src/models/Content.ts

import mongoose, { model, Schema } from "mongoose";
import { string } from "zod";

const ContentSchema = new Schema({
    title: { type: String, required: false },
    link: { type: String, required: true },
    type: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    // New fields for scraped metadata
    scrapedTitle: { type: String, default: '' },
    scrapedDescription: { type: String, default: '' },
    scrapedImage: { type: String, default: '' },
    tags : {type: [String] , default : []}
});

export const ContentModel = model("Content", ContentSchema);
