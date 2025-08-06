// src/services/contentService.ts

import { ContentModel } from '../models/Content';
import { LinkModel } from '../models/Link';
import { UserModel } from '../models/User';
import axios from 'axios';
import cheerio from 'cheerio';


/**
 * A new function to scrape a URL for metadata
 */
export const scrapeUrlForMetadata = async (url: string) => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                // A common user-agent header to avoid being blocked by some websites
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);

        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content') || '';
        const image = $('meta[property="og:image"]').attr('content') || '';

        return {
            title,
            description,
            image
        };
    } catch (error) {
        console.error(`Error scraping URL ${url}:`, error);
        return {
            title: '',
            description: '',
            image: ''
        };
    }
};


/**
 * Adds new content (link, title, type) for a specific user.
 * @param link - The URL link for the content.
 * @param type - The type of content (e.g., "article", "video").
 * @param title - The title of the content.
 * @param userId - The ID of the user adding the content.
 * @param tags - An optional array of tags for the content.
 * @returns An object indicating success/failure and a message.
 */
export const addContentToBrain = async (link: string, type: string, title: string, userId: string, tags?: string[]) => {
    try {
        const metadata = await scrapeUrlForMetadata(link);

        const newContent = await ContentModel.create({
            link,
            type,
            title : title || metadata.title, // User provided title if not given then taken from metadata
            scrapedTitle: metadata.title,
            scrapedDescription: metadata.description,
            scrapedImage: metadata.image,
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