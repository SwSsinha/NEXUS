import { CrossIcon } from "../icons/CrossIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Button } from "./Button";

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
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative">
                {/* Fallback image if scrapedImage is not available */}
                <img
                    className="w-full h-48 object-cover"
                    src={content.scrapedImage || `https://placehold.co/600x400/E5E7EB/4B5563?text=No+Image`}
                    alt={content.scrapedTitle || content.title}
                />
                
                {/* Conditionally render the social media icon */}
                <div className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md">
                    {getIconForType(content.type)}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {content.scrapedTitle || content.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                    {content.scrapedDescription || "No description available."}
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
                    //@ts-ignore
                        variant="ghost"
                        text="Share" 
                        startIcon={<ShareIcon />}
                        onClick={() => { /* TODO: Implement share functionality */ }} 
                    />
                    <Button 
                        variant="danger"
                        text="Delete"
                        startIcon={<CrossIcon />}
                        onClick={() => deleteContent(content._id)}
                    />
                </div>
            </div>
        </div>
    );
}
