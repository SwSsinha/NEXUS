import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
//@ts-ignore
import axios from "axios";
import { PlusIcon } from "../icons/PlusIcon";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}
//@ts-ignore
export function CreateContentModal({ open, onClose, refreshContent }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function addContent() {
        setLoading(true);
        setError(null);

        // Get values from input fields
        const link = linkRef.current?.value;
        const title = titleRef.current?.value;

        // Check for both required fields
        if (!link || !title) {
            setError("Both Link and Title are required fields.");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Authentication token not found.");
            }

            // Create the payload with both link and title
            const payload = {
                link,
                title,
                type
            };
            
            await axios.post(`${BACKEND_URL}/api/v1/content`, payload, {
                headers: {
                    "Authorization": `${token}`
                }
            });

            // After successful post, refresh the content list
            refreshContent();
            onClose();
        } catch (e: any) {
            console.error("Error adding content:", e);
            // Updated error handling to show specific backend message if available
            if (e.response && e.response.data && e.response.data.message) {
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
                
                <div className="flex justify-center mt-6">
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
