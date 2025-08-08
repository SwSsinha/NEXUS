// src/services/contentService.ts

import { ContentModel } from '../models/Content';
import { LinkModel } from '../models/Link';
import { UserModel } from '../models/User';
import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Adds new content (link, title, type) for a specific user.
 *
 * @param link - The URL link for the content.
 * @param type - The type of content (e.g., "article", "video").
 * @param title - The title of the content. This is a required field.
 * @param userId - The ID of the user adding the content.
 * @param tags - An optional array of tags for the content.
 * @returns An object indicating success/failure and a message.
 */
export const addContentToBrain = async (link: string, type: string, title: string, userId: string, tags?: string[]) => {
    try {
        const newContent = await ContentModel.create({
            link,
            type,
            title,
            userId: userId,
            tags: tags || []
        });

        return { success: true, message: "Content added", content: newContent };
    } catch (error) {
        console.error("Error in contentService.addContentToBrain:", error);
        return { success: false, message: "Failed to add content" };
    }
};

/**
 * Retrieves all content for a given user.
 *
 * @param userId - The ID of the user whose content to retrieve.
 * @returns An object indicating success/failure and the content array.
 */
export const getUserContent = async (userId: string) => {
    try {
        // Populate 'userId' to get the username from the User model
        const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
        return { success: true, content };
    } catch (error) {
        console.error("Error in contentService.getUserContent:", error);
        return { success: false, message: "Failed to retrieve content" };
    }
};

/**
 * Deletes content based on content ID and user ID.
 * Ensures that only the owner can delete their content.
 *
 * @param contentId - The ID of the content to delete.
 * @param userId - The ID of the user attempting to delete.
 * @returns An object indicating success/failure and a message.
 */
export const deleteUserContent = async (contentId: string, userId: string) => {
    try {
        const result = await ContentModel.deleteMany({ _id: contentId, userId: userId });
        if (result.deletedCount === 0) {
            return { success: false, message: "Content not found or not authorized to delete" };
        }
        return { success: true, message: "Content deleted" };
    } catch (error) {
        console.error("Error in contentService.deleteUserContent:", error);
        return { success: false, message: "Failed to delete content" };
    }
};
