import { ContentModel } from '../models/Content'; // Import from your consolidated models/index.ts
import { LinkModel } from '../models/Link';
import { UserModel } from '../models/User';
import { random } from '../utils'; // Your utility function for hash generation

/**
 * Manages the creation or removal of a shareable link for a user's brain content.
 * @param share - Boolean indicating whether to create (true) or remove (false) the link.
 * @param userId - The ID of the user.
 * @returns An object indicating success/failure and the hash (if created) or a message.
 */
export const manageShareLink = async (share: boolean, userId: string) => {
    try {
        if (share) {
            // Check if a link already exists for this user
            const existingLink = await LinkModel.findOne({ userId: userId });
            if (existingLink) {
                return { success: true, hash: existingLink.hash };
            }

            // If no existing link, create a new one with a random hash
            const hash = random(10);
            await LinkModel.create({ userId: userId, hash: hash });
            return { success: true, hash };
        } else {
            // If 'share' is false, delete the existing link for the user
            await LinkModel.deleteOne({ userId: userId });
            return { success: true, message: "Removed link" };
        }
    } catch (error) {
        console.error("Error in brainService.manageShareLink:", error);
        return { success: false, message: "Failed to manage share link" };
    }
};

/**
 * Retrieves the content of a shared brain using its hash.
 * @param hash - The unique hash of the shared link.
 * @returns An object indicating success/failure, username, and content.
 */
export const getBrainContentByHash = async (hash: string) => {
    try {
        const link = await LinkModel.findOne({ hash });

        if (!link) {
            return { success: false, message: "Sorry, incorrect input or link not found" };
        }

        // Find all content associated with the userId from the link
        const content = await ContentModel.find({ userId: link.userId });

        // Find the username for the owner of the shared content
        const user = await UserModel.findOne({ _id: link.userId });

        if (!user) {
            // This scenario should ideally not happen if link.userId is always valid
            return { success: false, message: "User not found for this link" };
        }

        return { success: true, username: user.username, content: content };
    } catch (error) {
        console.error("Error in brainService.getBrainContentByHash:", error);
        return { success: false, message: "Failed to retrieve shared brain content" };
    }
};