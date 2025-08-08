import { useState } from 'react';
import { CrossIcon } from "../icons/CrossIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Button } from "./Button";

// The Content interface has been updated to use the description field
interface Content {
    _id: string;
    link: string;
    type: string;
    title: string;
    description: string;
    tags: string[];
}

interface CardProps {
    content: Content;
    deleteContent: (contentId: string) => void;
}

// Function to get the appropriate icon based on content type
const getIconForType = (type: string) => {
    switch (type) {
        case "youtube":
            return <YoutubeIcon className="h-6 w-6 text-red-500" />;
        case "twitter":
            return <TwitterIcon className="h-6 w-6 text-blue-400" />;
        default:
            // This is the default for a generic link
            return (
                <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h1.586l-1.293 1.293a1 1 0 001.414 1.414L15 6.414V8a1 1 0 102 0V4a1 1 0 00-1-1h-4zm-4 7a1 1 0 100 2h1.586l-1.293 1.293a1 1 0 001.414 1.414L11 10.414V12a1 1 0 102 0v-4a1 1 0 00-1-1H7zm1 5a1 1 0 100 2h1.586l-1.293 1.293a1 1 0 001.414 1.414L15 14.414V16a1 1 0 102 0v-4a1 1 0 00-1-1h-4z"></path>
                </svg>
            );
    }
};

export function Card({ content, deleteContent }: CardProps) {
    // State to control the visibility of the confirmation modal
    const [showModal, setShowModal] = useState(false);

    // Function to handle the deletion after confirmation
    const handleDeleteConfirmation = () => {
        deleteContent(content._id);
        setShowModal(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative p-6">
                {/* The icon for the platform is in the top right corner */}
                <div className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
                    {getIconForType(content.type)}
                </div>
                
                {/* The title is a clickable link that opens in a new tab */}
                <a href={content.link} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:underline">
                        {content.title}
                    </h3>
                </a>

                {/* The description is displayed here, using a generic description field. */}
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                    {content.description || "No description available."}
                </p>

                <div className="mt-4 flex space-x-2">
                    {content.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <Button 
                        variant="secondary"
                        text="Share" 
                        startIcon={<ShareIcon />}
                        onClick={() => { /* TODO: Implement share functionality */ }} 
                    />
                    <Button 
                        variant="danger"
                        text="Delete"
                        startIcon={<CrossIcon />}
                        // When the delete button is clicked, we show the modal
                        onClick={() => setShowModal(true)}
                    />
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h4 className="text-lg font-semibold text-gray-900">Are you sure?</h4>
                        <p className="mt-2 text-sm text-gray-500">
                            Do you really want to delete this content? This action cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-end space-x-3">
                            <Button
                                variant="secondary"
                                text="Cancel"
                                onClick={() => setShowModal(false)}
                            />
                            <Button
                                variant="danger"
                                text="Delete"
                                onClick={handleDeleteConfirmation}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
