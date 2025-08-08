import { useState } from 'react';
import { CrossIcon } from "../icons/CrossIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Button } from "./Button";
import { 
    ClipboardDocumentIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    LinkIcon,
    CheckIcon
} from '@heroicons/react/24/outline';

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
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);

    // Function to handle the deletion after confirmation
    const handleDeleteConfirmation = () => {
        deleteContent(content._id);
        setShowModal(false);
    };

    // Function to copy link to clipboard
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(content.link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    // Function to share via WhatsApp
    const shareViaWhatsApp = () => {
        const text = `Check out this ${content.type} content: ${content.title}\n\n${content.link}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    // Function to share via Email
    const shareViaEmail = () => {
        const subject = `Check out this ${content.type} content`;
        const body = `Hi,\n\nI found this interesting ${content.type} content that I thought you might like:\n\nTitle: ${content.title}\nDescription: ${content.description}\nLink: ${content.link}\n\nEnjoy!`;
        const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(url);
    };

    // Function to share via Telegram
    const shareViaTelegram = () => {
        const text = `Check out this ${content.type} content: ${content.title}\n\n${content.link}`;
        const url = `https://t.me/share/url?url=${encodeURIComponent(content.link)}&text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    // Function to share via Twitter/X
    const shareViaTwitter = () => {
        const text = `Check out this ${content.type} content: ${content.title}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(content.link)}`;
        window.open(url, '_blank');
    };

    // Function to share via LinkedIn
    const shareViaLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(content.link)}`;
        window.open(url, '_blank');
    };

    // Function to share via Facebook
    const shareViaFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(content.link)}`;
        window.open(url, '_blank');
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
                        onClick={() => setShowShareModal(true)} 
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

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">Share Content</h4>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <CrossIcon className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Share this {content.type} content</h5>
                            <p className="text-sm text-gray-600 line-clamp-2">{content.title}</p>
                        </div>

                        <div className="space-y-3">
                            {/* Copy Link */}
                            <button
                                onClick={copyToClipboard}
                                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center">
                                    <ClipboardDocumentIcon className="w-5 h-5 text-gray-600 mr-3" />
                                    <span className="text-sm font-medium text-gray-700">Copy Link</span>
                                </div>
                                {copied && <CheckIcon className="w-5 h-5 text-green-500" />}
                            </button>

                            {/* WhatsApp */}
                            <button
                                onClick={shareViaWhatsApp}
                                className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                            </button>

                            {/* Email */}
                            <button
                                onClick={shareViaEmail}
                                className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <EnvelopeIcon className="w-5 h-5 text-blue-500 mr-3" />
                                <span className="text-sm font-medium text-gray-700">Email</span>
                            </button>

                            {/* Telegram */}
                            <button
                                onClick={shareViaTelegram}
                                className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Telegram</span>
                            </button>

                            {/* Twitter/X */}
                            <button
                                onClick={shareViaTwitter}
                                className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <TwitterIcon className="w-5 h-5 text-blue-400 mr-3" />
                                <span className="text-sm font-medium text-gray-700">Twitter/X</span>
                            </button>

                            {/* LinkedIn */}
                            <button
                                onClick={shareViaLinkedIn}
                                className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-700">LinkedIn</span>
                            </button>

                            {/* Facebook */}
                            <button
                                onClick={shareViaFacebook}
                                className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
