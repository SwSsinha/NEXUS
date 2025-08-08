import { Request, Response } from 'express';
import { addContentToBrain, getUserContent, deleteUserContent } from '../services/contentService';
import zod from "zod";

// Define the Zod schema for the addContent request body with the new description field
const addContentBody = zod.object({
    link: zod.string().url(),
    type: zod.string().min(1),
    title: zod.string().min(1),
    description: zod.string().min(1),
    tags: zod.array(zod.string()).optional()
});

// Define the Zod schema for the deleteContent request body
const deleteContentBody = zod.object({
    contentId: zod.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: "Invalid contentId format"
    })
});

export const addContent = async (req: Request, res: Response) => {
    const result = addContentBody.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Invalid inputs", issues: result.error.issues });
    }
    
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized. User ID not found." });
    }

    const { link, type, title, description, tags } = result.data;
    const userId = req.userId;

    const serviceResult = await addContentToBrain(link, type, title, description, userId, tags);

    if (serviceResult.success) {
        res.json({ message: serviceResult.message });
    } else {
        res.status(500).json({ message: serviceResult.message });
    }
};

export const getContent = async (req: Request, res: Response) => {
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

export const deleteContent = async (req: Request, res: Response) => {
    const result = deleteContentBody.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Invalid contentId format" });
    }

    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized. User ID not found." });
    }

    const { contentId } = result.data;
    const userId = req.userId;

    const serviceResult = await deleteUserContent(contentId, userId);

    if (serviceResult.success) {
        res.json({ message: serviceResult.message });
    } else {
        res.status(500).json({ message: serviceResult.message });
    }
};
