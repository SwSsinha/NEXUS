import { Request, Response, NextFunction } from 'express';
import { manageShareLink, getBrainContentByHash } from '../services/brainService';
import zod from "zod";

// Define the Zod schema for the shareBrain request body
const shareBody = zod.object({
    share: zod.boolean()
});

// Define the Zod schema for the getSharedBrain request parameters
const shareLinkParams = zod.object({
    shareLink: zod.string().min(1)
});

export const shareBrain = async (req: Request, res: Response, next: NextFunction) => {
    const { success } = shareBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Invalid input. 'share' must be a boolean." });
    }

    // Explicitly check if userId exists
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized. User ID not found." });
    }

    const { share } = req.body;
    const userId = req.userId; // TypeScript now knows userId is a string

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

export const getSharedBrain = async (req: Request, res: Response, next: NextFunction) => {
    const { success } = shareLinkParams.safeParse(req.params);

    if (!success) {
        return res.status(400).json({ message: "Invalid share link." });
    }

    const { shareLink } = req.params;

    const result = await getBrainContentByHash(shareLink); // Calling the service function

    if (result.success) {
        res.json({ username: result.username, content: result.content });
    } else {
        res.status(411).json({ message: result.message });
    }
};
