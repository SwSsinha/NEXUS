import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { PlusIcon } from "../icons/PlusIcon";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
    refreshContent: () => void;
}

export function CreateContentModal({ open, onClose, refreshContent }: CreateContentModalProps) {
    // New ref for the description input field
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function addContent() {
        setLoading(true);
        setError(null);

        // Get values from all input fields
        const link = linkRef.current?.value;
        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value;

        // Now checking for all three required fields
        if (!link || !title || !description) {
            setError("Link, Title, and Description are all required fields.");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Authentication token not found.");
            }

            // Create the payload with all three fields
            const payload = {
                link,
                title,
                description, // Included the new description field in the payload
                type
            };
            
            await axios.post(`${BACKEND_URL}/v1/content`, payload, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // After successful post, refresh the content list
            refreshContent();
            onClose();
            
            // Clear the form
            if (titleRef.current) titleRef.current.value = '';
            if (linkRef.current) linkRef.current.value = '';
            if (descriptionRef.current) descriptionRef.current.value = '';
        } catch (e: any) {
            console.error("Error adding content:", e);
            // Updated error handling to show specific backend message if available
            if (e.response?.status === 401) {
                setError("Session expired. Please sign in again.");
                localStorage.removeItem("token");
            } else if (e.response?.data?.message) {
                setError(`Error adding content: ${e.response.data.message}`);
            } else {
                setError("Failed to add content. Please check the link and title and try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                >
                    <CrossIcon />
                </button>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Content</h3>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <div className="space-y-4">
                    <Input reference={titleRef} placeholder={"Title"} />
                    <Input reference={linkRef} placeholder={"Link"} />
                    {/* New input field for the description */}
                    <Input reference={descriptionRef} placeholder={"Description"} />
                </div>
                
                <div className="mt-6">
                    <h1 className="text-lg font-medium text-gray-700 mb-2">Content Type</h1>
                    <div className="flex gap-4 justify-center pb-2">
                        <Button
                            text="Youtube"
                            variant={type === ContentType.Youtube ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Youtube)}
                        />
                        <Button
                            text="Twitter"
                            variant={type === ContentType.Twitter ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Twitter)}
                        />
                    </div>
                </div>
                
                <div className="flex justify-between items-center mt-6 gap-4">
                    {/* New "Cancel" button */}
                    <Button 
                        onClick={onClose} 
                        variant="secondary" 
                        text="Cancel" 
                        fullWidth={true}
                    />
                    <Button 
                        onClick={addContent} 
                        variant="primary" 
                        text="Add Content" 
                        fullWidth={true}
                        loading={loading}
                        startIcon={<PlusIcon />}
                    />
                </div>
            </div>
        </div>
    );
}
