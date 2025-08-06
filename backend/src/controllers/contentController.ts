import { Request, Response, NextFunction } from 'express';
import { addContentToBrain, getUserContent, deleteUserContent } from '../services/contentService';
import zod from "zod";

// Define the Zod schema for the addContent request body
const addContentBody = zod.object({
    link: zod.string().url(),
    type: zod.string().min(1),
    title: zod.string().min(1).optional()
});

// Define the Zod schema for the deleteContent request body
const deleteContentBody = zod.object({
    contentId: zod.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: "Invalid contentId format"
    })
});

export const addContent = async (req: Request, res: Response, next: NextFunction) => {
    // Implement Zod validation
    const { success } = addContentBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Invalid inputs" });
    }
    
    // Explicitly check if userId exists before using it
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized. User ID not found." });
    }

    const { link, type, title } = req.body;
    const userId = req.userId;

    const result = await addContentToBrain(link, type, title, userId);

    if (result.success) {
        res.json({ message: result.message });
    } else {
        res.status(500).json({ message: result.message });
    }
};

export const getContent = async (req: Request, res: Response, next: NextFunction) => {
    // Explicitly check if userId exists before using it
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized. User ID not found." });
    }
    
    const userId = req.userId;

    const result = await getUserContent(userId);

    if (result.success) {
        res.json({ content: result.content });
    } else {
        res.status(500).json({ message: result.message });
    }
};

export const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
    // Implement Zod validation
    const { success } = deleteContentBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Invalid contentId format" });
    }

    // Explicitly check if userId exists before using it
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized. User ID not found." });
    }

    const { contentId } = req.body;
    const userId = req.userId;

    const result = await deleteUserContent(contentId, userId);

    if (result.success) {
        res.json({ message: result.message });
    } else {
        res.status(500).json({ message: result.message });
    }
};
