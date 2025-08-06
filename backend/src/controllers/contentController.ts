import { Request, Response } from 'express';
import { addContentToBrain, getUserContent, deleteUserContent } from '../services/contentService'; // Importing service functions

export const addContent = async (req: Request, res: Response) => {
    const { link, type, title } = req.body;
    // @ts-ignore - userId is attached by userMiddleware
    const userId = req.userId;

    // TODO: Implement Zod validation for link, type, title here

    const result = await addContentToBrain(link, type, title, userId); // Calling the service function

    if (result.success) {
        res.json({ message: result.message });
    } else {
        res.status(500).json({ message: result.message });
    }
};

export const getContent = async (req: Request, res: Response) => {
    // @ts-ignore - userId is attached by userMiddleware
    const userId = req.userId;

    const result = await getUserContent(userId); // Calling the service function

    if (result.success) {
        res.json({ content: result.content });
    } else {
        res.status(500).json({ message: result.message });
    }
};

export const deleteContent = async (req: Request, res: Response) => {
    const { contentId } = req.body;
    // @ts-ignore - userId is attached by userMiddleware
    const userId = req.userId;

    // TODO: Implement Zod validation for contentId here

    const result = await deleteUserContent(contentId, userId); // Calling the service function

    if (result.success) {
        res.json({ message: result.message });
    } else {
        res.status(500).json({ message: result.message });
    }
};
