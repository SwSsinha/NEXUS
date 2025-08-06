import { Request, Response } from 'express';
import { manageShareLink, getBrainContentByHash } from '../services/brainService'; // Importing service functions

export const shareBrain = async (req: Request, res: Response) => {
    const { share } = req.body;
    // @ts-ignore - userId is attached by userMiddleware
    const userId = req.userId;

    // TODO: Implement Zod validation for 'share' boolean here

    const result = await manageShareLink(share, userId); // Calling the service function

    if (result.success) {
        if (share) {
            res.json({ hash: result.hash });
        } else {
            res.json({ message: result.message });
        }
    } else {
        res.status(500).json({ message: result.message });
    }
};

export const getSharedBrain = async (req: Request, res: Response) => {
    const { shareLink } = req.params;

    // TODO: Implement Zod validation for shareLink here

    const result = await getBrainContentByHash(shareLink); // Calling the service function

    if (result.success) {
        res.json({ username: result.username, content: result.content });
    } else {
        res.status(411).json({ message: result.message });
    }
};
