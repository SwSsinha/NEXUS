import { useEffect, useState } from "react";
//@ts-ignore
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Content {
    _id: string;
    link: string;
    type: string;
    title: string;
    scrapedTitle: string;
    scrapedDescription: string;
    scrapedImage: string;
    tags: string[];
}

export const useContent = () => {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch content from the backend
    const refresh = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        
        // If no token exists, we can't fetch content.
        if (!token) {
            setLoading(false);
            setError("Authentication token not found.");
            return;
        }

        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            //@ts-ignore
            setContents(response.data.content);
        } catch (e: any) {
            console.error("Failed to fetch content:", e);
            setError("Failed to load content. Please try again.");
            setContents([]); // Clear contents on error
        } finally {
            setLoading(false);
        }
    };

    // Function to delete content
    const deleteContent = async (contentId: string) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Authentication token not found.");
            return;
        }
        
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    Authorization: ` ${token}`,
                },
                //@ts-ignore
                data: {
                    contentId: contentId,
                },
            });
            // After successful deletion, refresh the content list
            refresh();
        } catch (e) {
            console.error("Failed to delete content:", e);
            setError("Failed to delete content. Please try again.");
        }
    };

    // This useEffect hook handles both initial fetch and the auto-refresh interval
    useEffect(() => {
        // Initial fetch when the component mounts
        refresh();

        // Set up the interval for refreshing content every 10 seconds
        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000); // 10 seconds

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

    return { contents, loading, error, refresh, deleteContent };
};
