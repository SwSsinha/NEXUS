import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Content {
    _id: string;
    link: string;
    type: string;
    title: string;
    description: string;
    tags: string[];
}

export const useContent = () => {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Use useCallback to memoize the refresh function, so it doesn't re-create on every render
    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        
        if (!token) {
            setLoading(false);
            setError("Authentication token not found.");
            return;
        }

        try {
            // The response data is an array of Content objects, so we type it accordingly
            const response = await axios.get<{ content: Content[] }>(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setContents(response.data.content);
        } catch (e: unknown) {
            console.error("Failed to fetch content:", e);
            // Check if the error is an AxiosError to get a more specific message
            if (axios.isAxiosError(e)) {
                setError(e.response?.data?.error || "Failed to load content. Please try again.");
            } else {
                setError("An unknown error occurred. Please try again.");
            }
            setContents([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Use useCallback to memoize the delete function
    const deleteContent = useCallback(async (contentId: string) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Authentication token not found.");
            return;
        }
        
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    Authorization: `${token}`,
                },
                data: {
                    contentId: contentId,
                },
            });
            refresh();
        } catch (e: unknown) {
            console.error("Failed to delete content:", e);
            if (axios.isAxiosError(e)) {
                setError(e.response?.data?.error || "Failed to delete content. Please try again.");
            } else {
                setError("An unknown error occurred while deleting. Please try again.");
            }
        }
    }, [refresh]);

    // The useEffect now correctly depends on 'refresh'
    useEffect(() => {
        refresh();

        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, [refresh]);

    return { contents, loading, error, refresh, deleteContent };
};
